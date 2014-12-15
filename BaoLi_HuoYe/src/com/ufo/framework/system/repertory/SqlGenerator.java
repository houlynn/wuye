package com.ufo.framework.system.repertory;

import java.util.ArrayList;
import java.util.List;



import org.hibernate.SQLQuery;

import com.model.hibernate.system._Module;
import com.model.hibernate.system._ModuleField;
import com.ufo.framework.common.core.utils.StringUtil;
import com.ufo.framework.common.core.web.SortParameter;
import com.ufo.framework.system.ebo.ApplicationService;
import com.ufo.framework.system.shared.FieldType;

public class SqlGenerator {

	private List<SqlField> fieldList = new ArrayList<SqlField>(); // 字段列表
	private List<SqlField> joinField = new ArrayList<SqlField>();
	private List<SqlLeftJoin> joinOn = new ArrayList<SqlLeftJoin>();

	// 这是取得单条记录时的主键
	private String keyValue;

	// 这个是模块字段或者父模块的主键的筛选
	private List<SqlModuleFilter> moduleFilters;

	// 这个是对指定字段的筛选，比如说对所有的字段加入一个筛选
	private List<SqlCondition> sqlConditions;

	private String[] gridColumnNames;// 当前grid 中显示的字段，如果有文字筛选，则只加在这些字段之上
	private String searchText; // 加在grid上的search text

	private _Module module;

	private SortParameter[] sorts;

	private String groupFieldname;

	private boolean distinct;

	public SqlGenerator(String moduleName) {
		this(ApplicationService.getModuleWithName(moduleName));
	}

	public SqlGenerator(_Module module) {

		// 是否有不隐藏的字段不允许查看的
		// userSession =
		// SessionManage.getInstance().getUserSession(request.getSession());

		this.module = module;
		fieldList = new ArrayList<SqlField>();
		joinField = new ArrayList<SqlField>();//
		joinOn = new ArrayList<SqlLeftJoin>();
		moduleFilters = new ArrayList<SqlModuleFilter>();
		sqlConditions = new ArrayList<SqlCondition>();

		if (module.getTf_hasAddition())
			getFieldList().add(new SqlField_AdditionCount(module));

		// 加入所有基本类型于sql中
		for (_ModuleField field : module.getTf_fields()) {
		
			if (("ManyToOne").equals(field.getTf_fieldRelation())) {
				if (field.getTf_showNavigatorTree() == true) {
				   String tf_fieldType=field.getTf_fieldType();
				   _Module chile_Moduel= ApplicationService.getModuleWithName(tf_fieldType);//获去模块信息
				   SqlField sqlField= new  SqlField(chile_Moduel.getTf_moduleName(), chile_Moduel
							.getTableAsName(),chile_Moduel.getTf_nameFields(),
							field.getTf_DBfieldName(), field
									.getTf_DBformula(), field
									.getTf_fieldType());
				   sqlField.setFieldAsName(chile_Moduel.getTableAsName()+sqlField.getFieldName());
				  // sqlField.setFieldAsName("_"+chile_Moduel.getTableAsName()+chile_Moduel.getTf_nameFields());
				   sqlField.setFieldasScalar(field.getTf_fieldName());
				   getJoinField().add(sqlField);
				   joinOn.add(getSQLManyToOneLeftJoin(field.getTf_Module().getTf_moduleName(),chile_Moduel.getTf_moduleName()));
				}
			} else {
				SqlField sqlField=	new SqlField(module.getTf_moduleName(), module
						.getTableAsName(), field.getTf_fieldName(),
						field.getTf_DBfieldName(), field
								.getTf_DBformula(), field
								.getTf_fieldType());
				   sqlField.setFieldAsName(sqlField.getTableAsName()+sqlField.getFieldName());
				getFieldList().add(sqlField);
			

			}
		}
	}

	public static SqlLeftJoin getSQLManyToOneLeftJoin(String moduleName,
			String childModuleName) {
		return new SqlLeftJoin(moduleName, childModuleName);

	}

	public String getCountSqlStatement() {
		String sql = "select count(*) ";
		sql = sql + " from " + getFrom();
		sql = sql + getLeftJoin();
		sql = sql + getWhere();
		return sql;
	}

	// 生成按照某个父模块分组的 记录统计的语句如
	// select field,count(*) from tablea a ,tableb group by field
	// where .....,用于生成grid tree 中的树中各项目的
	// 记录数
	public String getGroupByIdAndCount(String groupField, Boolean reverseOrder) {
		String sql = "select " + groupField + " as id , count(*) as count";
		sql = sql + " from " + getFrom();
		sql = sql + getLeftJoin();
		sql = sql + getWhere();
		sql = sql + " group by " + groupField;
		sql = sql + " order by " + groupField;
		if (reverseOrder != null && reverseOrder)
			sql = sql + " desc ";
		return sql;
	}

