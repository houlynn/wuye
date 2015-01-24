Ext.define("core.prop.feesgtp.view.FeesgtForm", {
			extend : "Ext.form.Panel",
			alias : 'widget.feesgtp.form',
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
						style : 'border-width:0 0 0 0;'},
						
						{text : '关闭',
						itemId : 'close',
						glyph : 0xf148,
						handler : function(button) {
							button.up('window').hide();
						}}
					],
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
				title : '公摊电表',
				width : "100%",
				bodyStyle : 'padding : 5px 5px 5px 5px',
				items : [{
							xtype : "fieldcontainer",
							layout : "hbox",
							items : [{
										xtype : "textfield",
										fieldLabel : "ID",
										itemId : "tf_poolid",
										name : "tf_poolid",
										hidden : true
									}]
						},

							{
							xtype : "fieldcontainer",
							layout : "hbox",
							items : [{
										xtype : "numberfield",
										fieldLabel : "起码",
										itemId : "tf_startnumber",
										name : "tf_startnumber",
										allowBlank : true,
										decimalPrecision:3,
										flex : 5
									}]
						},

									{
							xtype : "fieldcontainer",
							layout : "hbox",
							items : [{
										xtype : "numberfield",
										fieldLabel : "止码",
										itemId : "tf_endnumber",
										name : "tf_endnumber",
										beforeLabelTextTpl : comm
												.get('required'),
												decimalPrecision:3,
										allowBlank : false,
										flex : 5
									}]
						},
						
										{
							xtype : "fieldcontainer",
							layout : "hbox",
							items : [{
										xtype : "numberfield",
										fieldLabel : "百分比",
										itemId : "tf_coefficient",
										name : "tf_coefficient",
												decimalPrecision:2,
										allowBlank : true,
										flex : 5
									}]
						},
												{
							xtype : "fieldcontainer",
							layout : "hbox",
							items : [{
										xtype : "numberfield",
										fieldLabel : "已收楼面积",
										itemId : "tf_areaCount",
										name : "tf_areaCount",
											decimalPrecision:4,
										allowBlank : true,
										flex : 5
									}]
						},
						


						{
							xtype : "fieldcontainer",
							layout : "hbox",
							items : [{
										xtype : "moduecombobox",
										name : "tf_InnstallBill",
										fieldLabel : "选择公表",
										flex : 1,
										allowBlank : false,
										itemId : 'tf_InnstallBill',
										ddCode : {
											modeuName : "InnstallBill",
											marking : '1',
											identification : '0',
											allowBlank : false

										}
									}
							]

						},

												{
							xtype : "fieldcontainer",
							layout : "hbox",
							items : [{
										xtype : "datefield",
										fieldLabel : "抄表时间",
										itemId : "tf_meterdate",
									    format : 'Y-m-d',
										name : "tf_meterdate",
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
										fieldLabel : "抄表人员",
										itemId : "tf_mtermane",
									    format : 'Y-m-d',
										name : "tf_mtermane",
										flex : 5
									}]
						},
						
						{
							xtype : "fieldcontainer",
							layout : "hbox",
							items : [{
										xtype : "textareafield",
										fieldLabel : "备注",
										name : "tf_remark",
										flex : 5,
										preventScrollbars : true, // 设置多行文本框没有滚动条显示
										columnWidth : 1
									}]
						}

				]
			}]
		});