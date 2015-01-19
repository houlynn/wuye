Ext.define("core.prop.feesgt.view.MainLayout",{
	extend:"Ext.container.Container",
	alias : 'widget.feesgt.mainlayout',
	layout : 'border',
	items : [{
		xtype:"feesgt.levelTree",
		region:"west",
		width:comm.get("clientWidth")*0.18
	},{
		xtype:"feesgt.gridModue",
		title:'公表抄表信息',
		code:201,
		region:"center"
		
	}]
})