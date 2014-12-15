package com.ufo.framework.system.shared.module.grid;

import java.io.Serializable;

/**
 * 当在一个模块中，选择子模块的时候，加入此控制，用来做为子模块grid 的一个筛选
 * 
 * @author jfok
 * 
 */
@SuppressWarnings("serial")
public class ParentModuleFilter implements Serializable {
	private String moduleId;	//模块ＩＤ
	private String moduleName; // 模块名称
	private String moduleTitle; // 模块中文名称
	private String tableAsName; // table as name
	
	private String primarykey; // 模块的主键，一般的条件都加在主键之上
	private String keyValue; // 与主键相等的值
	private String nameField;	
	private String title;  //当前记录的title 值，或是 namefield的值

	public ParentModuleFilter() {

	}

	public String getFilterSql() {
		String result = "(" + tableAsName + "." + primarykey + "='" + keyValue.replaceAll("'", "")
				+ "')";
		return result;
	}

	@Override
	public String toString() {
		return "ParentModuleFilter [moduleId=" + moduleId + ", moduleName=" + moduleName
				+ ", moduleTitle=" + moduleTitle + ", tableAsName=" + tableAsName
				+ ", primarykey=" + primarykey + ", keyValue=" + keyValue + ", nameField="
				+ nameField + ", title=" + title + "]";
	}

	public String getModuleName() {
		return moduleName;
	}

	public void setModuleName(String moduleName) {
		this.moduleName = moduleName;
	}

	public String getTableAsName() {
		return tableAsName;
	}

	public void setTableAsName(String tableAsName) {
		this.tableAsName = tableAsName;
	}

	public String getPrimarykey() {
		return primarykey;
	}

	public void setPrimarykey(String primarykey) {
		this.primarykey = primarykey;
	}

	public String getNameField() {
		return nameField;
	}

	public void setNameField(String nameField) {
		this.nameField = nameField;
	}

	public String getKeyValue() {
		return keyValue;
	}

	public void setKeyValue(String keyValue) {
		this.keyValue = keyValue;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getModuleTitle() {
		return moduleTitle;
	}

	public void setModuleTitle(String moduleTitle) {
		this.moduleTitle = moduleTitle;
	}

	public String getModuleId() {
		return moduleId;
	}

	public void setModuleId(String moduleId) {
		this.moduleId = moduleId;
	}



}
