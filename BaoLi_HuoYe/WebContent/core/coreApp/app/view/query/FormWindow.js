Ext.define("core.app.view.query.FormWindow", {
	extend : "Ext.window.Window",
	
	maximizable : true,
	alias : 'widget.formwindow',
	layout : "fit",
	width : comm.get("clientWidth") * 0.6,
	height : comm.get("resolutionHeight") * 0.5,
	initComponent : function() {
		var config={
				items:{},
				title:""
		};
		config=Ext.apply(config,this.config);
		this.title=config.title;
		this.items =config.items;
		this.callParent(arguments);
	}
});