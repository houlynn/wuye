Ext.define("core.bl.vi.controller.VirtualIconController",{
	extend:"Ext.app.Controller",
	init:function(){
		var self=this
		//事件注册
		this.control({
		});
	},
	views:[
	"core.bl.vi.view.VirtualIconGrid",
	"core.bl.vi.view.VirtualIconPanel",
	"core.bl.vi.view.VirtualIconForm"
	],
	stores:[
	        "core.bl.vi.store.VirtualIconStore"
		]
});