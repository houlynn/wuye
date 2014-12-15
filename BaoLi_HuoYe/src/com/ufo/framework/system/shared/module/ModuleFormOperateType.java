package com.ufo.framework.system.shared.module;

/**
 * 每一个模块form 所具有的类型
 * 
 * @author jfok
 * 
 */
public enum ModuleFormOperateType {

	DISPLAY("display"), // 显示
	EDIT("edit"), // 正常的具有各种权限的模块
	AUDITING("auditing"), // 审核
	CANCELAUDITING("cancelauditing"), // 取消审核
	APPROVE("approve"), // 审批
	CANCELAPPROVE("cancelapprove"); // 取消审批

	private String value;

	private ModuleFormOperateType(String value) {
		this.value = value;
	}

	// @Override
	public String getValue() {
		return value;
	}
	
	public static final ModuleFormOperateType OperateTypeGen(String value) {
		for(ModuleFormOperateType type : ModuleFormOperateType.values())
			if (type.getValue().equals(value))
				return type;
		return DISPLAY;
	}
	
	public static final ModuleFormOperateType getValueTitle(String value) {
		for(ModuleFormOperateType type : ModuleFormOperateType.values())
			if (type.getValue().equals(value))
				return type;
		return DISPLAY;
	}
	
}
