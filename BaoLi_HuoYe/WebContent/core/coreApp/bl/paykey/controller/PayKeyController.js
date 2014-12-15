Ext.define("core.bl.paykey.controller.PayKeyController",{
	extend:"Ext.app.Controller",
	init:function(){
		var self=this
		//事件注册
		this.control({
		});
	},
	views:[
	"core.bl.paykey.view.PayKeyGrid",
	"core.bl.paykey.view.PayKeyPanel",
	"core.bl.paykey.view.PayKeyForm"
	],
	stores:[
	        "core.bl.paykey.store.PayKeyStore"
		]
});