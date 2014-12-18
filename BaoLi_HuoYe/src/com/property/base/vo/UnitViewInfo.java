package com.property.base.vo;

public class UnitViewInfo {
	
	/**
	 * 业主ID
	 */
	private int rid;
	/**
	 * 单元图片
	 */
	private String iamgUrl;

	/**
	 * 业主名称
	 */
	private String rname;
	
    /**
     * 入住状态
     */
	private String stateOccupancy;
	
	/**
	 * 欠费状态
	 */
	private String stateFees;
	
	
	/**
	 * 报修状态
	 */
	private String stateRepair;
    /**
     * 房号	
     */
	private String  number;
	
	


	public int getRid() {
		return rid;
	}


	public void setRid(int rid) {
		this.rid = rid;
	}


	public String getIamgUrl() {
		return iamgUrl;
	}


	public void setIamgUrl(String iamgUrl) {
		this.iamgUrl = iamgUrl;
	}


	public String getRname() {
		return rname;
	}


	public void setRname(String rname) {
		this.rname = rname;
	}


	public String getStateOccupancy() {
		return stateOccupancy;
	}


	public void setStateOccupancy(String stateOccupancy) {
		this.stateOccupancy = stateOccupancy;
	}


	public String getStateFees() {
		return stateFees;
	}


	public void setStateFees(String stateFees) {
		this.stateFees = stateFees;
	}


	public String getStateRepair() {
		return stateRepair;
	}


	public void setStateRepair(String stateRepair) {
		this.stateRepair = stateRepair;
	}


	public String getNumber() {
		return number;
	}


	public void setNumber(String number) {
		this.number = number;
	}

}
