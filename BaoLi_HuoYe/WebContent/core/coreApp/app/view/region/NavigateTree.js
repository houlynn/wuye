Ext.define("core.app.view.region.NavigateTree", {
        extend: "Ext.tree.Panel",
        alias: "widget.navigatetree",
        requires: ["core.app.view.region.TreeSearchField"],
        rootVisible: !1,
        mixins: {
                treeFilter: "core.app.view.region.TreeFilter"
        },
        
    	style:'border-width:0 0 0 0;',
        mixins: {
                treeFilter: "core.app.view.region.TreeFilter"
        },
        header: {
                titlePosition: 4,
                titleAlign: "center"
        },
        config: {
                maxlevel: 2,
                level: 1,
                cascading: !0,
                isContainNullRecord: !1,
                navigatetitle: null,
                path: null,
                parentFilter: null,
                reverseOrder: null
        },
        tools: [{
                type: "expand",
                tooltip: "\u5c55\u5f00\u4e00\u7ea7"
        },
        {
                type: "collapse",
                tooltip: "\u5168\u90e8\u6298\u53e0"
        },
        {
                type: "pin",
                tooltip: "\u5e76\u5217\u663e\u793a\u5404\u5bfc\u822a\u5c5e\u6027"
        },
        {
                type: "unpin",
                tooltip: "\u5c42\u53e0\u663e\u793a\u5404\u5bfc\u822a\u5c5e\u6027",
                hidden: !0
        }],
        listeners: {
              load: function() {
                        this.getView().refresh(),
                        this.calcMaxLevel(this.getRootNode()),
                        this.setLevel(1)
                },
             afterrender: function(e) { - 1 == this.path.search("--") && this.down("tool[type=pin]").setVisible(!1),
                        e.getHeader().insert(5, {
                                xtype: "treesearchfield",
                                emptyText: "\u8f93\u5165\u7b5b\u9009\u503c",
                                labelAlign: "right",
                                labelWidth: 32,
                                width: "72%",
                                treePanel: e
                        })
                },
                   /*
                itemclick: function (view, node, item, index, e, eOpts){
                	var grid=view.ownerCt.ownerCt.ownerCt.ownerCt.ownerCt.down("modulegrid");
                	var moduelPanel=view.ownerCt.ownerCt.ownerCt.ownerCt.ownerCt;
                	var code=moduelPanel.code;
                    var viewModel=system.getViewModel(code);
                	var title=viewModel.get('tf_title')+"  导航值        "+node.get("text");
                	console.log(title);
                	console.log(grid);
                	grid.setTitle(title);
                	var modue=system.getModuleDefine(node.raw.nodeInfo);
                	navigates:[{"moduleName":"City","tableAsName":"_t7012","primarykey":"tf_cityId","fieldtitle":"\u5e02","equalsValue":"0301","equalsMethod":null,"text":"\u77f3\u5bb6\u5e84\u5e02","isCodeLevel":false}]
                	var navigate={
                			moduleName:node.raw.nodeInfo,
                			tableAsName:"_t"+modue.tf_moduleId,
                			text:node.raw.text,
                			primarykey:modue.tf_primaryKey,
                		    fieldtitle:node.raw.description,
                		    equalsValue:node.raw.code,
                		    isCodeLevel:false
                	};
                	var store=grid.store;
                	if(store.navigates){
                		store.navigates.splice(0,store.navigates.length);
                		store.navigates.push(navigate);
                	}
                  	var proxy=store.getProxy();
					proxy.extraParams.navigates=Ext.encode(store.navigates);
					store.load();	          						
                	
                	
                	
                	
                	
                	
                }*/
                
        },
        initComponent: function() {
                var e = this;
                Ext.applyIf(e, this.config);
                this.store = Ext.create("core.app.store.NavigateTreeStore", {
                        moduleName: this.module.tf_moduleName,
                        cascading: this.cascading,
                        isContainNullRecord: this.isContainNullRecord,
                        title: this.navigatetitle,
                        navigatePath: this.path,
                        reverseOrder: this.reverseOrder,
                        mode: this.mode,
                        type: this.type,
                        parentFilter: Ext.encode(this.parentFilter)
                }),
                this.viewConfig = {
                        plugins: {
                                ptype: "treeviewdragdrop",
                                ddGroup: "DD_" + this.module.tf_moduleName,
                                enableDrag: !1
                        }
                },
                console.log( this.store);
                this.callParent(arguments)
        },
        applyParentFilter: function(e) {
                this.parentFilter = e,
                this.store.proxy.extraParams.parentFilter = Ext.encode(e),
                this.store.load()
        },
        applyCascading: function(e) {
                this.cascading = e,
                this.store.proxy.extraParams.cascading = this.cascading,
                this.store.reload()
        },
        applyIsContainNullRecord: function(e) {
                this.isContainNullRecord = e,
                this.store.proxy.extraParams.isContainNullRecord = e,
                this.store.reload()
        },
        calcMaxLevel: function(e) {
                e.getDepth() > this.getMaxlevel() && this.setMaxlevel(e.getDepth());
                for (var t in e.childNodes) this.calcMaxLevel(e.childNodes[t])
        },
        expandToNextLevel: function() {
                this.level < this.maxlevel && this.expandToLevel(this.getRootNode(), this.level),
                this.level += 1,
                this.level >= this.maxlevel && (this.level = 1)
        },
        expandToLevel: function(e, t) {
                e.getDepth() <= t && e.expand();
                for (var i in e.childNodes) this.expandToLevel(e.childNodes[i], t)
        }
});