Ext.define("core.bl.sysuser.controller.EndUserController",{
	extend:"Ext.app.Controller",
	init:function(){
		var self=this
		//事件注册
		this.control({
		});
	},
	views:[
	"core.bl.sysuser.view.EndUserGrid",
	"core.bl.sysuser.view.EndUserPanel",
	"core.bl.sysuser.view.EndUserForm"
	],
	stores:[
	        "core.bl.sysuser.store.EndUserStore"
		]
});