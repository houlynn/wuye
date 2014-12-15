Ext.define("core.bl.renimg.view.RentalImgGrid", {
	extend : "core.app.base.BaseGrid",
	alias : "widget.bl.rentalImgGrid",
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
		dataIndex:"imgid",
		hidden:true
	}
, {
		text:"图片",
		dataIndex:"url",
		width : 120,
		 columnType:"textfield",
		field:{
			 xtype:"textfield",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'图片必填',
		allowBlank : false,
		  hideTrigger : false
		}
	}
	
	 ],
	store:"core.bl.renimg.store.RentalImgStore",
	bbar:{
		xtype:'pagingtoolbar',
		store:"core.bl.renimg.store.RentalImgStore",
		dock:'bottom',
		displayInfo:true
	}
});