Ext.define("core.bl.fbd.controller.FeedbackController",{
	extend:"Ext.app.Controller",
	init:function(){
		var self=this
		//事件注册
		this.control({
		});
	},
	views:[
	"core.bl.fbd.view.FeedbackGrid",
	"core.bl.fbd.view.FeedbackPanel",
	"core.bl.fbd.view.FeedbackForm"
	],
	stores:[
	        "core.bl.fbd.store.FeedbackStore"
		]
});