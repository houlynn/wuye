Ext.define("core.bl.appu.view.AppUserForm", {
	extend : "core.app.base.BaseForm",
	alias : "widget.bl.appUserForm",
	items : [ {
		fieldLabel : "主键",
		name : "userid",
		hidden : true
	}
 ,
 {
		fieldLabel:"用户名",
		name:"username",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'请填入用户名',
		allowBlank : false,
		xtype:"textfield"
   }
 ,
 {
		fieldLabel:"登录帐号",
		name:"loginCode",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'请输入登录帐号',
		allowBlank : false,
		xtype:"textfield"
   }
 ,
 {
		fieldLabel:"登录密码",
		name:"pwd",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'请输入登录密码',
		allowBlank : false,
		xtype:"textfield"
   }
 ,
 {
		fieldLabel:"身份证",
		name:"idcar",
		emptyText :'请输入身份证',
		xtype:"textfield"
   }
 ,
 {
		fieldLabel:"性别",
		name:"sex",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'请选择性别',
		allowBlank : false,
		xtype:"basecombobox",
		ddCode : "SEX",
   }
 ,
 {
		fieldLabel:"城市",
		name:"city",
		emptyText :'请填入城市',
		xtype:"textfield"
   }
 ,
 {
		fieldLabel:"QQ",
		name:"qq",
		emptyText :'QQ',
		xtype:"textfield"
   }
 ,
 {
		fieldLabel:"email",
		name:"email",
		emptyText :'email',
		xtype:"textfield"
   }
 ,
 {
		fieldLabel:"手机",
		name:"phone",
		emptyText :'手机必填',
		xtype:"textfield"
   }
 ,
 {
		fieldLabel:"联系电话",
		name:"hoemPhone",
		emptyText :'联系电话',
		xtype:"textfield"
   }
 ,
 {
		fieldLabel:"是否业主",
		name:"owner",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'是否业主必填',
		allowBlank : false,
		ddCode:"ISOWNER",
		xtype:"basecombobox"
   },
 {
		fieldLabel:"房产信息",
		name:"house",
		emptyText :'房产信息必填',
		xtype:"textfield"
   }
   ,
   {
  		fieldLabel:"备注",
  		name:"remarks",
  		emptyText :'备注',
  	  　columnWidth:1,
  		xtype:"textfield"
     }
 ,
 {
		fieldLabel:"用户头像",
		name:"topUrl",
		xtype:"filefield",
		id:"topUrl"
   }
        
	],
	tbar:[
			{xtype:"button",text:"保存",ref:"formSaveUser",iconCls:"table_save"},
			{xtype:"button",text:"返回",ref:"formReturn",iconCls:"return"}
			]
});