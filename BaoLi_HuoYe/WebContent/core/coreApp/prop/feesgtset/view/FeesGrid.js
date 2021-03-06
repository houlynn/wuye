Ext.define("core.prop.feesgtset.view.FeesGrid", {
			extend : 'Ext.grid.Panel',
			alias : 'widget.feesgtset.gridModue',
			style : 'border-width:0 0 0 0;',
			border:!1,
			columnLines : true, // 加上表格线
			multiSelect : true,
			width : "100%",
			/*columns : [{
						align : "right",
						dataIndex : "tf_ResidentInfo",
						maxWidth : 800,
						width : 110,
						text : "房号",
						renderer: function(e, t, i, o, n, a, l) {
		              var r = e;
		                try {
		                        r = '<span class="gridNameField"><a onclick="javascript:return false;" href="#">' + filterTextSetBk(a, e) + "</a></span>"
		                } catch(u) {}
		                return r
						}

					}, {
						align : "right",
						dataIndex : "tf_startnumber",
						editor : {
							decimalPrecision : 3,
							xtype : "numberfield"
						},
						renderer : system.floatRenderer,
						locked : false,
						maxWidth : 800,
						text : "开始度数",
						triStateSort : false,
						width : 110,
						xtype : "numbercolumn"
					}, {
						align : "right",
						dataIndex : "tf_endnumber;",
						editor : {
							decimalPrecision : 3,
							xtype : "numberfield"
						},
						renderer : system.floatRenderer,
						locked : false,
						maxWidth : 800,
						text : "本月度数",
						triStateSort : false,
						width : 110,
						xtype : "numbercolumn"
					}, {
						align : "center",
						dataIndex : "tf_meterdate",
						editor : {
							editable : false,
							format : "Y-m-d",
							xtype : "datefield"
						},
						locked : false,
						maxWidth : 800,
						renderer : system.dateRenderer,
						sortable : true,
						text : "抄表时间",
						triStateSort : false,
						width : 100,
						xtype : "datecolumn"
					}, {
						dataIndex : "tf_mtermane",
						editor : "textfield",
						locked : false,
						maxWidth : 800,
						sortable : true,
						text : "抄表人员",
						triStateSort : false,
						width : 100
					}, {
						dataIndex : "tf_state",
						locked : false,
						maxWidth : 800,
						sortable : true,
						text : "状态",
						triStateSort : false,
						width : 100
					}, {
						dataIndex : "tf_remark",
						locked : false,
						maxWidth : 800,
						sortable : true,
						text : "备注",
						triStateSort : false,
						width : 300
					}],*/

			enableLocking : true, // 使grid可以锁定列
			tools : [{
						type : 'gear'
					}],
			listeners : {
				selectionChange : function(model, selected, eOpts) {
					var viewModel = this.viewModel;
					// 设置删除按钮的状态
					this.down('toolbar button#delete')[selected.length > 0
							? 'enable'
							: 'disable']();
							
							// 设置删除按钮的状态
					this.down('toolbar button#edit')[selected.length > 0
							? 'enable'
							: 'disable']();
					// 下面将组织选中的记录的name显示在title上，有二种方案可供选择，一种是用下面的MVVM特性，第二种是调用refreshTitle()
					var selectedNames ='工表信息'
					if (selected.length > 0) {
						if (!!selected[0].getNameValue()) {
							selectedNames = selectedNames
									+ '　『<em>'
									+ selected[0].getNameValue()
									+ '</em>'
									+ (selected.length > 1 ? ' 等'
											+ selected.length + '条' : '') + '』';
							this.setTitle(selectedNames);
						}
					}

				}
			},
			initComponent : function() {
				var self = this;
					var viewModel = system.getViewModel(this.code)
					this.viewModel = viewModel;
						this.model = core.app.module.factory.ModelFactory
						.getModelByModule(viewModel.data,{
						//read : 'rest/201/fetchdata.do',
					    read : '/201/loadins.do',
					    update : 'rest/module/update.do',
						create : 'rest/module/create.do',
						destroy : 'rest/module/remove.do'
						});
					this.store = Ext.create('core.app.store.GridStore', {
							model : this.model,
							gridModue : this,
							autoLoad:false
						});
					
						
						
				var thar = [{
					text : '新增',
					ref : 'addButton',
					xtype : 'splitbutton',
					itemId : 'new',
					glyph : 0xf016,
					menu : [{
						hidden:true,
						text : '复制新增',
						ref : 'copyadd',
						tooltip : '新增时先将当前记录添入到新记录中',
						itemId : 'newwithcopy',
						glyph : 0xf0c5,
						listeners : {
							click : function() {
								var grid = self;
								var sm = self.getSelectionModel();
								if (sm.getSelection().length != 1) {
									Ext.toast({
												title : '警告',
												html : '请先选择一条记录，然后再执行此操作！',
												bodyStyle : 'background-color:yellow;',
												header : {
													border : 1,
													style : {
														borderColor : 'pink'
													}
												},
												border : true,
												style : {
													borderColor : 'pink'
												},
												saveDelay : 10,
												align : 'tr',
												closable : true,
												minWidth : 200,
												useXAxis : true,
												slideInDuration : 500
											});
									return;
									get
								}
								var model = Ext.create(grid.getStore().model);
								Ext.Array.each(model.fields.keys, function(
										field) { // 将选中记录的model都赋给值新的记录
											model.set(field.name, sm
															.getSelection()[0]
															.get(field.name));
											model.set(field,
													sm.getSelection()[0]
															.get(field));
										});
								model.set(model.idProperty, null); // 设置为null,可自动增加
								grid.getStore().insert(0, model);
								sm.select(model); // 选中当前新增的记录
							}
						}
					}, '-']

				}, {
					text : '修改',
					glyph : 0xf044,
					itemId : 'edit',
					disabled : true,
						hidden:true,
					ref : "editButton"
				}, {
					text : '删除',
					disabled : true,
					glyph : 0xf014,
					ref : "removeButton",
					itemId : 'delete'
				},
				{
					text : '安装公摊表',
					itemId : 'setting',
						ref : "setting"
				},

				 '-', '-', '筛选', {
					width : 60,
					xtype : 'gridsearchfield',
					// store : this.grid.getStore() // 现在用的local数据，不可以进行筛选
					store : Ext.create('Ext.data.Store', {
								proxy : {
									type : 'rest'
								}
							})
				}];
				var barItem = [];
				if (!this.thar) {
					barItem = thar
				} else {
					barItem = Ext.apply(thar, this.thar);
				}
					this.dockedItems = [{
					xtype : 'toolbar', // 按钮toolbar
					dock : 'top',
					items:barItem,
					grid : this,
					border:!1,
					viewModel:viewModel
					
				}, {
					xtype : 'pagingtoolbar', // grid数据分页
					store : this.store,
					displayInfo : true,
					prependButtons : true,
					dock : 'bottom',
					items : [{ // 在最前面加入grid方案的选择Combo
						//xtype : 'gridschemecombo'
					}]
				}];	
				 this.columns = core.app.module.factory.ColumnsFactory.getColumns(viewModel);	
				this.store.modulegrid = this;
			
						var feesItem={
		width : 250,
		dataIndex:"itemRemark",
		text :'栋',
		align : 'center',
		renderer : function(val){
		  return '<span class="gridNameField"><a onclick="javascript:return false;" href="#">' + val + "</a></span>"
		}
		};
			this.columns.push(feesItem);		
				var title = viewModel.get('tf_title');
				this.setTitle(title);
				// 可以在grid中进行行编辑的设置
				this.rowEditing = new Ext.grid.plugin.RowEditing({
							saveBtnText : '保存',
							cancelBtnText : "取消",
							clicksToEdit : 2
						});
				this.plugins = [this.rowEditing];
				this.selType = 'rowmodel';

				this.on('edit', function(editor, e) {
							// 每一行编辑完保存之后，都提交数据
							// 每一行编辑完保存之后，都提交数据
							e.grid.getStore().sync({
										callback : function(data, store) {
											e.record.commit();
											//system.smileInfo("保存成功!")
										}
									});
							var proxy = e.grid.getStore().getProxy();
							var errorInfo = proxy.proxy;
							if (errorInfo) {

							} else {
								showMsg("添加信息", "添加成功!", 1);
							}
						});

				this.viewConfig = {
					stripeRows : true, // 奇偶行不同底色
					enableTextSelection : false,
					// 加入允许拖动功能
					plugins : [{
						ptype : 'gridviewdragdrop',
						ddGroup : 'DD_grid_' + viewModel.get('tf_moduleName'), // 拖动分组必须设置，这个分组名称为:DD_grid_Global
						enableDrop : false
							// 设为false，不允许在本grid中拖动
						}]

				};

				
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
				
				
				this.callParent();

			}

		})