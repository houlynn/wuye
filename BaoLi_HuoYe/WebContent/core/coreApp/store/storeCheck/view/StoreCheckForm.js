Ext.define("core.store.storeCheck.view.StoreCheckForm", {
	extend : "core.app.base.BaseForm",
	alias : "widget.store.storeCheckForm",
	items : [ {
		fieldLabel : "主键",
		name : "sckeckId",
		hidden : true
	}
 ,
 {
		fieldLabel:"盘点日期",
		name:"checkPeriod",
		allowBlank : true,
		xtype:"datetimefield"
   }
 ,
 {
		fieldLabel:"仓库",
		name:"warehouse",
		allowBlank : true,
		ddCode:" WAREHOUSE",
		xtype:"basecombobox"
   }
 ,
 {
		fieldLabel:"货品",
		name:"productId",
		allowBlank : true,
		ddCode:"PRODUCT",
		xtype:"basecombobox"
   }
 ,
 {
		fieldLabel:"实际数量",
		name:"quantity",
		allowBlank : true,
		decimalPrecision:3,
		hideTrigger : true,
		emptyText :'请输输入小数',
		xtype:"numberfield"
   }
 ,
 {
		fieldLabel:"系统计算数量",
		name:"checkQty",
		allowBlank : true,
		decimalPrecision:3,
		hideTrigger : true,
		emptyText :'请输输入小数',
		xtype:"numberfield"
   }
 ,
 {
		fieldLabel:"操作时间",
		name:"createTime",
		allowBlank : true,
		xtype:"textfield"
   }
 ,
 {
		fieldLabel:"经办人",
		name:"endUid",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'经办人必填',
		allowBlank : false,
		ddCode:"ENDUSER",
		xtype:"basecombobox"
   }
 ,
 {
		fieldLabel:"备注",
		name:"meno",
		allowBlank : true,
		xtype:"textfield"
   }
	]
});