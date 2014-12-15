package com.model.hibernate.addition;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.GenericGenerator;

import com.ufo.framework.annotation.FieldInfo;
import com.ufo.framework.annotation.TableInfo;
import com.ufo.framework.common.model.BaseEntity;
import com.ufo.framework.common.model.Model;
@SuppressWarnings("serial")
@Entity
@DynamicUpdate(true)
@TableInfo(group = "附件管理", id = 9503, title = "附件文件类型")
public class _AdditionFileType extends BaseEntity{

	@Id
	@GeneratedValue(generator = "increment")
	@GenericGenerator(name = "increment", strategy = "increment")
	@FieldInfo(title = "ID号", hidden = true)
	private Integer tf_additionFileTypeId;

	@FieldInfo(title = "附件文件类型名称", uniqueField = true)
	@Column(length = 50, nullable = false)
	private String tf_name;

	@FieldInfo(title = "备注")
	private String tf_remark;

	public _AdditionFileType() {

	}

	public Integer getTf_additionFileTypeId() {
		return tf_additionFileTypeId;
	}

	public void setTf_additionFileTypeId(Integer tf_additionFileTypeId) {
		this.tf_additionFileTypeId = tf_additionFileTypeId;
	}

	public String getTf_name() {
		return tf_name;
	}

	public void setTf_name(String tf_name) {
		this.tf_name = tf_name;
	}

	public String getTf_remark() {
		return tf_remark;
	}

	public void setTf_remark(String tf_remark) {
		this.tf_remark = tf_remark;
	}

}
