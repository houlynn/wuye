package com.ufo.framework.common.core.ext.model;

import com.ufo.framework.common.model.BaseEntity;


/**
 * 
 * @author 作者 yingqu:
 * @version 创建时间：2014年7月12日 下午12:14:30 version 1.0
 */
public class GridFieldModel extends BaseEntity {

	private String text;
	private String dataIndex;
	private int width;
	private String columnType;
	private boolean isDD;
	private String dbCode;
	private String type;
	private int index;
	private boolean isAllowBlank;
	private String beforeLabelTextTpl;
	private String maxLengthText;
	private String maxLength;
	private String blankText;

	public boolean isDD() {
		return isDD;
	}

	public void setDD(boolean isDD) {
		this.isDD = isDD;
	}

	private String ddCode;
	private String xtype;

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getDataIndex() {
		return dataIndex;
	}

	public void setDataIndex(String dataIndex) {
		this.dataIndex = dataIndex;
	}

	public int getWidth() {
		return width;
	}

	public void setWidth(int width) {
		this.width = width;
	}

	public String getColumnType() {
		return columnType;
	}

	public void setColumnType(String columnType) {
		this.columnType = columnType;
	}

	public String getDdCode() {
		return ddCode;
	}

	public void setDdCode(String ddCode) {
		this.ddCode = ddCode;
	}

	public String getXtype() {
		return xtype;
	}

	public void setXtype(String xtype) {
		this.xtype = xtype;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getDbCode() {
		return dbCode;
	}

	public void setDbCode(String dbCode) {
		this.dbCode = dbCode;
	}

	public String getBeforeLabelTextTpl() {
		return beforeLabelTextTpl;
	}

	public void setBeforeLabelTextTpl(String beforeLabelTextTpl) {
		this.beforeLabelTextTpl = beforeLabelTextTpl;
	}

	public int getIndex() {
		return index;
	}

	public void setIndex(int index) {
		this.index = index;
	}


	public boolean isAllowBlank() {
		return isAllowBlank;
	}

	public void setAllowBlank(boolean isAllowBlank) {
		this.isAllowBlank = isAllowBlank;
	}

	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return " text=" + text + " dataIndex=" + dataIndex + "  width=" + width
				+ " columnType=" + columnType + " isDD=" + isDD + " dbCode="
				+ dbCode + " type=" + type;
	}

}
