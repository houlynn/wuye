Ext.define("core.prop.point.controller.PointController",{
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
			"container[xtype=point.grid] button[ref=addButton]":{
							click : function (btn){
							 var modulegrid = btn.up("grid[xtype=point.grid]");	
							 var store=modulegrid.getStore();
			                 var tree=modulegrid.ownerCt.down("container[xtype=point.levelTree]");
			                 var selection=tree.getSelectionModel().getSelection();
			                 if(!selection||selection.length==0){
			                 	    system.errorInfo("请选择一个小区再进行添加","错误提示");
			                  return ;
			                 }
						     var model = Ext.create(modulegrid.getStore().model);
			                 model.set(model.idProperty, null); 
			              var tree= btn.ownerCt.ownerCt.ownerCt.down("container[xtype=point.levelTree]");
			              var vid=selection[0].get("code");
			             var  window=  Ext.createWidget("point.window",{
				                grid:modulegrid,
				                vid:vid
			                 });
			                    window.down('form[xtype=point.form]').getForm().loadRecord(model);
			                    var title=selection[0].get("text")+" 添加终点工信息";
			                    window.setTitle(title);
	                            window.show();
								}, 
				},
			/**
			 * 编辑
			 */	
				
			"container[xtype=point.grid]  button[ref=editButton] ":{
		   click:function(btn){
			var modulegrid = btn.up("grid[xtype=point.grid]");	
			var store=modulegrid.getStore();
			var tree=modulegrid.ownerCt.down("container[xtype=point.levelTree]");
			var selection=tree.getSelectionModel().getSelection();
		    var vid=selection[0].get("code");
			var  window=  Ext.createWidget("point.window",{
				                grid:modulegrid,
				                 vid:vid
			                 });
			var selection= modulegrid.getSelectionModel().getSelection()                 
	         window.down('form[xtype=point.form]').getForm().loadRecord(selection[0]);
			                    var title=selection[0].get("tf_name")+" 修改终点工信息";
			                    window.setTitle(title);
	                            window.show();
				}
			},	
			"container[xtype=point.grid]  button[ref=audit] ":{
				click:function(btn){
					var modulegrid=btn.up("grid[xtype=point.grid]");
			        var selection=modulegrid.getSelectionModel().getSelection();
			        if(selection.length>0){
			        Ext.MessageBox.confirm('确定删除', '确定要发布 '+selection[0].get("tf_name"),
					function(btn) {
						if (btn == 'yes') {
					 var resObj=self.ajax({url:"vi/audit.action",params:{id:selection[0].get("tf_pointId")}});
				     modulegrid.getStore().reload();
						}});
			        }
				}
			},		
			
			
		"form[xtype=point.form] #save":{
		  click:function(btn){
		  	
			var formObj=btn.up('form').getForm();
		    var win=btn.up('form').up("window");
			var record=formObj.getRecord();
			var poinid=record.get("tf_pointId");
			var params={vid:win.vid,
			           ctype:"001"
			};
			var flag=true;
		    if (formObj.isValid()) {
		    var url="vi/updatePoint.action";	
			if(poinid==null|| poinid==0){
			    url="vi/createPoint.action";
			    flag=false;
			}
				formObj.submit({
						url:url,
						params:params,
						//可以提交空的字段值
						submitEmptyText:true,
						//成功回调函数
						success:function(form,action){
							var obj=action.result.obj;
							  var model = Ext.create(win.grid.getStore().model);
							  model.data=obj;
							  formObj.loadRecord(model);
							  var store= win.grid.getStore();
							  store.load();
							  if(!flag){
							  system.smileInfo("添加成功!")
							  }else{
							  system.smileInfo("修改成功!")
							  }
						}});
					}
		   }
			
		},
			/**
			 * 删除
			 */
		"container[xtype=point.grid]  button[ref=removeButton] ":{
			click:function(btn){
			var modulegrid=btn.up("grid[xtype=point.grid]");
			var selection=modulegrid.getSelectionModel().getSelection();
			var message='';
			var infoMessage='';
			if (selection.length == 1) { 
				message = ' 『' + selection[0].get("tf_name") + '』 吗?';
				infoMessage = '『' + selection[0].get("tf_name") + '』';
			} else { 
				message = '<ol>';
				Ext.Array.each(selection, function(record) {
							message += '<li>' + record.get("tf_name") + '</li>';
						});
				message += '</ol>';
				infoMessage = message;
				message = '以下 ' + selection.length + ' 条记录吗?' + message;
			}
			var moduletitle = '<strong>' + "终点工"
					+ '</strong>';
			Ext.MessageBox.confirm('确定删除', '确定要删除 ' + moduletitle + ' 中的' + message,
					function(btn) {
						if (btn == 'yes') {
							 if(modulegrid.getSelectionModel().getSelection().length>0){
							 	var ids=new Array();
							   Ext.each(modulegrid.getSelectionModel().getSelection(),function(rec){
								var pkValue=rec.get(rec.idProperty);
								ids.push(pkValue);
							  });
							  console.log(ids);
							 var resObj=self.ajax({url:"vi/removerecords.action",params:{ids:ids,moduleName:"MeterInfo"}});
							 modulegrid.getStore().reload();
							 modulegrid.setTitle("终点工");
							 return;
							 }
							 modulegrid.setTitle("终点工");
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
			"container[xtype=point.levelTree]":{
				itemclick:function(treeview,node,item,index,e,eOpts){
					var tree=treeview.ownerCt;
					var gridModue=treeview.ownerCt.ownerCt.down("grid[xtype=point.grid]");
                	var store=gridModue.store;
                  	var proxy=store.getProxy();
                  	var selection=tree.getSelectionModel().getSelection()[0];
					proxy.extraParams.vid=selection.get("code");
				    proxy.extraParams.ctype="001";
					store.load();	  
				}
			},
		});
	},
	views:[
  "core.prop.point.view.MainLayout",
  "core.prop.point.view.LevelTree",
  "core.prop.point.view.PointGrid",
  "core.prop.point.view.PointWinodw",
  "core.prop.point.view.PointForm"
	],
	stores:[
	'core.prop.point.store.LevelStore',
	"core.prop.point.store.PointStore"
	],
    models : []
});