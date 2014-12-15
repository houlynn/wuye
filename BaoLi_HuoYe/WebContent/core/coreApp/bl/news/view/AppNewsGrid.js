Ext.define("core.bl.news.view.AppNewsGrid", {
	extend : "core.app.base.BaseGrid",
	alias : "widget.bl.appNewsGrid",
	tbar:[
			{xtype:'button',text:'添加',ref:'gridInsertF',iconCls:'table_add'},
			{xtype:'button',text:'编辑',ref:'gridEdit',iconCls:'table_edit',disabled:true},
			{xtype:'button',text:'删除',ref:'gridDelete',iconCls:'table_remove'},
			{xtype:'button',text:'保存',ref:'gridSave',iconCls:'table_save'},
			{xtype:'button',text:'发布信息',ref:'gridPush',iconCls:'table_save'}
		],
	columns : [{
		xtype:"rownumberer",
		width : 35,
		text :'No.',
		align : 'center'
	},{
		text:"主键",
		dataIndex:"newid",
		hidden:true
	}
, {
		text:"标题",
		dataIndex:"title",
		width : 490,
		 columnType:"textfield",
	}
, {
		text:"来源",
		dataIndex:"source",
		width : 150,
		 columnType:"textfield",
	}
, {
		text:"缩略图",
		dataIndex:"shrinkimg",
		width : 120,
		columnType:"textfield",
		 renderer:function(value,data,record){
				var width=16;
				var height=16;
			 	return "<img src='"+value+"' width="+width+" height="+height+" />";
		 }
	}
, {
		text:"发布时间",
		dataIndex:"adtime",
		width : 150,
		 columnType:"textfield",
	}
, {
		text:"发布状态",
		dataIndex:"state",
		width : 120,
		renderer : function(value, data, record) {
				if ("1" == value) {
					value = "<span style='color:red;font-weight:bold'>已发布</span>";
			} else {
				value = "<span style='color:green;font-weight:bold'>未发布</span>";
			}
			  return value;
		}
	}
	
	 ],
	store:"core.bl.news.store.AppNewsStore",
	bbar:{
		xtype:'pagingtoolbar',
		store:"core.bl.news.store.AppNewsStore",
		dock:'bottom',
		displayInfo:true
	}
});