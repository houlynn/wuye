Ext.define("core.sys.menu.view.MainLayout",{
	extend:"Ext.container.Container",
	alias : 'widget.menu.mainlayout',
	layout : 'border',
	border:false,
	items : [{
		xtype:"menu.menutree",
		region:"west",
		width:comm.get("clientWidth")*0.18
	},{
		xtype:"menu.menuform",
		region:"center"
	}]
})