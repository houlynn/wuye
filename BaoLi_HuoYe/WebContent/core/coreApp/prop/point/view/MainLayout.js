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
		title:'终点工',
		code:106,
		region:"center"
	}]
})