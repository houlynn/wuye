package com.ufo.framework.system.repertory;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import ognl.Ognl;
import ognl.OgnlException;

import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.aspect.ModuleAspect;
import com.model.hibernate.addition._Addition;
import com.model.hibernate.system._Module;
import com.ufo.framework.common.core.exception.TimeoutException;
import com.ufo.framework.common.core.json.JsonDateProcessor;
import com.ufo.framework.common.core.web.ModuleServiceFunction;
import com.ufo.framework.common.core.web.TypeChange;
import com.ufo.framework.system.ebo.ApplicationService;
import com.ufo.framework.system.irepertory.IModelRepertory;
import com.ufo.framework.system.shared.module.DataFetchRequestInfo;
import com.ufo.framework.system.shared.module.DataFetchResponseInfo;
import com.ufo.framework.system.shared.module.DataUpdateResponseInfo;
import com.ufo.framework.system.shared.module.ModuleFormOperateType;
import com.ufo.framework.system.shared.module.grid.GridFilterData;

@Repository
public class ModuleRepertory extends HibernateRepertory implements IModelRepertory  {
	public static final int STATUS_FAILURE = -1;
	public static final int STATUS_SUCCESS = 0;
	public static final int STATUS_VALIDATION_ERROR = -4;
	public static final String UPDATEJSONOBJECT = "updateJsonObject";
	public static final String INSERTJSONOBJECT = "insertJsonObject";

	/* (non-Javadoc)
	 * @see com.ufo.framework.system.repertory.ModelDao#getModuleDataWithName(java.lang.String, java.lang.String)
	 */
	@Override
	@Transactional(propagation = Propagation.REQUIRED, readOnly = true)
	public Object getModuleDataWithName(String moduleName, String name) throws Exception {
		_Module module = ApplicationService.getModuleWithName(moduleName);
		if (module == null)
			return null;
		List<?> records = findByProperty(moduleName, module.getTf_nameFields(), name);
		if (records.size() >= 1)
			return records.get(0);
		else
			return null;
	}

	/* (non-Javadoc)
	 * @see com.ufo.framework.system.repertory.ModelDao#getBeanIdWithIdOrName(com.model.hibernate.system.Module, java.lang.Object)
	 */
	@Override
	public Object getBeanIdWithIdOrName(_Module module, Object idOrName) {
		Object bean = getBeanWithIdOrName(module, idOrName);
		if (bean == null)
			return null;
		else
			try {
				return Ognl.getValue(module.getTf_primaryKey(), bean);
			} catch (OgnlException e) {
				e.printStackTrace();
				return null;
			}
	}

	/* (non-Javadoc)
	 * @see com.ufo.framework.system.repertory.ModelDao#getBeanWithIdOrName(com.model.hibernate.system.Module, java.lang.Object)
	 */
	@Override
	public Object getBeanWithIdOrName(_Module module, Object idOrName) {
		Class<?> BeanClass = ModuleServiceFunction.getModuleBeanClass(module.getTf_moduleName());
		Object bean = null;
		try {
			bean = findById(BeanClass, idOrName);
		} catch (Exception e) {
		}
		if (bean == null) {
			try {
				List<?> beans = findByProperty(BeanClass, module.getTf_nameFields(), idOrName);
				if (beans.size() == 1)
					bean = beans.get(0);
				else if ((beans.size() > 1))
					return null;
			} catch (Exception e) {
			}
		}
		if (bean == null) {
			try {
				@SuppressWarnings("unchecked")
				List<Object> beans =findByLikeProperty(BeanClass.getSimpleName(),
						module.getTf_nameFields(), "%" + idOrName + "%");
				if (beans.size() == 1)
					bean = beans.get(0);
			} catch (Exception e) {
			}
		}
		return bean;
	}

	/* (non-Javadoc)
	 * @see com.ufo.framework.system.repertory.ModelDao#updateValueToBean(java.lang.String, java.lang.Object, net.sf.json.JSONObject)
	 */

	
	@Override
	@SuppressWarnings("unchecked")
	public void updateValueToBean(String moduleName, Object record, JSONObject keyValue)
			throws OgnlException {
		//_Module module = ApplicationService.getModuleWithName(moduleName);
		Iterator<String> keyIterator = keyValue.keys();
		while (keyIterator.hasNext()) {
			String key = keyIterator.next();
			Object value = keyValue.get(key);
			// 是不是manytoone 的值进行了修改
			debug("更新字段:" + key + ",value:" + value);
			ModuleServiceFunction.setValueToRecord(key, record, value);
		}
	}



