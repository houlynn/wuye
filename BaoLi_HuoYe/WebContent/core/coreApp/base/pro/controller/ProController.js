Ext.define("core.base.pro.controller.ProController",{
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
	"core.base.pro.view.ProGrid",
	"core.base.pro.view.ProPanel"
	],
	stores:[
	],
	
});
