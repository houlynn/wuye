Ext.define("core.base.village.controller.VillageController",{
	extend:"Ext.app.Controller",
	mixins: {
		suppleUtil:"core.util.SuppleUtil",
	},
	init:function(){
		var self=this
		//事件注册
	  this.control({
	  	
	 
	  });
	},
	views:[
	"core.base.village.view.VillageGrid",
	"core.base.village.view.VillagePanel"
	],
	stores:[
	],
	
});
