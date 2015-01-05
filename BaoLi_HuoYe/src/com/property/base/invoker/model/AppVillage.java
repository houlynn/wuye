package com.property.base.invoker.model;
import java.io.Serializable;
import java.util.Date;
public class AppVillage implements Serializable {
	/**
	 * ID号
	 */
	private int tf_viid;
	/**
	 * 小区名称
	 */
	private String  tf_name;
	/**
	 * 简介
	 */
	private String tf_summary;
	/**
	 * 小区介绍
	 */
	private String tf_introduce;
	/**
	 * 省份
	 */
	private String tf_province;
	
	/**
	 * 城市
	 */
	private String tf_city;
	/**
	 * 县城
	 */
	private String tf_county;
	/**
	 * 经度纬度
	 */
	private String tf_locationxy;
	
	/**
	 * 详细地址
	 */
	private String tf_location;
	/**
	 * 楼盘编号
	 */
	private String tf_propertyCode;
	/**
	 * 预售证号
	 */
	private String tf_salesCode;
	/**
	 * 占地面积
	 */
	private float tf_covering ;
	/**
	 * 绿化面积
	 */
	private float tf_greenarea;
	/**
	 * 接盘时间
	 */
	private Date  tf_sales;
	
	/**
	 * 联系电话
	 */
	private String tf_phone;
	
	
	
	
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
	public String getTf_phone() {
		return tf_phone;
	}
	public void setTf_phone(String tf_phone) {
		this.tf_phone = tf_phone;
	}
	

	

}
