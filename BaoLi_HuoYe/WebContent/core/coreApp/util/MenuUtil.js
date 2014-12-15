Ext.define("core.util.MenuUtil",{
	uses:["core.app.module.Module"],
	mixins:{
		suppleUtil:"core.util.SuppleUtil"
	},
	/**
	 * 加载当前登录的人权限按钮
	 */
	initMenu:function(){
		var self=this;
		var data=self.ajax({url:"/rbacPermission/getAuthorMenuTree.action",params:{excludes:"checked"}});
		console.log(data);
		
		var menuTreeStore=Ext.create("Ext.data.TreeStore",{
			model:factory.ModelFactory.getModelByName("com.ufo.framework.system.model.ui.JSONTreeNode","checked").modelName,
			defaultRootId:"ROOT",
			root:{
				text:"ROOT",
				code:"ROOT",
				children:data
			}
		});
		comm.add("menuTreeStore",menuTreeStore);
	},
	/**
	 * 构建菜单数据
	 * @param {} node
	 * @return {}
	 */
	buildMenuData:function(node){
		var data=new Array();
		node.eachChild(function(n){
			console.log(n.raw);
			console.log(n.raw.children);
			data.push(n.raw);
		});
		return data;
	},
	/**
	 * 构建开始菜单中的项
	 * @param {} node
	 */
	buildStartMenu:function(root,me){
		var rootMenu={};
		var eachMenus = function(node,menu){
              node.eachChild(function(n){
	           var menuObj={
	           		text:n.get("text"),
	           		icon:n.get("icon"),
	           		handler:function(){
		            	 me.desktop.onShortcutItemClick(null,n);
		            }
	           };
	           if(menu.menu){
	           		menu.menu.items.push(menuObj);
	           }else{
	           		menu.menu={
	           			items:[menuObj]
	           		}
	           }
               eachMenus(n,menuObj);
            });
		}
		eachMenus(root,rootMenu);
		if(rootMenu.menu){
			return rootMenu.menu.items;
		}else{
			return [];
		}
	},
     buildMenu:function(tree,tab){
    		var self=this;
    		var menuTreeStore=comm.get("menuTreeStore");
            var moduleData= menuTreeStore.getRootNode().childNodes ;
			for (var i = 0; i < moduleData.length; i++) {
				tree.add(Ext.create("Ext.tree.Panel", {
					title : moduleData[i].get("text"),
					iconCls : moduleData[i].get("cls"),
					autoScroll : true,
					rootVisible : false,
					viewConfig : {
						loadingText : "正在加载..."
					},
					store : Ext.create("Ext.data.TreeStore",{
						model:factory.ModelFactory.getModelByName("com.ufo.framework.system.model.ui.JSONTreeNode","checked").modelName,
						defaultRootId:"ROOT",
						root:{
							text:"ROOT",
							code:"ROOT",
							children:self.buildMenuData(moduleData[i])
						}
					}),
					listeners : {
						afterlayout : function() {
							if (this.getView().el) {
								var el = this.getView().el;
								var table = el
										.down("table.x-grid-table");
								if (table) {
									table.setWidth(el.getWidth());
								}
							}
						},
						itemclick : function(view,node){
							var nodeInfo=node.get("nodeInfo");
				        	var config=nodeInfo.split(",");
				            coreApp.getController(config[1]);
							var panel=  Ext.create('Ext.panel.Panel', {
							            layout: 'fit',
							            title : node.data.text,
							            frame:true,
										closable : true,
										id:node.data.id,
										iconCls : 'icon-activity',
							              items: [
							                 {
							                     xtype: config[0],
							                 }
							             ] 
							         });
							     var  addPanel=tab.getComponent(node.data.id);
							     if(addPanel){
							    	return;
							     }
										tab.add(panel);
										tab.setActiveTab(panel);
				                }
					}
				}));
		     tree.doLayout();
			}
			  Ext.getBody().unmask();
	}
	
});