package com.ufo.framework.system.shared.module;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.codehaus.jackson.annotate.JsonIgnore;

/**
 * 从服务器返回的数据增加的值，包括修改成功标志，返回的值
 * 
 * @author jfok
 * 
 */
public class DataInsertResponseInfo implements Serializable {
	private static final long serialVersionUID = 1L;

	private Integer resultCode;
	private List<Object> records; // extjs需要返回的是一个数组，单条记录也要加到数组里
	
	private String defaultMsg="添加成功!";
	
	
	private Map<String, String> errorMessage;

	// 如果是新增和修改后，将模块名称和主键保存在这里，在controller层再取得 record 返回
	@JsonIgnore
	private String moduleName;
	@JsonIgnore
	private String key;

	public DataInsertResponseInfo() {
		super();
		errorMessage = new LinkedHashMap<String, String>();
		records = new ArrayList<Object>();
	}

	@Override
	public String toString() {
		return "DataUpdateResponseInfo [resultCode=" + resultCode + ", jsonRecord="
				+ records.toString() + ", errorMessage=" + errorMessage + "]";
	}

	public String getMessage() {
		String result = "";
		for (String s : errorMessage.values()) {
			result = result + s + "<br/>";
		}
		return result;
	}

	public List<Object> getRecords() {
		return records;
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

	public String getModuleName() {
		return moduleName;
	}

	public void setModuleName(String moduleName) {
		this.moduleName = moduleName;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getDefaultMsg() {
		return defaultMsg;
	}

	public void setDefaultMsg(String defaultMsg) {
		this.defaultMsg = defaultMsg;
	}
	
	
	
}
