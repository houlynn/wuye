Ext.define('core.prop.fees.view.SettingForm', {
		    extend : "Ext.form.Panel",
			alias : 'widget.fees.settingform',
		    buttonAlign : 'center',
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
			items:[{
		    fieldLabel:"选择抄表周期",
		       name:"reddate",
		       margin:"3 3 0 0 0",
		       xtype:"datetimefield",
		       format : 'Y-m',
		       border:!1,
		       emptyText :'抄表周期不能为空',
		       itemId:"reddate",
		      allowBlank : false,
			  width:"100%"
			}]
			
		});
