Ext.define("core.prop.repair.view.MainLayout",{
	alias : 'widget.repair.panel',
	extend : 'Ext.container.Container',
	layout : 'border',
	items : [{
		xtype:"repair.levelTree",
		region:"west",
		width:comm.get("clientWidth")*0.18
	},{
		xtype:"repair.grid",
		title:'报装报修信息',
		code:106,
		region:"center"
	}]
})