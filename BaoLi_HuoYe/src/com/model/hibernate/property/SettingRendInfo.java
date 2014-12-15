package com.model.hibernate.property;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.GenericGenerator;

import com.ufo.framework.annotation.FieldInfo;
import com.ufo.framework.common.model.BaseEntity;

@DynamicUpdate(true)
@DynamicInsert(true)
@Entity
public class SettingRendInfo extends BaseEntity {
	
	@Id
	@GeneratedValue(generator = "increment")
	@GenericGenerator(name = "increment", strategy = "increment")
	@FieldInfo(title = "ID号", number = 10, hidden = false)
	private int tf_rid;
	@Column(nullable=false,unique=true)
	private String tf_rendDate;
	@Column(nullable=false)
	private String tf_mtype;
	public int getTf_rid() {
		return tf_rid;
	}
	public void setTf_rid(int tf_rid) {
		this.tf_rid = tf_rid;
	}
	public String getTf_rendDate() {
		return tf_rendDate;
	}
	public void setTf_rendDate(String tf_rendDate) {
		this.tf_rendDate = tf_rendDate;
	}
	public String getTf_mtype() {
		return tf_mtype;
	}
	public void setTf_mtype(String tf_mtype) {
		this.tf_mtype = tf_mtype;
	}
}
