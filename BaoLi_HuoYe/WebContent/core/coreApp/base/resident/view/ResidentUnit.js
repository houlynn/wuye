Ext.define("core.base.resident.view.ResidentUnit", {
			extend : "Ext.container.Container",
			title : 'Animated DataView',
			alias : "widget.resident.residentUnit",
			layout : 'border',
			items : [{
						xtype : "resident.unitlevelTree",
						region : "west",
						width : comm.get("clientWidth") * 0.18
					}, {
						xtype : "panel",
						region : "center",
						title : '单元信息',
						layout : 'border',

						items : [{
									xtype : "nuit.dataview",
									region : "center",
									code : 104
								}, {
									xtype : "tabpanel",
									 region : "south",
									 height:300,
									 items:[
											{
												title : "收费历史",
												 layout : 'fit',
											     items:[
											     {
											       xtype:"unite.unitefeesgrid",
											       viewBar:true,
											     }
											     ],
											},
											{
												title : "报修单",
												layout : 'fit',
											   items:[
										       {
										        xtype:"unite.repairgrid",
											    }
											     ]
											},
											]
								}]

					}

			]
		});
