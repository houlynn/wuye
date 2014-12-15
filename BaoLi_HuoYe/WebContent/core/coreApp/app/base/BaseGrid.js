Ext.define("core.app.base.BaseGrid",{
	extend:"Ext.grid.Panel",
	alias:"widget.basegrid",
	border:false, 
	multiSelect:true,
	autoScroll : false,
	frame:true,
	itemdblclickOver:false,
	itemlclickOver:false, 
	animate:false,
	cls:"addr-panel",
	bodyPadding : '0 0 0 0',
	selModel:{
		selType:"checkboxmodel"
	},
	tbar:[
		{xtype:'button',text:'添加',ref:'gridInsertF',iconCls:'table_add'},
		{xtype:'button',text:'添加',ref:'gridInsert',iconCls:'table_add',hidden:true},
		{xtype:'button',text:'编辑',ref:'gridEdit',iconCls:'table_edit',disabled:true},
		{xtype:'button',text:'删除',ref:'gridDelete',iconCls:'table_remove'},
		{xtype:'button',text:'保存',ref:'gridSave',iconCls:'table_save',hidden:true}
	],
	columns:[],
	enableKeyNav:true,  //可以使用键盘控制上下
	columnLines:true, //展示竖线
	initComponent:function(){
		this.editing = Ext.create('Ext.grid.plugin.CellEditing',{clicksToEdit:1});
		var columns=new Array();
		Ext.each(this.columns,function(col){
			if(col.columnType=="basecombobox" || (col.field && col.field.xtype && col.field.xtype=="basecombobox")){
				col.renderer=function(value,data,record){
								var val=value;
								//如果该字段是可编辑的
								var ddCode=null;
								if(col.field){
									ddCode=col.field.ddCode;
								}else{
									ddCode=col.ddCode;
								}
								var ddItem=factory.DDCache.getItemByDDCode(ddCode);
								for(var i=0;i<ddItem.length;i++){
									var ddObj=ddItem[i];
									var displayField='itemName';
									var valueField='itemCode';
									if(col.field && col.field.displayField){
										displayField=column.field.displayField;
									}else if(col.displayField){
										displayField=col.displayField;
									}
									if(col.field && col.field.valueField){
										displayField=col.field.valueField;
									}else if(col.displayField){
										displayField=col.displayField;
									}
									if(value==ddObj[valueField]){
										val=ddObj[displayField];
										break;
									}
								}
								return val;
						}
			}
			columns.push(col);
		});
		this.columns=columns;
		this.plugins = [this.editing];
		this.callParent(arguments);
	}
});

