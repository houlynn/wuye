Ext.define("core.prop.feesgtset.view.MainLayout",{
	extend:"Ext.container.Container",
	alias : 'widget.feesgtset.mainlayout',
	layout : 'border',
	border:!1,
	items : [{
		xtype:"feesgtset.levelTree",
		region:"west",
		border:!1,
		width:comm.get("clientWidth")*0.18
	},{
		xtype:"feesgtset.gridModue",
		title:'公表信息',
		code:320,
		region:"center"
		
	}]
})