Ext.define("core.rbac.user.view.CenterLayout",{
	extend:"Ext.panel.Panel",
	alias : 'widget.rbac.centerlayout',
	frame:true,
	layout:"border",
		border : false,
	items : [{
		xtype:"rbac.deptform",
		region:"north",
			border : false,
		height:comm.get("resolutionHeight")*0.2
	},{
		xtype:"rbac.userlayout",
		region:"center",
		border : false
	}]
})