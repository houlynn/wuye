Ext.define("core.app.base.BasePanel", {
	extend : 'Ext.container.Container',
	alias : 'widget.basepanel',
	layout : "fit",
	frame:true,
	autoScroll : false,
	cls:"addr-panel",
	initComponent : function() {
		var isLoadField= this.isLoadField;
		if (isLoadField) {
			var config = this.config;
			var items = new Array();
			Ext.each(this.items, function(item) {
				if (item.xtype == "basecenterpanel") {
					var obj = {
						xtype : "basecenterpanel",
						items : []
					};
					var centerItems = new Array();
					Ext.each(item.items, function(o) {
						if (o.isLoadGrid) {
							var grid = Ext.apply(o, config);
							centerItems.push(grid);
						} else {
							centerItems.push(o);
						}
					});
					obj.items = centerItems;
					items.push(obj);
				} else {
					items.push(item);
				}
			});
			this.items = items;
			console.log(items);
		}
		this.callParent(arguments);
	}
});