package com.property.base.ebi;

import com.ufo.framework.common.log.LogerManager;
import com.ufo.framework.system.irepertory.XcodeInterface;
import com.ufo.framework.system.shared.module.DataFetchResponseInfo;

public interface FeesEbi extends LogerManager,XcodeInterface {
	public  DataFetchResponseInfo fetchData(String moduleName, Integer start, Integer limit, String sort,String query, String navigates,String nodeInfoType) throws Exception;
	public void updateAcount(String rendate,String type) throws Exception;
}
