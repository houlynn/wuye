Ext.define("core.prop.notice.view.LevelTree",{
	extend:"Ext.tree.Panel",
	alias : "widget.notice.levelTree",
	displayField : "text",
	rootVisible : false,
	store : "core.prop.point.store.LevelStore",
	title:"小区列表",
	tools : [{
		type:'refresh',
	   	qtip: '刷新',
	   	 handler: function(event, toolEl, header){
	    	var tree=header.ownerCt
	    	tree.getStore().load();
	    	tree.getSelectionModel().deselectAll(true);
	   	 }
	}]
})