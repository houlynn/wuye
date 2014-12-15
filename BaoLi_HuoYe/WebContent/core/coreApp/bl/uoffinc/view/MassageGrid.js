Ext.define("core.bl.uoffinc.view.MassageGrid", {
	extend : "core.app.base.BaseGrid",
	alias : "widget.bl.umassageGrid",
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
		dataIndex:"msgid",
		hidden:true
	}
, {
		text:"回复内容",
		dataIndex:"context",
		width : 120,
		 columnType:"textfield",
		field:{
			 xtype:"textfield",
		allowBlank : true,
		  hideTrigger : false
		}
	}
, {
		text:"帖子ID",
		dataIndex:"inid",
		width : 120,
		 columnType:"textfield",
		field:{
			 xtype:"textfield",
		allowBlank : true,
		  hideTrigger : false
		}
	}
, {
		text:"评论时间",
		dataIndex:"backtime",
		width : 120,
		 columnType:"textfield",
		field:{
			 xtype:"textfield",
		allowBlank : true,
		  hideTrigger : false
		}
	}
, {
		text:"用户id",
		dataIndex:"userid",
		width : 120,
		 columnType:"textfield",
		field:{
			 xtype:"textfield",
		allowBlank : true,
		  hideTrigger : false
		}
	}
	
	 ],
	store:"core.bl.uoffinc.store.MassageStore",
	bbar:{
		xtype:'pagingtoolbar',
		store:"core.bl.uoffinc.store.MassageStore",
		dock:'bottom',
		displayInfo:true
	}
});