Ext.define("core.prop.fees.store.LevelStore",{
	  extend: "Ext.data.TreeStore",
	   model:factory.ModelFactory.getModelByName("com.ufo.framework.system.model.ui.JSONTreeNode","checked").modelName,
        autoLoad: !1,
        allowAppend: !0,
        constructor: function() {
          this.proxy = {
                   	type:"ajax",
		             url:"/201/loadLR.action",
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
                        for (var i in t.childNodes) {
                                var o = t.childNodes[i];
                                this.addCountToItemText(o)
                        }
                        this.allowAppend = !1
                }
        },
        addCountToItemText: function(e) {
                var t =system.getModuleDefine("LevelInfo");
                t && t.iconURL || (e.data.icon = null),
                e.raw.count && (e.data.text = e.raw.text + '<span class="navigateTreeItem"><em>(' + e.raw.count + ")</em></span>");
                for (var i in e.childNodes) this.addCountToItemText(e.childNodes[i])
        }
});
	
	
	
