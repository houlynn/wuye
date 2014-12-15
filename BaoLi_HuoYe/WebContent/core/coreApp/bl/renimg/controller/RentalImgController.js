Ext.define("core.bl.renimg.controller.RentalImgController",{
	extend:"Ext.app.Controller",
	init:function(){
		var self=this
		//事件注册
		this.control({
		});
	},
	views:[
	"core.bl.renimg.view.RentalImgGrid",
	"core.bl.renimg.view.RentalImgPanel",
	"core.bl.renimg.view.RentalImgForm"
	],
	stores:[
	        "core.bl.renimg.store.RentalImgStore"
		]
});