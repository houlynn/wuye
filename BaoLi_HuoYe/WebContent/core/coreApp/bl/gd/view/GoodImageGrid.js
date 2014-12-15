Ext.define("core.bl.gd.view.GoodImageGrid", {
	extend : "core.app.base.BaseGrid",
	alias : "widget.bl.goodImageGrid",
	tbar:[
           {xtype:'button',text:'上传商品图片',ref:'gridUpload',iconCls:'table_add'},
			{xtype:'button',text:'删除',ref:'gridDelete',iconCls:'table_remove'},
			{xtype:'button',text:'保存',ref:'gridSave',iconCls:'table_save',hidden:true},
			
		],
	columns : [{
		xtype:"rownumberer",
		width : 35,
		text :'No.',
		align : 'center'
	},{
		text:"主键",
		dataIndex:"igid",
		hidden:true
	}
, {
		text:"图片链接地址",
		dataIndex:"url",
		width : 420,
		 columnType:"textfield",
		 renderer:function(value,data,record){
				return "<img src='"+value+"' />"; 
		 }

	}
	
	 ],
	store:"core.bl.gd.store.GoodImageStore",
	bbar:{
		xtype:'pagingtoolbar',
		store:"core.bl.gd.store.GoodImageStore",
		dock:'bottom',
		displayInfo:true
	}
});