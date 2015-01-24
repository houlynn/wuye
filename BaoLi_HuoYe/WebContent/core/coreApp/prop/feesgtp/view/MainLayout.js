Ext.define("core.prop.feesgtp.view.MainLayout",{
	extend:"Ext.container.Container",
	alias : 'widget.feesgtp.mainlayout',
	layout : 'border',
	border:!1,
	items : [{
		xtype:"feesgtp.levelTree",
		region:"west",
			border:false,
		width:comm.get("clientWidth")*0.18
	},{
		xtype:"feesgtp.gridModue",
		title:'公摊电表信息',
		code:201,
		border:false,
		region:"center"
		
	}]
})