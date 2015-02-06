Ext.define("core.prop.expre.view.ExpreGrid", {
	extend : 'Ext.grid.Panel',
	alias : 'widget.expre.grid',
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
						this.down('toolbar button#audit')[selected.length > 0
							? 'enable'
							: 'disable']();		
							
					// 下面将组织选中的记录的name显示在title上，有二种方案可供选择，一种是用下面的MVVM特性，第二种是调用refreshTitle()
					var selectedNames ='快递收发'
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
		     dataIndex : "tf_exprid",
		     width : 2,
		    columnType : "textfield",
		     hidden:true
		},
	  {text : "房号",
		     dataIndex : "tf_roomNub",
		     width : 180,
		},
		{text : "收件人",
		dataIndex : "tf_poponame",
		width : 120,
		columnType : "textfield"
		},
	   {text : "手机号",
		dataIndex : "tf_phoneNuber",
		width : 180,
		},		
		{text : "物品数量",
		dataIndex : "tf_woucount",
		width : 80,
		columnType : "numberfield"
		},
			{text : "提交时间",
		dataIndex : "tf_postTime",
		width : 160,
		columnType : "numberfield"
		},
			{text : "APP用户",
		  dataIndex : "tf_appUser",
		  width : 150,
		},
		{text : "物品描述",
		dataIndex : "tf_remark",
		width : 320,
		columnType : "textfield"
		}
			,
			{text : "小区",
		dataIndex : "tf_vname",
		width : 120,
		columnType : "textfield"
		}
		,
		{text : "处理状态",
		dataIndex : "tf_state",
		width : 120,
		renderer : function(value, data, record) {
				if ("1" == value) {
					value = "<span style='color:red;font-weight:bold'>已处理</span>";
			} else {
				value = "<span style='color:green;font-weight:bold'>未处理</span>";
			}
			  return value;
		}}
			],		
  initComponent : function() {
		var self = this;
		var thar = [{
					text : '新增',
					ref : 'addButton',
					glyph : 0xf016,
					 hidden:true
				}, {
					text : '修改',
					glyph : 0xf044,
					disabled : true,
					itemId:"edit",
					 hidden:true,
					ref : "editButton"
				}, {
					text : '删除',
					disabled : true,
					glyph : 0xf014,
					itemId : 'delete',
					ref : "removeButton"
				},
				 {
					text : '审核',
					disabled : true,
					glyph : 0xf014,
					itemId : 'audit',
					ref : "audit"
				}
				
				, '-', '-', '筛选', {
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
 store:"core.prop.expre.store.ExpreStore",
	bbar:{
		xtype:'pagingtoolbar',
		store:"core.prop.expre.store.ExpreStore",
		dock:'bottom',
		displayInfo:true
	}
})