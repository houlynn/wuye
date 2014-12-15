package com.ufo.framework.system.repertory;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.model.hibernate.system._Module;
import com.model.hibernate.system._ModuleField;
import com.ufo.framework.system.shared.FieldType;
import com.ufo.framework.system.shared.module.FieldAggregationType;
import com.ufo.framework.system.shared.module.ModuleConstants;

public class SqlField {

	protected String moduleName; // 模块名称
	protected String tableAsName; // 表的别名
	protected String fieldName; // 字段名
	protected String fieldType; // 字段类型
	protected String fieldAsName; // 字段 as 名
	protected String fieldScalar; // 加到 Scalar 中的名称，应该与别名一样
	protected String fieldasScalar; // 如果别名是 as___field,此处应该为 as.field
	protected String filterValue; // 加在此字段上的筛选条件

	protected String fieldFullName; // as.name

	protected SqlField nameField; // 如果此字段是idfield,那么就存放 namefield
	// ,在筛选时要将namefield中的值加进去

	// 这三个还没有用到，备用
	protected String fieldCondition; // 加在此字段上的条件
	protected boolean isAggregation; // 是否是聚合字段
	protected boolean isParents; // 是否是父模块中的字段
	protected FieldAggregationType aggregationType; // 聚合字段类型，还要加入关键字比对等内容

	public SqlField() {

	}

	public SqlField(String moduleName, String tableAsName, String fieldName, String DBFieldName,
			String formulaStr, String fieldType) {
		super();
		this.moduleName = moduleName;
		this.tableAsName = tableAsName;
		this.fieldName = fieldName;
		if (DBFieldName != null && DBFieldName.length() > 0) {
			this.fieldFullName = this.tableAsName + "." + DBFieldName;
		} else if (formulaStr != null && formulaStr.length() > 0)
			this.fieldFullName = " (" + formulaStr.replaceAll("   ", " " + this.tableAsName + ".") + ") ";   //this_.
		else
			this.fieldFullName = this.tableAsName + "." + this.fieldName;
		this.fieldType = fieldType;
		this.fieldAsName = fieldName;
		this.aggregationType = FieldAggregationType.NORMAL;
		this.isParents = false;
		setFieldScalar(fieldName);
	}

	// 生成一个聚合的count module的字段 ,
	/**
	 * 
	 * @param childModule
	 *          子模块
	 * @param module
	 *          当前模块
	 */
	public SqlField(_Module module, _Module childModule, HttpServletRequest request) {
		super();
		this.moduleName = childModule.getTf_moduleName();
		SqlGenerator sqlGenerator = new SqlGenerator(childModule);
		List<SqlModuleFilter> filters = new ArrayList<SqlModuleFilter>();
		SqlModuleFilter moduleFilter = new SqlModuleFilter();
		moduleFilter.setModuleName(module.getTf_moduleName());
		moduleFilter.setTableAsName(module.getTableAsName());
		moduleFilter.setPrimarykey(module.getTf_primaryKey());
		String equalsValue = module.getTableAsName() + "." + module.getTf_primaryKey();
		String filtervalue = "___filtervalue___";
		moduleFilter.setEqualsValue(filtervalue);
		filters.add(moduleFilter);
		sqlGenerator.setModuleFilters(filters);
		this.fieldName = ("( " + sqlGenerator.getCountSqlStatement() + " )").replaceAll(
				module.getTableAsName(), "_child" + module.getTableAsName()).replace(
				"'" + filtervalue + "'", equalsValue);
		this.fieldFullName = fieldName;
		this.fieldType = FieldType.Integer.getValue();
		this.fieldAsName = ModuleConstants.COUNTAHEAD + moduleName;
		this.aggregationType = FieldAggregationType.COUNT;
		setFieldScalar(fieldAsName);
	}

	// 生成一个聚合的module的 sum 的字段 ,
	/**
	 * 
	 * @param childModule
	 *          子模块
	 * @param module
	 *          当前模块
	 * @param moduleField
	 *          字段
	 */
	public SqlField(_Module module, _Module childModule, _ModuleField moduleField,
			HttpServletRequest request) {
		super();
		this.moduleName = childModule.getTf_moduleName();
		SqlGenerator sqlGenerator = new SqlGenerator(childModule);
		List<SqlModuleFilter> filters = new ArrayList<SqlModuleFilter>();
		SqlModuleFilter moduleFilter = new SqlModuleFilter();
		moduleFilter.setModuleName(module.getTf_moduleName());
		moduleFilter.setTableAsName(module.getTableAsName());
		moduleFilter.setPrimarykey(module.getTf_primaryKey());
		String equalsValue = module.getTableAsName() + "." + module.getTf_primaryKey();
		String filtervalue = "___filtervalue___";
		moduleFilter.setEqualsValue(filtervalue);
		filters.add(moduleFilter);
		sqlGenerator.setModuleFilters(filters);
		this.fieldName = ("( " + sqlGenerator.getSumFieldSqlStatement(moduleField.getTf_fieldName()) + " )")
				.replaceAll(module.getTableAsName(), "_child" + module.getTableAsName()).replace(
						"'" + filtervalue + "'", equalsValue);
		this.fieldFullName = fieldName;
		this.fieldType = FieldType.Double.getValue();
		this.fieldAsName = ModuleConstants.SUMAHEAD + childModule.getTableAsName()
				+ ModuleConstants.FIELDASSEPARATOR + moduleField.getTf_fieldName();
		this.aggregationType = FieldAggregationType.SUM;
		setFieldScalar(fieldAsName);
	}

