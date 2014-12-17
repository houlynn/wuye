Ext.define("core.base.resident.view.ResindentFeesMain",{
	extend:"Ext.container.Container",
	alias : 'widget.resident.unitmain',
	layout : 'border',
	items : [{
		xtype:"resident.levelTree",
		region:"west",
		width:comm.get("clientWidth")*0.18
	},{
		xtype:"resident.gridModue",
		title:'用户信息',
		region:"center",
		code:104,
		
	}]
})