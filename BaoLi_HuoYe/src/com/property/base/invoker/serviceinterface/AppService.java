package com.property.base.invoker.serviceinterface;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.RequestParam;

import com.property.base.invoker.model.AppExpressInfo;
import com.property.base.invoker.model.AppItemInfo;
import com.property.base.invoker.model.AppPointInfo;
import com.property.base.invoker.model.AppResident;
import com.property.base.invoker.model.AppVillage;

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
	  
	  public Map<String,String> addRepairInfo(String  repairTitle,String repairContent,int rid );
	  
	  
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
	  public List<Map<String,List<AppItemInfo>>>  loadFeesItem(int rid) throws Exception;
	  
	  
	  
	  
	  
	
	
	
	
	

}
