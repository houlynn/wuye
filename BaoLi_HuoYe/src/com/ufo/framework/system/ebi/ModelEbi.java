package com.ufo.framework.system.ebi;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.ufo.framework.common.core.web.SortParameter;
import com.ufo.framework.system.repertory.SqlModuleFilter;
import com.ufo.framework.system.shared.module.DataDeleteResponseInfo;
import com.ufo.framework.system.shared.module.DataFetchResponseInfo;
import com.ufo.framework.system.shared.module.DataInsertResponseInfo;
import com.ufo.framework.system.shared.module.DataUpdateResponseInfo;

public interface ModelEbi extends Ebi{

	// 返回json数据，要在这里加 application/json
	// produces = "application/json;text/plain;charset=UTF-8"
	// @Override
	public abstract Map<String, Object> fetchData(String moduleName,
			Integer start, Integer limit, String sort, String query,
			String columns, String navigates, String parentFilter,String tag,
			HttpServletRequest request) throws Exception;

	/**
	 * 内部的取得数据的函数，start=-1 ,取得所有的数据
	 * 
	 * @param moduleName
	 * @param start
	 * @param limit
	 * @param sort
	 * @param query
	 * @param columns
	 * @param navigates
	 * @param parentFilter
	 * @param additionFilter
	 *          //附加的过滤条件
	 * @param request
	 * @return
	 */
	public abstract DataFetchResponseInfo fetchDataInner(String moduleName,
			Integer start, Integer limit, String sort, String query,
			String columns, String navigates, String parentFilter,
			SqlModuleFilter additionFilter,String tag,  HttpServletRequest request) throws Exception;

	public abstract DataFetchResponseInfo fetchDataInner(String moduleName,
			Integer start, Integer limit, String sort, String query,
			String columns, String navigates, String parentFilter,
			List<SqlModuleFilter> additionFilters, String tag, HttpServletRequest request) throws Exception;

	public abstract DataFetchResponseInfo fetchDataInner(String moduleName,
			Integer start, Integer limit, SortParameter sorts[], String query,
			String columns, List<SqlModuleFilter> navigateFilters,
			SqlModuleFilter pFilter, SqlModuleFilter additionFilter,String tag,
			HttpServletRequest request) throws Exception;

	// @Override
	public abstract Object getRecordNewDefault(String moduleName,
			String parentFilter, String navigates, HttpServletRequest request);

	// @Override
	public abstract Object getRecordById(String moduleName, String id,
			HttpServletRequest request);

	// @Override
	public DataInsertResponseInfo add(String moduleName, String inserted, String parentFilter, String navigates, HttpServletRequest request) throws Exception;

	public abstract DataUpdateResponseInfo changeRecordId(String moduleName,
			String id, String oldid);

	// @Override
	public abstract DataUpdateResponseInfo update(String moduleName, String id,
			String operType, String updated,HttpServletRequest request);

	// @Override
	public abstract DataDeleteResponseInfo remove(String moduleName, Serializable id,
			HttpServletRequest request);

}