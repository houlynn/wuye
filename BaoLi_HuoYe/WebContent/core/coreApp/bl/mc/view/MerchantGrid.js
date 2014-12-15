Ext.define("core.bl.mc.view.MerchantGrid", {
	extend : "core.app.base.BaseGrid",
	alias : "widget.bl.merchantGrid",
	tbar:[
			{xtype:'button',text:'添加',ref:'gridInsert',iconCls:'table_add'},
			{xtype:'button',text:'删除',ref:'gridDelete',iconCls:'table_remove'},
			{xtype:'button',text:'保存',ref:'gridSave',iconCls:'table_save'}
		],
	columns : [{
		xtype:"rownumberer",
		width : 35,
		text :'No.',
		align : 'center'
	},{
		text:"主键",
		dataIndex:"merid",
		hidden:true
	}
, {
		text:"商户名称",
		dataIndex:"name",
		width : 120,
		 columnType:"textfield",
		field:{
			 xtype:"textfield",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'商户名称必填',
		allowBlank : false,
		  hideTrigger : false
		}
	}
, {
		text:"手机号码",
		dataIndex:"phone",
		width : 120,
		 columnType:"textfield",
		field:{
			 xtype:"textfield",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'手机号码必填',
		allowBlank : false,
		  hideTrigger : false
		}
	}
, {
		text:"联系方式",
		dataIndex:"homePhone",
		width : 120,
		 columnType:"textfield",
		field:{
			 xtype:"textfield",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'联系方式必填',
		allowBlank : false,
		  hideTrigger : false
		}
	}
, {
		text:"营业时间",
		dataIndex:"businesstime",
		width : 120,
		 columnType:"textfield",
		field:{
			 xtype:"textfield",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'营业时间必填',
		allowBlank : false,
		  hideTrigger : false
		}
	}
, {
		text:"服务描述",
		dataIndex:"remarks",
		width : 120,
		 columnType:"textfield",
		field:{
			 xtype:"textfield",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'服务描述必填',
		allowBlank : false,
		  hideTrigger : false
		}
	}
, {
		text:"是否上门",
		dataIndex:"come",
		width : 120,
		 columnType:"basecombobox",
	  ddCode:"ISCOME",
		field:{
			 xtype:"basecombobox",
			ddCode:"ISCOME",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'是否上门必填',
		allowBlank : false,
		  hideTrigger : false
		}
	}
, {
		text:"营业执照",
		dataIndex:"cardid",
		width : 120,
		 columnType:"textfield",
		field:{
			 xtype:"textfield",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'营业执照必填',
		allowBlank : false,
		  hideTrigger : false
		}
	}
, {
		text:"申请用户id",
		dataIndex:"userid",
		width : 120,
		 columnType:"textfield",
		field:{
			 xtype:"textfield",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'申请用户id必填',
		allowBlank : false,
		  hideTrigger : false
		}
	}
, {
		text:"用户名",
		dataIndex:"username",
		width : 120,
		 columnType:"textfield",
		field:{
			 xtype:"textfield",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'用户名必填',
		allowBlank : false,
		  hideTrigger : false
		}
	}
, {
		text:"审核状态",
		dataIndex:"audit",
		width : 120,
		 columnType:"basecombobox",
	  ddCode:"AUDIT",
		field:{
			 xtype:"basecombobox",
			ddCode:"AUDIT",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'审核状态必填',
		allowBlank : false,
		  hideTrigger : false
		}
	}
, {
		text:"审核时间",
		dataIndex:"audittiem",
		width : 120,
		 columnType:"textfield",
		field:{
			 xtype:"datetimefield",
		      dateType:"date",
		allowBlank : true,
		  hideTrigger : false
		}
	}
, {
		text:"申请时间",
		dataIndex:"applytime",
		width : 120,
		 columnType:"textfield",
		field:{
			 xtype:"datetimefield",
		      dateType:"date",
		allowBlank : true,
		  hideTrigger : false
		}
	}
	
	 ],
	store:"core.bl.mc.store.MerchantStore",
	bbar:{
		xtype:'pagingtoolbar',
		store:"core.bl.mc.store.MerchantStore",
		dock:'bottom',
		displayInfo:true
	}
});