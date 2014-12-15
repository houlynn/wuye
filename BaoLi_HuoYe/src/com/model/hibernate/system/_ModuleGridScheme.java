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
 * 模块的列表方案，一个模块可以有多个列表方案，可以显示不同的字段，有不同的属性
 *
* @author HouLynn
* @date 2014年10月17日
  @version 1.0
 */
@Table(name="_ModuleGridScheme")
@Entity
@DynamicInsert(true)
@DynamicUpdate(true)
@TableInfo(group = "系统模块", id = 9904, title = "模块列表方案", shortname = "列表方案")
public class _ModuleGridScheme  implements Model {

	@TreeItemValue
	@Id
	@GeneratedValue(generator = "increment")
	@GenericGenerator(name = "increment", strategy = "increment")
	@FieldInfo(title = "ID号", number = 10, hidden = true)
	private Integer tf_gridSchemeId;

	@JsonIgnore
	@ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
	@JoinColumn(name = "tf_moduleId", nullable = false)
	@FieldInfo(title = "模块", number = 20)
	private _Module tf_Module;

	@FieldInfo(title = "顺序号", number = 30)
	@Column(nullable = false)
	private Integer tf_schemeOrder;

	@TreeItemName
	@FieldInfo(title = "方案名称", uniqueField = true, number = 40)
	@Column(length = 50, nullable = false)
	private String tf_schemeName;

	@FieldInfo(title = "系统方案", number = 50)
	private Boolean tf_isSystemScheme;

	@FieldInfo(title = "可编辑", number = 60)
	private Boolean tf_isAllowEditInGrid;

	@FieldInfo(title = "双击操作", number = 70)
	private String tf_dblClickAction;

	@FieldInfo(title = "排序字段", number = 80)
	private String tf_defaultSort; // 默认排序字段，如为null则为数据库默认排序

	@FieldInfo(title = "附加设置", number = 90)
	private String tf_otherSetting;

	@OneToMany(targetEntity = _ModuleGridSchemeGroup.class, fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "tf_gridSchemeId")
	@OrderBy("tf_gridGroupOrder")
	private List<_ModuleGridSchemeGroup> tf_schemeGroups;

	public _ModuleGridScheme() {

	}

	/**
	 * 返回是否某个字段包含在grid 列表中
	 * 
	 * @param fieldName
	 * @return
	 */
	public Boolean isHaveField(Integer fieldId) {
		for (_ModuleGridSchemeGroup schemeGroup : tf_schemeGroups) {
			for (_ModuleGridSchemeGroupField field : schemeGroup.getTf_groupFields())
				if (field.getTf_ModuleField().getTf_fieldId().equals(fieldId))
					return true;
		}
		return false;

	}

	public Integer getTf_gridSchemeId() {
		return tf_gridSchemeId;
	}

	public void setTf_gridSchemeId(Integer tf_gridSchemeId) {
		this.tf_gridSchemeId = tf_gridSchemeId;
	}

	public Integer getTf_schemeOrder() {
		return tf_schemeOrder;
	}

	public void setTf_schemeOrder(Integer tf_schemeOrder) {
		this.tf_schemeOrder = tf_schemeOrder;
	}

	public String getTf_schemeName() {
		return tf_schemeName;
	}

	public void setTf_schemeName(String tf_schemeName) {
		this.tf_schemeName = tf_schemeName;
	}

	public Boolean getTf_isSystemScheme() {
		return tf_isSystemScheme == null ? false : tf_isSystemScheme;
	}

	public void setTf_isSystemScheme(Boolean tf_isSystemScheme) {
		this.tf_isSystemScheme = tf_isSystemScheme;
	}

	public Boolean getTf_isAllowEditInGrid() {
		return tf_isAllowEditInGrid == null ? false : tf_isAllowEditInGrid;
	}

	public void setTf_isAllowEditInGrid(Boolean tf_isAllowEditInGrid) {
		this.tf_isAllowEditInGrid = tf_isAllowEditInGrid;
	}

	public String getTf_dblClickAction() {
		return tf_dblClickAction;
	}

	public void setTf_dblClickAction(String tf_dblClickAction) {
		this.tf_dblClickAction = tf_dblClickAction;
	}

	public List<_ModuleGridSchemeGroup> getTf_schemeGroups() {
		return tf_schemeGroups;
	}

	public void setTf_schemeGroups(List<_ModuleGridSchemeGroup> tf_schemeGroups) {
		this.tf_schemeGroups = tf_schemeGroups;
	}

	public String getTf_defaultSort() {
		return tf_defaultSort;
	}

	public void setTf_defaultSort(String tf_defaultSort) {
		this.tf_defaultSort = tf_defaultSort;
	}

	public String getTf_otherSetting() {
		return tf_otherSetting;
	}

	public void setTf_otherSetting(String tf_otherSetting) {
		this.tf_otherSetting = tf_otherSetting;
	}

	public _Module getTf_Module() {
		return tf_Module;
	}

	public void setTf_Module(_Module tf_Module) {
		this.tf_Module = tf_Module;
	}

}
