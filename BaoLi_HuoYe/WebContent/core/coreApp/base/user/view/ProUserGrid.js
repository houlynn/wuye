Ext.define("core.base.user.view.ProUserGrid", {
			extend : 'Ext.grid.Panel',
			alias : 'widget.user.prouser',
			autoHeight : true,
			style : 'border-width:0 0 0 0;',
			columnLines : true, // 加上表格线
			multiSelect : true,
			width : "100%",
			enableLocking : true, // 使grid可以锁定列
			store:"core.base.user.store.ProUserStore",
			title:"分配配管理员" ,
			columns:[
		  {text : "Id",
		     dataIndex : "id",
		     width : 150,
		   columnType : "textfield",
		     hidden:true
		},
			  {text : "proid",
		     dataIndex : "proid",
		     width : 150,
		   columnType : "textfield",
		     hidden:true
		},
		
		
	  {text : "手机号",
		     dataIndex : "loginCode",
		     width : 150,
		   columnType : "textfield"
		},
		{text : "用户名称",
		dataIndex : "userName",
		width : 150,
		columnType : "textfield"
		},
		{
		text : "性别",
		dataIndex : "sex",
		width : 80,
		ddCode : "SEX",
		columnType : "basecombobox"
		},
		{text : "创建时间",
		dataIndex : "createTime",
		width : 320,
		columnType : "textfield"
		},		{text : "所属物业",
		dataIndex : "proname",
		width : 320,
		columnType : "textfield"
		}
			
			],
			initComponent : function() {
				var self = this;
				var thar = [{
							text : '新增',
							ref : 'addButton',
							itemId : 'new',
							glyph : 0xf016
						}, {
							text : '修改',
							glyph : 0xf044,
							itemId : 'edit',
							ref : "editButton"
						}, {
							text : '删除',
							disabled : true,
							glyph : 0xf014,
							 hidden:true,
							ref : "removeButton",
							itemId : 'delete'
						}, '-', '-', '筛选', {
							width : 60,
							xtype : 'gridsearchfield',
							// store : this.grid.getStore() //
							// 现在用的local数据，不可以进行筛选
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

						}, {
							xtype : 'pagingtoolbar', // grid数据分页
							store : this.store,
							displayInfo : true,
							prependButtons : true,
							dock : 'bottom',
							items : [{ // 在最前面加入grid方案的选择Combo
									// xtype : 'gridschemecombo'
									}]
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
			}
		})