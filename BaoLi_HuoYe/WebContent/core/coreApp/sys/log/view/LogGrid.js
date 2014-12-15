Ext.define("core.sys.log.view.LogGrid", {
	extend : "core.app.base.BaseGrid",
	alias : "widget.loggrid",
	tbar:[
			{xtype:'button',text:'添加',ref:'gridInsertF',iconCls:'table_add',hidden:true},
			{xtype:'button',text:'添加',ref:'gridInsert',iconCls:'table_add',hidden:true},
			{xtype:'button',text:'编辑',ref:'gridEdit',iconCls:'table_remove',hidden:true},
			{xtype:'button',text:'删除',ref:'gridDelete',iconCls:'table_remove'},
			{xtype:'button',text:'保存',ref:'gridSave',iconCls:'table_save',hidden:true}
		],
	columns : [ {
		xtype : "rownumberer",
		width : 35,
		text : 'No.',
		align : 'center'
	}, {
		text : "操作用户",
		dataIndex : "username",
		width : 80,
		field : {
			xtype : "textfield"
		}
	}, {
		text : "所属部门",
		width : 80,
		dataIndex : "createDeptName",
		field : {
			xtype : "textfield"
		}
	}, {
		text : "操作类型",
		width : 80,
		dataIndex : "operatingType",
		field : {
			xtype : "textfield"
		}
	}, {
		text : "登陆IP",
		dataIndex : "loginIP",
		width : 220,
		field : {
			xtype : "textfield"
		}
	}, {
		text : "操作模型",
		dataIndex : "operatingModel",
		width : 200,
		field : {
			xtype : "textfield"
		}
	}, {
		text : "操作时间",
		width : 180,
		dataIndex : "operatingTime",
		field : {
			xtype : "datetimefield",
			dateType : "date"
		}
	} ],
	store:"core.sys.log.store.LogStore",
	bbar:{
		xtype:'pagingtoolbar',
		store:"core.sys.log.store.LogStore",
		dock:'bottom',
		displayInfo:true
	}
});