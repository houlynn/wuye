package com.property.base.controllers;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import javax.annotation.Resource;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
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
import com.model.hibernate.property.GtbillToLevf;
import com.model.hibernate.property.InnstallBill;
import com.model.hibernate.property.LevelInfo;
import com.model.hibernate.property.MeterInfo;
import com.model.hibernate.property.PoollGtinfo;
import com.model.hibernate.property.ResidentInfo;
import com.model.hibernate.property.Village;
import com.model.hibernate.system._Module;
import com.property.base.ebi.FeesEbi;
import com.ufo.framework.annotation.FieldInfo;
import com.ufo.framework.common.core.exception.CustomException;
import com.ufo.framework.common.core.exception.ResponseErrorInfo;
import com.ufo.framework.common.core.exception.TimeoutException;
import com.ufo.framework.common.core.ext.model.JSONTreeNode;
import com.ufo.framework.common.core.properties.PropUtil;
import com.ufo.framework.common.core.utils.AppUtils;
import com.ufo.framework.common.core.utils.JsonBuilder;
import com.ufo.framework.common.core.utils.StringUtil;
import com.ufo.framework.common.log.LogerManager;
import com.ufo.framework.system.controller.BaseAppController;
import com.ufo.framework.system.controller.SimpleBaseController;
import com.ufo.framework.system.ebi.CommonException;
import com.ufo.framework.system.ebi.Ebi;
import com.ufo.framework.system.ebo.ApplicationService;
import com.ufo.framework.system.shared.module.DataDeleteResponseInfo;
import com.ufo.framework.system.shared.module.DataFetchResponseInfo;
import com.ufo.framework.system.shared.module.DataInsertResponseInfo;
import com.ufo.framework.system.shared.module.DataUpdateResponseInfo;
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
		    	
		    	String hql=" from GtbillToLevf where 1=1 and tf_insid="+bill.getTf_insid();
		    	String ids="";
		    	try {
					List<GtbillToLevf> gtbs=(List<GtbillToLevf>) ebi.queryByHql(hql);
					List<String> listStr=gtbs.stream().map(obj->{
						return String.valueOf(obj.getTf_Leveid());
					}).collect(Collectors.toList());
					if(listStr!=null&listStr.size()>0){
						ids= StringUtils.join(listStr, ",");   
					}
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
		    	if(StringUtil.isNotEmpty(ids)){
		    		String queryLevf=" from LevelInfo where 1=1 and tf_leveId in("+ids+")";
		    		List<LevelInfo> levfs=null;
					try {
						levfs = (List<LevelInfo>) ebi.queryByHql(queryLevf);
					} catch (Exception e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
			    	String itemRemark="";
			    	if(levfs!=null&&levfs.size()>0){
			    		for(LevelInfo l :levfs ){
			    			itemRemark+=l.getTf_leveName();
			    		}
			    	}
			    	item.put("itemRemark", itemRemark);
		    	}
		    	
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
	@RequestMapping(value = "/innstall")
	public DataInsertResponseInfo InnstallBill(HttpServletRequest request, HttpServletResponse response,
			@RequestParam(value = "levfs", required = true) int levfs[],
			@RequestParam(value = "installid", required = true) int installid
			) throws Exception{
		   DataInsertResponseInfo result=new DataInsertResponseInfo();
	          try {
				boolean flag=	feeEbi.addInnstallBill(levfs, installid);
				if(flag){
					result.setDefaultMsg("'安装成功");
				}else{
				getAppException("", "安装失败!",ResponseErrorInfo.STATUS_FAILURE );
				}
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				getAppException("", "安装失败!错误信息"+e.getMessage(),ResponseErrorInfo.STATUS_FAILURE,e );
			}
		  return result;
	}
	
	@RequestMapping("/loadgtpwer")
	public void loadgtw(HttpServletRequest request, HttpServletResponse response,
			String modueName) throws Exception {
		// TODO Auto-generated method stub
		super.load(request, response, "PoollGtinfo", (list->{
		    List<Map< String,Object>> views=new ArrayList<>();
		    views=list.stream().map(a->{
		    	PoollGtinfo poollGtinfo=(PoollGtinfo)a;
		    	Map< String,Object> item=new HashMap<>();
		    	item.put("tf_poolid", poollGtinfo.getTf_poolid());
		    	item.put("tf_startnumber", poollGtinfo.getTf_startnumber());
		    	item.put("tf_endnumber", poollGtinfo.getTf_endnumber());
		    	item.put("tf_count", poollGtinfo.getTf_count());
		    	item.put("tf_coefficient", poollGtinfo.getTf_coefficient());
		    	item.put("tf_areaCount", poollGtinfo.getTf_areaCount());
		    	item.put("tf_meterdate", poollGtinfo.getTf_meterdate());
		    	item.put("tf_mtermane", poollGtinfo.getTf_mtermane());
		    	item.put("tf_InnstallBill", poollGtinfo.getTf_InnstallBill().getTf_name());
		    	item.put("tf_Acount", poollGtinfo.getTf_Acount());
		    	item.put("tf_Village", poollGtinfo.getTf_Village().getTf_name());
		    	item.put("tf_state", poollGtinfo.isTf_state());
		    	item.put("tf_remark", poollGtinfo.getTf_remark());
		    	item.put("itemRemark",poollGtinfo.getTf_InnstallBill().getTf_insid());
				return item ;
			}).collect(Collectors.toList());
			return views;
		}));
	}
	
	@RequestMapping("/addpool")
	public void doSave(PoollGtinfo  model,BindingResult br, HttpServletRequest request,HttpServletResponse response,
			@RequestParam(value = "vid", required = true) int vid,
			@RequestParam(value = "intsrid", required = true) int intsrid,
			@RequestParam(value = "type", required = true) String type
			) {
		try{
			SimpleDateFormat sdm=new SimpleDateFormat("yyyy-MM");
			String date=model.getTf_meterdate();
			String month= sdm.format(sdm.parse(date));
			String  checkHql="  select count(*) from PoollGtinfo where 1=1 and tf_mtype='"+type+"' and tf_rendMonth='"+month+"' and  tf_InnstallBill="+intsrid+" and tf_Village="+vid;
			Integer count=ebi.getCount(checkHql);
			if(count>0){
				toWrite(response, jsonBuilder.returnFailureJson("'"+month+"记录已存在,请修改即可!'"));
			}else{
		Village tf_Village=new Village();
		tf_Village.setTf_viid(vid);
		InnstallBill tf_InnstallBill=ebi.findById(InnstallBill.class, intsrid);
		model.setTf_Village(tf_Village);
		model.setTf_InnstallBill(tf_InnstallBill);
		model.setTf_mtype(type);
		model.setTf_rendMonth(month);
		String hqlo=" from PoollGtinfo where 1=1 and tf_mtype='"+type+"' and tf_state='1' and  tf_InnstallBill="+intsrid+" and tf_Village="+vid+" order by tf_rendMonth desc";
		List<PoollGtinfo>  pools= (List<PoollGtinfo>) ebi.queryByHql(hqlo);
		if(pools!=null&&pools.size()>0&&model.getTf_startnumber()==0){
			 double startnuber= pools.get(0).getTf_endnumber();
			 model.setTf_startnumber(startnuber);
		}
		
		if(model.getTf_coefficient()==0){
			model.setTf_coefficient(1);
		}
		
    	double area = getAreaSum(intsrid);
		if(model.getTf_areaCount()==0){
		model.setTf_areaCount(area);//已收楼面积
		}
		double price =tf_InnstallBill.getTf_FeesInfo().getTf_price();
		model.setTf_count(model.getTf_endnumber()-model.getTf_startnumber());
		double totalAcount=model.getTf_count()*price;
		model.setTf_totaleAcount(totalAcount);
		model.setXcode(SecurityUserHolder.getIdentification());
		ebi.save(model);
		toWrite(response,jsonBuilder.returnSuccessJson(jsonBuilder.toJson(model)));
			}
		}catch(TimeoutException e){
			toWrite(response, jsonBuilder.returnFailureJson("'用户未登陆或会话超时!'"));
		}catch(CustomException e){
			toWrite(response, jsonBuilder.returnFailureJson("'"+e.getErrorInfo().getErrorMessage()+"'"));
		}
				
		catch (Exception e) {
			e.printStackTrace();
			toWrite(response, jsonBuilder.returnFailureJson("'添加失败!'"));
		}
		
	}

	private double getAreaSum(int intsrid) throws Exception {
		String hqlgtLevf=" from GtbillToLevf where 1=1 and tf_insid="+intsrid;
    	String ids="";
			List<GtbillToLevf> gtbs=(List<GtbillToLevf>) ebi.queryByHql(hqlgtLevf);
			List<String> listStr=gtbs.stream().map(obj->{
				return String.valueOf(obj.getTf_Leveid());
			}).collect(Collectors.toList());
			if(listStr!=null&listStr.size()>0){
				ids= StringUtils.join(listStr, ",");   
			}else{
				getAppException("", "公表没有包含任何区域", ResponseErrorInfo.STATUS_FAILURE);
			}
		
		String hql=" select sum(o.tf_builArea) from  ResidentInfo o where 1=1 and o.tf_levelInfo.tf_parent.tf_leveId in("+ids+")";
		double area=ebi.getSumByHql(hql);
		return area;
	}
	
	
	@RequestMapping("/updatedpool")
	public void doUpdate(PoollGtinfo  model,BindingResult br, HttpServletRequest request,HttpServletResponse response,
			@RequestParam(value = "vid", required = true) int vid,
			@RequestParam(value = "intsrid", required = true) int intsrid,
			@RequestParam(value = "type", required = true) String type
			) {
		try{
			PoollGtinfo gtinfo=ebi.findById(PoollGtinfo.class, model.getTf_poolid());
			if(gtinfo.isTf_state()){
				toWrite(response, jsonBuilder.returnFailureJson("'"+gtinfo.getTf_rendMonth()+"记录已审核，无法进行修改操作!'"));
			}else{
	   Village tf_Village=new Village();
        tf_Village.setTf_viid(vid);
		InnstallBill tf_InnstallBill=ebi.findById(InnstallBill.class, intsrid);
		model.setTf_Village(tf_Village);
		model.setTf_InnstallBill(tf_InnstallBill);
		model.setTf_mtype(type);
		String date=model.getTf_meterdate();
		SimpleDateFormat sdm=new SimpleDateFormat("yyyy-MM");
		String month= sdm.format(sdm.parse(date));
		model.setTf_rendMonth(month);
		//String hql=" select sum(o.tf_builArea) from  ResidentInfo o where 1=1 and o.tf_levelInfo.tf_parent.tf_InnstallBill="+tf_InnstallBill.getTf_insid();
		//double area=ebi.getSumByHql(hql);
		double area = getAreaSum(intsrid);
		if(model.getTf_areaCount()==0){
			model.setTf_areaCount(area);//已收楼面积
			}
		double price =tf_InnstallBill.getTf_FeesInfo().getTf_price();
		String hqlo=" from PoollGtinfo where 1=1 and tf_mtype='"+type+"' and tf_state='1' and  tf_InnstallBill="+intsrid+" and tf_Village="+vid+" order by tf_rendMonth desc";
		List<PoollGtinfo>  pools= (List<PoollGtinfo>) ebi.queryByHql(hqlo);
		if(pools!=null&&pools.size()>0&&model.getTf_startnumber()==0){
			 double startnuber= pools.get(0).getTf_endnumber();
			 model.setTf_startnumber(startnuber);
		}
		model.setTf_count(model.getTf_endnumber()-model.getTf_startnumber());
		double totalAcount=model.getTf_count()*price;
		model.setTf_totaleAcount(totalAcount);
		model.setXcode(SecurityUserHolder.getIdentification());
		ebi.update(model);
		toWrite(response,jsonBuilder.returnSuccessJson(jsonBuilder.toJson(model)));
			}
		}catch(TimeoutException e){
			toWrite(response, jsonBuilder.returnFailureJson("'用户未登陆或会话超时!'"));
		}catch(CustomException e){
			toWrite(response, jsonBuilder.returnFailureJson("'"+e.getErrorInfo().getErrorMessage()+"'"));
		}
		catch (Exception e) {
			e.printStackTrace();
			toWrite(response, jsonBuilder.returnFailureJson("'更失败!'"));
		}
	}
	
	@RequestMapping("/submit")
	public DataUpdateResponseInfo submit(HttpServletRequest request,HttpServletResponse response,
			@RequestParam(value = "id", required = true)int id
			) throws Exception{
		    DataUpdateResponseInfo result=new DataUpdateResponseInfo();
			PoollGtinfo proll=ebi.findById(PoollGtinfo.class, id);
			boolean flag=false;
			flag= proll.isTf_state();
			proll.setTf_state(true);
			double area= proll.getTf_areaCount();
			double tf_Acount=0;
			if(area>0){
				tf_Acount=proll.getTf_totaleAcount()/area;
			}else{
					getDeleteException("", proll.getTf_meterdate()+"收楼面积为0审核失败!", ResponseErrorInfo.STATUS_FAILURE);
			}
			proll.setTf_Acount(tf_Acount);
			ebi.update(proll);
			result.setDefaultMsg("审核成功!");
			if(flag){
			getAppException("", proll.getTf_rendMonth()+ "--记录已审核!",ResponseErrorInfo.STATUS_CUSTOM_WARM );
			}
		return result;
	}
	
	@RequestMapping(value = "/removerepol")
	public @ResponseBody
	DataDeleteResponseInfo removerepol(String moduleName, String[] titles,
			@RequestParam(value="ids",required=true) int[] ids,
			HttpServletRequest request) throws Exception {
		DataDeleteResponseInfo deleteResponseInfo=new DataDeleteResponseInfo();
		for(int id : ids){
			PoollGtinfo pool= ebi.findById(PoollGtinfo.class, id);
			if(pool.isTf_state()){
				getDeleteException("", pool.getTf_meterdate()+"已审核，无法进行删除操作!", ResponseErrorInfo.STATUS_FAILURE);
			}
			ebi.removeById(id, PoollGtinfo.class);
		}
		return deleteResponseInfo;
	}
	
	
	
	
	
}
