package com.model.hibernate.system;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.annotate.JsonProperty;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import com.ufo.framework.annotation.FieldInfo;
import com.ufo.framework.annotation.TableInfo;
import com.ufo.framework.common.model.BaseEntity;
import com.ufo.framework.common.model.Model;
/**
 * 每个模块的各个字段
* @author HouLynn
* @date 2014年10月20日
  @version 1.0
 */
@Table(name="_ModuleField")
@JsonSerialize(include = JsonSerialize.Inclusion.NON_EMPTY)
@Entity
@DynamicInsert(true)
@DynamicUpdate(true)
@TableInfo(group = "系统模块", id = 9903, title = "模块字段")
public class _ModuleField implements Model  {

	public static final String FIELDID = "tf_fieldId";
	public static final String FIELDNAME = "tf_fieldName";
	public static final String MANYTOONE = "ManyToOne";
	public static final String ONETOONE = "OneToOne";
	public static final String ONETOMANY = "OneToMany";


	@Id
	@FieldInfo(title = "字段序号", number = 10)
	@Column(nullable = false)
	private Integer tf_fieldId;

	@JsonIgnore
	@ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
	@JoinColumn(name = "tf_moduleId", nullable = false)
	@FieldInfo(title = "所属模块", number = 20)
	private _Module tf_Module;

	@JsonIgnore
	@FieldInfo(title = "顺序号", number = 30)
	private Integer tf_fieldOrder;

	@FieldInfo(title = "字段描述", number = 40,  uniqueField= true)
	@Column(length = 50, nullable = false)
	private String tf_title;

	@FieldInfo(title = "字段名", number = 50)
	@Column(length = 50, nullable = false)
	private String tf_fieldName;

	@FieldInfo(title = "类型", number = 60)
	@Column(length = 50, nullable = false)
	private String tf_fieldType;

	@JsonProperty("l")
	@FieldInfo(title = "长度", number = 70)
	private Integer tf_fieldLen;

	@FieldInfo(title = "字段分组", number = 75)
	private String tf_fieldGroup;

	// 字段的关联类型 ，ManyToOne，OneToOne，OneToMany
	@JsonIgnore
	@FieldInfo(title = "关联类型", number = 80)
	@Column(length = 20)
	private String tf_fieldRelation;

	@JsonIgnore
	@FieldInfo(title = "表字段实名", remark = "数据表中的实际字段名", number = 90)
	@Column(length = 50)
	private String tf_DBfieldName;

	@JsonIgnore
	@FieldInfo(title = "字段公式", remark = "公式字段的具体内容", number = 100)
	private String tf_DBformula;

	@JsonIgnore
	@FieldInfo(title = "百分比分子", number = 105, remark = "如果这个字段是二个字段的比值，设置分子字段和分母字段，可以在汇总的时候也得出正确的比值")
	@Column(length = 50)
	private String tf_divisor;

	@JsonIgnore
	@FieldInfo(title = "百分比分母", number = 106)
	@Column(length = 50)
	private String tf_denominator;

	@FieldInfo(title = "缺省值", number = 110)
	@Column(length = 50)
	private String tf_defaultValue;

	// @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
	// @JoinColumn(name = "tf_propertyTypeId")
	// @FieldInfo(title = "字段列表属性", number = 120)
	// private _PropertyType tf_PropertyType;

	@FieldInfo(title = "禁用", number = 130)
	private Boolean tf_isDisable;

	@FieldInfo(title = "隐藏", number = 140)
	private Boolean tf_isHidden;

	@JsonIgnore(false)
	@FieldInfo(title = "必填", number = 150)
	private Boolean tf_isRequired;

	@FieldInfo(title = "可新增", number = 160)
	private Boolean tf_allowNew;

	@FieldInfo(title = "可修改", number = 170)
	private Boolean tf_allowEdit;

	@JsonIgnore
	@FieldInfo(title = "可导航", remark = "选中才可以在导航树中显示", number = 180)
	private Boolean tf_showNavigatorTree;

	@FieldInfo(title = "可分组", number = 190)
	private Boolean tf_allowGroup; // 是否允许分组

	@FieldInfo(title = "小计", number = 200)
	private Boolean tf_allowSummary; // 是否可以小计及总计

	@FieldInfo(title = "新增选中", remark = "在新增一条记录时，是否必须在导航树中选择此字段的值", number = 210)
	private Boolean tf_newNeedSelected;

	@FieldInfo(title = "字段附件", remark = "可以增加针对此字段的附件", number = 212)
	private Boolean tf_haveAttachment;

	@JsonIgnore
	@FieldInfo(title = "自定义", number = 220)
	private Boolean tf_isUserDefine;

	@FieldInfo(title = "其他设置", number = 230)
	private String tf_otherSetting;

	@JsonIgnore
	@FieldInfo(title = "Excel导入", remark = "Excel导入新增时加入此字段可新增", number = 240)
	private Boolean tf_allowInsertExcel;

	@JsonIgnore
	@FieldInfo(title = "Excel修改", remark = "Excel修改后再导入时此字段可更新", number = 250)
	private Boolean tf_allowEditExcel;

