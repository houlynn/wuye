Ext.define("core.prop.feesgtp.view.LevelTree",{
	extend:"Ext.tree.Panel",
	alias : "widget.feesgtp.levelTree",
	displayField : "text",
	rootVisible : false,
	store : "core.prop.feesgtp.store.LevelStore",
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