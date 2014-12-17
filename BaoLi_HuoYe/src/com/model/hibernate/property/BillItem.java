package com.model.hibernate.property;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.GenericGenerator;

import com.ufo.framework.annotation.FieldInfo;
import com.ufo.framework.annotation.TableInfo;
import com.ufo.framework.common.model.BaseEntity;

@Entity
@DynamicUpdate(true)
@DynamicInsert(true)
@TableInfo(group = "收费管理", id = 301, title = "收费明细")
public class BillItem extends BaseEntity {
	@Id
	@GeneratedValue(generator = "increment")
	@GenericGenerator(name = "increment", strategy = "increment")
	@FieldInfo(title = "ID号", number = 10, hidden = true)
	private int tf_billitemid;
	
	@ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
	@JoinColumn(name = "tf_feesid",nullable=false)
	@FieldInfo(title = "收费标准", number =20)
	private FeesInfo tf_FeesInfo;
	@ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
	@JoinColumn(name = "tf_MeterId",nullable=false)
	@FieldInfo(title = "收费标准", number =30)
	private MeterInfo tf_MeterInfo;
	@Column(length=25,nullable=false)
	@FieldInfo(title = "收费状态", number =40)
	private String tf_state;
	
/*	@Transient
	private String tf_feesType;
	@Transient
	private String tf_startDate;
	@Transient
	private String tf_endDate;
	@Transient
	private String tf_feesName;
	@Transient
	private String tf_price;
	@Transient
	private String tf_startNuber;
	@Transient
	private String tf_endNuber;*/
	
	public int getTf_billitemid() {
		return tf_billitemid;
	}
	public void setTf_billitemid(int tf_billitemid) {
		this.tf_billitemid = tf_billitemid;
	}
	public FeesInfo getTf_FeesInfo() {
		return tf_FeesInfo;
	}
	public void setTf_FeesInfo(FeesInfo tf_FeesInfo) {
		this.tf_FeesInfo = tf_FeesInfo;
	}
	public MeterInfo getTf_MeterInfo() {
		return tf_MeterInfo;
	}
	public void setTf_MeterInfo(MeterInfo tf_MeterInfo) {
		this.tf_MeterInfo = tf_MeterInfo;
	}
	public String getTf_state() {
		return tf_state;
	}
	public void setTf_state(String tf_state) {
		this.tf_state = tf_state;
	}
/*	public String getTf_feesType() {
		return tf_feesType;
	}
	public void setTf_feesType(String tf_feesType) {
		this.tf_feesType = tf_feesType;
	}
	public String getTf_startDate() {
		return tf_startDate;
	}
	public void setTf_startDate(String tf_startDate) {
		this.tf_startDate = tf_startDate;
	}
	public String getTf_endDate() {
		return tf_endDate;
	}
	public void setTf_endDate(String tf_endDate) {
		this.tf_endDate = tf_endDate;
	}
	public String getTf_feesName() {
		return tf_feesName;
	}
	public void setTf_feesName(String tf_feesName) {
		this.tf_feesName = tf_feesName;
	}
	public String getTf_price() {
		return tf_price;
	}
	public void setTf_price(String tf_price) {
		this.tf_price = tf_price;
	}
	public String getTf_startNuber() {
		return tf_startNuber;
	}
	public void setTf_startNuber(String tf_startNuber) {
		this.tf_startNuber = tf_startNuber;
	}
	public String getTf_endNuber() {
		return tf_endNuber;
	}
	public void setTf_endNuber(String tf_endNuber) {
		this.tf_endNuber = tf_endNuber;
	}*/

	

}