	@FieldInfo(title = "图表项目", remark = "此字段可以作为图表分析中的一个项目", number = 260)
	private Boolean tf_isChartCategory;

	@FieldInfo(title = "图表数据", remark = "此字段可以作为图表分析中的一个数据", number = 270)
	private Boolean tf_isChartNumeric;

	@FieldInfo(title = "备注", number = 800)
	private String tf_remark;

	// 如果是一个manytoone的字段，那么显示实际ID的字段 _
	@Transient
	private String manytoone_IdName;

	// 如果是一个manytoone的字段，那么显示实际title的字段 _
	@Transient
	private String manytoone_TitleName;

	public _ModuleField() {

	}

	public _ModuleField(Integer tf_fieldId) {
		this.tf_fieldId = tf_fieldId;
	}

	@Override
	public String toString() {
		return "_ModuleField [tf_fieldId=" + tf_fieldId + ", tf_title=" + tf_title + ", tf_fieldName="
				+ tf_fieldName + ", tf_fieldType=" + tf_fieldType + ", tf_fieldLen=" + tf_fieldLen + "]";
	}

	public Boolean hasDivisior_Denominator() {
		return (tf_divisor != null) && (tf_denominator != null) && (tf_divisor.length() > 0)
				&& (tf_denominator.length() > 0);
	}

	public String behindText() {
		try {
			if (tf_otherSetting != null) {
				int pos = tf_otherSetting.indexOf("behindText");
				if (pos >= 0) {
					int firstpos = tf_otherSetting.indexOf("'", pos + 10);
					int lastpos = tf_otherSetting.indexOf("'", firstpos + 1);
					return tf_otherSetting.substring(firstpos + 1, lastpos);
				}
			}
		} catch (Exception e) {
		}
		return null;
	}

	public Integer getTf_fieldId() {
		return tf_fieldId;
	}

	public void setTf_fieldId(Integer tf_fieldId) {
		this.tf_fieldId = tf_fieldId;
	}

	public String getTf_title() {
		return tf_title;
	}

	public void setTf_title(String tf_title) {
		this.tf_title = tf_title;
	}

	public String getTf_fieldName() {
		return tf_fieldName;
	}

	public String getFactfieldName() {
		return tf_fieldName;
	}

	public void setTf_fieldName(String tf_fieldName) {
		this.tf_fieldName = tf_fieldName;
	}

	public String getTf_fieldType() {
		return tf_fieldType;
	}

	public void setTf_fieldType(String tf_fieldType) {
		this.tf_fieldType = tf_fieldType;
	}

	public Integer getTf_fieldLen() {
		return tf_fieldLen == null ? 0 : tf_fieldLen;
	}

	public void setTf_fieldLen(Integer tf_fieldLen) {
		this.tf_fieldLen = tf_fieldLen;
	}

	public Boolean getTf_isHidden() {
		return tf_isHidden == null ? false : tf_isHidden;
	}

	public void setTf_isHidden(Boolean tf_isHidden) {
		this.tf_isHidden = tf_isHidden;
	}

	@JsonIgnore(false)
	public Boolean getTf_isRequired() {
		return tf_isRequired == null ? false : tf_isRequired;
	}

	public void setTf_isRequired(Boolean tf_isRequired) {
		this.tf_isRequired = tf_isRequired;
	}

	public Boolean getTf_isDisable() {
		return tf_isDisable == null ? false : tf_isDisable;
	}

	public void setTf_isDisable(Boolean tf_isDisable) {
		this.tf_isDisable = tf_isDisable;
	}

	public Boolean getTf_isUserDefine() {
		return tf_isUserDefine == null ? false : tf_isUserDefine;
	}

	public void setTf_isUserDefine(Boolean tf_isUserDefine) {
		this.tf_isUserDefine = tf_isUserDefine;
	}

	public String getTf_otherSetting() {
		return tf_otherSetting;
	}

	public void setTf_otherSetting(String tf_otherSetting) {
		this.tf_otherSetting = tf_otherSetting;
	}

	public String getTf_remark() {
		return tf_remark;
	}

	public void setTf_remark(String tf_remark) {
		this.tf_remark = tf_remark;
	}

	public String getTf_defaultValue() {
		return tf_defaultValue;
	}

	public void setTf_defaultValue(String tf_defaultValue) {
		this.tf_defaultValue = tf_defaultValue;
	}

	public Boolean getTf_allowGroup() {
		return tf_allowGroup == null ? false : tf_allowGroup;
	}

	public void setTf_allowGroup(Boolean tf_allowGroup) {
		this.tf_allowGroup = tf_allowGroup;
	}

	public Boolean getTf_allowSummary() {

		return tf_allowSummary == null ? false : tf_allowSummary;
	}

	public void setTf_allowSummary(Boolean tf_allowSummary) {
		this.tf_allowSummary = tf_allowSummary;
	}

	public _Module getTf_Module() {
		return tf_Module;
	}

	public void setTf_Module(_Module tf_Module) {
		this.tf_Module = tf_Module;
	}