	/* (non-Javadoc)
	 * @see com.ufo.framework.system.repertory.ModelDao#getModuleData(java.lang.String, com.ufo.framework.system.shared.module.DataFetchRequestInfo, com.ufo.framework.system.shared.module.grid.GridFilterData, javax.servlet.http.HttpServletRequest)
	 */
	@Override
	@Transactional(propagation = Propagation.REQUIRED, readOnly = true)
	public DataFetchResponseInfo getModuleData(String moduleName, DataFetchRequestInfo dsRequest,
			GridFilterData gridFilterData) throws Exception {
		_Module module = ApplicationService.getModuleWithName(moduleName);
		// 所有的导航tree产生的过滤条件
		//List<SqlModuleFilter> treeAndParentFilters = new ArrayList<SqlModuleFilter>();
		List<SqlModuleFilter> treeAndParentFilters=dsRequest.getModuleFilters();
		addParentModuleFiltToSQLFilters(module, gridFilterData.getParentModuleFilter(),
				treeAndParentFilters);
		SqlGenerator generator = new SqlGenerator(module);
		generator.setModuleFilters(treeAndParentFilters);
		generator.setGridColumnNames(gridFilterData.getGridColumnNames());
		generator.setSearchText(gridFilterData.getSearchText());
		generator.setSorts(dsRequest.getSorts());
		generator.setGroupFieldname(gridFilterData.getGroupFieldName());
		Class<ModuleAspect> classAspect=ModuleServiceFunction.getModuleAspectClass(moduleName);
		if(classAspect!=null){
			ModuleAspect aspect;
			try {
				aspect = classAspect.newInstance();
				aspect.loadBefore(dsRequest, generator);
			} catch (InstantiationException e) {
				e.printStackTrace();
			} catch (IllegalAccessException e) {
				e.printStackTrace();
			}
		}
		Integer totalRow = getRecordCount(generator);
		debug("统计计录个数:" + totalRow);
		Integer startRow = dsRequest.getStartRow();
		Integer endRow = dsRequest.getEndRow();
		endRow = Math.min(endRow, totalRow - 1);
		JSONArray jsonArray = getData(generator, startRow, endRow);
		DataFetchResponseInfo response = new DataFetchResponseInfo();
		response.setStartRow(startRow);
		response.setEndRow(endRow);
		response.setTotalRows(totalRow);
		// if (dsRequest.getIsExport())
		response.setMatchingObjects(jsonArray);
		// else
		// response.setJsonMatchingItems(jsonArray.toString());

		return response;

	}

	/**
	 * // 如果有父模块约束，加入父模块约束
	 * 
	 * @param moduleName
	 * @param module
	 * @param parentModuleFilter
	 * @param treeAndParentFilters
	 */
	private void addParentModuleFiltToSQLFilters(_Module module, SqlModuleFilter parentModuleFilter,
			List<SqlModuleFilter> treeAndParentFilters) {
		// 如果有父模块约束，加入父模块约束
		if (parentModuleFilter != null) {
			// 如果是附件的父模块约束，则要加入另外二个条件
			if (module.getTf_moduleName().equals(_Addition._ADDITION)) {
				SqlModuleFilter additionModuleIdFilter = new SqlModuleFilter();
				additionModuleIdFilter.setModuleName(module.getTf_moduleName());
				additionModuleIdFilter.setTableAsName(module.getTableAsName());
				additionModuleIdFilter.setPrimarykey(_Addition.MODULEID);
				additionModuleIdFilter.setEqualsValue(parentModuleFilter.getModuleId());
				treeAndParentFilters.add(additionModuleIdFilter);

				SqlModuleFilter additionModuleKeyIdFilter = new SqlModuleFilter();
				additionModuleKeyIdFilter.setModuleName(module.getTf_moduleName());
				additionModuleKeyIdFilter.setTableAsName(module.getTableAsName());
				additionModuleKeyIdFilter.setPrimarykey(_Addition.MODULEKEYID);
				additionModuleKeyIdFilter.setEqualsValue(parentModuleFilter.getEqualsValue());
				treeAndParentFilters.add(additionModuleKeyIdFilter);

			} else {
				treeAndParentFilters.add(parentModuleFilter);
			}
		}
	}


	/* (non-Javadoc)
	 * @see com.ufo.framework.system.repertory.ModelDao#getModuleRecord(java.lang.String, java.lang.String, javax.servlet.http.HttpServletRequest)
	 */
	@Override
	@Transactional(propagation = Propagation.REQUIRED, readOnly = true)
	public JSONObject getModuleRecord(String moduleName, String keyValue, HttpServletRequest request) throws Exception {
		_Module module = ApplicationService.getModuleWithName(moduleName);
		SqlGenerator generator = new SqlGenerator(module);
		generator.setKeyValue(keyValue);
		JSONArray jsonArray = getData(generator, -1, 0);
		if (jsonArray.size() > 0)
			return jsonArray.getJSONObject(0);
		else
			return null;
	}

