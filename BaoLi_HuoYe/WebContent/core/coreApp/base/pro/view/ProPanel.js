Ext.define("core.base.pro.view.ProPanel",{
	extend : 'core.app.basis.BasePanel',
	alias : 'widget.pro.propanel',
	funData:{
	code:9903,
	showTitle:true,
	navigatesStore:true
	},
	items:[{ 
	xtype:"pro.progrid",
	region : 'center',
	}]
	
});