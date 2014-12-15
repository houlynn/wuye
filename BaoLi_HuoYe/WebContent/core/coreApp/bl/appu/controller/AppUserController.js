Ext.define("core.bl.appu.controller.AppUserController",{
	extend:"Ext.app.Controller",
	mixins:{
		FormUtil:"core.util.FormUtil"
	},
	init:function(){
		var self=this
		//事件注册
		this.control({
			"baseform button[ref=formSaveUser]":{
				click:function(btn){
					var baseForm=btn.up("baseform");
					var funCode=baseForm.funCode;
					var basePanel=baseForm.up("basepanel[funCode="+funCode+"]");
					var baseGrid=basePanel.down("basegrid[funCode="+funCode+"]");
					var funData=basePanel.funData;
					var pkName=funData.pkName;
					var formObj=baseForm.getForm();
					var pkField=formObj.findField(pkName);
					var act=Ext.isEmpty(pkField.getValue())?"doSaveUser":"doUpdateUser";
					var contentObj=basePanel.contentObj;
					var params={};
					if(funData.uploadFields){
						params.uploadFields=funData.uploadFields;
					}
					if(contentObj!=null&&contentObj.foreignKeys!=null){
						params.foreignKeys=contentObj.foreignKeys;
					}
					formObj.submit({
						url:funData.action+"/"+act+".action",
						params:params,
						submitEmptyText:true,
						success:function(form,action){
							var obj=action.result.obj;
							if(action.result.success){
								var insertObj=obj;
								if(funData.isChildren){
									var mainRecord=basePanel.mainRecord;
									var parentObj={};
									if(funData.connectFields){
										Ext.each(funData.connectFields,function(connectField){
											if(connectField.foreignKey){
												parentObj[connectField.foreignKey]=mainRecord[connectField.mainFieldCode];
											}else{
												parentObj[connectField.childFieldCode]=mainRecord[connectField.mainFieldCode];
											}
										});
									}
									insertObj=Ext.apply(insertObj,parentObj);
								}
								self.setFormValue(formObj,insertObj);
								baseGrid.getStore().load();
								if(act=="doSave"){
									  Ext.MessageBox.alert("提示信息","数据添加成功");
								}else{
									  Ext.MessageBox.alert("提示信息","数据保存成功");
								}
								if(funData.children){
									Ext.each(funData.children,function(child){
										if(child.funCode){
											var childPanel=basePanel.down("basepanel[funCode="+child.funCode+"]");
											childPanel.mainRecord=obj;
											var childFunData=childPanel.funData;
											var parentSql="";
											if(childFunData.connectFields && childFunData.connectFields.length>0){
												Ext.each(childFunData.connectFields,function(connectField){
													if(connectField.isQuery){
														parentSql+=" and "+connectField.childFieldCode+"='"+obj[connectField.mainFieldCode]+"'"
													}
												});
											}else{
												parentSql=" and 1!=1";
											}
											var childGrid=childPanel.down("basegrid[funCode="+child.funCode+"]");
											if(childGrid==null){
												childGrid=childPanel.down("basegrid");
												}
											var store=childGrid.getStore();
											var proxy=store.getProxy();
											proxy.extraParams.parentSql=parentSql;
											store.load();									
										}
									});
								}
							}else{
								  Ext.MessageBox.alert(obj);
							}
						},
						failure:function(form, action){
							if(action.failureType=="client"){
								var errors=["前台验证失败，错误信息："];
								formObj.getFields().each(function(f){
									if(!f.isValid()){
										errors.push("<font color=red>"+f.fieldLabel+"</font>:"+f.getErrors().join(","));
									}
								});
								  Ext.MessageBox.alert("错误提示",errors.join("<br/>"));								
							}else{
								  Ext.MessageBox.alert("错误提示","后台数据保存错误");
							}
						}						
					})
					if(btn.callback){
						btn.callback();
					}
				}
			}
			
			
		});
	},
	views:[
	"core.bl.appu.view.AppUserGrid",
	"core.bl.appu.view.AppUserPanel",
	"core.bl.appu.view.AppUserForm"
	],
	stores:[
	        "core.bl.appu.store.AppUserStore"
		]
});