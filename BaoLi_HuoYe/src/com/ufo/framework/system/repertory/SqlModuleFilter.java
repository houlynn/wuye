package com.ufo.framework.system.repertory;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * 查询时进行的模块的过滤，可以是当前模块，也可以是manytoone 的父模块
 * 
 * @author jfok
 * 
 */
@SuppressWarnings("serial")
public class SqlModuleFilter implements Serializable {

	public static final String EQUALSMETHOD_YEAR = "year";
	public static final String EQUALSMETHOD_YEARMONTH = "yearmonth";
	public static final String EQUALSMETHOD_YEARSEASON = "yearseason";
	public static final String EQUALSMETHOD_YMD = "ymd";

	public static final String DIRECT_METHOD = "directmethod"; // 直接使用
																															// equalsValue中的值作为返回值
	public static final String DIRECT_FIELDANDVALUE = "directfieldandvalue"; // 直接使用
																																						// 字段名和值
	public static final String APPROVETYPE = "approvetype";

	private String text; // 字段值的中文描述
	private String moduleId; // 模块id
	private String moduleName; // 模块名称
	private String tableAsName; // table as name
	private String primarykey; // 模块的主键，一般的条件都加在主键之上
	private String nameField;
	private String fieldtitle; // 当前字段的名称，如果是父模块，则为父模块名称，如果是本模块的，则是字段名
	private String equalsValue; // 与主键相等的值
	private String equalsMethod; // 比较的类型

	private Boolean isCodeLevel = false; // 如果是阶梯的module,需要like

	private List<SqlModuleFilter> orFilter;

	public SqlModuleFilter() {

	}

	public String getAs() {
		if (primarykey.indexOf(" ") != -1 || primarykey.indexOf(".") != -1)
			return "";
		else
			return tableAsName + ".";
	}

	public String getFilterSql() {
		// 如果是审批的模filter, 那么根据条件加入当前操作员的审批条件信息
		String result = "";
		{
			result = "";
			if (orFilter != null && orFilter.size() > 0) {
				for (SqlModuleFilter filter : orFilter)
					result = result + (result.length() > 0 ? " or " : "") + filter.getFilterSql();
				result = "(" + result + ")";
			} else
				result = getThisFilterSql();
		}
		return result;
	}

	private String getThisFilterSql() {
		if (equalsMethod != null && equalsMethod.equals(DIRECT_METHOD))
				return "(" + equalsValue + ")";
		
		if (equalsValue == null)
			equalsValue = "null";
		if (equalsValue.equals("true"))
			equalsValue = "1";
		if (equalsValue.equals("false"))
			equalsValue = "0";
		if (equalsValue.equals("null"))
			return "(" + getAs() + primarykey + " is null )";
		if (equalsValue.equals("not null"))
			return "(" + getAs() + primarykey + " is not null )";
		equalsValue = equalsValue.replaceAll("'", "");
		if (equalsMethod != null) {	
			if (equalsMethod.equals(EQUALSMETHOD_YEAR))
				return "( year(" + getAs() + primarykey + ")=" + equalsValue + ")";
			else if (equalsMethod.equals(EQUALSMETHOD_YEARMONTH))
				return "( year(" + getAs() + primarykey + ")=" + equalsValue.substring(0, 4)
						+ " and month(" + getAs() + primarykey + ")=" + equalsValue.substring(5, 7) + ")";
			else if (equalsMethod.equals(EQUALSMETHOD_YEARSEASON)) {
				int jd = Integer.parseInt(equalsValue.substring(5, 6));
				return "( year(" + getAs() + primarykey + ")=" + equalsValue.substring(0, 4) + " and "
						+ "month(" + getAs() + primarykey + ") >= " + ((jd - 1) * 3 + 1) + " and month("
						+ getAs() + primarykey + ") <= " + ((jd - 1) * 3 + 3) + ")";
			} else if (equalsMethod.equals(EQUALSMETHOD_YMD)) {
				return "( year(" + getAs() + primarykey + ")=" + equalsValue.substring(0, 4) + " and "
						+ "month(" + getAs() + primarykey + ") = " + equalsValue.substring(5, 7) + " and day("
						+ getAs() + primarykey + ") = " + equalsValue.substring(8, 10) + ")";
			} else  if (equalsMethod.equals(DIRECT_FIELDANDVALUE))
				return "(" + getAs() + primarykey + " " + equalsValue + ")";
			else
				return "(" + getAs() + primarykey + " " + equalsMethod + " '" + equalsValue + "' )";

		}
		if (isCodeLevel != null && isCodeLevel)
			return "(" + getAs() + primarykey + " like '" + equalsValue + "%')";
		else
			return "(" + getAs() + primarykey + "='" + equalsValue + "')";
	}

	public void addToOrFilter(SqlModuleFilter filter) {
		if (orFilter == null)
			orFilter = new ArrayList<SqlModuleFilter>();
		orFilter.add(filter);
	}

	@Override
	public String toString() {
		return "SqlModuleFilter [text=" + text + ", moduleName=" + moduleName + ", tableAsName="
				+ tableAsName + ", primarykey=" + primarykey + ", nameField=" + nameField + ", fieldtitle="
				+ fieldtitle + ", equalsValue=" + equalsValue + ", equalsMethod=" + equalsMethod
				+ ", isCodeLevel=" + isCodeLevel + "]";
	}

	/**
	 * 将一个列表的sql modulefilter 转换成 where 子句的一个条件
	 * 
	 * @param filters
	 * @return
	 */
	public String getModuleListString(List<SqlModuleFilter> filters) {
		String result = "";
		if (filters != null && filters.size() > 0)
			for (SqlModuleFilter filter : filters) {
				result = result + (result.length() == 0 ? "" : " and ") + filter.getFilterSql();
			}
		return result.length() == 0 ? " 1=1 " : " ( " + result + " ) ";
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

	public String getEqualsValue() {
		return equalsValue;
	}

	public void setEqualsValue(String equalsValue) {
		this.equalsValue = equalsValue;
	}

	public Boolean getIsCodeLevel() {
		return isCodeLevel;
	}

	public void setIsCodeLevel(Boolean isCodeLevel) {
		this.isCodeLevel = isCodeLevel;
	}

	public String getFieldtitle() {
		return fieldtitle;
	}

	public void setFieldtitle(String fieldtitle) {
		this.fieldtitle = fieldtitle;
	}

	public String getEqualsMethod() {
		return equalsMethod;
	}

	public void setEqualsMethod(String equalsMethod) {
		this.equalsMethod = equalsMethod;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getModuleId() {
		return moduleId;
	}

	public void setModuleId(String moduleId) {
		this.moduleId = moduleId;
	}

	public List<SqlModuleFilter> getOrFilter() {
		return orFilter;
	}

	public void setOrFilter(List<SqlModuleFilter> orFilter) {
		this.orFilter = orFilter;
	}

}
