Ext.define("core.bl.fbd.view.FeedbackGrid", {
	extend : "core.app.base.BaseGrid",
	alias : "widget.bl.feedbackGrid",
	tbar:[
	  	{xtype:'button',text:'添加',ref:'gridInsertF',iconCls:'table_add'},
		{xtype:'button',text:'添加',ref:'gridInsert',iconCls:'table_add',hidden:true},
		{xtype:'button',text:'查看详细信息',ref:'gridEdit',iconCls:'table_edit',disabled:true},
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
		dataIndex:"fbid",
		hidden:true
	}
, {
		text:"反馈用户",
		dataIndex:"username",
		width : 220,
		 columnType:"textfield",
		field:{
			 xtype:"textfield",
		allowBlank : true,
		  hideTrigger : false
		}
	},
{
	text:"反馈时间",
	dataIndex:"fbtime",
	width : 220,
	 columnType:"textfield",
}

, {
		text:"反馈信息",
		dataIndex:"msg",
		width : 620,
		 columnType:"textfield",
		field:{
			 xtype:"textfield",
		allowBlank : true,
		  hideTrigger : false
		}
	}
	
	 ],
	store:"core.bl.fbd.store.FeedbackStore",
	bbar:{
		xtype:'pagingtoolbar',
		store:"core.bl.fbd.store.FeedbackStore",
		dock:'bottom',
		displayInfo:true
	}
});