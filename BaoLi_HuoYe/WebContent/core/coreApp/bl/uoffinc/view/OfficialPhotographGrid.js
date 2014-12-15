Ext.define("core.bl.uoffincimg.view.OfficialPhotographGrid", {
	extend : "core.app.base.BaseGrid",
	alias : "widget.bl.officialPhotographGrid",
	tbar:[
			{xtype:'button',text:'添加',ref:'gridInsert',iconCls:'table_add'},
			{xtype:'button',text:'删除',ref:'gridDelete',iconCls:'table_remove'},
			 {xtype:'button',text:'上传商品图片',ref:'gridUpload',iconCls:'table_add'},
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
		text:"图片链接地址",
		dataIndex:"imgurl",
		width : 500,
		 columnType:"textfield",
		 renderer:function(value,data,record){
				return "<img src='"+value+"' />"; 
		 }
	}
	
	 ],
	store:"core.bl.offincimg.store.OfficialPhotographStore",
	bbar:{
		xtype:'pagingtoolbar',
		store:"core.bl.offincimg.store.OfficialPhotographStore",
		dock:'bottom',
		displayInfo:true
	}
});