	public String getModuleName() {
		return moduleName;
	}

	public String getFieldSql() {
		switch (aggregationType) {
		case NORMAL:
			System.out.println("fieldAsName");
			System.out.println(fieldAsName);
			return " " + fieldFullName + " as " + fieldAsName + " ";
		case COUNT:
			return " " + fieldFullName + " as " + fieldAsName + " ";

		case SUM:
			return " " + fieldFullName + " as " + fieldAsName + " ";

		case ADDITIONCOUNT:
			return " " + fieldFullName + " as " + fieldAsName + " ";
		default:
			break;
		}
		return null;

	}

	public String getWhereSql() {
		if (filterValue != null) {
			if (filterValue.equals("null"))
				return " " + fieldFullName + " is null ";
			else
				return " " + fieldFullName + "='" + filterValue.replaceAll("'", "") + "'";
		} else
			return null;
	}

	public String getWhereSql(String value) {
		// 可能是附件张数，没有类型
		if (fieldType == null)
			return null;
		value = value.replaceAll("'", "");
		if (fieldType.equals(FieldType.String.getValue())) {
			return " " + fieldFullName + " like '%" + value + "%'";
		} else if (fieldType.equals(FieldType.Date.getValue())) {
			// if (value.matches("\\d{4}(\\-|\\.)\\d{2}(\\-|\\.)\\d{2}"))
			// return " " + fieldFullName + " like '" + value.replaceAll("\\.", "-") +
			// "%'";
			// else if (value.matches("\\d{4}") ||
			// value.matches("\\d{4}(\\-|\\.)\\d{2}"))
			// return " " + fieldFullName + " like '" + value.replaceAll("\\.", "-") +
			// "%'";

			if (value.matches("\\d{4}(\\-|\\.)\\d{2}(\\-|\\.)\\d{2}") || value.matches("\\d{4}")
					|| value.matches("\\d{4}(\\-|\\.)\\d{2}"))
				return getDateWhereSQL(fieldFullName , value);
			else
				return null;
		} else if (fieldType.equals(FieldType.Boolean.getValue())) {
			if (value.toLowerCase().equals("true"))
				return " " + fieldFullName + " = 1 ";
			else if (value.toLowerCase().equals("false"))
				return " " + fieldFullName + " = 0 ";
			else
				return null;
		} else if (fieldType.equals(FieldType.Double.getValue())
				|| fieldType.equals(FieldType.Float.getValue())) {
			if (value.matches("(-)?[0-9]+(.[0-9]+)?"))
				return " " + fieldFullName + "=" + value + "";
			else
				return null;
		} else if (fieldType.equals(FieldType.Integer.getValue())) {
			if (value.matches("(-)?[1-9]+([0-9]+)?"))
				return " " + fieldFullName + "=" + value + "";
			else
				return null;
		} else
			return null;
	}

	public String getDateWhereSQL(String fieldname, String date) {
		String result = "year(" + fieldname + ")=" + date.substring(0, 4);
		if (date.length() >= 7)
			result = result + " and month(" + fieldname + ")=" + date.substring(5, 7);
		if (date.length() == 10)
			result = result + " and day(" + fieldname + ")=" + date.substring(8, 10);
		return " (" + result + ") ";
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

	public String getFieldName() {
		return fieldName;
	}

	public void setFieldName(String fieldName) {
		this.fieldName = fieldName;
	}

	public String getFieldAsName() {
		return fieldAsName;
	}

	public void setFieldAsName(String fieldAsName) {
		this.fieldAsName = fieldAsName;
	}

	public String getFieldScalar() {
		return fieldScalar;
	}

	public void setFieldScalar(String fieldScalar) {
		this.fieldScalar = fieldScalar;
		if (this.fieldScalar != null)
			fieldasScalar = this.fieldScalar.replaceAll(ModuleConstants.FIELDASSEPARATOR,
					ModuleConstants.SEPARATOR);
	}

	public String getFieldCondition() {
		return fieldCondition;
	}

	public void setFieldCondition(String fieldCondition) {
		this.fieldCondition = fieldCondition;
	}

	public boolean isAggregation() {
		return isAggregation;
	}

	public void setAggregation(boolean isAggregation) {
		this.isAggregation = isAggregation;
	}

	public FieldAggregationType getAggregationType() {
		return aggregationType;
	}

	public void setAggregationType(FieldAggregationType aggregationType) {
		this.aggregationType = aggregationType;
	}

	public String getFieldType() {
		return fieldType;
	}

	public void setFieldType(String fieldType) {
		this.fieldType = fieldType;
	}

	public String getFilterValue() {
		return filterValue;
	}

	public void setFilterValue(String filterValue) {
		this.filterValue = filterValue;
	}

	public String getFieldasScalar() {
		return fieldasScalar;
	}

	public void setFieldasScalar(String fieldasScalar) {
		this.fieldasScalar = fieldasScalar;
	}

	public boolean isParents() {
		return isParents;
	}

	public void setParents(boolean isParents) {
		this.isParents = isParents;
	}

	public SqlField getNameField() {
		return nameField;
	}

	public void setNameField(SqlField nameField) {
		this.nameField = nameField;
	}

	public String getFieldFullName() {
		return fieldFullName;
	}


}
