Ext.define("core.prop.feescoal.view.MainLayout",{
	extend:"Ext.container.Container",
	alias : 'widget.feescoal.mainlayout',
	layout : 'border',
	items : [{
		xtype:"feescoal.levelTree",
		region:"west",
		width:comm.get("clientWidth")*0.18
	},{
		xtype:"feescoal.gridModue",
		title:'抄表信息',
		code:201,
		region:"center"
		
	}]
})