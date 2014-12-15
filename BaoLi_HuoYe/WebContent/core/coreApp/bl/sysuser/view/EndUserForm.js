Ext.define("core.bl.sysuser.view.EndUserForm", {
	extend : "core.app.base.BaseForm",
	alias : "widget.bl.endUserForm",
	items : [ {
		fieldLabel : "主键",
		name : "userId",
		hidden : true
	}
 ,
 {
		fieldLabel:"用户姓名",
		name:"username",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'用户姓名必填',
		allowBlank : false,
		xtype:"textfield"
   }
 ,
 {
		fieldLabel:"登陆账号",
		name:"userCode",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'登陆账号必填',
		allowBlank : false,
		xtype:"textfield"
   }
 ,
 {
		fieldLabel:"密码",
		name:"password",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'密码必填',
		allowBlank : false,
		xtype:"textfield",
   }
 ,
 {
		fieldLabel:"性别",
		name:"sex",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'性别必填',
		allowBlank : false,
		ddCode:"SEX",
		xtype:"basecombobox"
   }
 ,
 {
		fieldLabel:"出生日期",
		name:"birthday",
		allowBlank : true,
		dateType:'date',
		xtype:"datetimefield"
   }
	]
});