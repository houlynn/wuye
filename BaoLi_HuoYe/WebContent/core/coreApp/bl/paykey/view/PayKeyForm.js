Ext.define("core.bl.paykey.view.PayKeyForm", {
	extend : "core.app.base.BaseForm",
	alias : "widget.bl.payKeyForm",
	items : [ {
		fieldLabel : "主键",
		name : "pid",
		hidden : true
	}
 ,
 {
		fieldLabel:"帐号人姓名",
		name:"realname",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'帐号人姓名必填',
		allowBlank : false,
		xtype:"textfield"
   }
 ,
 {
		fieldLabel:"帐号",
		name:"payCode",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'帐号必填',
		allowBlank : false,
		xtype:"textfield"
   }
 ,
 {
		fieldLabel:"密钥",
		name:"keyword",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'密钥必填',
		allowBlank : false,
		xtype:"textfield"
   }
 ,
 {
		fieldLabel:"所属小区",
		name:"deptid",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'所属小区必填',
		allowBlank : false,
		xtype:"textfield"
   }
 ,
 {
		fieldLabel:"备注",
		name:"remarks",
		allowBlank : true,
		xtype:"textfield"
   }
	]
});