Ext.define("core.bl.inc.view.InteractGrid", {
	extend : "core.app.base.BaseGrid",
	alias : "widget.bl.interactGrid",
	tbar : [ {
		xtype : 'button',
		text : '添加',
		ref : 'gridInsertF',
		iconCls : 'table_add',
		hidden:true
	}, {
		xtype : 'button',
		text : '浏览',
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
		iconCls : 'table_save',
		hidden:true
	} ],
	columns : [{
		xtype:"rownumberer",
		width : 35,
		text :'No.',
		align : 'center'
	},{
		text:"主键",
		dataIndex:"hId",
		hidden:true
	}
, {
		text:"发表用户",
		dataIndex:"username",
		width : 120,
		 columnType:"textfield",
	}
, {
		text:"所属分类",
		dataIndex:"type",
		width : 100,
	   columnType:"basecombobox",
	  ddCode:"INCTYPE",
	}
, {
		text:"标题",
		dataIndex:"title",
		width : 320,
		columnType:"textfield",
	    hidden:true
	}
, {
		text:"内容",
		dataIndex:"interactContent",
		width : 720,
		 columnType:"textfield",
		 renderer:function(value,data,record){
			return Ext.util.Format.ellipsis(value,900);
		 }
	},
	{
		text:"发布时间",
		dataIndex:"ptime",
		width:90
		
	}
	
	 ],
	store:"core.bl.inc.store.InteractStore",
	bbar:{
		xtype:'pagingtoolbar',
		store:"core.bl.inc.store.InteractStore",
		dock:'bottom',
		displayInfo:true
	}
});

