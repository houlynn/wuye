Ext.define("core.rbac.user.view.CenterLayout",{
	extend:"Ext.panel.Panel",
	alias : 'widget.rbac.centerlayout',
	layout:"border",
		border : false,
	items : [{
		xtype:"rbac.deptform",
		region:"north",
			border : false,
		height:comm.get("resolutionHeight")*0.24
	},{
		xtype:"rbac.userlayout",
		region:"center",
		border : false
	}]
})