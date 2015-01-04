Ext.define("core.prop.point.view.PointyuesaoMainLayout",{
	alias : 'widget.pointyuesao.panel',
	extend : 'Ext.container.Container',
	layout : 'border',
	items : [{
		xtype:"pointyuesao.levelTree",
		region:"west",
		width:comm.get("clientWidth")*0.18
	},{
		xtype:"pointyuesao.grid",
		title:'月嫂信息',
		code:106,
		region:"center"
	}]
})