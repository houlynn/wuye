Ext.define("core.rbac.role.view.MainLayout",{
	extend:"Ext.container.Container",
	alias : 'widget.role.mainlayout',
	layout : 'border',
	border:false,
	items : [{		
		width:comm.get("clientWidth")*0.18,
		region:"west",
		items:[{
			xtype:"role.roletree",
				border : false,
			height:comm.get("resolutionHeight")*0.3,
		},{
			xtype:"role.moduletree",
				border : false,
			height:comm.get("resolutionHeight")*0.4,
		}]
	},{
		xtype:"role.centerlayout",
			border : false,
		region:"center",
	}]
})