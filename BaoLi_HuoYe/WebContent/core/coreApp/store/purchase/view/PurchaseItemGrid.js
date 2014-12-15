Ext.define("core.store.purchase.view.PurchaseItemGrid", {
	extend : "core.app.base.BaseGrid",
	alias : "widget.store.purchaseItemGrid",
	tbar : [ {
		xtype : 'button',
		text : '添加',
		ref : 'gridInsert',
		iconCls : 'table_add'
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
		dataIndex : "pchitItem",
		hidden : true
	}, {
		text : "货品名称",
		dataIndex : "productId",
		width : 220,
		columnType : "basecombobox",
		ddCode : "PRODUCT",
		field : {
			xtype : "basecombobox",
			ddCode : "PRODUCT",
			hideTrigger : true,
			emptyText : '货品名称必填',
			allowBlank : false,
		}
	}, {
		text : "入库数量",
		dataIndex : "quantity",
		width : 220,
		columnType : "numberfield",
		field : {
			xtype : "numberfield",
			decimalPrecision : 3,
			hideTrigger : false

		}
	}

	],
	store : "core.store.purchase.store.PurchaseItemStore",
	bbar : {
		xtype : 'pagingtoolbar',
		store : "core.store.purchase.store.PurchaseItemStore",
		dock : 'bottom',
		displayInfo : true
	}
});