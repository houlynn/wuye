package com.property.base.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.model.hibernate.property.FeesInfo;
import com.model.hibernate.property.FeesItemLink;
import com.model.hibernate.property.InnstallBill;
import com.model.hibernate.property.LevelInfo;
import com.model.hibernate.property.ResidentInfo;
import com.model.hibernate.property.Village;
import com.model.hibernate.system._Module;
import com.property.base.ebi.FeesEbi;
import com.ufo.framework.common.core.exception.ResponseErrorInfo;
import com.ufo.framework.common.core.exception.TimeoutException;
import com.ufo.framework.common.core.ext.model.JSONTreeNode;
import com.ufo.framework.common.core.properties.PropUtil;
import com.ufo.framework.common.core.utils.AppUtils;
import com.ufo.framework.common.core.utils.JsonBuilder;
import com.ufo.framework.common.log.LogerManager;
import com.ufo.framework.system.controller.BaseAppController;
import com.ufo.framework.system.controller.SimpleBaseController;
import com.ufo.framework.system.ebi.CommonException;
import com.ufo.framework.system.ebi.Ebi;
import com.ufo.framework.system.ebo.ApplicationService;
import com.ufo.framework.system.shared.module.DataDeleteResponseInfo;
import com.ufo.framework.system.shared.module.DataFetchResponseInfo;
import com.ufo.framework.system.shared.module.DataInsertResponseInfo;
import com.ufo.framework.system.web.SecurityUserHolder;

@Controller
@RequestMapping("/201")
public class FeesController extends BaseAppController implements  CommonException {
	@Resource(name = "ebo")
	private Ebi ebi;

	public Ebi getEbi() {
		return ebi;
	}
	@Autowired
	private FeesEbi feeEbi;

	public FeesEbi getFeeEbi() {
		return feeEbi;
	}

	public void setFeeEbi(FeesEbi feeEbi) {
		this.feeEbi = feeEbi;
	}

	public void setEbi(Ebi ebi) {
		this.ebi = ebi;
	}

	/**
	 * 根据前台的请求取得数据
	 * 
	 * @throws Exception
	 */
	@RequestMapping(value = "/fetchdata", method = RequestMethod.GET)
	public @ResponseBody Map<String, Object> fetchData(String moduleName,
			Integer start, Integer limit, String sort, String query,
			String columns, String navigates, String parentFilter,
			String nodeInfoType, HttpServletRequest request) throws Exception {
		DataFetchResponseInfo response = feeEbi.fetchData(moduleName, start,
				limit, sort, query, navigates, nodeInfoType);
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("records", response.getMatchingObjects());
		result.put("totalCount", response.getTotalRows());
		return result;
	}

	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public @ResponseBody DataInsertResponseInfo addWithNoPrimaryKey(
			String moduleName, @RequestBody String inserted,
			HttpServletRequest request) throws Exception {
		DataInsertResponseInfo result = new DataInsertResponseInfo();
		String parentFilter = request.getParameter("parentFilter");
		String navigates = request.getParameter("navigates");
		_Module module = ApplicationService.getModuleWithName(moduleName);
		try {

		} catch (DataAccessException e) {
			error("DataAccessException异常", e);
			if (e.getRootCause().getMessage().toLowerCase().indexOf("primary") != -1) {
				getInsertException(module.getTf_moduleName(),
						module.getTf_primaryKey() + "插入记录的主键值与数据库中原有的值重复!",
						ResponseErrorInfo.STATUS_VALIDATION_ERROR);
			} else {

				getInsertException(module.getTf_moduleName(), e.getMessage(),
						ResponseErrorInfo.STATUS_VALIDATION_ERROR);
			}
		} catch (Exception e) {
			error("添加异常", e);
			// TODO Auto-generated catch block
			getInsertException(moduleName, "添加业主信息失败!",
					ResponseErrorInfo.STATUS_FAILURE);
		}
		return result;

	}

