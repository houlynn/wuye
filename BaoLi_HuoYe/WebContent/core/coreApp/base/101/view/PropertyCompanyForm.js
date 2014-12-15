Ext.define("core.base.101.view.PropertyCompanyForm", {
	extend : "core.app.base.BaseForm",
	alias : "widget.base.propertyCompanyForm",
	items : [ {
		fieldLabel : "主键",
		name : "tf_proid",
		hidden : true
	}
 ,
 {
		fieldLabel:"物业公司名称",
		name:"tf_name",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'物业公司名称必填',
		allowBlank : false,
		xtype:"textfield"
   }
 ,
 {
		fieldLabel:"法人代表",
		name:"tf_corporate",
		allowBlank : true,
		xtype:"textfield"
   }
 ,
 {
		fieldLabel:"联系人",
		name:"tf_contact",
		allowBlank : true,
		xtype:"textfield"
   }
 ,
 {
		fieldLabel:"联系电话",
		name:"tf_phone",
		allowBlank : true,
		xtype:"textfield"
   }
 ,
 {
		fieldLabel:"联系地址",
		name:"tf_address",
		allowBlank : true,
		xtype:"textfield"
   }
	]
});