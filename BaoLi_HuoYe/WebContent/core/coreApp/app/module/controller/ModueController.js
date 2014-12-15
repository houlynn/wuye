Ext.define('core.app.module.controller.ModueController', {
	extend:"Ext.app.Controller",
	mixins: {
		gridActionUtil:"core.util.GridActionUtil",
		suppleUtil:"core.util.SuppleUtil"
	},
	ctr:{},
	init:function(){
		var self=this;
		//注册事件
		this.control(self.ctr);
	},
	views:[
	       'core.app.view.region.GridToolbar',
	       'core.app.module.factory.ColumnsFactory'
		]
	
	
});