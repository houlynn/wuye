package com.ufo.framework.system.controller;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.model.hibernate.system._Module;
import com.ufo.framework.annotation.TableInfo;
import com.ufo.framework.annotation.TreeItemName;
import com.ufo.framework.annotation.TreeItemValue;
import com.ufo.framework.common.constant.CommConstants;
import com.ufo.framework.common.core.exception.DeleteException;
import com.ufo.framework.common.core.exception.ResponseErrorInfo;
import com.ufo.framework.common.core.exception.UpdateException;
import com.ufo.framework.common.core.utils.EntityUtil;
import com.ufo.framework.common.core.utils.StringUtil;
import com.ufo.framework.common.core.web.ModuleServiceFunction;
import com.ufo.framework.common.log.LogerManager;
import com.ufo.framework.common.model.Model;
import com.ufo.framework.system.ebi.CommonException;
import com.ufo.framework.system.ebi.Ebi;
import com.ufo.framework.system.ebi.ModelEbi;
import com.ufo.framework.system.ebo.ApplicationService;
import com.ufo.framework.system.ebo.ModuleService;
import com.ufo.framework.system.irepertory.IModelRepertory;
import com.ufo.framework.system.model.ui.JSONTreeNode;
import com.ufo.framework.system.repertory.SqlModuleFilter;
import com.ufo.framework.system.shared.module.DataDeleteResponseInfo;
import com.ufo.framework.system.shared.module.DataFetchResponseInfo;
import com.ufo.framework.system.shared.module.DataInsertResponseInfo;
import com.ufo.framework.system.shared.module.DataUpdateResponseInfo;
@Controller
@RequestMapping(value = "/module")
/**
 * 所有模块的的ＣＲＵＤ都是调用这个类的函数来完成的Controller里面完成的
 *
* @author HouLynn
* @date 2014年10月21日
  @version 1.0
 */
public class ModuleController implements LogerManager,CommonException {

	public ModuleController() {
		debug(this.getClass().getName());
	}


	@Resource
	private ModelEbi moduleService;

	@Resource
	private IModelRepertory moduleDAO;
	
	@Resource(name="ebo")
	private Ebi ebi;

	private static final Log log = LogFactory.getLog(ModuleController.class);

	/**
	 * 根据前台的请求取得数据
	 * @throws Exception 
	 */
	@RequestMapping(value = "/fetchdata", method = RequestMethod.GET)
	public @ResponseBody
	Map<String, Object> fetchData(String moduleName, Integer start, Integer limit, String sort,
			String query, String columns, String navigates, String parentFilter,String tag,
			HttpServletRequest request) throws Exception {
		DataFetchResponseInfo response = moduleService.fetchDataInner(moduleName, start, limit, sort,
				query, columns, navigates, parentFilter, (SqlModuleFilter) null, tag, request);
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("records", response.getMatchingObjects());
		result.put("totalCount", response.getTotalRows());
		return result;
	}

	/**
	 * 新增记录的时候，在后台取得缺省值
	 * 
	 * @param moduleName
	 * @param parentFilter
	 * @param navigates
	 * @param request
	 * @return
	 */

	@RequestMapping(value = "/getnewdefault.do", method = RequestMethod.POST)
	public @ResponseBody
	Object getRecordNewDefault(String moduleName, String parentFilter, String navigates,
			HttpServletRequest request) {

		return moduleService.getRecordNewDefault(moduleName, parentFilter, navigates, request);

	}

