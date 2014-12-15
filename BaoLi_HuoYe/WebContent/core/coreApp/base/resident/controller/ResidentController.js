Ext.define("core.base.resident.controller.ResidentController",{
	extend:"Ext.app.Controller",
	mixins: {
		suppleUtil:"core.util.SuppleUtil",
		messageUtil:"core.util.MessageUtil",
		formUtil:"core.util.FormUtil",
		treeUtil:"core.util.TreeUtil",
		gridActionUtil:"core.util.GridActionUtil"
	},
init:function(){
		var self=this
		//事件注册
	this.control({
			"container[xtype=resident.gridModue] button[ref=addButton]":{
							click : function (btn){
							 var modulegrid = btn.up("grid[xtype=resident.gridModue]");	
							 var store=modulegrid.getStore();
			                 var tree=modulegrid.ownerCt.down("container[xtype=resident.levelTree]");
			                 var selection=tree.getSelectionModel().getSelection();
			                 if(!selection&&selection.length==0){
			                  return ;
			                 }else{
			                    if(selection[0].get("nodeInfoType")=="0"){
			                    system.errorInfo("请选择对应的楼层再进行添加","错误提示");
			                    return ;
			                   }
			                 }
			                 
			                 
							 var viewModel=system.getViewModel(modulegrid.code);
                	         if(!store.navigates||store.navigates.length==0){
                	         	system.errorInfo("请选择小区再进行添加操作","错误提示");
                	         	return;
                	          }
							 
						     var model = Ext.create(modulegrid.getStore().model);
			                 model.set(model.idProperty, null); // 设置主键为null,可自动
			                 var viewModel=system.getViewModel(modulegrid.code)
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
									var modulegrid= btn.up("resident.gridModue");
									btn.dropZone = new Ext.dd.DropZone(btn.getEl(), {
												// 此处的ddGroup需要与Grid中设置的一致
												ddGroup : 'DD_grid_' + viewModel.get('tf_moduleName'),
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
				
			"container[xtype=resident.gridModue]  button[ref=editButton] ":{
		   click:function(btn){
			var modulegrid = btn.up("grid[xtype=resident.gridModue]");	
			var viewModel=modulegrid.viewModel;
			var window = Ext.create('core.app.view.region.BaseWindow', {
				viewModel:viewModel,
				grid:modulegrid
			});
	       window.down('baseform').setData(modulegrid.getSelectionModel().getSelection()[0]);
	       window.show();
				}
			},	
			
		"container[xtype=resident.gridModue]  button[ref=removeButton] ":{
			click:function(btn){
			var modulegrid=btn.up("grid[xtype=resident.gridModue]");
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
				},
				
			"container[xtype=resident.levelTree]":{
				itemclick:function(treeview,node,item,index,e,eOpts){
					var tree=treeview.ownerCt;
					var treeDel=tree.down("button[ref=treeDel]");
					var treechildIns=tree.down("button[ref=treechildIns]");
					treeDel.setDisabled(false);
					treechildIns.setDisabled(false);
					var gridModue=treeview.ownerCt.ownerCt.down("grid[xtype=resident.gridModue]");
					var modue=system.getModuleDefine(node.raw.nodeInfo);
		         var navigate={
                			moduleName:node.raw.nodeInfo,
                			tableAsName:"_t"+modue.tf_moduleId,
                			text:node.raw.text,
                			primarykey:modue.tf_primaryKey,
                		    fieldtitle:node.raw.description,
                		    equalsValue:node.raw.code,
                		    isCodeLevel:false
                	};
                	var store=gridModue.store;
                	if(store.navigates){
                		store.navigates.splice(0,store.navigates.length);
                		store.navigates.push(navigate);
                	}
                  	var proxy=store.getProxy();
                  	console.log(proxy.extraParams);
					proxy.extraParams.navigates=Ext.encode(store.navigates);
					store.load();	  
				}
			},
			
			"container[xtype=resident.levelTree] button[ref=treeIns]":{
				click:function(btn){
						var tree=btn.ownerCt.ownerCt;
						var commbox=tree.down("basecombobox[ref=vicombobox]");
						 var vid=commbox.getValue();
						 if(!vid){
						 	system.errorInfo("请选择小区再进行添加操作","错误提示");
						 	return;
						 }
	               Ext.MessageBox.prompt('设置楼宇', '请输入楼宇名称', function(btn, leveName) {
                         if(btn=="ok"){
         	             var params={vid:vid,leveName:leveName,level:"0"}
         	            var resObj=self.ajax({url:"/102/A001.action",params:params});
         	            var store=tree.getStore();
                     	var proxy=store.getProxy();
											proxy.extraParams.vid=vid;
											store.load();	
                       } });
           
				}
			},
			"container[xtype=resident.levelTree] basecombobox[ref=vicombobox]":{
				 select:function(combo,record,opts) {  
				 	 var  vid=record[0].get("itemCode");
				 	 var tree= combo.ownerCt.ownerCt;
				     var store=tree.getStore();
				   	var proxy=store.getProxy();
											proxy.extraParams.vid=vid;
											store.load();	
											
				}
			},
			
			"container[xtype=resident.levelTree] button[ref=treechildIns]":{
				click:function(btn){
					var tree=btn.up("panel[xtype=resident.levelTree]");
					var records=tree.getSelectionModel().getSelection();
					if(records.length<=0){
						alert("请选中节点!");
						return;
					}
						var tree=btn.ownerCt.ownerCt;
						var commbox=tree.down("basecombobox[ref=vicombobox]");
						 var vid=commbox.getValue();
						 if(!vid){
						 	system.errorInfo("请选择小区再进行添加操作","错误提示");
						 	return;
						 }
					var parent=records[0];
	               Ext.MessageBox.prompt('设置楼宇', '请输入楼层', function(btn, leveName) {
                         if(btn=="ok"){
         	            var params={vid:vid,leveName:leveName,level:"1",parent:parent.get("id")}
         	            var resObj=self.ajax({url:"/102/A001.action",params:params});
         	            var store=tree.getStore();
                     	var proxy=store.getProxy();
											proxy.extraParams.vid=vid;
											store.load();	
                       } });
				}
			},
		  "container[xtype=resident.gridModue]  button[ref=seting]": {
   		     click:function(btn){
   		     	       var tree= btn.ownerCt.ownerCt.ownerCt.down("container[xtype=resident.levelTree]");
   		     	      	var commbox=tree.down("basecombobox[ref=vicombobox]");
   		     	      	var vid=commbox.getValue();
   		     	      	var grid= btn.ownerCt.ownerCt;
   		     	      	var sm= grid.getSelectionModel().getSelection();
   		     	      	if(sm.length==0){
   		     	      		system.warnInfo("请选择至少一条业主信息进行操作!")
   		     	      	 return;
   		     	      	}
   		     	      	var ids=[];
   		     	      	for(var index in sm){
   		     	      		  ids.push(sm[index].get("tf_residentId"));
   		     	      	}
   		     	       if(!vid){
						 	system.errorInfo("请选择小区再进行添加操作","错误提示");
						 	return;
						 }
               		    var window= Ext.create("Ext.window.Window",{
               		    	items:[{xtype:"resident.feesettingfrom",tag:{vid:vid,ids:ids}}]
               		    });   
               		    window.show();
   		     
   		     
   		     }
		  },
		  
		  
			"container[xtype=resident.levelTree] button[ref=treeDel]":{
				click:function(btn){
				var tree=btn.up("container[xtype=resident.levelTree]");
				var records=tree.getSelectionModel().getSelection();
			    if(records.length<=0){
				system.warnInfo('请选中节点！')
				return;
			    }
						Ext.MessageBox.confirm('确定删除', '确定要删除 ' + records[0].get("text"),
					function(btn) {
						if (btn == 'yes') {
			 var params={
			 tf_leveId:records[0].get("id")
			 };
			    var resObj=self.ajax({url:"/102/D001.action",params:params});
				var commbox=tree.down("basecombobox[ref=vicombobox]");
				var vid=commbox.getValue();
			    var store=tree.getStore();
                var proxy=store.getProxy();
				proxy.extraParams.vid=vid;
			    store.load();	
							
						}
					});
				}
			},
			/**
			 * 添加收费项目
			 */
			"form[xtype=resident.feesettingfrom] button[ref=addBtn]":{
				click:function(btn){
				  	var form= btn.ownerCt.ownerCt;
				    if (form.isValid()) {
				    var grid=form.down("gridpanel[xtype=resident.feesettinggrid]");
				    var feeItem={};
			 	    var model=Ext.create(grid.getStore().model);
				  		form.getForm().getFields().each(function(f){
				  		 feeItem[f.getName()]=f.getValue();
				  		});
				   var feeCombox=form.down("#feeeItemCombobox");
				   feeItem["itemName"]=feeCombox.getRawValue( );
				    var grid=form.down("gridpanel[xtype=resident.feesettinggrid]");
				    var flag=true;
				    var store= grid.getStore();
				    	store.each(function(rec){
				    	if(rec.get("itemId")==feeItem["itemId"]){
				    	flag=false;
				    	}	
		            });
		            console.log(feeItem);
		            if(feeItem["hasEndDate"]==false){
		            	if(feeItem["enddate"]==null){
		                    flag=false;
		                   	system.errorInfo("请填入结束时间","错误提示");
		            	}
		            }
		            if(flag){
		              grid.getStore().insert(0,feeItem);
		            }
				  }
					
					
				
				}
			},
			/**
			 * 设置收费项目
			 */
				"form[xtype=resident.feesettingfrom] button[ref=settingBtan]":{
				click:function(btn){
					   var form= btn.ownerCt.ownerCt;
					   var grid=form.down("gridpanel[xtype=resident.feesettinggrid]");
                       var store=grid.getStore();
                       var data=[];
                         var newRecords= grid.getStore().getNewRecords();
                           console.log(newRecords);
                            Ext.Array.each(newRecords,function(model){
                            	var obj={};
                            	obj["itemName"]=model.get("itemName");
                            	obj["itemId"]=model.get("itemId");
                            	obj["startdate"]=Ext.util.Format.date(model.get("startdate"), 'Y-m-d');
                            	obj["enddate"]=Ext.util.Format.date(model.get("enddate"), 'Y-m-d');
                            	obj["hasEndDate"]=obj["enddate"]==""||obj["enddate"]==null?false:true;
                             data.push(obj);
                             obj={};
                      });
                     var dataStr=Ext.encode(data); 
                     var ids=form.tag.ids;
                     var params={dataStr:dataStr,ids:ids};
                     var resObj=self.ajax({url:"/102/setting.action",params:params});
				}
			},
		    /**
			 * 设置收费项目
			 */
				"gridpanel[xtype=resident.feesettinggrid] #clearBtn":{
				   click:function(btn){
				   var grid= btn.ownerCt.ownerCt;
				    grid.getStore().removeAll();
				   	
				
				}
	         },
	         /**
	          * 加载combox数据
	          */
	         "form[xtype=resident.feesettingfrom] #feeeItemCombobox":{
	         	  render:function(combo) {
	         	  	var from= combo.ownerCt.ownerCt.ownerCt;
	         	  	var tag=from.tag;
	         	    var ddCode ={
                           whereSql:' and tf_Village='+tag.vid
                        }
                  Ext.apply(combo.ddCode,ddCode);
                  var store=combo.store;
                  var proxy=store.getProxy();
				  proxy.extraParams=combo.ddCode;
			      store.load();	
				   
	         	  	
	         	  }
	         	
	         },
	         
	          "form[xtype=resident.feesettingfrom] #hasEndDateTrue":{
	         	    change: function (cb, nv, ov) {
                         if(cb.getValue()==true){
	                           var from=cb.ownerCt.ownerCt.ownerCt.ownerCt;
	                           var endDate=from.down("#endDate");
	                           	endDate.setDisabled(false);
	                           	
                             }
                           }
                          },
                "form[xtype=resident.feesettingfrom] #hasEndDateFalse":{
	         	    change: function (cb, nv, ov) {
                         if(cb.getValue()==true){
	                        
	                           var from=cb.ownerCt.ownerCt.ownerCt.ownerCt;
	                           var endDate=from.down("#endDate");
	                           endDate.setValue(null);
	                         	endDate.setDisabled(true);
                              }
                           }
                          }
	         	
	         
	         


			
		});
	},
	views:[
	'core.base.resident.view.MainLayout',
	'core.base.resident.view.LevelTree',
	"core.base.resident.view.ResidentGrid",
	"core.base.resident.view.FeeSettingGrid",
	"core.base.resident.view.FeeSettingFrom",
	"core.base.resident.view.FeesSettingPanel",
	],
	stores:[
	'core.base.resident.store.LevelStore',
	"core.base.resident.store.SettingStore"
	],
    models : ['core.base.resident.model.SettingModel']
});