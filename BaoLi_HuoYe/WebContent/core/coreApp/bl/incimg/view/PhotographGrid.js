Ext.define("core.bl.incimg.view.PhotographGrid", {
	extend : "core.app.base.BaseGrid",
	alias : "widget.bl.photographGrid",
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
		dataIndex:"pId",
		hidden:true
	}
, {
		text:"图片链接地址",
		dataIndex:"imgurl",
		width : 120,
		 columnType:"textfield",
		field:{
			 xtype:"textfield",
		allowBlank : true,
		  hideTrigger : false
		}
	}
	
	 ],
	store:"core.bl.incimg.store.PhotographStore",
	bbar:{
		xtype:'pagingtoolbar',
		store:"core.bl.incimg.store.PhotographStore",
		dock:'bottom',
		displayInfo:true
	}
});