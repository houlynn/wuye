package com.model.hibernate.system;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.GenericGenerator;

import com.ufo.framework.annotation.FieldInfo;
import com.ufo.framework.annotation.TableInfo;
import com.ufo.framework.common.model.BaseEntity;
import com.ufo.framework.common.model.Model;
@Table(name="_ModuleFormSchemeGroupField")
@Entity
@DynamicInsert(true)
@DynamicUpdate(true)
@TableInfo(group = "系统模块", id = 9909, title = "模块Form字段", shortname = "Form字段")
public class _ModuleFormSchemeGroupField  implements Model {
	@Id
	@GeneratedValue(generator = "increment")
	@GenericGenerator(name = "increment", strategy = "increment")
	@FieldInfo(title = "ID号", hidden = true, number = 10)
	private Integer tf_formFieldId;

	@JsonIgnore
	@ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
	@JoinColumn(name = "tf_formGroupId", nullable = false)
	@FieldInfo(title = "模块Form字段分组", number = 20)
	private _ModuleFormSchemeGroup tf_ModuleFormSchemeGroup;

	@FieldInfo(title = "顺序号", number = 30)
	@Column(nullable = false)
	private Integer tf_formFieldOrder;

	@JsonIgnore
	@ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
	@JoinColumn(name = "tf_fieldId", nullable = false)
	@FieldInfo(title = "模块字段", uniqueField = true, number = 40)
	private _ModuleField tf_ModuleField;

	// 这个字段用于将数据转成json传到前台时候，加入moduleField的id
	@Column(insertable = false, updatable = false)
	private Integer tf_fieldId;

	@FieldInfo(title = "宽度", number = 50)
	private Integer tf_width;

	@FieldInfo(title = "栏数", number = 60)
	private Integer tf_colspan;

	@FieldInfo(title = "结束行", number = 70)
	private Boolean tf_isEndRow;

	@FieldInfo(title = "附加设置", number = 80)
	private String tf_otherSetting;

	public _ModuleFormSchemeGroupField() {

	}

	public _ModuleFormSchemeGroupField(Integer formFieldId) {
		this.tf_formFieldId = formFieldId;
	}

	public Integer getTf_formFieldId() {
		return tf_formFieldId;
	}

	public void setTf_formFieldId(Integer tf_formFieldId) {
		this.tf_formFieldId = tf_formFieldId;
	}

	public Integer getTf_formFieldOrder() {
		return tf_formFieldOrder;
	}

	public void setTf_formFieldOrder(Integer tf_formFieldOrder) {
		this.tf_formFieldOrder = tf_formFieldOrder;
	}

	public Integer getTf_width() {
		return tf_width == null ? 0 : tf_width;
	}

	public void setTf_width(Integer tf_width) {
		this.tf_width = tf_width;
	}

	public Integer getTf_colspan() {
		return tf_colspan == null ? 0 : tf_colspan;
	}

	public void setTf_colspan(Integer tf_colspan) {
		this.tf_colspan = tf_colspan;
	}

	public Boolean getTf_isEndRow() {
		return tf_isEndRow == null ? false : tf_isEndRow;
	}

	public void setTf_isEndRow(Boolean tf_isEndRow) {
		this.tf_isEndRow = tf_isEndRow;
	}

	public String getTf_otherSetting() {
		return tf_otherSetting == null ? "" : tf_otherSetting;
	}

	public void setTf_otherSetting(String tf_otherSetting) {
		this.tf_otherSetting = tf_otherSetting;
	}

	public _ModuleFormSchemeGroup getTf_ModuleFormSchemeGroup() {
		return tf_ModuleFormSchemeGroup;
	}

	public void setTf_ModuleFormSchemeGroup(_ModuleFormSchemeGroup tf_ModuleFormSchemeGroup) {
		this.tf_ModuleFormSchemeGroup = tf_ModuleFormSchemeGroup;
	}

	public _ModuleField getTf_ModuleField() {
		return tf_ModuleField;
	}

	public void setTf_ModuleField(_ModuleField tf_ModuleField) {
		this.tf_ModuleField = tf_ModuleField;
	}

	public Integer getTf_fieldId() {
		return tf_fieldId;
	}

	public void setTf_fieldId(Integer tf_fieldId) {
		this.tf_fieldId = tf_fieldId;
	}

}
