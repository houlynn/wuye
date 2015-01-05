package com.property.base.invoker.model;

import java.io.Serializable;



/**
 * 小区 终点工  保姆 or 月嫂
 *
* @author HouLynn
* @date 2015年1月5日
  @version 1.0
 */
public class AppPointInfo implements Serializable {
	
	public static final String POIN_FRIENT="001";
	public static final String HOME_MAKING ="002";
	public static final String SITER_MONTH="003";
	
	
	/**
	 * ID
	 */
	private int tf_pointId;
	/**
	 * 类型
	 */
	private String tf_type;
	/**
	 * 姓名
	 */
	private String tf_name;
	/**
	 * 性别
	 */
	private String  tf_sex;
	/**
	 * 年龄
	 */
	private int tf_age;
	/**
	 * 薪资
	 */
	private String tf_price;
	/**
	 * 工作年限
	 */
	private String tf_taex;
	/**
	 * 简历
	 */
	private String tf_rmark;
	/**
	 * 头像地址
	 */
	private String tf_topUrl;
	/**
	 * 小区ID 方便后边备用
	 */
	private int tf_vid;
	
	/**
	 * 手机号码
	 */
	 private String tf_phone;
	
	public int getTf_pointId() {
		return tf_pointId;
	}
	public void setTf_pointId(int tf_pointId) {
		this.tf_pointId = tf_pointId;
	}
	public String getTf_type() {
		return tf_type;
	}
	public void setTf_type(String tf_type) {
		this.tf_type = tf_type;
	}
	public String getTf_name() {
		return tf_name;
	}
	public void setTf_name(String tf_name) {
		this.tf_name = tf_name;
	}
	public String getTf_sex() {
		return tf_sex;
	}
	public void setTf_sex(String tf_sex) {
		this.tf_sex = tf_sex;
	}
	public int getTf_age() {
		return tf_age;
	}
	public void setTf_age(int tf_age) {
		this.tf_age = tf_age;
	}
	public String getTf_price() {
		return tf_price;
	}
	public void setTf_price(String tf_price) {
		this.tf_price = tf_price;
	}
	public String getTf_taex() {
		return tf_taex;
	}
	public void setTf_taex(String tf_taex) {
		this.tf_taex = tf_taex;
	}
	public String getTf_rmark() {
		return tf_rmark;
	}
	public void setTf_rmark(String tf_rmark) {
		this.tf_rmark = tf_rmark;
	}
	public String getTf_topUrl() {
		return tf_topUrl;
	}
	public void setTf_topUrl(String tf_topUrl) {
		this.tf_topUrl = tf_topUrl;
	}
	public int getTf_vid() {
		return tf_vid;
	}
	public void setTf_vid(int tf_vid) {
		this.tf_vid = tf_vid;
	}
	public String getTf_phone() {
		return tf_phone;
	}
	public void setTf_phone(String tf_phone) {
		this.tf_phone = tf_phone;
	}

}
