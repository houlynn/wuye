Ext.define("core.base.user.controller.ProUserController",{
	extend:"Ext.app.Controller",
	mixins: {
		suppleUtil:"core.util.SuppleUtil",
	},
	init:function(){
		var self=this
		//事件注册
	  this.control({
	  	"grid[xtype=user.prouser] #new":{
	  	 click:function(btn){
	  	var modulegrid=	btn.up("grid[xtype=user.prouser]");
	  	 var store=modulegrid.getStore();
	  	 var model = Ext.create(modulegrid.getStore().model);
	  	 model.set(model.idProperty, null); // 设置主键为null,可自动
		 var window = Ext.create('core.base.user.view.ProUserWindow', {
				       grid:modulegrid});
			         var prouserform=  window.down('form[xtype=user.prouserform]');
			         prouserform .getForm().loadRecord(model);
			          window.setTitle('添加用户');
	                   window.show();
	  	 }
	  	},
	    "grid[xtype=user.prouser] #edit":{
	  	 click:function(btn){
	  	 var modulegrid=	btn.up("grid[xtype=user.prouser]");
	  	 var store=modulegrid.getStore();
	  	 var selection=modulegrid.getSelectionModel().getSelection();
	  	 var model = selection[0];
		 var window = Ext.create('core.base.user.view.ProUserWindow', {
				       grid:modulegrid});
			          var prouserform=  window.down('form[xtype=user.prouserform]');
			          prouserform .getForm().loadRecord(model);
			          window.setTitle('修改用户');
	                   window.show();
	  	 	
	  	 }
	  	},
	  	  "grid[xtype=user.prouser] #delete":{
	  	 click:function(btn){
	  	 
	  	 }
	  	},
	  	
	  	
	  	
	  	
	 
	  });
	},
	views:[
	"core.base.user.view.ProUserGrid",
	"core.base.user.view.ProUserPanel",
	"core.base.user.view.ProUserForm",
	"core.base.user.view.ProUserWindow"
	],
	stores:[
	"core.base.user.store.ProUserStore"
	],
	
});