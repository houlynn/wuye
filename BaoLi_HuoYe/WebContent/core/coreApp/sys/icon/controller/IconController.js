/**
 * 图标控制层
 */
Ext.define("core.sys.icon.controller.IconController",{
	extend:"Ext.app.Controller",
	init:function(){
		var self=this
		//事件注册
		this.control({
		});
	},
	views:[
	"core.sys.icon.view.IconGrid",
	"core.sys.icon.view.IconForm",
	"core.sys.icon.view.IconPanel"
	],
	stores:[
	    	"core.sys.icon.store.IconStore"
	]
});