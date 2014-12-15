Ext.define("core.prop.feespower.controller.FeespowerController",{
	extend:"Ext.app.Controller",
	mixins: {
		suppleUtil:"core.util.SuppleUtil",
	},
init:function(){
	var self=this
	this.control({
		/**
		 * 添加
		 */
			"container[xtype=feespower.gridModue] button[ref=addButton]":{
							click : function (btn){
							 var modulegrid = btn.up("grid[xtype=feespower.gridModue]");	
							 var store=modulegrid.getStore();
			                 var tree=modulegrid.ownerCt.down("container[xtype=feespower.levelTree]");
			                 var selection=tree.getSelectionModel().getSelection();
			                 if(!selection&&selection.length==0){
			                  return ;
			                 }else{
			                    if(selection[0].get("nodeInfoType")=="0"||selection[0].get("nodeInfoType")=="1"){
			                    system.errorInfo("请选择对应的房号在进行添加","错误提示");
			                    return ;
			                   }
			                 }
							 var viewModel=system.getViewModel(201);
                	         if(!store.navigates||store.navigates.length==0){
                	            system.errorInfo("请选择对应的房号在进行添加","错误提示");
                	         	return;
                	          }
							 
						     var model = Ext.create(modulegrid.getStore().model);
			                 model.set(model.idProperty, null); 
			                 model.set("tf_mtype","001");
			                 var  window=  Ext.createWidget("feespower.window",{
			                   viewModel:viewModel,
				                grid:modulegrid
			                 });
			                    window.down('form[xtype=baseform]').setData(model);
			                    var title=selection[0].get("text")+" 水表信息录入";
			                    window.setTitle(title);
	                            window.show();
								}, 
								render : function(btn) {
									var modulegrid= btn.up("resident.gridModue");
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
				
			"container[xtype=feespower.gridModue]  button[ref=editButton] ":{
		   click:function(btn){
			var modulegrid = btn.up("grid[xtype=feespower.gridModue]");	
			 var viewModel=system.getViewModel(201);
			var  window=  Ext.createWidget("feespower.window",{
			                   viewModel:viewModel,
				                grid:modulegrid
			                 });
			var selection= modulegrid.getSelectionModel().getSelection()                 
	       window.down('baseform').setData(selection[0]);
	          var title="修改录入信息";
			                    window.setTitle(title);
	                            window.show();
	       window.show();
				}
			},	
		"form[xtype=feespower.settingform] #save":{
		  click:function(btn){
		   	 var form= btn.up("form[xtype=feespower.settingform]");
		   	 var rendField=form.down("#reddate");
		   	 var reddate=rendField.getValue();
		   	 var resObj=self.ajax({url:"/201/acount.action",params:{rendate:reddate,type:"001"}});
		   	 form.grid.reloade();

		  }
		},
			
			
		"container[xtype=feespower.gridModue]  button[ref=seting] ":{
           click:function(btn){
           	var modulegrid=btn.up("grid[xtype=feespower.gridModue]");
           	 var window= Ext.createWidget("window",{
           	  title:"结束抄表",
           	  width:300,
           	  height:100,
           	  items:[{xtype:"feespower.settingform", grid:modulegrid}]
           	 });
           	 window.show();
           	
           	/*
           	      Ext.MessageBox.prompt('结束抄表', '请填入日期', function(btn, leveName) {
                         if(btn=="ok"){
         	            var params={vid:vid,leveName:leveName,level:"1",parent:parent.get("id")}
         	            var resObj=self.ajax({url:"/102/A001.action",params:params});
         	            var store=tree.getStore();
                     	var proxy=store.getProxy();
											proxy.extraParams.vid=vid;
											store.load();	
                       } });
           */
           }			
		},	
			/**
			 * 删除
			 */
		"container[xtype=feespower.gridModue]  button[ref=removeButton] ":{
			click:function(btn){
			var modulegrid=btn.up("grid[xtype=feespower.gridModue]");
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
			"container[xtype=feespower.levelTree]":{
				itemclick:function(treeview,node,item,index,e,eOpts){
					var tree=treeview.ownerCt;
					var gridModue=treeview.ownerCt.ownerCt.down("grid[xtype=feespower.gridModue]");
					var modue=system.getModuleDefine(node.raw.nodeInfo);
					var nodeInfoType=node.raw.nodeInfoType;
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
                    proxy.extraParams.nodeInfoType=nodeInfoType;
					proxy.extraParams.navigates=Ext.encode(store.navigates);
					store.load();	  
				}
			},
			/**
			 * 加载节点
			 */
			"container[xtype=feespower.levelTree] basecombobox[ref=vicombobox]":{
				 select:function(combo,record,opts) {  
				 	 var  vid=record[0].get("itemCode");
				 	 var tree= combo.ownerCt.ownerCt;
			        var store=tree.getStore();
				   	var proxy=store.getProxy();
											proxy.extraParams.vid=vid;
											store.load();	
											
				}
			}
		  


		});
	},
	views:[
	'core.prop.feespower.view.MainLayout',
	'core.prop.feespower.view.LevelTree',
	"core.prop.feespower.view.FeespowerGrid",
	"core.prop.feespower.view.FeeWinodw",
	"core.prop.feespower.view.SettingForm"
	],
	stores:[
	'core.prop.feespower.store.LevelStore',
	],
    models : []
});