	public String getTf_fieldRelation() {
		return tf_fieldRelation;
	}

	public void setTf_fieldRelation(String tf_fieldRelation) {
		this.tf_fieldRelation = tf_fieldRelation;
	}

	/**
	 * 是否是基本类型字段
	 * 
	 * @return
	 */
	public boolean isBaseField() {
		return (!(isManyToOne() || isOneToOne() || isOneToMany()));
	}

	/**
	 * 是否是多对一的字段
	 * 
	 * @return
	 */
	public Boolean isManyToOne() {
		return tf_fieldRelation == null ? false : tf_fieldRelation.equalsIgnoreCase(MANYTOONE);
	}

	/**
	 * 是否是一对一的字段
	 * 
	 * @return
	 */
	public Boolean isOneToOne() {
		return tf_fieldRelation == null ? false : tf_fieldRelation.equalsIgnoreCase(ONETOONE);

	}

	/**
	 * 是否是一对多的字段
	 * 
	 * @return
	 */
	public Boolean isOneToMany() {
		return tf_fieldRelation == null ? false : tf_fieldRelation.equalsIgnoreCase(ONETOMANY);
	}

	public Boolean getTf_showNavigatorTree() {
		return tf_showNavigatorTree == null ? false : tf_showNavigatorTree;
	}

	public void setTf_showNavigatorTree(Boolean tf_showNavigatorTree) {
		this.tf_showNavigatorTree = tf_showNavigatorTree;
	}

	public Boolean getTf_newNeedSelected() {
		return tf_newNeedSelected == null ? false : tf_newNeedSelected;
	}

	public void setTf_newNeedSelected(Boolean tf_newNeedSelected) {
		this.tf_newNeedSelected = tf_newNeedSelected;
	}

	public void setManytoone_IdName(String manytoone_IdName) {
		this.manytoone_IdName = manytoone_IdName;
	}

	public void setManytoone_TitleName(String manytoone_TitleName) {
		this.manytoone_TitleName = manytoone_TitleName;
	}

	public String getTf_DBfieldName() {
		return tf_DBfieldName;
	}

	public void setTf_DBfieldName(String tf_DBfieldName) {
		this.tf_DBfieldName = tf_DBfieldName;
	}

	public String getTf_DBformula() {
		return tf_DBformula;
	}

	public void setTf_DBformula(String tf_DBformula) {
		this.tf_DBformula = tf_DBformula;
	}

	public String getTf_divisor() {
		return tf_divisor;
	}

	public void setTf_divisor(String tf_divisor) {
		this.tf_divisor = tf_divisor;
	}

	public String getTf_denominator() {
		return tf_denominator;
	}

	public void setTf_denominator(String tf_denominator) {
		this.tf_denominator = tf_denominator;
	}

	public Integer getTf_fieldOrder() {
		return tf_fieldOrder;
	}

	public void setTf_fieldOrder(Integer tf_fieldOrder) {
		this.tf_fieldOrder = tf_fieldOrder;
	}

	public Boolean getTf_allowNew() {
		return tf_allowNew == null ? false : tf_allowNew;
	}

	public void setTf_allowNew(Boolean tf_allowNew) {
		this.tf_allowNew = tf_allowNew;
	}

	public Boolean getTf_allowEdit() {
		return tf_allowEdit == null ? false : tf_allowEdit;
	}

	public void setTf_allowEdit(Boolean tf_allowEdit) {
		this.tf_allowEdit = tf_allowEdit;
	}

	public Boolean getTf_allowInsertExcel() {
		return tf_allowInsertExcel == null ? false : tf_allowInsertExcel;
	}

	public void setTf_allowInsertExcel(Boolean tf_allowInsertExcel) {
		this.tf_allowInsertExcel = tf_allowInsertExcel;
	}

	public Boolean getTf_allowEditExcel() {
		return tf_allowEditExcel == null ? false : tf_allowEditExcel;
	}

	public void setTf_allowEditExcel(Boolean tf_allowEditExcel) {
		this.tf_allowEditExcel = tf_allowEditExcel;
	}

	public Boolean getTf_haveAttachment() {
		return tf_haveAttachment == null ? false : tf_haveAttachment;
	}

	public void setTf_haveAttachment(Boolean tf_haveAttachment) {
		this.tf_haveAttachment = tf_haveAttachment;
	}

	public Boolean getTf_isChartCategory() {
		return tf_isChartCategory == null ? false : tf_isChartCategory;
	}

	public void setTf_isChartCategory(Boolean tf_isChartCategory) {
		this.tf_isChartCategory = tf_isChartCategory;
	}

	public Boolean getTf_isChartNumeric() {
		return tf_isChartNumeric == null ? false : tf_isChartNumeric;
	}

	public void setTf_isChartNumeric(Boolean tf_isChartNumeric) {
		this.tf_isChartNumeric = tf_isChartNumeric;
	}

	public String getTf_fieldGroup() {
		return tf_fieldGroup;
	}

	public void setTf_fieldGroup(String tf_fieldGroup) {
		this.tf_fieldGroup = tf_fieldGroup;
	}

}
