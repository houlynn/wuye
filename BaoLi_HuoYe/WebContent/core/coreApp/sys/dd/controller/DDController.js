/**
 * 数据字典控制层
 */
Ext.define("core.sys.dd.controller.DDController",{
	extend:"Ext.app.Controller",
	init:function(){
		var self=this
		//事件注册
		this.control({
		});
	},
	views:[
	"core.sys.dd.view.DDGrid",
	"core.sys.dd.view.DDForm",
	"core.sys.dd.view.DDPanel",
	"core.sys.dd.view.DDItemGrid",
	"core.sys.dd.view.DDItemForm",
	"core.sys.dd.view.DDItemPanel"
	],
	stores:[
	"core.sys.dd.store.DDStore",
	"core.sys.dd.store.DDItemStore"
	]
});