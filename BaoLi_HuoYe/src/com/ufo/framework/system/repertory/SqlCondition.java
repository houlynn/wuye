package com.ufo.framework.system.repertory;

import java.util.List;

/**
 * 每一个模块的条件值,可以生成如 _t9901.tf_moduleId = 23 之类的条件约束
 * 
 * @author jfok
 * 
 */
public class SqlCondition {


	private String moduleName; // 模块名称
	private String tableAsName; // table as name
	private String primarykey; // 模块的主键，一般的条件都加在主键之上
	private String equalsValue; // 与主键相等的值

	private List<String> inValues; // 主键是in的

	public SqlCondition() {
          System.out.println("===========SqlCondition=====================");
	}

	public String getCondition() {
		if (equalsValue.equals("null"))
			return "(" + tableAsName + "." + primarykey + " is null )";
		else
			return "(" + tableAsName + "." + primarykey + "=" + equalsValue + ")";
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

	public String getEqualsValue() {
		return equalsValue;
	}

	public void setEqualsValue(String equalsValue) {
		this.equalsValue = equalsValue;
	}

	public List<String> getInValues() {
		return inValues;
	}

	public void setInValues(List<String> inValues) {
		this.inValues = inValues;
	}

}
