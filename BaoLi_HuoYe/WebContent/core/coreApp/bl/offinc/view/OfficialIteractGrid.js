Ext.define("core.bl.offinc.view.OfficialIteractGrid", {
	extend : "core.app.base.BaseGrid",
	alias : "widget.bl.officialIteractGrid",
	tbar : [ {
		xtype : 'button',
		text : '添加',
		ref : 'gridInsertF',
		iconCls : 'table_add'
	}, {
		xtype : 'button',
		text : '编辑',
		ref : 'gridEdit',
		iconCls : 'table_edit',
		disabled : true
	}, {
		xtype : 'button',
		text : '删除',
		ref : 'gridDelete',
		iconCls : 'table_remove'
	}, {
		xtype : 'button',
		text : '发布',
		ref : 'gidePush',
		iconCls : 'table_save'
	} ],
	columns : [
			{
				xtype : "rownumberer",
				width : 35,
				text : 'No.',
				align : 'center'
			},
			{
				text : "主键",
				dataIndex : "oinerid",
				hidden : true
			},
			{
				text : "分类",
				dataIndex : "type",
				width : 80,
				columnType : "basecombobox",
				ddCode : "INCATYPE",
			},
			{
				text : "标题",
				dataIndex : "title",
				width : 650,
				columnType : "textfield"
			},
			{
				text : "发帖人",
				dataIndex : "username",
				width : 120,
				columnType : "basecombobox",
				ddCode : "ENDUSER",
			},
			{
				text : "发布状态",
				dataIndex : "state",
				width : 120,
				columnType : "textfield",
				ddCode : "ISPOST",
				renderer : function(value, data, record) {
					if (value) {
						if ("1" == value) {
							value = "<span style='color:red;font-weight:bold'>已发布</span>";
						}
					} else {
						value = "<span style='color:green;font-weight:bold'>未发布</span>";
					}
					  return value;
				}
               
			},
			{
				text : "发布时间",
				dataIndex : "ptime",
				width : 120
			}

	],
	store : "core.bl.offinc.store.OfficialIteractStore",
	bbar : {
		xtype : 'pagingtoolbar',
		store : "core.bl.offinc.store.OfficialIteractStore",
		dock : 'bottom',
		displayInfo : true
	}
});