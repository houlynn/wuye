Ext.define("core.base.resident.view.LevelTree",{
	extend:"Ext.tree.Panel",
	alias : "widget.resident.levelTree",
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
	
	rbar:[{
			xtype : 'button',
			tooltip : '添加楼宇',
			iconCls : 'tree_model_add',
			ref : 'treeIns'
		}, 
		{
			xtype : 'button',
			tooltip : '添加楼层',
			iconCls : 'tree_func_add',
			disabled : true,
			ref : 'treechildIns'
		},	
		{
			xtype : 'button',
			tooltip : '删除楼宇',
			iconCls : 'tree_delete',
			disabled : true,
			ref : 'treeDel'
		}]
})