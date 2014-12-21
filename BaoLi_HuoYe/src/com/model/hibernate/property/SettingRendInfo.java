package com.model.hibernate.property;

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

import com.ufo.framework.annotation.FieldInfo;
import com.ufo.framework.common.model.BaseEntity;

/**
 * 
 * 结束抄表信息 以栋为单位
 *
 */
@DynamicUpdate(true)
@DynamicInsert(true)
@Entity
public class SettingRendInfo extends BaseEntity {
	
	@Id
	@GeneratedValue(generator = "increment")
	@GenericGenerator(name = "increment", strategy = "increment")
	@FieldInfo(title = "ID号", number = 10, hidden = false)
	private int tf_rid;
	@Column(nullable=false)
	private String tf_rendDate;
	@Column(nullable=false)
	private String tf_mtype;
	@ManyToOne(optional=true,fetch=FetchType.LAZY)
	@JoinColumn(name="tf_leveId",nullable=false)
	@FieldInfo(title = "楼宇", number = 30)
	private LevelInfo tf_LevelInfo;
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
	public LevelInfo getTf_LevelInfo() {
		return tf_LevelInfo;
	}
	public void setTf_LevelInfo(LevelInfo tf_LevelInfo) {
		this.tf_LevelInfo = tf_LevelInfo;
	}
	
}
