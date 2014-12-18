package com.property.base.ebi;


import com.ufo.framework.common.log.LogerManager;
import com.ufo.framework.system.ebi.CommonException;
import com.ufo.framework.system.shared.module.DataFetchResponseInfo;

public interface UnitFeesEbi  extends LogerManager, CommonException {
	
	public DataFetchResponseInfo loadUnit(String navigates,String sort,String moduleType);
	

}
