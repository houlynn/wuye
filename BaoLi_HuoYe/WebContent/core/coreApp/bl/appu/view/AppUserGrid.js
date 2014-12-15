Ext.define("core.bl.appu.view.AppUserGrid", {
	extend : "core.app.base.BaseGrid",
	alias : "widget.bl.appUserGrid",
	tbar : [ {
		xtype : 'button',
		text : '添加',
		ref : 'gridInsertF',
		iconCls : 'table_add'
	}, {
		xtype : 'button',
		text : '添加',
		ref : 'gridInsert',
		iconCls : 'table_add',
		hidden : false
	}, {
		xtype : 'button',
		text : '编辑',
		ref : 'gridEdit',
		iconCls : 'table_edit',
		disabled : true
	}, {
		xtype : 'button',
		text : '删除',
		ref : 'gridDelete',
		iconCls : 'table_remove'
	}, {
		xtype : 'button',
		text : '保存',
		ref : 'gridSave',
		iconCls : 'table_save'
	} ],
	columns : [ {
		xtype : "rownumberer",
		width : 35,
		text : 'No.',
		align : 'center'
	}, {
		text : "主键",
		dataIndex : "userid",
		hidden : true
	}, {
		text : "用户名",
		dataIndex : "username",
		width : 180,
		columnType : "textfield",
		field : {
			xtype : "textfield",
			beforeLabelTextTpl : comm.get('required'),
			emptyText : '请收入用户名',
			allowBlank : false,
			hideTrigger : false
		}
	}, {
		text : "登录帐号",
		dataIndex : "loginCode",
		width : 120,
		columnType : "textfield",
		field : {
			xtype : "textfield",
			beforeLabelTextTpl : comm.get('required'),
			emptyText : '请输入登录帐号',
			allowBlank : false,
			hideTrigger : false
		}
	}, {
		text : "登录密码",
		dataIndex : "pwd",
		width : 120,
		columnType : "textfield",
		field : {
			xtype : "textfield",
			beforeLabelTextTpl : comm.get('required'),
			emptyText : '登录登录密码',
			allowBlank : false,
			hideTrigger : false
		}
	}, {
		text : "身份证",
		dataIndex : "idcar",
		width : 120,
		columnType : "textfield",
		field : {
			xtype : "textfield",
			beforeLabelTextTpl : comm.get('required'),
			emptyText : '身份证必填',
			allowBlank : false,
			hideTrigger : false
		}
	}, {
		text : "性别",
		dataIndex : "sex",
		width : 120,
		columnType : "basecombobox",
		ddCode : "SEX",
		field : {
			xtype : "basecombobox",
			ddCode : "SEX",
			emptyText : '请选择性别',
			allowBlank : false,
			hideTrigger : false
		}
	}, {
		text : "是否业主",
		dataIndex : "owner",
		width : 80,
		columnType : "basecombobox",
		ddCode : "ISOWNER",
		field : {
			xtype : "basecombobox",
			ddCode : "ISOWNER",
			beforeLabelTextTpl : comm.get('required'),
			emptyText : '是否业主必填',
			allowBlank : false,
			hideTrigger : false
		}
	}, {
		text : "房产信息",
		dataIndex : "house",
		width : 380,
		columnType : "textfield",
		field : {
			xtype : "textfield",
			beforeLabelTextTpl : comm.get('required'),
			emptyText : '房产信息必填',
			allowBlank : false,
			hideTrigger : false
		}
	} ],
	store : "core.bl.appu.store.AppUserStore",
	bbar : {
		xtype : 'pagingtoolbar',
		store : "core.bl.appu.store.AppUserStore",
		dock : 'bottom',
		displayInfo : true
	}
});