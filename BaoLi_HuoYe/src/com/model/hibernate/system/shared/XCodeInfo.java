package com.model.hibernate.system.shared;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import com.model.hibernate.property.PropertyCompany;


@Entity
@GenericGenerator(name="systemUUID",strategy="uuid")
public class XCodeInfo {
	private String  tf_codeId;
	private String tf_createTime;
	private  PropertyCompany tf_propertyCompany;
	
	@Id
	@GeneratedValue(generator="systemUUID")
	@Column(length=50)
	public String getTf_codeId() {
		return tf_codeId;
	}
	public void setTf_codeId(String tf_codeId) {
		this.tf_codeId = tf_codeId;
	}
	
	@JsonIgnore //构建json数据的时候排除此字段
	@ManyToOne(optional=false, fetch=FetchType.LAZY, cascade={CascadeType.MERGE})
	@JoinColumn(name="tf_proid",nullable=false)
	@LazyCollection(LazyCollectionOption.TRUE)
	public PropertyCompany getTf_propertyCompany() {
		return tf_propertyCompany;
	}
	public void setTf_propertyCompany(PropertyCompany tf_propertyCompany) {
		this.tf_propertyCompany = tf_propertyCompany;
	}
	public String getTf_createTime() {
		return tf_createTime;
	}
	public void setTf_createTime(String tf_createTime) {
		this.tf_createTime = tf_createTime;
	}

	@Transient
	public String getXcode(){
		return this.getTf_codeId()+this.getTf_propertyCompany().getTf_proid();
	}
	
}
