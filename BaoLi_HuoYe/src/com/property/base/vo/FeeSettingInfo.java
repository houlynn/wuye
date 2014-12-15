package com.property.base.vo;

public class FeeSettingInfo {
	
	/**
	 * 条目名称
	 */
	private  String itemName;
	/**
	 * 收费标准ID
	 */
	private  Integer itemId;
	/**]
	 * 开始收费时间
	 */
	private  String startdate;
	/**
	 * 结束时间
	 */
	private  String enddate;

	/**
	 * 是否有结束时间
	 */
	private String hasEndDate;
	
	public String getItemName() {
		return itemName;
	}
	public void setItemName(String itemName) {
		this.itemName = itemName;
	}
	public String getStartdate() {
		return startdate;
	}
	public void setStartdate(String startdate) {
		this.startdate = startdate;
	}
	public String getEnddate() {
		return enddate;
	}
	public void setEnddate(String enddate) {
		this.enddate = enddate;
	}
	public String getHasEndDate() {
		return hasEndDate;
	}
	public void setHasEndDate(String hasEndDate) {
		this.hasEndDate = hasEndDate;
	}
	public Integer getItemId() {
		return itemId;
	}
	public void setItemId(Integer itemId) {
		this.itemId = itemId;
	}


}
