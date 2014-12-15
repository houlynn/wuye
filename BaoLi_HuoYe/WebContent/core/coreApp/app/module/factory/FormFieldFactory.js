/**
 * 用于生成form中的每一个field
 */

Ext.define('core.app.module.factory.FormFieldFactory', {
	statics : {
		labelDefaultWidth : 92,
		dateDefaultSize : 14,
		integerDefaultSize : 10,
		moneyDefaultSize : 14,
		/**
		 * 根据module定义,formField的定义,formtype来返回一个field的定义
		 */
		getField : function(fieldDefine, formField, formtype, module) {


			var field = {
				name : fieldDefine.tf_fieldName,//anme
				fieldLabel : formField.fieldLabel //lable
						|| (formField.labelAhead ? formField.labelAhead : '')
						+ fieldDefine.tf_title.replace(new RegExp('--', 'gm'), ''),
				labelAlign : formField.labelAlign || 'right',
				labelWidth : formField.labelWidth || this.labelDefaultWidth,
				behindText : formField.behindText || fieldDefine.behindText
			};
			if (field.behindText && field.behindText == ' ')
				delete field.behindText;

			if (formField.labelWidth)
				field.labelWidth = formField.labelWidth;
			if (formField.hideLabel)
				field.hideLabel = true;
			// 如果是隐藏字段
			if (this.getIsHidden(fieldDefine, formField)) {
				Ext.apply(field, {
							xtype : 'hiddenfield'
						});
				return field;
			}

			Ext.apply(field, this.getFieldXType(fieldDefine, field));
			if (formField.tf_width == -1) {
				delete field.size;
				field.anchor = '100%';
			}

			// 是否是必添字段
			if (fieldDefine.tf_isRequired)
				Ext.apply(field, {
							allowBlank : false
						});

		console.log("============构建每个field========")	
         console.log(field);
			return field;
		},

		/**
		 * 判断字段类型
		 */
		getFieldXType : function(fieldDefine, field) {
			    console.log("=========fieldDefine========getFieldXType==================");
		        console.log(fieldDefine.tf_fieldType);
			
			
				switch (fieldDefine.tf_fieldType) {
					case 'Date' :
						return {
							size : this.dateDefaultSize,
							format : 'Y-m-d',
							xtype : 'datefield',
							submitFormat : 'Y-m-d'
						}
					case 'Datetime' :
						return {
							size : this.dateDefaultSize,
							format : 'Y-m-d H:i:s',
							xtype : 'datetimefield'
						}
					case 'Boolean' :
						return {
							xtype : 'checkboxfield',
							inputValue : 'true'
						};
					case 'Integer' :
						return {
							minValue : -9999999999,
							maxValue : 9999999999,
							fieldStyle : "text-align:right",
							size : this.integerDefaultSize,
							xtype : 'numberfield',
							enableKeyEvents : true,
							listeners : {
								keydown : function(field, e, eOpts) {
									if (e.getKey() == Ext.EventObject.ENTER) {
										var f = field.nextSibling('field[readOnly=false]');
										if (!!f)
											f.focus();
										return false;
									}
								}
							}
						};
						case 'int' :
						return {
							minValue : -9999999999,
							maxValue : 9999999999,
							fieldStyle : "text-align:right",
							size : this.integerDefaultSize,
							xtype : 'numberfield',
							enableKeyEvents : true,
							listeners : {
								keydown : function(field, e, eOpts) {
									if (e.getKey() == Ext.EventObject.ENTER) {
										var f = field.nextSibling('field[readOnly=false]');
										if (!!f)
											f.focus();
										return false;
									}
								}
							}
						};
						
					case 'Money' :
						return {
							size : this.moneyDefaultSize,
							hideTrigger : true,
							xtype : 'numberfield',
							behindText : '元'

						};
					case 'Double' :
						return {
							minValue : -9999999999,
							maxValue : 9999999999,
							size : this.moneyDefaultSize,
							hideTrigger : true,
							xtype : 'numberfield'
						};
						case 'double' :
						return {
							minValue : -9999999999,
							maxValue : 9999999999,
							size : this.moneyDefaultSize,
							hideTrigger : true,
							xtype : 'numberfield'
						};
						
					case 'Percent' :
						return {
							size : this.moneyDefaultSize,
							xtype : 'numberfield',
							// behindText : '%',
							percent : true
						};
					case 'String' :
						var len = fieldDefine.l;
						if (len == 0 || len > 100)
							return {
								maxLength : len == 0 ? Number.MAX_VALUE : len,
								enforceMaxLength : true,
								anchor : '100%',
								grow : true,
								growMax : 200,
								growMin : 40,
								xtype : 'textareafield'
							}
						else
							return {
								maxLength : len,
								size : len,
								enforceMaxLength : true,
								xtype : 'textfield',
								enableKeyEvents : true,
								listeners : {
									keydown : function(field, e, eOpts) {
										if (e.getKey() == Ext.EventObject.ENTER) {
											var f = field.nextSibling('field[readOnly=false]');
											if (!!f)
												f.focus();
											return false;
										}
									}
								}
							};
					default :
						  if(fieldDefine.manyToOne){
							  return {
									maxLength : len == 0 ? Number.MAX_VALUE : len,
									enforceMaxLength : true,
									anchor : '100%',
									grow : true,
									growMax : 200,
									growMin : 40,
									xtype : 'textareafield',
									readOnly:true
								}
							  
						  }
						
						
						break;
							
							
							
							

				}
		},

		/**
		 * 判断是否是hidden字段
		 */
		getIsHidden : function(fieldDefine, formField) {
			return (fieldDefine.tf_isHidden || formField.tf_isHidden)
		}
	}
});