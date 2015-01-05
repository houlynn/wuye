package com.property.base.invoker.model;

import java.io.Serializable;
public class AppExpressInfo  implements Serializable {

/**
 * ID
 */
	private int tf_exprid;
	
	/**
	 * 房号
	 */
	private String tf_roomNub;
	
	/**
	 * 发件人
	 */
	private String tf_poponame;
	
	/**
	 * 手机号码
	 */
	private String tf_phoneNuber;
	
	/**
	 * 物品数量
	 */
	private  int tf_woucount;
	
	/**
	 * 提交时间
	 */
	private String tf_postTime;
	/**
	 * APP账户
	 */
	private String tf_appUser;
	
	/**
	 * 物品描述
	 */
	private String tf_remark;
	
	/**
	 * 小区标示
	 */
	private int tf_vid;

	public int getTf_exprid() {
		return tf_exprid;
	}

	public void setTf_exprid(int tf_exprid) {
		this.tf_exprid = tf_exprid;
	}

	public String getTf_roomNub() {
		return tf_roomNub;
	}

	public void setTf_roomNub(String tf_roomNub) {
		this.tf_roomNub = tf_roomNub;
	}

	public String getTf_poponame() {
		return tf_poponame;
	}

	public void setTf_poponame(String tf_poponame) {
		this.tf_poponame = tf_poponame;
	}

	public String getTf_phoneNuber() {
		return tf_phoneNuber;
	}

	public void setTf_phoneNuber(String tf_phoneNuber) {
		this.tf_phoneNuber = tf_phoneNuber;
	}

	public int getTf_woucount() {
		return tf_woucount;
	}

	public void setTf_woucount(int tf_woucount) {
		this.tf_woucount = tf_woucount;
	}

	public String getTf_postTime() {
		return tf_postTime;
	}

	public void setTf_postTime(String tf_postTime) {
		this.tf_postTime = tf_postTime;
	}

	public String getTf_appUser() {
		return tf_appUser;
	}

	public void setTf_appUser(String tf_appUser) {
		this.tf_appUser = tf_appUser;
	}

	public String getTf_remark() {
		return tf_remark;
	}

	public void setTf_remark(String tf_remark) {
		this.tf_remark = tf_remark;
	}

	public int getTf_vid() {
		return tf_vid;
	}

	public void setTf_vid(int tf_vid) {
		this.tf_vid = tf_vid;
	}
	
	
	
}
