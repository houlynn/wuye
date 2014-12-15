/
Ext.define('core.app.view.basis.BaseForm', {
			extend : 'Ext.form.Panel',
			style:'border-width:0 0 0 0;',
			alias : 'widget.basisform',
			autoScroll : false,
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
						
				me.items = [];
				me.bodyStyle = 'padding : 5px 5px 0';
				me.callParent(arguments);
			},

			getOtherSetting : function(str) {
				if (!str)
					return {}
				else
					return Ext.decode('{' + str + '}', true)

			},

			// 不是grid中调用的显示某条记录的信息，可能是其他模块点击namefields来调用的
			setRecordId : function(id) {
				var me = this;
				this.module.model.load(id, {
							success : function(record, operation, success) {
								// success中的record中返回的raw 数据，是字符串，没有经过decode,要自己转成对象
								me.setData(Ext.create(me.module.model, Ext.decode(record.raw)));
							}
						});
			},

			setData : function(model) {
				this.data = model;
				if (this.data) {
					this.getForm().loadRecord(this.data);
				} else
					this.getForm().reset();
			}

		});