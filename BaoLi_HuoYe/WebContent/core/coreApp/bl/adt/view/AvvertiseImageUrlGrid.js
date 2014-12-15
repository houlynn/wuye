Ext.define("core.bl.adt.view.AvvertiseImageUrlGrid", {
	extend : "core.app.base.BaseGrid",
	alias : "widget.bl.avvertiseImageUrlGrid",
	tbar : [ {
		xtype : 'button',
		text : '上传图片',
		ref : 'gridUpload',
		iconCls : 'table_add'
	}, {
		xtype : 'button',
		text : '删除',
		ref : 'gridDelete',
		iconCls : 'table_remove'
	}, ],
	columns : [ {
		xtype : "rownumberer",
		width : 35,
		text : 'No.',
		align : 'center'
	}, {
		text : "主键",
		dataIndex : "id",
		hidden : true
	}, {
		text : "链接路径",
		dataIndex : "url",
		width : 420,
		columnType : "textfield",
		 renderer:function(value,data,record){
				return "<a href='"+value+"'>附件下载</a>";
			}
	}

	],
	store : "core.bl.adt.store.AvvertiseImageUrlStore",
});