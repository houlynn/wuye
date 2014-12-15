Ext.define("core.app.base.SimpleForm",{
	extend:"Ext.form.Panel",
	alias:"widget.simpleform",
	frame:false,
	layout:"column",
	autoScroll : true,
	animCollapse : false,
	bodyPadding : '10 20 0 20',
	defaults:{
		    labelSeparator :": ",
			msgTarget : 'side',
			margin:"8 0 0 0 0",
			xtype : 'textfield',
			labelAlign : 'right',
			columnWidth : .5
			
			  
	},
	tbar:[
		{xtype:"button",text:"保存",ref:"formSave",iconCls:"table_save"},
		]
});