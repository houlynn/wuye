Ext.define("core.bl.mc.controller.MerchantController",{
	extend:"Ext.app.Controller",
	init:function(){
		var self=this
		//事件注册
		this.control({
		});
	},
	views:[
	"core.bl.mc.view.MerchantGrid",
	"core.bl.mc.view.MerchantPanel",
	"core.bl.mc.view.MerchantForm"
	],
	stores:[
	        "core.bl.mc.store.MerchantStore"
		]
});