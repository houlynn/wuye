package com.model.hibernate.system;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import com.ufo.framework.annotation.FieldInfo;
import com.ufo.framework.annotation.TableInfo;
import com.ufo.framework.annotation.TreeItemName;
import com.ufo.framework.annotation.TreeItemValue;
import com.ufo.framework.common.model.BaseEntity;
import com.ufo.framework.common.model.Model;
@Entity
@Table(name="_Module")
@DynamicInsert(true)
@DynamicUpdate(true)
@TableInfo(group = "系统模块", id = 9902, title = "系统模块")
public class _Module implements Model  {

	public static final String MODULEID = "tf_moduleId";
	public static final String MODULENAME = "tf_moduleName";

	@TreeItemValue
	@Id
	@FieldInfo(title = "模块ID号", number = 10)
	@Column(nullable = false, length = 10)
	private String tf_moduleId; // 模块ＩＤ，模块序号

	@ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
	@JoinColumn(name = "tf_moduleGroupId",nullable=false)
	@FieldInfo(title = "模块分组", number = 20)
	private _ModuleGroup tf_ModuleGroup;

	@FieldInfo(title = "模块标识", number = 30)
	@Column(nullable = false, length = 50, updatable = false)
	private String tf_moduleName; // 模块英文名称

	@TreeItemName
	@FieldInfo(title = "模块名称", uniqueField = true, number = 40)
	@Column(nullable = false, length = 50)
	private String tf_title; // 模块中文名称

	@FieldInfo(title = "模块简称", number = 50)
	@Column(length = 20)
	private String tf_shortname; // 简称

	@FieldInfo(title = "英文简称", number = 60)
	@Column(length = 20)
	private String tf_englishname; // 英文简称，在新增序号的时候，可以把这字母加进去

	@FieldInfo(title = "表名", number = 70)
	@Column(length = 50,nullable=false)
	private String tf_tableName;

	@FieldInfo(title = "主键", number = 80)
	@Column(nullable = false, length = 50)
	private String tf_primaryKey;// 模块主键

	@FieldInfo(title = "显示标志字段", number = 81)
	@Column(nullable = false, length = 50)
	private String tf_nameFields;// 模块主要关键内容的字段，如合同的是合同名称，部门的是部门名称

	@FieldInfo(title = "记录标题tpl", number = 82, remark = "如果显示标志字段不能描述记录,需要设置此内容")
	@Column(length = 200)
	private String tf_titleTpl;// 模块主要关键内容的字段，如合同的是合同名称，部门的是部门名称

	@FieldInfo(title = "编码字段", number = 91)
	@Column(length = 50)
	private String tf_codeField;// 模块编码字段，如果有的话

	@FieldInfo(title = "顺序号字段", number = 97)
	@Column(length = 50)
	private String tf_orderField;// 模块编码字段，如果有的话

	@FieldInfo(title = "日期字段", number = 92)
	@Column(length = 50)
	private String tf_dateField;

	@FieldInfo(title = "年度字段", number = 93)
	@Column(length = 50)
	private String tf_yearfield;

	@FieldInfo(title = "月度字段", number = 94)
	@Column(length = 50)
	private String tf_monthField;

	@FieldInfo(title = "季度字段", number = 95)
	@Column(length = 50)
	private String tf_seasonField;

	@FieldInfo(title = "文件字段", number = 96)
	@Column(length = 50)
	private String tf_fileField;

	@FieldInfo(title = "主页上顺序", number = 99)
	@Column(length = 50)
	private String tf_homePageTag;

	@FieldInfo(title = "模块描述", number = 100)
	@Column(length = 50)
	private String tf_description;

	@FieldInfo(title = "请求地址", number = 110)
	@Column(nullable = false, length = 50)
	private String tf_requestMapping;// 系统中后台服务的调用接入点 user.do,employee.do 等

	@FieldInfo(title = "图标地址", number = 120)
	@Column(length = 50)
	private String tf_iconURL;

	@FieldInfo(title = "默认排序字段", number = 130)
	private String tf_defaultOrderField;

	@FieldInfo(title = "行操作", remark = "新增及修改操作都行内完成", number = 140)
	@Column(nullable = false)
	private Boolean tf_isInlineOper;

	// 如部门编码为 2,2,2,2,2
	@FieldInfo(title = "编码级次", remark = "如果设置了编码级次，则主键的长度必须是此级次中的，并且必须有父级编码存在", number = 150)
	@Column(length = 50)
	String tf_codeLevel;

	@FieldInfo(title = "联动模块", remark = "在本模块的数据增删改后，打开的联动模块都要刷新数据。", number = 155)
	@Column(length = 200)
	private String tf_linkedModule;

	@FieldInfo(title = "可用", number = 160)
	@Column(nullable = false)
	private Boolean tf_isEnable = false;

