Ext.define("core.bl.mesg.controller.MassageController",{
	extend:"Ext.app.Controller",
	init:function(){
		var self=this
		//事件注册
		this.control({
		});
	},
	views:[
	"core.bl.mesg.view.MassageGrid",
	"core.bl.mesg.view.MassagePanel",
	"core.bl.mesg.view.MassageForm"
	],
	stores:[
	        "core.bl.mesg.store.MassageStore"
		]
});