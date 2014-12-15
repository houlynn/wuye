Ext.define("core.bl.inc.view.PhotographGrid", {
	extend : "core.app.base.BaseGrid",
	alias : "widget.bl.photographGrid",
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
		dataIndex:"iimgid",
		hidden:true
	}
, {
		text:"用户图片",
		dataIndex:"imgurl",
		width : 500,
		 columnType:"textfield",
		 renderer:function(value,data,record){
				return "<img src='"+value+"' />"; 
		 }
	}
	
	 ],
	store:"core.bl.inc.store.PhotographStore",
	bbar:{
		xtype:'pagingtoolbar',
		store:"core.bl.inc.store.PhotographStore",
		dock:'bottom',
		displayInfo:true
	}
});