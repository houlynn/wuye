Ext.define("core.bl.sell.view.RentalImgGrid", {
	extend : "core.app.base.BaseGrid",
	alias : "widget.bl.sellImgGrid",
	id:"sell_imgGid",
	tbar:[
			{xtype:'button',text:'删除',ref:'gridDelete',iconCls:'table_remove'},
			 {xtype:'button',text:'上传图片',ref:'gridUpload',iconCls:'table_add'},
		],
	columns : [{
		xtype:"rownumberer",
		width : 35,
		text :'No.',
		align : 'center'
	},{
		text:"主键",
		dataIndex:"imgid",
		hidden:true
	}
, {
		text:"图片",
		dataIndex:"url",
		width : 620,
		 columnType:"textfield",
		 renderer:function(value,data,record){
				return "<img src='"+value+"' />"; 
		 }
	}
	
	 ],
	store:"core.bl.sell.store.RentalImgStore",
	bbar:{
		xtype:'pagingtoolbar',
		store:"core.bl.sell.store.RentalImgStore",
		dock:'bottom',
		displayInfo:true
	}
});