/**
 * 树状菜单，显示在主界面的左边
 */
Ext.define('app.view.main.menu.MainMenuTree', {
			extend : 'Ext.tree.Panel',
			alias : 'widget.mainmenutree',
			title : '系统菜单',
			listeners: { itemclick: function (view, record, item, index, e, eOpts) {
                if (record.get('leaf')) { //叶子节点
                	var moduleName= record.get("moduleName");
                	var  mainPanel= view.up('app-main');
                	var maincenter=mainPanel.down("maincenter");
                	for(var i=0;i<maincenter.items.items.length;i++){
                		var item= maincenter.items.items[i];
                		if(!moduleName){
                			return ;
                		}else if(item.moduleName==moduleName){
                			return ;
                		}
                	}
                	if(record.get('moduleName'))
    				maincenter.setActiveTab(maincenter.add({
    							xtype : 'modulepanel',
    							title:record.get('moduleName'),
    							// 将当前的选中菜单的 "模块名称" 加入到参数中
    							moduleName : record.get('moduleName'),
    							closable : true,
    							reorderable : true
    						}));
                }
            }},
			rootVisible : false,
			lines : false,
			initComponent : function() {
				this.store = Ext.create('Ext.data.TreeStore', {
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
				}
				this.callParent(arguments);
			}
		})