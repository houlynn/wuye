Ext.define("core.bl.offinc.view.MassageGrid", {
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
		dataIndex:"msgContext",
		width : 620,
		 columnType:"textfield",
	}
, {
		text:"评论时间",
		dataIndex:"backtime",
		width : 120,
		 columnType:"textfield"
	}
, {
		text:"回复账号账号",
		dataIndex:"username",
		width : 120,
		 columnType:"textfield"
	}
	
	 ],
	store:"core.bl.offinc.store.MassageStore",
	bbar:{
		xtype:'pagingtoolbar',
		store:"core.bl.offinc.store.MassageStore",
		dock:'bottom',
		displayInfo:true
	}
});