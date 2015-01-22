package com.model.hibernate.property;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.ufo.framework.annotation.FieldInfo;
import com.ufo.framework.common.model.BaseEntity;

public class PoollGtinfo extends BaseEntity {

	private int tf_poolid;
	
	///所属小区
	@ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
	@JoinColumn(name = "tf_viid")
	@FieldInfo(title = "所属小区", number =60)
	private Village tf_Village;
	
	@FieldInfo(title = "系数", number =60)
	private float  tf_coefficient=1f; 
	
	@ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
	@JoinColumn(name = "tf_viid",nullable=false)
	@FieldInfo(title = "公摊表", number =60)
	private InnstallBill tf_InnstallBill;
	
	@FieldInfo(title = "", number =60)
	private float   tf_areaCount;
	@Column(length=10)
	@FieldInfo(title = "审核状态", number =50)
	private String  tf_state;
	
	
	
	
}
