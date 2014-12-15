package com.ufo.framework.common.core.ext.model;

public class FormField {

	private String fieldLabel;
	private String name;
	private boolean allowBlank;
	private String beforeLabelTextTpl;
	private String xtype;
	private boolean isDd;
	private String dbCode;
	private String type;
	private int index;
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
	public boolean isAllowBlank() {
		return allowBlank;
	}
	public void setAllowBlank(boolean allowBlank) {
		this.allowBlank = allowBlank;
	}
	public String getBeforeLabelTextTpl() {
		return beforeLabelTextTpl;
	}
	public void setBeforeLabelTextTpl(String beforeLabelTextTpl) {
		this.beforeLabelTextTpl = beforeLabelTextTpl;
	}
	public String getXtype() {
		return xtype;
	}
	public void setXtype(String xtype) {
		this.xtype = xtype;
	}
	public boolean isDd() {
		return isDd;
	}
	public void setDd(boolean isDd) {
		this.isDd = isDd;
	}
	public String getDbCode() {
		return dbCode;
	}
	public void setDbCode(String dbCode) {
		this.dbCode = dbCode;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public int getIndex() {
		return index;
	}
	public void setIndex(int index) {
		this.index = index;
	}
	
}
