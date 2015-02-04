package com.aspect;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.ufo.framework.system.repertory.SqlGenerator;
import com.ufo.framework.system.repertory.SqlModuleFilter;
import com.ufo.framework.system.shared.module.DataFetchRequestInfo;
import com.ufo.framework.system.shared.module.DataFetchResponseInfo;
import com.ufo.framework.system.shared.module.grid.GridFilterData;
public interface ModuleAspect {
	
	public void loadBefore(DataFetchRequestInfo  dsRequest ,HttpServletRequest req, SqlGenerator generator) throws Exception;
	
	
	public void afterLoad(String moduleName,DataFetchRequestInfo dsRequest,GridFilterData gridFilterData ,DataFetchResponseInfo response) throws Exception;
	
	
	
	public  void beforeCreate(Object record ,String moduleName,List<SqlModuleFilter> navs,HttpServletRequest req) throws Exception;


	public void afterCreate(Object record, String moduleName,
			List<SqlModuleFilter> navs) throws Exception;
	
	

}
