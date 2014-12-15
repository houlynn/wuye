Ext.define("core.${dist}.controller.${className}Controller",{
	extend:"Ext.app.Controller",
	init:function(){
		var self=this
		//事件注册
		this.control({
		});
	},
	views:[
	"core.${dist}.view.${className}Grid",
	"core.${dist}.view.${className}Panel",
	"core.${dist}.view.${className}Form"
	],
	stores:[
	        "core.${dist}.store.${className}Store"
		]
});