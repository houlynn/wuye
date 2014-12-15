package com.ufo.framework.common.core.ext.model;

public class QueryFieldMdoel {

	private String queryType;
	private String fieldLabel;
	private String name;
	private String ddCode;
	private boolean isDd;
	private boolean isDate;
	private int index;
	public String getQueryType() {
		return queryType;
	}
	public void setQueryType(String queryType) {
		this.queryType = queryType;
	}
	public String getFieldLabel() {
		return fieldLabel;
	}
	public void setFieldLabel(String fieldLabel) {
		this.fieldLabel = fieldLabel;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDdCode() {
		return ddCode;
	}
	public void setDdCode(String ddCode) {
		this.ddCode = ddCode;
	}
	public boolean isDd() {
		return isDd;
	}
	public void setDd(boolean isDd) {
		this.isDd = isDd;
	}
	public boolean isDate() {
		return isDate;
	}
	public void setDate(boolean isDate) {
		this.isDate = isDate;
	}
	public int getIndex() {
		return index;
	}
	public void setIndex(int index) {
		this.index = index;
	}
	
}
