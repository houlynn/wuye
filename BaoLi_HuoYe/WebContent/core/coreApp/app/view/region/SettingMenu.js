Ext.define("core.app.view.region.SettingMenu", {
        extend: "Ext.menu.Menu",
        alias: "widget.navigatesettingmenu",
        margin: "0 0 10 0",
        floating: !0,
        initComponent: function() {
                this.items = [{
                        text: "\u53d6\u6d88\u6240\u6709\u9009\u62e9\u7684\u5bfc\u822a",
                        itemId: "clearAllFilter"
                },
                {
                        text: "\u5237\u65b0\u6240\u6709\u5bfc\u822a\u8bb0\u5f55",
                        itemId: "refresh"
                },
                "-", {
                        text: "\u663e\u793a\u65e0\u8bb0\u5f55\u7684\u9879\u76ee",
                        xtype: "menucheckitem",
                        itemId: "display0record"
                },
                {
                        xtype: "menucheckitem",
                        text: "\u9009\u4e2d\u7684\u5bfc\u822a\u6761\u4ef6\u90fd\u6709\u6548",
                        itemId: "allselected"
                },
                "-", {
                        text: "\u5bfc\u822a\u6811\u663e\u793a\u65b9\u5f0f",
                        menu: [{
                                text: "\u4ee5Tab\u5f62\u5f0f\u663e\u793a",
                                checked: !0,
                                itemId: "showintab",
                                group: this.id + "theme"
                        },
                        {
                                text: "\u4ee5\u5c42\u53e0\u5f62\u5f0f\u663e\u793a",
                                checked: !1,
                                itemId: "showinacce",
                                group: this.id + "theme"
                        }]
                },
                "-", {
                        text: "\u5bfc\u822a\u663e\u793a\u4f4d\u7f6e",
                        menu: [{
                                text: "\u5de6\u8fb9",
                                checked: !0,
                                itemId: "dockinleft",
                                group: this.id + "lorr"
                        },
                        {
                                text: "\u53f3\u8fb9",
                                checked: !1,
                                itemId: "dockinright",
                                group: this.id + "lorr"
                        }]
                }],
                this.callParent(arguments)
        }
});