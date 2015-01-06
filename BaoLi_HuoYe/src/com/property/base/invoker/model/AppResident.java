package com.property.base.invoker.model;

import java.io.Serializable;

public class AppResident  implements Serializable{
	/**
	 * ID
	 */
	private int tf_residentId;
	  ///////////////业主信息///////////////////////////////
	/**
	 * 业主名称
	 */
	  private String tf_residentName;
	  /**
	   * 性别
	   */
	  private String tf_residentSex;
	  
	  ////////////////////房屋信息/////////////////////////////
	  /**
	   * 房号
	   */
	private String tf_number;
	/**
	 * 房屋编码
	 */
    private String tf_code;
    /**
     * 使用面积
     */
    private double tf_userArea;
    /**
     * 建筑面积
     */
    private double tf_builArea;
    /**
     * 产权面积
     */
	private double tf_rightArea;
	/**
	 * 分摊面积
	 */
	private double tf_shareArea;
	/**
	 * 楼层信息
	 */
	private String tf_lefStr;
	public int getTf_residentId() {
		return tf_residentId;
	}
	public void setTf_residentId(int tf_residentId) {
		this.tf_residentId = tf_residentId;
	}
	public String getTf_residentName() {
		return tf_residentName;
	}
	public void setTf_residentName(String tf_residentName) {
		this.tf_residentName = tf_residentName;
	}
	public String getTf_residentSex() {
		return tf_residentSex;
	}
	public void setTf_residentSex(String tf_residentSex) {
		this.tf_residentSex = tf_residentSex;
	}
	public String getTf_number() {
		return tf_number;
	}
	public void setTf_number(String tf_number) {
		this.tf_number = tf_number;
	}
	public String getTf_code() {
		return tf_code;
	}
	public void setTf_code(String tf_code) {
		this.tf_code = tf_code;
	}
	public double getTf_userArea() {
		return tf_userArea;
	}
	public void setTf_userArea(double tf_userArea) {
		this.tf_userArea = tf_userArea;
	}
	public double getTf_builArea() {
		return tf_builArea;
	}
	public void setTf_builArea(double tf_builArea) {
		this.tf_builArea = tf_builArea;
	}
	public double getTf_rightArea() {
		return tf_rightArea;
	}
	public void setTf_rightArea(double tf_rightArea) {
		this.tf_rightArea = tf_rightArea;
	}
	public double getTf_shareArea() {
		return tf_shareArea;
	}
	public void setTf_shareArea(double tf_shareArea) {
		this.tf_shareArea = tf_shareArea;
	}
	public String getTf_lefStr() {
		return tf_lefStr;
	}
	public void setTf_lefStr(String tf_lefStr) {
		this.tf_lefStr = tf_lefStr;
	}
	
	
	
	
	
	
	
	
	
	
	

}
