package com.ufo.framework.common.core.ext.model;

public class ResultModel {
	
	/**
	 * 返回代码
	 */
	private int code;
	/**
	 * 返回对象
	 */
	private Object obj;
	/**
	 * 提示信息
	 */
	private String msg;
	
	public Object getObj() {
		return obj;
	}
	public void setObj(Object obj) {
		this.obj = obj;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	public int getCode() {
		return code;
	}
	public void setCode(int code) {
		this.code = code;
	}
	

}
