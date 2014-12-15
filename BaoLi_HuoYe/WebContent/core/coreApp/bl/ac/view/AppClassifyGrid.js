Ext.define("core.bl.ac.view.AppClassifyGrid", {
	extend : "core.app.base.BaseGrid",
	alias : "widget.bl.appClassifyGrid",
	tbar:[
			{xtype:'button',text:'添加',ref:'gridUpload',iconCls:'table_add'},
			{xtype:'button',text:'删除',ref:'gridDelete',iconCls:'table_remove'},
			{xtype:'button',text:'保存',ref:'gridSave',iconCls:'table_save'},
			{xtype:'button',text:'编辑',ref:'gridEdit',iconCls:'table_edit',disabled:true},
			
			
		],
	columns : [{
		xtype:"rownumberer",
		width : 35,
		text :'No.',
		align : 'center'
	},{
		text:"主键",
		dataIndex:"cid",
		hidden:true
	}
, {
		text:"分类名称",
		dataIndex:"classify",
		width : 300,
		 columnType:"textfield",
		field:{
			 xtype:"textfield",
		allowBlank : true,
		  hideTrigger : false
		}
	}
, {
		text:"图片链接地址",
		dataIndex:"imgurl",
		width : 300,
		 columnType:"textfield",
		 renderer:function(value,data,record){
				return "<a href='"+value+"' target='_blank'>附件下载</a>";
			}
},{

	text:"区分类型",
	dataIndex:"typeCode",
	width : 200,
	columnType:"basecombobox",
	ddCode:"ROUNDTYPE",
	field:{
		xtype:"basecombobox",
		ddCode:"ROUNDTYPE"
	}
}
	
	 ],
	store:"core.bl.ac.store.AppClassifyStore",
	bbar:{
		xtype:'pagingtoolbar',
		store:"core.bl.ac.store.AppClassifyStore",
		dock:'bottom',
		displayInfo:true
	}
});