	@FieldInfo(title = "可浏览", number = 170)
	@Column(nullable = false)
	private Boolean tf_hasBrowse = false;

	@FieldInfo(title = "可增加", number = 180)
	@Column(nullable = false)
	private Boolean tf_hasInsert = false;

	@FieldInfo(title = "可修改", number = 190)
	@Column(nullable = false)
	private Boolean tf_hasEdit = false;

	@FieldInfo(title = "可删除", number = 200)
	@Column(nullable = false)
	private Boolean tf_hasDelete = false;

	@FieldInfo(title = "可执行", number = 210)
	@Column(nullable = false)
	private Boolean tf_hasExec = false;

	@FieldInfo(title = "可审核", number = 220)
	@Column(nullable = false)
	private Boolean tf_hasAuditing = false;

	@FieldInfo(title = "可审批", number = 230)
	@Column(nullable = false)
	private Boolean tf_hasApprove = false;

	@FieldInfo(title = "可支付", number = 240)
	@Column(nullable = false)
	private Boolean tf_hasPayment = false;

	@FieldInfo(title = "有附件", number = 250)
	@Column(nullable = false)
	private Boolean tf_hasAddition = false; // 是否需要附件

	@FieldInfo(title = "可权限设置", remark = "用户可对此模块设置权限，选定的才可以浏览与操作", number = 260)
	@Column(nullable = false)
	private Boolean tf_canLimit = false; // 此模块是否能进行权限设置

	@FieldInfo(title = "Excel导入", remark = "是否可以通过Excel导入新增记录", number = 270)
	@Column(nullable = false)
	private Boolean tf_allowInsertExcel = false;

	@FieldInfo(title = "Excel修改", remark = "是否可以导出的Excel修改后再导入", number = 280)
	@Column(nullable = false)
	private Boolean tf_allowEditExcel = false;

	@FieldInfo(title = "可图表", number = 290)
	@Column(nullable = false)
	private Boolean tf_hasChart = false;

	@FieldInfo(title = "系统模块", number = 300, remark = "如果是系统模块，用户没有浏览权限，就不把模块定义发送到前端")
	@Column(nullable = false)
	private Boolean tf_isSystem = false;

	@FieldInfo(title = "查询条件顺序号", number = 310, remark = "此模块放在综合查询的条件选择栏中的顺序")
	private Integer tf_searchCondOrder;

	@FieldInfo(title = "备注", number = 800)
	private String tf_remark;

	@OneToMany(targetEntity = _ModuleField.class, fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "tf_moduleId")
	@OrderBy("tf_fieldOrder")
	private List<_ModuleField> tf_fields;

	@OneToMany(targetEntity = _ModuleFormScheme.class, fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "tf_moduleId")
	@OrderBy("tf_schemeOrder")
	private List<_ModuleFormScheme> tf_formSchemes;

	@OneToMany(targetEntity = _ModuleGridScheme.class, fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "tf_moduleId")
	@OrderBy("tf_schemeOrder")
	private List<_ModuleGridScheme> tf_gridSchemes;

	
	@OneToMany(targetEntity = _ModuleGridNavigate.class, fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "tf_moduleId")
	@OrderBy("tf_order")
	private List<_ModuleGridNavigate> tf_moduleGridNavigates;
	
	public _Module() {

	}

	public void setAllDisable() {
		tf_isEnable = false;
		tf_hasBrowse = false;
		tf_hasInsert = false;
		tf_hasEdit = false;
		tf_hasDelete = false;
		tf_hasExec = false;
		tf_hasAuditing = false;
		tf_hasApprove = false;
		tf_hasPayment = false;
	}

	public List<_ModuleField> getTf_fields() {
		return tf_fields;
	}

	public void setTf_fields(List<_ModuleField> tf_fields) {
		this.tf_fields = tf_fields;
	}

	public List<_ModuleFormScheme> getTf_formSchemes() {
		return tf_formSchemes;
	}

	public void setTf_formSchemes(List<_ModuleFormScheme> tf_formSchemes) {
		this.tf_formSchemes = tf_formSchemes;
	}

	public List<_ModuleGridScheme> getTf_gridSchemes() {
		return tf_gridSchemes;
	}

	public void setTf_gridSchemes(List<_ModuleGridScheme> tf_gridSchemes) {
		this.tf_gridSchemes = tf_gridSchemes;
	}

	public String getTableAsName() {
		return "_t" + tf_moduleId;
	}

	public String getTf_moduleId() {
		return tf_moduleId;
	}

	public void setTf_moduleId(String tf_moduleId) {
		this.tf_moduleId = tf_moduleId;
	}

	public String getTf_moduleName() {
		return tf_moduleName;
	}

