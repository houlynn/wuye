Ext.define("core.store.storeCheck.controller.StoreCheckController",{
	extend:"Ext.app.Controller",
	init:function(){
		var self=this
		//事件注册
		this.control({
		});
	},
	views:[
	"core.store.storeCheck.view.StoreCheckGrid",
	"core.store.storeCheck.view.StoreCheckPanel",
	"core.store.storeCheck.view.StoreCheckForm"
	],
	stores:[
	        "core.store.storeCheck.store.StoreCheckStore"
		]
});