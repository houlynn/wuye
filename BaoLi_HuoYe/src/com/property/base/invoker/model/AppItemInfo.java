package com.property.base.invoker.model;

import java.io.Serializable;

/**
 * 收费条目
 *
* @author HouLynn
* @date 2015年1月6日
  @version 1.0
 */
public class AppItemInfo implements Serializable{
	
	/**
	 * 收费名称
	 */
	private String feesName;
	/**
	 * 项目标示
	 */
	private int  billId;
	/**
	 * 使用量
	 */
	private double count;
	/**
	 * 金额
	 */
	private double acount;
	public String getFeesName() {
		return feesName;
	}
	public void setFeesName(String feesName) {
		this.feesName = feesName;
	}
	public int getBillId() {
		return billId;
	}
	public void setBillId(int billId) {
		this.billId = billId;
	}
	public double getCount() {
		return count;
	}
	public void setCount(double count) {
		this.count = count;
	}
	public double getAcount() {
		return acount;
	}
	public void setAcount(double acount) {
		this.acount = acount;
	}
	

}
