/**
 * 
 * 一个显示、修改、新增的的窗口基类
 * 
 */
Ext.define('core.app.view.region.BaseWindow', {
			extend : 'Ext.window.Window',
			alias : 'widget.basewindow',
			uses : ['core.app.view.region.BaseForm'],
			layout : 'fit',
			maximizable : true,
			closeAction : 'hide',
			bodyStyle : 'padding : 2px 2px 0',
			shadowOffset : 30,
			style:'border-width:0 0 0 0;',
			layout : 'fit',
			module: void 0,
			formScheme: void 0,
            formtype: void 0,
            form: void 0,
			 listeners: {
		            hide: function (win, eOpts) {
		                //关闭动作自动清除item，也可单独写到工具条外面
		                win.close();
		            }
		        },
			initComponent : function() {
				this.maxHeight = document.body.clientHeight * 0.98;
				var me = this;
				this.formScheme = this.viewModel.get('tf_formSchemes')[0]; // 取得第一个form方案
				this.title = this.viewModel.get('tf_title');
				this.glyph = this.viewModel.get('tf_glyph');
				var w = this.formScheme.tf_windowWidth;
				var h = this.formScheme.tf_windowHeight;
				// 高度为-1表示是自适应
				if (w == -1 && h == -1) {
					this.width = 600;
					this.height = 400;
					this.maximized = true;
				} else {
					if (w != -1)
						this.width = Math.min(w, document.body.clientWidth - 2);
					if (h != -1)
						this.height = Math.min(h, document.body.clientHeight - 2);
				};
				if (w == -1 && h != -1) { // 宽度最大化
					this.width = document.body.clientWidth - 40;
				}
				this.tools = [{
							type : 'collapse',
							tooltip : '当前记录导出至Excel'
						}];

				console.log("========baseform  items=======================");
				console.log(this.formScheme);
				console.log("===========this.formScheme===============");
				console.log(this.formScheme);
				this.items = [{
							xtype : 'baseform',
							viewModel : this.viewModel,
							formScheme : this.formScheme
						}]
				this.callParent(arguments);
			}

		});
	/*		layout : 'fit',
			maximizable : true,
			closeAction : 'hide',
			bodyStyle : 'padding : 2px 2px 0',
			shadowOffset : 30,
			layout : 'fit',
			initComponent : function() {
				this.maxHeight = document.body.clientHeight * 0.98;
				var me = this;
				var w = this.formScheme.tf_windowWidth;
				var h = this.formScheme.tf_windowHeight;
			   var w = 200;
				var h = 300;
				// 高度为-1表示是自适应
				if (w == -1 && h == -1) {
					this.width = 600;
					this.height = 400;
					this.maximized = true;
				} else {
					if (w != -1)
						this.width = Math.min(w, document.body.clientWidth - 2);
					if (h != -1)
						this.height = Math.min(h, document.body.clientHeight - 2);
				};
				if (w == -1 && h != -1) { // 宽度最大化
					this.width = document.body.clientWidth - 40;
				}
				this.tools = [{
							type : 'collapse',
							tooltip : '当前记录导出至Excel'
						}];

				this.items = [{
							xtype : 'baseform',
							config:[
							        {allowBlank:false,
							        	enableKeyEvents:true,
							        	enforceMaxLength:true,
							        	fieldLabel:"合同编码",
							        	labelAlign:"right",
							        	labelWidth:92,
							        	maxLength:20,
							        	name:"tf_name",
							        	size:20,	
							        	xtype:"textfield"
							},
							  {allowBlank:false,
					        	enableKeyEvents:true,
					        	enforceMaxLength:true,
					        	fieldLabel:"合同编码",
					        	labelAlign:"right",
					        	labelWidth:92,
					        	maxLength:20,
					        	name:"tf_code",
					        	size:20,	
					        	xtype:"textfield"
					},
							  {allowBlank:false,
						        	enableKeyEvents:true,
						        	enforceMaxLength:true,
						        	fieldLabel:"合同编码",
						        	labelAlign:"right",
						        	labelWidth:92,
						        	maxLength:20,
						        	name:"tf_code",
						        	size:20,	
						        	xtype:"textfield"
						},
							  {allowBlank:false,
						        	enableKeyEvents:true,
						        	enforceMaxLength:true,
						        	fieldLabel:"合同编码",
						        	labelAlign:"right",
						        	labelWidth:92,
						        	maxLength:20,
						        	name:"tf_code",
						        	size:20,	
						        	xtype:"textfield"
						},
							  {allowBlank:false,
						        	enableKeyEvents:true,
						        	enforceMaxLength:true,
						        	fieldLabel:"合同编码",
						        	labelAlign:"right",
						        	labelWidth:92,
						        	maxLength:20,
						        	name:"tf_code",
						        	size:20,	
						        	xtype:"textfield"
						},
							  {allowBlank:false,
						        	enableKeyEvents:true,
						        	enforceMaxLength:true,
						        	fieldLabel:"合同编码",
						        	labelAlign:"right",
						        	labelWidth:92,
						        	maxLength:20,
						        	name:"tf_code",
						        	size:20,	
						        	xtype:"textfield"
						}
							  
							        
							        
							        ]
						}]
				this.callParent(arguments);
			}

		});*/