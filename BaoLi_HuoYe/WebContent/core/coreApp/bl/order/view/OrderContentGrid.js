Ext.define("core.bl.order.view.OrderContentGrid", {
	extend : "core.app.base.BaseGrid",
	alias : "widget.bl.orderContentGrid",
	tbar : [ {
		xtype : 'button',
		text : '删除',
		ref : 'gridDelete',
		iconCls : 'table_remove'
	}, {
		xtype : 'button',
		text : '保存',
		ref : 'gridSave',
		iconCls : 'table_save'
	}

	],
	columns : [ {
		xtype : "rownumberer",
		width : 35,
		text : 'No.',
		align : 'center'
	}, {
		text : "主键",
		dataIndex : "ordid",
		hidden : true
	}, {
		text : "购买用户",
		dataIndex : "loginCode",
		width : 120,
		columnType : "textfield"
	}, {
		text : "下单时间",
		dataIndex : "ordertime",
		width : 120,
		columnType : "textfield"
	}, {
		text : "商品名称",
		dataIndex : "gdName",
		width : 120,
		columnType : "numberfield"
	}, {
		text : "价格",
		dataIndex : "price",
		width : 80,
		columnType : "numberfield",
	}, {
		text : "购买数量",
		dataIndex : "count",
		width : 80,
		columnType : "numberfield",
	}, {
		text : "金额",
		dataIndex : "acount",
		width : 80,
		columnType : "textfield",
	}, {
		text : "送货地址",
		dataIndex : "address",
		width : 220,
		columnType : "textfield",
	}, {
		text : "收货人",
		dataIndex : "uname",
		width : 100,
		columnType : "textfield",
	}, {
		text : "电话号码",
		dataIndex : "phone",
		width : 120,
		columnType : "textfield",
	}, {
		text : "邮编",
		dataIndex : "postcode",
		width : 80,
		columnType : "textfield",
	}, {
		text : "支付方式",
		dataIndex : "payType",
		width : 120,
		columnType : "basecombobox",
		ddCode : "PAYTYPE",
	}, {
		text : "工作人,双休日与节假日均可送货",
		dataIndex : "weekendto",
		width : 60,
		columnType : "basecombobox",
		ddCode : "WEEKAN"
	}, {
		text : "交易状态",
		dataIndex : "ispay",
		width : 120,
		columnType : "basecombobox",
		ddCode : "ISPAY"
	}

	],
	store : "core.bl.order.store.OrderContentStore",
	bbar : {
		xtype : 'pagingtoolbar',
		store : "core.bl.order.store.OrderContentStore",
		dock : 'bottom',
		displayInfo : true
	}
});