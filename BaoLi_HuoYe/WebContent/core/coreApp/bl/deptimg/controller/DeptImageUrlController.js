Ext.define("core.bl.deptimg.controller.DeptImageUrlController",{
	extend:"Ext.app.Controller",
	init:function(){
		var self=this
		//事件注册
		this.control({
		});
	},
	views:[
	"core.bl.deptimg.view.DeptImageUrlGrid",
	"core.bl.deptimg.view.DeptImageUrlPanel",
	"core.bl.deptimg.view.DeptImageUrlForm"
	],
	stores:[
	        "core.bl.deptimg.store.DeptImageUrlStore"
		]
});