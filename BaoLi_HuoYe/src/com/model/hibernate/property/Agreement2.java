package com.model.hibernate.property;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.GenericGenerator;

import com.ufo.framework.annotation.FieldInfo;
import com.ufo.framework.annotation.TableInfo;
import com.ufo.framework.common.model.Model;

/**
 * 一个用于演示单个模块所有自定义属性的类
 * 
 * @author jfok
 * 
 *         2014.10.16
 * 
 */

@SuppressWarnings("serial")
@Entity
@DynamicUpdate(true)
@TableInfo(group = "合同管理", id = 2011, title = "销售合同")
public class Agreement2 implements Model {

	@Id
	@GeneratedValue(generator = "increment")
	@GenericGenerator(name = "increment", strategy = "increment")
	@FieldInfo(title = "ID号", number = 10, hidden = true)
	private Integer tf_agreementId;

	@FieldInfo(title = "合同编码", number = 20)
	@Column(nullable = false, length = 20)
	private String tf_code;

	// 这个字段是这个模块的namefields字段，在删除等操作时会提示显示这个字段的信息
	@FieldInfo(title = "合同名称", uniqueField = true, number = 30)
	@Column(length = 50, nullable = false)
	private String tf_name;

	// 因为是一个独白模块，没有做相应的客户单位，产品名称的表来关联
	@FieldInfo(title = "客户单位名称", number = 40)
	@Column(length = 50, nullable = false)
	private String tf_customerNme;




	public Agreement2() {

	}

	public Integer getTf_agreementId() {
		return tf_agreementId;
	}

	public void setTf_agreementId(Integer tf_agreementId) {
		this.tf_agreementId = tf_agreementId;
	}

	public String getTf_code() {
		return tf_code;
	}

	public void setTf_code(String tf_code) {
		this.tf_code = tf_code;
	}

	public String getTf_name() {
		return tf_name;
	}

	public void setTf_name(String tf_name) {
		this.tf_name = tf_name;
	}

	public String getTf_customerNme() {
		return tf_customerNme;
	}

	public void setTf_customerNme(String tf_customerNme) {
		this.tf_customerNme = tf_customerNme;
	}




//getter and setter

}