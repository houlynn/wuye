package com.ufo.framework.system.shared.module;



/**
 * 一个模块的状态是什么，可以是审核，审批，单选，多选，显示
 * @author jfok
 *
 */
public enum ModuleOperateType {
	
	DISPLAY("显示"),			//显示
	EXPANSION("展开显示"),  //记录展开时候的显示
	NORMAL(""),				//正常的具有各种权限的模块
	AUDITING("批量审核"),   //审核
	APPROVE("批量审批"),     //审批
	PAYMENT("请款单支付"),
	SINGLESELECT("选择一个"),     //单选
	MULTIPLESELECT("选择多个"),  //多选
	PAYMENTAPPROVE("请款审批"),  //多选
	;

	private String value;
	
	private ModuleOperateType(String value) {
		this.value = value;
	}
	

	public String getValue() {
		return value;
	}
	
}
