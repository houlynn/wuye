package com.ufo.framework.system.irepertory;
import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import ognl.OgnlException;

import com.model.hibernate.system._Module;
import com.ufo.framework.system.repertory.SqlGenerator;
import com.ufo.framework.system.shared.module.DataFetchRequestInfo;
import com.ufo.framework.system.shared.module.DataFetchResponseInfo;
import com.ufo.framework.system.shared.module.DataUpdateResponseInfo;
import com.ufo.framework.system.shared.module.grid.GridFilterData;

public interface IModelRepertory extends ICommonRepertory {

	/**
	 * 根据模块的名称和 一个 name 的值来判断是否此模块已经有这个值了
	 * 
	 * @param moduleName
	 * @param name
	 * @return
	 */
	public abstract Object getModuleDataWithName(String moduleName, String name);

	/**
	 * 根据module 和一个传进来的值，找到相应的记录,返回主键
	 * 
	 * @param moduleName
	 * @param idOrName
	 * @return
	 */
	public abstract Object getBeanIdWithIdOrName(_Module module, Object idOrName);

	/**
	 * 根据module 和一个传进来的值，找到相应的记录
	 * 如果这是一个父模块的字段，1.先检查是否是主键，2.检查是否是fieldnames,3.检查是否只有一个符合条件的like,
	 * 
	 * @param module
	 * @param idOrName
	 * @return
	 */
	public abstract Object getBeanWithIdOrName(_Module module, Object idOrName);

	/**
	 * 用户修改了数据之后，将修改过的值updae到bean中去
	 * 
	 * @param moduleName
	 * @param object
	 * @param keyValue
	 * @throws OgnlException
	 */

	public abstract void updateValueToBean(String moduleName, Object record,
			JSONObject keyValue) throws OgnlException;

	/**
	 * 根据前台传进来的参数取得list 数据，然后返回
	 * 
	 * @param moduleName
	 * @param dsRequest
	 * @param gridFilterData
	 * @return
	 */
	public abstract DataFetchResponseInfo getModuleData(String moduleName,
			DataFetchRequestInfo dsRequest, GridFilterData gridFilterData) throws Exception;

	/**
	 * 根据前台传进来的参数取一个模块的 record 数据，然后返回 用在用户增加，修改了数据之后，将修改新增的数据，通过这里取得数据后返回
	 * 
	 * @param moduleName
	 * @param keyValue
	 * @return JSONObject
	 */
	public abstract JSONObject getModuleRecord(String moduleName,
			String keyValue, HttpServletRequest request);

	/**
	 * 取得记录的个数
	 * 
	 * @param generator
	 * @return
	 */
	public abstract Integer getRecordCount(SqlGenerator generator);

	public abstract JSONArray getData(SqlGenerator generator, Integer startRow,
			Integer endRow);

	public abstract String getRecordNameValue(_Module module, Object record);
	
	
	public DataUpdateResponseInfo changeRecordId(String moduleName, String id, String oldid) ;
	
	
	
	public DataUpdateResponseInfo update(String moduleName, String id, String operType,
			String updated, HttpServletRequest request);

}