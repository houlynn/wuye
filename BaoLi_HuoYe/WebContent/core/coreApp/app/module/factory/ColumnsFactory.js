/**
 * 用于生成Grid的Columns的类
 */

Ext.define('core.app.module.factory.ColumnsFactory', {

			statics : {
				getColumns : function(moduleModel, schemeOrderId) {
					var scheme = moduleModel.get('tf_gridSchemes')[0]; // 取得第一个grid的方案
					if (schemeOrderId) { // 查找到相应的scheme
						Ext.Array.each(moduleModel.get('tf_gridSchemes'), function(s) {
									if (s.tf_schemeOrder == schemeOrderId) {
										scheme = s;
										return false;
									}
								})
					}
					var columns = [];
					for (var i in scheme.tf_schemeGroups) {
						var sg = scheme.tf_schemeGroups[i];
						// 是否需要显示分组
						var isgroup = sg.tf_isShowHeaderSpans;
						var group = {
							gridGroupId : sg.tf_gridGroupId,
							text : sg.tf_gridGroupName,
							locked : sg.tf_isLocked,
							// flex : 1,
							columns : []
						}
						for (var j in sg.tf_groupFields) {
							var gf = sg.tf_groupFields[j];
							var fd = moduleModel.getFieldDefine(gf.tf_fieldId);
							var field;
							if (fd.tf_isHidden)
								continue;
							field = this.getColumn(gf, fd, moduleModel);
							field.locked = sg.tf_isLocked || gf.tf_isLocked;
							if (isgroup) {
								this.canReduceTitle(group, field);
								group.columns.push(field);
							} else
								columns.push(field);
						}
						if (isgroup) {
							this.canReduceTitle(group, field);
							columns.push(group);
						}
					}
					return columns;
				},

				// 看看分组名称是不是 下面column 的开头，如果是开头的话，并且columntitle 后面有内容，就把
				// 相同的部分截掉
				canReduceTitle : function(group, field) {
					if (field.text.indexOf(group.text) == 0) {
						field.text = field.text.slice(group.text.length).replace('(', '')
								.replace(')', '').replace('（', '').replace('）', '');
						if (field.text.indexOf("<br/>") == 0)
							field.text = field.text.slice(5);
					}
				},

				/**
				 * 根据groupField,fieldDefine的定义，生成一个column的定义
				 */
				getColumn : function(gf, fd, module) {

					// console.log(fd);
					var ft = fd.tf_title.replace(new RegExp('--', 'gm'), '<br/>');
					if (fd.tf_unitText)
						ft += '<br/>(' + fd.tf_unitText + ')';

					var field = {
						filter : {},
						maxWidth : 800,
						gridFieldId : gf.tf_gridFieldId, // 加上这个属性，用于在列改变了宽度过后，传到后台
						sortable : true,
						text : ft,
						dataIndex : fd.tf_fieldName,
						editor : 'textfield',
						gridField : gf,
						fieldDefine : fd
					}

					if (gf.tf_autoSizeDisabled)	// 此字段不允许自动适应列宽
						field.autoSizeDisabled = true;

					switch (fd.tf_fieldType) {
						case 'Date' :
							Ext.apply(field, {
										xtype : 'datecolumn',
										align : 'center',
										width : 100,
										renderer : Ext.util.Format.dateRenderer,
										editor : { // 如果需要行内修改，需要加入此属性
											xtype : 'datefield',
											format : 'Y-m-d',
											editable : false
										}
									});
							break;

						case 'Datetime' :
							Ext.apply(field, {
								align : 'center',
								width : 150,
								renderer:Ext.util.Format.datetimeRenderer, 
								editor : { // 如果需要行内修改，需要加入此属性
									xtype : 'datetimefield',
									format : 'Y-m-d H:i:s',
									editable : false
								}
								});
							break;

						case 'Boolean' :
							Ext.apply(field, {
										align : 'right',
										xtype : 'checkcolumn',
										stopSelection:false,
										processEvent:function(type) { // 加入这一句，可以防止点中修改
								         if (type == 'click')
									     return false;
							             },
							             editor:{
									           xtype : "basecombobox",
					                           ddCode : "BOLEAN",
					                           allowBlank : false,
					                           hideTrigger : false
							             }
									});
							break;
						case 'basecombobox' :
							Ext.apply(field, {
										align : 'right',
										 width : 150,
										  columnType : "basecombobox",
										  ddCode : fd.tf_otherSetting,
										 renderer:Ext.util.Format.ddRenderer, 
							             editor:{
									           xtype : "basecombobox",
									       	   ddCode : fd.tf_otherSetting,
					                           allowBlank : false,
					                           hideTrigger : false
							             }
									});
							break;

						case 'Integer' :
							Ext.apply(field, {
										align : 'right',
										xtype : 'numbercolumn',
										format : '#',
										renderer : Ext.util.Format.intRenderer,
										editor : {
											xtype : 'numberfield'
										}
									});
							break;
							case 'int' :
							Ext.apply(field, {
										align : 'right',
										xtype : 'numbercolumn',
										format : '#',
										renderer : Ext.util.Format.intRenderer,
										editor : {
											xtype : 'numberfield',
		                                    decimalPrecision:0
										}
									});
							break;

						// 金额字段
						case 'Money' :
							Ext.apply(field, {
										align : 'right',
										xtype : 'numbercolumn',
										width : 110,
										renderer : Ext.util.Format.monetaryRenderer,
										editor : {
											xtype : 'numberfield',
											decimalPrecision:3
										}
									});
							break;

						case 'Double' :
							Ext.apply(field, {
								align : 'right',
								xtype : 'numbercolumn',
								width : 110,
								editor : {
											xtype : 'numberfield',
		                                    decimalPrecision:3
										},
								renderer : Ext.util.Format.floatRenderer
									// formatter : 'floatRenderer' // 这种方法不可以
								});
								
							break;
						case 'double' :
							Ext.apply(field, {
								align : 'right',
								xtype : 'numbercolumn',
								width : 110,
								editor : {
											xtype : 'numberfield',
		                                    decimalPrecision:3
										},
								renderer : Ext.util.Format.floatRenderer
									// formatter : 'floatRenderer' // 这种方法不可以
								});
							break;

						case 'Percent' :
							Ext.apply(field, {
								align : 'center',
								minWidth : 80,
								renderer : Ext.util.Format.percentRenderer,
								editor : {
									xtype : 'numberfield',
									step : 0.01
								},
								width : 110
									// 默认宽度
								})
							break;

						case 'String' :
							// 如果这个字段是此模块的nameFields则加粗显示
							var width=200;
							if (module.get('tf_nameFields') == fd.tf_fieldName)
								Ext.apply(field, {
											text : '<strong>' + fd.tf_title + '</strong>',
											width:width,
											renderer : Ext.util.Format.nameFieldRenderer
										});
							else
								Ext.apply(field, {});
							break;
						default :
							break;
					}
                   if(fd.manyToOne==true){
                	   var modue=system.getModuleDefine(fd.tf_fieldType);
                       var t=modue.tf_fieldName;
                	     Ext.apply(field, {
                	    	 sortable : false,
                             renderer: Ext.util.Format.manytoOneFieldRenderer,
                             manytooneIdName: modue.tableAsName + "___" + modue.tf_primaryKey,
                             moduleName: modue.tf_moduleName,
                             editor:null
                     })
                   }
					if (field.xtype == 'numbercolumn') {
						Ext.apply(field, {
									listeners : { // 将标题栏的内容居中，靠右的话有时候显示不全
										render : function(column) {
											column.getEl().removeCls('x-column-header-align-right');
											column.getEl().addCls('x-column-header-align-center');
											// column.removeListener('render');
										}
									}
								})
					}
					if (fd.tf_allowSummary) {
						Ext.apply(field, {
									hasSummary : true,
									summaryType : 'sum'
								})
					}
					if (gf.tf_columnWidth > 0)
						field.width = gf.tf_columnWidth;
					else if (gf.tf_columnWidth == -1) {
						console.log('-1');
						field.flex = 1;
						field.resizable = false;
						field.minWidth = 120;
						field.maxWidth = 600;
					}
					if(fd.tf_isDisable&&fd.tf_isDisable==true){
					field.editor=null;
					}
					console.log(field);
					return field;
				}
			}
		});
