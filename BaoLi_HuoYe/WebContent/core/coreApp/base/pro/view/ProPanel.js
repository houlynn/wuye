Ext.define("core.base.pro.view.ProPanel",{
	extend : 'core.app.basis.BasePanel',
	alias : 'widget.pro.propanel',
	funCode:"PropertyCompany",
	items:[{ 
	xtype:"pro.progrid",
	region : 'center',
	code:101,
	}]
	
});