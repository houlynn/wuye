Ext.define("core.store.purchase.view.PurchaseContentForm", {
	extend : "core.app.base.BaseForm",
	alias : "widget.store.purchaseContentForm",
	items : [ {
		fieldLabel : "主键",
		name : "purid",
		hidden : true
	}
 ,
 {
		fieldLabel:"进货日期",
		name:"purchaseDate",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'进货日期必填',
		allowBlank : false,
		xtype:"datetimefield",
		dateType : 'date'
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
		fieldLabel:"仓库",
		name:"wareHouse",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'仓库必填',
		allowBlank : false,
		ddCode:"WAREHOUSE",
		xtype:"basecombobox"
   }
 ,
 {
		fieldLabel:"供应商",
		name:"provider",
		xtype:"textfield"
   }
 ,
 {
	 fieldLabel : "备注",
		name : "remark",
		allowBlank : true,
		allowBlank : true,
		xtype : "textareafield",
		height:30,
		columnWidth : 1
   },  {
		xtype : "tabpanel",
		columnWidth : 1,
		menuAlign : "center",
		items : [ {
			title : '<center height=40>进货详细信息</center>',
			xtype : "store.purchaseItemPanel",
			height : comm.get("resolutionHeight") * 0.45,
		} ],
		tabConfig : {// 标签配置参数

		}}
	]
});