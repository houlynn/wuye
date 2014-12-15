Ext.define("core.bl.ac.view.AppClassifyForm", {
	extend : "core.app.base.BaseForm",
	alias : "widget.bl.appClassifyForm",
	items : [ {
		fieldLabel : "主键",
		name : "cid",
		hidden : true
	}, {
		fieldLabel : "分类名称",
		name : "classify",
		allowBlank : true,
		xtype : "textfield"
	}, {
		fieldLabel : "图片链接地址",
		name : "imgurl",
		allowBlank : true,
		xtype : "textfield"
	}, {
		fieldLabel : "图片链接地址",
		name : "typeCode",
		allowBlank : true,
		xtype : "basecombobox",
		ddCode : "ROUNDTYPE"

	},

	{
		xtype : "tabpanel",
		columnWidth : 1,
		menuAlign : "center",
		items : [ {
			title : '<center height=40>上传图片</center>',
			xtype : "bl.appClassifyItemPanel",
			height : comm.get("resolutionHeight") * 0.28
		} ],
		tabConfig : {// 标签配置参数

		}
	} ]
});