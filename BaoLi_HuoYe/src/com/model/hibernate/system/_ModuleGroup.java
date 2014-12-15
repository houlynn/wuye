package com.model.hibernate.system;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import com.ufo.framework.annotation.FieldInfo;
import com.ufo.framework.annotation.TableInfo;
import com.ufo.framework.common.model.BaseEntity;
import com.ufo.framework.common.model.Model;
/**
 * 
 * 模块分组类，每一个模块都有一个大类分组
 * 
 */
@Table(name="_ModuleGroup")
@Entity
@JsonSerialize(include = JsonSerialize.Inclusion.NON_EMPTY)
@DynamicInsert(true)
@DynamicUpdate(true)
@TableInfo(group = "系统模块", id = 9901, title = "模块分组")
public class _ModuleGroup  implements Model {

	public static final String TITLE = "tf_title";

	@Id
	@FieldInfo(title = "模块分组序号", number = 10)
	@Column(nullable = false, length = 10)
	private String tf_moduleGroupId;

	@FieldInfo(title = "模块分组名称", uniqueField = true, number = 20)
	@Column(nullable = false, length = 50)
	private String tf_title;

	@FieldInfo(title = "描述", number = 30)
	private String tf_description;

	@FieldInfo(title = "图标地址", number = 40)
	private String tf_iconURL;

	@FieldInfo(title = "备注", number = 50)
	private String tf_remark;

	public _ModuleGroup() {

	}

	public String getTf_moduleGroupId() {
		return tf_moduleGroupId;
	}

	public void setTf_moduleGroupId(String tf_moduleGroupId) {
		this.tf_moduleGroupId = tf_moduleGroupId;
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

}
