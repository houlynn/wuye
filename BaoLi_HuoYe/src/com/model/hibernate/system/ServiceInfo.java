package com.model.hibernate.system;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import com.ufo.framework.annotation.TableInfo;

@Entity
@Table(name="sys_ServiceInfo")
@JsonSerialize(include = JsonSerialize.Inclusion.NON_EMPTY)
@DynamicInsert(true)
@DynamicUpdate(true)
@TableInfo(group = "系统模块", id = 9911, title = "使用单位信息")
@SuppressWarnings("serial")
// 这是服务单位情况的设置，也是放在数据库里的，可以进行修改
public class ServiceInfo implements Serializable {

	@Id
	@Column(nullable = false, length = 10)
	private String tf_serviceId;
	@Column(nullable = false, length = 80)
	private String tf_serviceDepartment;// 服务单位
	@Column(nullable = false, length = 50)
	private String tf_serviceMen;// 服务人员
	@Column(nullable = false, length = 50)
	private String tf_serviceTelnumber;// 联系电话
	@Column(nullable = false, length = 50)
	private String tf_serviceFaxnumber;// 传真
	@Column(nullable = false, length = 50)
	private String tf_serviceEmail;// 电子邮件
	@Column(nullable = false, length = 50)
	private String tf_serviceHomepage;// 主页
	@Column(nullable = false, length = 50)
	private String tf_serviceQQ;// ＱＱ号
	@Column(nullable = false, length = 50)
	private String tf_copyrightOwner;// 版权所有单位
	@Column(nullable = false, length = 250)
	private String tf_copyrightInfo;// 版权信息
	public ServiceInfo() {

	}
	public String getTf_serviceId() {
		return tf_serviceId;
	}

	public void setTf_serviceId(String tf_serviceId) {
		this.tf_serviceId = tf_serviceId;
	}

	public String getTf_serviceDepartment() {
		return tf_serviceDepartment;
	}

	public void setTf_serviceDepartment(String tf_serviceDepartment) {
		this.tf_serviceDepartment = tf_serviceDepartment;
	}

	public String getTf_serviceMen() {
		return tf_serviceMen;
	}

	public void setTf_serviceMen(String tf_serviceMen) {
		this.tf_serviceMen = tf_serviceMen;
	}

	public String getTf_serviceTelnumber() {
		return tf_serviceTelnumber;
	}

	public void setTf_serviceTelnumber(String tf_serviceTelnumber) {
		this.tf_serviceTelnumber = tf_serviceTelnumber;
	}

	public String getTf_serviceFaxnumber() {
		return tf_serviceFaxnumber;
	}

	public void setTf_serviceFaxnumber(String tf_serviceFaxnumber) {
		this.tf_serviceFaxnumber = tf_serviceFaxnumber;
	}

	public String getTf_serviceEmail() {
		return tf_serviceEmail;
	}

	public void setTf_serviceEmail(String tf_serviceEmail) {
		this.tf_serviceEmail = tf_serviceEmail;
	}

	public String getTf_serviceHomepage() {
		return tf_serviceHomepage;
	}

	public void setTf_serviceHomepage(String tf_serviceHomepage) {
		this.tf_serviceHomepage = tf_serviceHomepage;
	}

	public String getTf_serviceQQ() {
		return tf_serviceQQ;
	}

	public void setTf_serviceQQ(String tf_serviceQQ) {
		this.tf_serviceQQ = tf_serviceQQ;
	}

	public String getTf_copyrightOwner() {
		return tf_copyrightOwner;
	}

	public void setTf_copyrightOwner(String tf_copyrightOwner) {
		this.tf_copyrightOwner = tf_copyrightOwner;
	}

	public String getTf_copyrightInfo() {
		return tf_copyrightInfo;
	}

	public void setTf_copyrightInfo(String tf_copyrightInfo) {
		this.tf_copyrightInfo = tf_copyrightInfo;
	}

}