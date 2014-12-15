/**
 * 表格控制器
 */
Ext.define("core.app.controller.GridController",{
	extend:"Ext.app.Controller",
	initGrid:function(){
		var self=this;
		var gridCtr={
			"basegrid":{
				/**
				 * 表格的render事件
				 */
				render:function(grid){
					var basePanel=grid.up("basepanel");
					var funCode=basePanel.funCode;
					grid.funCode=funCode;
					grid.itemId=funCode+"_basegrid";
				},
				/**
				 * 表格的双击事件
				 */
				itemdblclick:function(grid,record,item,index,e,eOpts){
					var itemdblclickOver= grid.ownerCt.itemdblclickOver;
					if(!itemdblclickOver){
					var basePanel=grid.up("basepanel");
					var funCode=basePanel.funCode;
					var baseGrid=basePanel.down("basegrid[funCode="+funCode+"]");
					var baseCenterPanel=baseGrid.up("basecenterpanel[funCode="+funCode+"]");
					var editBtn=baseGrid.down("button[ref=gridEdit]");
					var funData=basePanel.funData;
					if(editBtn){
						var insertObj=record.data;
						var baseForm=basePanel.down("baseform[funCode="+funCode+"]");
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
						///
						baseForm.loadRecord(record);
						self.setFormValue(baseForm.getForm(),insertObj);
						var baseForm=basePanel.down("baseform[funCode="+funCode+"]");
						/**--------------------主子功能处理开始----------------------*/
						if(funData.children){
							Ext.each(funData.children,function(child){
								if(child.funCode){
									//拿到子功能的布局对象
									console.log(child.funCode);
									var childPanel=basePanel.down("basepanel[funCode="+child.funCode+"]");
									console.log(childPanel);
									//赋值主功能记录对象
									childPanel.mainRecord=record.data;
									console.log(childPanel.mainRecord);
									var childFunData=childPanel.funData;
									var parentSql="";
									//拼接parentSql
									if(childFunData.connectFields && childFunData.connectFields.length>0){
										Ext.each(childFunData.connectFields,function(connectField){
											if(connectField.isQuery){
												parentSql+=" and "+connectField.childFieldCode+"='"+record.get(connectField.mainFieldCode)+"'"
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
					 }
					}
				},
				/**
				 * 表格单击事件
				 */
				itemclick:function(grid,record,item,index,e,eOpts){
					var itemlclickOver= grid.ownerCt.itemlclickOver;
					if(!itemlclickOver){
					var basePanel=grid.up("basepanel");
					var funCode=basePanel.funCode;
					var baseGrid=basePanel.down("basegrid[funCode="+funCode+"]");
					var records=baseGrid.getSelectionModel().getSelection();
					var btn=baseGrid.down("button[ref=gridEdit]");
					if(!btn){
						return;
					}
					if(records.length==1){
						btn.setDisabled(false);
					}else{
						btn.setDisabled(true);
					}
				}
			 }
			}
		}
		Ext.apply(self.ctr,gridCtr);
	}
});