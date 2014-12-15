package com.model.hibernate.system;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.GenericGenerator;

import com.ufo.framework.annotation.FieldInfo;
import com.ufo.framework.annotation.TableInfo;
import com.ufo.framework.annotation.TreeItemName;
import com.ufo.framework.annotation.TreeItemValue;
import com.ufo.framework.common.model.BaseEntity;
import com.ufo.framework.common.model.Model;

/**
 * 每一个模块列表方案之中显示字段分组
 * 
 * 
 * 
 */
@Table(name="_ModuleGridSchemeGroup")
@Entity
@DynamicInsert(true)
@DynamicUpdate(true)
@TableInfo(group = "系统模块", id = 9905, title = "模块列表字段分组", shortname = "列表字段分组")
public class _ModuleGridSchemeGroup  implements Model{

	public static final String GRIDGROUPID = "tf_gridGroupId";

	@TreeItemValue
	@Id
	@GeneratedValue(generator = "increment")
	@GenericGenerator(name = "increment", strategy = "increment")
	@FieldInfo(title = "ID号", number = 10, hidden = true)
	private Integer tf_gridGroupId;

	@JsonIgnore
	@ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
	@JoinColumn(name = "tf_gridSchemeId", nullable = false)
	@FieldInfo(title = "模块列表方案", number = 20)
	private _ModuleGridScheme tf_ModuleGridScheme;

	@FieldInfo(title = "顺序号", number = 30)
	@Column(nullable = false)
	private Integer tf_gridGroupOrder;

	@TreeItemName
	@FieldInfo(title = "分组名称", uniqueField = true, number = 40)
	@Column(length = 50, nullable = false)
	private String tf_gridGroupName;

	@FieldInfo(title = "表头分组", number = 50)
	private Boolean tf_isShowHeaderSpans;

	@FieldInfo(title = "锁定", number = 60)
	private Boolean tf_isLocked;

	@FieldInfo(title = "其他设置", number = 90)
	private String tf_otherSetting;

	@OneToMany(targetEntity = _ModuleGridSchemeGroupField.class, fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "tf_gridGroupId")
	@OrderBy("tf_gridFieldOrder")
	private List<_ModuleGridSchemeGroupField> tf_groupFields;

	public _ModuleGridSchemeGroup() {

	}

	public _ModuleGridSchemeGroup(Integer tf_gridGroupId) {
		this.tf_gridGroupId = tf_gridGroupId;
	}

	public Integer getTf_gridGroupId() {
		return tf_gridGroupId;
	}

	public void setTf_gridGroupId(Integer tf_gridGroupId) {
		this.tf_gridGroupId = tf_gridGroupId;
	}

	public Integer getTf_gridGroupOrder() {
		return tf_gridGroupOrder;
	}

	public void setTf_gridGroupOrder(Integer tf_gridGroupOrder) {
		this.tf_gridGroupOrder = tf_gridGroupOrder;
	}

	public String getTf_gridGroupName() {
		return tf_gridGroupName;
	}

	public void setTf_gridGroupName(String tf_gridGroupName) {
		this.tf_gridGroupName = tf_gridGroupName;
	}

	public List<_ModuleGridSchemeGroupField> getTf_groupFields() {
		return tf_groupFields;
	}

	public void setTf_groupFields(List<_ModuleGridSchemeGroupField> tf_groupFields) {
		this.tf_groupFields = tf_groupFields;
	}

	public String getTf_otherSetting() {
		return tf_otherSetting;
	}

	public void setTf_otherSetting(String tf_otherSetting) {
		this.tf_otherSetting = tf_otherSetting;
	}

	public _ModuleGridScheme getTf_ModuleGridScheme() {
		return tf_ModuleGridScheme;
	}

	public void setTf_ModuleGridScheme(_ModuleGridScheme tf_ModuleGridScheme) {
		this.tf_ModuleGridScheme = tf_ModuleGridScheme;
	}

	public Boolean getTf_isShowHeaderSpans() {
		return tf_isShowHeaderSpans == null ? false : tf_isShowHeaderSpans;
	}

	public void setTf_isShowHeaderSpans(Boolean tf_isShowHeaderSpans) {
		this.tf_isShowHeaderSpans = tf_isShowHeaderSpans;
	}

	public Boolean getTf_isLocked() {
		return tf_isLocked;
	}

	public void setTf_isLocked(Boolean tf_isLocked) {
		this.tf_isLocked = tf_isLocked;
	}

}
