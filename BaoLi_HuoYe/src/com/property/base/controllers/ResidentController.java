package com.property.base.controllers;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.model.hibernate.property.LevelInfo;
import com.model.hibernate.property.ResidentInfo;
import com.model.hibernate.property.Village;
import com.property.base.ebi.ResidentEbi;
import com.ufo.framework.common.constant.RequestPathConstants;
import com.ufo.framework.common.core.exception.DeleteException;
import com.ufo.framework.common.core.exception.InsertException;
import com.ufo.framework.common.core.exception.ResponseErrorInfo;
import com.ufo.framework.common.core.ext.model.JSONTreeNode;
import com.ufo.framework.common.core.properties.PropUtil;
import com.ufo.framework.common.core.web.ModuleServiceFunction;
import com.ufo.framework.common.log.LogerManager;
import com.ufo.framework.system.ebi.CommonException;
import com.ufo.framework.system.ebi.Ebi;
import com.ufo.framework.system.ebi.ModelEbi;
import com.ufo.framework.system.irepertory.IModelRepertory;
import com.ufo.framework.system.shared.module.DataDeleteResponseInfo;
import com.ufo.framework.system.shared.module.DataInsertResponseInfo;
@Controller
@RequestMapping("/102")
public class ResidentController    implements LogerManager,CommonException {
	@Resource(name="ebo")
	private Ebi ebi;

	public Ebi getEbi() {
		return ebi;
	}

	public void setEbi(Ebi ebi) {
		this.ebi = ebi;
	}
	@Autowired
	private ResidentEbi  rebi;
	public ResidentEbi getRebi() {
		return rebi;
	}

	public void setRebi(ResidentEbi rebi) {
		this.rebi = rebi;
	}
	@Resource
	private IModelRepertory moduleDAO;
	@Resource
	private ModelEbi moduleService;
	
	
	public ModelEbi getModuleService() {
		return moduleService;
	}

	public void setModuleService(ModelEbi moduleService) {
		this.moduleService = moduleService;
	}