	@RequestMapping(value = "/fetchdata.do/{id}", method = RequestMethod.GET)
	public @ResponseBody
	Object getRecordById(String moduleName, @PathVariable("id") String id, HttpServletRequest request) {
		
		
/*		List<Object> records = new ArrayList<Object>();
		try {
			records.add(moduleDAO.getModuleRecord("ResidentInfo", id, request).toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return records.get(0);*/
	log.debug("根据主键取得模块的一条记录:" + moduleName + "," + id);
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("totalCount", 1);
		List<Object> records = new ArrayList<Object>();
		try {
			records.add(moduleDAO.getModuleRecord(moduleName, id, request).toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		result.put("records", records);
		log.debug("getRecordById返回值：" + result.toString());
		return result;
	}
	

	@RequestMapping(value = "/create.do/{id}", method = RequestMethod.POST)
	public @ResponseBody
	DataInsertResponseInfo add(String moduleName, @RequestBody String inserted,
			HttpServletRequest request) throws Exception {
		 DataInsertResponseInfo result =new DataInsertResponseInfo();
		 String parentFilter=request.getParameter("parentFilter");
		 String navigates=request.getParameter("navigates");
		 _Module module=ApplicationService.getModuleWithName(moduleName);
		try {
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
	}
		
		return result;
	}
	
	

	/***
	 * 创建一条记录
	 * 
	 * @param moduleName
	 * @param inserted
	 * @param request
	 * @return
	 * @throws Exception 
	 * */
	
	@RequestMapping(value = "/create.do", method = RequestMethod.POST)
	public @ResponseBody
	DataInsertResponseInfo addWithNoPrimaryKey(String moduleName,   @RequestBody String inserted,
			HttpServletRequest request) throws Exception {
		return add(moduleName, inserted ,request);
	}


	/**
	 * 修改记录
	 * 
	 * @param moduleName
	 * @param id
	 * @param oldid
	 * @param operType
	 * @param updated
	 * @param request
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping(value = "/update.do/{id}", method = RequestMethod.PUT)
	public @ResponseBody
	DataUpdateResponseInfo update(String moduleName, @PathVariable("id") String id, String oldid,
			String operType, @RequestBody String updated, HttpServletRequest request) throws Exception {
		DataUpdateResponseInfo result = new DataUpdateResponseInfo();
		_Module module = ApplicationService.getModuleWithName(moduleName);
		// 如果主键值修改了，那么先进行主键的修改
		if (oldid != null && (!oldid.equals(id))) {
			try {
				result = moduleService.changeRecordId(moduleName, id, oldid);
			} catch (ConstraintViolationException e) {
				e.printStackTrace();
				if (e.getCause().toString().toLowerCase().indexOf("primary key") >= 0)
					//result.getErrorMessage().put(module.getTf_primaryKey(), "修改过后的主键与原有的主键值重复！");
				getUpdateException(moduleName, "修改过后的主键与原有的主键值重复！", ResponseErrorInfo.STATUS_VALIDATION_ERROR);
				else
					result.getErrorMessage().put(module.getTf_primaryKey(), "当前主键与子模块有约束关系，不可以修改！");
				getUpdateException(moduleName, "修改过后的主键与原有的主键值重复！", ResponseErrorInfo.STATUS_VALIDATION_ERROR);
				//result.setResultCode(ModuleService.STATUS_VALIDATION_ERROR);
			}
			if (!result.getResultCode().equals(0))
				return result;
		}
		// 修改记录
		try {
			result = moduleService.update(moduleName, id, operType, updated,request);
			result.getRecords().add(moduleDAO.getModuleRecord(moduleName, id, request).toString());
		} catch (DataAccessException e) {
			error("更新异常!", e);
			//result = new DataUpdateResponseInfo();
			getUpdateException(moduleName, "更新失败!", ResponseErrorInfo.STATUS_VALIDATION_ERROR, e);
			//result.setResultCode(ModuleService.STATUS_VALIDATION_ERROR);
		} catch (Exception e) {
			error("更新异常!", e);
			getUpdateException(moduleName, "更新失败!", ResponseErrorInfo.STATUS_VALIDATION_ERROR, e);
			//e.printStackTrace();
			//result = new DataUpdateResponseInfo();
			//result.getErrorMessage().put("error", e.getMessage());
			//result.setResultCode(ModuleService.STATUS_FAILURE);
		}
		return result;
	}

	/**
	 * 删除记录
	 * 
	 * @param moduleName
	 * @param id
	 * @param request
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping(value = "/remove.do/{id}", method = RequestMethod.DELETE)
	public @ResponseBody
	DataDeleteResponseInfo remove(String moduleName, @PathVariable String id,
			HttpServletRequest request) throws Exception {
		DataDeleteResponseInfo  result = new DataDeleteResponseInfo();
		try {
			result = moduleService.remove(moduleName, id, request);
		} catch (DataAccessException e) {
			String errormessage = ModuleServiceFunction.addPK_ConstraintMessage(e, moduleName);
			errormessage= errormessage != null ? errormessage: "请检查与本记录相关联的其他数据是否全部清空！<br/>";
			getDeleteException(moduleName, errormessage, -1, e);
		} 
		return result;
	}

	@RequestMapping(value = "/removerecords.do")
	public @ResponseBody
	DataDeleteResponseInfo removeRecords(String moduleName, String[] titles,
			@RequestParam(value="ids",required=false) int[] ids,
			HttpServletRequest request) {
		DataDeleteResponseInfo 	result = new DataDeleteResponseInfo();
		for(int id : ids){
			DataDeleteResponseInfo recordDeleteResult = moduleService.remove(moduleName, id+"",
					request);
		}
		
		return result;
	}
/*	public @ResponseBody
	DataDeleteResponseInfo removeRecords(String moduleName, String ids, String titles,
			HttpServletRequest request) {
		DataDeleteResponseInfo result = null;
		String[] idarray = ids.split(",");
		String[] titlearray = titles.split("~~");

		result = new DataDeleteResponseInfo();

		for (int i = 0; i < idarray.length; i++) {
			try {
				DataDeleteResponseInfo recordDeleteResult = moduleService.remove(moduleName, idarray[i],
						request);
				if (recordDeleteResult.getResultCode() == 0)

					result.getOkMessageList().add(titlearray[i]);
				else {
					if (recordDeleteResult.getErrorMessageList().size() > 0)
						result.getErrorMessageList().add(
								"【" + titlearray[i] + "】" + recordDeleteResult.getErrorMessageList().get(0));
					else
						result.getErrorMessageList().add("【" + titlearray[i] + "】" + "未知错误！");
				}
			} catch (DataAccessException e) {
				String errormessage = ModuleServiceFunction.addPK_ConstraintMessage(e, moduleName);

				result.getErrorMessageList().add(
						"【" + titlearray[i] + "】" + (errormessage != null ? errormessage : "关联的数据未清空！"));
			} catch (Exception e) {
				result.getErrorMessageList().add("【" + titlearray[i] + "】" + e.getMessage());
			}
		}
		result.setResultCode(result.getErrorMessageList().size());
		return result;
	}
	*/
	@RequestMapping("/loadUniteById.do/{rid}")
	public @ResponseBody Object  loadUniteById(
			 @PathVariable("rid") String rid,
			HttpServletRequest request
			){
		List<Object> records = new ArrayList<Object>();
		try {
			records.add(moduleDAO.getModuleRecord("ResidentInfo", rid, request).toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return records.get(0);
		
	}
	
	
	
	@RequestMapping(value="/navigatetree/fetchdata",produces = "application/json;text/plain;charset=UTF-8")
	public @ResponseBody List<JSONTreeNode> navigatetree(HttpServletResponse response,
			 	String moduleName,
			 	String navigatePath,
			 	String reverseOrder,
			 	String type,
			    String parentFilter,
			 	String node,
				@RequestParam(value="whereSql",required=false,defaultValue="") String whereSql,
		    	@RequestParam(value="parentSql",required=false,defaultValue="") String parentSql,
		    	@RequestParam(value="querySql",required=false,defaultValue="") String querySql,
		    	@RequestParam(value="orderSql",required=false,defaultValue="") String orderSql
			){
		
		List<JSONTreeNode> views=new ArrayList<>();
		List<String> modues=new ArrayList<>();
		try{
		if(StringUtil.isNotEmpty(navigatePath)&&navigatePath.contains("--")){
			String[] modueStrs=navigatePath.split("--");
			modues=Arrays.asList(modueStrs);
		}else{
			modues.add(navigatePath);
		}
		for(String modue :modues){
			JSONTreeNode titleNode=new JSONTreeNode();
			titleNode.setNodeType(CommConstants.NODE_TYPE_FIELDTITLE);//isCodeLevel
			Class<? extends Model> clazz=(Class<? extends Model>) ModuleServiceFunction.getModuleBeanClass(modue);
			String tilte="";
			String fieldname="";
			String fieldvalue="";
			
			if(clazz.isAnnotationPresent(TableInfo.class)){
				TableInfo tableInfo=clazz.getAnnotation(TableInfo.class);
				tilte=tableInfo.title();
			}
			 List<Field> listFields=clazz.newInstance().fielsColection(new ArrayList<Field>());
			 List<Field> listFieldValue=listFields.parallelStream().filter(o->o.isAnnotationPresent(TreeItemValue.class)).collect(Collectors.toList());
			 List<Field> listFieldVaKey=listFields.parallelStream().filter(o->o.isAnnotationPresent(TreeItemName.class)).collect(Collectors.toList());
			tilte=StringUtil.isEmpty(tilte)?"未定义":	tilte;
			titleNode.setText(tilte);
			titleNode.setNodeInfo(modue);
			titleNode.setExpanded(true);
			String hql=" from "+clazz.getSimpleName()+whereSql+parentSql+querySql+orderSql;
			List<?> listItems=ebi.queryByHql(hql);
			String fieldValue=listFieldValue.get(0).getName();
			String fieldName=listFieldVaKey.get(0).getName();
			 List<JSONTreeNode> children=listItems.parallelStream().map(item->{
				JSONTreeNode treeNode=new JSONTreeNode();
				Object  fieldnameV=EntityUtil.getPropertyValue(item,fieldName);
				Object fieldvalueV= EntityUtil.getPropertyValue(item,fieldValue);
				treeNode.setText(fieldnameV+"");//text
				treeNode.setCode(fieldvalueV+"");//val
				treeNode.setExpanded(true);
				treeNode.setNodeInfo(modue); //modue 
				treeNode.setDescription(fieldName);
				treeNode.setNodeInfoType(CommConstants.NODE_TYPE_FIELDQUERY);//isCodeLevel
				return treeNode;
			}).collect(Collectors.toList());
			 titleNode.setChildren(children);
			 views.add(titleNode);
			}
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return views;
	}

}