	/* (non-Javadoc)
	 * @see com.ufo.framework.system.repertory.ModelDao#getRecordCount(com.ufo.framework.system.repertory.SqlGenerator)
	 */
	@Override
	@Transactional(propagation = Propagation.REQUIRED, readOnly = true)
	public Integer getRecordCount(SqlGenerator generator) {

		String sql = generator.getCountSqlStatement();
		Session session = getSf().getCurrentSession();
		SQLQuery query = session.createSQLQuery(sql);
		Integer countInteger = 0;
		try {
			countInteger = TypeChange.toInt(query.uniqueResult());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return countInteger;
	}

	/* (non-Javadoc)
	 * @see com.ufo.framework.system.repertory.ModelDao#getData(com.ufo.framework.system.repertory.SqlGenerator, java.lang.Integer, java.lang.Integer)
	 */
	@Override
	@Transactional(propagation = Propagation.REQUIRED, readOnly = true)
	public JSONArray getData(SqlGenerator generator, Integer startRow, Integer endRow) {
		Session session = getSf().getCurrentSession();
		String sql = generator.getSqlStatment();
		System.out.println("sql:"+sql);
		SQLQuery query = session.createSQLQuery(sql);
		if (startRow != -1) {
			query.setFirstResult(startRow);
			query.setMaxResults(endRow - startRow + 1);
		}
		//generator.addScalar(query);

		List<?> results = null;
		try {
			results = query.list();
		} catch (Exception e) {
			e.printStackTrace();
		}
		JSONArray resultArray = new JSONArray();
		if (results != null)
			for (Object row : results) {
				Object[] rowObjects = (Object[]) row;
				Map<String, Object> objMap = new LinkedHashMap<String, Object>();
				JSONObject object = new JSONObject();
				int i = 0;
				for (SqlField field : generator.getFieldList())
					objMap.put(field.getFieldasScalar(), rowObjects[i++]);
				for (SqlField field : generator.getJoinField())
					objMap.put(field.getFieldasScalar(), rowObjects[i++]);
				object.putAll(objMap, JsonDateProcessor.us_jsonConfig);
				resultArray.add(object);
			}
		return resultArray;
	}

	/* (non-Javadoc)
	 * @see com.ufo.framework.system.repertory.ModelDao#getRecordNameValue(com.model.hibernate.system.Module, java.lang.Object)
	 */
	@Override
	public String getRecordNameValue(_Module module, Object record) {
		String result = "";
		try {
			result = (module.getTf_nameFields() != null && module.getTf_nameFields().length() > 0) ? Ognl
					.getValue(module.getTf_nameFields(), record).toString() : "未定义";
		} catch (Exception e) {
		}
		return result;
	}

	@Override
	public DataUpdateResponseInfo changeRecordId(String moduleName, String id,
			String oldid) throws Exception {
		DataUpdateResponseInfo result = new DataUpdateResponseInfo();
		_Module module = ApplicationService.getModuleWithName(moduleName);

		Session session = getSf().getCurrentSession();
		// try {
		Query query = session.createSQLQuery("update " + moduleName + " set "
				+ module.getTf_primaryKey() + " = :newvalue where " + module.getTf_primaryKey()
				+ "=:oldvalue");
		query.setParameter("oldvalue", oldid);
		query.setParameter("newvalue", id);
		query.executeUpdate();

		return result;
	}

	@Override
	public DataUpdateResponseInfo update(String moduleName, String id,
			String operType, String updated, HttpServletRequest request) throws Exception {
		debug("数据update:" + moduleName + "," + id + "," + updated);
		JSONObject updateJsonObject = JSONObject.fromObject(updated);
		request.setAttribute(UPDATEJSONOBJECT, updateJsonObject);
		DataUpdateResponseInfo result = new DataUpdateResponseInfo();
		Class<?> beanClass = ModuleServiceFunction.getModuleBeanClass(moduleName);
		_Module module = ApplicationService.getModuleWithName(moduleName);

		if (operType == null)
			operType = ModuleFormOperateType.EDIT.getValue();
		try {
			// 保存数据之前老的值
			Object oldRecord =findById(beanClass, id);
			// 使oldRecord 处于游离状态
			getSf().getCurrentSession().evict(oldRecord);
			Object record = findById(beanClass, id);

			updateValueToBean(moduleName, record, updateJsonObject);

			saveOrUpdate(record, null);
			record = findById(beanClass, id);

			result.setResultCode(STATUS_SUCCESS);

		} catch (DataAccessException e) {
			e.printStackTrace();
			ModuleServiceFunction.addExceptionCauseToErrorMessage(e, result.getErrorMessage(),
					module.getTf_primaryKey());
			result.setResultCode(STATUS_VALIDATION_ERROR);
		} catch (Exception e) {
			e.printStackTrace();
			result.getErrorMessage().put("error", e.getMessage());
			result.setResultCode(STATUS_FAILURE);
		}
		debug("update返回值：" + result.toString());
		return result;
	}


}
