Ext.define("core.prop.feesgtp.controller.FeesController",{
	extend:"Ext.app.Controller",
	mixins: {
		suppleUtil:"core.util.SuppleUtil",
		formUtil : "core.util.FormUtil"
	},
init:function(){
	var self=this
	this.control({
		/**
		 * 添加 抄水表信息
		 */
			"container[xtype=feesgtp.gridModue] button[ref=addButton]":{
							click : function (btn){
							 var modulegrid = btn.up("grid[xtype=feesgtp.gridModue]");	
							 var store=modulegrid.getStore();
			                 var tree=modulegrid.ownerCt.down("container[xtype=feesgtp.levelTree]");
			                 var selection=tree.getSelectionModel().getSelection();
			                  if(!selection||selection.length==0){
			                 	   system.errorInfo("请选择一个小区!","错误提示");
			                  return ;
			                 }
							 var viewModel=system.getViewModel(321);
						     var model = Ext.create(modulegrid.getStore().model);
			                 model.set(model.idProperty, null); 
			                 model.set("tf_mtype","003");
			                var vid=selection[0].get("code");
			                var window=  Ext.createWidget("window",{
			             	   items:{xtype:"feesgtp.form", vid:vid},
				                grid:modulegrid
				               
			                 });
			                    window.down('form[xtype=feesgtp.form]').getForm().loadRecord(model);
			                    var title=selection[0].get("text")+" 录入抄表信息";
			                    window.setTitle(title);
	                            window.show();
								}
				},
			/**
			 * 编辑
			 */	
				
			"container[xtype=feesgtp.gridModue]  button[ref=editButton] ":{
		   click:function(btn){
			var modulegrid = btn.up("grid[xtype=feesgtp.gridModue]");
			 var selection;
			 var tree=modulegrid.ownerCt.down("container[xtype=feesgtp.levelTree]");
			               selection= tree.getSelectionModel().getSelection();
			                 if(!selection&&selection.length==0){
			                  return ;
			                 }
			   var vid=selection[0].get("code");                 
             var  window=  Ext.createWidget("window",{
			             	   items:{xtype:"feesgtp.form",vid:vid},
				                grid:modulegrid
				               
			                 });
			 var model= modulegrid.getSelectionModel().getSelection()[0];
			                   var form= window.down('form[xtype=feesgtp.form]')
			                   form.getForm().loadRecord(model);
			                    var insid= model.get("itemRemark");
			                    var title=selection[0].get("text")+" 修改抄表信息";
			                    window.setTitle(title);
	                            window.show();
	                               form.down("#tf_InnstallBill").setValue(insid)
				}
			},	
			
			
			/**
			 * 删除
			 */
		"container[xtype=feesgtp.gridModue]  button[ref=removeButton] ":{
			click:function(btn){
			var modulegrid=btn.up("grid[xtype=feesgtp.gridModue]");
			var module=modulegrid.viewModel;
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
							 if(modulegrid.getSelectionModel().getSelection().length>0){
							 	var ids=new Array();
							   Ext.each(modulegrid.getSelectionModel().getSelection(),function(rec){
								var pkValue=rec.get(rec.idProperty);
								ids.push(pkValue);
							  });
							 var resObj=self.ajax({url:"/201/removerepol.action",params:{ids:ids,moduleName:"PoollGtinfo"}});
							 modulegrid.getStore().load();
							 modulegrid.setTitle("抄电表信息");
							 return;
							 }
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
				/**
				 * 点击
				 */
			"container[xtype=feesgtp.levelTree]":{
				itemclick:function(treeview,node,item,index,e,eOpts){
					var tree=treeview.ownerCt;
					var gridModue=treeview.ownerCt.ownerCt.down("grid[xtype=feesgtp.gridModue]");
                	var store=gridModue.store;
                	var vid= tree.getSelectionModel().getSelection()[0].get("code");
                  	var proxy=store.getProxy();
                    proxy.extraParams.whereSql="  and tf_Village="+vid+" and tf_mtype='003'";
					store.load();	  
				}
			},


	         /**
	          * 加载combox数据
	          */
	         "form[xtype=feesgtp.form] #tf_InnstallBill":{
	         	  render:function(combo) {
	         	  	var from= combo.ownerCt.ownerCt.ownerCt;
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
	            "form[xtype=feesgtp.form] #save":{
	               click:function(btn){
	               var form = btn.up("form[xtype=feesgtp.form]");
					var formObj = form.getForm();
					var intsrid = form.down("#tf_InnstallBill").getValue();
					var vid = form.vid;
					var params = {
						intsrid : intsrid,
						vid : vid,
						type:"003"
					}
					var record= formObj.getRecord();
					var tf_poolid= form.down("#tf_poolid").getValue();
					var url="/201/addpool.action";
					if(tf_poolid&&tf_poolid!=0){
					url="/201/updatedpool.action"
					}
					formObj.submit({
						url : url,
						params : params,
						// 可以提交空的字段值
						submitEmptyText : true,
						// 成功回调函数
						success : function(form, action) {
							var obj = action.result.obj;
							if (action.result.success) {
								self.setFormValue(formObj, obj);
								system.smileInfo("添加成功!");
								var form = btn.up("form[xtype=feesgtp.form]");
								form.down("#tf_InnstallBill").setValue(intsrid);
								var grid=form.ownerCt.grid;
							    grid.getStore().reload();
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
	       "container[xtype=feesgtp.gridModue]  button[ref=submit]":{    
	       	 click:function(btn){
	       	 var modulegrid=btn.up("grid[xtype=feesgtp.gridModue]");
			 var selection=modulegrid.getSelectionModel().getSelection();
			  if(!selection||selection.length==0){
			  	  system.errorInfo("请选择一条记录进行审核!","错误提示");
			                  return ;
			     }
			     	var id=selection[0].get("tf_poolid");
			     	var tf_meterdate=selection[0].get("tf_meterdate");
			 	Ext.MessageBox.confirm('确认审核', '你确认要审核： ' + tf_meterdate + ' 的抄表信息？',function(btn){
			 		if (btn == 'yes') {
			 		  	   var resObj=self.ajax({url:"/201/submit.action",params:{id:id}});    
			 		  	   if(!resObj.errorInfo){
		                   modulegrid.getStore().load();
		                   system.smileInfo("审核成功!");
			 		  	   }
			 		}
			 	});    
	       	 }
	       },     
	            
	            
	            

		});
	},
	views:[
	'core.prop.feesgtp.view.MainLayout',
	'core.prop.feesgtp.view.LevelTree',
	"core.prop.feesgtp.view.FeesGrid",
	"core.prop.feesgtp.view.FeesgtForm"

	],
	stores:[
	'core.prop.feesgtp.store.LevelStore'
	],
    models : []
});