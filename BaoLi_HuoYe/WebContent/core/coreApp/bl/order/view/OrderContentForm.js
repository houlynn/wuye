Ext.define("core.bl.order.view.OrderContentForm", {
	extend : "core.app.base.BaseForm",
	alias : "widget.bl.orderContentForm",
	items : [ {
		fieldLabel : "主键",
		name : "ordid",
		hidden : true
	}
 ,
 {
		fieldLabel:"购买用户",
		name:"userid",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'购买用户必填',
		allowBlank : false,
		xtype:"textfield"
   }
 ,
 {
		fieldLabel:"送货地址",
		name:"adressid",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'送货地址必填',
		allowBlank : false,
		xtype:"textfield"
   }
 ,
 {
		fieldLabel:"下单时间",
		name:"ordertime",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'下单时间必填',
		allowBlank : false,
		xtype:"datetimefield"
   }
 ,
 {
		fieldLabel:"备注",
		name:"remarks",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'备注必填',
		allowBlank : false,
		xtype:"textfield"
   }
 ,
 {
		fieldLabel:"金额",
		name:"acount",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'金额必填',
		allowBlank : false,
		decimalPrecision:3,
		hideTrigger : false,
		emptyText :'请输输入小数',
		xtype:"textfield"
   }
 ,
 {
		fieldLabel:"支付状态",
		name:"ispay",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'支付状态必填',
		allowBlank : false,
		ddCode:"",
		xtype:"basecombobox"
   },
   {
		xtype:"tabpanel",
		columnWidth : 1,
		menuAlign:"center",
		items:[{
			title:'<center height=40>订单明细</center>',
			xtype:"bl.orderItemPanel",
			height:comm.get("resolutionHeight")*0.28
		}],
		tabConfig  : {//标签配置参数
		}
   }
			
	]
});