	// 如果modulename没有前缀_,那就就加一个用于生成 tf_ （modulename）
	public String getTf_moduleNameWithPre() {
		if (tf_moduleName.startsWith("_"))
			return tf_moduleName;
		else
			return "_" + tf_moduleName;
	}

	public void setTf_moduleName(String tf_moduleName) {
		this.tf_moduleName = tf_moduleName;
	}

	public String getTf_title() {
		return tf_title;
	}

	public String shortnameOrTitle() {
		if (tf_shortname == null || tf_shortname.length() == 0)
			return tf_title;
		else
			return tf_shortname;
	}

	public void setTf_title(String tf_title) {
		this.tf_title = tf_title;
	}

	public String getTf_shortname() {
		return tf_shortname;
	}

	public void setTf_shortname(String tf_shortname) {
		this.tf_shortname = tf_shortname;
	}

	public String getTf_englishname() {
		return tf_englishname;
	}

	public void setTf_englishname(String tf_englishname) {
		this.tf_englishname = tf_englishname;
	}

	public String getTf_primaryKey() {
		return tf_primaryKey;
	}

	public void setTf_primaryKey(String tf_primaryKey) {
		this.tf_primaryKey = tf_primaryKey;
	}

	public String getTf_nameFields() {
		return tf_nameFields;
	}

	public void setTf_nameFields(String tf_nameFields) {
		this.tf_nameFields = tf_nameFields;
	}

	public String getTf_description() {
		return tf_description;
	}

	public void setTf_description(String tf_description) {
		this.tf_description = tf_description;
	}

	public String getTf_requestMapping() {
		return tf_requestMapping;
	}

	public void setTf_requestMapping(String tf_requestMapping) {
		this.tf_requestMapping = tf_requestMapping;
	}

	public String getTf_iconURL() {
		return tf_iconURL;
	}

	public void setTf_iconURL(String tf_iconURL) {
		this.tf_iconURL = tf_iconURL;
	}

	public Boolean getTf_isInlineOper() {
		return tf_isInlineOper;
	}

	public void setTf_isInlineOper(Boolean tf_isInlineOper) {
		this.tf_isInlineOper = tf_isInlineOper;
	}

	public Boolean getTf_isEnable() {
		return tf_isEnable == null ? false : tf_isEnable;
	}

	public void setTf_isEnable(Boolean tf_isEnable) {
		this.tf_isEnable = tf_isEnable;
	}

	public Boolean getTf_hasBrowse() {
		return tf_hasBrowse == null ? false : tf_hasBrowse;
	}

	public void setTf_hasBrowse(Boolean tf_hasBrowse) {
		this.tf_hasBrowse = tf_hasBrowse;
	}

	public Boolean getTf_hasInsert() {
		return tf_hasInsert == null ? false : tf_hasInsert;
	}

	public void setTf_hasInsert(Boolean tf_hasInsert) {
		this.tf_hasInsert = tf_hasInsert;
	}

	public Boolean getTf_hasEdit() {
		return tf_hasEdit == null ? false : tf_hasEdit;
	}

	public void setTf_hasEdit(Boolean tf_hasEdit) {
		this.tf_hasEdit = tf_hasEdit;
	}

	public Boolean getTf_hasDelete() {
		return tf_hasDelete == null ? false : tf_hasDelete;
	}

	public void setTf_hasDelete(Boolean tf_hasDelete) {
		this.tf_hasDelete = tf_hasDelete;
	}

	public Boolean getTf_hasExec() {
		return tf_hasExec == null ? false : tf_hasExec;
	}

	public void setTf_hasExec(Boolean tf_hasExec) {
		this.tf_hasExec = tf_hasExec;
	}

	public Boolean getTf_hasAuditing() {
		return tf_hasAuditing == null ? false : tf_hasAuditing;
	}

	public void setTf_hasAuditing(Boolean tf_hasAuditing) {
		this.tf_hasAuditing = tf_hasAuditing;
	}

	public Boolean getTf_hasApprove() {
		return tf_hasApprove == null ? false : tf_hasApprove;
	}

	public void setTf_hasApprove(Boolean tf_hasApprove) {
		this.tf_hasApprove = tf_hasApprove;
	}

	public Boolean getTf_hasPayment() {
		return tf_hasPayment == null ? false : tf_hasPayment;
	}

	public void setTf_hasPayment(Boolean tf_hasPayment) {
		this.tf_hasPayment = tf_hasPayment;
	}

	public Boolean getTf_hasAddition() {
		return tf_hasAddition == null ? false : tf_hasAddition;
	}

	public void setTf_hasAddition(Boolean tf_hasAddition) {
		this.tf_hasAddition = tf_hasAddition;
	}

	public String getTf_remark() {
		return tf_remark;
	}

