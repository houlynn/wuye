Ext.define("core.bl.inc.view.MassageGrid", {
	extend : "core.app.base.BaseGrid",
	alias : "widget.bl.massageGrid",
	tbar:[
			{xtype:'button',text:'删除',ref:'gridDelete',iconCls:'table_remove'},
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
		width : 620,
		 columnType:"textfield",
		field:{
			 xtype:"textfield",
		allowBlank : true,
		  hideTrigger : false
		}
	}, {
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
		text:"回复用户",
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
	store:"core.bl.inc.store.MassageStore",
	bbar:{
		xtype:'pagingtoolbar',
		store:"core.bl.inc.store.MassageStore",
		dock:'bottom',
		displayInfo:true
	}
});