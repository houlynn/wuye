package com.ufo.framework.system.repertory;

import com.model.hibernate.system._Module;
import com.ufo.framework.system.ebo.ApplicationService;

/**
* @author HouLynn
* @date 2014年11月19日
  @version 1.0
 */
public class SqlLeftJoin {
	private String moduleName;
	private String tableAsName;
	private String primaryKey;

	private String childModuleName;
	private String childTableAsName;

	private String joinString = " left outer join ";

	public SqlLeftJoin() {

	}

	public SqlLeftJoin(_Module module,_Module childModule) {
		this.moduleName = module.getTf_moduleName();
		this.tableAsName = module.getTableAsName();
		this.primaryKey = childModule.getTf_primaryKey();
		
		this.childModuleName = childModule.getTf_moduleName();
		this.childTableAsName = childModule.getTableAsName();
	}
	
	public SqlLeftJoin(String moduleName,String childModuleName) {
		
		this(ApplicationService.getModuleWithName(moduleName),ApplicationService.getModuleWithName(childModuleName));
	}
	public String getJoinSql() {
		String result = joinString + childModuleName + " " + childTableAsName + " on " + tableAsName + "."
				+ primaryKey + " = " + childTableAsName + "." + primaryKey + " ";
		return result;
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
	public String getPrimaryKey() {
		return primaryKey;
	}
	public void setPrimaryKey(String primaryKey) {
		this.primaryKey = primaryKey;
	}
	public String getChildModuleName() {
		return childModuleName;
	}
	public void setChildModuleName(String childModuleName) {
		this.childModuleName = childModuleName;
	}
	public String getChildTableAsName() {
		return childTableAsName;
	}
	public void setChildTableAsName(String childTableAsName) {
		this.childTableAsName = childTableAsName;
	}
	public String getJoinString() {
		return joinString;
	}
	public void setJoinString(String joinString) {
		this.joinString = joinString;
	}
}