	@RequestMapping("/loadLR")
	public @ResponseBody List<JSONTreeNode> getTree(
			HttpServletRequest request,
			HttpServletResponse response,
			@RequestParam(value = "vid", required = true) int vid,
			@RequestParam(value = "orderSql", required = false, defaultValue = " order by tf_leveId DESC") String orderSql) {
		List<JSONTreeNode> lists = new ArrayList<JSONTreeNode>();
		try {
			List<LevelInfo> leves = (List<LevelInfo>) ebi
					.queryByHql(" from LevelInfo where 1=1   and  tf_parent=null  and tf_village="
							+ vid + orderSql);
			for (LevelInfo l : leves) {
				JSONTreeNode node = new JSONTreeNode();
				node.setId(l.getTf_leveId() + "tf_leveName");
				node.setText(l.getTf_leveName());
				node.setCode(l.getTf_leveId() + "");
				node.setNodeInfo("LevelInfo");
				node.setCls("tree_set_perm");
				node.setIcon(l.getIcon());
				node.setDescription("tf_leveName");
				node.setExpanded(true);
				node.setLeaf(false);
				node.setNodeInfoType("0");
				if (l.getTf_childs() != null && l.getTf_childs().size() > 0) {
					List<JSONTreeNode> childrens = new ArrayList<>();
					for (LevelInfo childleve : l.getTf_childs()) {
						JSONTreeNode childNode = new JSONTreeNode();
						childNode.setId(childleve.getTf_leveId() + ""
								+ "LevelInfo");
						childNode.setText(childleve.getTf_leveName());
						childNode.setCode(childleve.getTf_leveId() + "");
						childNode.setNodeInfo("LevelInfo");
						childNode.setLeaf(false);
						node.setExpanded(true);
						childNode.setIcon(PropUtil
								.get("sys.leve.LevelInfoChild"));
						childNode.setDescription("tf_leveName");
						childNode.setNodeInfoType("1");
						String hql = " from ResidentInfo where 1=1 and tf_levelInfo="
								+ childleve.getTf_leveId();
								/*+ " and xcode='"
								+ SecurityUserHolder.getIdentification() + "'";*/
						List<ResidentInfo> residents = (List<ResidentInfo>) ebi
								.queryByHql(hql);
						List<JSONTreeNode> rchilds = new ArrayList<JSONTreeNode>();
						rchilds = residents
								.parallelStream()
								.map(item -> {
									JSONTreeNode rnode = new JSONTreeNode();
									rnode.setId(String.valueOf(item
											.getTf_residentId())
											+ "ResidentInfo");
									rnode.setText("<span style='color:red;font-weight:bold'>"
											+ item.getTf_number()
											+ "</span>"
											+ item.getTf_residentName());
									rnode.setCode(item.getTf_residentId() + "");
									rnode.setNodeInfo("ResidentInfo");
									rnode.setLeaf(true);
									rnode.setIcon(PropUtil
											.get("sys.rbac.userIcon"));
									rnode.setDescription("tf_residentName");
									rnode.setNodeInfoType("2");
									return rnode;
								}).collect(Collectors.toList());
						childNode.setChildren(rchilds);
						childrens.add(childNode);
						childNode = null;
					}
					node.setChildren(childrens);
				}
				lists.add(node);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return lists;
	}

	/**
	 * 结束抄表
	 * @param rendate
	 * @param type
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/acount")
	public @ResponseBody DataInsertResponseInfo setAcount(
			@RequestParam(value = "rendate", required = true) String rendate,
			@RequestParam(value = "type", required = true) String type,
			@RequestParam(value = "leveid", required = true) int leveid
			)
			throws Exception {
		DataInsertResponseInfo resutl = new DataInsertResponseInfo();
		feeEbi.updateAcount(rendate, type,leveid);
		return resutl;
	}
	    /**
		 * 并联收费项目
		 * @param type
		 * @param vid
		 * @param feessid
		 * @return
		 * @throws Exception
		 */
	@RequestMapping("/linkFess")
	public @ResponseBody DataInsertResponseInfo makeFessItme(String type,
			int vid, int feessid) throws Exception {
		String hql = "select count(*) from  FeesItemLink where 1=1 and tf_Village="
				+ vid + " and tf_type='" + type + "'";
		Integer count = ebi.getCount(hql);
		DataInsertResponseInfo result = new DataInsertResponseInfo();
		if (count == 0) {
			FeesItemLink feesItemLink = new FeesItemLink();
			feesItemLink.setTf_type(type);
			Village tf_Village = new Village();
			tf_Village.setTf_viid(vid);
			feesItemLink.setTf_Village(tf_Village);
			FeesInfo tf_FeesInfo = new FeesInfo();
			tf_FeesInfo.setTf_feesid(feessid);
			feesItemLink.setTf_FeesInfo(tf_FeesInfo);
			ebi.save(feesItemLink);
		}
		result.setDefaultMsg("并联成功!");
		return result;
	}

/*	@RequestMapping(value = "/instbille", method = RequestMethod.POST)
	public @ResponseBody DataInsertResponseInfo addWithNoPrimaryKey(
			@RequestBody String inserted,
			@RequestParam(value = "vid", required = true) int vid,
			HttpServletRequest request) throws Exception {
		DataInsertResponseInfo result = new DataInsertResponseInfo();
		try {
			JSONObject updateJsonObject = JSONObject.fromObject(inserted);
			String tf_name=updateJsonObject.getString("tf_name");
			String tf_remark=updateJsonObject.getString("tf_remark");
			int tf_FeesInfo=updateJsonObject.getInt("tf_FeesInfo");
			FeesInfo fees=new FeesInfo();
			fees.setTf_feesid(tf_FeesInfo);
			Village tf_Village=new Village();
			tf_Village.setTf_viid(vid);
		    String tf_billType=updateJsonObject.getString("tf_billType");
			InnstallBill insBill=new InnstallBill();
			insBill.setTf_billType(tf_billType);
			insBill.setTf_crateTime(AppUtils.getCurrentTime());
			insBill.setTf_enabled(true);
			insBill.setTf_name(tf_name);
			insBill.setTf_remark(tf_remark);
			insBill.setTf_Village(tf_Village);
			insBill.setTf_FeesInfo(fees);
			ebi.save(insBill);
		} catch (DataAccessException e) {
			error("DataAccessException异常", e);
			if (e.getRootCause().getMessage().toLowerCase().indexOf("primary") != -1) {
				getInsertException("InnstallBill", "插入记录的主键值与数据库中原有的值重复!",
						ResponseErrorInfo.STATUS_VALIDATION_ERROR);
			} else {
				getInsertException("InnstallBill", e.getMessage(),
						ResponseErrorInfo.STATUS_VALIDATION_ERROR);
			}
		} catch (Exception e) {
			error("添加异常", e);
			// TODO Auto-generated catch block
			getInsertException("InnstallBill", "添加业主信息失败!",
					ResponseErrorInfo.STATUS_FAILURE);
		}
		return result;

	}
	*/

	@RequestMapping("/addinns")
	public void doSave(InnstallBill  model,BindingResult br, HttpServletRequest request,HttpServletResponse response,
			@RequestParam(value = "vid", required = true) int vid,
			@RequestParam(value = "feedid", required = true) int feedid
			) {
		FeesInfo fees=new FeesInfo();
		fees.setTf_feesid(feedid);
		Village tf_Village=new Village();
		tf_Village.setTf_viid(vid);
		model.setTf_FeesInfo(fees);
		model.setTf_Village(tf_Village);
		model.setTf_crateTime(AppUtils.getCurDate());
		model.setTf_enabled(true);
		
		try {
			model.setXcode(SecurityUserHolder.getIdentification());
			Object obj =ebi.save(model);
			toWrite(response,jsonBuilder.returnSuccessJson(jsonBuilder.toJson(obj)));
		}catch(TimeoutException e){
			SimpleBaseController.toWrite(response, jsonBuilder.returnFailureJson("'用户未登陆或会话超时!'"));
		}
		catch (Exception e) {
			e.printStackTrace();
			toWrite(response, jsonBuilder.returnFailureJson("'添加失败!'"));
		}
	}
	
	
	@RequestMapping("/loadins")
	public void load(HttpServletRequest request, HttpServletResponse response,
			String modueName) throws Exception {
		// TODO Auto-generated method stub
		super.load(request, response, "InnstallBill", (list->{
		    List<Map< String,Object>> views=new ArrayList<>();
		    views=list.stream().map(a->{
		    	InnstallBill bill=(InnstallBill)a;
		    	Map< String,Object> item=new HashMap<>();
		    	item.put("tf_insid", bill.getTf_insid());
		    	item.put("tf_name", bill.getTf_name());
		    	item.put("tf_remark", bill.getTf_remark());
		    	item.put("tf_crateTime", bill.getTf_crateTime());
		    	item.put("tf_enabled", bill.getTf_enabled());
		    	item.put("tf_FeesInfo", bill.getTf_FeesInfo().getTf_freesName());
		    	item.put("tf_Village", bill.getTf_Village().getTf_name());
		    	item.put("tf_billType", bill.getTf_billType());
				return item ;
			}).collect(Collectors.toList());
			return views;
		}));
		
	}

	@RequestMapping(value = "/removerecords")
	public @ResponseBody
	DataDeleteResponseInfo removeRecords(String moduleName, String[] titles,
			@RequestParam(value="ids",required=true) int[] ids,
			HttpServletRequest request) throws Exception {
		DataDeleteResponseInfo deleteResponseInfo=new DataDeleteResponseInfo();
		for(int id : ids){
			ebi.removeById(id, InnstallBill.class);
		}
		return deleteResponseInfo;
	}
	
}
