Ext.define("core.bl.vi.view.VirtualIconGrid", {
	extend : "core.app.base.BaseGrid",
	alias : "widget.bl.virtualIconGrid",
	tbar:[
			{xtype:'button',text:'更新',ref:'gridSave',iconCls:'table_save'}
		],
	columns : [{
		xtype:"rownumberer",
		width : 35,
		text :'No.',
		align : 'center'
	},{
		text:"主键",
		dataIndex:"iconid",
		hidden:true
	}
, {
		text:"名称",
		dataIndex:"name",
		width : 120,
		 columnType:"textfield",
	}
, {
		text:"跳转地址",
		dataIndex:"linkUrl",
		width : 520,
		 columnType:"textfield",
		 renderer:function(value,data,record){
			 	return "<a href ='"+value+"'>"+value+"</a>";
		 },
		field:{
			 xtype:"textfield",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'跳转地址必填',
		allowBlank : false,
		  hideTrigger : false
		}
	},
	 {
		text:"发布状态",
		dataIndex:"state",
		width : 120,
		columnType:"basecombobox",
		ddCode:"ISPOST",
		field:{
		 xtype:"basecombobox",
		 ddCode:"ISPOST",
		 beforeLabelTextTpl : comm.get('required'),
		 emptyText :'请选择发布状态',
		 allowBlank : false,
			}
	}
	
	 ],
	store:"core.bl.vi.store.VirtualIconStore",
	bbar:{
		xtype:'pagingtoolbar',
		store:"core.bl.vi.store.VirtualIconStore",
		dock:'bottom',
		displayInfo:true
	}
});