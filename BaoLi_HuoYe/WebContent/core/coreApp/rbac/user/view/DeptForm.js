Ext.define("core.rbac.user.view.DeptForm", {
			extend : "Ext.form.Panel",
			alias : "widget.rbac.deptform",
			layout : "auto",
			align : "left",
			title : "部门信息",
			defaults : {
				selectOnFocus : true,
				msgTarget : "side", // 提示信息现在的位置
				width : 680
			},
			items : [{
						xtype : 'fieldset',
						autoHeight : true,
						title : "填写部门信息",
						items : [{
									xtype : "fieldcontainer",
									layout : "hbox",
									items : [{
												xtype : "textfield",
												fieldLabel : "主键",
												name : "deptId",
												 flex: 1,
												hidden : true
											}]
								},

								{
									xtype : "fieldcontainer",
									layout : "hbox",
									items : [{
												xtype : "textfield",
												fieldLabel : "部门名称",
												 flex: 1,
												name : "deptName",
												allowBlank : false
											}]
								}, {
									xtype : "fieldcontainer",
									layout : "hbox",
									items : [{
									xtype : "textfield",
									fieldLabel : "部门编码",
									 flex: 1,
									name : "deptCode",
									allowBlank : false
									}]
								}, {
										xtype : "fieldcontainer",
									layout : "hbox",
									items : [{
									xtype : "numberfield",
									fieldLabel : "排序",
									 flex: 1,
									name : "orderIndex"
										}]
								}, {
										xtype : "fieldcontainer",
									layout : "hbox",
									items : [{
									xtype : "textfield",
									fieldLabel : "父节点",
									name : "parentId",
									 flex: 1,
									hidden : true
										}]
								}, {
									xtype : "button",
									ref : "submit",
									text : "保存",
									width : 80,
									 flex: 0.2,
									
								}

						]
					},

			]
		});