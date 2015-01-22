package com.model.hibernate.property;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.GenericGenerator;

import com.ufo.framework.annotation.DDItemCode;
import com.ufo.framework.annotation.FieldInfo;
import com.ufo.framework.annotation.TableInfo;
import com.ufo.framework.common.model.BaseEntity;
@Entity
@DynamicUpdate(true)
@DynamicInsert(true)
@TableInfo(group = "抄表信息", id = 321, title = "公摊抄表")
public class PoollGtinfo extends BaseEntity {
	@Id
	@GeneratedValue(generator = "increment")
	@GenericGenerator(name = "increment", strategy = "increment")
	@FieldInfo(title = "ID号", number = 10, hidden = false)
	private int tf_poolid;
	@FieldInfo(title = "上个月度数", number = 20)
	private double tf_startnumber ;
	@FieldInfo(title = "本月度数", number = 30)
	private double tf_endnumber;
	@FieldInfo(title = "使用量", number =40)
    private  double tf_count;
	@FieldInfo(title = "系数", number =50)
	private double  tf_coefficient=1f; 
	@FieldInfo(title = "一手楼面积", number =60)
	private double   tf_areaCount;
	@Column(length=25,nullable=false)
	@FieldInfo(title = "抄表时间", number =70,uniqueField=true)
	private String tf_meterdate;
	@FieldInfo(title = "抄表人员", number =80)
	private String tf_mtermane;
	@ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
	@JoinColumn(name = "tf_insid",nullable=false)
	@FieldInfo(title = "公摊表", number =90)
	private InnstallBill tf_InnstallBill;
	@FieldInfo(title = "分摊金额", number =100)
	private double tf_Acount;
	///所属小区
	@ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
	@JoinColumn(name = "tf_viid",nullable=false)
	@FieldInfo(title = "所属小区", number =110)
	private Village tf_Village;
	@Column(length=5)
	@FieldInfo(title = "审核状态", number =120)
	private boolean   tf_state;
	@Column(length=500)
	@FieldInfo(title = "备注", number =130)
	private String  tf_remark;
	@Column(length=25,nullable=false)
	@FieldInfo(title = "抄表周期", number =140)
	private String tf_rendMonth;
	@Column(length=10,nullable=false)
	@FieldInfo(title = "种类", number =150)
	private String tf_mtype;
	public int getTf_poolid() {
		return tf_poolid;
	}
	public void setTf_poolid(int tf_poolid) {
		this.tf_poolid = tf_poolid;
	}
	public double getTf_startnumber() {
		return tf_startnumber;
	}
	public void setTf_startnumber(double tf_startnumber) {
		this.tf_startnumber = tf_startnumber;
	}
	public double getTf_endnumber() {
		return tf_endnumber;
	}
	public void setTf_endnumber(double tf_endnumber) {
		this.tf_endnumber = tf_endnumber;
	}

	public double getTf_count() {
		return tf_count;
	}
	public void setTf_count(double tf_count) {
		this.tf_count = tf_count;
	}
	public double getTf_coefficient() {
		return tf_coefficient;
	}
	public void setTf_coefficient(double tf_coefficient) {
		this.tf_coefficient = tf_coefficient;
	}
	public double getTf_areaCount() {
		return tf_areaCount;
	}
	public void setTf_areaCount(double tf_areaCount) {
		this.tf_areaCount = tf_areaCount;
	}
	public String getTf_meterdate() {
		return tf_meterdate;
	}
	public void setTf_meterdate(String tf_meterdate) {
		this.tf_meterdate = tf_meterdate;
	}
	public String getTf_mtermane() {
		return tf_mtermane;
	}
	public void setTf_mtermane(String tf_mtermane) {
		this.tf_mtermane = tf_mtermane;
	}
	public InnstallBill getTf_InnstallBill() {
		return tf_InnstallBill;
	}
	public void setTf_InnstallBill(InnstallBill tf_InnstallBill) {
		this.tf_InnstallBill = tf_InnstallBill;
	}
	public double getTf_Acount() {
		return tf_Acount;
	}
	public void setTf_Acount(double tf_Acount) {
		this.tf_Acount = tf_Acount;
	}
	public Village getTf_Village() {
		return tf_Village;
	}
	public void setTf_Village(Village tf_Village) {
		this.tf_Village = tf_Village;
	}
	public boolean isTf_state() {
		return tf_state;
	}
	public void setTf_state(boolean tf_state) {
		this.tf_state = tf_state;
	}
	public String getTf_remark() {
		return tf_remark;
	}
	public void setTf_remark(String tf_remark) {
		this.tf_remark = tf_remark;
	}
	public String getTf_rendMonth() {
		return tf_rendMonth;
	}
	public void setTf_rendMonth(String tf_rendMonth) {
		this.tf_rendMonth = tf_rendMonth;
	}
	public String getTf_mtype() {
		return tf_mtype;
	}
	public void setTf_mtype(String tf_mtype) {
		this.tf_mtype = tf_mtype;
	}
	
}
