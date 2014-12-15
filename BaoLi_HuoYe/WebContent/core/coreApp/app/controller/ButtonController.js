/**
 * 程序主控制器
 */
Ext.define("core.app.controller.ButtonController",{
	extend:"Ext.app.Controller",
	initBtn:function(){
		var self=this;
		var btnCtr={
			/**
			 * 通用表格添加进表单
			 */
			"basegrid button[ref=gridInsertF]":{
					click:function(btn){
						var baseGrid=btn.up("basegrid");
						var funCode=baseGrid.funCode;
						var basePanel=baseGrid.up("basepanel[funCode="+funCode+"]");
						var baseForm=basePanel.down("baseform[funCode="+funCode+"]");
						var baseCenterPanel=baseGrid.up("basecenterpanel[funCode="+funCode+"]");
						var funData=basePanel.funData;
						var defaultObj=funData.defaultObj;
						var formObj=baseForm.getForm();
						var insertObj=self.getDefaultValue(defaultObj);
//						for(var field in insertObj){
//							var value=insertObj[field];
//							//@createTime@   @createUser@  @createDept@
//							var f=formObj.findField(field);
//							if(f){
//								f.setValue(value);
//							}
//						}
						/**----------------主子功能处理开始----------------------*/
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
						/**----------------主子功能处理结束----------------------*/
						self.setFormValue(formObj,insertObj);
						if(baseCenterPanel){
							baseCenterPanel.hide();
						}else{
							baseGrid.hide();
						}
						baseForm.show();
						//执行回调函数						
						if(btn.callback){
							btn.callback();
						}
					}
			},
			/**
			 * 通用表格添加事件
			 */
			"basegrid button[ref=gridInsert]":{
					click:function(btn){
						Ext.getBody().mask('正在处理中....');
						//得到组件
						var baseGrid=btn.up("basegrid");						
						var store=baseGrid.getStore();
						//得到编辑插件
						var edit=baseGrid.editing;
						//得到模型
						var Model=store.model;
						var funCode=baseGrid.funCode;
						var basePanel=baseGrid.up("basepanel[funCode="+funCode+"]");
						//得到配置信息
						var funData=basePanel.funData;
						var defaultObj=funData.defaultObj;
						//处理特殊默认值
						var insertObj=self.getDefaultValue(defaultObj);
						/**----------------主子功能处理开始----------------------*/
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
						var contentObj=basePanel.contentObj;
						insertObj=Ext.apply(insertObj,contentObj);
						/**----------------主子功能处理结束----------------------*/
						var resObj=self.ajax({url:funData.action+"/doSave.action",params:insertObj});
//						var resObj={success:true,obj:{name:"zsp",birthday:"2014-6-01"}};
						if(resObj.success){					
							var obj=new Model(resObj.obj);
							edit.cancelEdit(); //取消其他插件的编辑活动								
							store.insert(0,obj);
							obj.commit();
							//设置第一行第二列编辑
							edit.startEditByPosition({
								row:0,
								column:2
							});
							var editBtn=baseGrid.down("button[ref=gridEdit]");
							if(editBtn){
								editBtn.setDisabled(false);
							}							
							self.msgbox("添加成功");	
							
						}else{
							 Ext.MessageBox.alert("提示",resObj.obj);
						}
						//执行回调函数
						if(btn.callback){
							btn.callback();
						}
						  Ext.getBody().unmask();	
				}
			},
			/**
			 * 通用表格编辑事件
			 */
			"basegrid button[ref=gridEdit]":{
					click:function(btn){
						//得到组件
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
							/**----------------主子功能处理开始----------------------*/
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
							/**----------------主子功能处理结束----------------------*/
							var resObj=self.ajax({url:funData.action+"/getInfoById.action",params:{pkValue:insertObj[funData.pkName]}});
							//表单赋值
							insertObj=Ext.apply(insertObj,resObj.obj);
							//表单赋值
							self.setFormValue(baseForm.getForm(),insertObj);
							/**--------------------主子功能处理开始----------------------*/
							if(funData.children){
								Ext.each(funData.children,function(child){
									if(child.funCode){
										//拿到子功能的布局对象
										var childPanel=basePanel.down("basepanel[funCode="+child.funCode+"]");
										//赋值主功能记录对象
										childPanel.mainRecord=data;
										var childFunData=childPanel.funData;
										var parentSql="";
										//拼接parentSql
										if(childFunData.connectFields && childFunData.connectFields.length>0){
											Ext.each(childFunData.connectFields,function(connectField){
												if(connectField.isQuery){
													parentSql+=" and "+connectField.childFieldCode+"='"+rescords[0].get(connectField.mainFieldCode)+"'"
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
							/**--------------------主子功能处理结束----------------------*/
						if(baseCenterPanel){
							baseCenterPanel.hide();
						}else{
							baseGrid.hide();
						}
						baseForm.show();						
						}else{
							 Ext.MessageBox.alert("提示","请选择数据");
						}
						//执行回调函数
						if(btn.callback){
							btn.callback();
						}
					}
			},
			/**
			 *  通用表格删除事件
			 */
			"basegrid button[ref=gridDelete]":{
					click:function(btn){
						//得到组件
						var baseGrid=btn.up("basegrid");
						var funCode=baseGrid.funCode;
						var basePanel=baseGrid.up("basepanel[funCode="+funCode+"]");
						//得到配置信息
						var funData=basePanel.funData;
						var pkName=funData.pkName;
						//得到选中数据
						var records=baseGrid.getSelectionModel().getSelection();
						if(records.length>0){
							//封装ids数组
							var ids=new Array();
							Ext.each(records,function(rec){
								var pkValue=rec.get(pkName);
								ids.push(pkValue);
							});
							//发送ajax请求
							var resObj=self.ajax({url:funData.action+"/doRemove.action",params:{ids:ids.join(","),pkName:pkName}});
							if(resObj.success){
								baseGrid.getStore().load();
								self.msgbox(resObj.obj);
							}else{
								  Ext.MessageBox.alert("提示",resObj.obj);
							}
						}else{
							 Ext.MessageBox.alert("提示","请选择数据!");
						}
						//执行回调函数
						if(btn.callback){
							btn.callback();
						}
					}
			},
			/**
			 * 通用表格保存事件
			 */
			"basegrid button[ref=gridSave]":{
					click:function(btn){
						//得到组件
						var baseGrid=btn.up("basegrid");
						var funCode=baseGrid.funCode;
						var basePanel=baseGrid.up("basepanel[funCode="+funCode+"]");
						var baseForm=basePanel.down("baseform[funCode="+funCode+"]");
						//得到配置信息
						var funData=basePanel.funData;
						var pkName=funData.pkName;
						var store=baseGrid.getStore();
						//得到修改的记录
						var records=store.getUpdatedRecords();
						if(records.length>0){
							//封装修改的字段数组
							var updates=new Array();
							var ids=new Array();
							//var errors=["前台验证失败，错误信息："];
							Ext.each(records,function(rec,j){
								/* var columns= baseGrid.columns;
								 Ext.each(columns,function(col,i){
									 var field=col.getEditor(records,i);
									  if(field){
										    if(field.allowBlank==false){
										    	 var value= field.getValue();
										    	 if(""==value||value==null){
										    		baseGrid.editing.startEditByPosition({	row:rowid,	column:i});
										    		 errors.push("<font color=red>"+field.emptyText+"</font>");
										    		
										    	 }
										    }
									 }
								 });
								 if(errors.length>0){
									 self.msgbox(errors.join("<br/>"));
									 return false; 
								 }*/
								var obj=rec.getChanges();
								obj[pkName]=rec.get(pkName);
								ids.push(rec.get(pkName));
								updates.push(obj);								
							});
							//得到更新的字符串
							var strData=self.getUpdateSql(updates,funData.tableName,funData.pkName);
							//发送ajax
							var resObj=self.ajax({url:funData.action+"/doUpdateList.action", params:{strData:strData,ids:ids}});
							if(resObj.success){
								store.load();
								self.msgbox(resObj.obj);
							}else{
								  Ext.MessageBox.alert("提示",resObj.obj);
							}
						}else{
							self.msgbox("保存成功");
						}
						//执行回调函数
						if(btn.callback){
							btn.callback();
						}	
						
					}
			},
			/**
			 * 表单的保存
			 */
			"baseform button[ref=formSave]":{
				click:function(btn){
					//拿到组件和配置信息
					var baseForm=btn.up("baseform");
					var recode=baseForm.updateRecord();
					alert(recode);
					var funCode=baseForm.funCode;
					var basePanel=baseForm.up("basepanel[funCode="+funCode+"]");
					var baseGrid=basePanel.down("basegrid[funCode="+funCode+"]");
					var funData=basePanel.funData;
					var pkName=funData.pkName;
					//拿到formObj对象
					var formObj=baseForm.getForm();
					var pkField=formObj.findField(pkName);
					//判断当前是保存还是修改操作
					var act=Ext.isEmpty(pkField.getValue())?"doSave":"doUpdate";
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
						//可以提交空的字段值
						submitEmptyText:true,
						//成功回调函数
						success:function(form,action){
							var obj=action.result.obj;
							resultObj=action.result;
							if(action.result.success){
								//对象成功后处理
								var insertObj=obj;
								/**----------------主子功能处理开始----------------------*/
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
								/**----------------主子功能处理结束----------------------*/
								//刷新表单
								self.setFormValue(formObj,insertObj);
								//load表格
								baseGrid.getStore().load();
								if(act=="doSave"){
									self.msgbox("数据添加成功");
								}else{
									self.msgbox("数据保存成功");
								}
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
								/**--------------------主子功能处理结束----------------------*/
							}else{
								  Ext.MessageBox.alert(obj);
							}
						},
						//错误信息处理
						failure:function(form, action){
							//前台表单校验错误
							var obj=action.result.obj;
							if(action.failureType=="client"){
								var errors=["前台验证失败，错误信息："];
								formObj.getFields().each(function(f){
									if(!f.isValid()){
										errors.push("<font color=red>"+f.fieldLabel+"</font>:"+f.getErrors().join(","));
									}
								});
								  Ext.MessageBox.alert("错误提示",errors.join("<br/>"));								
							}else{
								  Ext.MessageBox.alert("错误提示",obj);
							}
						}						
					})
					//执行回调函数
					if(btn.callback){
						btn.callback();
					}
				}
			},
			/**
			 *  通用表单返回事件
			 */
			"baseform button[ref=formReturn]":{
					click:function(btn){
						var baseForm=btn.up("baseform");
						var funCode=baseForm.funCode;
						var basePanel=baseForm.up("basepanel[funCode="+funCode+"]");
						var baseGrid=basePanel.down("basegrid[funCode="+funCode+"]");
						var baseCenterPanel=baseGrid.up("basecenterpanel[funCode="+funCode+"]");
						if(baseCenterPanel){
							baseCenterPanel.show();
						}else{
							baseGrid.show();
						}
						baseForm.hide();
						//执行回调函数
						if(btn.callback){
							btn.callback();
						}
					}
			}
		}
		Ext.apply(self.ctr,btnCtr);
	}
});