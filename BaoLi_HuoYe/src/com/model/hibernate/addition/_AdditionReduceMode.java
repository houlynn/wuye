package com.model.hibernate.addition;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import org.hibernate.annotations.DynamicUpdate;
import com.ufo.framework.annotation.FieldInfo;
import com.ufo.framework.annotation.TableInfo;

@Entity
@DynamicUpdate(true)
@TableInfo(group = "附件管理", id = 9504, title = "图片压缩模式")
public class _AdditionReduceMode {

	@Id
	@FieldInfo(title = "序号", number = 10)
	@Column(nullable = false, length = 2)
	private Integer tf_reduceModeId;

	@FieldInfo(title = "图片压缩模式", number = 20,  uniqueField= true)
	@Column(nullable = false, unique = true, length = 50)
	private String tf_name;

	@FieldInfo(title = "长宽最大像素", number = 30)
	private Integer tf_maxValue;

	@FieldInfo(title = "缩小比例", number = 40)
	private Integer tf_recudeTo;

	@FieldInfo(title = "备注", number = 90)
	private String tf_remark;

  public _AdditionReduceMode(){
  	
  }

	public Integer getTf_reduceModeId() {
		return tf_reduceModeId;
	}

	public void setTf_reduceModeId(Integer tf_reduceModeId) {
		this.tf_reduceModeId = tf_reduceModeId;
	}

	public String getTf_name() {
		return tf_name;
	}

	public void setTf_name(String tf_name) {
		this.tf_name = tf_name;
	}

	public Integer getTf_maxValue() {
		return tf_maxValue;
	}

	public void setTf_maxValue(Integer tf_maxValue) {
		this.tf_maxValue = tf_maxValue;
	}

	public Integer getTf_recudeTo() {
		return tf_recudeTo;
	}

	public void setTf_recudeTo(Integer tf_recudeTo) {
		this.tf_recudeTo = tf_recudeTo;
	}

	public String getTf_remark() {
		return tf_remark;
	}

	public void setTf_remark(String tf_remark) {
		this.tf_remark = tf_remark;
	}
	
}
