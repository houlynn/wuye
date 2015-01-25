Ext.define("core.prop.notice.view.MainLayout",{
	alias : 'widget.notice.panel',
	extend : 'Ext.container.Container',
	layout : 'border',
	items : [{
		xtype:"notice.levelTree",
		region:"west",
		width:comm.get("clientWidth")*0.18
	},{
		xtype:"notice.grid",
		title:'小区公告',
		code:106,
		region:"center"
	}]
})