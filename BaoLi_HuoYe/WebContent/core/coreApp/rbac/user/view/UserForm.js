Ext.define("core.rbac.user.view.UserForm", {
			extend : "Ext.form.Panel",
			alias : "widget.rbac.userform",
			layout : "auto",
			align : "left",
				initComponent : function() {
				var me = this;
				this.buttons = [];
				var self=this;
				this.buttons.push({
							text : '保存',
							itemId : 'save',
							glyph : 0xf0c7
						},{
							text : '关闭',
							itemId : 'close',
							glyph : 0xf148,
							handler : function(button){
								button.up('window').hide();
							}
						});
						me.callParent(arguments);
			},
			defaults : {
				selectOnFocus : true,
				msgTarget : "side", // 提示信息现在的位置
				width : 680
			},
			items : [{
						xtype : 'fieldset',
						autoHeight : true,
						title : "填写用户信息",
						items : [{
									xtype : "fieldcontainer",
									layout : "hbox",
									items : [{
												xtype : "textfield",
												fieldLabel : "主键",
												name : "userId",
												itemId:"userId",
												 flex: 1,
												hidden : true
											}]
								},

								{
									xtype : "fieldcontainer",
									layout : "hbox",
									items : [{
												xtype : "textfield",
												fieldLabel : "用户名",
												 flex: 1,
												name : "username",
												allowBlank : false
											}]
								}, {
									xtype : "fieldcontainer",
									layout : "hbox",
									items : [{
									xtype : "textfield",
									fieldLabel : "登陆账号",
								     regex: /^((\d{3,4}-)*\d{7,8}(-\d{3,4})*|13\d{9})$/ ,
									 flex: 1,
									name : "userCode",
									allowBlank : false
									}]
								}, {
										xtype : "fieldcontainer",
									layout : "hbox",
									items : [{
									xtype : "textfield",
									fieldLabel : "密码",
									 flex: 1,
									name : "password",
									allowBlank : false
										}]
								}, {
									xtype : "fieldcontainer",
									layout : "hbox",
									items : [{
									fieldLabel : "性别",
									name : "sex",
									 itemId:"sex",
									 flex: 1,
									 xtype : "basecombobox",
		                             ddCode : "SEX",
		                             allowBlank : false
										}]
								}

						]
					},

			]
		});