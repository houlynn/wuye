Ext.define("core.base.resident.view.UnitLevelTree",{
	extend:"Ext.tree.Panel",
	alias : "widget.resident.unitlevelTree",
	displayField : "text",
	rootVisible : false,
	store : "core.base.resident.store.LevelStore",
	title:"楼宇列表",
    dockedItems: [{
       	 xtype: 'toolbar',dock: 'top',layout : 'hbox',items: [
       	 {
       	  	xtype : "basecombobox",
		     ddCode : "VILAGELIST",
		      width:"100%",
		      ref:"vicombobox"
       	 }
       	 ]
     	}],
	tools : [{
		type:'refresh',
	   	qtip: '刷新',
	   	 handler: function(event, toolEl, header){
	    	var tree=header.ownerCt
	    	tree.getStore().load();
	    	tree.getSelectionModel().deselectAll(true);
	   	 }
	}],
})