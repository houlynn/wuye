package com.ufo.framework.system.shared.module;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * 从服务器返回的数据删除的情况
 * 
 * @author jfok
 * 
 */
@SuppressWarnings("serial")
public class DataDeleteResponseInfo implements Serializable {

	private Integer resultCode;
	private List<String> okMessageList;
	private List<String> errorMessageList;
	
	private String defaultMsg="删除成功!";

	public DataDeleteResponseInfo() {
		super();
		resultCode = 0;
		okMessageList = new ArrayList<String>();
		errorMessageList = new ArrayList<String>();
	}

	public void setResultMessage(Integer resultCode, String message) {
		this.resultCode = resultCode;
		this.errorMessageList.add(message);
	}

	public String getMessage() {
		String result = "";
		for (String s : errorMessageList) {
			result = result + s + "<br/>";
		}
		return result;
	}

	public Integer getResultCode() {
		return resultCode;
	}

	public void setResultCode(Integer resultCode) {
		this.resultCode = resultCode;
	}

	public List<String> getErrorMessageList() {
		return errorMessageList;
	}

	public void setErrorMessageList(List<String> errorMessageList) {
		this.errorMessageList = errorMessageList;
	}

	public List<String> getOkMessageList() {
		return okMessageList;
	}

	public void setOkMessageList(List<String> okMessageList) {
		this.okMessageList = okMessageList;
	}

	public String getDefaultMsg() {
		return defaultMsg;
	}

	public void setDefaultMsg(String defaultMsg) {
		this.defaultMsg = defaultMsg;
	}

}
