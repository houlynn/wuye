Ext.define("core.store.storeCheck.view.StoreCheckGrid", {
	extend : "core.app.base.BaseGrid",
	alias : "widget.store.storeCheckGrid",
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
		dataIndex:"sckeckId",
		hidden:true
	}
, {
		text:"盘点日期",
		dataIndex:"checkPeriod",
		width : 120,
		 columnType:"textfield",
		field:{
			 xtype:"datetimefield",
		  hideTrigger : true
		}
	}
, {
		text:"仓库",
		dataIndex:"warehouse",
		width : 120,
		 columnType:"basecombobox",
	  ddCode:" WAREHOUSE",
		field:{
			 xtype:"basecombobox",
			ddCode:" WAREHOUSE",
		  hideTrigger : true
		}
	}
, {
		text:"货品",
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
		text:"实际数量",
		dataIndex:"quantity",
		width : 120,
		 columnType:"numberfield",
		field:{
			 xtype:"numberfield",
		      decimalPrecision:3,
		  hideTrigger : true
		}
	}
, {
		text:"系统计算数量",
		dataIndex:"checkQty",
		width : 120,
		 columnType:"numberfield",
		field:{
			 xtype:"numberfield",
		      decimalPrecision:3,
		  hideTrigger : true
		}
	}
, {
		text:"操作时间",
		dataIndex:"createTime",
		width : 120,
		 columnType:"textfield",
		field:{
			 xtype:"textfield",
		  hideTrigger : true
		}
	}
, {
		text:"经办人",
		dataIndex:"endUid",
		width : 120,
		 columnType:"basecombobox",
	  ddCode:"ENDUSER",
		field:{
			 xtype:"basecombobox",
			ddCode:"ENDUSER",
		  hideTrigger : true
		}
	}
, {
		text:"备注",
		dataIndex:"meno",
		width : 120,
		 columnType:"textfield",
		field:{
			 xtype:"textfield",
		  hideTrigger : true
		}
	}
	
	 ],
	store:"core.store.storeCheck.store.StoreCheckStore",
	bbar:{
		xtype:'pagingtoolbar',
		store:"core.store.storeCheck.store.StoreCheckStore",
		dock:'bottom',
		displayInfo:true
	}
});