	public void setTf_remark(String tf_remark) {
		this.tf_remark = tf_remark;
	}

	public _ModuleGroup getTf_ModuleGroup() {
		return tf_ModuleGroup;
	}

	public void setTf_ModuleGroup(_ModuleGroup tf_ModuleGroup) {
		this.tf_ModuleGroup = tf_ModuleGroup;
	}

	public String getTf_defaultOrderField() {
		return tf_defaultOrderField;
	}

	public void setTf_defaultOrderField(String tf_defaultOrderField) {
		this.tf_defaultOrderField = tf_defaultOrderField;
	}

	public String getTf_codeLevel() {
		return tf_codeLevel;
	}

	public void setTf_codeLevel(String tf_codeLevel) {
		this.tf_codeLevel = tf_codeLevel;
	}

	public Boolean isCodeLevel() {
		return (tf_codeLevel != null && tf_codeLevel.length() > 0);
	}

	public Boolean getTf_canLimit() {
		return tf_canLimit == null ? false : tf_canLimit;
	}

	public void setTf_canLimit(Boolean tf_canLimit) {
		this.tf_canLimit = tf_canLimit;
	}

	public String getTf_tableName() {
		return tf_tableName == null || tf_tableName.length() == 0 ? tf_moduleName : tf_tableName;
	}

	public void setTf_tableName(String tf_tableName) {
		this.tf_tableName = tf_tableName;
	}

	public String getTf_linkedModule() {
		return tf_linkedModule;
	}

	public void setTf_linkedModule(String tf_linkedModule) {
		this.tf_linkedModule = tf_linkedModule;
	}

	public Boolean getTf_allowInsertExcel() {
		return tf_allowInsertExcel;
	}

	public void setTf_allowInsertExcel(Boolean tf_allowInsertExcel) {
		this.tf_allowInsertExcel = tf_allowInsertExcel;
	}

	public Boolean getTf_allowEditExcel() {
		return tf_allowEditExcel;
	}

	public void setTf_allowEditExcel(Boolean tf_allowEditExcel) {
		this.tf_allowEditExcel = tf_allowEditExcel;
	}

	public Boolean getTf_hasChart() {
		return tf_hasChart;
	}

	public void setTf_hasChart(Boolean tf_hasChart) {
		this.tf_hasChart = tf_hasChart;
	}

	public String getTf_codeField() {
		return tf_codeField;
	}

	public void setTf_codeField(String tf_codeField) {
		this.tf_codeField = tf_codeField;
	}

	public String getTf_orderField() {
		return tf_orderField;
	}

	public void setTf_orderField(String tf_orderField) {
		this.tf_orderField = tf_orderField;
	}

	public String getTf_dateField() {
		return tf_dateField;
	}

	public void setTf_dateField(String tf_dateField) {
		this.tf_dateField = tf_dateField;
	}

	public String getTf_yearfield() {
		return tf_yearfield;
	}

	public void setTf_yearfield(String tf_yearfield) {
		this.tf_yearfield = tf_yearfield;
	}

	public String getTf_monthField() {
		return tf_monthField;
	}

	public void setTf_monthField(String tf_monthField) {
		this.tf_monthField = tf_monthField;
	}

	public String getTf_seasonField() {
		return tf_seasonField;
	}

	public void setTf_seasonField(String tf_seasonField) {
		this.tf_seasonField = tf_seasonField;
	}

	public String getTf_homePageTag() {
		return tf_homePageTag;
	}

	public void setTf_homePageTag(String tf_homePageTag) {
		this.tf_homePageTag = tf_homePageTag;
	}

	public String getTf_titleTpl() {
		return tf_titleTpl;
	}

	public void setTf_titleTpl(String tf_titleTpl) {
		this.tf_titleTpl = tf_titleTpl;
	}

	public String getTf_fileField() {
		return tf_fileField;
	}

	public void setTf_fileField(String tf_fileField) {
		this.tf_fileField = tf_fileField;
	}

	public Boolean getTf_isSystem() {
		return tf_isSystem;
	}

	public void setTf_isSystem(Boolean tf_isSystem) {
		this.tf_isSystem = tf_isSystem;
	}

	public Integer getTf_searchCondOrder() {
		return tf_searchCondOrder;
	}

	public void setTf_searchCondOrder(Integer tf_searchCondOrder) {
		this.tf_searchCondOrder = tf_searchCondOrder;
	}

	public List<_ModuleGridNavigate> getTf_moduleGridNavigates() {
		return tf_moduleGridNavigates;
	}

	public void setTf_moduleGridNavigates(
			List<_ModuleGridNavigate> tf_moduleGridNavigates) {
		this.tf_moduleGridNavigates = tf_moduleGridNavigates;
	}


}
