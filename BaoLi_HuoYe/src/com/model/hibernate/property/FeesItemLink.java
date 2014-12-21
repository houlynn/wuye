package com.model.hibernate.property;

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

import com.ufo.framework.annotation.FieldInfo;
import com.ufo.framework.common.model.BaseEntity;

@DynamicInsert(value=true)
@DynamicUpdate(value=true)
@Entity
public class FeesItemLink extends BaseEntity {
	
	public static final String FESS_WATER="B001";
	public static final String FESS_POER="B002";
	public static final String FESS_COAL="B003";
	@Id
	@GeneratedValue(generator = "increment")
	@GenericGenerator(name = "increment", strategy = "increment")
	@FieldInfo(title = "ID号", number = 10, hidden = true)
	private Integer tf_itemLinkid;
	@JsonIgnore
	@ManyToOne(optional=true,fetch=FetchType.LAZY)
	@JoinColumn(name="tf_viid")
	@FieldInfo(title = "小区", number = 30)
	private Village tf_Village;
	@Column(length=10)
	private String tf_type;
	@ManyToOne(optional=true,fetch=FetchType.LAZY)
	@JoinColumn(name="tf_feesid",nullable=false)
	@FieldInfo(title = "收费标准", number = 30)
	private FeesInfo tf_FeesInfo;

	public Integer getTf_itemLinkid() {
		return tf_itemLinkid;
	}

	public void setTf_itemLinkid(Integer tf_itemLinkid) {
		this.tf_itemLinkid = tf_itemLinkid;
	}

	public Village getTf_Village() {
		return tf_Village;
	}

	public void setTf_Village(Village tf_Village) {
		this.tf_Village = tf_Village;
	}

	public String getTf_type() {
		return tf_type;
	}

	public void setTf_type(String tf_type) {
		this.tf_type = tf_type;
	}


	public void setTf_FeesInfo(FeesInfo tf_FeesInfo) {
		this.tf_FeesInfo = tf_FeesInfo;
	}

	public FeesInfo getTf_FeesInfo() {
		return tf_FeesInfo;
	}

}
