Ext.define("core.app.controller.BasisController",{
		extend:"Ext.app.Controller",
	  	initBasis:function(){
		var self=this;
		var basisCtr={
			
		"container[xtype=gridModue] button[ref=addButton]":{
							 click : function (btn){
							 var modulegrid = btn.up("gridModue");	
							 var  moduelPanel=modulegrid.up("modulepanel");
							 var  navigatetree=moduelPanel.down("navigatetree");
							 var node=navigatetree.getSelectionModel().getSelection()[0];;
							 var store=modulegrid.getStore();
							 var store=modulegrid.store;
							 var viewModel=system.getViewModel(modulegrid.code);
							 var model = Ext.create(modulegrid.getStore().model);
							 if(viewModel.get("tf_linkedModule")){
                	         if(!store.navigates||store.navigates.length==0){
                	         	system.errorInfo("请选择导航条目再进行添加操作!","错误提示");
                	         	return;
                	          }
                	            model.fields.items.forEach(function(f,index){
                	               console.log(" modelue intieninteiniiin ihihj ");
                	               console.log(f);
                	               var fidldName=f.name;
                	               if(f.manytoone_TitleName){
                	                model.set(fidldName,node.raw.text);
                	               }
                	          });
							 }
			                 model.set(model.idProperty, null); // 设置主键为null,可自动
			                 var window = Ext.create('core.app.view.region.BaseWindow', {
				                          viewModel:viewModel,
				                            grid:modulegrid
			                                 });
			                    window.down('baseform').setData(model);
	                            window.show();
								}, // 这里不要用handler，而要用click,因为下面要发送click事件
								// 删除按钮在渲染后加入可以Drop的功能
								render : function(btn) {
									// 可以使Grid中选中的记录拖到到此按钮上来进行复制新增
									var modulegrid= btn.up("gridModue");
									btn.dropZone = new Ext.dd.DropZone(btn.getEl(), {
												// 此处的ddGroup需要与Grid中设置的一致
												ddGroup : 'DD_grid_' + modulegrid.viewModel.get('tf_moduleName'),
												getTargetFromEvent : function(e) {
													return e.getTarget('');
												},
												// 用户拖动选中的记录经过了此按钮
												onNodeOver : function(target, dd, e, data) {
													return Ext.dd.DropZone.prototype.dropAllowed;
												},
												// 用户放开了鼠标键，删除记录
												onNodeDrop : function(target, dd, e, data) {
													var b = btn.menu.down('#newwithcopy');
													b.fireEvent('click', b);
												}
											})
								}
				},
				
				
			"container[xtype=gridModue]  button[ref=editButton] ":{
		   click:function(btn){
			var modulegrid = btn.up("gridModue");	
		    var viewModel=system.getViewModel(modulegrid.code);
			var sm= modulegrid.getSelectionModel().getSelection();
			if(sm.length==0){
			 return;
			}
			var window = Ext.create('core.app.view.region.BaseWindow', {
				viewModel:viewModel,
				grid:modulegrid
			});
	       console.log(modulegrid.getSelectionModel().getSelection()[0]);
	       console.log(modulegrid.getStore().getAt(0));
	       window.down('baseform').setData(modulegrid.getSelectionModel().getSelection()[0]);
	       window.show();
				}
			},	
			
			
			"container[xtype=navigatetree] ":{
                itemclick: function (view, node, item, index, e, eOpts){
                	var grid=view.ownerCt.ownerCt.ownerCt.ownerCt.ownerCt.down("gridModue");
                	var moduelPanel=view.ownerCt.ownerCt.ownerCt.ownerCt.ownerCt;
                	var code=moduelPanel.code;
                    var viewModel=system.getViewModel(code);
                	var title=viewModel.get('tf_title')+"  导航值        "+node.get("text");
                	console.log(title);
                	console.log(grid);
                	grid.setTitle(title);
                	var modue=system.getModuleDefine(node.raw.nodeInfo);
                	navigates:[{"moduleName":"City","tableAsName":"_t7012","primarykey":"tf_cityId","fieldtitle":"\u5e02","equalsValue":"0301","equalsMethod":null,"text":"\u77f3\u5bb6\u5e84\u5e02","isCodeLevel":false}]
                	var navigate={
                			moduleName:node.raw.nodeInfo,
                			tableAsName:"_t"+modue.tf_moduleId,
                			text:node.raw.text,
                			primarykey:modue.tf_primaryKey,
                		    fieldtitle:node.raw.description,
                		    equalsValue:node.raw.code,
                		    isCodeLevel:false
                	};
                	var store=grid.store;
                	if(store.navigates){
                		store.navigates.splice(0,store.navigates.length);
                		store.navigates.push(navigate);
                	}
                  	var proxy=store.getProxy();
					proxy.extraParams.navigates=Ext.encode(store.navigates);
					store.load();	          						
                }
				
			},
			
		"container[xtype=gridModue]  button[ref=removeButton] ":{
			click:function(btn){
			var modulegrid=btn.up("gridModue");
			var module=modulegrid.viewModel;
			var selection=modulegrid.getSelectionModel().getSelection();
			var message='';
			var infoMessage='';
			if (selection.length == 1) { // 如果只选择了一条
				message = ' 『' + selection[0].getNameValue() + '』 吗?';
				infoMessage = '『' + selection[0].getNameValue() + '』';
			} else { // 选择了多条记录
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
							modulegrid.getStore().remove(modulegrid.getSelectionModel().getSelection());
							modulegrid.getStore().sync();
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
									// 可以使Grid中选中的记录拖到到此按钮上来进行删除
									button.dropZone = new Ext.dd.DropZone(button.getEl(), {
												// 此处的ddGroup需要与Grid中设置的一致
												ddGroup : 'DD_grid_' + viewModel.get('tf_moduleName'),
												// 这个函数没弄明白是啥意思,没有还不行
												getTargetFromEvent : function(e) {
													return e.getTarget('');
												},
												// 用户拖动选中的记录经过了此按钮
												onNodeOver : function(target, dd, e, data) {
													return Ext.dd.DropZone.prototype.dropAllowed;
												},
												// 用户放开了鼠标键，删除记录
												onNodeDrop : function(target, dd, e, data) {
													button.fireEvent('click', button); // 执行删除按钮的click事件
												}
											})
								}
				}
				
	}
	
	Ext.apply(self.ctr,basisCtr);
}
	  	
	
});