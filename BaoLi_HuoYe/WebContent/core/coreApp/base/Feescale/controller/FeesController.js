Ext.define("core.base.Feescale.controller.FeesController",{
	extend:"Ext.app.Controller",
	mixins: {
		suppleUtil:"core.util.SuppleUtil",
	},
init:function(){
	var self=this;
	this.control({

		
				/**
		 * 添加 抄水表信息
		 */
			"container[xtype=feesv.grid] button[ref=addButton]":{
							click : function (btn){
							alert(btn);
							 var modulegrid = btn.up("grid[xtype=feesv.grid]");	
							 var store=modulegrid.getStore();
			                 var tree=modulegrid.ownerCt.down("container[xtype=feesv.levelTree]");
			                 var selection=tree.getSelectionModel().getSelection();
			                 if(!selection||selection.length==0){
			                 	    system.errorInfo("请选择一个小区再进行添加","错误提示");
			                  return ;
			                 }
						     var model = Ext.create(modulegrid.getStore().model);
			                 model.set(model.idProperty, null); 
			              var tree= btn.ownerCt.ownerCt.ownerCt.down("container[xtype=fees.levelTree]");
			              var vid=selection[0].get("code");
			               var viewModel=system.getViewModel(106);
			             var  window=  Ext.createWidget("feesv.window",{
			                    viewModel:viewModel,
				                grid:modulegrid,
				                vid:vid
			                 });
			                    window.down('form[xtype=baseform]').setData(model);
			                    var title=selection[0].get("text")+" 收费标准录入";
			                    window.setTitle(title);
	                            window.show();
								}, 
								render : function(btn) {
									 var viewModel=system.getViewModel(106);
									btn.dropZone = new Ext.dd.DropZone(btn.getEl(), {
												ddGroup : 'DD_grid_' + viewModel.get('tf_moduleName'),
												getTargetFromEvent : function(e) {
													return e.getTarget('');
												},
												onNodeOver : function(target, dd, e, data) {
													return Ext.dd.DropZone.prototype.dropAllowed;
												},
												onNodeDrop : function(target, dd, e, data) {
													var b = btn.menu.down('#newwithcopy');
													b.fireEvent('click', b);
												}
											})
								}
				},
			/**
			 * 编辑
			 */	
				
			"container[xtype=feesv.grid]  button[ref=editButton] ":{
		   click:function(btn){
			var modulegrid = btn.up("grid[xtype=feesv.grid]");	
			 var viewModel=system.getViewModel(106);
			var  window=  Ext.createWidget("feesv.window",{
			                   viewModel:viewModel,
				                grid:modulegrid
			                 });
			var selection= modulegrid.getSelectionModel().getSelection()                 
	       window.down('baseform').setData(selection[0]);
	          var title="修改收费标准信息";
			                    window.setTitle(title);
	                            window.show();
	       window.show();
				}
			},	
			
			/**
			 * 删除
			 */
		"container[xtype=feesv.grid]  button[ref=removeButton] ":{
			click:function(btn){
			var modulegrid=btn.up("grid[xtype=feesv.grid]");
			 var module=system.getViewModel(106);
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
							 var resObj=self.ajax({url:"rest/module/removerecords.do",params:{ids:ids,moduleName:"MeterInfo"}});
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
							       var module=system.getViewModel(106);
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
				/**
				 * 点击
				 */
			"container[xtype=feesv.levelTree]":{
				itemclick:function(treeview,node,item,index,e,eOpts){
					var tree=treeview.ownerCt;
					var gridModue=treeview.ownerCt.ownerCt.down("grid[xtype=feesv.grid]");
					var modue=system.getModuleDefine(node.raw.nodeInfo);
					var nodeInfoType=node.raw.nodeInfoType;
					var fieldtitle=node.raw.descriptionnodeInfoType;
					var navigate={
                			moduleName:node.raw.nodeInfo,
                			tableAsName:"_t"+modue.tf_moduleId,
                			text:node.raw.text,
                			primarykey:modue.tf_primaryKey,
                		    fieldtitle:fieldtitle,
                		    equalsValue:node.raw.code,
                		    isCodeLevel:false
                	};
                	var store=gridModue.store;
                	if(store.navigates){
                		store.navigates.splice(0,store.navigates.length);
                		store.navigates.push(navigate);
                	}
                  	var proxy=store.getProxy();
					proxy.extraParams.navigates=Ext.encode(store.navigates);
					store.load();	  
				}
			},
			/**
			 * 加载节点
			 */
			"container[xtype=fees.levelTree] combobox[ref=vicombobox]":{
				 select:function(combo,record,opts) {  
				 	 var  vid=record[0].get("itemCode");
				 	 var tree= combo.ownerCt.ownerCt;
			        var store=tree.getStore();
				   	var proxy=store.getProxy();
											proxy.extraParams.vid=vid;
											store.load();	
											
				}
			},
		"window[xtype=fees.window] baseform #save":{
			beforeclick:function(btn){
				btn.callback=function(info){
					var resutlCode= info.errorInfo.resultCode;
					var vid=btn.up("window[xtype=fees.window]").vid;
					 if(300==resutlCode){
						 btn.ownerCt.ownerCt.ownerCt.close();
				    	 var window= Ext.createWidget("window",{
				           	  title:"并联收费标准",
				           	  width:300,
				           	  height:100,
				           	  items:[{xtype:"fees.feesitemform",vid:vid}]
				           	 });
				           	 window.show();
					 }
				}
			 }
			},
	         /**
	          * 加载combox数据
	          */
	         "form[xtype=fees.feesitemform] #feeeItemCombobox":{
	         	  render:function(combo) {
	         	  	var from= combo.ownerCt;
	         	  	var vid=from.vid;
	         	    var ddCode ={
                          whereSql:' and tf_Village='+vid
                       }
                 Ext.apply(combo.ddCode,ddCode);
                 var store=combo.store;
                 var proxy=store.getProxy();
				  proxy.extraParams=combo.ddCode;
			      store.load();	
	         	  }
	         },
	           "form[xtype=fees.feesitemform] #save":{
	           	click:function(btn){
	           			 var from= btn.ownerCt.ownerCt;
	           			 var comm=from.down("#feeeItemCombobox");
	           			 var feessid=comm.getValue();
	         	  	     var vid=from.vid;
                       	 var resObj=self.ajax({url:"/201/linkFess.action",params:{vid:vid,type:"B001",feessid:feessid}});	           	
	           	
	           	}
	           }, 
		});
	},
	views:[
  "core.base.Feescale.view.FeeWinodw",
  "core.base.Feescale.view.FeesGrid",
  "core.base.Feescale.view.LevelTree",
  "core.base.Feescale.view.MainLayout"
	],
	stores:[
	'core.base.Feescale.store.LevelStore',
	],
    models : []
});