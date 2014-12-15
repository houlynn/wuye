package com.model.hibernate.property;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import com.ufo.framework.annotation.DDItemCode;
import com.ufo.framework.annotation.DDItemName;
import com.ufo.framework.annotation.FieldInfo;
import com.ufo.framework.annotation.NodeType;
import com.ufo.framework.annotation.TableInfo;
import com.ufo.framework.annotation.TreeItemName;
import com.ufo.framework.annotation.TreeItemValue;
import com.ufo.framework.common.core.ext.ExtFieldType;
import com.ufo.framework.common.core.ext.TreeNodeType;
import com.ufo.framework.common.model.BaseEntity;
/**
 * 小区信息
 *
* @author HouLynn
* @date 2014年11月19日
  @version 1.0
 */
@Entity
@DynamicUpdate(true)
@DynamicInsert(true)
@TableInfo(group = "基础信息模块", id = 102, title = "小区信息")
public class Village extends BaseEntity {
	
	
	@TreeItemValue
	@DDItemCode
	@Id
	@GeneratedValue(generator = "increment")
	@GenericGenerator(name = "increment", strategy = "increment")
	@FieldInfo(title = "ID号", number = 10, hidden = true)
	private int tf_viid;
	@DDItemName
	@Column(length=300)
	@TreeItemName
	@FieldInfo(title="小区名称",number=20,uniqueField=true)
	private String  tf_name;
	@Type(type="text")  
	@FieldInfo(title = "简介",number=30)
	private String tf_summary;
	@Type(type="text")  
	@FieldInfo(title = "小区介绍",number=40)
	private String tf_introduce;
	
	/////////////////////////////////////////////////////
	@FieldInfo(title = "省份",number=50)
	@Column(length=50)
	private String tf_province;
	@FieldInfo(title = "城市",number=60)
	@Column(length=50)
	private String tf_city;
	@FieldInfo(title = "县城",number=70)
	@Column(length=50)
	private String tf_county;
	@FieldInfo(title = "经度纬度",number=80)
	@Column(length=30)
	private String tf_locationxy;
	@Column(length=500)
	@FieldInfo(title = "详细地址",number=90)
	private String tf_location;
	//////////////////////////////////////////////////////
	@Column(length=50)
	@FieldInfo(title = "楼盘编号",number=100)
	private String tf_propertyCode;
	@Column(length=50)
	@FieldInfo(title = "预售证号",number=120)
	private String tf_salesCode;
	@FieldInfo(title = "占地面积",number=130)
	private float tf_covering ;
	@FieldInfo(title = "绿化面积",number=140)
	private float tf_greenarea;
	@FieldInfo(title = "接盘时间",number=150)
	private Date  tf_sales;
	public int getTf_viid() {
		return tf_viid;
	}
	public void setTf_viid(int tf_viid) {
		this.tf_viid = tf_viid;
	}
	public String getTf_name() {
		return tf_name;
	}
	public void setTf_name(String tf_name) {
		this.tf_name = tf_name;
	}
	public String getTf_summary() {
		return tf_summary;
	}
	public void setTf_summary(String tf_summary) {
		this.tf_summary = tf_summary;
	}
	public String getTf_introduce() {
		return tf_introduce;
	}
	public void setTf_introduce(String tf_introduce) {
		this.tf_introduce = tf_introduce;
	}
	public String getTf_province() {
		return tf_province;
	}
	public void setTf_province(String tf_province) {
		this.tf_province = tf_province;
	}
	public String getTf_city() {
		return tf_city;
	}
	public void setTf_city(String tf_city) {
		this.tf_city = tf_city;
	}
	public String getTf_county() {
		return tf_county;
	}
	public void setTf_county(String tf_county) {
		this.tf_county = tf_county;
	}
	public String getTf_locationxy() {
		return tf_locationxy;
	}
	public void setTf_locationxy(String tf_locationxy) {
		this.tf_locationxy = tf_locationxy;
	}
	public String getTf_location() {
		return tf_location;
	}
	public void setTf_location(String tf_location) {
		this.tf_location = tf_location;
	}
	public String getTf_propertyCode() {
		return tf_propertyCode;
	}
	public void setTf_propertyCode(String tf_propertyCode) {
		this.tf_propertyCode = tf_propertyCode;
	}
	public String getTf_salesCode() {
		return tf_salesCode;
	}
	public void setTf_salesCode(String tf_salesCode) {
		this.tf_salesCode = tf_salesCode;
	}
	public float getTf_covering() {
		return tf_covering;
	}
	public void setTf_covering(float tf_covering) {
		this.tf_covering = tf_covering;
	}
	public float getTf_greenarea() {
		return tf_greenarea;
	}
	public void setTf_greenarea(float tf_greenarea) {
		this.tf_greenarea = tf_greenarea;
	}
	public Date getTf_sales() {
		return tf_sales;
	}
	public void setTf_sales(Date tf_sales) {
		this.tf_sales = tf_sales;
	}
	

	

}
