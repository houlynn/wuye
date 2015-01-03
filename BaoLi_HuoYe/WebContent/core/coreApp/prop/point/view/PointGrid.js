Ext.define("core.prop.point.view.PointGrid", {
	extend : 'Ext.grid.Panel',
	alias : 'widget.point.grid',
	autoHeight : true,
	style : 'border-width:0 0 0 0;',
	columnLines : true, // 加上表格线
	multiSelect : true,
	border:false,
	width : "100%",
    listeners : {
				selectionChange : function(model, selected, eOpts) {
					// 设置删除按钮的状态
					this.down('toolbar button#delete')[selected.length > 0
							? 'enable'
							: 'disable']();
							
							// 设置删除按钮的状态
					this.down('toolbar button#edit')[selected.length > 0
							? 'enable'
							: 'disable']();
							
							
					// 下面将组织选中的记录的name显示在title上，有二种方案可供选择，一种是用下面的MVVM特性，第二种是调用refreshTitle()
					var selectedNames ='终点工信息'
					if (selected.length > 0) {
						if (!!selected[0].get("tf_name")) {
							selectedNames = selectedNames
									+ '　『<em>'
									+ selected[0].get("tf_name")
									+ '</em>'
									+ (selected.length > 1 ? ' 等'
											+ selected.length + '条' : '') + '』';
						}
					}
				}
    },
	
	tools : [{
				type : 'gear'
			}],
		columns:[
		  {text : "Id",
		     dataIndex : "tf_pointId",
		     width : 2,
		    columnType : "textfield",
		     hidden:true
		},
	  {text : "终点工类型",
		     dataIndex : "tf_type",
		     width : 80,
		    columnType : "textfield"
		},
		{text : "名字",
		dataIndex : "tf_name",
		width : 80,
		columnType : "textfield"
		},
	   {text : "性别",
		dataIndex : "tf_sex",
		width : 80,
		ddCode : "PRO",
		columnType : "basecombobox"
		},		{text : "年龄",
		dataIndex : "tf_age",
		width : 80,
		columnType : "numberfield"
		},
			{text : "薪资",
		dataIndex : "tf_price",
		width : 80,
		columnType : "numberfield"
		},
			{text : "工作年限",
		  dataIndex : "tf_taex",
		  width : 80,
			ddCode : "PRO",
		columnType : "basecombobox"
		}	,
			{text : "简历",
		dataIndex : "tf_rmark",
		width : 320,
		columnType : "textfield"
		}
			,
			{text : "小区",
		dataIndex : "tf_vname",
		width : 120,
		columnType : "textfield"
		}
			
			],		
	initComponent : function() {
		var self = this;
		var thar = [{
					text : '新增',
					ref : 'addButton',
					glyph : 0xf016
				}, {
					text : '修改',
					glyph : 0xf044,
					disabled : true,
					itemId:"edit",
					ref : "editButton"
				}, {
					text : '删除',
					disabled : true,
					glyph : 0xf014,
					itemId : 'delete',
					ref : "removeButton"
					,
				}, '-', '-', '筛选', {
					width : 60,
					xtype : 'gridsearchfield',
					store : Ext.create('Ext.data.Store', {
								proxy : {
									type : 'rest'
								}
							})
				}];
					this.dockedItems = [{
							xtype : 'toolbar', // 按钮toolbar
							dock : 'top',
							items : thar,
							grid : this,

						}];
				this.selType = 'rowmodel';		
				
				
				
		var columns = new Array();
		Ext.each(this.columns, function(col) {
			if (col.columnType == "basecombobox"
					|| (col.field && col.field.xtype && col.field.xtype == "basecombobox")) {
				col.renderer = function(value, data, record) {
					var val = value;
					// 如果该字段是可编辑的
					var ddCode = null;
					if (col.field) {
						ddCode = col.field.ddCode;
					} else {
						ddCode = col.ddCode;
					}
					var ddItem = factory.DDCache.getItemByDDCode(ddCode);
					for (var i = 0; i < ddItem.length; i++) {
						var ddObj = ddItem[i];
						var displayField = 'itemName';
						var valueField = 'itemCode';
						if (col.field && col.field.displayField) {
							displayField = column.field.displayField;
						} else if (col.displayField) {
							displayField = col.displayField;
						}
						if (col.field && col.field.valueField) {
							displayField = col.field.valueField;
						} else if (col.displayField) {
							displayField = col.displayField;
						}
						if (value == ddObj[valueField]) {
							val = ddObj[displayField];
							break;
						}
					}
					return val;
				}
			}
			columns.push(col);
		});
		this.columns = columns;
		this.callParent(arguments);

	},
 store:"core.prop.point.store.PointStore",
	bbar:{
		xtype:'pagingtoolbar',
		store:"core.prop.point.store.PointStore",
		dock:'bottom',
		displayInfo:true
	}
})