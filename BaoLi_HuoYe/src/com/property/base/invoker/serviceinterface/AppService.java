package com.property.base.invoker.serviceinterface;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.RequestParam;

import com.property.base.invoker.model.AppExpressInfo;
import com.property.base.invoker.model.AppPointInfo;
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
	
	
	
	
	

}
