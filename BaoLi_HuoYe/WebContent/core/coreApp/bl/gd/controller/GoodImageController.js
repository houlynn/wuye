Ext.define("core.bl.gd.controller.GoodImageController",{
	extend:"Ext.app.Controller",
	init:function(){
		var self=this
		//事件注册
		this.control({
		});
	},
	views:[
	"core.bl.gd.view.GoodImageGrid",
	"core.bl.gd.view.GoodImagePanel",
	"core.bl.gd.view.GoodImageForm"
	],
	stores:[
	        "core.bl.gd.store.GoodImageStore"
		]
});