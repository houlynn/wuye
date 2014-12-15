package com.model.hibernate.system.shared;

public class PermissionQuery {
	private String roleId;
	private Boolean isSee;
	private String addIds;
	private String delIds;
	public String getRoleId() {
		return roleId;
	}
	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}
	public Boolean getIsSee() {
		return isSee;
	}
	public void setIsSee(Boolean isSee) {
		this.isSee = isSee;
	}
	public String getAddIds() {
		return addIds;
	}
	public void setAddIds(String addIds) {
		this.addIds = addIds;
	}
	public String getDelIds() {
		return delIds;
	}
	public void setDelIds(String delIds) {
		this.delIds = delIds;
	}
	
}
