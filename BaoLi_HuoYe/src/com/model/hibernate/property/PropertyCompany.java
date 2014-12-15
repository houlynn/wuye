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

import com.model.hibernate.system.shared.EndUser;
import com.ufo.framework.annotation.FieldInfo;
import com.ufo.framework.annotation.TableInfo;
import com.ufo.framework.annotation.TreeItemName;
import com.ufo.framework.annotation.TreeItemValue;
import com.ufo.framework.common.core.ext.ExtFieldType;
import com.ufo.framework.common.model.BaseEntity;
@Entity
@DynamicInsert(true)
@DynamicUpdate(true)
@TableInfo(group = "基础信息模块", id =101, title = "物业公司信息管理", shortname = "物业公司信息")
public class PropertyCompany extends BaseEntity {
	@Id
	@GeneratedValue(generator = "increment")
	@GenericGenerator(name = "increment", strategy = "increment")
	@FieldInfo(name = "ID号", number = 10, hidden = true,type=ExtFieldType.ID)
	@TreeItemValue
	private int tf_proid;
	@Column(length = 200, nullable = false)
	@FieldInfo(name="物业公司名称",nullAble=false,visible=true)
	@TreeItemName
	private String tf_name;
	@Column(length = 50)
	@FieldInfo(name="法人代表",visible=true)
	private String tf_corporate;
	@Column(length = 50)
	@FieldInfo(name="联系人",visible=true)
	private String tf_contact;
	@Column(length = 50)
	@FieldInfo(name="联系电话",visible=true)
	private String  tf_phone;
	@Column(length = 500)
	@FieldInfo(name="联系地址",visible=true)
	private String tf_address;
	@ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
	@JoinColumn(name = "tf_enduser")
	private EndUser endUser;

	public int getTf_proid() {
		return tf_proid;
	}

	public void setTf_proid(int tf_proid) {
		this.tf_proid = tf_proid;
	}

	public String getTf_name() {
		return tf_name;
	}

	public void setTf_name(String tf_name) {
		this.tf_name = tf_name;
	}

	public String getTf_corporate() {
		return tf_corporate;
	}

	public void setTf_corporate(String tf_corporate) {
		this.tf_corporate = tf_corporate;
	}

	public String getTf_contact() {
		return tf_contact;
	}

	public void setTf_contact(String tf_contact) {
		this.tf_contact = tf_contact;
	}

	public String getTf_phone() {
		return tf_phone;
	}

	public void setTf_phone(String tf_phone) {
		this.tf_phone = tf_phone;
	}

	public String getTf_address() {
		return tf_address;
	}

	public void setTf_address(String tf_address) {
		this.tf_address = tf_address;
	}
	public EndUser getEndUser() {
		return endUser;
	}

	public void setEndUser(EndUser endUser) {
		this.endUser = endUser;
	}


}
