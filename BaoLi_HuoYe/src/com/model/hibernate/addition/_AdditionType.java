package com.model.hibernate.addition;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import org.hibernate.annotations.DynamicUpdate;
import com.ufo.framework.annotation.FieldInfo;
import com.ufo.framework.annotation.TableInfo;

@SuppressWarnings("serial")
@Entity
@DynamicUpdate(true)
@TableInfo(group = "附件管理", id = 9502, title = "附件类型")
public class _AdditionType implements Serializable {

	@Id
//	@GeneratedValue(generator = "increment")
//	@GenericGenerator(name = "increment", strategy = "increment")
	@FieldInfo(title = "编码", number = 10)
	@Column(length = 10 , nullable = false)
	private String tf_additionTypeId;

	@FieldInfo(title = "附件类型名称", uniqueField = true)
	@Column(length = 50, nullable = false)
	private String tf_name;

	@FieldInfo(title = "备注")
	private String tf_remark;

	public _AdditionType() {

	}

	public String getTf_additionTypeId() {
		return tf_additionTypeId;
	}

	public void setTf_additionTypeId(String tf_additionTypeId) {
		this.tf_additionTypeId = tf_additionTypeId;
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
