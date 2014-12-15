Ext.define("core.sys.log.controller.LogController",{
	extend:"Ext.app.Controller",
	init:function(){
		var self=this
		//事件注册
		this.control({
		});
	},
	views:[
	"core.sys.log.view.LogGrid",
	"core.sys.log.view.LogPanel"
	],
	stores:[
	        "core.sys.log.store.LogStore"
		]
});