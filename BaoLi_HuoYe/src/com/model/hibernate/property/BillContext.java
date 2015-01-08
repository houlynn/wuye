package com.model.hibernate.property;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.GenericGenerator;

import com.model.hibernate.system.shared.EndUser;
import com.ufo.framework.annotation.FieldInfo;
import com.ufo.framework.annotation.TableInfo;
import com.ufo.framework.common.model.BaseEntity;

@DynamicInsert(value=true)
@DynamicUpdate(value=true)
@Entity
@TableInfo(group = "收费管理", id = 300, title = "客户主表单")
public class BillContext extends BaseEntity {
	@Id
	@GeneratedValue(generator = "increment")
	@GenericGenerator(name = "increment", strategy = "increment")
	@FieldInfo(title = "ID号", number = 10, hidden = true)
	private int tf_billid;
	@JsonIgnore
	@ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
	@JoinColumn(name = "tf_residentId",nullable=false)
	@FieldInfo(title = "业主", number =20)
	private ResidentInfo tf_ResidentInfo;
	@FieldInfo(title = "收费日期", number =30)
	private String tf_month;
	@FieldInfo(title = "实收金额", number =40)
	private double tf_realACount;
	@FieldInfo(title = "应收金额", number =50)
	private double tf_shouldCount;
	@FieldInfo(title = "备注", number =60)
	private String tf_remark;
	@JsonIgnore
	@ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
	@JoinColumn(name = "userId")
	@FieldInfo(title = "收费人员", number =70)
	private EndUser tf_EndUser;
	@FieldInfo(title = "收费时间", number =80)
	private String  tf_feesTime;
	@Column(length=5)
	private String  tf_isAppPay;
	@Column(length=50)
	private String tf_appUser;
	
	public int getTf_billid() {
		return tf_billid;
	}
	public void setTf_billid(int tf_billid) {
		this.tf_billid = tf_billid;
	}
	public ResidentInfo getTf_ResidentInfo() {
		return tf_ResidentInfo;
	}
	public void setTf_ResidentInfo(ResidentInfo tf_ResidentInfo) {
		this.tf_ResidentInfo = tf_ResidentInfo;
	}
	public String getTf_month() {
		return tf_month;
	}
	public void setTf_month(String tf_month) {
		this.tf_month = tf_month;
	}
	public double getTf_realACount() {
		return tf_realACount;
	}
	public void setTf_realACount(double tf_realACount) {
		this.tf_realACount = tf_realACount;
	}
	public double getTf_shouldCount() {
		return tf_shouldCount;
	}
	public void setTf_shouldCount(double tf_shouldCount) {
		this.tf_shouldCount = tf_shouldCount;
	}
	public String getTf_remark() {
		return tf_remark;
	}
	public void setTf_remark(String tf_remark) {
		this.tf_remark = tf_remark;
	}
	public EndUser getTf_EndUser() {
		return tf_EndUser;
	}
	public void setTf_EndUser(EndUser tf_EndUser) {
		this.tf_EndUser = tf_EndUser;
	}
	public String getTf_feesTime() {
		return tf_feesTime;
	}
	public void setTf_feesTime(String tf_feesTime) {
		this.tf_feesTime = tf_feesTime;
	}
	public String getTf_isAppPay() {
		return tf_isAppPay;
	}
	public void setTf_isAppPay(String tf_isAppPay) {
		this.tf_isAppPay = tf_isAppPay;
	}
	public String getTf_appUser() {
		return tf_appUser;
	}
	public void setTf_appUser(String tf_appUser) {
		this.tf_appUser = tf_appUser;
	}
}
