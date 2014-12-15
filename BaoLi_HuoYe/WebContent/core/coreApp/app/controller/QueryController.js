/**
 * 查询组件控制器
 */
Ext.define("core.app.controller.QueryController",{
	extend:"Ext.app.Controller",
	initQuery:function(){
		var self=this;
		var queryCtr={
			"mttreeview":{
				/**
				 * 注册树形的选中事件，选中指定父节点和子节点
				 */
				checkchange:function(node,checked,eOpts){
					node.expand(true);
					//递归选中父节点
					var eachParent = function(node,checked){
                            if(!node.isRoot() && checked == true){
                                if(!Ext.isEmpty(node.get('checked'))){
                                    node.set('checked',checked);
                                    node.commit();
                                }
                                eachParent(node.parentNode,checked);
                            }
                        }
                      eachParent(node.parentNode,checked);
                      //递归选中孩子节点
                      var eachChild = function(node,checked){
                        node.eachChild(function(n){
                            if(!Ext.isEmpty(n.get('checked'))){
                                n.set('checked',checked);
                                n.commit();
                            }
                            eachChild(n,checked);
                        });
                    	};
                    	eachChild(node,checked);
				},
				//注册树形render事件
				render:function(tree){
					var store=tree.getStore();
					store.tree=tree;
				},
				/**
				 *tree数据加载后的事件
				 */
				load:function(store){
					var tree=store.tree;
					var win=tree.up("mtsswinview");				
					var renderTree=win.renderTree;
					if(renderTree){
						renderTree(tree);
					}
				}
			},
			/**
			 * 确定按钮事件
			 */
			"mtsswinview button[ref=ssOkBtn]":{
				click:function(btn){
					var win=btn.up("mtsswinview");
					//树形查询处理
					if(win.queryType=="mttreeview"){
						var tree=win.down("mttreeview");
						var selRecords=new Array();
						var records=tree.getChecked();
						//处理记录是否禁用
						Ext.each(records,function(rec){
							if(!rec.raw.disabled){
								selRecords.push(rec);
							}
						});
						if(selRecords.length>0 || win.isEmpty){
							win.callback(win,selRecords);
							win.close();
						}else{
							alert("你选中的信息错误，请重新选择!");
						}
					}
				}
			},
			/**
			 * 取消按钮
			 */
			"mtsswinview button[ref=ssCancelBtn]":{
				click:function(btn){
					var win=btn.up("mtsswinview");
					win.close();
				}
			},
			/**
			 * 查询panel渲染
			 */
			"basequerypanel":{
				render:function(panel){
					var basePanel=panel.up("basepanel");
					var funCode=basePanel.funCode;
					panel.funCode=funCode;
					panel.itemId=funCode+"_basequerypanel";
				}
			},
			/**
			 * 组合查询的查询事件
			 */
			"basequerypanel button[ref=queryBtn]":{
				click:function(btn){
					var queryPanel=btn.up("basequerypanel");
					var querySql=self.getQuerySql(queryPanel);
					var funCode=queryPanel.funCode;
					var basePanel=queryPanel.up("basepanel[funCode="+funCode+"]");
					var baseGrid=basePanel.down("basegrid[funCode="+funCode+"]");
					var store=baseGrid.getStore();
					var proxy=store.getProxy();
					proxy.extraParams.querySql=querySql;
					store.load();
				}
			},
			/**
			 * 组合查询的重置事件
			 */
			"basequerypanel button[ref=resetBtn]":{
				click:function(btn){
					var queryPanel=btn.up("basequerypanel");
					self.resetQueryPanel(queryPanel);
					var funCode=queryPanel.funCode;
					var basePanel=queryPanel.up("basepanel[funCode="+funCode+"]");
					var baseGrid=basePanel.down("basegrid[funCode="+funCode+"]");
					var store=baseGrid.getStore();
					var proxy=store.getProxy();
					proxy.extraParams.querySql="";
					store.load();
				}
			},
				/**
				 * 取消按钮
				 */
				"gridwindow button[ref=ssCancelBtn]":{
					click:function(btn){
						var win=btn.up("gridwindow");
						win.close();
					}
				},
				/**
				 * 确定按钮事件
				 */
				"gridwindow button[ref=ssOkBtn]":{
					click:function(btn){
						var win=btn.up("gridwindow");
						var basePanel=win.down("basepanel");
						var funCode=basePanel.funCode;
						var baseGrid=basePanel.down("basegrid[funCode="+funCode+"]");
						var records=baseGrid.getSelectionModel().getSelection();
						if(records.length>0||win.isEmpty){
							Ext.each(records,function(rec){
								win.callback(win,rec);
								win.close();
							});
						}
						else{
								alert("你选中的信息错误，请重新选择!");
							}
						}
					}
			}

		Ext.apply(self.ctr,queryCtr);
	},
	views:[
		"core.app.view.query.MtssWindow",
		"core.app.view.query.TreeView",
		"core.app.view.query.GridWindow",
		
		],
	stores:[
		"core.app.store.query.TreeStore"
	]
});