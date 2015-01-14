Ext.define("core.base.resident.controller.ResidentFeesController", {
	extend : "Ext.app.Controller",
	mixins: {
		suppleUtil:"core.util.SuppleUtil",
	},
	init : function() {
		var self = this
		// 事件注册
		this.control({
			/**
			 * 加载业主
			 */
			"container[xtype=resident.unitlevelTree]":{
				itemclick:function(treeview,node,item,index,e,eOpts){
					var tree=treeview.ownerCt;
					var dataView=treeview.ownerCt.ownerCt.down("dataview[xtype=nuit.dataview]");
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
                	var store=dataView.store;
                	if(store.navigates){
                		store.navigates.splice(0,store.navigates.length);
                		store.navigates.push(navigate);
                	}
                  	var proxy=store.getProxy();
					proxy.extraParams.navigates=Ext.encode(store.navigates);
					proxy.extraParams.moduleType=node.raw.nodeInfoType
					store.load();
					var unitePanel=tree.ownerCt;
					
				}
			},
			/**
			 * 加载小区
			 */
			"container[xtype=resident.unitlevelTree] combobox[ref=vicombobox]":{
				 select:function(combo,record,opts) {  
				 	 var  vid=record[0].get("itemCode");
				 	 var tree= combo.ownerCt.ownerCt;
				     var store=tree.getStore();
				   	var proxy=store.getProxy();
											proxy.extraParams.vid=vid;
											store.load();	
											
				}
			},
			/**
			 * 点击收费按钮
			 */
		   "grid[xtype=unite.unitefeesgrid] #uniteFees":{
				click:function(btn){
						var grid=btn.up("grid[xtype=unite.unitefeesgrid]");
						var sm= grid.getSelectionModel().getSelection();
						 if(sm.length==0){
	   		     	      		system.warnInfo("请选择至少一条业主信息进行操作!")
	   		     	      	 return;
	   		     	     }
	   		     	      var form=grid.ownerCt.ownerCt.ownerCt;
	   		     	       var  tf_shouldCountF=  form.down("#tf_shouldCount");
	   		     	   	   var tf_shouldCount=tf_shouldCountF.getValue();
	   		     	   	   var tf_realACount=form.down("#tf_realACount").getValue();
	   		     	   	   var tf_remark=form.down("#tf_remark").getValue();
	   		     	   	   if(!tf_realACount){
	   		     	   	     system.warnInfo("请填写实收金额!");
	   		     	   	     return;
	   		     	   	   }
	   		     	   	     if(!tf_shouldCount){
	   		     	   	      system.warnInfo("应收金额不能为空!");
	   		     	   	     return;
	   		     	   	   }
	   		     	  var bids=[];
	   		     	  for(var i=0;i<sm.length;i++){
	   		     	  bids.push(sm[i].get("tf_billitemid"));
	   		     	  }
	   		     	   	   
   		     	   	   var params={
   		     	   	   tf_shouldCount:tf_shouldCount,
   		     	   	   tf_realACount:tf_realACount,
   		     	   	   tf_remark:tf_remark,
   		     	   	   bids:bids,
   		     	   	   rid:form.rid
   		     	   	   };
   		     	  var resObj=self.ajax({url:"/unite/fees.action",params:params});  
   		     	  grid.getStore().load(function(){
   		          var sum=store.sum;
	             tf_shouldCountF.setValue(sum);
	             tf_shouldCount.setDisabled(true);
   		     	  	
   		     	  });
					
					}
		   },
		"dataview[xtype=nuit.dataview]" : {
		    render: function() {
                                  Ext.getBody().on("contextmenu", Ext.emptyFn,null, {preventDefault: true});
                          },
			itemcontextmenu:function( dataView, record, item, index, e, eOpts ) {
			if (!dataView.menu) {
				dataView.menu = new Ext.menu.Menu({
							items : [{
										 text : '查看业主详细信息',
										 iconCls : 'return',
										 itemId : 'query',
										 handler:function( item, e, eOpts ){
											var dataView= Ext.getCmp("phones");
											var records=dataView. getSelectionModel().getSelection();
											if(records.length==0){
											   system.warnInfo("请选中房号进行查看");
											   return;
											}
											var rid=records[0].raw.rid;
										    var viewModel=system.getViewModel(104);
							                var model=core.app.module.factory.ModelFactory.getModelByModule(viewModel.data);
								            model.load(rid, {
										    scope: this,
										    failure: function(record, operation) {
										    },
										    success: function(record, operation) {
										    var window = Ext.create('core.app.view.region.BaseWindow', {
																	viewModel:viewModel,
																	 grid:dataView});
																     var obje=Ext.decode(Ext.value(record.raw,'{}'));
																     record.data=obje;
																	 window.down('baseform').setData(record);
																	 window.show();
										    },
										    callback: function(record, operation, success) {
										    }
										 });
									}
								}, {
										text : '收费',
										iconCls : 'table_save',
										itemId : 'fees',
										handler:function( item, e, eOpts ){
												var dataView= Ext.getCmp("phones");
											var records=dataView. getSelectionModel().getSelection();
											if(records.length==0){
											   system.warnInfo("请选中房号进行收费");
											   return;
											}
											uniteFees(records[0],dataView);
										}
									}/*, {
										iconCls : 'table_edit',
										text : '查看收费历史',
										itemId : 'history',
										handler:function( item, e, eOpts ){
												var dataView= Ext.getCmp("phones");
											var records=dataView. getSelectionModel().getSelection();
												if(records.length==0){
											   system.warnInfo("请选中房号进行查看");
											   return;
											   
											}
										}
									}, '-', {
										text : '查看报修单',
										iconCls : 'table_edit',
										itemId:"repair",
										handler:function( item, e, eOpts ){
										    var dataView= Ext.getCmp("phones");
											var records=dataView. getSelectionModel().getSelection();
												if(records.length==0){
											   system.warnInfo("请选中房号进行查看报修单");
											   return;
											}
											
											
										}
									}*/]
						});
			         }
			           dataView.menu.showAt(e.getXY());
			          e.stopEvent();
		              },
		            itemclick:function( view, record, item, index, e, eOpts ){
		            	var unitePanel=view.ownerCt;
		                 unitePanel.setTitle(record.get("number")+" "+record.get("rname"));
		                 var uniteDatail= unitePanel.down("#uniteDetail");
		                 var  from=unitePanel.down("#uniteFrom");
		                 var rid=record.raw.rid;
		                 /**
		                  * 加载收费历史数据
		                  */
		                  var feesGrid=unitePanel.down("grid[xtype=unite.unitefeesgrid]");
		                  var store=feesGrid.store;
				   	      var proxy=store.getProxy();
											proxy.extraParams.rid=rid;
											proxy.extraParams.rtype="001";
											store.load();	
					  /**
					   * 加载保修数据
						*/
					var modue=system.getModuleDefine("ResidentInfo");						
					var  repairgrepairgrid=	unitePanel.down("grid[xtype=unite.repairgrid]");
					        var navigate={
                			moduleName:"ResidentInfo",
                			tableAsName:"_t"+modue.tf_moduleId,
                			text:"",
                			primarykey:modue.tf_primaryKey,
                		    fieldtitle:"",
                		    equalsValue:rid,
                		    isCodeLevel:false
                	};
                	var repairStroe=repairgrepairgrid.store;
                	if(store.navigates){
                		store.navigates.splice(0,store.navigates.length);
                		store.navigates.push(navigate);
                	}
                  	var proxy=repairStroe.getProxy();
					proxy.extraParams.navigates=Ext.encode(store.navigates);
					repairStroe.load();	
					
		            }   
					},
					
/////////////////////////////////////////保修单操作////////////////////////////////////////////////////					
     "grid[xtype=unite.repairgrid] #new":{
       click:function(btn){
       	                   var modulegrid = btn.up("grid[xtype=unite.repairgrid]");	
							 var store=modulegrid.getStore();
							 var panel=modulegrid.ownerCt.ownerCt.ownerCt.ownerCt;
							 var tree= panel.down("container[xtype=resident.unitlevelTree]");
			                 var selection=tree.getSelectionModel().getSelection();
			                 if(!selection&&selection.length==0){
			                  return ;
			                 }else{
			                    if(selection[0].get("nodeInfoType")=="0"){
			                    system.errorInfo("请选择对应的楼层再进行添加","错误提示");
			                    return ;
			                   }
			                 }
			          var dataView= Ext.getCmp("phones");
				     var records=dataView. getSelectionModel().getSelection();
					 if(records.length==0){
					 system.warnInfo("请选中房号进行查看");
					 return;
					 }
					 var  record= records[0]
			         var rid=record.get("rid");
					var viewModel=system.getViewModel(302);
				    var modue=system.getModuleDefine("ResidentInfo");
					var navigate={
                			moduleName:"ResidentInfo",
                			tableAsName:"_t"+modue.tf_moduleId,
                			text:record.get("rname"),
                			primarykey:modue.tf_primaryKey,
                		    fieldtitle:"001",
                		    equalsValue:rid,
                		    isCodeLevel:false
                	};
                	if(store.navigates){
                		store.navigates.splice(0,store.navigates.length);
                		store.navigates.push(navigate);
                	}
                	var proxy=store.getProxy();
                  	proxy.extraParams.navigates=Ext.encode(store.navigates);
				   var model = Ext.create(modulegrid.getStore().model);
			                 model.set(model.idProperty, null); // 设置主键为null,可自动
			                 var viewModel=system.getViewModel(302)
			                 var window = Ext.create('core.app.view.region.BaseWindow', {
				                           viewModel:viewModel,
				                            grid:modulegrid
			                                 });
			                    window.down('baseform').setData(model);
			                    window.setTitle(record.get("number")+" "+record.get("rname"));
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
         "grid[xtype=unite.repairgrid] #edit":{
       click:function(btn){
       		var modulegrid = btn.up("grid[xtype=unite.repairgrid]");	
			var viewModel=system.getViewModel(302);
			var window = Ext.create('core.app.view.region.BaseWindow', {
				viewModel:viewModel,
				grid:modulegrid
			});
	       window.down('baseform').setData(modulegrid.getSelectionModel().getSelection()[0]);
	       window.show();
       	
       }
     },		
         "grid[xtype=unite.repairgrid] #delete":{
         click:function(btn){
         	var modulegrid=btn.up("grid[xtype=unite.repairgrid]");
         	var viewModel=system.getViewModel(302);
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
			var moduletitle = '<strong>' + viewModel.get('tf_title')
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
/////////////////////////////////////////保修单操作结束////////////////////////////////////////////////////						
					
				});
	},
	views : ["core.base.resident.view.ResidentUnit",
	          'core.base.resident.view.LevelTree',
	          "core.base.resident.view.UnitLevelTree",
			"core.base.resident.view.UnitDataView",
			 "core.base.resident.view.UniteFeesForm",
			 "core.base.resident.view.UniteFeesGrid",
			 "core.base.resident.view.RepairGrid"
			],
	stores : ["core.base.resident.store.UnitStore",'core.base.resident.store.LevelStore',]
});
/**
 * 打开收费窗口
 * @param {} record
 */
function uniteFees(record,view){
	  var win= Ext.createWidget("window",{
	  	title:"客户收费",
	   	width:1000,
	    closeAction : 'hide',
	    layout : 'fit',
	    style:'border-width:0 0 0 0;',
	    shadowOffset : 30,
	    maxHeight :document.body.clientHeight * 0.98,
	    autoHeight:true,
	    maximized:0,
	    maximizable:!0,
	    module: 0,
	    autoScroll : false,
	  	items:[{
	  	 xtype:"unite.unitefeesfrom",
	  	 rid:record.get("rid"),
	  	}],
	  });
	  win.show();
	  var niteFeesGrid=win.down("form[xtype=unite.unitefeesfrom]").down("grid[xtype=unite.unitefeesgrid]");
	 var  store=niteFeesGrid.getStore();
	/// store.rid=rid;
	  var proxy=store.getProxy();
	  proxy.extraParams.rid=record.get("rid");
	  var form=win.down("form[xtype=unite.unitefeesfrom]");
      var tf_shouldCount=form.down("#tf_shouldCount");
	  store.load(function(){
	        var sum=store.sum;
	         tf_shouldCount.setValue(sum);
	         tf_shouldCount.setDisabled(true);
	  
	  });
	  win.setTitle( record.get("number")+"--"+record.get("rname"));
 

}

