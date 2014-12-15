package com.model.hibernate.system;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;

import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import com.ufo.framework.annotation.FieldInfo;
import com.ufo.framework.annotation.TableInfo;
import com.ufo.framework.common.model.Model;
/**
* @author HouLynn
* @date 2014年10月17日
  @version 1.0
 */
@Entity
@Table(name="_MenuGroup")
@JsonSerialize(include = JsonSerialize.Inclusion.NON_EMPTY)
@DynamicInsert(true)
@DynamicUpdate(true)
@TableInfo(group = "系统模块", id = 9920, title = "菜单分组")
public class _MenuGroup implements Model  {
	@Id
	@FieldInfo(title = "顺序号", remark = "菜单分组按顺序号显示在菜单条上", number = 10)
	@Column(length = 10, nullable = false)
	private String tf_menuGroupId;
	@FieldInfo(title = "分组名称", uniqueField = true, number = 20)
	@Column(length = 250, nullable = false)
	private String tf_title;
	@FieldInfo(title = "展开", remark = "在树状菜单下默认是否展开", number = 30)
	private Boolean tf_expand;
	@FieldInfo(title = "图标glyph", number = 40)
	private Boolean tf_glyph;
	@FieldInfo(title = "图标文件名", remark = "图标放置于/images/module/目录下", number = 50)
	@Column(length = 50)
	private String tf_iconURL;
	@FieldInfo(title = "分组描述", number = 60)
	@Column(length = 50)
	private String tf_description;
	@FieldInfo(title = "备注", number = 70)
	private String tf_remark;
	@OneToMany(targetEntity = _MenuModule.class, fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "tf_menuGroupId")
	@OrderBy("tf_orderId")
	private List<_MenuModule> tf_menuModules;

	public _MenuGroup() {
	}

	public String getTf_menuGroupId() {
		return tf_menuGroupId;
	}

	public void setTf_menuGroupId(String tf_menuGroupId) {
		this.tf_menuGroupId = tf_menuGroupId;
	}

	public String getTf_title() {
		return tf_title;
	}

	public void setTf_title(String tf_title) {
		this.tf_title = tf_title;
	}

	public String getTf_description() {
		return tf_description;
	}

	public void setTf_description(String tf_description) {
		this.tf_description = tf_description;
	}

	public Boolean getTf_glyph() {
		return tf_glyph;
	}

	public void setTf_glyph(Boolean tf_glyph) {
		this.tf_glyph = tf_glyph;
	}

	public String getTf_iconURL() {
		return tf_iconURL;
	}

	public void setTf_iconURL(String tf_iconURL) {
		this.tf_iconURL = tf_iconURL;
	}

	public String getTf_remark() {
		return tf_remark;
	}

	public void setTf_remark(String tf_remark) {
		this.tf_remark = tf_remark;
	}

	public List<_MenuModule> getTf_menuModules() {
		return tf_menuModules;
	}

	public void setTf_menuModules(List<_MenuModule> tf_menuModules) {
		this.tf_menuModules = tf_menuModules;
	}

	public Boolean getTf_expand() {
		return tf_expand;
	}

	public void setTf_expand(Boolean tf_expand) {
		this.tf_expand = tf_expand;
	}

}
