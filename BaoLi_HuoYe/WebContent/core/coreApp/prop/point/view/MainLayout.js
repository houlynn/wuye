Ext.define("core.prop.point.view.MainLayout",{
	alias : 'widget.point.panel',
	extend : 'Ext.container.Container',
	layout : 'border',
	items : [{
		xtype:"point.levelTree",
		region:"west",
		width:comm.get("clientWidth")*0.18
	},{
		xtype:"point.grid",
		title:'收费标准',
		code:106,
		region:"center"
	}]
})