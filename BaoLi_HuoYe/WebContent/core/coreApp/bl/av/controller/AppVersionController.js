Ext.define("core.bl.av.controller.AppVersionController",{
	extend:"Ext.app.Controller",
	init:function(){
		var self=this
		//事件注册
		this.control({
		});
	},
	views:[
	"core.bl.av.view.AppVersionGrid",
	"core.bl.av.view.AppVersionPanel",
	"core.bl.av.view.AppVersionForm"
	],
	stores:[
	        "core.bl.av.store.AppVersionStore"
		]
});