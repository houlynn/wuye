Ext.define("core.rbac.role.controller.RolePermController",{
	extend:"Ext.app.Controller",
	mixins: {
		suppleUtil:"core.util.SuppleUtil",
		messageUtil:"core.util.MessageUtil",
		formUtil:"core.util.FormUtil",
		treeUtil:"core.util.TreeUtil",
		gridActionUtil:"core.util.GridActionUtil",
		queryUtil:"core.util.QueryUtil"
	},
	init:function(){
		var self=this;
		self.setPerm=function(tree,records,roleId,win){
			var oldSelection=tree.oldSelection;
			console.log(oldSelection);
							//需要 添加的权限
				var addIds=new Array();
				var delIds=new Array();
				Ext.each(records,function(rec,index){
					var id=rec.get("id");
					for(var i=0;i<oldSelection.length;i++){
					var old=oldSelection[i];
					if(old.get("id")==id){
						//暂时设置不操作的主键值
						//old.set("id","STATUS");
						old.id="STATUS";
						//old.set("id","STATUS");
							break;
					}
					//如果从初始的选中没有找到则代表需要添加这条权限
						if(i==oldSelection.length-1){
							addIds.push(id);
						}
					}
					if(oldSelection.length<=0){
						addIds.push(id);								
					}		
				});
				//放到外边。考虑到如果当前选中为空但是也需要删除权限
				Ext.each(oldSelection,function(old){
					if(old.id!="STATUS"){
					//if(old.get("id")!="STATUS"){
						delIds.push(old.get("id"));	
					}
				});
			var resObj=self.ajax({url:"/rbacPermission/updatePerm.action",params:{roleId:roleId,addIds:addIds.join(","),delIds:delIds.join(",")}});
			if(resObj.success){
				self.msgbox("授权成功");
		/*		var store= tree.getStore();
				store.load();*/
				
			}else{
				 Ext.MessageBox.alert("提示",resObj.obj);
			}
		};
		//事件注册
		this.control({
			"container[xtype=role.roletree]":{
				itemclick:function(tree,record,item,index,e,eOpts){
					var mainLayout=tree.up("container[xtype=role.mainlayout]");
					var roleForm=mainLayout.down("container[xtype=role.roleform]");
					var roleTree=mainLayout.down("container[xtype=role.roletree]");
					var formObj=roleForm.getForm();
					formObj.findField("roleName").setValue(record.get("text"));
					formObj.findField("roleCode").setValue(record.get("code"));
					formObj.findField("roleId").setValue(record.get("id"));
					formObj.findField("orderIndex").setValue(record.get("orderIndex"));
					var treeDel=roleTree.down("button[ref=treeDel]");
					treeDel.setDisabled(false);
					//加载人员信息
					var userGrid=mainLayout.down("container[xtype=role.usergrid]");
					var store=userGrid.getStore();
					var proxy=store.getProxy();
					proxy.extraParams={
						roleId:record.get("id")					
					};
					store.load();
					
				}
			},
			"container[xtype=role.roletree] button[ref=treeIns]":{
				click:function(btn){
					var tree=btn.up("container[xtype=role.roletree]");
					var root=tree.getRootNode();
					var params={
						
					};
					var resObj=self.ajax({url:"/rbacRole/doSave.action",params:params});
					if(resObj.success){
						var roleObj=resObj.obj;				
						params.parent="ROOT";
						params.id=roleObj.roleId;
						params.leaf=true;
						params.text=roleObj.roleName;
						params.code=roleObj.roleCode;
						params.icon=roleObj.icon;
						var node=root.appendChild(params);
						tree.fireEvent("itemclick",tree.getView(),node);	
					}
				}
			},
			"container[xtype=role.roleform] button[ref=submit]":{
				click:function(btn){
					alert("add!!")
					var deptForm=btn.up("container[xtype=role.roleform]");
					var formObj=deptForm.getForm();
					var params=self.getFormValue(formObj);
					if(params.roleId!=null && params.roleId!=""){
						var resObj=self.ajax({url:"/rbacRole/doUpdate.action",params:params});						
						if(resObj.success){
							var mainLayout=deptForm.up("container[xtype=role.mainlayout]");
							var roleTree=mainLayout.down("container[xtype=role.roletree]");
							var node=roleTree.getSelectionModel().getSelection()[0];
							var obj=resObj.obj;
							node.set("text",obj.roleName);
							node.set("code",obj.roleCode);
							node.set("id",obj.roleId);
							node.set("orderIndex",obj.orderIndex);
							node.set("icon",obj.icon);
							node.commit();
							self.msgbox("保存成功!");
						}else{
							 Ext.MessageBox.alert("提示",resObj.obj);
						}
					}else{
						 Ext.MessageBox.alert("提示","请选中节点");
					}
					
				}
			},
			/**
			 * 删除角色
			 */
			"container[xtype=role.roletree] button[ref=treeDel]":{
				click:function(btn){
					var tree=btn.up("container[xtype=role.roletree]");
					var records=tree.getSelectionModel().getSelection();
					if(records.length<=0){
						 Ext.MessageBox.alert("提示","请选中节点!");
						return;
					}
					var node=records[0];
					var resObj=self.ajax({url:"/rbacRole/doRemove.action",params:{ids:node.get("id")}});
					if(resObj.success){
						tree.getStore().load();
						self.msgbox(resObj.obj);
					}else{
						 Ext.MessageBox.alert("提示",resObj.obj);
					}
				}				
			},
			"container[xtype=role.usergrid] button[ref=addUser]":{
				click:function(btn){
					var mainLayout=btn.up("container[xtype=role.mainlayout]");
					var roleTree=mainLayout.down("container[xtype=role.roletree]");
					var selRoles=roleTree.getSelectionModel().getSelection();
					var userGrid=btn.up("container[xtype=role.usergrid]");
					if(selRoles.length<=0){
						 Ext.MessageBox.alert("提示","请选择角色");
						return;
					}
					var role=selRoles[0];
					self.selTreeWin({
						title:"组织结构",
						multiSelect:true,
						haveButton:true,
						isEmpty:false,
						config:{
							url:"/rbacDeptUser/getTree.action",
							params:{
								whereSql:" and 1=1",
								expanded:true
							}
						},
						callback:function(win,records){
							//点击确定之后会得到选中的数据做处理
							var ids=new Array();
							if(records.length>0){
							Ext.each(records,function(rec){
								ids.push(rec.get("id"));
							});
							var resObj=self.ajax({url:"/rbacRole/addUsers.action",params:{roleId:role.get("id"),ids:ids.join(",")}});
								if(resObj.success){
									var proxy=userGrid.getStore().getProxy();
									proxy.extraParams={
										roleId:role.get("id")
									}
									userGrid.getStore().load();
									self.msgbox(resObj.obj);
								}else{
									alert(resObj.obj);
								}
							}
						}
					});	
				}
			},
			"container[xtype=role.usergrid] button[ref=removeUser]":{
				click:function(btn){
					var mainLayout=btn.up("container[xtype=role.mainlayout]");
					var userGrid=btn.up("container[xtype=role.usergrid]");
					var roleTree=mainLayout.down("container[xtype=role.roletree]");
					var userGrid=btn.up("container[xtype=role.usergrid]");
					var records=userGrid.getSelectionModel().getSelection();
					var selRoles=roleTree.getSelectionModel().getSelection();
					
					if(selRoles.length<=0){
						 Ext.MessageBox.alert("提示","请选择角色");
						return;
					}
					var role=selRoles[0];
					if(records.length<=0){
						 Ext.MessageBox.alert("提示","请选择记录");
					}
					var ids=new Array();
					Ext.each(records,function(rec){
						ids.push(rec.get("userId"));
					});
					var resObj=self.ajax({url:"/rbacRole/removeUsers.action",params:{roleId:role.get("id"),ids:ids.join(",")}});
					if(resObj.success){
						var proxy=userGrid.getStore().getProxy();
						proxy.extraParams={
								roleId:role.get("id")
						}
						userGrid.getStore().load();
						self.msgbox(resObj.obj);			
					}else{
						alert(resObj.obj);
					}
				}
			},
			/**
			 * 模块授权
			 */
			"container[xtype=role.moduletree]":{
				itemdblclick:function(tree,record){
					var mainLayout=tree.up("container[xtype=role.mainlayout]");
					var roleTree=mainLayout.down("container[xtype=role.roletree]");
					var selRoles=roleTree.getSelectionModel().getSelection();
					if(selRoles.length<=0){
						 Ext.MessageBox.alert("提示","请选择角色");
						return;
					}
					var role=selRoles[0];
					self.selTreeWin({
						title:"授权管理",
						multiSelect:true,
						haveButton:true,
						isEmpty:true,
						config:{
							url:"/rbacPermission/getPermTree.action",
							params:{
								whereSql:" and 1=1",
								isSee:false,								
								roleId:role.get("id"),
								nodeId:record.get("id"),
								expanded:true
							}
						},
						renderTree:function(tree){
							var records=tree.getChecked();
							tree.oldSelection=records;
							
						},
						callback:function(win,records){
							//点击确定之后会得到选中的数据做处理
							var tree=win.down("mttreeview");
							self.setPerm(tree,records,role.get("id"));
						}
					});
				}
			},
			/**
			 * 授权
			 */
			"container[xtype=role.moduletree] button[ref=setPerm]":{
				click:function(btn){
					alert(0);
					var mainLayout=btn.up("container[xtype=role.mainlayout]");
					var roleTree=mainLayout.down("container[xtype=role.roletree]");
					var selRoles=roleTree.getSelectionModel().getSelection();
					if(selRoles.length<=0){
						 Ext.MessageBox.alert("提示","请选择角色");
						return;
					}
					var role=selRoles[0];
					self.selTreeWin({
						title:"授权管理",
						multiSelect:true,
						haveButton:true,
						isEmpty:true,
						config:{
							url:"/rbacPermission/getPermTree.action",
							params:{
								whereSql:" and 1=1",
								isSee:false,								
								roleId:role.get("id")
							}
						},
						renderTree:function(tree){
							var records=tree.getChecked();
							tree.oldSelection=records;
						},
						callback:function(win,records){
							//点击确定之后会得到选中的数据做处理
							var ids=new Array();
							var tree=win.down("mttreeview");
							self.setPerm(tree,records,role.get("id"));
						}
					});	
				}
			},
			/**
			 * 查看权限
			 */
			"container[xtype=role.moduletree] button[ref=seePerm]":{
				click:function(btn){
					var mainLayout=btn.up("container[xtype=role.mainlayout]");
					var roleTree=mainLayout.down("container[xtype=role.roletree]");
					var selRoles=roleTree.getSelectionModel().getSelection();
					if(selRoles.length<=0){
						 Ext.MessageBox.alert("提示","请选择角色");
						return;						
					}
					var role=selRoles[0];
					self.selTreeWin({
						title:"查看权限",
						multiSelect:false,
						haveButton:false,
						isEmpty:true,
						config:{
							url:"/rbacPermission/getPermTree.action",
							params:{
								whereSql:" and 1=1",
								isSee:true,								
								roleId:role.get("id"),
								expanded:true
							}
						},
						callback:function(win,records){						
							
						}
					});	
				}
			}
		});
	},
	views:[
		"core.rbac.role.view.MainLayout",
		"core.rbac.role.view.RoleTree",
		"core.rbac.role.view.CenterLayout",
		"core.rbac.role.view.RoleForm",
		"core.rbac.role.view.UserGrid",
		"core.rbac.role.view.ModuleTree",
		"core.app.view.query.MtssWindow"
	],
	stores:[
		"core.rbac.role.store.RoleStore",
		"core.rbac.role.store.ModuleStore",
		"core.rbac.role.store.UserStore"
	]
});