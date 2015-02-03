package com.model.hibernate.property;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.GenericGenerator;

import com.ufo.framework.common.model.BaseEntity;

@Entity
@DynamicUpdate(true)
@DynamicInsert(true)
public class GtbillToLevf extends BaseEntity {
	
	@Id
	@GeneratedValue(generator = "increment")
	@GenericGenerator(name = "increment", strategy = "increment")
	private int tf_id;
	@Column(nullable=false)
	private Integer tf_insid;
	@Column(nullable=false)
	private Integer tf_Leveid;
	public int getTf_id() {
		return tf_id;
	}
	public void setTf_id(int tf_id) {
		this.tf_id = tf_id;
	}
	public Integer getTf_insid() {
		return tf_insid;
	}
	public void setTf_insid(Integer tf_insid) {
		this.tf_insid = tf_insid;
	}
	public Integer getTf_Leveid() {
		return tf_Leveid;
	}
	public void setTf_Leveid(Integer tf_Leveid) {
		this.tf_Leveid = tf_Leveid;
	}

}
