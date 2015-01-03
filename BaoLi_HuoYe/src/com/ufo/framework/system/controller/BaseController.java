package com.ufo.framework.system.controller;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import net.sf.json.JSONObject;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.dao.DataAccessException;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import com.ufo.framework.common.core.exception.ResponseErrorInfo;
import com.ufo.framework.common.log.LogerManager;
import com.ufo.framework.common.model.Model;
import com.ufo.framework.system.ebi.CommonException;
import com.ufo.framework.system.ebi.Ebi;
import com.ufo.framework.system.ebi.ModelEbi;
import com.ufo.framework.system.shared.module.DataDeleteResponseInfo;
import com.ufo.framework.system.shared.module.DataInsertResponseInfo;
import com.ufo.framework.system.shared.module.DataUpdateResponseInfo;
@RequestMapping(value = "/app")
public class BaseController  implements LogerManager,CommonException{
	@Resource(name="ebo")
	private Ebi ebi;
	public void setEbi(Ebi ebi) {
		this.ebi = ebi;
	}
	public Ebi getEbi() {
		return ebi;
	}
	@Resource
	private ModelEbi moduleService;
	
	
	private interface  PrepareReuslt{ public 	List<?>  prepare(List<?> list);}
	private interface  PrepareAdd{ public 	void  prepare(Object record);}
	private interface  PrepareLoad{ public void  prepare(Object record);}
	private interface  PrepareUpdate{ public void  prepare(Object record);}
	
	public @ResponseBody Map<String, Object> fetchData(Integer start, Integer limit,
			@RequestParam(value="whereSql",required=false,defaultValue="") String whereSql,
	    	@RequestParam(value="parentSql",required=false,defaultValue="") String parentSql,
	    	@RequestParam(value="querySql",required=false,defaultValue="") String querySql,
	    	@RequestParam(value="orderSql",required=false,defaultValue="") String orderSql,
	    	@RequestParam(value="moduleName", required=true) String moduleName,
			HttpServletRequest request,PrepareReuslt prepareReuslt) throws Exception {
		StringBuffer hql = new StringBuffer("from "+moduleName+" where 1=1  ");
		StringBuffer countHql = new StringBuffer("select count(*) from "+moduleName+"  where 1=1 ");
		hql.append(whereSql);
		hql.append(parentSql);
		hql.append(querySql);
		countHql.append(whereSql);
		countHql.append(querySql);
		countHql.append(parentSql);
		Integer count = ebi.getCount(countHql.toString());
		hql.append(orderSql);
		List<?> list= this.ebi.queryByHql(hql.toString(), start, limit);
		List<?> viewitems=new ArrayList<>();
		if(prepareReuslt!=null){
			viewitems=prepareReuslt.prepare(list);
		}else{
			viewitems=list;
		}
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("records", viewitems);
		result.put("totalCount",count );
		return result;
		
	}
	
	
	public @ResponseBody
	DataInsertResponseInfo add(String moduleName,   @RequestBody String inserted, Class<?> clazz,
			HttpServletRequest request,PrepareAdd prepareAdd) throws Exception {
		DataInsertResponseInfo responseInfo=new DataInsertResponseInfo();
		JSONObject jo = JSONObject.fromObject(inserted);
		Object record =  JSONObject.toBean(jo, clazz);
		if(prepareAdd!=null){
			prepareAdd.prepare(record);
		}
		try {
				ebi.save(record);
			responseInfo.getRecords().add(record);
		} catch (DataAccessException e) {
			error("DataAccessException异常", e);
			if (e.getRootCause().getMessage().toLowerCase().indexOf("primary") != -1) {
				getInsertException(moduleName,"插入记录的主键值与数据库中原有的值重复!",
						ResponseErrorInfo.STATUS_VALIDATION_ERROR);
			} else {

				getInsertException(moduleName, e.getMessage(),
						ResponseErrorInfo.STATUS_VALIDATION_ERROR);
			}
		} catch (Exception e) {
			error("添加异常", e);
			getInsertException(moduleName, "添加失败!",
					ResponseErrorInfo.STATUS_FAILURE);
		}
	 return	responseInfo;
	}
	@RequestMapping(value = "/removerecords.do")
	public @ResponseBody
	DataDeleteResponseInfo removeRecords(String moduleName,
			@RequestParam(value="ids",required=false) int[] ids,
			HttpServletRequest request) {
		DataDeleteResponseInfo 	result = new DataDeleteResponseInfo();
		for(int id : ids){
			ebi.delete(id);
		}
		return result;
	}
	public @ResponseBody  Map<String, Object>  loadUniteById(
			 @PathVariable("id") int id,String moduleName,PrepareLoad prepareLoad,
			HttpServletRequest request
			){
		Map<String, Object>  result=new HashMap<String, Object>();
		List<Object> records = new ArrayList<Object>();
		Object record= ebi.findById(moduleName, id);
		if(prepareLoad!=null){
			prepareLoad.prepare(record);
		}
		records.add(record);
		result.put("records", records);
		result.put("totalCount", 1);
		return result;
		
	}
	
	@RequestMapping(value = "/update.do/{id}", method = RequestMethod.PUT)
	public @ResponseBody
	DataUpdateResponseInfo update(String moduleName, Class<?> clazz,  @PathVariable("id") int id,  @RequestBody String updated, HttpServletRequest request,PrepareUpdate prepareUpdate) throws Exception {
		DataUpdateResponseInfo result = new DataUpdateResponseInfo();
			try {
				JSONObject jo = JSONObject.fromObject(updated);
				Object record =  JSONObject.toBean(jo, clazz);
				if(prepareUpdate!=null){
					prepareUpdate.prepare(record);
				}
						ebi.update((Model)record);
						result.getRecords().add(record);
			} catch (ConstraintViolationException e) {
				e.printStackTrace();
				if (e.getCause().toString().toLowerCase().indexOf("primary key") >= 0){
				getUpdateException(moduleName, "修改过后的主键与原有的主键值重复！", ResponseErrorInfo.STATUS_VALIDATION_ERROR);
				}
				else{
			    result.getErrorMessage().put(moduleName, "当前主键与子模块有约束关系，不可以修改！");
				getUpdateException(moduleName, "修改过后的主键与原有的主键值重复！", ResponseErrorInfo.STATUS_VALIDATION_ERROR);}
		} catch (DataAccessException e) {
			error("更新异常!", e);
			getUpdateException(moduleName, "更新失败!", ResponseErrorInfo.STATUS_VALIDATION_ERROR, e);
		} catch (Exception e) {
			error("更新异常!", e);
			getUpdateException(moduleName, "更新失败!", ResponseErrorInfo.STATUS_VALIDATION_ERROR, e);
		}
		return result;
	}
	
}