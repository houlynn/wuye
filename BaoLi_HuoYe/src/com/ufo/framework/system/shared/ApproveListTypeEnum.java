package com.ufo.framework.system.shared;

public enum ApproveListTypeEnum {

	我可以审批的("我可以审批的"), 我已经审批过的("我已经审批过的"), 能修改审批的("能修改审批的"),

	能取消终止审批的("能取消终止审批的"), 尚未到我审批的("尚未到我审批的"),

	已通过审批的("已通过审批的"), 尚未通过审批的("尚未通过审批的"), 已终止审批的("已终止审批的");

	private String value;

	ApproveListTypeEnum(String value) {
		this.value = value;
	}

	public String getValue() {
		return this.value;
	}
}
