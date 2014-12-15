package com.model.hibernate.system;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.GenericGenerator;

import com.ufo.framework.annotation.FieldInfo;
import com.ufo.framework.annotation.TableInfo;

@Entity
@Table(name="sys_SystemInfo")
@JsonSerialize(include = JsonSerialize.Inclusion.NON_EMPTY)
@DynamicInsert(true)
@DynamicUpdate(true)
@TableInfo(group = "系统模块", id = 9912, title = "系统基本信息")
@SuppressWarnings("serial")
//这是系统总体情况的设置，也是放在数据库里的，可以进行修改
public class SystemInfo implements Serializable {
	
	@Id
	@GeneratedValue(generator = "increment")
	@GenericGenerator(name = "increment", strategy = "increment")
	@FieldInfo(title = "ID号", number = 10, hidden = true)
	@Column(length=10)
	private String ft_systemInfoId;
	@Column(nullable = false, length = 50, updatable = false)
	private String tf_systemName; // 系统名称
	@Column(nullable = false, length = 50)
	private String tf_systemVersion; // 版本号
	private String tf_systemAddition;// 附加设置

	public SystemInfo() {

	}

	public String getTf_systemName() {
		return tf_systemName;
	}

	public void setTf_systemName(String tf_systemName) {
		this.tf_systemName = tf_systemName;
	}

	public String getTf_systemVersion() {
		return tf_systemVersion;
	}

	public void setTf_systemVersion(String tf_systemVersion) {
		this.tf_systemVersion = tf_systemVersion;
	}

	public String getTf_systemAddition() {
		return tf_systemAddition;
	}

	public void setTf_systemAddition(String tf_systemAddition) {
		this.tf_systemAddition = tf_systemAddition;
	}

}