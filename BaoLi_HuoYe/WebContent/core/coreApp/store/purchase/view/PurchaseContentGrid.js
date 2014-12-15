Ext.define("core.store.purchase.view.PurchaseContentGrid", {
	extend : "core.app.base.BaseGrid",
	alias : "widget.store.purchaseContentGrid",
	tbar:[
			{xtype:'button',text:'添加',ref:'gridInsert',iconCls:'table_add',hidden:false},
			{xtype:'button',text:'编辑',ref:'gridEdit',iconCls:'table_edit',disabled:true},
			{xtype:'button',text:'删除',ref:'gridDelete',iconCls:'table_remove'},
			{xtype:'button',text:'保存',ref:'gridSave',iconCls:'table_save'}
		],
	columns : [ {
		xtype : "rownumberer",
		width : 35,
		text : 'No.',
		align : 'center'
	}, {
		text : "主键",
		dataIndex : "purid",
		hidden : true
	}, {
		text : "进货日期",
		dataIndex : "purchaseDate",
		width : 120,
		columnType : "textfield",
		field : {
			xtype : "datetimefield",
			hideTrigger : true,
			dateType : 'date'
		}
	}, {
		text : "经办人",
		dataIndex : "endUid",
		width : 120,
		columnType : "basecombobox",
		ddCode : "ENDUSER",
		field : {
			xtype : "basecombobox",
			ddCode : "ENDUSER",
			hideTrigger : true
		}
	}, {
		text : "仓库",
		dataIndex : "wareHouse",
		width : 120,
		columnType : "basecombobox",
		ddCode : "WAREHOUSE",
		field : {
			xtype : "basecombobox",
			ddCode : "WAREHOUSE",
			hideTrigger : true
		}
	}, {
		text : "供应商",
		dataIndex : "provider",
		width : 150,
		columnType : "textfield",
		field : {
			xtype : "textfield",
			hideTrigger : true
		}
	}, {
		text : "备注",
		dataIndex : "remark",
		width : 320,
		columnType : "textfield",
		field : {
			xtype : "textfield",
			hideTrigger : true
		}
	}

	],
	store : "core.store.purchase.store.PurchaseContentStore",
	bbar : {
		xtype : 'pagingtoolbar',
		store : "core.store.purchase.store.PurchaseContentStore",
		dock : 'bottom',
		displayInfo : true
	}
});