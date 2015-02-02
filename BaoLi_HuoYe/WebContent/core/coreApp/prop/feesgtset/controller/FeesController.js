Ext.define("core.prop.feesgtset.controller.FeesController", {
	extend : "Ext.app.Controller",
	mixins : {
		treeUtil : "core.util.TreeUtil",
		queryUtil : "core.util.QueryUtil",
		suppleUtil : "core.util.SuppleUtil",
		formUtil : "core.util.FormUtil"
	},
	init : function() {
		var self = this
		this.control({
			"grid[xtype=feesgtset.gridModue] #setting" : {
				click : function(btn) {
					var modulegrid = btn.up("grid[xtype=feesgtset.gridModue]");
					var store = modulegrid.getStore();
					var tree = modulegrid.ownerCt
							.down("container[xtype=feesgtset.levelTree]");
					var selection = tree.getSelectionModel().getSelection();
					if (!selection || selection.length == 0) {
						system.errorInfo("请选择一个小区再进行添加", "错误提示");
						return;
					}
					var selectiongrid=modulegrid.getSelectionModel().getSelection();
					 if (!selectiongrid || selectiongrid.length == 0) {
						          system.errorInfo("请选择个公表进行安装!", "错误提示");
						          return;
					       }
					 var  installid=  selectiongrid[0].get("tf_insid");  
					var vid = selection[0].get("code");
					var itemName = selection[0].get("text");
					self.selTreeWin({
								title : itemName + "--楼宇列表",
								multiSelect : true,
								haveButton : true,
								isEmpty : false,
								config : {
									url : "/vi/loadVLevf.action",
									params : {
										vid : 1,
										invid:installid,
										expanded : true
									}
								},
								callback : function(win, records) {
									// 点击确定之后会得到选中的数据做处理
										if (!records || records.length == 0) {
						                system.errorInfo("请选择至少一个节点", "错误提示");
						                return;
					                   }
					            var ids=new Array();
							   Ext.each(records,function(rec){
								var pkValue=rec.get("code");
								ids.push(pkValue);
							  });
					         	 var resObj=self.ajax({url:"/201/innstall.action",params:{levfs:ids,installid:installid}});
					             system.smileInfo("安装成功!");    
					             store.load();
					             

								}
							});

				}

			},
			"grid[xtype=feesgtset.gridModue] button[ref=addButton]" : {
				click : function(btn) {
					var modulegrid = btn.up("grid[xtype=feesgtset.gridModue]");
					var tree = modulegrid.ownerCt
							.down("container[xtype=feesgtset.levelTree]");
					var selection = tree.getSelectionModel().getSelection();
					if (!selection || selection.length == 0) {
						system.errorInfo("请选择一个小区再进行添加", "错误提示");
						return;
					}
					var vid = selection[0].get("code");
					var window = Ext.createWidget("feesgtset.window", {
								viewModel : viewModel,
								vid : vid,
								grid : modulegrid
							});
					var model = Ext.create(modulegrid.getStore().model);
					window.down('form[xtype=feesgtset.form]').getForm()
							.loadRecord(model);
					window.setTitle("公表信息录入");
					window.show();

				}
			},

			"form[xtype=feesgtset.form] #feeeItemCombobox" : {
				render : function(combo) {
					var from = combo.ownerCt.ownerCt.ownerCt;
					var window = from.up("window[xtype=feesgtset.window]");
					var vid = window.vid;
					var ddCode = {
						whereSql : ' and tf_Village=' + vid
					}
					Ext.apply(combo.ddCode, ddCode);
					var store = combo.store;
					var proxy = store.getProxy();
					proxy.extraParams = combo.ddCode;
					store.load();

				}
			},

			
				"grid[xtype=feesgtset.gridModue] button[ref=removeButton] ":{
			click:function(btn){
			var modulegrid=btn.up("grid[xtype=feesgtset.gridModue]");
			var module=system.getViewModel(320);
			var selection=modulegrid.getSelectionModel().getSelection();
			var message='';
			var infoMessage='';
			if (selection.length == 1) { 
				message = ' 『' + selection[0].getNameValue() + '』 吗?';
				infoMessage = '『' + selection[0].getNameValue() + '』';
			} else { 
				message = '<ol>';
				Ext.Array.each(selection, function(record) {
							message += '<li>' + record.getNameValue() + '</li>';
						});
				message += '</ol>';
				infoMessage = message;
				message = '以下 ' + selection.length + ' 条记录吗?' + message;
			}
			var moduletitle = '<strong>' + module.get('tf_title')
					+ '</strong>';
			Ext.MessageBox.confirm('确定删除', '确定要删除 ' + moduletitle + ' 中的' + message,
					function(btn) {
						if (btn == 'yes') {
							 if(modulegrid.getSelectionModel().getSelection().length>1){
							 	var ids=new Array();
							   Ext.each(modulegrid.getSelectionModel().getSelection(),function(rec){
								var pkValue=rec.get(rec.idProperty);
								ids.push(pkValue);
							  });
							  console.log(ids);
							 var resObj=self.ajax({url:"/201/removerecords.action",params:{ids:ids,moduleName:"MeterInfo"}});
							 modulegrid.getStore().reload();
							 modulegrid.setTitle("抄表信息");
							 return;
							 }
							modulegrid.getStore().remove(modulegrid.getSelectionModel().getSelection()[0]);
							modulegrid.getStore().sync();
							 modulegrid.setTitle("抄表信息");
							 Ext.toast({
										title : '删除成功',
										html : moduletitle + infoMessage + '已成功删除！',
										bodyStyle : 'background-color:#7bbfea;',
										header : {
											border : 1,
											style : {
												borderColor : '#9b95c9'
											}
										},
										border : true,
										style : {
											borderColor : '#9b95c9'
										},
										saveDelay : 10,
										align : 'tr',
										closable : true,
										minWidth : 200,
										maxheight:250,
										useXAxis : true,
										slideInDuration : 500
									});
						}
					})
					
				},
					render : function(button) {
									button.dropZone = new Ext.dd.DropZone(button.getEl(), {
												ddGroup : 'DD_grid_' + viewModel.get('tf_moduleName'),
												getTargetFromEvent : function(e) {
													return e.getTarget('');
												},
												onNodeOver : function(target, dd, e, data) {
													return Ext.dd.DropZone.prototype.dropAllowed;
												},
												onNodeDrop : function(target, dd, e, data) {
													button.fireEvent('click', button); 
												}
											})
								}
				},
			
			
			"form[xtype=feesgtset.form] #save" : {
				click : function(btn) {
					var form = btn.up("form[xtype=feesgtset.form]");
					var formObj = form.getForm();
					var feesid = form.down("#feeeItemCombobox").getValue();
					var window = form.up("window[xtype=feesgtset.window]");
					var vid = window.vid;
					var params = {
						feedid : feesid,
						vid : vid
					}
					formObj.submit({
						url : "/201/addinns.action",
						params : params,
						// 可以提交空的字段值
						submitEmptyText : true,
						// 成功回调函数
						success : function(form, action) {
							var obj = action.result.obj;
							if (action.result.success) {
								self.setFormValue(formObj, obj);
								system.smileInfo("添加成功!");
								var form = btn.up("form[xtype=feesgtset.form]");
								form.down("#feeeItemCombobox").setValue(feesid);
							}
						},
						// 错误信息处理
						failure : function(form, action) {
							var obj = action.result.obj;
							// 前台表单校验错误
							system.errorAlertInfo(obj)
						}
					})

				}
			},
			"container[xtype=feesgtset.levelTree]":{
			itemclick:function(treeview,node,item,index,e,eOpts){
					var tree=treeview.ownerCt;
					var gridModue=treeview.ownerCt.ownerCt.down("grid[xtype=feesgtset.gridModue]");
                	var store=gridModue.store;
                	var vid=tree.getSelectionModel().getSelection()[0].get("code");
                  	var proxy=store.getProxy();
                    proxy.extraParams.whereSql=" and tf_Village="+vid;
					proxy.extraParams.navigates=Ext.encode(store.navigates);
					store.load();	  
				}
				
			},
			
			
			

		});
	},
	views : ['core.prop.feesgtset.view.MainLayout',
			'core.prop.feesgtset.view.LevelTree',
			"core.prop.feesgtset.view.FeesGrid",
			"core.prop.feesgtset.view.FeeWinodw",
			"core.prop.feesgtset.view.FeesgtForm",
			"core.prop.feesgtset.view.LevelTree"],
	stores : ['core.prop.feesgtset.store.LevelStore',
			"core.prop.feesgtset.store.LevelStore"

	],
	models : []
});