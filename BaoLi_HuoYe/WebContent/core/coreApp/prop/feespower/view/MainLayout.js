Ext.define("core.prop.feespower.view.MainLayout",{
	extend:"Ext.container.Container",
	alias : 'widget.feespower.mainlayout',
	layout : 'border',
	items : [{
		xtype:"feespower.levelTree",
		region:"west",
		width:comm.get("clientWidth")*0.18
	},{
		xtype:"feespower.gridModue",
		title:'抄表信息',
		code:201,
		region:"center"
		
	}]
})