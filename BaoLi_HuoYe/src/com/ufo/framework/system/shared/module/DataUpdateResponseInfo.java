package com.ufo.framework.system.shared.module;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * 从服务器返回的数据修改的值，包括修改成功标志，返回的值
 * 
 * @author jfok
 * 
 */
public class DataUpdateResponseInfo implements Serializable {
	private static final long serialVersionUID = 1L;

	private Integer resultCode;
	private List<Object> records; // extjs需要返回的是一个数组，单条记录也要加到数组里
	private Map<String, String> errorMessage;
	
	private String defaultMsg="更新成功!";

	public DataUpdateResponseInfo() {
		super();
		resultCode = 0;
		errorMessage = new LinkedHashMap<String, String>();
		records = new ArrayList<Object>();
	}

	public List<Object> getRecords() {
		return records;
	}

	public void setRecords(List<Object> records) {
		this.records = records;
	}

	public Integer getResultCode() {
		return resultCode;
	}

	public void setResultCode(Integer resultCode) {
		this.resultCode = resultCode;
	}

	public Map<String, String> getErrorMessage() {
		return errorMessage;
	}

	public void setErrorMessage(Map<String, String> errorMessage) {
		this.errorMessage = errorMessage;
	}

	public String getDefaultMsg() {
		return defaultMsg;
	}

	public void setDefaultMsg(String defaultMsg) {
		this.defaultMsg = defaultMsg;
	}
	
	
}
