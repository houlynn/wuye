Ext.define("core.store.ohertStore.controller.OhertStoreController",{
	extend:"Ext.app.Controller",
	init:function(){
		var self=this
		//事件注册
		this.control({
		});
	},
	views:[
	"core.store.ohertStore.view.OhertStoreGrid",
	"core.store.ohertStore.view.OhertStorePanel",
	"core.store.ohertStore.view.OhertStoreForm"
	],
	stores:[
	        "core.store.ohertStore.store.OhertStoreStore"
		]
});