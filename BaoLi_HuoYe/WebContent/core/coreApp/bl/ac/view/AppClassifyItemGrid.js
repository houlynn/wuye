Ext.define("core.bl.ac.view.AppClassifyItemGrid", {
	extend : "core.app.base.BaseGrid",
	alias : "widget.bl.appClassifyItemGrid",
	tbar:[
			{xtype:'button',text:'添加',ref:'gridAcItem',iconCls:'table_add'},
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
		dataIndex:"itemid",
		hidden:true
	}
, {
		text:"分类名称",
		dataIndex:"itemName",
		width : 320,
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
		width : 320,
		 columnType:"textfield",
		 renderer:function(value,data,record){
				return "<a href='"+value+"' target='_blank'>附件下载</a>";
			}
	}
	
	 ],
	store:"core.bl.ac.store.AppClassifyItemStore",
});