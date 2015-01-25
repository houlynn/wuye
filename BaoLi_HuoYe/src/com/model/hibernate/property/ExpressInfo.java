package com.model.hibernate.property;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.GenericGenerator;

import com.ufo.framework.annotation.FieldInfo;
import com.ufo.framework.annotation.TableInfo;
import com.ufo.framework.common.core.ext.ExtFieldType;
import com.ufo.framework.common.model.BaseEntity;

@Entity
@DynamicUpdate(true)
@TableInfo(group = "快递收发", id = 305, title = "快递收发")
public class ExpressInfo extends BaseEntity {
	
	@Id
	@GeneratedValue(generator = "increment")
	@GenericGenerator(name = "increment", strategy = "increment")
	@FieldInfo(title = "ID号", number = 10, hidden = true,type=ExtFieldType.ID)
	private int tf_exprid;
	
	@Column(length=200,nullable=false)
	@FieldInfo(title = "房号", number =20)
	private String tf_roomNub;
	
	@Column(length=25,nullable=false)
	@FieldInfo(title = "发件人", number =30)
	private String tf_poponame;
	
	@Column(length=25,nullable=false)
	@FieldInfo(title = "手机号码", number =40)
	private String tf_phoneNuber;
	
	@Column(nullable=false)
	@FieldInfo(title = "物品数量", number =50)
	private  int tf_woucount;
	
	@Column(nullable=false)
	@FieldInfo(title = "提交时间", number =60)
	private String tf_postTime;
	@Column(nullable=false)
	@FieldInfo(title = "APP账户", number =70)
	private String tf_appUser;
	
	@Column(length=1000)
	@FieldInfo(title = "物品描述", number =80)
	private String tf_remark;
	
	@JsonIgnore
	@ManyToOne(optional=true,fetch=FetchType.LAZY)
	@JoinColumn(name="tf_viid",nullable=false)
	@FieldInfo(title = "小区", number = 70)
	private Village tf_village;
	@Column(length=10)
	@FieldInfo(title = "处理状态", number =10)
	private String tf_state;
	
	
	@Transient
	private String tf_vname;
	
	@Transient
	private int tf_vid;

	public int getTf_vid() {
		return tf_vid;
	}

	public void setTf_vid(int tf_vid) {
		this.tf_vid = tf_vid;
	}

	public int getTf_exprid() {
		return tf_exprid;
	}

	public void setTf_exprid(int tf_exprid) {
		this.tf_exprid = tf_exprid;
	}

	public String getTf_roomNub() {
		return tf_roomNub;
	}

	public void setTf_roomNub(String tf_roomNub) {
		this.tf_roomNub = tf_roomNub;
	}

	public String getTf_poponame() {
		return tf_poponame;
	}

	public void setTf_poponame(String tf_poponame) {
		this.tf_poponame = tf_poponame;
	}

	public String getTf_phoneNuber() {
		return tf_phoneNuber;
	}

	public void setTf_phoneNuber(String tf_phoneNuber) {
		this.tf_phoneNuber = tf_phoneNuber;
	}

	public int getTf_woucount() {
		return tf_woucount;
	}

	public void setTf_woucount(int tf_woucount) {
		this.tf_woucount = tf_woucount;
	}

	public String getTf_postTime() {
		return tf_postTime;
	}

	public void setTf_postTime(String tf_postTime) {
		this.tf_postTime = tf_postTime;
	}

	public String getTf_appUser() {
		return tf_appUser;
	}

	public void setTf_appUser(String tf_appUser) {
		this.tf_appUser = tf_appUser;
	}

	public String getTf_remark() {
		return tf_remark;
	}

	public void setTf_remark(String tf_remark) {
		this.tf_remark = tf_remark;
	}

	public Village getTf_village() {
		return tf_village;
	}

	public void setTf_village(Village tf_village) {
		this.tf_village = tf_village;
	}

	public String getTf_state() {
		return tf_state;
	}

	public void setTf_state(String tf_state) {
		this.tf_state = tf_state;
	}
	@Transient
	public String getTf_vname() {
		return tf_vname;
	}

	public void setTf_vname(String tf_vname) {
		this.tf_vname = tf_vname;
	}


	
	
	
}
