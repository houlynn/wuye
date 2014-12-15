Ext.define("core.bl.av.view.AppVersionGrid", {
	extend : "core.app.base.BaseGrid",
	alias : "widget.bl.appVersionGrid",
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
		dataIndex:"id",
		hidden:true
	}
, {
		text:"应用名称",
		dataIndex:"versonName",
		width : 120,
		 columnType:"textfield",
		field:{
			 xtype:"textfield",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'应用名称必填',
		allowBlank : false,
		  hideTrigger : false
		}
	}
, {
		text:"版本号",
		dataIndex:"versonCode",
		width : 120,
		 columnType:"textfield",
		field:{
			 xtype:"textfield",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'版本号必填',
		allowBlank : false,
		  hideTrigger : false
		}
	}

, {
		text:"发布时间",
		dataIndex:"uptime",
		width : 120,
		 columnType:"textfield",
		field:{
			 xtype:"datetimefield",
		      dateType:"date",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'发布时间必填',
		allowBlank : false,
		  hideTrigger : false
		}
	}
, {
		text:"下载地址",
		dataIndex:"downloadUrl",
		width : 220,
		 columnType:"textfield",
		field:{
			 xtype:"textfield",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'下载地址必填',
		allowBlank : false,
		  hideTrigger : false
		}
	}
, {
		text:"发布组织",
		dataIndex:"publishCy",
		width : 120,
		 columnType:"textfield",
		field:{
			 xtype:"textfield",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'发布组织必填',
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
	beforeLabelTextTpl : comm.get('required'),
	emptyText :'备注必填',
	allowBlank : false,
	  hideTrigger : false
	}
}
	
	 ],
	store:"core.bl.av.store.AppVersionStore",
	bbar:{
		xtype:'pagingtoolbar',
		store:"core.bl.av.store.AppVersionStore",
		dock:'bottom',
		displayInfo:true
	}
});