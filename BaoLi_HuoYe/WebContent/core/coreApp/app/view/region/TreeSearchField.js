Ext.define("core.app.view.region.TreeSearchField", {
        extend: "Ext.form.field.Trigger",
        alias: "widget.treesearchfield",
        trigger1Cls: Ext.baseCSSPrefix + "form-clear-trigger",
        trigger2Cls: Ext.baseCSSPrefix + "form-search-trigger",
        hasSearch: !1,
        initComponent: function() {
                var e = this;
                e.callParent(arguments),
                e.on("specialkey",
                function(t, i) {
                        i.getKey() == i.ENTER && e.onTrigger2Click()
                })
        },
        afterRender: function() {
                this.callParent(),
                this.triggerCell.item(0).setDisplayed(!1)
        },
        onTrigger1Click: function() {
                var e = this;
                e.hasSearch && (e.setValue(""), e.treePanel.clearFilter(), e.hasSearch = !1, e.triggerCell.item(0).setDisplayed(!1), e.updateLayout())
        },
        onTrigger2Click: function() {
                var e = this,
                t = e.getValue();
                t.length > 0 ? (e.treePanel.filterByText(t), e.hasSearch = !0, e.triggerCell.item(0).setDisplayed(!0), e.updateLayout()) : e.onTrigger1Click()
        }
});