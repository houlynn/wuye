Ext.define("core.rbac.user.view.UserGrid",{
	extend:"core.app.base.BaseGrid",
	alias:"widget.rbac.usergrid",
	tbar:[
		{xtype:'button',text:'添加',ref:'gridInsertUser',iconCls:'table_add'},
		{xtype:'button',text:'删除',ref:'gridDelete',iconCls:'table_remove'},
		{xtype:'button',text:'编辑',ref:'gridSaveUser',iconCls:'table_save'}
	],
	columns:[{
		xtype:"rownumberer",
		width : 35,
		text :'No.',
		align : 'center'
	},{
		text:"主键",
		dataIndex:"userId",
		hidden:true
	},{
		text:"姓名",
		dataIndex:"username",
	},{
		text:"登陆账号",
		dataIndex:"userCode",
	},
	{
		text:"密码",
		dataIndex:"password",
	}
	
	
	,{
		text:"性别",
		dataIndex:"sex",
		columnType:"basecombobox",
		ddCode:"SEX",
	},{
		text:"创建日期",
		dataIndex:"createTime",
		width:150,
	}],
	store:"core.rbac.user.store.UserStore",
	bbar:{
		xtype:'pagingtoolbar',
		store:'core.rbac.user.store.UserStore',
		dock:'bottom',
		displayInfo:true
	}
});