Ext.define("core.bl.ren.controller.RentalController",{
	extend:"Ext.app.Controller",
	mixins: {
		formUtils:"core.util.FormUtil"
	},
	init:function(){
		var self=this
		//事件注册
		this.control({
		
			"panel[xtype=bl.rentalGrid] button[ref=gridInsertF]":{
				click:function(btn){
					var  ren_imgGid=Ext.getCmp("ren_imgGid");
					ren_imgGid.getStore().removeAll();
				}
		},
		"panel[xtype=bl.rentalForm] button[ref=formSave_ren]":{
			click:function(btn){
				var baseForm=btn.up("baseform");
				var funCode=baseForm.funCode;
				var basePanel=baseForm.up("basepanel[funCode="+funCode+"]");
				var baseGrid=basePanel.down("basegrid[funCode="+funCode+"]");
				var funData=basePanel.funData;
				var pkName=funData.pkName;
				var formObj=baseForm.getForm();
				var pkField=formObj.findField(pkName);
				var act=Ext.isEmpty(pkField.getValue())?"doSave":"doUpdate";
				var contentObj=basePanel.contentObj;
				var params={};
				var content=formObj.findField("rentalContent").getValue();
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
						resultObj=action.result;
						if(funData.isChildren){
							//得到主功能的记录
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
						if(action.result.success){
							var insertObj=obj;
							insertObj["rentalContent"]=content;
							ajax({url:funData.action+"/doUpdateContent.action",params:{content:content, id:insertObj[funData.pkName]},callback:function(resObj){
								if(resObj.success){
									if(act=="doSave"){
										 Ext.MessageBox.alert("提示","数据添加成功");
									}else{
										 Ext.MessageBox.alert("提示","数据保存成功");
									}
									self.setFormValue(formObj,insertObj);
									baseGrid.getStore().load();
									
									/**--------------------主子功能处理开始----------------------*/
									if(funData.children){
										Ext.each(funData.children,function(child){
											if(child.funCode){
												//拿到子功能的布局对象
												var childPanel=basePanel.down("basepanel[funCode="+child.funCode+"]");
												//赋值主功能记录对象
												childPanel.mainRecord=obj;
												var childFunData=childPanel.funData;
												var parentSql="";
												//拼接parentSql
												if(childFunData.connectFields && childFunData.connectFields.length>0){
													Ext.each(childFunData.connectFields,function(connectField){
														if(connectField.isQuery){
															parentSql+=" and "+connectField.childFieldCode+"='"+obj[connectField.mainFieldCode]+"'"
														}
													});
												}else{
													parentSql=" and 1!=1";
												}
												//加载子功能数据
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
									if(act=="doSave"){
										 Ext.MessageBox.alert("提示","数据添加失败");
									}else{
										 Ext.MessageBox.alert("提示","数据保存失败");
									}
								}
							}});
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
							  Ext.MessageBox.alert("后台数据保存错误");
						}
					}						
				})
			}
			
			
		},
			"panel[xtype=bl.rentalGrid] button[ref=gidePush]":{
				click:function(btn){
					var baseGrid=btn.up("basegrid");
        			var rescords=baseGrid.getSelectionModel().getSelection();
        			 var rid=null;
        			 var title=null;
        			if(rescords.length==1){							
						var data=rescords[0].data;
						rid=data["rid"];
						title=data["title"];
						}else{
							  Ext.MessageBox.alert("提示","请选择要发布的出租信息!");
							  return;
						}
				    Ext.MessageBox.confirm("确认框", "你要对：<span style='color:red;font-weight:bold'>"+title+"</span> 进行发布吗？", function(btn) {  
	        	    	 if("yes"==btn){
	        	    		 Ext.Ajax.request({
		                    		url:'/bl/ren/push.action',
		                    		method:'POST',
		                    		params:{rid:rid},
		                    		timeout:4000,
		                    		async:false,
		                    		success:function(response,opts){
		                    			var  obj = Ext.decode(response.responseText);
										if(obj.success){
											 Ext.MessageBox.alert("提示",'发布成功!这条信息将会在APPP端显示');
											 baseGrid.getStore().load();
											 
										}else{
											 Ext.MessageBox.alert("提示",obj.obj);
										}
		                    		}
	        	    		 });
	        	    		 
	        	    	 }else{
	        
	        	    	 }
					
				});
				}
			},
			
			"panel[xtype=bl.rentalImgGrid] button[ref=gridUpload]":{
				click:function(btn){
					//得到组件
					var baseGrid=btn.up("basegrid");						
					var store=baseGrid.getStore();
					var funCode=baseGrid.funCode;
					var basePanel=baseGrid.up("basepanel[funCode="+funCode+"]");
					//得到配置信息
					var funData=basePanel.funData;
					var  parentCode=funData["parentCode"];
	                var mainForm=basePanel.up("baseform[funCode="+parentCode+"]");
				    var formObj=mainForm.getForm();
				    var f=formObj.findField("rid");
				    var rid=f.getValue();
				    if(!rid){
				    	var msg='出租信息并未保存，请先保存再进行图片上传.';
				    	 Ext.MessageBox.alert("提示",msg);
				    	 return ;
				    }
				  	var insertObj={foreignKey:rid};
					 var win=Ext.create("Ext.window.Window",{
							modal : true,
							maximizable : false,
							resizable:false,
							frame : false,
							layout : "fit",
							width : 700,
							height : 300,
							closeactin: 'hide',
							items:{
								xtype:'uploadpanel',
								addFileBtnText : '选择文件...',
								uploadBtnText : '上传',
								removeBtnText : '移除所有',
								cancelBtnText : '取消上传',
								file_size_limit : 10000,//MB
								post_params:insertObj,
								file_types:"*.jpg;*.gif;*.png;*.jpeg",
								upload_url : funData.action+"/uploadField.action",
								upload_complete_handler:function(file){
									var store=baseGrid.getStore();
									var proxy=store.getProxy();
									proxy.extraParams.parentSql=" and rental='"+insertObj.foreignKey+"'";
									store.load();	
								}
							}});
					 win.show();
				  	
				  	
					 /*var win=Ext.create("Ext.window.Window",{
							modal : true,
							maximizable : false,
							resizable:false,
							frame : false,
							layout : "fit",
							width : 600,
							height : 120,
							items:{
								xtype:'bl.renimgformm',
								id:"renImageForm"
							}});
					 win.show();
				 var from=Ext.getCmp("renImageForm");
				var formObj=from.getForm();
				 var btnUpload= from.down("button[ref=formUpload]");
				 btnUpload.on("click",function(btn){
						formObj.submit({
							url:funData.action+"/uploadField.action",
							params:insertObj,
							//可以提交空的字段值
							submitEmptyText:true,
							//成功回调函数-
							success:function(form,action){
								var obj=action.result.obj;
								if(action.result.success){
									 Ext.MessageBox.alert("提示",'上传成功!');
										var proxy=store.getProxy();
										proxy.extraParams.parentSql=" and rental='"+insertObj.foreignKey+"'";
										store.load();		
								}else{
									 Ext.MessageBox.alert("提示",obj);
								}}
						});
					 
				 });*/
					//执行回调函数
					if(btn.callback){
						btn.callback();
					}
				}
			},
		
		/*"panel[xtype=bl.rentalGrid] button[ref=gridEdit]":{
			click:function(btn){
				var baseGrid=btn.up("basegrid");
				var funCode=baseGrid.funCode;
				var basePanel=baseGrid.up("basepanel[funCode="+funCode+"]");
				var baseForm=basePanel.down("baseform[funCode="+funCode+"]");
				//得到选中数据
				var rescords=baseGrid.getSelectionModel().getSelection();
				var baseCenterPanel=baseGrid.up("basecenterpanel[funCode="+funCode+"]");
				var funData=basePanel.funData;
				if(rescords.length==1){							
					var data=rescords[0].data;
					var insertObj=data;
					}
			var ajax=	function(config){
					var data={};
					var request={
						method:"POST",
						async:false,
						success:function(response){
							data = Ext.decode(Ext.value(response.responseText,'{}'));
						},
						failure : function(response){
					    	alert('数据请求出错了！！！！\n错误信息：\n'+response.responseText);
					    }
					};
					var request=Ext.apply(request,config);
					Ext.Ajax.request(request);
					return data;		
				}
				var resObj=ajax({url:funData.action+"/getInfoById.action",params:{pkValue:insertObj[funData.pkName]}});
				var formObj=baseForm.getForm();
				var contextField=formObj.findField("rentalContent");
				contextField.setValue(resObj.obj.rentalContent);
			}
		},
		"panel[xtype=bl.rentalGrid]":{
			itemdblclick:function(grid,record,item,index,e,eOpts){
				var basePanel=grid.up("basepanel");
				var funCode=basePanel.funCode;
				var baseForm=basePanel.down("baseform[funCode="+funCode+"]");
				//得到选中数据
				var rescords=grid.getSelectionModel().getSelection();
				var baseCenterPanel=grid.up("basecenterpanel[funCode="+funCode+"]");
				var funData=basePanel.funData;
				if(rescords.length==1){							
					var data=rescords[0].data;
					var insertObj=data;
					}
			var ajax=	function(config){
					var data={};
					var request={
						method:"POST",
						async:false,
						success:function(response){
							data = Ext.decode(Ext.value(response.responseText,'{}'));
						},
						failure : function(response){
					    	alert('数据请求出错了！！！！\n错误信息：\n'+response.responseText);
					    }
					};
					var request=Ext.apply(request,config);
					Ext.Ajax.request(request);
					return data;		
				}
				var resObj=ajax({url:funData.action+"/getInfoById.action",params:{pkValue:insertObj[funData.pkName]}});
				var formObj=baseForm.getForm();
				var contextField=formObj.findField("rentalContent");
				contextField.setValue(resObj.obj.rentalContent);
			
			}
		}*/
		});
	},
	views:[
	"core.bl.ren.view.RentalGrid",
	"core.bl.ren.view.RentalPanel",
	"core.bl.ren.view.RentalForm",
	"core.bl.ren.view.RentalImgGrid",
	"core.bl.ren.view.RentalImgPanel",
	"core.bl.ren.view.UploadForm",
	 "core.app.view.editor.ExtKindEditor",
	 "core.app.view.upload.UploadPanel"
	],
	stores:[
	        "core.bl.ren.store.RentalStore",
	        "core.bl.ren.store.RentalImgStore"
		]
});