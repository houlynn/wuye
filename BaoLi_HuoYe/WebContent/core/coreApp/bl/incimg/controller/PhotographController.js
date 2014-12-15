Ext.define("core.bl.incimg.controller.PhotographController",{
	extend:"Ext.app.Controller",
	init:function(){
		var self=this
		//事件注册
		this.control({
		});
	},
	views:[
	"core.bl.incimg.view.PhotographGrid",
	"core.bl.incimg.view.PhotographPanel",
	"core.bl.incimg.view.PhotographForm"
	],
	stores:[
	        "core.bl.incimg.store.PhotographStore"
		]
});