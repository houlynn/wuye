Ext.define("core.rbac.role.view.CenterLayout",{
	extend:"Ext.container.Container",
	alias : 'widget.role.centerlayout',
	layout:"border",
	baseCls:"panel-border",
	frame:true,
		defaults:{
		split:true,
		border : false,
		bodyStyle:'padding:0.5px'
	},
	items : [{
		xtype:"role.roleform",
		region:"north",
		
		height:comm.get("resolutionHeight")*0.2
	},{
		xtype:"role.usergrid",
		region:"center"
	}]
})