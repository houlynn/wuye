/**
 * 
 * 系统首页的字义
 * 
 */

Ext.define('app.view.main.region.HomePage', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.homepage',
			layout : 'border',

			title : '首页',

			items : [ {
						title : '主显示区',
						header : {
							style : 'background-color : #f6f5ec'
						},
						region : 'center'
					}]

		})