package com.property.base.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.property.base.ebi.UnitFeesEbi;
import com.ufo.framework.common.log.LogerManager;
import com.ufo.framework.system.irepertory.IModelRepertory;
import com.ufo.framework.system.shared.module.DataFetchResponseInfo;

@Controller
@RequestMapping("/unite")
public class UnitFeesController  implements LogerManager{
	
	@Resource
	private IModelRepertory moduleDAO;
	@Autowired
	private UnitFeesEbi uebi;
	
	public UnitFeesEbi getUebi() {
		return uebi;
	}

	public void setUebi(UnitFeesEbi uebi) {
		this.uebi = uebi;
	}

	@RequestMapping("/load")
	public @ResponseBody  Map<String, Object> loadUnite(
			@RequestParam(value = "navigates", required =true) String  navigates,
			@RequestParam(value = "moduleType", required =true) String moduleType,
			@RequestParam(value = "sort", required =true,defaultValue="order by tf_number ASC ") String orderSql
			 ){
		DataFetchResponseInfo response= uebi.loadUnit(navigates, orderSql, moduleType);
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("records", response.getMatchingObjects());
		result.put("totalCount", response.getTotalRows());
		return result;
	}
	
	@RequestMapping("/loadUniteById")
	public @ResponseBody Object  loadUniteById(
			@RequestParam(value = "rid", required =true) String  rid,
			HttpServletRequest request
			){
		List<Object> records = new ArrayList<Object>();
		try {
			records.add(moduleDAO.getModuleRecord("ResidentInfo", rid, request).toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return records.get(0);
		
	}
	
	
	
	

}
