Ext.define('core.base.resident.view.UniteFeesForm', {
	extend : "Ext.form.Panel",
	alias : 'widget.unite.unitefeesfrom',
	tbar : [],
	fieldDefaults : {
		labelWidth : 80,
		labelAlign : "right"
	},
	initComponent : function() {
		var me = this;
		this.buttons = [];
		var self = this;
		this.buttons.push({
					text : '设置',
					itemId : 'save',
					ref : "settingBtan",
					glyph : 0xf0c7,
					handler : function(button) {
					}
				}, {
					text : '取消',
					itemId : 'close',
					glyph : 0xf148,
					handler : function(button) {
						button.up('window').hide();
					}
				});
		me.bodyStyle = 'padding : 5px 5px 0';
		me.callParent(arguments);
		//var grid = this.down("gridpanel[xtype=resident.feesettinggrid]");
		//grid.getStore().removeAll();
		this.getForm().reset();
		//var model = Ext.create(grid.getStore().model);
		//this.getForm().loadRecord(model);

	},

	items : [{
				xtype : 'fieldset',
				autoHeight : true,
				title : '填写金额',
				items : [
										{
										xtype : "fieldcontainer",
										  layout: "hbox",
										items:[
												{
													xtype : "numberfield",
													labelWidth : 60,
												    fieldLabel : "应收金额",
													name : "tf_shouldCount",
													 decimalPrecision:2,
													behindText : '元'
												}, {
													xtype : "numberfield",
													labelWidth : 60,
													fieldLabel : "实收金额",
													 decimalPrecision:2,
													name : "tf_realACount",
													behindText : '元'
												}]
												},{
												   xtype : 'textareafield',  
                                                   grow: true,  
                                                   name:"tf_remark",
												   fieldLabel: '备注',  
                                                   anchor    : '100%',  
                                                   maxLength : 100,   //设置多行文本框的最大长度为100  
                                                   minLength : 5,  
                                                   preventScrollbars : true   //设置多行文本框没有滚动条显示  
												}]
											

						},

						{
							xtype : 'fieldset',
							autoHeight : true,
							title : '选择收费条目',
							items : [{
										xtype : "fieldcontainer",
										layout : "hbox",
										items : [{
													xtype : "unite.unitefeesgrid",
													flex : 2
												}]
									}]

						}]

});