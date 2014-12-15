Ext.define("core.bl.news.controller.AppNewsController",{
	extend:"Ext.app.Controller",
	mixins: {
		formUtils:"core.util.FormUtil"
	},
	init:function(){
		var self=this
		this.control({
			"panel[xtype=bl.appNewsForm] button[ref=formSave_news]":{
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
					var content=formObj.findField("newContent").getValue();
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
							if(action.result.success){
								var insertObj=obj;
								insertObj["newContent"]=content;
								ajax({url:funData.action+"/doUpdateContent.action",params:{content:content, id:insertObj[funData.pkName]},callback:function(resObj){
									if(resObj.success){
										if(act=="doSave"){
											 Ext.MessageBox.alert("提示","数据添加成功");
										}else{
											 Ext.MessageBox.alert("提示","数据保存成功");
										}
										self.setFormValue(formObj,insertObj);
										baseGrid.getStore().load();
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
			"panel[xtype=bl.appNewsGrid] button[ref=gridPush]":{
				click:function(btn){
					var baseGrid=btn.up("basegrid");
        			var rescords=baseGrid.getSelectionModel().getSelection();
        			 var newid=null;
        			if(rescords.length==1){							
						var data=rescords[0].data;
						newid=data["newid"];
						}else{
							  Ext.MessageBox.alert("提示","请选择要发布的新闻!");
							  return;
						}
				    Ext.MessageBox.confirm("确认框", "你确定要发布这条新闻吗？", function(btn) {  
	        	    	 if("yes"==btn){
	        	    		 Ext.Ajax.request({
		                    		url:'/bl/news/postnews.action',
		                    		method:'POST',
		                    		params:{newid:newid},
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
			}
			
			
		});
	},
	views:[
	"core.bl.news.view.AppNewsGrid",
	"core.bl.news.view.AppNewsPanel",
	"core.bl.news.view.AppNewsForm",
	"core.app.view.editor.ExtKindEditor"
	],
	stores:[
	        "core.bl.news.store.AppNewsStore"
		]
});