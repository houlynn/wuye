Ext.define("core.bl.mc.view.MerchantForm", {
	extend : "core.app.base.BaseForm",
	alias : "widget.bl.merchantForm",
	items : [ {
		fieldLabel : "主键",
		name : "merid",
		hidden : true
	}
 ,
 {
		fieldLabel:"商户名称",
		name:"name",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'商户名称必填',
		allowBlank : false,
		xtype:"textfield"
   }
 ,
 {
		fieldLabel:"手机号码",
		name:"phone",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'手机号码必填',
		allowBlank : false,
		xtype:"textfield"
   }
 ,
 {
		fieldLabel:"联系方式",
		name:"homePhone",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'联系方式必填',
		allowBlank : false,
		xtype:"textfield"
   }
 ,
 {
		fieldLabel:"营业时间",
		name:"businesstime",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'营业时间必填',
		allowBlank : false,
		xtype:"textfield"
   }
 ,
 {
		fieldLabel:"服务描述",
		name:"remarks",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'服务描述必填',
		allowBlank : false,
		xtype:"textfield"
   }
 ,
 {
		fieldLabel:"是否上门",
		name:"come",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'是否上门必填',
		allowBlank : false,
		ddCode:"ISCOME",
		xtype:"basecombobox"
   }
 ,
 {
		fieldLabel:"营业执照",
		name:"cardid",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'营业执照必填',
		allowBlank : false,
		xtype:"textfield"
   }
 ,
 {
		fieldLabel:"申请用户id",
		name:"userid",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'申请用户id必填',
		allowBlank : false,
		xtype:"textfield"
   }
 ,
 {
		fieldLabel:"用户名",
		name:"username",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'用户名必填',
		allowBlank : false,
		xtype:"textfield"
   }
 ,
 {
		fieldLabel:"审核状态",
		name:"audit",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'审核状态必填',
		allowBlank : false,
		ddCode:"AUDIT",
		xtype:"basecombobox"
   }
 ,
 {
		fieldLabel:"审核时间",
		name:"audittiem",
		allowBlank : true,
		xtype:"datetimefield"
   }
 ,
 {
		fieldLabel:"申请时间",
		name:"applytime",
		allowBlank : true,
		xtype:"datetimefield"
   }
	]
});