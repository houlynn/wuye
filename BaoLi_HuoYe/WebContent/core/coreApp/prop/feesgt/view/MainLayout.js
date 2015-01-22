Ext.define("core.prop.feesgt.view.MainLayout",{
	extend:"Ext.container.Container",
	alias : 'widget.feesgt.mainlayout',
	layout : 'border',
	border:!1,
	items : [{
		xtype:"feesgt.levelTree",
		region:"west",
			border:false,
		width:comm.get("clientWidth")*0.18
	},{
		xtype:"feesgt.gridModue",
		title:'公摊电表信息',
		code:201,
		border:false,
		region:"center"
		
	}]
})