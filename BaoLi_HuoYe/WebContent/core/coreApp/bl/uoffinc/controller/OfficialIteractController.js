Ext.define("core.bl.uoffinc.controller.OfficialIteractController",{
	extend:"Ext.app.Controller",
	init:function(){
		var self=this
		//事件注册
		this.control({
			"basegrid button[ref=gridUpload]":{
				click:function(btn){
					//得到组件
					var baseGrid=btn.up("basegrid");						
					var store=baseGrid.getStore();
					var funCode=baseGrid.funCode;
					var basePanel=baseGrid.up("basepanel[funCode="+funCode+"]");
					//得到配置信息
					var funData=basePanel.funData;
					//处理特殊默认值
					var insertObj={};
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
					console.log(insertObj);
					 var win=Ext.create("Ext.window.Window",{
							modal : true,
							maximizable : false,
							resizable:false,
							frame : false,
							layout : "fit",
							width : 600,
							height : 120,
							items:{
								xtype:'bl.interimgfrom',
								id:"uofinterImage"
							}});
					 win.show();
				 var from=Ext.getCmp("uofinterImage");
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
										var store=baseGrid.getStore();
										var proxy=store.getProxy();
										proxy.extraParams.parentSql=" and it='"+insertObj.foreignKey+"'";
										store.load();		
								}}
						});
					 
				 });
					//执行回调函数
					if(btn.callback){
						btn.callback();
					}
				}
			},
		
		"basegrid button[ref=gridEdit]":{
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
				var contextField=formObj.findField("context");
				contextField.setValue(resObj.obj.context);
			}
		},
		"basegrid":{
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
				var contextField=formObj.findField("content");
				contextField.setValue(resObj.obj.content);
				
				
			}
		}
		
			
		});
	},
	views:[
	"core.bl.uoffinc.view.OfficialIteractGrid",
	"core.bl.uoffinc.view.OfficialIteractPanel",
	"core.bl.uoffinc.view.OfficialIteractForm",
	"core.bl.uoffincimg.view.OfficialPhotographGrid",
	"core.bl.uoffincimg.view.OfficialPhotographPanel",
	 "core.bl.uoffinc.view.UploadForm",
	"core.bl.uoffinc.view.MassagePanel",
	"core.bl.uoffinc.view.MassageGrid"
	],
	stores:[
	        "core.bl.uoffinc.store.OfficialIteractStore",
	        "core.bl.uoffincimg.store.OfficialPhotographStore",
	        "core.bl.uoffinc.store.MassageStore",
	        "core.app.view.editor.ExtKindEditor"
	      
		]
});