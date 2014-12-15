Ext.define("core.app.view.region.TreeFilter", {
        filterByText: function(e) {
                this.filterBy(e, "text")
        },
        filterBy: function(e, t) {
                this.clearFilter(),
                this.expandAll();
                var i = this.getView(),
                o = this,
                n = [];
                this.getRootNode().cascadeBy(function() {
                        var i = this;
                        if (i && i.data[t] && i.data[t].toString().toLowerCase().indexOf(e.toLowerCase()) > -1) for (o.expandPath(i.getPath()); i.parentNode;) n.push(i.id),
                        i = i.parentNode
                },
                null, [o, i]),
                this.getRootNode().cascadeBy(function(e, t) {
                        var i = t.getNodeByRecord(this);
                        i && !Ext.Array.contains(n, this.id) && Ext.get(i).setDisplayed("none")
                },
                null, [o, i])
        },
        clearFilter: function() {
                var e = this.getView();
                this.getRootNode().cascadeBy(function(e, t) {
                        var i = t.getNodeByRecord(this);
                        i && Ext.get(i).setDisplayed("table-row")
                },
                null, [this, e])
        }
});