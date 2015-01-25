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