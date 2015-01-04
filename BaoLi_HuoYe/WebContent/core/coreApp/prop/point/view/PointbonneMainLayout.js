Ext.define("core.prop.point.view.PointbonneMainLayout",{
	alias : 'widget.pointbonne.panel',
	extend : 'Ext.container.Container',
	layout : 'border',
	items : [{
		xtype:"pointbonne.levelTree",
		region:"west",
		width:comm.get("clientWidth")*0.18
	},{
		xtype:"pointbonne.grid",
		title:'保姆信息',
		code:106,
		region:"center"
	}]
})