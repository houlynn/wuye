Ext.define("core.bl.ren.view.RentalImgGrid", {
	extend : "core.app.base.BaseGrid",
	alias : "widget.bl.rentalImgGrid",
	id:"ren_imgGid",
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
	store:"core.bl.ren.store.RentalImgStore",
	bbar:{
		xtype:'pagingtoolbar',
		store:"core.bl.ren.store.RentalImgStore",
		dock:'bottom',
		displayInfo:true
	}
});