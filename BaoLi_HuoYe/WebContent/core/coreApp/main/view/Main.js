Ext.define('core.main.view.Main', {
			extend : 'Ext.container.Viewport',
			xtype : 'app-main',
			uses : ['core.main.view.region.Center', 'core.main.view.region.Top','core.main.view.region.Bottom','core.main.view.region.Left' ],
			layout : {
				type : 'border' // 系统的主页面的布局
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
						style:'border-width:0 0 0 0;',
						width : 220,
						collapsible : true,
						split : true,
					}, {
						region : 'center', // 中间面版
						xtype : 'maincenter',
						style:'border-width:0 0 0 0;',
					}]
		});
