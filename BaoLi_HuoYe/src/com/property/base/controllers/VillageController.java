package com.property.base.controllers;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.io.FileUtils;
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

import com.model.hibernate.property.PointFrientInfo;
import com.model.hibernate.property.Village;
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
        File file=new File(realPath+"/"+logImageName);
        topUrl.transferTo(file); 
        model.setTf_topUrl(PropUtil.get("baoli.upload.path")+"/"+logImageName);
		}
		ebi.update(model);
		reslut=jsonBuilder.returnSuccessJson(jsonBuilder.toJson(model));
		return reslut;
		
	}
	
	
	
	
}
