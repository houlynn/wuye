Ext.define('core.prop.notice.view.PointWinodw', {
		  extend : 'Ext.window.Window',
			alias : 'widget.notice.window',
			maximizable : true,
			closeAction : 'hide',
			bodyStyle : 'padding : 2px 2px 0',
			shadowOffset : 30,
			style:'border-width:0 0 0 0;',
			layout : 'fit',
			width:600,
			items:[{
			 xtype:"notice.form"
			}],
			 listeners: {
		            hide: function (win, eOpts) {
		                win.close();
		            }
		        },
			initComponent : function() {
				this.maxHeight = document.body.clientHeight * 0.98;
				var me = this;
				this.tools = [{
							type : 'collapse'
						}];
				this.callParent(arguments);
			}
		});
