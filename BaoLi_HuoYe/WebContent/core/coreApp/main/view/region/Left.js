/**
 * 左边的菜单区域，可以放树形菜单或折叠菜单
 */
Ext.define('core.main.view.region.Left', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.mainmenuregion',
			style:'border-width:0 0 0 0;',
			uses : ['core.main.view.region.MainMenuTree',/*'app.view.main.menu.AccordionMainMenu'*/],

			layout : {
				type : 'accordion',
				animate : true
			},
			glyph : 0xf0c9,
			tools : [{
						type : 'pin',
						tooltip : '层叠方式显示菜单',
						listeners : {
							click : function(tool) {
								var panel = tool.up('mainmenuregion');
								panel.insert(0, {
											xtype : 'mainmenuaccordion'
										});
								panel.items.items[0].expand();
								panel.remove(panel.down('mainmenutree'), true);
								tool.hide();
								tool.nextSibling().show();
							}
						}
					}, {
						type : 'unpin',
						tooltip : '树状方式显示菜单',
						hidden : true,
						listeners : {
							click : function(tool) {
								var panel = tool.up('mainmenuregion');
								panel.insert(0, {
											xtype : 'mainmenutree'
										});

								panel.items.items[0].expand();
								Ext.each(panel.query('mainmenuaccordion'), function(
												accordion) {
											panel.remove(accordion, true)
										})
								tool.hide();
								tool.previousSibling().show();
							}
						}
					}],

			initComponent : function() {

				this.items = [{
							xtype : 'mainmenutree'
						}];
				this.callParent();
			}

		})