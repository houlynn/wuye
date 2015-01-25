Ext.define("core.prop.expre.controller.ExpreController",{
	extend:"Ext.app.Controller",
	mixins: {
		suppleUtil:"core.util.SuppleUtil",
	},
init:function(){
	var self=this;
	this.control({

		    /**
			 * 编辑
			 */
				

			"container[xtype=expre.grid]  button[ref=audit] ":{
				click:function(btn){
					var modulegrid=btn.up("grid[xtype=expre.grid]");
			        var selection=modulegrid.getSelectionModel().getSelection();
			        if(selection.length>0){
			        Ext.MessageBox.confirm('确定删除', '确定要发审核'+selection[0].get("tf_roomNub")+"快件吗？",
					function(btn) {
					if (btn == 'yes') {
					 var resObj=self.ajax({url:"vi/auditExpre.action",params:{id:selection[0].get("tf_exprid")}});
				     modulegrid.getStore().load();
						}});
			        }
				}
			},		

			/**
			 * 删除
			 */
		"container[xtype=expre.grid]  button[ref=removeButton] ":{
			click:function(btn){
			var modulegrid=btn.up("grid[xtype=expre.grid]");
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
			var moduletitle = '<strong>' + "快递收发信息"
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
							 var resObj=self.ajax({url:"vi/removeExpre.action",params:{ids:ids,moduleName:"ExpressInfo"}});
							 modulegrid.getStore().load();
							 modulegrid.setTitle("");
							 return;
							 }
							 modulegrid.setTitle("快递收发信息");
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
												ddGroup : 'DD_grid_' +"快递收发",
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
			"container[xtype=expre.levelTree]":{
				itemclick:function(treeview,node,item,index,e,eOpts){
					var tree=treeview.ownerCt;
					var gridModue=treeview.ownerCt.ownerCt.down("grid[xtype=expre.grid]");
                	var store=gridModue.store;
                  	var proxy=store.getProxy();
                  	var selection=tree.getSelectionModel().getSelection()[0];
					proxy.extraParams.vid=selection.get("code");
					store.load();	  
				}
			},

			
			
		});
	},
	views:[
  "core.prop.expre.view.MainLayout",
  "core.prop.expre.view.LevelTree",
  "core.prop.expre.view.ExpreGrid",
	],
	stores:[
	'core.prop.point.store.LevelStore',
	"core.prop.expre.store.ExpreStore"
	],
    models : []
});