	public String getSumFieldSqlStatement(String fn) {
		String sql = "select sum(" + module.getTableAsName() + "." + fn + ") ";
		sql = sql + " from " + getFrom();
		sql = sql + getLeftJoin();
		sql = sql + getWhere();
		return sql;
	}

	public String getSqlStatment() {
		String sql = "select " + (distinct ? "distinct " : " ")
				+ getSelectFields() + (distinct ? " , 1 as ____c " : " ");
		sql = sql + " from " + getFrom();
		sql = sql + getLeftJoin();
		sql = sql + getWhere();
		sql = sql + getSortByString();
		if(StringUtil.isNotEmpty(getSearchText())){
		sql=sql+getSearchText();
		}
		System.out.println(" 凭借sql:" + sql);
		return sql;
	}

	private String getSortByString() {
		String result = "";
		String groupFN = "";
		if (groupFieldname != null)
			groupFN = groupFieldname + " asc ";
		if (sorts != null && (sorts.length > 0)) {
			for (SortParameter sort : sorts) {
				result = result + sort.getProperty() + " "
						+ sort.getDirection() + " , ";
			}
			result = result.substring(0, result.length() - 3);
		} else if (module.getTf_defaultOrderField() != null
				&& module.getTf_defaultOrderField().length() > 0)
			result = module.getTf_defaultOrderField();
		if (result.length() > 0 && groupFN.length() > 0)
			groupFN = groupFN + " , ";
		if (result.length() > 0 || groupFN.length() > 0)
			return " order by " + groupFN + result;
		else
			return "";
	}

	protected String getWhere() {
		List<String> wheres = new ArrayList<String>();

		String moduleFilterString = getModuleFilterString();
		if (moduleFilterString != null)
			wheres.add(moduleFilterString);
		//String columnFilterString = getGridColumnFilterString();
		//if (columnFilterString != null)
			//wheres.add(columnFilterString);
		if (keyValue != null && keyValue.length() > 0)
			wheres.add(module.getTableAsName() + "."
					+ module.getTf_primaryKey() + "='" + keyValue + "'");

		if (wheres.size() == 0)
			return "";
		String where = " where ";
		for (int i = 0; i < wheres.size(); i++)
			where = where + wheres.get(i)
					+ (i != wheres.size() - 1 ? " and " : "");
		return where;
	}

	// 生成各个模块加入的条件的ＳＱＬ，全部用ＡＮＤ连接
	protected String getModuleFilterString() {
		if (moduleFilters.size() > 0) {
			String result = "";
			for (SqlModuleFilter filter : moduleFilters)
				result = result + filter.getFilterSql() + " and ";
			result = result.substring(0, result.length() - 5);
			return "(" + result + ")";
		} else
			return null;
	}

	// 生成加个grid 字段上的筛选条件
	protected String getGridColumnFilterString() {
		if (searchText == null || searchText.length() < 1
				|| gridColumnNames.length == 0)
			return null;
		StringBuilder result = new StringBuilder();
		for (String string : gridColumnNames) {
			SqlField field = getSqlFieldWithAsName(string);
			if (field == null)
				continue;
			String s = field.getWhereSql(searchText);
			if (s != null && s.length() > 0)
				result.append(s + " or ");

			// 如果是idfield ,那么要把namefield也加进去
			if (field.getNameField() != null) {
				s = field.getNameField().getWhereSql(searchText);
				if (s != null && s.length() > 0)
					result.append(s + " or ");
			}

		}
		if (result.length() > 4)
			return "(" + result.toString().substring(0, result.length() - 4)
					+ ")";
		else
			return "( 1=1 )";
	}

	protected SqlField getSqlFieldWithAsName(String asName) {
		for (SqlField field : fieldList)
			if (field.getFieldAsName().equals(asName))
				return field;
		for (SqlField field : joinField)
			if (field.getFieldAsName().equals(asName))
				return field;
		return null;
	}

	protected String getSelectFields() {
		String fields = " ";
		for (SqlField field : fieldList)
			fields = fields + field.getFieldSql() + ",";
		for (SqlField field : joinField)
			fields = fields + field.getFieldSql() + ",";
		fields = fields.substring(0, fields.length() - 1);
		return fields + " ";
	}

