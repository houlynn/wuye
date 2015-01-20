Ext.define("core.prop.feesgtset.view.FeesgtForm", {
			extend : "Ext.form.Panel",
			alias : 'widget.feesgtset.form',
			border : !1,
			title : null,
			autoHeight : true,
			bodyPadding : 5,
			border : false,
			autoWidth : true,
			width : 600,
			fieldDefaults : {
				labelWidth : 80,
				labelAlign : "right"
			},
			buttons : [{
						text : '保存',
						itemId : 'save',
						glyph : 0xf0c7,
						style : 'border-width:0 0 0 0;',
						text : '关闭',
						itemId : 'close',
						glyph : 0xf148,
						handler : function(button) {
							button.up('window').hide();
						}
					}],
			initComponent : function() {
				var me = this;
				var self = this;
				me.bodyStyle = 'padding : 5px 5px 0';
				me.callParent(arguments);
				this.getForm().reset();
			},
			items : [{
				xtype : 'fieldset',
				autoHeight : true,
				title : '公摊表设置',
				width : "100%",
				bodyStyle : 'padding : 5px 5px 5px 5px',
				items : [{
							xtype : "fieldcontainer",
							layout : "hbox",
							items : [{
										xtype : "textfield",
										fieldLabel : "ID",
										itemId : "tf_insid;",
										name : "tf_insid;",
										hidden : true
									}]
						},

						{
							xtype : "fieldcontainer",
							layout : "hbox",
							items : [{
										xtype : "basecombobox",
										fieldLabel : "公表类型",
										itemId : "tf_billType",
										name : "tf_billType",
										ddCode : "BILLG",
										beforeLabelTextTpl : comm
												.get('required'),
										allowBlank : false,
										flex : 5
									}]
						},

						{
							xtype : "fieldcontainer",
							layout : "hbox",
							items : [{
										xtype : "textfield",
										fieldLabel : "公表名称",
										itemId : "tf_name;",
										name : "tf_name",
										beforeLabelTextTpl : comm
												.get('required'),
										allowBlank : false,
										flex : 5
									}]
						},

						{
							xtype : "fieldcontainer",
							layout : "hbox",
							items : [{

										xtype : "moduecombobox",
										name : "tf_FeesInfo",
										fieldLabel : "收费标准",
										flex : 1,
										allowBlank : false,
										itemId : 'feeeItemCombobox',
										ddCode : {
											modeuName : "FeesInfo",
											marking : '1',
											identification : '1',
											allowBlank : false

										}
									}

							]

						},

						{
							xtype : "fieldcontainer",
							layout : "hbox",
							items : [{
										xtype : "textareafield",
										fieldLabel : "备注",
										name : "tf_remark;",
										flex : 5,
										preventScrollbars : true, // 设置多行文本框没有滚动条显示
										columnWidth : 1
									}]
						}

				]
			}]
		});