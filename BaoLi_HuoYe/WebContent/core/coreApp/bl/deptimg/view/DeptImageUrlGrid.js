Ext.define("core.bl.deptimg.view.DeptImageUrlGrid", {
	extend : "core.app.base.BaseGrid",
	alias : "widget.bl.deptImageUrlGrid",
	tbar:[
			{xtype:'button',text:'上传图图片',ref:'gridUpload',iconCls:'table_add'},
			{xtype:'button',text:'删除',ref:'gridDelete',iconCls:'table_remove'},
			{xtype:'button',text:'修改',ref:'gridSave',iconCls:'table_save'}
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
		text:"描述信息",
		dataIndex:"remarks",
		width : 220,
		 columnType:"textfield",
		field:{
			 xtype:"textfield",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'描述信息必填',
		allowBlank : false,
		  hideTrigger : false
		}
	}
, {
		text:"链接路径",
		dataIndex:"url",
		width : 320,
		columnType:"textfield",
		 renderer:function(value,data,record){
				return "<a href='"+value+"' target='_blank'>附件下载</a>";
			}
	}
	
	 ],
	store:"core.bl.deptimg.store.DeptImageUrlStore",
	bbar:{
		xtype:'pagingtoolbar',
		store:"core.bl.deptimg.store.DeptImageUrlStore",
		dock:'bottom',
		displayInfo:true
	}
});