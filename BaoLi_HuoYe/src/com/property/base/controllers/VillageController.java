package com.property.base.controllers;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.annotation.Resource;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.io.FileUtils;
import org.codehaus.jackson.annotate.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.model.hibernate.property.ExpressInfo;
import com.model.hibernate.property.LevelInfo;
import com.model.hibernate.property.NoticeInfo;
import com.model.hibernate.property.PointFrientInfo;
import com.model.hibernate.property.RepairInfo;
import com.model.hibernate.property.ResidentInfo;
import com.model.hibernate.property.Village;
import com.ufo.framework.annotation.FieldInfo;
import com.ufo.framework.common.core.ext.model.JSONTreeNode;
import com.ufo.framework.common.core.properties.PropUtil;
import com.ufo.framework.common.core.utils.AppUtils;
import com.ufo.framework.common.core.utils.JsonBuilder;
import com.ufo.framework.common.core.web.ModuleServiceFunction;
import com.ufo.framework.system.controller.BaseController;
import com.ufo.framework.system.ebi.Ebi;
import com.ufo.framework.system.shared.module.DataDeleteResponseInfo;
import com.ufo.framework.system.shared.module.DataInsertResponseInfo;
import com.ufo.framework.system.shared.module.DataUpdateResponseInfo;
import com.ufo.framework.system.web.SecurityUserHolder;

@RequestMapping("/vi")
@Controller
public class VillageController extends BaseController {

	private static JsonBuilder jsonBuilder;
	static{
		jsonBuilder=JsonBuilder.getInstance();
	}
	@Resource(name="ebo")
	private Ebi ebi;
	
	
	@RequestMapping(value = "/removerecords.action")
	public @ResponseBody
	DataDeleteResponseInfo removeRecords(String moduleName, String[] titles,
			@RequestParam(value="ids",required=false) int[] ids,
			HttpServletRequest request) throws Exception {
		DataDeleteResponseInfo 	result = new DataDeleteResponseInfo();
		for(int id : ids){
			PointFrientInfo info=ebi.findById(PointFrientInfo.class, id);
			ebi.delete(info);
		}
		return result;
	}
	

	
	@RequestMapping(value = "/removePoint/{id}", method = RequestMethod.DELETE)
	public @ResponseBody
	DataDeleteResponseInfo remove(String moduleName, @PathVariable int id,
			HttpServletRequest request) throws Exception {
		DataDeleteResponseInfo  result = new DataDeleteResponseInfo();
		try {
			PointFrientInfo info=ebi.findById(PointFrientInfo.class, id);
			ebi.delete(info);
		} catch (DataAccessException e) {
			String errormessage = ModuleServiceFunction.addPK_ConstraintMessage(e, moduleName);
			errormessage= errormessage != null ? errormessage: "请检查与本记录相关联的其他数据是否全部清空！<br/>";
			getDeleteException(moduleName, errormessage, -1, e);
		} 
		return result;
	}
	
	@RequestMapping("/audit")
  public @ResponseBody DataUpdateResponseInfo audit(
		  @RequestParam(value="id",required=true) int id
		  ) throws Exception{
	  DataUpdateResponseInfo result=new DataUpdateResponseInfo();
	  PointFrientInfo info=ebi.findById(PointFrientInfo.class, id);
	  info.setTf_state("1");
	  info.setTf_posttime(AppUtils.getCurrentTime());
	  ebi.update(info);
	  return result;
  }
	
	
	
	
	
