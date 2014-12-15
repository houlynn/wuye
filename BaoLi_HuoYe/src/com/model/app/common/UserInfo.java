package com.model.app.common;

import java.io.Serializable;
import java.util.Date;

@SuppressWarnings("serial")
//这是用户单位和登录用户的信息
public class UserInfo implements Serializable {

	private String tf_userdwmc;// 使用单位名称
	private Date tf_userStartdate;// 开始使用时间
	private Integer tf_userId;// 用户id
	private String tf_loginName;// 用户登录名
	private String tf_userName;// 用户姓名
	private String tf_departmentId = null;// 用户部门id
	private String tf_departmentName = null;// 用户部门名称

	public UserInfo() {

	}

	public String getTf_userdwmc() {
		return tf_userdwmc;
	}

	public void setTf_userdwmc(String tf_userdwmc) {
		this.tf_userdwmc = tf_userdwmc;
	}

	public Date getTf_userStartdate() {
		return tf_userStartdate;
	}

	public void setTf_userStartdate(Date tf_userStartdate) {
		this.tf_userStartdate = tf_userStartdate;
	}

	public Integer getTf_userId() {
		return tf_userId;
	}

	public void setTf_userId(Integer tf_userId) {
		this.tf_userId = tf_userId;
	}

	public String getTf_loginName() {
		return tf_loginName;
	}

	public void setTf_loginName(String tf_loginName) {
		this.tf_loginName = tf_loginName;
	}

	public String getTf_userName() {
		return tf_userName;
	}

	public void setTf_userName(String tf_userName) {
		this.tf_userName = tf_userName;
	}

	public String getTf_departmentId() {
		return tf_departmentId;
	}

	public void setTf_departmentId(String tf_departmentId) {
		this.tf_departmentId = tf_departmentId;
	}

	public String getTf_departmentName() {
		return tf_departmentName;
	}

	public void setTf_departmentName(String tf_departmentName) {
		this.tf_departmentName = tf_departmentName;
	}

}
