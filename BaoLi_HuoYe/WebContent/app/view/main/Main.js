/**
 * This class is the main view for the application. It is specified in app.js as
 * the "autoCreateViewport" property. That setting automatically applies the
 * "viewport" plugin to promote that instance of this class to the body element.
 * 
 * TODO - Replace this content of this view to suite the needs of your
 * application.
 */
Ext.define('app.view.main.Main', {
			extend : 'Ext.container.Container',

			xtype : 'app-main',
			requires:['app.view.main.MainModel','app.view.main.MainController'],
			uses : ['app.view.main.region.Center', 'app.view.main.region.Top',
					'app.view.main.region.Bottom', 'app.view.main.menu.MainMenuToolbar',
					'app.view.main.region.Left' ],

			controller : 'main',
			viewModel : {
				type : 'main'
			},

			initComponent : function() {
				Ext.setGlyphFontFamily('FontAwesome'); // 设置图标字体文件，只有设置了以后才能用glyph属性
				this.callParent();
			},

			layout : {
				type : 'border' // 系统的主页面的布局
			},

			listeners : {
				resize : function(container) {
					container.getController().onMainResize();
				}
			},

			items : [{
						xtype : 'maintop',
						region : 'north' // 把他放在最顶上
					},
				 {
						xtype : 'mainbottom',
						region : 'south' // 把他放在最底下
					}, {
						xtype : 'mainmenuregion',
						region : 'west', // 左边面板
						title : '导航菜单',
						// hidden : Cookies.get('menutoolbar', 'true') == 'true',
						width : 220,
						collapsible : true,
						split : true,
					}, {
						region : 'center', // 中间面版
						xtype : 'maincenter'
					}]
		});
