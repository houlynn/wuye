package com.property.base.invoker.serviceinterface;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.RequestParam;

import com.property.base.invoker.model.AppExpressInfo;
import com.property.base.invoker.model.AppItemInfo;
import com.property.base.invoker.model.AppPointInfo;
import com.property.base.invoker.model.AppResident;
import com.property.base.invoker.model.AppVillage;
import com.ufo.framework.system.shared.module.DataFetchResponseInfo;
import com.ufo.framework.system.shared.module.DataUpdateResponseInfo;

public interface AppService {
	
	/**
	 * 查找小区
	 * @param tf_locationxy
	 * @param city
	 * @return
	 */
	public List<AppVillage> loadVis(String tf_locationxy,String city) throws Exception;
	/**
	 * 
	 * @param start
	 * @param limit
	 * @param ctype
	 * @param ptype
	 * @return
	 * @throws Exception
	 */
	public Map<String,Object> loadPoint(int start,int limit, String ctype,int vid ) throws Exception;
	
	/**
	 * 快递收发
	 * @param model
	 * @return
	 */
	  public Map<String,String> addAppExpressInfo(AppExpressInfo model);
	  
	  
	  /**
	   * 报装报修
	   */
	  
	  public Map<String, String> addRepairInfo(String repairTitle,String repairContent, int rid, String appPhone);
	  
	  
	  /**
	   * 一个业主的信息
	   */
	  public AppResident getAppResident(int id) throws Exception;
	  
	  /**
	   * 一个小区的信息
	   */
	  public AppVillage getAppVillage(int id) throws Exception;
	  
	/**
	 * 业主收费项目
	 * @param rid
	 * @return
	 */
	  public List<Map<String,Object>>  loadFeesItem(int rid) throws Exception;
	  
	  /**
	   * 缴费
	   * @param vid
	   * @param rid
	   * @param billids
	   * @return
	   * @throws Exception
	   */
	  public Map<String, String> pay(int vid, int rid, String appUser,  int[] billids) throws Exception;
	  
	  
	  /**
	   * 根据手机号查询业主信息
	   */
	  public List<AppResident> loadAppResident(String loginCode) throws Exception;
	  
	  
	  /**
	   * key
	 * @throws Exception 
	   */
	  public Map<String,String> getPayKey(int vid) throws Exception;
	  
	  
	  /**
	   * 发送短信
	   */
	  
	  public Map<String,String> postSMS(String phoneNuber) throws Exception;
	  
	  
	  
	  public Map<String,String> updateBill(int billConteId, String billCode, int vid,int rid ,int[] billids,float acount) throws Exception;
	  
	  
	  
	  public Map<String,Object> loadNoticeMessge(int start, int limit, String whereSql,
				String parentSql, String querySql, String orderSql,int vid) throws Exception;
	  
	  
	  
	
	
	
	
	

}
