package com.model.hibernate.superclass;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

import com.ufo.framework.annotation.FieldInfo;

/**
 * 录入人员信息的类，继续自此类的，都需要录入人员和录入日期的信息
 *
* @author HouLynn
* @date 2014年10月21日
  @version 1.0
 */
@MappedSuperclass
public abstract class _InputInfoAbstract  {

	public static final String INPUTMEN = "tf_inputmen";
	public static final String INPUTDATE = "tf_inputdate";

	@FieldInfo(title = "录入人员", number = 9000)
	@Column(length = 10, nullable = false, updatable = false)
	protected String tf_inputmen;

	@FieldInfo(title = "录入日期", number = 9010)
	@Column(nullable = false, updatable = false)
	protected Date tf_inputdate;

	public String getTf_inputmen() {
		return tf_inputmen;
	}

	public void setTf_inputmen(String tf_inputmen) {
		this.tf_inputmen = tf_inputmen;
	}

	public Date getTf_inputdate() {
		return tf_inputdate;
	}

	public void setTf_inputdate(Date tf_inputdate) {
		this.tf_inputdate = tf_inputdate;
	}

}
