Ext.define("core.bl.sellimg.controller.SellOferImgController",{
	extend:"Ext.app.Controller",
	init:function(){
		var self=this
		//事件注册
		this.control({
		});
	},
	views:[
	"core.bl.sellimg.view.SellOferImgGrid",
	"core.bl.sellimg.view.SellOferImgPanel",
	"core.bl.sellimg.view.SellOferImgForm"
	],
	stores:[
	        "core.bl.sellimg.store.SellOferImgStore"
		]
});