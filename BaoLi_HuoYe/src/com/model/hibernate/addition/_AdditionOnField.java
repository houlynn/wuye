package com.model.hibernate.addition;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import org.hibernate.annotations.DynamicUpdate;

import com.ufo.framework.annotation.FieldInfo;
import com.ufo.framework.annotation.TableInfo;
import com.ufo.framework.common.model.BaseEntity;
import com.ufo.framework.common.model.Model;
@SuppressWarnings("serial")
@Entity
@DynamicUpdate(true)
@TableInfo(group = "附件管理", id = 9506, title = "附件对应字段")
public class _AdditionOnField extends BaseEntity {
	@Id
	@FieldInfo(title = "ID号", number = 10)
	@Column(nullable = false)
	private Integer tf_fieldId;

	@FieldInfo(title = "字段内容", number = 20, uniqueField = true)
	@Column(length = 50)
	private String tf_title;

	@FieldInfo(title = "字段名", number = 30)
	@Column(length = 50)
	private String tf_fieldName;

	public _AdditionOnField() {

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

	public void setTf_fieldName(String tf_fieldName) {
		this.tf_fieldName = tf_fieldName;
	}

}
