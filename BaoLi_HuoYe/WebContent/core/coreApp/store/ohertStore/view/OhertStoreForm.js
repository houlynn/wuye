Ext.define("core.store.ohertStore.view.OhertStoreForm", {
	extend : "core.app.base.BaseForm",
	alias : "widget.store.ohertStoreForm",
	items : [ {
		fieldLabel : "主键",
		name : "osId",
		hidden : true
	}
 ,
 {
		fieldLabel:"仓库",
		name:"warehouse",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'仓库必填',
		allowBlank : false,
		ddCode:"WAREHOUSE",
		xtype:"basecombobox"
   }
 ,
 {
		fieldLabel:"货品名称",
		name:"productId",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'货品名称必填',
		allowBlank : false,
		ddCode:"PRODUCT",
		xtype:"basecombobox"
   }
 ,
 {
		fieldLabel:"数目",
		name:"quantity",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'数目必填',
		allowBlank : false,
		decimalPrecision:3,
		hideTrigger : true,
		emptyText :'请输输入小数',
		xtype:"textfield"
   }
 ,
 {
		fieldLabel:"库存类型",
		name:"storeType",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'库存类型必填',
		allowBlank : false,
		ddCode:"OHTERWINSTORE",
		xtype:"basecombobox"
   }
 ,
 {
		fieldLabel:"备注",
		name:"remark",
		allowBlank : true,
		xtype:"textfield"
   }
	]
});