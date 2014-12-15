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
import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.GenericGenerator;

import com.ufo.framework.annotation.FieldInfo;
import com.ufo.framework.annotation.TableInfo;
import com.ufo.framework.common.model.BaseEntity;
import com.ufo.framework.common.model.Model;
/**
 *
* @author HouLynn
* @date 2014年10月17日
  @version 1.0
 */
@Entity
@Table(name="_MenuModule")
@JsonSerialize(include = JsonSerialize.Inclusion.NON_EMPTY)
@DynamicInsert(true)
@DynamicUpdate(true)
@TableInfo(group = "系统模块", id = 9921, title = "系统菜单")
public class _MenuModule  implements Model {
	@Id
	@FieldInfo(title = "ID号", hidden = true, number = 10)
	@GeneratedValue(generator = "increment")
	@GenericGenerator(name = "increment", strategy = "increment")
	private Integer tf_menuModuleId;

	@FieldInfo(title = "顺序号", remark = "按顺序号显示在菜单中", number = 20)
	@Column(nullable = false)
	private Integer tf_orderId;

	@JsonIgnore
	@ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
	@JoinColumn(name = "tf_menuGroupId", nullable = false)
	@FieldInfo(title = "菜单分组", uniqueField = true, number = 30)
	private _MenuGroup tf_MenuGroup;

	@JsonIgnore
	@ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
	@JoinColumn(name = "tf_moduleId", nullable = false)
	@FieldInfo(title = "系统模块", number = 40)
	private _Module tf_Module;

	@FieldInfo(title = "父菜单标题", number = 50)
	@Column(length = 20)
	private String tf_parentMenu;

	@FieldInfo(title = "分隔下一条", number = 60)
	private Boolean tf_addSeparator;


	@FieldInfo(title = "菜单标题", number = 70)
	@Column(length = 50)
	private String tf_title;

	@FieldInfo(title = "父模块约束设置", number = 80)
	private String tf_parentFilter;
	
	// 这个字段用于传送json到前台，放在json中
	@Column(insertable = false, updatable = false)
	private String tf_ModuleId;

	public _MenuModule() {

	}

	@Override
	public String toString() {
		return "_MenuModule [tf_menuModuleId=" + tf_menuModuleId + ", tf_orderId=" + tf_orderId
				+ ", tf_MenuGroup=" + tf_MenuGroup + ", tf_Module=" + tf_Module + ", tf_addSeparator="
				+ tf_addSeparator + "]";
	}

	public Integer getTf_menuModuleId() {
		return tf_menuModuleId;
	}

	public void setTf_menuModuleId(Integer tf_menuModuleId) {
		this.tf_menuModuleId = tf_menuModuleId;
	}

	public Integer getTf_orderId() {
		return tf_orderId;
	}

	public void setTf_orderId(Integer tf_orderId) {
		this.tf_orderId = tf_orderId;
	}

	public Boolean getTf_addSeparator() {
		return tf_addSeparator == null ? false : tf_addSeparator;
	}

	public void setTf_addSeparator(Boolean tf_addSeparator) {
		this.tf_addSeparator = tf_addSeparator;
	}

	public _MenuGroup getTf_MenuGroup() {
		return tf_MenuGroup;
	}

	public void setTf_MenuGroup(_MenuGroup tf_MenuGroup) {
		this.tf_MenuGroup = tf_MenuGroup;
	}

	public _Module getTf_Module() {
		return tf_Module;
	}

	public void setTf_Module(_Module tf_Module) {
		this.tf_Module = tf_Module;
	}

	public String getTf_ModuleId() {
		return tf_ModuleId;
	}

	public void setTf_ModuleId(String tf_ModuleId) {
		this.tf_ModuleId = tf_ModuleId;
	}

	public String getTf_parentMenu() {
		return tf_parentMenu;
	}

	public void setTf_parentMenu(String tf_parentMenu) {
		this.tf_parentMenu = tf_parentMenu;
	}

	public String getTf_title() {
		return tf_title;
	}

	public void setTf_title(String tf_title) {
		this.tf_title = tf_title;
	}

	public String getTf_parentFilter() {
		return tf_parentFilter;
	}

	public void setTf_parentFilter(String tf_parentFilter) {
		this.tf_parentFilter = tf_parentFilter;
	}

}
