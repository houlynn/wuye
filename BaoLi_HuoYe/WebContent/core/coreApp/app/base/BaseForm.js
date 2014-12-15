Ext.define("core.app.base.BaseForm",{
	extend:"Ext.form.Panel",
	alias:"widget.baseform",
	frame:false,
	layout:"column",
	autoScroll : true,
	animCollapse : false,
	animate:false,
	animate:false,
	bodyPadding : '10 20 0 20',
	defaults:{
		    labelSeparator :": ",
			msgTarget : 'side',
			margin:"10 0 0 0 0",
			xtype : 'textfield',
			labelAlign : 'right',
			columnWidth : .5
			
			  
	},
	tbar:[
		{xtype:"button",text:"保存",ref:"formSave",iconCls:"table_save"},
		{xtype:"button",text:"返回",ref:"formReturn",iconCls:"return"}
		]
});