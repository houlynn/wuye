Ext.define("core.store.ohertStore.view.OhertStoreGrid", {
	extend : "core.app.base.BaseGrid",
	alias : "widget.store.ohertStoreGrid",
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
		dataIndex:"osId",
		hidden:true
	}
, {
		text:"仓库",
		dataIndex:"warehouse",
		width : 120,
		 columnType:"basecombobox",
	  ddCode:"WAREHOUSE",
		field:{
			 xtype:"basecombobox",
			ddCode:"WAREHOUSE",
		  hideTrigger : true
		}
	}
, {
		text:"货品名称",
		dataIndex:"productId",
		width : 120,
		 columnType:"basecombobox",
	  ddCode:"PRODUCT",
		field:{
			 xtype:"basecombobox",
			ddCode:"PRODUCT",
		  hideTrigger : true
		}
	}
, {
		text:"数目",
		dataIndex:"quantity",
		width : 120,
		 columnType:"textfield",
		field:{
			 xtype:"textfield",
		      decimalPrecision:3,
		  hideTrigger : true
		}
	}
, {
		text:"库存类型",
		dataIndex:"storeType",
		width : 120,
		 columnType:"basecombobox",
	  ddCode:"OHTERWINSTORE",
		field:{
			 xtype:"basecombobox",
			ddCode:"OHTERWINSTORE",
		  hideTrigger : true
		}
	}
, {
		text:"备注",
		dataIndex:"remark",
		width : 120,
		 columnType:"textfield",
		field:{
			 xtype:"textfield",
		  hideTrigger : true
		}
	}
	
	 ],
	store:"core.store.ohertStore.store.OhertStoreStore",
	bbar:{
		xtype:'pagingtoolbar',
		store:"core.store.ohertStore.store.OhertStoreStore",
		dock:'bottom',
		displayInfo:true
	}
});