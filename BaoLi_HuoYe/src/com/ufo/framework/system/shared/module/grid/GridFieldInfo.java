package com.ufo.framework.system.shared.module.grid;

import java.io.Serializable;

/**
 * 暂时不用 grid 的每一个field 的信息，存放每一个字段的id,fieldname , title
 * 
 * @author jiangfeng
 * 
 */
@SuppressWarnings("serial")
public class GridFieldInfo implements Serializable {

	public static final String GRIDFIELDINFO = "gridfieldinfo";

	private String groupName;
	private Integer fieldId;
	private String fieldname;
	private String fieldtype;
	private String valueFieldname;
	private String title;
	private Boolean allowSubTotal;
	private Boolean twoRows; // 如果表头分组没有的话，则为true,表示写在excel里需要2行
	private String unitText; // 字段单位 ，元，米，万元等等

	public GridFieldInfo() {

	}

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public Integer getFieldId() {
		return fieldId;
	}

	public void setFieldId(Integer fieldId) {
		this.fieldId = fieldId;
	}

	public String getFieldname() {
		return fieldname;
	}

	public String getFactFieldname() {
		if (valueFieldname != null)
			return valueFieldname;
		else
			return fieldname;
	}

	public void setFieldname(String fieldname) {
		this.fieldname = fieldname;
	}

	public String getFieldtype() {
		return fieldtype;
	}

	public void setFieldtype(String fieldtype) {
		this.fieldtype = fieldtype;
	}

	public String getValueFieldname() {
		return valueFieldname;
	}

	public void setValueFieldname(String valueFieldname) {
		this.valueFieldname = valueFieldname;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	// 如果有分组，并且字段的前面字和 分组相同，那么就把相同的去掉
	// 如果分组是 ＡＡＡ，字段title AAABBB,那么title 改成 BBB

	public String getTitleAndUnitTextWithOutGroupName() {
		String result;
		if (unitText == null || unitText.length() == 0)
			result = title.replaceAll("--", ""); // "\r\n");
		else
			result = title.replaceAll("--", "") + "\n(" + unitText + ")";
		if (groupName != null && result != null) {
			if (result.indexOf(groupName) == 0)
				result = result.substring(groupName.length());
			if (result.length() == 0)
				result = groupName;
		}
		return result;
	}

	public String getTitleAndUnitText() {
		if (unitText == null || unitText.length() == 0)
			return title.replaceAll("--", ""); // "\r\n");
		else
			return title.replaceAll("--", "") + "\n(" + unitText + ")";
	}

	public Boolean getAllowSubTotal() {
		return allowSubTotal;
	}

	public void setAllowSubTotal(Boolean allowSubTotal) {
		this.allowSubTotal = allowSubTotal;
	}

	public Boolean getTwoRows() {
		return twoRows;
	}

	public void setTwoRows(Boolean twoRows) {
		this.twoRows = twoRows;
	}

	public String getUnitText() {
		return unitText;
	}

	public void setUnitText(String unitText) {
		this.unitText = unitText;
	}

}
