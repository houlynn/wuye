Ext.define("core.prop.feesgtset.view.LevfChose",{
	extend:"Ext.tree.Panel",
	alias : "widget.feesgtset.levelTree",
	displayField : "text",
	rootVisible : false,
	store : "core.prop.fees.store.LevelStore",
	title:"楼宇列表",
    dockedItems: [{
       	 xtype: 'toolbar',dock: 'top',layout : 'hbox',items: [
        	 {
       	  	xtype : "moduecombobox",
		      width:"100%",
		      ref:"vicombobox",
		      ddCode :{
                           modeuName:"Village",
                           marking:'1',
                           identification:'1'
                        }
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
	}]
})