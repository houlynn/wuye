Ext.define("core.base.pro.view.ProPanel",{
	extend : 'core.app.basis.BasePanel',
	alias : 'widget.pro.propanel',
	funData:{
	code:101,
	showTitle:true
	},
	layout:"fit",
	items:[{ 
	xtype:"pro.progrid",
	}]
	
});