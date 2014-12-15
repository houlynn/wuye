Ext.define('core.app.basis.BaseWindow', {
			extend : 'Ext.window.Window',
			alias : 'widget.basiswindow',
			layout : 'fit',
			maximizable : true,
			closeAction : 'hide',
			bodyStyle : 'padding : 2px 2px 0',
			shadowOffset : 30,
			style:'border-width:0 0 0 0;',
			layout : 'fit',
			 listeners: {
		            hide: function (win, eOpts) {
		                win.close();
		            }
		        },
			initComponent : function() {
				this.maxHeight = document.body.clientHeight * 0.98;
				var me = this;
				this.maximized = true;
			    this.width = Math.min(w, document.body.clientWidth - 2);
				this.height = Math.min(h, document.body.clientHeight - 2);
				this.tools = [{
							type : 'collapse'
						}];
				this.callParent(arguments);
			}
		});
