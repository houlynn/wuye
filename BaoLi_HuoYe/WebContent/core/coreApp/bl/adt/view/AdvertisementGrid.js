Ext.define("core.bl.adt.view.AdvertisementGrid", {
	extend : "core.app.base.BaseGrid",
	alias : "widget.bl.advertisementGrid",
	tbar : [ {
		xtype : 'button',
		text : '详细录入',
		ref : 'gridInsertF',
		iconCls : 'table_add',
		hidden : false
	}, {
		xtype : 'button',
		text : '添加',
		ref : 'gridInsert',
		iconCls : 'table_add'
	}, {
		xtype : 'button',
		text : '编辑',
		ref : 'gridEdit',
		iconCls : 'table_remove',
		hidden : false
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
	}, ],
	columns : [ {
		xtype : "rownumberer",
		width : 35,
		text : 'No.',
		align : 'center'
	}, {
		text : "主键",
		dataIndex : "adverid",
		hidden : true
	}

	, {
		text : "标题",
		dataIndex : "title",
		width : 320,
		columnType : "textfield",
		field : {
			xtype : "textfield",
			beforeLabelTextTpl : comm.get('required'),
			emptyText : '标题',
			allowBlank : false,
			hideTrigger : false
		}
	}, {
		text : "投放时间",
		dataIndex : "posttime",
		width : 180,
		columnType : "textfield",
		field : {
			xtype : "datetimefield",
			dateType : "datetime",
			beforeLabelTextTpl : comm.get('required'),
			emptyText : '投放时间必填',
			allowBlank : false,
			hideTrigger : false
		}
	}, {
		text : "广告类型",
		dataIndex : "advertype",
		width : 180,
		columnType : "textfield",
		field : {
			xtype : "textfield",
			beforeLabelTextTpl : comm.get('required'),
			emptyText : '广告类型必填',
			allowBlank : false,
			hideTrigger : false
		}
	},
	 {
		text : "链接地址",
		dataIndex : "linkUrl",
		width : 280,
		columnType : "textfield",
		field : {
			xtype : "textfield",
			beforeLabelTextTpl : comm.get('required'),
			emptyText : '链接地址必填',
			allowBlank : false,
			hideTrigger : false
		}
	}
	, {
		text : "投放状态",
		dataIndex : "ispost",
		width : 120,
		columnType : "basecombobox",
		ddCode : "TSTATE"
	},

	],
	store : "core.bl.adt.store.AdvertisementStore",
	bbar : {
		xtype : 'pagingtoolbar',
		store : "core.bl.adt.store.AdvertisementStore",
		dock : 'bottom',
		displayInfo : true
	}
});