Ext.define("core.bl.gd.controller.GoodsController",{
	extend:"Ext.app.Controller",
	init:function(){
		var self=this
		//事件注册
		this.control({
			
			"panel[xtype=bl.goodsGrid] button[ref=gridPush]":{
				click:function(btn){
					var baseGrid=btn.up("basegrid");
        			var rescords=baseGrid.getSelectionModel().getSelection();
        			 var gid=null;
        			if(rescords.length==1){							
						var data=rescords[0].data;
						gid=data["gid"];
						}else{
							  Ext.MessageBox.alert("提示","请选择要发布的商品!");
							  return;
						}
				    Ext.MessageBox.confirm("确认框", "你确定要发布该商品吗？", function(btn) {  
	        	    	 if("yes"==btn){
	        	    		 Ext.Ajax.request({
		                    		url:'/bl/gd/post.action',
		                    		method:'POST',
		                    		params:{gid:gid},
		                    		timeout:4000,
		                    		async:false,
		                    		success:function(response,opts){
		                    			var  obj = Ext.decode(response.responseText);
										if(obj.success){
											 Ext.MessageBox.alert("提示",'发布成功!这条信息将会在App显示');
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
			
			"basegrid button[ref=gridUpload]":{
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
				    var f=formObj.findField("gid");
				    var gid=f.getValue();
				    if(!gid){
				    	var msg='出租信息并未保存，请先保存再进行图片上传.';
				    	 Ext.MessageBox.alert("提示",msg);
				    	 return ;
				    }
				  	var insertObj={foreignKey:gid};
					 var win=Ext.create("Ext.window.Window",{
							modal : true,
							maximizable : false,
							resizable:false,
							frame : false,
							layout : "fit",
							width : 700,
							height : 300,
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
									proxy.extraParams.parentSql=" and goodid='"+insertObj.foreignKey+"'";
									store.load();	
								}
							}});
					 win.show();
					
					
					
					
				/*	//得到组件
					var baseGrid=btn.up("basegrid");						
					var store=baseGrid.getStore();
					var funCode=baseGrid.funCode;
					var basePanel=baseGrid.up("basepanel[funCode="+funCode+"]");
					//得到配置信息
					var funData=basePanel.funData;
					//处理特殊默认值
					var insertObj={};
					*//**----------------主子功能处理开始----------------------*//*
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
					 var win=Ext.create("Ext.window.Window",{
							modal : true,
							maximizable : false,
							resizable:false,
							frame : false,
							title : "文件上传",
							alias : 'widget.mapWindow',
							layout : "fit",
							width : 600,
							height : 120,
							items:{
								xtype:'bl.goodimg',
								id:"goodImage"
							}});
					 win.show();
				 var from=Ext.getCmp("goodImage");
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
										proxy.extraParams.parentSql=" and goodid='"+insertObj.foreignKey+"'";
										store.load();		
								}}
						});
					 
				 });*/
					//执行回调函数
					if(btn.callback){
						btn.callback();
					}
				}
			}
			
		});
	},
	views:[
	"core.bl.gd.view.GoodsGrid",
	"core.bl.gd.view.GoodsPanel",
	"core.bl.gd.view.GoodsForm",
	"core.bl.gd.view.GoodImageUrlForm",
	"core.bl.gd.view.GoodImageGrid",
	"core.bl.gd.view.GoodImagePanel",
	 "core.app.view.upload.UploadPanel"
	],
	stores:[
	        "core.bl.gd.store.GoodsStore",
	        "core.bl.gd.store.GoodImageStore"
		]
});