	protected String getFrom() {
		System.out.println(" from " + module.getTf_tableName() + " "
				+ module.getTableAsName());
		return " " + module.getTf_tableName() + " " + module.getTableAsName();
	}

	protected String getLeftJoin() {
		String leftJoin = "";
		for (SqlLeftJoin field : joinOn)
			leftJoin = leftJoin + field.getJoinSql();
		return leftJoin;
	}

	public void setFieldsOnlyIdAndName() {
		fieldList.clear();
		joinField.clear();
		fieldList.add(new SqlField(module.getTf_moduleName(), module
				.getTableAsName(), module.getTf_primaryKey(), null, null,
				FieldType.String.getValue()));
		fieldList.add(new SqlField(module.getTf_moduleName(), module
				.getTableAsName(), module.getTf_nameFields(), null, null,
				FieldType.String.getValue()));
		sorts = new SortParameter[1];
		sorts[0] = new SortParameter(module.getTf_primaryKey(), "asc");

	}

	// 只生成查询一个字段的语句，需要select distinct fieldName from ..... where .....
	public void setFieldsOnlyThisField(String fieldName) {
		for (int i = fieldList.size() - 1; i >= 0; i--)
			if (!fieldList.get(i).getFieldName().equals(fieldName))
				fieldList.remove(i);
		joinField.clear();
		distinct = true;
		sorts = new SortParameter[1];
		sorts[0] = new SortParameter(fieldName, "asc");
	}

	// 对sql 加入 scalar
	public void addScalar(SQLQuery query) {
		// 只有一个字段在取得数据转换成 map 的时候出错，因此要再加一个字段
		for (SqlField field : fieldList)
			query.addScalar(field.getFieldScalar());
		for (SqlField field : joinField)
			query.addScalar(field.getFieldScalar());
		if (distinct)
			query.addScalar("____c");
	}

	// 设置 module 的筛选值，可以是当前module ，也可以是parent

	public void setModuleFilters(List<SqlModuleFilter> filters) {
		this.moduleFilters.clear();
		if (filters != null)
			for (SqlModuleFilter filter : filters) {
				// 检查filters 是否是当前的表
				if (module.getTableAsName().equals(filter.getTableAsName())) {
					this.moduleFilters.add(filter);
					continue;
				}
				// 检查filters 在当前的 parents 中是否有
				for (SqlLeftJoin join : joinOn){
					System.out.println(join.getTableAsName());
				    System.out.println(filter.getTableAsName());
					if (join.getChildTableAsName().equals(filter.getTableAsName())) {

						// if
						// (join.getModuleName().equals(filter.getModuleName()))
						// {
						this.moduleFilters.add(filter);
						break;
					}
				}
			}
	}

	public List<SqlField> getFieldList() {
		return fieldList;
	}

	public void setFieldList(List<SqlField> fieldList) {
		this.fieldList = fieldList;
	}

	public List<SqlField> getJoinField() {
		return joinField;
	}

	public void setJoinField(List<SqlField> joinField) {
		this.joinField = joinField;
	}

	public List<SqlLeftJoin> getJoinOn() {
		return joinOn;
	}

	public void setJoinOn(List<SqlLeftJoin> joinOn) {
		this.joinOn = joinOn;
	}

	public List<SqlCondition> getSqlConditions() {
		return sqlConditions;
	}

	public void setSqlConditions(List<SqlCondition> sqlConditions) {
		this.sqlConditions = sqlConditions;
	}

	public List<SqlModuleFilter> getModuleFilters() {
		return moduleFilters;
	}

	public String[] getGridColumnNames() {
		return gridColumnNames;
	}

	public void setGridColumnNames(String[] gridColumnNames) {
		this.gridColumnNames = gridColumnNames;
	}

	public String getSearchText() {
		return searchText;
	}

	public void setSearchText(String searchText) {
		this.searchText = searchText;
		/*this.searchText = searchText == null ? null : searchText.replaceAll(
				"'", "");*/
	}

	public String getKeyValue() {
		return keyValue;
	}

	public void setKeyValue(String keyValue) {
		this.keyValue = keyValue;
	}

	public SortParameter[] getSorts() {
		return sorts;
	}

	public void setSorts(SortParameter[] sorts) {
		this.sorts = sorts;
	}

	public String getGroupFieldname() {
		return groupFieldname;
	}

	public void setGroupFieldname(String groupFieldname) {
		if (groupFieldname != null && groupFieldname.equals("null"))
			this.groupFieldname = null;
		else
			this.groupFieldname = groupFieldname;
	}
}
