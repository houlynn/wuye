package com.property.base.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.model.hibernate.property.LevelInfo;
import com.model.hibernate.property.ResidentInfo;
import com.model.hibernate.system._Module;
import com.property.base.ebi.FeesEbi;
import com.ufo.framework.common.core.exception.ResponseErrorInfo;
import com.ufo.framework.common.core.ext.model.JSONTreeNode;
import com.ufo.framework.common.core.properties.PropUtil;
import com.ufo.framework.common.log.LogerManager;
import com.ufo.framework.system.ebi.CommonException;
import com.ufo.framework.system.ebi.Ebi;
import com.ufo.framework.system.ebo.ApplicationService;
import com.ufo.framework.system.repertory.SqlModuleFilter;
import com.ufo.framework.system.shared.module.DataFetchResponseInfo;
import com.ufo.framework.system.shared.module.DataInsertResponseInfo;
import com.ufo.framework.system.web.SecurityUserHolder;

@Controller
@RequestMapping("/201")
public class FeesController   implements LogerManager,CommonException {
	@Resource(name="ebo")
	private Ebi ebi;

	public Ebi getEbi() {
		return ebi;
	}
	
	@Autowired
	private  FeesEbi  feeEbi;
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
	 * @throws Exception 
	 */
	@RequestMapping(value = "/fetchdata", method = RequestMethod.GET)
	public @ResponseBody
	Map<String, Object> fetchData(String moduleName, Integer start, Integer limit, String sort,
			String query, String columns, String navigates, String parentFilter,String nodeInfoType,
			HttpServletRequest request) throws Exception {
		DataFetchResponseInfo response =feeEbi.fetchData(moduleName, start, limit, sort, query, navigates,nodeInfoType);
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("records", response.getMatchingObjects());
		result.put("totalCount", response.getTotalRows());
		return result;
	}
	
	
	
	
	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public @ResponseBody
	DataInsertResponseInfo addWithNoPrimaryKey(String moduleName,   @RequestBody String inserted,
			HttpServletRequest request) throws Exception {
		 DataInsertResponseInfo result =new DataInsertResponseInfo();
		 String parentFilter=request.getParameter("parentFilter");
		 String navigates=request.getParameter("navigates");
		 _Module module=ApplicationService.getModuleWithName(moduleName);
		try {
			
			
			
			
		} catch (DataAccessException e) {
		      error("DataAccessException异常", e);
			if (e.getRootCause().getMessage().toLowerCase().indexOf("primary") != -1){
				getInsertException(module.getTf_moduleName(),module.getTf_primaryKey() +"插入记录的主键值与数据库中原有的值重复!",ResponseErrorInfo.STATUS_VALIDATION_ERROR);
		}else{
			
			getInsertException(module.getTf_moduleName(),e.getMessage(),ResponseErrorInfo.STATUS_VALIDATION_ERROR);
		}
	}catch (Exception e) {
		error("添加异常", e);
		// TODO Auto-generated catch block
		getInsertException(moduleName,"添加业主信息失败!",ResponseErrorInfo.STATUS_FAILURE);
	}
	return result;	
		
	}
	
	
	
	@RequestMapping("/loadLR")
	public @ResponseBody List<JSONTreeNode>  getTree(HttpServletRequest request,HttpServletResponse response,
			@RequestParam(value="vid",required=true) int vid,
			@RequestParam(value="orderSql",required=false,defaultValue=" order by tf_leveId DESC") String orderSql
			){
		List<JSONTreeNode> lists=new ArrayList<JSONTreeNode>();
		try
		{
		List<LevelInfo> leves=(List<LevelInfo>) ebi.queryByHql(" from LevelInfo where 1=1   and  tf_parent=null  and tf_village="+vid+ orderSql);
		for(LevelInfo l:leves){
			JSONTreeNode node=new JSONTreeNode();
			node.setId(l.getTf_leveId()+"tf_leveName");
			node.setText(l.getTf_leveName());
			node.setCode(l.getTf_leveId()+"");
			node.setNodeInfo("LevelInfo");
			node.setCls("tree_set_perm");
			node.setIcon(l.getIcon());
			node.setDescription("tf_leveName");
			node.setExpanded(true);
			node.setLeaf(false);
			node.setNodeInfoType("0");
			if(l.getTf_childs()!=null&&l.getTf_childs().size()>0){
				List<JSONTreeNode> childrens=new ArrayList<>();
				for(LevelInfo childleve :l.getTf_childs() ){
					JSONTreeNode childNode=new JSONTreeNode();
					childNode.setId(childleve.getTf_leveId()+""+"LevelInfo");
					childNode.setText(childleve.getTf_leveName());
					childNode.setCode(childleve.getTf_leveId()+"");
					childNode.setNodeInfo("LevelInfo");
					childNode.setLeaf(false);
					node.setExpanded(true);
					childNode.setIcon(PropUtil.get("sys.leve.LevelInfoChild"));
					childNode.setDescription("tf_leveName");
					childNode.setNodeInfoType("1");
					String hql=" from ResidentInfo where 1=1 and tf_levelInfo="+childleve.getTf_leveId()+ " and xcode='"+SecurityUserHolder.getIdentification()+"'";
					List<ResidentInfo> residents=(List<ResidentInfo>) ebi.queryByHql(hql); 
					List<JSONTreeNode> rchilds=new ArrayList<JSONTreeNode>();
					rchilds=residents.parallelStream().map(item->{
						JSONTreeNode  rnode=new JSONTreeNode();
						rnode.setId(String.valueOf( item.getTf_residentId())+"ResidentInfo");
						rnode.setText("<span style='color:red;font-weight:bold'>"+item.getTf_number()+"</span>" + item.getTf_residentName());
						rnode.setCode(item.getTf_residentId()+"");
						rnode.setNodeInfo("ResidentInfo");
						rnode.setLeaf(true);
						rnode.setIcon(PropUtil.get("sys.rbac.userIcon"));
						rnode.setDescription("tf_residentName");
						rnode.setNodeInfoType("2");
						return rnode;
					}).collect(Collectors.toList());
					childNode.setChildren(rchilds);
					childrens.add(childNode);
					childNode=null;
				}
				node.setChildren(childrens);
			}
			lists.add(node);
		}
		}catch(Exception e){
			e.printStackTrace();
		}
		return lists;
	}
	
	@RequestMapping("/acount")
	public @ResponseBody  DataInsertResponseInfo setAcount(
			@RequestParam(value="rendate",required=true)	String rendate,
			@RequestParam(value="type",required=true) String type
			) throws Exception{
		DataInsertResponseInfo resutl=new DataInsertResponseInfo();
		feeEbi.updateAcount(rendate, type);
		return resutl;
	}
	
	

	
   private @ResponseBody String  getList(HttpServletRequest request){
    	
	   return null;
    }

}
