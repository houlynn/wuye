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
				      items:[{xtype:"user.prouserform",  grid:modulegrid}]});
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
				     
				       items:[{xtype:"user.mprouserform",  grid:modulegrid}]
				       });
			          var prouserform=  window.down('form[xtype=user.mprouserform]');
			           prouserform .getForm().loadRecord(model);
			           window.setTitle('修改用户');
	                   window.show();
	                
	  	 }
	  	},
	  	  "form[xtype=user.mprouserform] #save":{
	  	 beforeclick:function(btn){
	  	 	var form=btn.up("form[xtype=user.mprouserform]");
	  	 	var grid=form.grid;
	  	 	var formObj=form.getForm();
					  	formObj.submit({
					    url:"rbacUser/updateuser.action",
						submitEmptyText:true,
						success:function(f,action){
							var obj=action.result.obj;
								if(action.result.success){
								 system.smileInfo("修改成功!");
								 grid.getStore().load();
								  var selection=grid.getSelectionModel().getSelection();
	  	                         var model = selection[0];
	  	                         form.down("#pwd").setValue(model.get("pwd"));
								}else{
								system. errorAlertInfo(obj);
								}
						},
							failure:function(form, action){
							var obj=action.result.obj;
							if(action.failureType=="client"){
								var errors=["前台验证失败，错误信息："];
								formObj.getFields().each(function(f){
									if(!f.isValid()){
										errors.push("<font color=red>"+f.fieldLabel+"</font>:"+f.getErrors().join(","));
									}
								});
								system. errorAlertInfo(errors.join("<br/>"));
							}else{
								system. errorAlertInfo(obj);
							}
							}
						
						});
	  	 	
	  	 	return false;
	  	 }
	  	},
	  	
	   "form[xtype=user.prouserform] #save":{
	  	 beforeclick:function(btn){
	  	 	var form=btn.up("form[xtype=user.prouserform]");
	  	 	var grid=form.grid;
	  	 	var formObj=form.getForm();
					  	formObj.submit({
					    url:"rbacUser/create.action",
						submitEmptyText:true,
						success:function(f,action){
							var obj=action.result.obj;
								if(action.result.success){
								 system.smileInfo("添加成功!");
								 grid.getStore().load();
								}else{
								system. errorAlertInfo(obj);
								}
						},
							failure:function(form, action){
							var obj=action.result.obj;
							if(action.failureType=="client"){
								var errors=["前台验证失败，错误信息："];
								formObj.getFields().each(function(f){
									if(!f.isValid()){
										errors.push("<font color=red>"+f.fieldLabel+"</font>:"+f.getErrors().join(","));
									}
								});
								system. errorAlertInfo(errors.join("<br/>"));
							}else{
								system. errorAlertInfo(obj);
							}
							}
						
						});
	  	 	
	  	 	return false;
	  	 }
	  	},	
	  	
	  	
	 
	  });
	},
	views:[
	"core.base.user.view.ProUserGrid",
	"core.base.user.view.ProUserPanel",
	"core.base.user.view.ProUserForm",
	"core.base.user.view.ProUserWindow",
	"core.base.user.view.MProUserForm"
	],
	stores:[
	"core.base.user.store.ProUserStore"
	],
	
});