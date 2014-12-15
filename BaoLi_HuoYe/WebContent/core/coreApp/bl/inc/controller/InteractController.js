Ext.define("core.bl.inc.controller.InteractController",{
	extend:"Ext.app.Controller",
	init:function(){
		var self=this
		//事件注册
		this.control({
		
			"panel[xtype=bl.interactGrid]":{
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
					var contextField=formObj.findField("interactContent");
					contextField.setValue(resObj.obj.content);
				}
			},
			
			"panel[xtype=bl.interactGrid] button[ref=gridEdit]":{
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
					var contextField=formObj.findField("interactContent");
					contextField.setValue(resObj.obj.content);
				}
			}
			
		});
	},
	views:[
	"core.bl.inc.view.InteractGrid",
	"core.bl.inc.view.InteractPanel",
	"core.bl.inc.view.InteractForm",
	"core.bl.inc.view.MassageGrid",
	"core.bl.inc.view.MassagePanel",
	"core.bl.inc.view.PhotographGrid",
	"core.bl.inc.view.PhotographPanel",
	"core.app.view.editor.ExtKindEditor"
	
	],
	stores:[
	        "core.bl.inc.store.InteractStore",
	        "core.bl.inc.store.MassageStore",
	        "core.bl.inc.store.PhotographStore"
		]
});