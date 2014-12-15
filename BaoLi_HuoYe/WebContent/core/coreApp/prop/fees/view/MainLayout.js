Ext.define("core.prop.fees.view.MainLayout",{
	extend:"Ext.container.Container",
	alias : 'widget.fees.mainlayout',
	layout : 'border',
	items : [{
		xtype:"fees.levelTree",
		region:"west",
		width:comm.get("clientWidth")*0.18
	},{
		xtype:"fees.gridModue",
		title:'抄表信息',
		code:201,
		region:"center"
		
	}]
})