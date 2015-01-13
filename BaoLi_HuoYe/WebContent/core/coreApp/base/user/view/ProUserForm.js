Ext.define('core.base.user.view.ProUserForm', {
	extend : "Ext.form.Panel",
	alias : 'widget.user.prouserform',
	border : !1,
	title : null,
	autoHeight : true,
	width:600,
	buttons : [{
		text : '保存',
		itemId : 'save',
		glyph : 0xf0c7,
		handler : function(button) {
			var self = this;
			var form = button.up('form');
			console.log(button.up('form').getForm().getRecord());
			button.up('form').updateRecord();
			var store = self.up("window[xtype=user.prouserwindow]").grid
					.getStore();
			if (form.isValid()) {
				var model = button.up('form').getForm().getRecord().save();
				var task = new Ext.util.DelayedTask(function() {
							if (model.getProxy().errorInfo) {
								console.log(model.getProxy().errorInfo);
								if (self.callback) {
									self.callback(model.getProxy().errorInfo);
								}
								return;
							}
							delete model.getProxy().errorInfo;
							system.smileInfo("保存成功!")
							store.reload();
						});
				task.delay(1);
			}

		}
	}, {
		text : '关闭',
		itemId : 'close',
		glyph : 0xf148,
		handler : function(button) {
			button.up('window').hide();
		}
	}],
	fieldDefaults : {
		labelWidth : 90,
		labelAlign : "right"
	},
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
		title : '管理员信息',
		bodyStyle : 'padding : 5px 5px 5px 5px',
		items : [
		{  xtype : "fieldcontainer",
			layout : "hbox",
			items : [{
					xtype : "textfield",
					fieldLabel : "ID",
					itemId : "userId",
					name : "id",
					hidden : true
				}]},
		{
					xtype : "fieldcontainer",
					layout : "hbox",
					flex : 2,
					items : [
					{
				   xtype : "textfield",
				   fieldLabel : "手机号码",
				   itemId : "loginCode",
				  name : "loginCode",
				  regex : /^((\d{3,4}-)*\d{7,8}(-\d{3,4})*|13\d{9})$/,
				  beforeLabelTextTpl : comm.get('required'),
				  flex : 5,
				  allowBlank : false},
				  {
				  	xtype : "textfield",
				  	fieldLabel : "验证码",
				  	 flex : 3.7,
				  	name:"vilyeCode",
				  	  allowBlank : true
				  },
				 {
				xtype : "button",
					 flex : 1.3,
				 text:"发送验证码"}			
				]
				}, {
						xtype : "fieldcontainer",
					layout : "hbox",
					flex : 2,
					items : [{
					xtype : "textfield",
					flex : 2,
					fieldLabel : "用户名",
					itemId : "userName;",
					name : "userName",
					beforeLabelTextTpl : comm.get('required'),
					allowBlank : false
				}]}, {
					xtype : "fieldcontainer",
					layout : "hbox",
					flex : 2,
					items:[{
					xtype : "textfield",
					flex : 2,
					fieldLabel : "创建时间",
					itemId : "createTime",
					name : "createTime",
					readOnly : true,
					hidden : true
				}]}, {
					xtype : "fieldcontainer",
					layout : "hbox",
					flex : 2,
					items:[{
					xtype : "textfield",
					fieldLabel : "初始密码",
					flex : 2,
					name : "pwd"
				}]}, {
						xtype : "fieldcontainer",
					layout : "hbox",
					flex : 2,
					items:[{
					xtype : "basecombobox",
					flex : 2,
					fieldLabel : "选择物业公司",
					itemId : "proid;",
					beforeLabelTextTpl : comm.get('required'),
					name : "proid",
					ddCode : "PRO",
					allowBlank : false
					}]}
				]
	}]
	,

});