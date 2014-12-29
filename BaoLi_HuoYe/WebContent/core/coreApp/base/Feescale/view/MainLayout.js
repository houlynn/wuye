Ext.define("core.base.Feescale.view.MainLayout",{
	alias : 'widget.Feescalepanel',
	extend : 'core.app.basis.BasePanel',
	funCode:"Feescale",
	layout : 'border',
	items : [{
		xtype:"feesv.levelTree",
		region:"west",
		width:comm.get("clientWidth")*0.18
	},{
		xtype:"feesv.grid",
		title:'收费标准',
		code:106,
		region:"center"
	}]
})