	/**
	 * 加载小区树
	 * @return
	 */
	@RequestMapping("/loadVi")
	public  @ResponseBody List<JSONTreeNode> getVill(){
		List<JSONTreeNode> views=new ArrayList<JSONTreeNode>();
		try {
			String hql=" from Village where 1=1 and xcode='"+SecurityUserHolder.getIdentification()+"'";
			List<Village> villages= (List<Village>) ebi.queryByHql(hql);
			views=	villages.stream().map(item->{
				JSONTreeNode node=new  JSONTreeNode();
				 node.setCode(item.getTf_viid()+"");
				 node.setText(item.getTf_name());
				 node.setNodeInfo("Village");
				return node;
			}).collect(Collectors.toList());
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return views;
	}
	
	@RequestMapping("/loadPoint")
	public @ResponseBody Map<String, Object> fetchData(Integer start, Integer limit,
			@RequestParam(value="whereSql",required=false,defaultValue="") String whereSql,
	    	@RequestParam(value="parentSql",required=false,defaultValue="") String parentSql,
	    	@RequestParam(value="querySql",required=false,defaultValue="") String querySql,
	    	@RequestParam(value="orderSql",required=false,defaultValue="") String orderSql,
	    	@RequestParam(value="vid",required=true) int vid,
	    	@RequestParam(value="ctype",required=true) String ctype,
			HttpServletRequest request) throws Exception {;
		whereSql+=" and tf_Village="+vid;
		whereSql+=" and tf_ctype='"+ctype+"'";
		return super.load(start, limit, whereSql, parentSql, querySql, orderSql, "PointFrientInfo", request, (dataList)->{
			List<PointFrientInfo> list=(List<PointFrientInfo>)dataList;
			list=list.stream().map(item->{
		    item.setTf_vname(item.getTf_Village().getTf_name());
		    
			return item;
			}).collect(Collectors.toList());
			return  list;
		});
	}
	@RequestMapping(value = "/createPoint", method = RequestMethod.POST ,produces = "application/json;text/plain;charset=UTF-8")
	public @ResponseBody
	String add(@Validated PointFrientInfo model,
			BindingResult br,@RequestParam("tf_topUrl") MultipartFile topUrl,
			HttpServletRequest request) throws Exception {
		String ctype=request.getParameter("ctype");
		Integer vid=Integer.parseInt( request.getParameter("vid"));
		String reslut="";
		model.setTf_ctype(ctype);
		model.setTf_posttime(AppUtils.getCurrentTime());
		Village village=new Village();
		village.setTf_viid(vid);
		model.setTf_Village(village);
/*		if(!topUrl.isEmpty()){
        String realPath = request.getSession().getServletContext().getRealPath(PropUtil.get("baoli.upload.path"));  
        String suffix = topUrl.getOriginalFilename().substring  
                (topUrl.getOriginalFilename().lastIndexOf("."));     
       String logImageName = UUID.randomUUID().toString()+ suffix;//构建文件名称     
        File file=new File(realPath+"/"+logImageName);
        topUrl.transferTo(file); 
        model.setTf_topUrl(PropUtil.get("baoli.upload.path")+"/"+logImageName);
		}*/
		ebi.save(model);
		reslut=jsonBuilder.returnSuccessJson(jsonBuilder.toJson(model));
		return reslut;
		
	}

	
	@RequestMapping(value = "/updatePoint", method = RequestMethod.POST,produces = "application/json;text/plain;charset=UTF-8")
	public @ResponseBody
	String update(@Validated PointFrientInfo model,
			BindingResult br,@RequestParam("tf_topUrl") MultipartFile topUrl,
			HttpServletRequest request) throws Exception {
		String reslut="";
	   String ctype=request.getParameter("ctype");
		Integer vid=Integer.parseInt( request.getParameter("vid"));
		model.setTf_ctype(ctype);
		model.setTf_posttime(AppUtils.getCurrentTime());
		Village village=new Village();
		village.setTf_viid(vid);
		model.setTf_Village(village);
		if(!topUrl.isEmpty()){
        String realPath = request.getSession().getServletContext().getRealPath(PropUtil.get("baoli.upload.path"));  
        String suffix = topUrl.getOriginalFilename().substring  
                (topUrl.getOriginalFilename().lastIndexOf("."));     
          String logImageName = UUID.randomUUID().toString()+ suffix;//构建文件名称     
          File dir=new File(realPath);
          if(!dir.exists()){
        	  dir.mkdir();
          }
        File file=new File(realPath+"/"+logImageName);
        topUrl.transferTo(file); 
        model.setTf_topUrl(PropUtil.get("baoli.upload.path")+"/"+logImageName);
		}else{
			PointFrientInfo oFrientInfo=	ebi.findById(PointFrientInfo.class, model.getTf_pointId());
			model.setTf_topUrl(oFrientInfo.getTf_topUrl());
			
		}
		ebi.update(model);
		reslut=jsonBuilder.returnSuccessJson(jsonBuilder.toJson(model));
		return reslut;
		
	}
	
	
	
	@RequestMapping("/loadVLevf")
	public  @ResponseBody List<JSONTreeNode> getVill(
			@RequestParam(value="vid",required=true) int vid,
			@RequestParam(value="orderSql",required=false,defaultValue=" order by tf_leveName ASC") String orderSql
			) throws Exception{
		List<JSONTreeNode> lists=new ArrayList<JSONTreeNode>();
		List<LevelInfo> leves=(List<LevelInfo>) ebi.queryByHql(" from LevelInfo where 1=1   and  tf_parent=null  and tf_village="+vid+ orderSql);
		for(LevelInfo l:leves){
			JSONTreeNode node=new JSONTreeNode();
			node.setId(l.getTf_leveId()+"");
			node.setText(l.getTf_leveName());
			node.setCode(l.getTf_leveId()+"");
			node.setNodeInfo("LevelInfo");
			node.setCls("tree_set_perm");
			node.setIcon(l.getIcon());
			node.setDescription("tf_leveName");
			node.setExpanded(true);
			node.setLeaf(false);
			node.setNodeInfoType("0");
			node.setChecked(false);
			lists.add(node);
		}
		return lists;
		
		
	}
	
	@RequestMapping("/loadexpre")
	public @ResponseBody Map<String, Object> loadExpre(Integer start, Integer limit,
			@RequestParam(value="whereSql",required=false,defaultValue="") String whereSql,
	    	@RequestParam(value="parentSql",required=false,defaultValue="") String parentSql,
	    	@RequestParam(value="querySql",required=false,defaultValue="") String querySql,
	    	@RequestParam(value="orderSql",required=false,defaultValue="") String orderSql,
	    	@RequestParam(value="vid",required=true) int vid,
			HttpServletRequest request) throws Exception {;
		whereSql+=" and tf_village="+vid;
		return super.load(start, limit, whereSql, parentSql, querySql, orderSql, "ExpressInfo", request, (dataList)->{
			List<ExpressInfo> list=(List<ExpressInfo>)dataList;
			list=list.stream().map(item->{
		    item.setTf_vname(item.getTf_village().getTf_name());
			return item;
			}).collect(Collectors.toList());
			return  list;
		});
	}
	
	@RequestMapping("/auditExpre")
	  public @ResponseBody DataUpdateResponseInfo auditExpre(
			  @RequestParam(value="id",required=true) int id
			  ) throws Exception{
		  DataUpdateResponseInfo result=new DataUpdateResponseInfo();
		  ExpressInfo info=ebi.findById(ExpressInfo.class, id);
		  info.setTf_state("1");
		  ebi.update(info);
		  return result;
	  }
		
	@RequestMapping(value = "/removeExpre.action")
	public @ResponseBody
	DataDeleteResponseInfo removeExpre(String moduleName, String[] titles,
			@RequestParam(value="ids",required=false) int[] ids,
			HttpServletRequest request) throws Exception {
		DataDeleteResponseInfo 	result = new DataDeleteResponseInfo();
		for(int id : ids){
			ExpressInfo info=ebi.findById(ExpressInfo.class, id);
			ebi.delete(info);
		}
		return result;
	}
	
	@RequestMapping("/loadRepair")
	public @ResponseBody Map<String, Object> loadRepair(Integer start, Integer limit,
			@RequestParam(value="whereSql",required=false,defaultValue="") String whereSql,
	    	@RequestParam(value="parentSql",required=false,defaultValue="") String parentSql,
	    	@RequestParam(value="querySql",required=false,defaultValue="") String querySql,
	    	@RequestParam(value="orderSql",required=false,defaultValue="") String orderSql,
	    	@RequestParam(value="vid",required=true) int vid,
			HttpServletRequest request) throws Exception {
		whereSql+=" and tf_ResidentInfo.tf_levelInfo.tf_parent.tf_village.tf_viid="+vid;
		
		return super.load(start, limit, whereSql, parentSql, querySql, orderSql, "RepairInfo", request, (dataList)->{
			List<RepairInfo> list=(List<RepairInfo>)dataList;
			  List<Map<String,Object>> datas=new ArrayList<>();
			  for(RepairInfo r:list ){
					Map<String,Object> view=new HashMap<String, Object>();
					view.put("tf_repairId", r.getTf_repairId());
					view.put("tf_ResidentInfo",r.getTf_ResidentInfo().getTf_levelInfo().getTf_parent().getTf_village().getTf_name()+"-"
							+r.getTf_ResidentInfo().getTf_levelInfo().getTf_parent().getTf_leveName()+"--"
							+r.getTf_ResidentInfo().getTf_levelInfo().getTf_leveName()+"--"
							+r.getTf_ResidentInfo().getTf_number()+"--"+r.getTf_ResidentInfo().getTf_residentName());
					view.put("tf_repairItem", r.getTf_repairItem());
					view.put("tf_repairTime", r.getTf_repairTime());
					view.put("tf_state", r.getTf_state());
					view.put("tf_dowithDate", r.getTf_dowithDate());
					view.put("tf_repairMan", r.getTf_repairMan());
					view.put("tf_levf", r.getTf_levf());
					view.put("tf_remark", r.getTf_remark());
					view.put("tf_appPhone", r.getTf_appPhone());
					datas.add(view);
					view=null;
			  }
			  return datas;
			
	});
	}
			  
	@RequestMapping("/loadNotice")
	public @ResponseBody Map<String, Object> loadNotice(Integer start, Integer limit,
			@RequestParam(value="whereSql",required=false,defaultValue="") String whereSql,
	    	@RequestParam(value="parentSql",required=false,defaultValue="") String parentSql,
	    	@RequestParam(value="querySql",required=false,defaultValue="") String querySql,
	    	@RequestParam(value="orderSql",required=false,defaultValue=" order by tf_state , tf_createtime desc") String orderSql,
	    	@RequestParam(value="vid",required=true) int vid,
			HttpServletRequest request) throws Exception {
		whereSql+=" and tf_Village="+vid;
		return super.load(start, limit, whereSql, parentSql, querySql, orderSql, "NoticeInfo", request, (dataList)->{
			List<NoticeInfo> list=(List<NoticeInfo>)dataList;
			  List<Map<String,Object>> datas=new ArrayList<>();
			  for(NoticeInfo n:list ){
					Map<String,Object> view=new HashMap<String, Object>();
					view.put("tf_noticeId", n.getTf_noticeId());
					view.put("tf_souce", n.getTf_souce());
					view.put("tf_time", n.getTf_time());
					view.put("tf_levf", n.getTf_levf());
					view.put("tf_title", n.getTf_title());
					view.put("tf_content", n.getTf_content());
					view.put("tf_Village", n.getTf_Village().getTf_name());
					view.put("tf_createtime", n.getTf_createtime());
					view.put("tf_state", n.getTf_state());
					datas.add(view);
					view=null;
			  }
			  return datas;
			
	});
	}
    
	
		@RequestMapping(value = "/updateNotice", method = RequestMethod.POST,produces = "application/json;text/plain;charset=UTF-8")
		public  @ResponseBody String updateNotice(@Validated NoticeInfo model,
				@RequestParam(value="vid",required=true) int vid,	
				HttpServletRequest request) throws Exception {
			Village village=new Village();
			village.setTf_viid(vid);
			model.setTf_Village(village);
			Map<String,Object> values=new HashMap<String, Object>();
			values.put("tf_souce", model.getTf_souce());
			values.put("tf_levf", model.getTf_levf());
			values.put("tf_title", model.getTf_title());
		    values.put("tf_content", model.getTf_content());
			Object obj= ebi.update(values, NoticeInfo.class, model.getTf_noticeId());
			 String  reslut=jsonBuilder.returnSuccessJson(jsonBuilder.toJson(obj));
			 return reslut;
		}
		
	
	@RequestMapping(value = "/createNotice", method = RequestMethod.POST ,produces = "application/json;text/plain;charset=UTF-8")
	public @ResponseBody
	String add(@Validated NoticeInfo model,
			@RequestParam(value="vid",required=true) int vid,	
			HttpServletRequest request) throws Exception {
		Village village=new Village();
		village.setTf_viid(vid);
		model.setTf_Village(village);
		model.setTf_createtime(AppUtils.getCurrentTime());
		model.setTf_state("0");
		model.setTf_time("");
		ebi.save(model);
    	String	reslut=jsonBuilder.returnSuccessJson(jsonBuilder.toJson(model));
		return reslut;
	}
		
	@RequestMapping(value = "/removeNotice.action")
	public @ResponseBody
	DataDeleteResponseInfo removeNotice(String moduleName, String[] titles,
			@RequestParam(value="ids",required=false) int[] ids,
			HttpServletRequest request) throws Exception {
		DataDeleteResponseInfo 	result = new DataDeleteResponseInfo();
		for(int id : ids){
			NoticeInfo info=ebi.findById(NoticeInfo.class, id);
			ebi.delete(info);
		}
		return result;
	}
	
	@RequestMapping("/auditNotice")
	  public @ResponseBody DataUpdateResponseInfo auditNotice(
			  @RequestParam(value="id",required=true) int id
			  ) throws Exception{
		  DataUpdateResponseInfo result=new DataUpdateResponseInfo();
		  NoticeInfo info=ebi.findById(NoticeInfo.class, id);
		  info.setTf_state("1");
		  info.setTf_time(AppUtils.getCurrentTime());
		  ebi.update(info);
		  return result;
	  }
	
}
