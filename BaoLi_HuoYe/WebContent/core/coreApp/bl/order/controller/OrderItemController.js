Ext.define("core.bl.order.controller.OrderItemController",{
	extend:"Ext.app.Controller",
	init:function(){
		var self=this
		//事件注册
		this.control({
		});
	},
	views:[
	"core.bl.order.view.OrderItemGrid",
	"core.bl.order.view.OrderItemPanel",
	"core.bl.order.view.OrderItemForm"
	],
	stores:[
	        "core.bl.order.store.OrderItemStore"
		]
});