	@RequestMapping(RequestPathConstants.REQUEST_LOADPATH)
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
			if(l.getTf_childs()!=null&&l.getTf_childs().size()>0){
				List<JSONTreeNode> childrens=new ArrayList<>();
				for(LevelInfo childleve :l.getTf_childs() ){
					JSONTreeNode childNode=new JSONTreeNode();
					childNode.setId(childleve.getTf_leveId()+"");
					childNode.setText(childleve.getTf_leveName());
					childNode.setCode(childleve.getTf_leveId()+"");
					childNode.setNodeInfo("LevelInfo");
					childNode.setLeaf(true);
					childNode.setIcon(PropUtil.get("sys.leve.LevelInfoChild"));
					childNode.setDescription("tf_leveName");
					childNode.setNodeInfoType("1");
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
	
	@RequestMapping(RequestPathConstants.REQUEST_INSERTPATH)
	public @ResponseBody DataInsertResponseInfo add(@RequestParam(value="vid",required=true) int vid,@RequestParam(value="leveName",required=true) String leveName ,
			@RequestParam(value="level",required=true) String level,
			@RequestParam(value="parent",required=false) String parent
			
			) throws Exception{
		DataInsertResponseInfo result =new DataInsertResponseInfo();
				 LevelInfo info=new LevelInfo();
				 Village village=new Village();
				 village.setTf_viid(vid);
				 info.setTf_village(village);
				 info.setTf_leveName(leveName);
				 info.setTf_level(level);
				 if("1".equals(level)){
					 LevelInfo levelInfo=new LevelInfo();
					 levelInfo.setTf_leveId(Integer.parseInt(parent));
					 info.setTf_parent(levelInfo);
				 }else{
					 info.setTf_parent(null);
				 }
				 try {
					ebi.save(info);
				} catch (Exception e) {
					error("添加异常", e);
					// TODO Auto-generated catch block
					getInsertException("LevelInfo","添加楼宇失败!",ResponseErrorInfo.STATUS_FAILURE);
				}
		return result;
	}
	@RequestMapping(RequestPathConstants.REQUEST_DELETEPATH)
  	public @ResponseBody  DataDeleteResponseInfo remove(
  			@RequestParam(value="tf_leveId",required=true) int tf_leveId
  			) throws Exception {
		     DataDeleteResponseInfo result=new DataDeleteResponseInfo();
					try {
						
						ebi.removeById(tf_leveId, LevelInfo.class);
					} 
					catch (DataIntegrityViolationException e) {
						getDeleteException("LevelInfo", "请检查与本记录相关联的其他数据是否全部清空！", ResponseErrorInfo.STATUS_FAILURE, e);
						error("删除异常", e);
					} 
					catch (DataAccessException e) {
						String errormessage = ModuleServiceFunction.addPK_ConstraintMessage(e, "LevelInfo");
						getDeleteException("LevelInfo",  errormessage != null ? errormessage
								: "请检查与本记录相关联的其他数据是否全部清空！<br/>", ResponseErrorInfo.STATUS_FAILURE, e);
					} catch (Exception e) {
						error("删除异常", e);
						// TODO Auto-generated catch block
						getDeleteException("LevelInfo", " 删除楼宇失败!", ResponseErrorInfo.STATUS_FAILURE, e);
					}
					return result;
			 }
	
	
	
	@RequestMapping(value = "/remove.do/{id}", method = RequestMethod.DELETE)
  	public @ResponseBody  DataDeleteResponseInfo remove(String moduleName, @PathVariable("id") String id,HttpServletRequest request) throws Exception {
		     DataDeleteResponseInfo result=new DataDeleteResponseInfo();
					try {
						
						ebi.removeById(Integer.valueOf(id), ResidentInfo.class);
					} 
					catch (DataIntegrityViolationException e) {
						getDeleteException("LevelInfo", "请检查与本记录相关联的其他数据是否全部清空！", ResponseErrorInfo.STATUS_FAILURE, e);
						error("删除异常", e);
					} 
					catch (DataAccessException e) {
						String errormessage = ModuleServiceFunction.addPK_ConstraintMessage(e, "LevelInfo");
						getDeleteException("LevelInfo",  errormessage != null ? errormessage
								: "请检查与本记录相关联的其他数据是否全部清空！<br/>", ResponseErrorInfo.STATUS_FAILURE, e);
					} catch (Exception e) {
						error("删除异常", e);
						// TODO Auto-generated catch block
						getDeleteException("LevelInfo", " 删除业主失败!", ResponseErrorInfo.STATUS_FAILURE, e);
					}
					return result;
			 }
	
	
	
	
	
	@RequestMapping("/setting")
	public @ResponseBody DataInsertResponseInfo setting(
			@RequestParam(value="dataStr",required=true) String dataStr,
			@RequestParam(value="ids",required=true) int[] ids
			) throws Exception{
		DataInsertResponseInfo result=new DataInsertResponseInfo();
			 try {
				 rebi.updateSettingFeesItem(dataStr, ids);
				} catch (Exception e) {
					error("添加异常", e);
					// TODO Auto-generated catch block
					getInsertException("LevelInfo","设置收费项目失败!",ResponseErrorInfo.STATUS_FAILURE);
				}
		return result;
		
	}
	
	
	
	
	
	
	
	
	
/*	

	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public @ResponseBody
	DataInsertResponseInfo add(String moduleName, @RequestBody String inserted,
			HttpServletRequest request) throws Exception {
		DataInsertResponseInfo result =new DataInsertResponseInfo();
		 String parentFilter=request.getParameter("parentFilter");
		 String navigates=request.getParameter("navigates");
		 _Module module=ApplicationService.getModuleWithName(moduleName);
		try {
			JSONObject updateJsonObject = JSONObject.fromObject(inserted);
			ResidentInfo record=new ResidentInfo();
			moduleDAO.updateValueToBean(moduleName, record, updateJsonObject);
			String hql="  "
			record.seTf_residentId(record.getTf_levelInfo().getTf_leveId())
			
		
			
			
			result = moduleService.add(moduleName, inserted, parentFilter,navigates, request);
			if (result.getKey() != null) // 如果是空的话，那么就没有保存，错误原因已经在errorMessage里了
				result.getRecords().add(
						moduleDAO.getModuleRecord(moduleName, result.getKey(), request).toString());
		
			
			
			
			
			
			
			
			
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
	*/
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

	
	
}
	
	

