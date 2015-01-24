Ext.define("core.prop.expre.view.MainLayout",{
	alias : 'widget.expre.panel',
	extend : 'Ext.container.Container',
	layout : 'border',
	items : [{
		xtype:"point.levelTree",
		region:"west",
		width:comm.get("clientWidth")*0.18
	},{
		xtype:"expre.grid",
		title:'快递收发信息',
		code:106,
		region:"center"
	}]
})