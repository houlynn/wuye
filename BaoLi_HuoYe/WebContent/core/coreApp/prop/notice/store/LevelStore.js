Ext.define("core.prop.notice.store.LevelStore",{
	  extend: "Ext.data.TreeStore",
	   model:factory.ModelFactory.getModelByName("com.ufo.framework.system.model.ui.JSONTreeNode","checked").modelName,
        autoLoad: true,
        allowAppend: !0,
        constructor: function() {
          this.proxy = {
                   	type:"ajax",
		             url:"/vi/loadVi.action",
                        extraParams: arguments[0]
                },
                this.callParent(arguments)
        },
        listeners: {
                beforeinsert: function() {
                        return this.allowAppend
                },
                beforeappend: function() {
                        return this.allowAppend
                },
                beforeload: function() {
                        this.allowAppend = !0
                },
                load: function(e, t) {
                    
                        this.allowAppend = !1
                }
        }
});
	
	
	
