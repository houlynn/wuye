package com.aspect;
import java.util.List;

import com.ufo.framework.system.repertory.SqlGenerator;
import com.ufo.framework.system.repertory.SqlModuleFilter;
import com.ufo.framework.system.shared.module.DataFetchRequestInfo;
public interface ModuleAspect {
	
	public void loadBefore(DataFetchRequestInfo  dsRequest ,SqlGenerator generator) throws Exception;
	
	
	public void loadAfter();
	
	
	
	public  void beforeCreate(Object record ,String moduleName,List<SqlModuleFilter> navs) throws Exception;
	
	

}
