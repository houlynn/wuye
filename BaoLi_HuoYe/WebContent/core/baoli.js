Ext.onReady(function() {
						var tab = Ext.create('Ext.tab.Panel', {
									activeTab : 0,
									enableTabScroll : true,
									animScroll : true,
									border : true,
									autoScroll : true,
									region : 'center',
									split : true,
									items : [{
										iconCls : 'icon-activity',
										title : '平台首页',
										xtype:'portalpanel',
										layout:'column',
										items : [{
												xtype : 'portalcolumn',
												columnWidth : 0.7,
								                items:[{ title: '新闻动态',height : 150,iconCls : 'icon-news' },
								                	{title: '最新通知',height : 150, iconCls : 'icon-notice' },
								                	{title: '业绩报表',height : 150, iconCls : 'icon-chart'}]
								            },{
								            	xtype : 'portalcolumn',
								            	columnWidth : 0.3,
								                items:[{ title: '功能链接', height : 150, iconCls : 'icon-link'},
								                	{title: '待办事项',height : 150,iconCls : 'icon-note' },
								                	{title: '邮件列表', height : 150,iconCls : 'icon-email-list'}]
								            }]
									}],
									plugins: [Ext.create('Ext.ux.TabReorderer'),
					        		  Ext.create('Ext.ux.TabCloseMenu',{
					        		  	closeTabText: '关闭面板',
					        		  	closeOthersTabsText: '关闭其他',
					        		  	closeAllTabsText: '关闭所有'
					        		  })]
								});
						var tree = Ext.create("Ext.panel.Panel", {
									region : 'west',
									title : "系统菜单",
									width : 250,
									iconCls : "icon-tree",
									autoScroll : false,
									layout : 'accordion',
									collapsible : true,
									layoutConfig : {
										animate : true
									},
									split : true
								});
						var title = Ext.create("Ext.panel.Panel", {
									height : 80,
									html : '保利后台信息管理系统',
									region : 'north',
									split : true,
									bbar : [{
										iconCls : 'icon-user',
										text : '管理员'
									},'-',{
										text : Ext.Date.format(new Date(),'Y年m月d日')
									},'->',{
										text : '退出',
										iconCls : 'icon-logout'
									}],
									bodyStyle : 'backgroud-color:#99bbe8;line-height : 50px;padding-left:20px;font-size:22px;color:#000000;font-family:黑体;font-weight:bolder;' +
											'background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, rgba(153,187, 232, 0.4) ), color-stop(50%, rgba(153, 187, 232, 1) ),color-stop(0%, rgba(153, 187, 232, 0.4) ) )'
								});
						
						
						
						
						Ext.create('Ext.container.Viewport',{
							layout : 'border',
							items : [title,tab,tree],
							listeners : {
								afterrender : function(){
									var menuUtils=Ext.create("core.util.MenuUtil");
									console.log(menuUtils);
									 /*    coreApp.initMenu();
										var menuTreeStore=comm.get("menuTreeStore");
								      	coreApp.buildMenu(tree,tab); */
									//Ext.getBody().mask('正在加载系统菜单....');
									//开启悬浮提示功能
									//Ext.QuickTips.init();
									
								/* 	//创建应用程序的实例
									Ext.application({
										name:"core",//引用的名称
										scope :this,
								        appFolder : "core/coreApp",//应用的目录
										//加载控制器
										controllers: ['core.app.controller.MainController'],
										  launch: function() {
											    coreApp.initMenu();
												var menuTreeStore=comm.get("menuTreeStore");
										      	coreApp.buildMenu(tree,tab);
												//addTree(moduleData,coreApp,tree);
										  }
								}); */
								}
							}
						});
				});