Ext.define("core.bl.inc.view.InteractForm", {
	extend : "core.app.base.BaseForm",
	alias : "widget.bl.interactForm",
	tbar:[
			{xtype:"button",text:"保存",ref:"formSave",iconCls:"table_save",hidden : true},
			{xtype:"button",text:"返回",ref:"formReturn",iconCls:"return"}
			],
	items : [ {
		fieldLabel : "主键",
		name : "hId",
		hidden : true
	}, {
		fieldLabel : "发表用户",
		name : "username",
		beforeLabelTextTpl : comm.get('required'),
		readOnly:true,
		xtype : "textfield"
	}, {
		fieldLabel : "分类",
		name : "type",
		beforeLabelTextTpl : comm.get('required'),
		ddCode : "INCTYPE",
		readOnly:true,
		xtype : "basecombobox"
	}, {
		fieldLabel : "标题",
		name : "title",
		beforeLabelTextTpl : comm.get('required'),
		readOnly:true,
		xtype : "textfield"
	}, {
		fieldLabel : "发布时间",
		name : "ptime",
		beforeLabelTextTpl : comm.get('required'),
		emptyText : '发布时间必填',
		readOnly:true,
		xtype : "datetimefield"
	}, {
		fieldLabel : "内容",
		xtype : 'extkindeditor',
		name : "interactContent",
		id : "interact_extkindetor",
		height : 300,
		columnWidth : 1,

	}, {
		xtype : "tabpanel",
		columnWidth : 1,
		id : "cffer_imgpanel",
		menuAlign : "center",
		margin : "1 1 0 99 0",
		split : true,
		items : [ {
			title : '<center height=40>发布图片</center>',
			xtype : "bl.photographPanel",
			height : comm.get("resolutionHeight") * 0.48
		}, {
			title : '<center height=40>回复内容</center>',
			xtype : "bl.massagePanel",
			height : comm.get("resolutionHeight") * 0.48
		} ],
		tabConfig : {// 标签配置参数
		}
	}

	]
});