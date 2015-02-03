Ext.define("core.prop.repair.controller.RepairController",{
	extend:"Ext.app.Controller",
	mixins: {
		suppleUtil:"core.util.SuppleUtil",
	},
init:function(){
	var self=this;
	this.control({

				"container[xtype=repair.levelTree]":{
				itemclick:function(treeview,node,item,index,e,eOpts){
					var tree=treeview.ownerCt;
					var gridModue=treeview.ownerCt.ownerCt.down("grid[xtype=repair.grid]");
                	var store=gridModue.store;
                  	var proxy=store.getProxy();
                    proxy.extraParams.vid=node.get("code");
					store.load();	
				}
			},
			"grid[xtype=repair.grid] #summit":{
			   click:function(btn){
			   var modulegrid=btn.up("grid[xtype=repair.grid]");
			   var selection=modulegrid.getSelectionModel().getSelection();
			  if(!selection||selection.length==0){
			  	  system.errorInfo("请选择一条记录进行审核!","错误提示");
			        return ;
			     }
			     	Ext.MessageBox.confirm('确定审核', '你确定要审核 ' + selection[0].get("tf_ResidentInfo") + "保修吗？",
					function(btn) {
						if (btn == 'yes') {
							var resObj=self.ajax({url:"/vi/summitRepair.action",params:{id:selection[0].get("tf_repairId")}});	  
			   	      	    if(!resObj.errorInfo){
		                   modulegrid.getStore().load();
		                  // system.smileInfo("审核成功!");
			 		  	   }
						}});
			   }
			}

		});
	},
	views:[
   "core.prop.repair.view.MainLayout",
   "core.prop.repair.view.LevelTree",
   "core.prop.repair.view.RepairGrid"
	],
	stores:[
	"core.prop.point.store.LevelStore"
	],
    models : []
});