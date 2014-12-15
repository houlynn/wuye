Ext.define("core.bl.order.view.OrderItemGrid", {
	extend : "core.app.base.BaseGrid",
	alias : "widget.bl.orderItemGrid",
	tbar:[
			{xtype:'button',text:'添加',ref:'gridInsert',iconCls:'table_add'},
			{xtype:'button',text:'删除',ref:'gridDelete',iconCls:'table_remove'},
			{xtype:'button',text:'保存',ref:'gridSave',iconCls:'table_save'}
		],
	columns : [{
		xtype:"rownumberer",
		width : 35,
		text :'No.',
		align : 'center'
	},{
		text:"主键",
		dataIndex:"oitmid",
		hidden:true
	}
, {
		text:"商品id",
		dataIndex:"gid",
		width : 120,
		 columnType:"textfield",
		field:{
			 xtype:"textfield",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'商品id必填',
		allowBlank : false,
		  hideTrigger : false
		}
	}
, {
		text:"价格",
		dataIndex:"price",
		width : 120,
		 columnType:"numberfield",
		field:{
			 xtype:"numberfield",
		      decimalPrecision:3,
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'价格必填',
		allowBlank : false,
		  hideTrigger : false
		}
	}
, {
		text:"购买数量",
		dataIndex:"count",
		width : 120,
	}
, {
		text:"金额",
		dataIndex:"acount",
		width : 120,
		 columnType:"numberfield",
		field:{
			 xtype:"numberfield",
		      decimalPrecision:3,
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'金额必填',
		allowBlank : false,
		  hideTrigger : false
		}
	}
	
	 ],
	store:"core.bl.order.store.OrderItemStore",
	bbar:{
		xtype:'pagingtoolbar',
		store:"core.bl.order.store.OrderItemStore",
		dock:'bottom',
		displayInfo:true
	}
});