/**
 * 树状菜单，显示在主界面的左边
 */
Ext.define('core.main.view.region.MainMenuTree', {
			extend : 'Ext.tree.Panel',
			alias : 'widget.mainmenutree',
			style:'border-width:0 0 0 0;',
			title : '系统菜单',
			collapseNavigate: !1,
			split: !0,
            collapsible: !0,
            collapsed: !0,
           collapseMode: "mini",
			listeners: { itemclick: function (view, node, item, index, e, eOpts) {
				var nodeInfo=node.get("nodeInfo");
	        	var config=nodeInfo.split(",");
	            coreApp.getController(config[1]);
	        	var  mainPanel= view.up('app-main');
            	var maincenter=mainPanel.down("maincenter");
            	var nodeInfoType=node.get("nodeInfoType");
            	var addPanel={};
            	 var module={};
                	addPanel= Ext.createWidget(config[0],{
                		  title:node.get("text"),
                		  id:node.data.id,
                		  code:node.get("code"),
                		  closable : true
                	});
                	
       var   oldPanel=maincenter.getComponent(node.data.id);
				     if(oldPanel){
				    	return;
				     }
				     console.log(addPanel);
				     maincenter.add(addPanel);
				     maincenter.setActiveTab(addPanel);
		}
			},
			rootVisible : false,
			lines : true,
			initComponent : function() {
				this.store=comm.get("menuTreeStore");
				console.log(this.store);
			/*	this.store = Ext.create('Ext.data.TreeStore', {
							root : {
								text : '系统菜单',
								leaf : false,
								expanded : true
							}
						});
				var vm = this.up('app-main').getViewModel()
				var menus = vm.get('tf_MenuGroups');
				var root = this.store.getRootNode();
				for (var i in menus) {
					var menugroup = menus[i];
					var menuitem = root.appendChild({
								text : menugroup.tf_title,
								// 节点默认是否展开
								expanded : menugroup.tf_expand,
								icon : menugroup.tf_iconURL,
								glyph : menugroup.tf_glyph
							});
					for (var j in menugroup.tf_menuModules) {
						var menumodule = menugroup.tf_menuModules[j];

						var module = vm.getModuleDefine(menumodule.tf_ModuleId);
						if (module) {
							var childnode = {
								text : module.tf_title,
								moduleName:module.tf_moduleName,
								handler : 'onMainMenuClick',
								leaf : true,
							};
							menuitem.appendChild(childnode);
						}
					}
				}*/
				this.callParent(arguments);
			}
		})