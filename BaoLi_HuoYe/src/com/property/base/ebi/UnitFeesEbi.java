package com.property.base.ebi;


import java.util.List;
import java.util.Map;

import com.property.base.invoker.model.AppItemInfo;
import com.ufo.framework.common.log.LogerManager;
import com.ufo.framework.system.ebi.CommonException;
import com.ufo.framework.system.shared.module.DataFetchResponseInfo;
import com.ufo.framework.system.shared.module.DataUpdateResponseInfo;

public interface UnitFeesEbi  extends LogerManager, CommonException {
	
	public DataFetchResponseInfo loadUnit(String navigates,String sort,String moduleType);
	public 	DataFetchResponseInfo addUniteFees(int rid,int rtype) throws Exception;
	public  DataUpdateResponseInfo adduniteFees(double tf_shouldCount,double tf_realACount,int rid,String tf_remark,int[] bids) throws Exception;
	public double getUniteFeesAcount(int rid);
	  public List<Map<String,Object>>  loadFees(int rid) throws Exception;
	public Map<String, String> addpayByApp(int vid, int rid, String appUser,  int[] billids) throws Exception;

}
