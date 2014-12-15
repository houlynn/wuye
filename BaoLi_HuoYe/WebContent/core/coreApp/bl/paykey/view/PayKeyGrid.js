Ext.define("core.bl.paykey.view.PayKeyGrid", {
	extend : "core.app.base.BaseGrid",
	alias : "widget.bl.payKeyGrid",
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
		dataIndex:"pid",
		hidden:true
	}
, {
		text:"帐号人姓名",
		dataIndex:"realname",
		width : 220,
		 columnType:"textfield",
		field:{
			 xtype:"textfield",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'帐号人姓名',
		allowBlank : false,
		  hideTrigger : false
		}
	}
, {
		text:"帐号",
		dataIndex:"payCode",
		width : 320,
		 columnType:"textfield",
		field:{
			 xtype:"textfield",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'帐号',
		allowBlank : false,
		  hideTrigger : false
		}
	}
, {
		text:"密钥",
		dataIndex:"keyword",
		width : 220,
		 columnType:"textfield",
		field:{
			 xtype:"textfield",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'密钥',
		allowBlank : false,
		  hideTrigger : false
		}
	}
, {
		text:"备注",
		dataIndex:"remarks",
		width : 320,
		 columnType:"textfield",
		field:{
			 xtype:"textfield",
		allowBlank : true,
		  hideTrigger : false
		}
	}
	
	 ],
	store:"core.bl.paykey.store.PayKeyStore",
	bbar:{
		xtype:'pagingtoolbar',
		store:"core.bl.paykey.store.PayKeyStore",
		dock:'bottom',
		displayInfo:true
	}
});