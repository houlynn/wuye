Ext.define("core.rbac.user.view.UserGrid",{
	extend:"core.app.base.BaseGrid",
	alias:"widget.rbac.usergrid",
	tbar:[
		{xtype:'button',text:'添加',ref:'gridInsertUser',iconCls:'table_add'},
		{xtype:'button',text:'删除',ref:'gridDelete',iconCls:'table_remove'},
		{xtype:'button',text:'保存',ref:'gridSaveUser',iconCls:'table_save'}
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
		field:{
			xtype:"textfield"
		}
	},{
		text:"登陆账号",
		dataIndex:"userCode",
		field:{
			xtype:"textfield",
			 regex: /^((\d{3,4}-)*\d{7,8}(-\d{3,4})*|13\d{9})$/ ,
			 	allowBlank : false,
			 	emptyText :"请填入手机号"
		}		
	},
	{
		text:"密码",
		dataIndex:"password",
		field:{
			xtype:"textfield",
			 	allowBlank : false,
			 	emptyText :""
		}		
	}
	
	
	,{
		text:"性别",
		dataIndex:"sex",
		columnType:"basecombobox",
		ddCode:"SEX",
		field:{
			xtype:"basecombobox",
			ddCode:"SEX"
		}
	},{
		text:"创建日期",
		dataIndex:"createTime",
		width:150,
		field:{
			xtype:"datetimefield",
			dateType:"date"
		}
	}],
	store:"core.rbac.user.store.UserStore",
	bbar:{
		xtype:'pagingtoolbar',
		store:'core.rbac.user.store.UserStore',
		dock:'bottom',
		displayInfo:true
	}
});