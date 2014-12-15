package com.ufo.framework.system.shared.module;

public class ModuleConstants {

	public static final String MENUICONPATH = "images/module/";

	
	// 生成的数据以及字段中表的别名和字段的分隔符
	public static final String SEPARATOR = "___";

	// 由于sql语句中的字段别名不可以用 ".",改成 “___",在取值以后将此字段名再改成"table.fieldname"
	public static final String FIELDASSEPARATOR = "___";

	// parent字段的前缀
	public static final String PARENTAHEAD = "P_";

	// count 字段的前缀
	public static final String COUNTAHEAD = "C_";
	public static final String COUNTTITLEAHEAD = "<font color=\"green\">С</font>";

	// sum 字段的前缀
	public static final String SUMAHEAD = "S_";
	public static final String SUMTITLEAHEAD = "<font color=\"green\">Σ</font>";

	public static final String AVGHEAD = "A_";
	public static final String MAXHEAD = "X_";
	public static final String MINHEAD = "N_";

	
	public static final String THISMODULEASNAME = "__thismoduleasname__";

	// 某个字段是否是模块的name 字段
	public static final String NAMEFIELD = "namefield";

	
	public static final String EDITWITHAPPROVE = "EditWithApprove";

	public static final String MODULE_OPER_STRING = "MODULE_OPER_STRING";
	public static final String MODULE_DISPLAY_OPER="显示";
	public static final String MODULE_NEW_OPER="新增";
	public static final String MODULE_EDIT_OPER="修改";
	public static final String MODULE_DELETE_OPER="删除";
	public static final String MODULE_APPROVE_OPER="审批";
	public static final String MODULE_AUDITING_OPER="审核";

	public static final String MODULE_CANCELAPPROVE_OPER="取消审批";
	public static final String MODULE_CANCELAUDITING_OPER="取消审核";
	
	public static final String AUDITING_NAME = "tf_auditingName";
	public static final String AUDITING_DATE = "tf_auditingDate";
	public static final String AUDITING_REMARK = "tf_auditingRemark";

	
	public static String formatParentHead(String title) {
		return "<font color=\"blue\">" + title + "</font>";
	}

	public static String formatChildHead(String title) {
		return "<font color=\"green\">" + title + "</font>";
	}

}
