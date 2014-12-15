Ext.define("core.bl.av.view.AppVersionForm", {
	extend : "core.app.base.BaseForm",
	alias : "widget.bl.appVersionForm",
	items : [ {
		fieldLabel : "主键",
		name : "id",
		hidden : true
	}
 ,
 {
		fieldLabel:"应用名称",
		name:"versonName",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'应用名称必填',
		allowBlank : false,
		xtype:"textfield"
   }
 ,
 {
		fieldLabel:"版本号",
		name:"versonCode",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'版本号必填',
		allowBlank : false,
		xtype:"textfield"
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
		fieldLabel:"发布时间",
		name:"uptime",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'发布时间必填',
		allowBlank : false,
		xtype:"datetimefield"
   }
 ,
 {
		fieldLabel:"下载地址",
		name:"downloadUrl",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'下载地址必填',
		allowBlank : false,
		xtype:"textfield"
   }
 ,
 {
		fieldLabel:"发布组织",
		name:"publishCy",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'发布组织必填',
		allowBlank : false,
		xtype:"textfield"
   }
	]
});