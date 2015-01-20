Ext.define("core.prop.feesgtset.view.LevelTree",{
	extend:"Ext.tree.Panel",
	alias : "widget.feesgtset.levelTree",
displayField : "text",
	rootVisible : false,
	store : "core.prop.feesgtset.store.LevelStore",
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