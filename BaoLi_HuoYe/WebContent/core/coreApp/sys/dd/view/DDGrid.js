Ext.define("core.sys.dd.view.DDGrid",{
	extend:"core.app.base.BaseGrid",
	alias:"widget.dd.ddgrid",
	tbar:[
		{xtype:'button',text:'添加',ref:'gridInsertF',iconCls:'table_add',hidden:true},
		{xtype:'button',text:'添加',ref:'gridInsert',iconCls:'table_add'},
		{xtype:'button',text:'编辑',ref:'gridEdit',iconCls:'table_remove',disabled:true},
		{xtype:'button',text:'删除',ref:'gridDelete',iconCls:'table_remove'},
		{xtype:'button',text:'保存',ref:'gridSave',iconCls:'table_save'}
	],
	columns:[{
		xtype:"rownumberer",
		width : 35,
		text :'No.',
		align : 'center'
	},{
		text:"主键",
		dataIndex:"ddId",
		hidden:true
	},{
		text:"字典名称",
		width : 100,
		dataIndex:"ddName",
		field:{
			xtype:"textfield"
		}
	},{
		text:"字典编码",
		dataIndex:"ddCode",
		width : 100,
		field:{
			xtype:"textfield"
		}
	},{
		text:"字典类型",
		dataIndex:"ddType",
		width : 100,
		columnType:"basecombobox",
		ddCode:"DDTYPE",
		field:{
			xtype:"basecombobox",
			ddCode:"DDTYPE"
		}
	},{
		text:"启用",
		width : 100,
		dataIndex:"enabled",
		field:{
			xtype:"basecombobox",
			ddCode:"ENABLED"
		}
	},{
		text:"是否只读",
		dataIndex:"readOnly",
		field:{
			xtype:"basecombobox",
			ddCode:"READONLY"
		}},
		{
			text:"引用实体",
			width : 250,
			dataIndex:"modelName",
			field: {
				xtype:"textfield"
			}
     }
	],
	store:"core.sys.dd.store.DDStore",
	bbar:{
		xtype:'pagingtoolbar',
		store:"core.sys.dd.store.DDStore",
		dock:'bottom',
		displayInfo:true
	}
});