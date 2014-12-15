
function setChildChecked(e, t) {
        e.expand(),
        e.set({
                checked: t
        }),
        e.hasChildNodes() && e.eachChild(function(e) {
                setChildChecked(e, t)
        })
}
function setParentChecked(e, t) {
        e.set({
                checked: t
        });
        var i = e.parentNode;
        if (null != i) {
                var o = !0;
                i.eachChild(function(e) {
                        0 == e.data.checked && (o = !1)
                }),
                setParentChecked(i, t && o)
        }
}
function forbidBackSpace(e) {
        var t = e || window.event,
        i = t.target || t.srcElement,
        o = i.type || i.getAttribute("type"),
        n = i.readOnly,
        a = i.disabled;
        n = void 0 == n ? !1 : n,
        a = void 0 == a ? !0 : a;
        var l = !(8 != t.keyCode || "password" != o && "text" != o && "textarea" != o || 1 != n && 1 != a),
        r = 8 == t.keyCode && "password" != o && "text" != o && "textarea" != o;
        return r || l ? !1 : void 0
}
Ext.define("Jfok.m.w.OwnPaging", {
        extend: "Ext.toolbar.Paging",
        alias: "widget.ownpagingtoolbar",
        initComponent: function() {
                "neptune" !== Ext.themeName && (this.defaultButtonUI = "default-toolbar"),
                this.callParent(arguments)
        }
}),
Ext.define("Jfok.m.w.PageSizeCombo", {
        extend: "Ext.form.field.ComboBox",
        alias: "widget.pagesizecombo",
        width: 128,
        forceSelection: !0,
        editable: !1,
        allowBlank: !1,
        triggerAction: "all",
        displayField: "id",
        valueField: "id",
        queryMode: "local",
        fieldLabel: "\u6bcf\u9875\u663e\u793a",//每页显示
        labelAlign: "right",
        labelWidth: 65,
        initComponent: function() {
                this.store = Ext.create("Ext.data.Store", {
                        fields: ["id", "title"],
                        data: [{
                                id: 10
                        },
                        {
                                id: 15
                        },
                        {
                                id: 20
                        },
                        {
                                id: 30
                        },
                        {
                                id: 50
                        },
                        {
                                id: 100
                        }]
                }),
                this.listeners = {
                        change: function(e, t) {
                                var i = e.up("grid");
                                i && (i.store.pageSize = t, i.store.loadPage(1), Jfok.system.pageSize = parseInt(t), Cookies.set("pagesize", t))
                        }
                },
                this.callParent(arguments)
        }
}),
Ext.define("Jfok.r.g.ResultListGridToolbar", {
        extend: "Ext.toolbar.Toolbar",
        alias: "widget.resultlistgridtoolbar",
        MAXLEVEL: 3,
        nowGroupLevel: -1,
        maxGroupLevel: 0,
        initComponent: function() {
                var e = this;
                if (this.items = [], Ext.isArray(e.mainReport.getBaseModule().groupFieldDefines) && (this.maxGroupLevel = e.mainReport.getBaseModule().groupFieldDefines.length), this.maxGroupLevel > 0) {
                        if (this.items.push({
                                xtype: "label",
                                text: "\u5206\u7ec4\u8bbe\u7f6e:"//分组设置
                        }), this.nowGroupLevel = e.mainReport.getGroupFields().length, 0 == this.nowGroupLevel) this.items.push(this.getCanSelectedMenu(e.mainReport.getBaseModule().groupFieldDefines, e.mainReport.getGroupFields()));
                        else for (var t = 0; t < this.nowGroupLevel; t++) this.items.push(this.getGroupSelectedMenu(e.mainReport.getBaseModule().groupFieldDefines, e.mainReport.getGroupFields(), t + 1));
                        this.maxGroupLevel > 1 && this.maxGroupLevel > this.nowGroupLevel && this.nowGroupLevel > 0 && this.nowGroupLevel < this.MAXLEVEL && this.items.push({
                                xtype: "button",
                                icon: "images/button/new.png",
                                tooltip: "\u589e\u52a0\u4e00\u7ea7\u5206\u7ec4",//增加一级分组
                                itemId: "newGroup"
                        }),
                        e.mainReport.getGroupFields().length > 0 && (this.items = this.items.concat(["-", {
                                xtype: "label",
                                text: "\u663e\u793a\u660e\u7ec6:"//显示明细:
                        },
                        {
                                xtype: "toggleslide",
                                itemId: "isShowDetail",
                                state: this.mainReport.getGroupShowDetail(),
                                onText: "\u662f",
                                offText: "\u5426"
                        },
                        "-"]))
                } (0 == this.maxGroupLevel || 0 == e.mainReport.getGroupFields().length) && (this.items = this.items.concat([{
                        xtype: "label",
                        text: "\u663e\u793a\u603b\u8ba1:"
                },
                {
                        xtype: "toggleslide",
                        onText: "\u662f",
                        offText: "\u5426",
                        state: e.mainReport.getIsShowTotal(),
                        itemId: "isshowtotal"
                },
                "-"])),
                this.items = this.items.concat([{
                        text: "\u5bfc\u51fa",
                        icon: "images/button/excel.png",
                        itemId: "exportExcel",
                        xtype: "splitbutton",
                        menu: [{
                                text: "\u5bfc\u51fa\u4e3a Excel \u6587\u4ef6",
                                icon: "images/button/excel.png",
                                itemId: "exportexcel"
                        },
                        {
                                text: "\u5bfc\u51fa\u4e3a Excel \u6587\u4ef6(\u91d1\u989d\u5355\u4f4d:\u4e07\u5143)",
                                icon: "images/button/excel.png",
                                itemId: "exportexcelwanyuan"
                        },
                        "-", {
                                text: "\u5bfc\u51fa\u4e3a PDF \u6587\u4ef6",
                                icon: "images/button/pdf.png",
                                itemId: "exportpdf"
                        },
                        {
                                text: "\u5bfc\u51fa\u4e3a PDF \u6587\u4ef6(\u91d1\u989d\u5355\u4f4d:\u4e07\u5143)",
                                icon: "images/button/pdf.png",
                                itemId: "exportpdfwanyuan"
                        }]
                },
                {
                        icon: "images/button/print.png",
                        itemId: "printExcel",
                        xtype: "splitbutton",
                        menu: [{
                                text: "\u6253\u5370\u5217\u8868",
                                icon: "images/button/print.png",
                                itemId: "printexcel"
                        },
                        {
                                text: "\u6253\u5370\u5217\u8868(\u91d1\u989d\u5355\u4f4d:\u4e07\u5143)",
                                icon: "images/button/print.png",
                                itemId: "printexcelwanyuan"
                        }]
                },
                "-", {
                        icon: "images/button/chart_bar.png",
                        tooltip: "\u56fe\u8868\u5206\u6790",
                        itemId: "chart"
                },
                "-", "\u7b5b\u9009", {
                        width: 60,
                        xtype: "gridsearchfield",
                        store: this.resultGrid.store
                },
                "->", {
                        xtype: "label",
                        text: "\u6d4f\u89c8\u6a21\u5f0f:"
                },
                {
                        xtype: "toggleslide",
                        itemId: "islivegrid",
                        state: this.mainReport.getIsLiveGrid(),
                        onText: "\u662f",
                        offText: "\u5426"
                },
                {
                        icon: "images/button/autosize.png",
                        tooltip: "\u81ea\u52a8\u8c03\u6574\u5217\u5bbd",
                        listeners: {
                                click: function(e) {
                                        e.up("grid").setColumnAutoFited(!1),
                                        e.up("grid").columnsAutoSize()
                                }
                        }
                }]),
                this.callParent(arguments)
        },
        getGroupSelectedMenu: function(e, t, i) {
                var o = this,
                n = [],
                a = t[i - 1];
                if (n.push({
                        text: "\u53d6\u6d88\u672c\u7ea7\u5206\u7ec4",
                        groupMenuItem: !0,
                        level: i,
                        itemId: "cancelGroup",
                        icon: "images/button/clear.png"
                }), n.push("-"), Ext.each(e,
                function(e) {
                        var l = !1;
                        if (Ext.each(t,
                        function(t) {
                                return a.moduleName == e.moduleName && a.fieldId == e.fieldId || t.moduleName != e.moduleName || t.fieldId != e.fieldId ? void 0 : (l = !0, !1)
                        }), 0 == l) {
                                var r = {
                                        level: i,
                                        groupMenuItem: !0,
                                        moduleName: e.moduleName,
                                        moduleTitle: e.moduleTitle,
                                        fieldId: e.fieldId,
                                        fieldTitle: e.fieldTitle,
                                        checked: !1,
                                        group: o.id + i
                                };
                                r.text = e.fieldTitle,
                                a.moduleName == e.moduleName && a.fieldId == e.fieldId && (r.checked = !0, r.disabled = !0, menutext = r.text),
                                n.push(r)
                        }
                }), this.nowGroupLevel > 1) {
                        var l = "\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469";
                        menutext = '<font color="blue">' + l.substr(i - 1, 1) + "</font> " + menutext
                }
                return {
                        text: menutext,
                        menu: n
                }
        },
        getCanSelectedMenu: function(e, t) {
                var i = this,
                o = [];
                return Ext.each(e,
                function(e) {
                        var n = !1;
                        if (Ext.each(t,
                        function(t) {
                                return t.moduleName == e.moduleName && t.fieldId == e.fieldId ? (n = !0, !1) : void 0
                        }), 0 == n) {
                                var a = {
                                        level: i.nowGroupLevel + 1,
                                        groupMenuItem: !0,
                                        addGroupLevel: !0,
                                        moduleName: e.moduleName,
                                        moduleTitle: e.moduleTitle,
                                        fieldId: e.fieldId,
                                        fieldTitle: e.fieldTitle
                                };
                                a.text = e.fieldTitle,
                                o.push(a)
                        }
                }),
                {
                        text: "\u672a\u9009\u62e9",
                        menu: o
                }
        }
}),
Ext.define("Jfok.r.g.ResultListGrid", {
        extend: "Ext.grid.Panel",
        alias: "widget.resultlistgrid",
        requires: ["Jfok.r.g.ResultListGridToolbar", "Jfok.m.w.PageSizeCombo"],
        config: {
                selectdGroupAndFields: null,
                columnAutoFited: !1,
                isGrouped: !1
        },
        viewConfig: {
                stripeRows: !0
        },
        columnLines: !0,
        border: !1,
        frame: !1,
        enableLocking: !0,
        bodyCls: "panel-background",
        multiSelect: !0,
        selType: "rowmodel",
        features: [{
                ftype: "filters",
                encode: !0
        }],
        viewConfig: {
                getRowClass: function(e) {
                        var t = e.get("_level_");
                        return 10 == t ? "total": t >= 20 && 30 >= t ? "subtotal" + t: void 0
                }
        },
        initComponent: function() {
                var e = this;
                this.setColumnAutoFited(!1),
                this.columns = [{
                        xtype: "rownumberer",
                        tdCls: "x-report-cell",
                        resizeDisabled: !0,
                        width: 30
                }],
                this.module.tf_hasAddition && this.module.tf_userRole.tf_additionBrowse && this.columns.push({
                        locked: !0,
                        resizeDisabled: !0,
                        tdCls: "x-report-cell",
                        xtype: "attachmentnumbercolumn",
                        width: "neptune" === Ext.themeName ? 36 : 28
                }),
                this.module.tf_hasAuditing && this.columns.push({
                        resizeDisabled: !0,
                        locked: !0,
                        tdCls: "x-report-cell",
                        xtype: "auditingactioncolumn",
                        width: "neptune" === Ext.themeName ? 36 : 28
                }),
                this.module.tf_hasApprove && this.columns.push({
                        locked: !0,
                        tdCls: "x-report-cell",
                        resizeDisabled: !0,
                        xtype: "approveactioncolumn",
                        width: "neptune" === Ext.themeName ? 36 : 28
                }),
                this.module.tf_hasPayment && this.columns.push({
                        locked: !0,
                        tdCls: "x-report-cell",
                        xtype: "payoutactioncolumn",
                        width: "neptune" === Ext.themeName ? 36 : 28
                }),
                e.mainReport.getGroupFields().length >= 1 && (this.isGrouped = !0, e.columns.push({
                        text: "\u5206\u7ec4\u9879\u76ee",
                        dataIndex: "_total_",
                        tdCls: "x-report-cell intcolor",
                        locked: !0
                }), e.columns.push({
                        locked: !0,
                        text: "\u8bb0\u5f55\u6570",
                        dataIndex: "_count_",
                        align: "center",
                        xtype: "numbercolumn",
                        format: "#",
                        tdCls: "x-report-cell intcolor",
                        renderer: Jfok.system.intRenderer
                })),
                Ext.Array.forEach(this.groupAndFields,
                function(t) {
                        var i = {
                                text: t.groupTitle,
                                flex: 1,
                                columns: [],
                                hidden: "\u9690\u85cf" == t.groupTitle,
                                locked: t.groupTitle.endWith(" ")
                        };
                        Ext.Array.forEach(t.fields,
                        function(t) {
                                var o = e.getColumnField(t);
                                t.dataIndex = o.dataIndex,
                                t.text = o.simpleText || o.text,
                                i.columns.push(o)
                        }),
                        e.columns.push(i)
						   console.log('打印=========Jfok.r.g.ResultListGrid======================');
						    console.log(e);
                }),
                this.store = Ext.create("Jfok.r.g.ResultListGridStore", {
                        grid: this,
                        module: this.module,
                        groupAndFields: this.groupAndFields
                }),
                this.dockedItems = [{
                        dock: "top",
                        xtype: "resultlistgridtoolbar",
                        mainReport: this.mainReport,
                        resultGrid: this
                }],
                this.mainReport.getIsLiveGrid() || this.dockedItems.push({
                        xtype: "pagingtoolbar",
                        prependButtons: !0,
                        items: [{
                                xtype: "pagesizecombo",
                                value: this.store.pageSize
                        },
                        "\u6761", "-"],
                        store: this.store,
                        dock: "bottom",
                        displayInfo: !0
                }),
                this.callParent(arguments)
        },
        columnsAutoSize: function() {
                this.getColumnAutoFited() || (this.setColumnAutoFited(!0), Ext.suspendLayouts(), Ext.Array.forEach(this.lockedGrid.getView().headerCt.items.items,
                function(e) {
                        e.resizeDisabled || e.autoSize()
                }), Ext.Array.forEach(this.normalGrid.getView().headerCt.items.items,
                function(e) {
                        e.autoSize()
                }), Ext.resumeLayouts(!0))
        },
        getColumnField: function(e) {
                var t = Jfok.modules.getModule(e.moduleName),
                i = t.getFieldDefine(e.fieldId),
                o = {
                        maxWidth: 800,
                        text: i.tf_title,
                        sortable: !0,
                        renderer: Jfok.system.defaultRenderer,
                        dataIndex: i.baseField || i.tf_aggregate ? i.tf_fieldName: i.manytoone_TitleName,
                        tdCls: "x-report-cell"
                };
                switch (t.tf_moduleName != this.module.tf_moduleName && (o.dataIndex = i.baseField || i.tf_aggregate ? t.tableAsName + "___" + i.tf_fieldName: i.manytoone_TitleName), i.tf_fieldType) {
                case "Date":
                        Ext.apply(o, {
                                xtype: "datecolumn",
                                align: "center",
                                width: 100,
                                renderer: Jfok.system.dateRenderer
                        });
                        break;
                case "Datetime":
                        Ext.apply(o, {
                                xtype: "datecolumn",
                                align: "center",
                                width: 130,
                                renderer: Jfok.system.datetimeRenderer
                        });
                        break;
                case "Boolean":
                        delete o.renderer,
                        o.xtype = "checkcolumn",
                        o.stopSelection = !1,
                        o.processEvent = function(e) {
                                return "click" == e ? !1 : void 0
                        };
                        break;
                case "Integer":
                        Ext.apply(o, {
                                align: "center",
                                xtype: "numbercolumn",
                                format: "#",
                                tdCls: "x-report-cell intcolor",
                                renderer: Jfok.system.intRenderer
                        });
                        break;
                case "Double":
                        Ext.apply(o, {
                                align: "center",
                                xtype: "numbercolumn",
                                width: 110,
                                minWidth: 80,
                                renderer: Jfok.system.moneyRenderer
                        });
                        break;
                case "Float":
                        Ext.apply(o, {
                                align: "center",
                                xtype: "numbercolumn",
                                width: 110,
                                minWidth: 80,
                                renderer: Jfok.system.moneyRenderer
                        });
                        break;
                case "Percent":
                        Ext.apply(o, {
                                align: "center",
                                xtype: "numbercolumn",
                                width: 110,
                                minWidth: 80,
                                renderer: Jfok.system.percentRenderer
                        });
                        break;
                case "String":
                        if (!e.aggregateType && t.tf_nameFields == i.tf_fieldName) if (t.tf_moduleName == this.module.tf_moduleName) Ext.apply(o, {
                                simpleText: i.tf_title,
                                text: '<span class="gridheadicon" ><img src="images/button/namefield.png" />' + i.tf_title + "</span>",
                                renderer: this.nameFieldRenderer
                        });
                        else {
                                var n = "";
                                t && t.iconURL && (n = '<img src="' + t.iconURL + '" />'),
                                Ext.apply(o, {
                                        renderer: Jfok.system.manytoOneFieldRenderer,
                                        simpleText: i.tf_title,
                                        text: '<span class="gridheadicon" >' + n + i.tf_title + "</span>",
                                        manytooneIdName: t.tableAsName + "___" + t.tf_primaryKey,
                                        moduleName: t.tf_moduleName
                                })
                        }
                }
                if ("sum" == e.aggregateType ? (o.dataIndex = "S_" + o.dataIndex, o.text += "\u5c0f\u8ba1") : "count" == e.aggregateType ? (o.dataIndex = "C_" + o.dataIndex, o.text += "\u4e2a\u6570", o.tdCls = "x-report-cell intcolor", o.renderer = Jfok.system.intRenderer, o.align = "center", o.xtype = "numbercolumn", o.format = "#", e.fieldType = "Integer") : "avg" == e.aggregateType ? (o.dataIndex = "A_" + o.dataIndex, o.text += "\u5747\u503c") : "max" == e.aggregateType ? (o.dataIndex = "X_" + o.dataIndex, o.text += "\u6700\u5927\u503c") : "min" == e.aggregateType ? (o.dataIndex = "N_" + o.dataIndex, o.text += "\u6700\u5c0f\u503c") : o.filter = {
                        updateBuffer: 1e3,
                        dateFormat: "Y-m-d"
                },
                i.manytoone_TitleName) {
                        var a = Jfok.modules.getModuleInfoWithName(i.tf_fieldType),
                        n = "";
                        a && a.iconURL && (n = '<img src="' + a.iconURL + '" />'),
                        Ext.apply(o, {
                                renderer: Jfok.system.manytoOneFieldRenderer,
                                simpleText: i.tf_title,
                                text: '<span class="gridheadicon" >' + n + i.tf_title + "</span>",
                                manytooneIdName: i.manytoone_IdName,
                                moduleName: i.tf_fieldType
                        })
                }
                return o.text = o.text.replace(new RegExp("--", "gm"), "<br/>"),
                o
        },
        nameFieldRenderer: function(e, t, i, o, n, a) {
                var l = e;
                try {
                        l = i.getIdValue() ? '<span class="gridNameField"><a onclick="javascript:__smr(\'' + i.module.tf_moduleName + "','" + i.getIdValue() + '\');return false;" href="#">' + filterTextSetBk(a, e) + "</a></span>": filterTextSetBk(a, e)
                } catch(r) {}
                return l
        },
        getSelectionCount: function() {
                return this.getSelectionModel().getSelection().length
        }
}),
Ext.define("Jfok.r.widget.DateSelectButton", {
        extend: "Ext.button.Button",
        alias: "widget.dateselectbutton",
        config: {
                dateSection: null
        },
        aheadText: "\u67e5\u8be2\u671f\u95f4\uff1a",
        initComponent: function() {
                this.text = this.aheadText + "\u6240\u6709\u5e74\u5ea6",
                this.menu = {
                        xtype: "yearmonthselectmenu",
                        target: this
                },
                this.callParent(arguments)
        },
        setButtonText: function(e) {
                this.setText(this.aheadText + e)
        },
        listeners: {
                dateSectionChanged: function(e, t) {
                        e.setDateSection(t),
                        e.setText(e.aheadText + t.text);
                        var i = this.up("mainreport");
                        i.fireEvent("dateSectionChanged", i, t)
                }
        }
}),
Ext.define("Jfok.lib.ClearButton", {
        alias: "plugin.clearbutton",
        hideClearButtonWhenEmpty: !0,
        hideClearButtonWhenMouseOut: !0,
        animateClearButton: !0,
        clearOnEscape: !0,
        clearButtonCls: "ext-ux-clearbutton",
        textField: null,
        animateWithCss3: !1,
        constructor: function(e) {
                Ext.apply(this, e),
                this.callParent(arguments)
        },
        init: function(e) {
                this.textField = e,
                e.rendered ? this.handleAfterRender() : e.on("afterrender", this.handleAfterRender, this)
        },
        handleAfterRender: function() {
                this.isTextArea = "textarea" == this.textField.inputEl.dom.type.toLowerCase(),
                this.createClearButtonEl(),
                this.addListeners(),
                this.repositionClearButton(),
                this.updateClearButtonVisibility(),
                this.addEscListener()
        },
        createClearButtonEl: function() {
                this.animateClearButton && this.animateWithCss3;
                this.clearButtonEl = this.textField.bodyEl.createChild({
                        tag: "div",
                        cls: this.clearButtonCls
                }),
                this.animateClearButton && (this.animateWithCss3 = this.supportsCssTransition(this.clearButtonEl)),
                this.animateWithCss3 ? this.clearButtonEl.addCls(this.clearButtonCls + "-off") : this.clearButtonEl.setStyle("visibility", "hidden")
        },
        supportsCssTransition: function(e) {
                for (var t = ["transitionProperty", "WebkitTransitionProperty", "MozTransitionProperty", "OTransitionProperty", "msTransitionProperty", "KhtmlTransitionProperty"], i = e.dom.style, o = 0, n = t.length; n > o; ++o) if ("undefined" !== i[t[o]]) return ! 0;
                return ! 1
        },
        addEscListener: function() {
                this.clearOnEscape && this.textField.inputEl.on("keydown",
                function(e) {
                        if (e.getKey() == Ext.EventObject.ESC) {
                                if (this.textField.isExpanded) return;
                                Ext.Function.defer(this.textField.setValue, 1, this.textField, [""]),
                                e.stopEvent()
                        }
                },
                this)
        },
        addListeners: function() {
                var e = this.textField,
                t = e.bodyEl;
                t.on("mouseover", this.handleMouseOverInputField, this),
                t.on("mouseout", this.handleMouseOutOfInputField, this),
                e.on("destroy", this.handleDestroy, this),
                e.on("resize", this.repositionClearButton, this),
                e.on("change",
                function() {
                        this.repositionClearButton(),
                        this.updateClearButtonVisibility()
                },
                this);
                var i = this.clearButtonEl;
                i.on("mouseover", this.handleMouseOverClearButton, this),
                i.on("mouseout", this.handleMouseOutOfClearButton, this),
                i.on("mousedown", this.handleMouseDownOnClearButton, this),
                i.on("mouseup", this.handleMouseUpOnClearButton, this),
                i.on("click", this.handleMouseClickOnClearButton, this)
        },
        handleDestroy: function() {
                this.clearButtonEl.destroy()
        },
        handleMouseClickOnClearButton: function(e) {
                this.isLeftButton(e) && (this.textField.readOnly || (this.textField.setValue(""), this.textField.focus()))
        },
        handleMouseOverInputField: function(e) {
                this.clearButtonEl.addCls(this.clearButtonCls + "-mouse-over-input"),
                e.getRelatedTarget() == this.clearButtonEl.dom && (this.clearButtonEl.removeCls(this.clearButtonCls + "-mouse-over-button"), this.clearButtonEl.removeCls(this.clearButtonCls + "-mouse-down")),
                this.updateClearButtonVisibility()
        },
        handleMouseOutOfInputField: function(e) {
                this.clearButtonEl.removeCls(this.clearButtonCls + "-mouse-over-input"),
                e.getRelatedTarget() == this.clearButtonEl.dom && this.clearButtonEl.addCls(this.clearButtonCls + "-mouse-over-button"),
                this.updateClearButtonVisibility()
        },
        handleMouseOverClearButton: function(e) {
                e.stopEvent(),
                this.textField.bodyEl.contains(e.getRelatedTarget()) || (this.clearButtonEl.addCls(this.clearButtonCls + "-mouse-over-button"), this.updateClearButtonVisibility())
        },
        handleMouseOutOfClearButton: function(e) {
                e.stopEvent(),
                this.textField.bodyEl.contains(e.getRelatedTarget()) || (this.clearButtonEl.removeCls(this.clearButtonCls + "-mouse-over-button"), this.clearButtonEl.removeCls(this.clearButtonCls + "-mouse-down"), this.updateClearButtonVisibility())
        },
        handleMouseDownOnClearButton: function(e) {
                this.isLeftButton(e) && this.clearButtonEl.addCls(this.clearButtonCls + "-mouse-down")
        },
        handleMouseUpOnClearButton: function(e) {
                this.isLeftButton(e) && this.clearButtonEl.removeCls(this.clearButtonCls + "-mouse-down")
        },
        repositionClearButton: function() {
                var e = this.clearButtonEl;
                if (e) {
                        var t = this.calculateClearButtonPosition(this.textField);
                        e.dom.style.right = t.right + "px",
                        e.dom.style.top = t.top + "px"
                }
        },
        calculateClearButtonPosition: function(e) {
                var t = e.inputEl.getBox(!0, !0),
                i = t.y,
                o = t.x;
                return this.fieldHasScrollBar() && (o += Ext.getScrollBarWidth()),
                this.textField.triggerWrap && (o += this.textField.getTriggerWidth()),
                {
                        right: o,
                        top: i
                }
        },
        fieldHasScrollBar: function() {
                if (!this.isTextArea) return ! 1;
                var e = this.textField.inputEl,
                t = e.getStyle("overflow-y");
                return "hidden" == t || "visible" == t ? !1 : "scroll" == t ? !0 : e.dom.scrollHeight <= e.dom.clientHeight ? !1 : !0
        },
        isButtonCurrentlyVisible: function() {
                if (this.animateClearButton && this.animateWithCss3) return this.clearButtonEl.hasCls(this.clearButtonCls + "-on");
                var e = Ext.core.Element.data(this.clearButtonEl.dom, "isVisible");
                return "boolean" == typeof e ? e: this.clearButtonEl.isVisible()
        },
        shouldButtonBeVisible: function() {
                if (this.hideClearButtonWhenEmpty && Ext.isEmpty(this.textField.getValue())) return ! 1;
                var e = this.clearButtonEl;
                return ! this.hideClearButtonWhenMouseOut || e.hasCls(this.clearButtonCls + "-mouse-over-button") || e.hasCls(this.clearButtonCls + "-mouse-over-input") ? !0 : !1
        },
        updateClearButtonVisibility: function() {
                var e = this.isButtonCurrentlyVisible(),
                t = this.shouldButtonBeVisible();
                this.textField.readOnly && (t = !1);
                var i = this.clearButtonEl;
                if (e != t && (this.animateClearButton && this.animateWithCss3 ? (this.clearButtonEl.removeCls(this.clearButtonCls + (e ? "-on": "-off")), i.addCls(this.clearButtonCls + (t ? "-on": "-off"))) : (i.stopAnimation(), i.setVisible(t, this.animateClearButton)), i.setStyle("background-color", this.textField.inputEl.getStyle("background-color")), !(this.isTextArea && Ext.isGecko || Ext.isIE))) {
                        var o = i.getWidth() - this.clearButtonEl.getMargin("l"),
                        n = this.textField.inputEl.getPadding("r"),
                        a = t ? 1 : -1;
                        this.textField.inputEl.dom.style.paddingRight = n + a * o + "px"
                }
        },
        isLeftButton: function(e) {
                return 0 === e.button
        }
}),
Ext.define("Jfok.lib.TreeNodeDisabled", {
        alias: "plugin.dvp_nodedisabled",
        extend: "Ext.AbstractPlugin",
        mixins: {
                observable: "Ext.util.Observable"
        },
        disabledCls: "dvp-tree-node-disabled",
        preventSelection: !0,
        constructor: function() {
                this.callParent(arguments),
                this.mixins.observable.constructor.call(this)
        },
        init: function(e) {
                var t, i, o = this,
                n = e.is("treeview") ? e: e.getView();
                o.callParent(arguments),
                t = n.getRowClass,
                t ? (i = n.scope || o, Ext.apply(n, {
                        getRowClass: function() {
                                var e, n;
                                return e = t.apply(i, arguments) || "",
                                n = o.getRowClass.apply(o, arguments) || "",
                                e && n ? e + " " + n: e + n
                        }
                })) : Ext.apply(n, {
                        getRowClass: Ext.Function.bind(o.getRowClass, o)
                }),
                Ext.apply(n, {
                        onCheckChange: Ext.Function.createInterceptor(n.onCheckChange, o.onCheckChangeInterceptor, o)
                }),
                o.preventSelection && o.mon(e.getSelectionModel(), "beforeselect", o.onBeforeNodeSelect, o),
                e.on("destroy", o.destroy, o, {
                        single: !0
                })
        },
        destroy: function() {
                this.callParent(arguments),
                this.clearListeners()
        },
        getCmp: function() {
                return this.callParent(arguments)
        },
        getRowClass: function(e) {
                return e.get("disabled") ? this.disabledCls: ""
        },
        onBeforeNodeSelect: function(e, t) {
                return t.get("disabled") ? !1 : void 0
        },
        onCheckChangeInterceptor: function(e) {
                return e.get("disabled") ? !1 : void 0
        }
}),
Ext.define("Ext.locale.en.ux.picker.DateTimePicker", {
        override: "Ext.ux.DateTimePicker",
        todayText: "Now",
        timeLabel: "Time"
}),
Ext.define("Jfok.lib.datetime.DateTimePicker", {
        extend: "Ext.picker.Date",
        alias: "widget.datetimepicker",
        todayText: "\u73b0\u5728",
        timeLabel: "\u65f6\u95f4",
        initComponent: function() {
                var e = this.value || new Date;
                this.callParent(),
                this.value = e
        },
        onRender: function() {
                this.timefield || (this.timefield = Ext.create("Jfok.lib.datetime.TimePickerField", {
                        fieldLabel: this.timeLabel,
                        labelWidth: 40,
                        value: Ext.Date.format(this.value, "H:i:s")
                })),
                this.timefield.ownerCt = this,
                this.timefield.on("change", this.timeChange, this),
                this.callParent(arguments); {
                        var e = Ext.get(Ext.DomQuery.selectNode("table", this.el.dom));
                        Ext.core.DomHelper.insertAfter(e, {
                                tag: "div",
                                style: "border:0px;",
                                children: [{
                                        tag: "div",
                                        cls: "x-datepicker-footer ux-timefield"
                                }]
                        },
                        !0)
                }
                this.timefield.render(this.el.child("div div.ux-timefield"));
                var t = this.getEl().parent("div.x-layer");
                t && t.setStyle("height", t.getHeight() + 31)
        },
        timeChange: function() {
                this.value = this.fillDateTime(this.value)
        },
        fillDateTime: function(e) {
                if (this.timefield) {
                        var t = this.timefield.getRawValue();
                        e.setHours(t.h),
                        e.setMinutes(t.m),
                        e.setSeconds(t.s)
                }
                return e
        },
        changeTimeFiledValue: function() {
                this.timefield.un("change", this.timeChange, this),
                this.timefield.setValue(this.value),
                this.timefield.on("change", this.timeChange, this)
        },
        setValue: function(e) {
                return this.value = e,
                this.changeTimeFiledValue(e),
                this.update(this.value)
        },
        getValue: function() {
                return this.fillDateTime(this.value)
        },
        handleDateClick: function(e, t) {
                var i = this,
                o = i.handler;
                e.stopEvent(),
                i.disabled || !t.dateValue || Ext.fly(t.parentNode).hasCls(i.disabledCellCls) || (i.doCancelFocus = i.focusOnSelect === !1, i.setValue(this.fillDateTime(new Date(t.dateValue))), delete i.doCancelFocus, i.fireEvent("select", i, i.value), o && o.call(i.scope || i, i, i.value), i.onSelect())
        },
        selectToday: function() {
                var e = this,
                t = e.todayBtn,
                i = e.handler;
                return t && !t.disabled && (e.setValue(new Date), e.fireEvent("select", e, e.value), i && i.call(e.scope || e, e, e.value), e.onSelect()),
                e
        }
}),
Ext.define("Jfok.lib.BoxSelect", {
        extend: "Ext.form.field.ComboBox",
        alias: ["widget.comboboxselect", "widget.boxselect"],
        requires: ["Ext.selection.Model", "Ext.data.Store"],
        multiSelect: !0,
        forceSelection: !0,
        createNewOnEnter: !1,
        createNewOnBlur: !1,
        encodeSubmitValue: !1,
        triggerOnClick: !0,
        stacked: !1,
        pinList: !0,
        filterPickList: !1,
        selectOnFocus: !0,
        grow: !0,
        growMin: !1,
        growMax: !1,
        fieldSubTpl: ['<div id="{cmpId}-listWrapper" class="x-boxselect {fieldCls} {typeCls}">', '<ul id="{cmpId}-itemList" class="x-boxselect-list">', '<li id="{cmpId}-inputElCt" class="x-boxselect-input">', '<input id="{cmpId}-inputEl" type="{type}" ', '<tpl if="name">name="{name}" </tpl>', '<tpl if="value"> value="{[Ext.util.Format.htmlEncode(values.value)]}"</tpl>', '<tpl if="size">size="{size}" </tpl>', '<tpl if="tabIdx">tabIndex="{tabIdx}" </tpl>', '<tpl if="disabled"> disabled="disabled"</tpl>', 'class="x-boxselect-input-field {inputElCls}" autocomplete="off">', "</li>", "</ul>", "</div>", {
                compiled: !0,
                disableFormats: !0
        }],
        childEls: ["listWrapper", "itemList", "inputEl", "inputElCt"],
        componentLayout: "boxselectfield",
        initComponent: function() {
                var e = this,
                t = e.typeAhead;
                t && !e.editable && Ext.Error.raise("If typeAhead is enabled the combo must be editable: true -- please change one of those settings."),
                Ext.apply(e, {
                        typeAhead: !1
                }),
                e.callParent(),
                e.typeAhead = t,
                e.selectionModel = new Ext.selection.Model({
                        store: e.valueStore,
                        mode: "MULTI",
                        lastFocused: null,
                        onSelectChange: function(e, t, i, o) {
                                o()
                        }
                }),
                !Ext.isEmpty(e.delimiter) && e.multiSelect && (e.delimiterRegexp = new RegExp(String(e.delimiter).replace(/[$%()*+.?\[\\\]{|}]/g, "\\$&")))
        },
        initEvents: function() {
                var e = this;
                e.callParent(arguments),
                e.enableKeyEvents || e.mon(e.inputEl, "keydown", e.onKeyDown, e),
                e.mon(e.inputEl, "paste", e.onPaste, e),
                e.mon(e.listWrapper, "click", e.onItemListClick, e),
                e.mon(e.selectionModel, {
                        selectionchange: function(t, i) {
                                e.applyMultiselectItemMarkup(),
                                e.fireEvent("valueselectionchange", e, i)
                        },
                        focuschange: function(t, i, o) {
                                e.fireEvent("valuefocuschange", e, i, o)
                        },
                        scope: e
                })
        },
        onBindStore: function(e) {
                var t = this;
                e && (t.valueStore = new Ext.data.Store({
                        model: e.model,
                        proxy: {
                                type: "memory"
                        }
                }), t.mon(t.valueStore, "datachanged", t.applyMultiselectItemMarkup, t), t.selectionModel && t.selectionModel.bindStore(t.valueStore))
        },
        onUnbindStore: function() {
                var e = this,
                t = e.valueStore;
                t && (e.selectionModel && (e.selectionModel.setLastFocused(null), e.selectionModel.deselectAll(), e.selectionModel.bindStore(null)), e.mun(t, "datachanged", e.applyMultiselectItemMarkup, e), t.destroy(), e.valueStore = null),
                e.callParent(arguments)
        },
        createPicker: function() {
                var e = this,
                t = e.callParent(arguments);
                return e.mon(t, {
                        beforerefresh: e.onBeforeListRefresh,
                        scope: e
                }),
                e.filterPickList && t.addCls("x-boxselect-hideselections"),
                t
        },
        onDestroy: function() {
                var e = this;
                Ext.destroyMembers(e, "valueStore", "selectionModel"),
                e.callParent(arguments)
        },
        getSubTplData: function() {
                var e = this,
                t = e.callParent(),
                i = e.emptyText && t.value.length < 1;
                return t.value = i ? e.emptyText: "",
                t.inputElCls = t.fieldCls.match(e.emptyCls) ? e.emptyCls: "",
                t
        },
        afterRender: function() {
                var e = this;
                Ext.supports.Placeholder && e.inputEl && e.emptyText && delete e.inputEl.dom.placeholder,
                e.bodyEl.applyStyles("vertical-align:top"),
                e.grow && (Ext.isNumber(e.growMin) && e.growMin > 0 && e.listWrapper.applyStyles("min-height:" + e.growMin + "px"), Ext.isNumber(e.growMax) && e.growMax > 0 && e.listWrapper.applyStyles("max-height:" + e.growMax + "px")),
                e.stacked === !0 && e.itemList.addCls("x-boxselect-stacked"),
                e.multiSelect || e.itemList.addCls("x-boxselect-singleselect"),
                e.applyMultiselectItemMarkup(),
                e.callParent(arguments)
        },
        findRecord: function(e, t) {
                var i, o = this.store;
                return o ? (i = o.queryBy(function(i) {
                        return i.isEqual(i.get(e), t)
                }), i.getCount() > 0 ? i.first() : !1) : !1
        },
        onLoad: function() {
                var e = this,
                t = e.valueField,
                i = e.valueStore,
                o = !1;
                i && (Ext.isEmpty(e.value) || 0 != i.getCount() || e.setValue(e.value, !1, !0), i.suspendEvents(), i.each(function(n) {
                        var a = e.findRecord(t, n.get(t)),
                        l = a ? i.indexOf(n) : -1;
                        l >= 0 && (i.removeAt(l), i.insert(l, a), o = !0)
                }), i.resumeEvents(), o && i.fireEvent("datachanged", i)),
                e.callParent(arguments)
        },
        isFilteredRecord: function(e) {
                var t, i = this,
                o = i.store,
                n = i.valueField,
                a = !1;
                return t = o.findExact(n, e.get(n)),
                a = -1 === t && (!o.snapshot || i.findRecord(n, e.get(n)) !== !1),
                a = a || !a && -1 === t && i.forceSelection !== !0 && i.valueStore.findExact(n, e.get(n)) >= 0
        },
        doRawQuery: function() {
                var e = this,
                t = e.inputEl.dom.value;
                e.multiSelect && (t = t.split(e.delimiter).pop()),
                this.doQuery(t, !1, !0)
        },
        onBeforeListRefresh: function() {
                this.ignoreSelection++
        },
        onListRefresh: function() {
                this.callParent(arguments),
                this.ignoreSelection > 0 && --this.ignoreSelection
        },
        onListSelectionChange: function(e, t) {
                var i, o = this,
                n = o.valueStore,
                a = [];
                o.ignoreSelection <= 0 && o.isExpanded && (n.each(function(e) { (Ext.Array.contains(t, e) || o.isFilteredRecord(e)) && a.push(e)
                }), a = Ext.Array.merge(a, t), i = Ext.Array.intersect(a, n.getRange()).length, (i != a.length || i != o.valueStore.getCount()) && (o.setValue(a, !1), o.multiSelect && o.pinList || Ext.defer(o.collapse, 1, o), n.getCount() > 0 && o.fireEvent("select", o, n.getRange())), o.inputEl.focus(), o.pinList || (o.inputEl.dom.value = ""), o.selectOnFocus && o.inputEl.dom.select())
        },
        syncSelection: function() {
                var e, t, i, o = this,
                n = o.picker,
                a = o.valueField;
                n && (e = n.store, t = [], o.valueStore && o.valueStore.each(function(i) {
                        var o = e.findExact(a, i.get(a));
                        o >= 0 && t.push(e.getAt(o))
                }), o.ignoreSelection++, i = n.getSelectionModel(), i.deselectAll(), t.length > 0 && i.select(t), o.ignoreSelection > 0 && --o.ignoreSelection)
        },
        doAlign: function() {
                var e, t = this,
                i = t.picker,
                o = "-above";
                t.picker.alignTo(t.listWrapper, t.pickerAlign, t.pickerOffset),
                e = i.el.getY() < t.inputEl.getY(),
                t.bodyEl[e ? "addCls": "removeCls"](t.openCls + o),
                i[e ? "addCls": "removeCls"](i.baseCls + o)
        },
        alignPicker: function() {
                var e = this,
                t = e.picker,
                i = t.getTargetEl().dom.scrollTop;
                e.callParent(arguments),
                e.isExpanded && (e.matchFieldWidth && t.setWidth(e.listWrapper.getWidth()), t.getTargetEl().dom.scrollTop = i)
        },
        getCursorPosition: function() {
                var e;
                return Ext.isIE ? (e = document.selection.createRange(), e.collapse(!0), e.moveStart("character", -this.inputEl.dom.value.length), e = e.text.length) : e = this.inputEl.dom.selectionStart,
                e
        },
        hasSelectedText: function() {
                var e, t;
                return Ext.isIE ? (e = document.selection, t = e.createRange(), t.parentElement() == this.inputEl.dom) : this.inputEl.dom.selectionStart != this.inputEl.dom.selectionEnd
        },
        onKeyDown: function(e) {
                var t = this,
                i = e.getKey(),
                o = t.inputEl.dom.value,
                n = t.valueStore,
                a = t.selectionModel,
                l = !1;
                if (!t.readOnly && !t.disabled && t.editable) {
                        if (t.isExpanded && i == e.A && e.ctrlKey) t.select(t.getStore().getRange()),
                        a.setLastFocused(null),
                        a.deselectAll(),
                        t.collapse(),
                        t.inputEl.focus(),
                        l = !0;
                        else if (n.getCount() > 0 && ("" == o || 0 === t.getCursorPosition() && !t.hasSelectedText())) {
                                var r = a.getCount() > 0 ? n.indexOf(a.getLastSelected() || a.getLastFocused()) : -1;
                                i == e.BACKSPACE || i == e.DELETE ? (r > -1 ? (a.getCount() > 1 && (r = -1), t.valueStore.remove(a.getSelection())) : t.valueStore.remove(t.valueStore.last()), a.clearSelections(), t.setValue(t.valueStore.getRange()), r > 0 && a.select(r - 1), l = !0) : i == e.RIGHT || i == e.LEFT ? -1 == r && i == e.LEFT ? (a.select(n.last()), l = !0) : r > -1 && (i == e.RIGHT ? r < n.getCount() - 1 ? (a.select(r + 1, e.shiftKey), l = !0) : e.shiftKey || (a.setLastFocused(null), a.deselectAll(), l = !0) : i == e.LEFT && r > 0 && (a.select(r - 1, e.shiftKey), l = !0)) : i == e.A && e.ctrlKey && (a.selectAll(), l = e.A),
                                t.inputEl.focus()
                        }
                        if (l) return t.preventKeyUpEvent = l,
                        e.stopEvent(),
                        void 0;
                        t.isExpanded && i == e.ENTER && t.picker.highlightedItem && (t.preventKeyUpEvent = !0),
                        t.enableKeyEvents && t.callParent(arguments),
                        e.isSpecialKey() || e.hasModifier() || (t.selectionModel.setLastFocused(null), t.selectionModel.deselectAll(), t.inputEl.focus())
                }
        },
        onKeyUp: function(e, t) {
                var i = this,
                o = i.inputEl.dom.value;
                return i.preventKeyUpEvent ? (e.stopEvent(), (i.preventKeyUpEvent === !0 || e.getKey() === i.preventKeyUpEvent) && delete i.preventKeyUpEvent, void 0) : ((i.multiSelect && i.delimiterRegexp && i.delimiterRegexp.test(o) || i.createNewOnEnter === !0 && e.getKey() == e.ENTER) && (o = Ext.Array.clean(o.split(i.delimiterRegexp)), i.inputEl.dom.value = "", i.setValue(i.valueStore.getRange().concat(o)), i.inputEl.focus()), i.callParent([e, t]), void 0)
        },
        onPaste: function(e) {
                var t = this,
                i = t.inputEl.dom.value,
                o = e && e.browserEvent && e.browserEvent.clipboardData ? e.browserEvent.clipboardData: !1;
                t.multiSelect && t.delimiterRegexp && t.delimiterRegexp.test(i) && (o && o.getData && (/text\/plain/.test(o.types) ? i = o.getData("text/plain") : /text\/html/.test(o.types) && (i = o.getData("text/html"))), i = Ext.Array.clean(i.split(t.delimiterRegexp)), t.inputEl.dom.value = "", t.setValue(t.valueStore.getRange().concat(i)), t.inputEl.focus())
        },
        onExpand: function() {
                var e = this,
                t = e.listKeyNav;
                e.callParent(arguments),
                !t && e.filterPickList && (t = e.listKeyNav, t.highlightAt = function(e) {
                        var t, i = this.boundList,
                        o = i.all.item(e),
                        n = i.all.getCount();
                        if (o && o.hasCls("x-boundlist-selected")) {
                                t = 0 == e || !i.highlightedItem || i.indexOf(i.highlightedItem) < e ? 1 : -1;
                                do e += t,
                                o = i.all.item(e);
                                while (e > 0 && n > e && o.hasCls("x-boundlist-selected"));
                                if (o.hasCls("x-boundlist-selected")) return
                        }
                        o && (o = o.dom, i.highlightItem(o), i.getTargetEl().scrollChildIntoView(o, !1))
                })
        },
        onTypeAhead: function() {
                var e, t, i, o, n = this,
                a = n.displayField,
                l = n.inputEl.dom,
                r = n.valueStore,
                d = n.getPicker();
                if (n.filterPickList) {
                        var s = this.createFilterFn(a, l.value);
                        e = n.store.findBy(function(e) {
                                return - 1 === r.indexOfId(e.getId()) && s(e)
                        }),
                        e = -1 === e ? !1 : n.store.getAt(e)
                } else e = n.store.findRecord(a, l.value);
                e && (t = e.get(a), i = t.length, o = l.value.length, d.highlightItem(d.getNode(e)), 0 !== o && o !== i && (l.value = t, n.selectText(o, t.length)))
        },
        onItemListClick: function(e) {
                var t = this,
                i = e.getTarget(".x-boxselect-item"),
                o = i ? e.getTarget(".x-boxselect-item-close") : !1;
                t.readOnly || t.disabled || (e.stopPropagation(), i ? (o ? (t.removeByListItemNode(i), t.valueStore.getCount() > 0 && t.fireEvent("select", t, t.valueStore.getRange())) : t.toggleSelectionByListItemNode(i, e.shiftKey), t.inputEl.focus()) : (t.selectionModel.getCount() > 0 && (t.selectionModel.setLastFocused(null), t.selectionModel.deselectAll()), t.triggerOnClick && t.onTriggerClick()))
        },
        getMultiSelectItemMarkup: function() {
                var e = this;
                return e.multiSelectItemTpl || (e.labelTpl ? (Ext.isString(e.labelTpl) || Ext.isArray(e.labelTpl)) && (e.labelTpl = Ext.create("Ext.XTemplate", e.labelTpl)) : e.labelTpl = Ext.create("Ext.XTemplate", "{[values." + e.displayField + "]}"), e.multiSelectItemTpl = ['<tpl for=".">', '<li class="x-tab-default x-boxselect-item ', '<tpl if="this.isSelected(values.' + e.valueField + ')">', " selected", "</tpl>", '" qtip="{[typeof values === "string" ? values : values.' + e.displayField + ']}">', '<div class="x-boxselect-item-text">{[typeof values === "string" ? values : this.getItemLabel(values)]}</div>', '<div class="x-tab-close-btn x-boxselect-item-close"></div>', "</li>", "</tpl>", {
                        compile: !0,
                        disableFormats: !0,
                        isSelected: function(t) {
                                var i = e.valueStore.findExact(e.valueField, t);
                                return i >= 0 ? e.selectionModel.isSelected(e.valueStore.getAt(i)) : !1
                        },
                        getItemLabel: function(t) {
                                return e.getTpl("labelTpl").apply(t)
                        }
                }]),
                this.getTpl("multiSelectItemTpl").apply(Ext.Array.pluck(this.valueStore.getRange(), "data"))
        },
        applyMultiselectItemMarkup: function() {
                var e, t = this,
                i = t.itemList;
                if (i) {
                        for (; null != (e = t.inputElCt.prev());) e.remove();
                        t.inputElCt.insertHtml("beforeBegin", t.getMultiSelectItemMarkup())
                }
                Ext.Function.defer(function() {
                        t.picker && t.isExpanded && t.alignPicker(),
                        t.hasFocus && t.inputElCt.scrollIntoView(t.listWrapper)
                },
                15)
        },
        getRecordByListItemNode: function(e) {
                for (var t = this,
                i = 0,
                o = t.itemList.dom.firstChild; o && o.nextSibling && o != e;) i++,
                o = o.nextSibling;
                return i = o == e ? i: !1,
                i === !1 ? !1 : t.valueStore.getAt(i)
        },
        toggleSelectionByListItemNode: function(e, t) {
                var i = this,
                o = i.getRecordByListItemNode(e),
                n = i.selectionModel;
                o && (n.isSelected(o) ? (n.isFocused(o) && n.setLastFocused(null), n.deselect(o)) : n.select(o, t))
        },
        removeByListItemNode: function(e) {
                var t = this,
                i = t.getRecordByListItemNode(e);
                i && (t.valueStore.remove(i), t.setValue(t.valueStore.getRange()))
        },
        getRawValue: function() {
                var e, t = this,
                i = t.inputEl;
                return t.inputEl = !1,
                e = t.callParent(arguments),
                t.inputEl = i,
                e
        },
        setRawValue: function(e) {
                var t, i = this,
                o = i.inputEl;
                return i.inputEl = !1,
                t = i.callParent([e]),
                i.inputEl = o,
                t
        },
        addValue: function(e) {
                var t = this;
                e && t.setValue(Ext.Array.merge(t.value, Ext.Array.from(e)))
        },
        removeValue: function(e) {
                var t = this;
                e && t.setValue(Ext.Array.difference(t.value, Ext.Array.from(e)))
        },
        setValue: function(e, t, i) {
                var o, n, a, l, r = this,
                d = r.valueStore,
                s = r.valueField,
                u = [];
                for (Ext.isEmpty(e) && (e = null), Ext.isString(e) && r.multiSelect && (e = e.split(r.delimiter)), e = Ext.Array.from(e, !0), a = 0, n = e.length; n > a; a++) o = e[a],
                o && o.isModel || (l = d.findExact(s, o), l >= 0 ? e[a] = d.getAt(l) : (l = r.findRecord(s, o), l || (r.forceSelection ? u.push(o) : (l = {},
                l[r.valueField] = o, l[r.displayField] = o, l = new r.valueStore.model(l))), l && (e[a] = l)));
                if (i !== !0 && u.length > 0 && "remote" === r.queryMode) {
                        var c = {};
                        return c[r.valueField] = u.join(r.delimiter),
                        r.store.load({
                                params: c,
                                callback: function() {
                                        r.itemList && r.itemList.unmask(),
                                        r.setValue(e, t, !0),
                                        r.autoSize()
                                }
                        }),
                        !1
                }
                if (!r.multiSelect && e.length > 0) {
                        for (a = e.length - 1; a >= 0; a--) if (e[a].isModel) {
                                e = e[a];
                                break
                        }
                        Ext.isArray(e) && (e = e[e.length - 1])
                }
                return r.callParent([e, t])
        },
        getValueRecords: function() {
                return this.valueStore.getRange()
        },
        getSubmitData: function() {
                var e = this,
                t = e.callParent(arguments);
                return e.multiSelect && e.encodeSubmitValue && t && t[e.name] && (t[e.name] = Ext.encode(t[e.name])),
                t
        },
        mimicBlur: function() {
                var e = this;
                e.selectOnTab && e.picker && e.picker.highlightedItem && (e.inputEl.dom.value = ""),
                e.callParent(arguments)
        },
        assertValue: function() {
                var e = this,
                t = e.inputEl.dom.value,
                i = Ext.isEmpty(t) ? !1 : e.findRecordByDisplay(t),
                o = !1;
                i || e.forceSelection || !e.createNewOnBlur || Ext.isEmpty(t) ? i && (o = i) : o = t,
                o && e.addValue(o),
                e.inputEl.dom.value = "",
                e.collapse()
        },
        checkChange: function() {
                if (!this.suspendCheckChange && !this.isDestroyed) {
                        var e = this,
                        t = e.valueStore,
                        i = e.lastValue,
                        o = e.valueField,
                        n = Ext.Array.map(Ext.Array.from(e.value),
                        function(e) {
                                return e.isModel ? e.get(o) : e
                        },
                        this).join(this.delimiter),
                        a = e.isEqual(n, i); (!a || n.length > 0 && t.getCount() < n.length) && (t.suspendEvents(), t.removeAll(), Ext.isArray(e.valueModels) && t.add(e.valueModels), t.resumeEvents(), t.fireEvent("datachanged", t), a || (e.lastValue = n, e.fireEvent("change", e, n, i), e.onChange(n, i)))
                }
        },
        isEqual: function(e, t) {
                var i, o, n, a, l = Ext.Array.from,
                r = this.valueField;
                if (e = l(e), t = l(t), o = e.length, o !== t.length) return ! 1;
                for (i = 0; o > i; i++) if (n = e[i].isModel ? e[i].get(r) : e[i], a = t[i].isModel ? t[i].get(r) : t[i], n !== a) return ! 1;
                return ! 0
        },
        applyEmptyText: function() {
                var e, t, i = this,
                o = i.emptyText;
                i.rendered && o && (t = Ext.isEmpty(i.value) && !i.hasFocus, e = i.inputEl, t ? (e.dom.value = o, e.addCls(i.emptyCls), i.listWrapper.addCls(i.emptyCls)) : (e.dom.value === o && (e.dom.value = ""), i.listWrapper.removeCls(i.emptyCls), e.removeCls(i.emptyCls)), i.autoSize())
        },
        preFocus: function() {
                var e, t = this,
                i = t.inputEl,
                o = t.emptyText;
                o && i.dom.value === o && (i.dom.value = "", e = !0, i.removeCls(t.emptyCls), t.listWrapper.removeCls(t.emptyCls)),
                (t.selectOnFocus || e) && i.dom.select()
        },
        onFocus: function() {
                var e = this,
                t = e.focusCls,
                i = e.itemList;
                t && i && i.addCls(t),
                e.callParent(arguments)
        },
        onBlur: function() {
                var e = this,
                t = e.focusCls,
                i = e.itemList;
                t && i && i.removeCls(t),
                e.callParent(arguments)
        },
        renderActiveError: function() {
                var e = this,
                t = e.invalidCls,
                i = e.itemList,
                o = e.hasActiveError();
                t && i && i[o ? "addCls": "removeCls"](e.invalidCls + "-field"),
                e.callParent(arguments)
        },
        autoSize: function() {
                var e = this;
                return e.grow && e.rendered && (e.autoSizing = !0, e.updateLayout()),
                e
        },
        afterComponentLayout: function() {
                var e = this;
                e.autoSizing && (height = e.getHeight(), height !== e.lastInputHeight && (e.isExpanded && e.alignPicker(), e.fireEvent("autosize", e, height), e.lastInputHeight = height, delete e.autoSizing))
        }
}),
Ext.define("Ext.ux.layout.component.field.BoxSelectField", {
        alias: ["layout.boxselectfield"],
        extend: "Ext.layout.component.field.Trigger",
        type: "boxselectfield",
        waitForOuterWidthInDom: !0,
        beginLayout: function(e) {
                var t = this,
                i = t.owner;
                t.callParent(arguments),
                e.inputElCtContext = e.getEl("inputElCt"),
                i.inputElCt.setStyle("width", ""),
                t.skipInputGrowth = !i.grow || !i.multiSelect
        },
        beginLayoutFixed: function(e) {
                var t = this,
                i = e.target;
                i.triggerEl.setStyle("height", "24px"),
                t.callParent(arguments),
                e.heightModel.fixed && e.lastBox && (i.listWrapper.setStyle("height", e.lastBox.height + "px"), i.itemList.setStyle("height", "100%"))
        },
        publishInnerWidth: function(e) {
                var t = this,
                i = t.owner,
                o = i.itemList.getWidth(!0) - 10,
                n = i.inputElCt.prev(null, !0);
                n && !i.stacked && (n = Ext.fly(n), o = o - n.getOffsetsTo(n.up(""))[0] - n.getWidth()),
                !t.skipInputGrowth && 35 > o ? o -= 10 : 1 > o && (o = 1),
                e.inputElCtContext.setWidth(o)
        }
}),
Ext.define("Jfok.lib.ButtonTransparent", {
        extend: "Ext.button.Button",
        alias: "widget.buttontransparent",
        initComponent: function() {
                Ext.isIE || "neptune" !== Ext.themeName || (this.listeners = {
                        mouseout: function() {
                                this.setTransparent(document.getElementById(this.id))
                        },
                        mouseover: function() {
                                var e = document.getElementById(this.id);
                                e.style.backgroundImage = "",
                                e.style.backgroundColor = "",
                                e.style.borderColor = ""
                        },
                        afterrender: function() {
                                this.setTransparent(document.getElementById(this.id))
                        }
                }),
                this.callParent(arguments)
        },
        setTransparent: function(e) {
                e.style.backgroundImage = "inherit",
                e.style.backgroundColor = "inherit",
                e.style.borderColor = "transparent"
        }
}),
Ext.define("Jfok.lib.CheckTreePanel", {
        extend: "Ext.tree.Panel",
        alias: "widget.checktreepanel",
        initComponent: function() {
                this.listeners = {
                        scope: this,
                        checkchange: function(e, t) {
                                setChildChecked(e, t),
                                setParentChecked(e, t);
                                var i = this.down("toolbar button#save");
                                i && i.enable()
                        }
                },
                this.callParent(arguments)
        }
}),
Ext.define("Jfok.lib.GridPicker", {
        extend: "Ext.form.field.Picker",
        alias: "widget.gridPicker",
        displayField: null,
        valueField: null,
        matchFieldWidth: !1,
        store: new Ext.data.Store({
                fields: [{
                        name: "name"
                }],
                data: [{
                        name: "aa"
                },
                {
                        name: "bb"
                }],
                proxy: {
                        type: "memory"
                }
        }),
        columns: [{
                text: "aa",
                dataIndex: "name"
        }],
        pickerWidth: 400,
        pickerHeight: 300,
        editable: !1,
        createPicker: function() {
                var e = this,
                t = e.createComponent();
                return t.on("itemclick", e.onItemClick, e),
                e.on("focus", e.onFocusHandler, e),
                t
        },
        createComponent: function() {
                var e = this,
                t = Jfok.modules.getModule("_Department").getModulePanel("tabItemId");
                return console.log(t),
                console.log(t.el),
                t.setWidth(300),
                t.setHeight(400),
                t.show(),
                picker1 = Ext.create("Ext.grid.Panel", {
                        floating: !0,
                        store: e.store,
                        columns: e.columns,
                        width: e.pickerWidth,
                        height: e.pickerHeight,
                        dockedItems: [{
                                xtype: "pagingtoolbar",
                                store: e.store,
                                dock: "bottom",
                                displayInfo: !0
                        }]
                }),
                console.log(t),
                console.log(t.el),
                t
        },
        onItemClick: function(e, t) {
                var i = this;
                i.setValue(t.get(i.valueField)),
                i.getPicker().hide(),
                i.inputEl.focus()
        },
        onFocusHandler: function() {
                var e = this;
                e.isExpanded || (this.expand(), this.focus())
        },
        setValue: function(e) {
                var t, i = this;
                return i.value = e,
                i.store.isLoading() ? i: void 0 === e ? i: (t = i.getPicker().getSelectionModel().getSelection()[0], i.setRawValue(t ? t.get(i.displayField) : ""), i)
        },
        getValue: function() {
                return this.value
        },
        getSubmitValue: function() {
                return this.value
        }
}),
Ext.define("Jfok.lib.GridPrinter", {
        requires: "Ext.XTemplate",
        statics: {
                print: function(e, t) {
                        var i = [],
                        o = e.store.isGrouped();
                        if (o) var n = this.getFeature(e, t),
                        a = n.getGroupField();
                        var l = e.lockedGrid.getView().headerCt.items.items;
                        l = l.concat(e.normalGrid.getView().headerCt.items.items),
                        Ext.each(l,
                        function(e) {
                                e.items.length > 0 ? Ext.each(e.items.items,
                                function(e) {
                                        e.hidden || i.push(e)
                                }) : e.hidden || i.push(e)
                        });
                        var r = [];
                        e.store.data.each(function(t, o) {
                                var n = {};
                                for (var a in t.data) {
                                        var l = t.data[a],
                                        d = !1;
                                        if (Ext.each(i,
                                        function(i, r) {
                                                if (i && i.dataIndex == a) {
                                                        var s = {
                                                                item: "",
                                                                tdAttr: "",
                                                                style: ""
                                                        };
                                                        l = i.renderer ? i.renderer.call(e, l, s, t, o, r, e.store, e.view) : l;
                                                        var u = Ext.String.createVarName(i.dataIndex);
                                                        n[u] = l,
                                                        d = !0
                                                } else if (i && "rownumberer" === i.xtype) {
                                                        var u = Ext.String.createVarName(i.id);
                                                        n[u] = o + 1,
                                                        d = !0
                                                } else if (i && "templatecolumn" === i.xtype) {
                                                        l = i.tpl ? i.tpl.apply(t.data) : l;
                                                        var u = Ext.String.createVarName(i.id);
                                                        n[u] = l,
                                                        d = !0
                                                }
                                        },
                                        this), !d) {
                                                var s = Ext.String.createVarName(a);
                                                n[s] = l
                                        }
                                }
                                r.push(n)
                        });
                        var d = [];
                        Ext.each(i,
                        function(e) {
                                e && (Ext.isEmpty(e.dataIndex) || e.hidden || o ? "rownumberer" === e.xtype ? (e.text = "Row", d.push(e)) : "templatecolumn" === e.xtype ? d.push(e) : o && e.dataIndex !== a && d.push(e) : d.push(e))
                        }),
                        i = d,
                        null === this.stylesheetPath && (this.stylesheetPath = "styles/gridprint.css");
                        var s = Ext.create("Ext.XTemplate", this.headerTpl).apply(i),
                        u = this.generateBody(e, i, n),
                        c = "",
                        m = [];
                        Ext.each(e.plugins,
                        function(e) {
                                "rowexpander" == e.ptype && (c += e.rowBodyTpl.html)
                        }),
                        "" != c && (m = ['<tr class="{[xindex % 2 === 0 ? "even" : "odd"]}"><td colspan="' + i.length + '">', c, "</td></tr>"]);
                        var f = e.title || this.defaultGridTitle,
                        h = ['<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">', '<html class="' + Ext.baseCSSPrefix + 'ux-grid-printer">', "<head>", '<meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />', '<link href="' + this.stylesheetPath + '" rel="stylesheet" type="text/css" />', "<title>" + f + "</title>", "</head>", '<body class="' + Ext.baseCSSPrefix + 'ux-grid-printer-body">', '<div class="buttons">', '<div class="' + Ext.baseCSSPrefix + "ux-grid-printer-noprint " + Ext.baseCSSPrefix + 'ux-grid-printer-links">', '<a class="' + Ext.baseCSSPrefix + 'ux-grid-printer-linkprint" href="javascript:void(0);" onclick="window.print();">' + this.printLinkText + "</a>", '<a class="' + Ext.baseCSSPrefix + 'ux-grid-printer-linkclose" href="javascript:void(0);" onclick="window.close();">' + this.closeLinkText + "</a>", "<hr/></div>", "</div>", '<div class="title">' + this.mainTitle + "</div>", "<table>", "<tr>", s, "</tr>", '<tpl for=".">', '<tr class="{[xindex % 2 === 0 ? "even" : "odd"]}">', u, "</tr>", m.join(""), "{% if (this.isGrouped && xindex > 1) break; %}", "</tpl>", "</table>", "</body>", "</html>", {
                                isGrouped: o
                        }],
                        p = Ext.create("Ext.XTemplate", h).apply(r),
                        g = window.open("", "printgrid");
                        g.document.open(),
                        g.document.write(p),
                        g.document.close(),
                        this.printAutomatically && g.print(),
                        this.closeAutomaticallyAfterPrint && (Ext.isIE ? window.close() : g.close())
                },
                getFeature: function(e, t) {
                        var i, o = e.getView();
                        if (t) i = o.getFeature(t);
                        else {
                                var n = o.features;
                                if (n.length > 1) return alert("More than one feature requires to pass featureId as parameter to 'print'."),
                                void 0;
                                i = n[0]
                        }
                        return i
                },
                generateBody: function(e, t, i) {
                        var o, n, a = e.store.getGroups(),
                        l = (e.store.groupers, e.store.getProxy().getModel().getFields()),
                        r = !0;
                        if (e.store.isGrouped()) {
                                if (r = i.hideGroupedHeader, o = i.getGroupField(), !i || !l || !o) return;
                                if (r) {
                                        var d = function(e) {
                                                return e.name != o
                                        };
                                        l = l.filter(d)
                                }
                                var s = ['<tpl for=".">', '<tr class="group-header">', '<td colspan="{[this.colSpan]}"> {[this.headerPrefix]}{name} &nbsp; {[this.postfixWithParens ? "(" : ""]} {[this.childCount(values.children)]}  {[this.childCount(values.children) > 1 ? this.headerPostfixPlural : this.headerPostfixSingular ]}  {[this.postfixWithParens ? ")" : ""]} </td>', " </tr>", '<tpl for="children">', "<tr>", '<tpl for="this.fields">', '{% if (values.name==="id") continue; %}', "<td>", "{[ parent.get(values.name) ]}", "</td>", "</tpl>", "</tr>", "</tpl>", "</tpl>", {
                                        hideGroupField: r,
                                        headerPrefix: this.groupHeaderPrefix,
                                        headerPostfixSingular: this.groupHeaderPostfixSingular,
                                        headerPostfixPlural: this.groupHeaderPostfixPlural,
                                        postfixWithParens: !1,
                                        fields: l,
                                        colSpan: l.length - 1,
                                        childCount: function(e) {
                                                return e.length
                                        }
                                }];
                                n = Ext.create("Ext.XTemplate", s).apply(a)
                        } else n = Ext.create("Ext.XTemplate", this.bodyTpl).apply(t);
                        return n
                },
                stylesheetPath: null,
                printAutomatically: !1,
                closeAutomaticallyAfterPrint: !1,
                mainTitle: "",
                defaultGridTitle: "Print View",
                printLinkText: "\u6253\u5370",
                closeLinkText: "\u5173\u95ed",
                groupHeaderPrefix: "",
                groupHeaderPostfixSingular: "",
                groupHeaderPostfixPlural: "",
                headerTpl: ['<tpl for=".">', "<th>{text}</th>", "</tpl>"],
                bodyTpl: ['<tpl for=".">', '<tpl if="values.dataIndex">', "<td>{{[Ext.String.createVarName(values.dataIndex)]}}</td>", "<tpl else>", "<td>{{[Ext.String.createVarName(values.id)]}}</td>", "</tpl>", "</tpl>"]
        }
}),
Ext.define("Jfok.lib.MoneyField", {
        extend: "Ext.form.field.Text",
        alias: "widget.moneyfield",
        allowDecimals: !0,
        decimalSeparator: ".",
        decimalPrecision: 2,
        separator: ",",
        fieldStyle: "text-align:right",
        allowNegative: !0,
        minValue: -9999999999,
        maxValue: 9999999999,
        minText: "\u91d1\u989d\u6700\u5c0f\u4e0d\u80fd\u4f4e\u4e8e-100\u4ebf\uff01",
        maxText: "\u91d1\u989d\u6700\u5927\u4e0d\u80fd\u8d85\u8fc7100\u4ebf\uff01",
        nanText: "{0} \u4e0d\u662f\u4e00\u4e2a\u6709\u6548\u7684\u6570\u5b57\u3002",
        baseChars: "0123456789",
        hideTrigger: !0,
        percent: !1,
        enableKeyEvents: !0,
        listeners: {
                keydown: function(e, t) {
                        if (t.getKey() == Ext.EventObject.ENTER) {
                                var i = e.nextSibling("field[readOnly=false]");
                                return i && i.focus(),
                                !1
                        }
                }
        },
        initEvents: function() {
                var e = this.baseChars + "" + this.separator;
                this.allowDecimals && (e += this.decimalSeparator),
                this.allowNegative && (e += "-"),
                this.maskRe = new RegExp("[" + Ext.escapeRe(e) + "]"),
                this.callParent(arguments)
        },
        getErrors: function(e) {
                var t = this.callParent(arguments);
                if (e = e || this.getRawValue(), e.length < 1) return t;
                e = String(e).replace(this.decimalSeparator, ".").replace("%", "").replace(/,/g, ""),
                isNaN(e) && t.push(String.format(this.nanText, e));
                var i = this.parseValue(e);
                return i < this.minValue && t.push(String.format(this.minText, this.minValue)),
                i > this.maxValue && t.push(String.format(this.maxText, this.maxValue)),
                t
        },
        getValue: function() {
                return this.fixPrecision(this.parseValue(this.callParent()))
        },
        setValue: function(e) {
                return e = Ext.isNumber(e) ? e: parseFloat(String(e).replace(this.decimalSeparator, ".").replace(/,/g, "")),
                e = isNaN(e) ? "": String(e).replace(".", this.decimalSeparator),
                e = this.setmoney(e, ","),
                this.callParent(arguments)
        },
        setMinValue: function(e) {
                this.minValue = Ext.num(e, Number.NEGATIVE_INFINITY)
        },
        setMaxValue: function(e) {
                this.maxValue = Ext.num(e, Number.MAX_VALUE)
        },
        parseValue: function(e) {
                return e = parseFloat(String(e).replace(this.decimalSeparator, ".").replace("%", "").replace(/,/g, "")),
                isNaN(e) ? "": e
        },
        preFocus1: function() {
                var e = this.el;
                this.setRawValue(this.removeDecoration(this.getRawValue())),
                this.callParent(this),
                this.selectOnFocus && e.dom.select()
        },
        fixPrecision: function(e) {
                var t = isNaN(e);
                return this.allowDecimals && -1 != this.decimalPrecision && !t && e ? parseFloat(parseFloat(e).toFixed(this.decimalPrecision)) : t ? "": e
        },
        beforeBlur: function() {
                var e = this.parseValue(this.getRawValue());
                Ext.isEmpty(e) || this.setValue(this.fixPrecision(e))
        },
        removeDecoration: function(e) {
                return e && (re = new RegExp("[^0-9\\-\\" + this.decimalSeparator + "]", "g"), e = String(e).replace(re, "")),
                e
        },
        setmoney: function(e, t) {
                t = void 0 === t ? ",": t,
                e = Math.round(100 * (e - 0)) / 100,
                e = e == Math.floor(e) ? e + ".00": 10 * e == Math.floor(10 * e) ? e + "0": e,
                e = String(e);
                for (var i = e.split("."), o = i[0], n = i[1] ? "." + i[1] : ".00", a = /(\d+)(\d{3})/; a.test(o);) o = o.replace(a, "$1" + t + "$2");
                return e = o + n,
                "-" == e.charAt(0) ? "-" + e.substr(1) + (this.percent ? " %": "") : ("0.00" == e && (e = ""), this.percent && e && (e += " %"), e)
        }
}),
Ext.define("Ext.form.MoneyDisplayField", {
        extend: "Ext.form.TextField",
        alias: "widget.moneydisplayfield",
        validationEvent: !1,
        validateOnBlur: !1,
        defaultAutoCreate: {
                tag: "div"
        },
        fieldClass: "x-form-display-field",
        htmlEncode: !1,
        style: "text-align:right",
        width: "100%",
        initEvents: Ext.emptyFn,
        isValid: function() {
                return ! 0
        },
        validate: function() {
                return ! 0
        },
        getRawValue: function() {
                var e = this.rendered ? this.el.dom.innerHTML: Ext.value(this.value, "");
                return e === this.emptyText && (e = ""),
                this.htmlEncode && (e = Ext.util.Format.htmlDecode(e)),
                e
        },
        getValue: function() {
                return this.getRawValue()
        },
        getName: function() {
                return this.name
        },
        setRawValue: function(e) {
                return this.htmlEncode && (e = Ext.util.Format.htmlEncode(e)),
                e = this.setmoney(e),
                this.rendered ? this.el.dom.innerHTML = Ext.isEmpty(e) ? "": e: this.value = e
        },
        setValue: function(e) {
                return this.setRawValue(e),
                this
        },
        setmoney: function(e, t) {
                if (t = void 0 === t ? ",": t, "string" == typeof e) e = parseFloat(e.replace(/,/g, ""));
                else if ("number" != typeof e) return e;
                if (!e) return "";
                e = Math.round(100 * (e - 0)) / 100,
                e = e == Math.floor(e) ? e + ".00": 10 * e == Math.floor(10 * e) ? e + "0": e,
                e = String(e);
                for (var i = e.split("."), o = i[0], n = i[1] ? "." + i[1] : ".00", a = /(\d+)(\d{3})/; a.test(o);) o = o.replace(a, "$1" + t + "$2");
                return e = o + n,
                "-" == e.charAt(0) ? "-" + e.substr(1) : ("0.00" == e && (e = ""), e)
        }
}),
Ext.define("Jfok.lib.Notification", {
        extend: "Ext.window.Window",
        alias: "widget.uxNotification",
        cls: "ux-notification-window",
        autoClose: !0,
        autoHeight: !0,
        plain: !1,
        draggable: !1,
        shadow: !1,
        shadowOffset: 20,
        focus: Ext.emptyFn,
        manager: null,
        useXAxis: !1,
        position: "br",
        spacing: 6,
        paddingX: 60,
        paddingY: 60,
        slideInAnimation: "easeIn",
        slideBackAnimation: "bounceOut",
        slideInDuration: 1500,
        slideBackDuration: 1e3,
        hideDuration: 500,
        autoCloseDelay: 7e3,
        stickOnClick: !0,
        stickWhileHover: !0,
        isHiding: !1,
        readyToHide: !1,
        destroyAfterHide: !1,
        closeOnMouseOut: !1,
        xPos: 0,
        yPos: 0,
        statics: {
                defaultManager: {
                        el: null
                }
        },
        initComponent: function() {
                var e = this;
                Ext.isDefined(e.corner) && (e.position = e.corner),
                Ext.isDefined(e.slideDownAnimation) && (e.slideBackAnimation = e.slideDownAnimation),
                Ext.isDefined(e.autoDestroyDelay) && (e.autoCloseDelay = e.autoDestroyDelay),
                Ext.isDefined(e.autoHideDelay) && (e.autoCloseDelay = e.autoHideDelay),
                Ext.isDefined(e.autoHide) && (e.autoClose = e.autoHide),
                Ext.isDefined(e.slideInDelay) && (e.slideInDuration = e.slideInDelay),
                Ext.isDefined(e.slideDownDelay) && (e.slideBackDuration = e.slideDownDelay),
                Ext.isDefined(e.fadeDelay) && (e.hideDuration = e.fadeDelay),
                e.position = e.position.replace(/c/, ""),
                e.updateAlignment(e.position),
                e.setManager(e.manager),
                e.callParent(arguments)
        },
        onRender: function() {
                var e = this;
                e.el.hover(function() {
                        e.mouseIsOver = !0
                },
                function() {
                        e.mouseIsOver = !1,
                        e.closeOnMouseOut && (e.closeOnMouseOut = !1, e.close())
                },
                e),
                this.callParent(arguments)
        },
        updateAlignment: function(e) {
                var t = this;
                switch (e) {
                case "br":
                        t.paddingFactorX = -1,
                        t.paddingFactorY = -1,
                        t.siblingAlignment = "br-br",
                        t.managerAlignment = t.useXAxis ? "bl-br": "tr-br";
                        break;
                case "bl":
                        t.paddingFactorX = 1,
                        t.paddingFactorY = -1,
                        t.siblingAlignment = "bl-bl",
                        t.managerAlignment = t.useXAxis ? "br-bl": "tl-bl";
                        break;
                case "tr":
                        t.paddingFactorX = -1,
                        t.paddingFactorY = 1,
                        t.siblingAlignment = "tr-tr",
                        t.managerAlignment = t.useXAxis ? "tl-tr": "br-tr";
                        break;
                case "tl":
                        t.paddingFactorX = 1,
                        t.paddingFactorY = 1,
                        t.siblingAlignment = "tl-tl",
                        t.managerAlignment = t.useXAxis ? "tr-tl": "bl-tl";
                        break;
                case "b":
                        t.paddingFactorX = 0,
                        t.paddingFactorY = -1,
                        t.siblingAlignment = "b-b",
                        t.useXAxis = 0,
                        t.managerAlignment = "t-b";
                        break;
                case "t":
                        t.paddingFactorX = 0,
                        t.paddingFactorY = 1,
                        t.siblingAlignment = "t-t",
                        t.useXAxis = 0,
                        t.managerAlignment = "b-t";
                        break;
                case "l":
                        t.paddingFactorX = 1,
                        t.paddingFactorY = 0,
                        t.siblingAlignment = "l-l",
                        t.useXAxis = 1,
                        t.managerAlignment = "r-l";
                        break;
                case "r":
                        t.paddingFactorX = -1,
                        t.paddingFactorY = 0,
                        t.siblingAlignment = "r-r",
                        t.useXAxis = 1,
                        t.managerAlignment = "l-r"
                }
        },
        getXposAlignedToManager: function() {
                var e = this,
                t = 0;
                if (e.manager && e.manager.el && e.manager.el.dom) {
                        if (!e.useXAxis) return e.el.getLeft();
                        "br" == e.position || "tr" == e.position || "r" == e.position ? (t += e.manager.el.getAnchorXY("r")[0], t -= e.el.getWidth() + e.paddingX) : (t += e.manager.el.getAnchorXY("l")[0], t += e.paddingX)
                }
                return t
        },
        getYposAlignedToManager: function() {
                var e = this,
                t = 0;
                if (e.manager && e.manager.el && e.manager.el.dom) {
                        if (e.useXAxis) return e.el.getTop();
                        "br" == e.position || "bl" == e.position || "b" == e.position ? (t += e.manager.el.getAnchorXY("b")[1], t -= e.el.getHeight() + e.paddingY) : (t += e.manager.el.getAnchorXY("t")[1], t += e.paddingY)
                }
                return t
        },
        getXposAlignedToSibling: function(e) {
                var t = this;
                return t.useXAxis ? "tl" == t.position || "bl" == t.position || "l" == t.position ? e.xPos + e.el.getWidth() + e.spacing: e.xPos - t.el.getWidth() - t.spacing: t.el.getLeft()
        },
        getYposAlignedToSibling: function(e) {
                var t = this;
                return t.useXAxis ? t.el.getTop() : "tr" == t.position || "tl" == t.position || "t" == t.position ? e.yPos + e.el.getHeight() + e.spacing: e.yPos - t.el.getHeight() - e.spacing
        },
        getNotifications: function(e) {
                var t = this;
                return t.manager.notifications[e] || (t.manager.notifications[e] = []),
                t.manager.notifications[e]
        },
        setManager: function(e) {
                var t = this;
                t.manager = e,
                "string" == typeof t.manager && (t.manager = Ext.getCmp(t.manager)),
                t.manager || (t.manager = t.statics().defaultManager, t.manager.el || (t.manager.el = Ext.getBody())),
                "undefined" == typeof t.manager.notifications && (t.manager.notifications = {})
        },
        beforeShow: function() {
                var e = this;
                e.stickOnClick && e.body && e.body.dom && Ext.fly(e.body.dom).on("click",
                function() {
                        e.cancelAutoClose(),
                        e.addCls("notification-fixed")
                },
                e),
                e.autoClose && (e.task = new Ext.util.DelayedTask(e.doAutoClose, e), e.task.delay(e.autoCloseDelay)),
                e.el.setX( - 1e4),
                e.el.setOpacity(1)
        },
        afterShow: function() {
                var e = this,
                t = e.getNotifications(e.managerAlignment);
                t.length ? (e.el.alignTo(t[t.length - 1].el, e.siblingAlignment, [0, 0]), e.xPos = e.getXposAlignedToSibling(t[t.length - 1]), e.yPos = e.getYposAlignedToSibling(t[t.length - 1])) : (e.el.alignTo(e.manager.el, e.managerAlignment, [e.paddingX * e.paddingFactorX, e.paddingY * e.paddingFactorY], !1), e.xPos = e.getXposAlignedToManager(), e.yPos = e.getYposAlignedToManager()),
                Ext.Array.include(t, e),
                e.el.animate({
                        to: {
                                x: e.xPos,
                                y: e.yPos,
                                opacity: 1
                        },
                        easing: e.slideInAnimation,
                        duration: e.slideInDuration,
                        dynamic: !0
                }),
                this.callParent(arguments)
        },
        slideBack: function() {
                var e = this,
                t = e.getNotifications(e.managerAlignment),
                i = Ext.Array.indexOf(t, e); ! e.isHiding && e.el && e.manager && e.manager.el && e.manager.el.dom && e.manager.el.isVisible() && (i ? (e.xPos = e.getXposAlignedToSibling(t[i - 1]), e.yPos = e.getYposAlignedToSibling(t[i - 1])) : (e.xPos = e.getXposAlignedToManager(), e.yPos = e.getYposAlignedToManager()), e.stopAnimation(), e.el.animate({
                        to: {
                                x: e.xPos,
                                y: e.yPos
                        },
                        easing: e.slideBackAnimation,
                        duration: e.slideBackDuration,
                        dynamic: !0
                }))
        },
        cancelAutoClose: function() {
                var e = this;
                e.autoClose && e.task.cancel()
        },
        doAutoClose: function() {
                var e = this;
                e.stickWhileHover && e.mouseIsOver ? e.closeOnMouseOut = !0 : e.close()
        },
        removeFromManager: function() {
                var e = this;
                if (e.manager) {
                        var t = e.getNotifications(e.managerAlignment),
                        i = Ext.Array.indexOf(t, e);
                        if ( - 1 != i) for (Ext.Array.erase(t, i, 1); i < t.length; i++) t[i].slideBack()
                }
        },
        hide: function() {
                var e = this; ! e.isHiding && e.el && (e.isHiding = !0, e.cancelAutoClose(), e.stopAnimation(), e.el.animate({
                        to: {
                                opacity: 0
                        },
                        easing: "easeIn",
                        duration: e.hideDuration,
                        dynamic: !1,
                        listeners: {
                                afteranimate: function() {
                                        e.removeFromManager(),
                                        e.readyToHide = !0,
                                        e.hide(e.animateTarget, e.doClose, e)
                                }
                        }
                })),
                e.readyToHide && (e.isHiding = !1, e.readyToHide = !1, e.removeCls("notification-fixed"), e.callParent(arguments), e.destroyAfterHide && e.destroy())
        },
        destroy: function() {
                var e = this;
                e.hidden ? e.callParent(arguments) : (e.destroyAfterHide = !0, e.hide(e.animateTarget, e.doClose, e))
        }
}),
Ext.define("Jfok.lib.ToggleSlide", {
        extend: "Ext.Component",
        alias: "widget.toggleslide",
        duration: 120,
        onText: "ON",
        offText: "OFF",
        resizeHandle: !0,
        resizeContainer: !0,
        onLabelCls: "x-toggle-slide-label-on",
        offLabelCls: "x-toggle-slide-label-off",
        handleCls: "x-toggle-slide-thumb",
        disabledCls: "x-toggle-slide-disabled",
        state: !1,
        booleanMode: !0,
        dragging: !1,
        diff: 0,
        diff2: 0,
        diff3: 0,
        frame: !1,
        renderTpl: ['<div class="holder">', '<label class="{onLabelCls}">', "<span>{onText}</span>", "</label>", '<label class="{offLabelCls}">', "<span>{offText}</span>", "</label>", "</div>"],
        autoEl: {
                tag: "div",
                cls: "x-toggle-slide-container"
        },
        initComponent: function() {
                var e = this;
                e.callParent(arguments),
                e.addEvents("beforechange", "change")
        },
        beforeRender: function() {
                var e = this;
                e.callParent(),
                Ext.applyIf(e.renderData, {
                        offLabelCls: e.offLabelCls,
                        offText: e.offText,
                        onLabelCls: e.onLabelCls,
                        onText: e.onText,
                        handleCls: e.handleCls
                })
        },
        onRender: function() {
                var e = this;
                e.resizeContainer || (e.diff = 0),
                e.resizeHandle || (e.diff2 = 3, e.diff3 = 5),
                e.callParent(arguments),
                e.cls && e.el.addCls(e.cls),
                e.thumb = new Ext.ux.toggleslide.Thumb({
                        ownerCt: e,
                        slider: e,
                        disabled: !!e.disabled
                });
                var t = e.el.first();
                e.onLabel = t.first(),
                e.onSpan = e.onLabel.first(),
                e.offLabel = e.onLabel.next(),
                e.offSpan = e.offLabel.first(),
                e.rendered && e.thumb.render(),
                e.handle = e.thumb.el,
                e.resizeHandle ? e.thumb.bringToFront() : e.thumb.sendToBack(),
                e.resize(),
                e.disableTextSelection(),
                e.disabled ? Jfok.lib.ToggleSlide.superclass.disable.call(e) : e.registerToggleListeners()
        },
        resize: function() {
                var e = this,
                t = e.el,
                i = e.offLabel,
                o = e.onLabel,
                n = e.handle;
                if (e.resizeHandle) {
                        var a = o.getWidth() < i.getWidth() ? o.getWidth() : i.getWidth();
                        n.setWidth(a)
                }
                if (e.resizeContainer) {
                        var l = o.getWidth() > i.getWidth() ? o.getWidth() : i.getWidth(),
                        r = Math.ceil(t.getHeight() / 3);
                        t.setWidth(l + n.getWidth() + r)
                }
                var d = n.getWidth() / 2;
                o.setWidth(t.getWidth() - d + e.diff2),
                i.setWidth(t.getWidth() - d + e.diff2);
                var s = e.rightside = t.getWidth() - n.getWidth() - e.diff;
                e.state ? n.setLeft(s) : n.setLeft(0),
                e.onDrag()
        },
        disableTextSelection: function() {
                var e = [this.el, this.onLabel, this.offLabel, this.handle];
                Ext.each(e,
                function(e) {
                        e.on("mousedown",
                        function(e) {
                                return e.preventDefault(),
                                !1
                        }),
                        Ext.isIE && e.on("startselect",
                        function(e) {
                                return e.stopEvent(),
                                !1
                        })
                })
        },
        moveHandle: function(e, t) {
                var i = this,
                o = new Ext.util.TaskRunner,
                n = e ? i.rightside: 0;
                Ext.create("Ext.fx.Anim", {
                        target: i.handle,
                        dynamic: !0,
                        easing: "easeOut",
                        duration: i.duration,
                        to: {
                                left: n
                        },
                        listeners: {
                                beforeanimate: {
                                        fn: function() {
                                                i.task = o.newTask({
                                                        run: function() {
                                                                i.onDrag()
                                                        },
                                                        interval: 10
                                                }),
                                                i.task.start()
                                        },
                                        scope: this
                                },
                                afteranimate: {
                                        fn: function() {
                                                i.onDrag(),
                                                i.task.destroy()
                                        },
                                        scope: this
                                }
                        },
                        callback: t
                })
        },
        onDragStart: function() {
                var e = this;
                e.dragging = !0,
                e.dd.constrainTo(e.el, {
                        right: e.diff
                })
        },
        onDragEnd: function() {
                var e = this,
                t = (e.handle.getLeft(!0) + e.handle.getRight(!0)) / 2,
                i = (e.el.getLeft(!0) + e.el.getRight(!0)) / 2,
                o = t > i;
                e.state != o ? e.toggle() : e.moveHandle(o),
                e.dragging = !1
        },
        onDrag: function() {
                var e = this,
                t = e.handle.getLeft(!0) - e.rightside;
                t = e.handle.getLeft(!0) == e.rightside ? 0 : t - e.diff3,
                e.onLabel.setStyle({
                        marginLeft: t + "px"
                })
        },
        onMouseUp: function() {
                this.dragging || this.toggle()
        },
        toggle: function() {
                var e = this,
                t = !this.state;
                e.booleanMode || (t = e.state ? e.onText: e.offText),
                e.fireEvent("beforechange", e, t) !== !1 ? (e.state = !e.state, e.moveHandle(e.state, Ext.bind(e.fireEvent, e, ["change", e, e.getValue()]))) : e.moveHandle(e.state)
        },
        enable: function() {
                return this.disabled && (Jfok.lib.ToggleSlide.superclass.enable.call(this), this.registerToggleListeners()),
                this
        },
        disable: function() {
                return this.disabled || (Jfok.lib.ToggleSlide.superclass.disable.call(this), this.unregisterToggleListeners()),
                this
        },
        registerToggleListeners: function() {
                var e = this;
                e.dd = new Ext.dd.DD(e.handle),
                e.dd.startDrag = Ext.bind(e.onDragStart, e),
                e.dd.onDrag = Ext.bind(e.onDrag, e),
                e.dd.endDrag = Ext.bind(e.onDragEnd, e),
                e.el.on("mouseup", e.onMouseUp, e)
        },
        unregisterToggleListeners: function() {
                Ext.destroy(this.dd),
                this.el.un("mouseup", this.onMouseUp, this)
        },
        getValue: function() {
                var e = this;
                return e.booleanMode ? e.state: e.state ? e.onText: e.offText
        }
}),
Ext.define("Ext.ux.toggleslide.Thumb", {
        topZIndex: 1e4,
        constructor: function(e) {
                var t = this;
                Ext.apply(t, e || {},
                {
                        cls: Ext.baseCSSPrefix + "toggle-slide-thumb",
                        constrain: !1
                }),
                t.callParent([e])
        },
        render: function() {
                var e = this;
                e.el = e.slider.el.insertFirst(e.getElConfig()),
                e.onRender()
        },
        onRender: function() {
                this.disabled && this.disable()
        },
        getElConfig: function() {
                var e = this,
                t = (e.slider, {});
                return t.left = 0,
                {
                        style: t,
                        id: this.id,
                        cls: this.cls
                }
        },
        bringToFront: function() {
                this.el.setStyle("zIndex", this.topZIndex)
        },
        sendToBack: function() {
                this.el.setStyle("zIndex", ""),
                this.el.setStyle({
                        visibility: "hidden"
                })
        },
        disable: function() {}
}),
Ext.define("Jfok.lib.TreeFilter", {
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
}),
Ext.define("Jfok.lib.TreePicker", {
        extend: "Ext.form.field.Picker",
        xtype: "treepicker",
        uses: ["Ext.tree.Panel"],
        requires: ["Jfok.lib.TreeNodeDisabled"],
        triggerCls: Ext.baseCSSPrefix + "form-arrow-trigger",
        config: {
                store: null,
                displayField: null,
                valueField: "value",
                columns: null,
                selectOnTab: !0,
                maxPickerHeight: 300,
                minPickerHeight: 10
        },
        editable: !1,
        initComponent: function() {
                var e = this;
                e.callParent(arguments),
                e.addEvents("select"),
                e.mon(e.store, {
                        scope: e,
                        load: e.onLoad,
                        update: e.onUpdate
                })
        },
        createPicker: function() {
                var e = this,
                t = new Ext.tree.Panel({
                        shrinkWrapDock: 2,
                        store: e.store,
                        floating: !0,
                        displayField: e.displayField,
                        columns: e.columns,
                        minHeight: e.minPickerHeight,
                        maxHeight: e.maxPickerHeight,
                        manageHeight: !1,
                        shadow: !1,
                        rootVisible: !1,
                        border: !0,
                        autoScroll: !0,
                        listeners: {
                                scope: e,
                                itemclick: e.onItemClick
                        },
                        viewConfig: {
                                listeners: {
                                        scope: e,
                                        render: e.onViewRender
                                }
                        },
                        plugins: [{
                                ptype: "dvp_nodedisabled"
                        }]
                }),
                i = t.getView();
                return Ext.isIE9 && Ext.isStrict && i.on({
                        scope: e,
                        highlightitem: e.repaintPickerView,
                        unhighlightitem: e.repaintPickerView,
                        afteritemexpand: e.repaintPickerView,
                        afteritemcollapse: e.repaintPickerView
                }),
                t
        },
        onViewRender: function(e) {
                e.getEl().on("keypress", this.onPickerKeypress, this)
        },
        repaintPickerView: function() {
                var e = this.picker.getView().getEl().dom.style;
                e.display = e.display
        },
        alignPicker: function() {
                var e, t = this;
                t.isExpanded && (e = t.getPicker(), t.matchFieldWidth && e.setWidth(t.bodyEl.getWidth()), e.isFloating() && t.doAlign())
        },
        onItemClick: function(e, t) {
                this.selectItem(t)
        },
        onPickerKeypress: function(e) {
                var t = e.getKey(); (t === e.ENTER || t === e.TAB && this.selectOnTab) && this.selectItem(this.picker.getSelectionModel().getSelection()[0])
        },
        selectItem: function(e) {
                if (e.raw.disabled) return ! 1;
                var t = this;
                t.setValue(e.raw[t.valueField]),
                t.collapse(),
                t.picker.hide(),
                t.inputEl.focus(),
                t.fireEvent("select", t, e)
        },
        onExpand: function() {
                var e, t = this,
                i = t.picker,
                o = i.store,
                n = t.value;
                n && (e = o.getRootNode().findChildBy(function(e) {
                        return e.raw[t.valueField] == n ? !0 : void 0
                },
                null, !0)),
                e || (e = o.getRootNode()),
                i.getView().getSelectionModel().select(e),
                Ext.defer(function() {
                        i.getView().focus()
                },
                1)
        },
        setValue: function(e) {
                var t, i = this,
                o = i.value;
                return i.value = e,
                i.store.loading ? i: (void 0 === e ? (t = i.store.getRootNode(), i.value = t.raw[i.valueField]) : (t = i.store.getRootNode().findChildBy(function(t) {
                        return t.raw[i.valueField] == e ? !0 : void 0
                },
                null, !0), null == t && (t = i.store.getRootNode())), i.setRawValue(t && "Root" != t.get(i.displayField) ? t.get(i.displayField) : ""), i.value != o && i.checkChange(), i)
        },
        getSubmitValue: function() {
                return this.value
        },
        getValue: function() {
                return this.value
        },
        onLoad: function() {
                var e = this.value;
                e && this.setValue(e)
        },
        onUpdate: function(e, t, i, o) {
                var n = this.displayField;
                "edit" === i && o && Ext.Array.contains(o, n) && this.value === t.raw[this.valueField] && this.setRawValue(t.get(n))
        }
}),
Ext.define("Jfok.lib.TreeSearchField", {
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
}),
Ext.define("Jfok.lib.datetime.DateTimeField", {
        extend: "Ext.form.field.Date",
        alias: "widget.datetimefield",
        initComponent: function() {
                this.callParent()
        },
        createPicker: function() {
                var e = this,
                t = Ext.String.format;
                return Ext.create("Jfok.lib.datetime.DateTimePicker", {
                        ownerCt: e.ownerCt,
                        renderTo: document.body,
                        floating: !0,
                        hidden: !0,
                        focusOnShow: !0,
                        minDate: e.minValue,
                        maxDate: e.maxValue,
                        disabledDatesRE: e.disabledDatesRE,
                        disabledDatesText: e.disabledDatesText,
                        disabledDays: e.disabledDays,
                        disabledDaysText: e.disabledDaysText,
                        format: e.format,
                        showToday: e.showToday,
                        startDay: e.startDay,
                        minText: t(e.minText, e.formatDate(e.minValue)),
                        maxText: t(e.maxText, e.formatDate(e.maxValue)),
                        listeners: {
                                scope: e,
                                select: e.onSelect
                        },
                        keyNavConfig: {
                                esc: function() {
                                        e.collapse()
                                }
                        }
                })
        }
}),
Ext.define("Jfok.lib.datetime.TimePickerField", {
        extend: "Ext.form.field.Base",
        alias: "widget.timepicker",
        alternateClassName: "Ext.form.field.TimePickerField",
        requires: ["Ext.form.field.Number"],
        inputType: "hidden",
        style: "padding:4px 0 0 0;margin-bottom:0px",
        value: null,
        spinnerCfg: {
                width: 40
        },
        initComponent: function() {
                var e = this;
                e.value = e.value || Ext.Date.format(new Date, "H:i:s"),
                e.callParent(),
                e.spinners = [];
                var t = Ext.apply({},
                e.spinnerCfg, {
                        readOnly: e.readOnly,
                        disabled: e.disabled,
                        style: "float: left",
                        listeners: {
                                change: {
                                        fn: e.onSpinnerChange,
                                        scope: e
                                }
                        }
                });
                e.hoursSpinner = Ext.create("Ext.form.field.Number", Ext.apply({},
                t, {
                        minValue: 0,
                        maxValue: 23
                })),
                e.minutesSpinner = Ext.create("Ext.form.field.Number", Ext.apply({},
                t, {
                        minValue: 0,
                        maxValue: 59
                })),
                e.secondsSpinner = Ext.create("Ext.form.field.Number", Ext.apply({},
                t, {
                        minValue: 0,
                        maxValue: 59
                })),
                e.spinners.push(e.hoursSpinner, e.minutesSpinner, e.secondsSpinner)
        },
        onRender: function() {
                var e, t, i = this;
                i.callParent(arguments),
                e = Ext.dom.Query.select("td", this.getEl().dom)[1],
                t = Ext.get(e),
                i.callSpinnersFunction("render", t),
                Ext.core.DomHelper.append(t, {
                        tag: "div",
                        cls: "x-form-clear-left"
                }),
                this.setRawValue(this.value)
        },
        _valueSplit: function(e) {
                Ext.isDate(e) && (e = Ext.Date.format(e, "H:i:s"));
                var t = e.split(":");
                return {
                        h: t.length > 0 ? t[0] : 0,
                        m: t.length > 1 ? t[1] : 0,
                        s: t.length > 2 ? t[2] : 0
                }
        },
        onSpinnerChange: function() {
                this.rendered && this.fireEvent("change", this, this.getValue(), this.getRawValue())
        },
        callSpinnersFunction: function(e, t) {
                for (var i = 0; i < this.spinners.length; i++) this.spinners[i][e](t)
        },
        getRawValue: function() {
                if (this.rendered) return {
                        h: this.hoursSpinner.getValue(),
                        m: this.minutesSpinner.getValue(),
                        s: this.secondsSpinner.getValue()
                };
                var e = this.value || new Date;
                return this._valueSplit(e)
        },
        setRawValue: function(e) {
                e = this._valueSplit(e),
                this.hoursSpinner && (this.hoursSpinner.setValue(e.h), this.minutesSpinner.setValue(e.m), this.secondsSpinner.setValue(e.s))
        },
        getValue: function() {
                var e = this.getRawValue();
                return Ext.String.leftPad(e.h, 2, "0") + ":" + Ext.String.leftPad(e.m, 2, "0") + ":" + Ext.String.leftPad(e.s, 2, "0")
        },
        setValue: function(e) {
                this.value = Ext.isDate(e) ? Ext.Date.format(e, "H:i:s") : e,
                this.rendered && (this.setRawValue(this.value), this.validate())
        },
        disable: function() {
                this.callParent(arguments),
                this.callSpinnersFunction("disable", arguments)
        },
        enable: function() {
                this.callParent(arguments),
                this.callSpinnersFunction("enable", arguments)
        },
        setReadOnly: function() {
                this.callParent(arguments),
                this.callSpinnersFunction("setReadOnly", arguments)
        },
        clearInvalid: function() {
                this.callParent(arguments),
                this.callSpinnersFunction("clearInvalid", arguments)
        },
        isValid: function(e) {
                return this.hoursSpinner.isValid(e) && this.minutesSpinner.isValid(e) && this.secondsSpinner.isValid(e)
        },
        validate: function() {
                return this.hoursSpinner.validate() && this.minutesSpinner.validate() && this.secondsSpinner.validate()
        }
}),
Ext.define("Jfok.r.ReportSelectCombo", {
        extend: "Jfok.lib.TreePicker",
        alias: "widget.reportselectcombo",
        fieldLabel: "\u67e5\u8be2\u65b9\u6848",
        queryMode: "remote",
        displayField: "text",
        valueField: "value",
        labelWidth: 60,
        width: 350,
        forceSelection: !0,
        editable: !1,
        autoSelect: !0,
        initComponent: function() {
                this.store = Ext.create("Jfok.r.ReportSelectComboStore", {
                        combo: this
                }),
                this.callParent(arguments)
        }
}),
Ext.define("Jfok.view.region.MainRegion", {
        extend: "Ext.tab.Panel",
        alias: "widget.mainregion",
        closeAction: "hide",
        autoDestroy: !1,
        tabPosition: "top",
        plugins: [{
                ptype: "tabclosemenu",
                closeAllTabsText: "\u5173\u95ed\u6240\u6709",
                closeOthersTabsText: "\u5173\u95ed\u5176\u4ed6",
                closeTabText: "\u5173\u95ed",
                extraItemsTail: ["-", {
                        text: "\u53ef\u5173\u95ed",
                        itemId: "canclose",
                        checked: !0,
                        hideOnClick: !1,
                        handler: function(e) {
                                e.ownerCt.tabPanel.tab.setClosable(e.checked)
                        }
                },
                "-", {
                        text: "\u767b\u5f55\u65f6\u81ea\u52a8\u6253\u5f00",
                        itemId: "autoopen",
                        checked: !1,
                        hideOnClick: !1,
                        handler: function(e) {
                                e.checked ? Jfok.system.addModuleToAutoOpen(e.ownerCt.tabPanel.moduleName) : Jfok.system.deleteModuleToAutoOpen(e.ownerCt.tabPanel.moduleName)
                        }
                },
                "-", {
                        xtype: "fieldcontainer",
                        items: {
                                xtype: "numberfield",
                                fieldLabel: "\u6700\u591a\u6253\u5f00Tab\u6570",
                                itemId: "maxtab",
                                width: 156,
                                value: 8,
                                maxValue: 20,
                                minValue: 3,
                                listeners: {
                                        change: function(e, t) {
                                                Jfok.system.setMaxTab(t)
                                        }
                                }
                        }
                }],
                listeners: {
                        beforemenu: function(e, t) {
                                e.tabPanel = t,
                                e.down("#canclose").setChecked(t.tab.closable),
                                e.down("#autoopen").setVisible(!t.parentModuleName),
                                e.down("#autoopen").previousSibling().setVisible(!t.parentModuleName),
                                e.down("#autoopen").setChecked(Jfok.system.isModuleAutoOpen(t.moduleName)),
                                e.down("#maxtab").setValue(Jfok.system.getMaxTab())
                        }
                }
        },
        Ext.create("Ext.ux.TabReorderer")],
        initComponent: function() {
                this.items = [{
                        title: "\u7cfb\u7edf\u9996\u9875",
                        border: !0,
                        frame: !1,
                        bodyCls: "panel-background",
                        reorderable: !1,
                        icon: "images/button/homepage.png",
                        layout: "fit",
                        items: [{
                                xtype: "homepagepanel",
                                border: !1,
                                frame: !1
                        }]
                }],
                this.listeners = {
                        add: function(e) {
                                e.items.length > Jfok.system.getMaxTab() && e.remove(1)
                        }
                },
                this.callParent(arguments)
        }
}),
Ext.define("Jfok.lib.AdditionFieldAddButton", {
        extend: "Ext.button.Button",
        alias: "widget.additionfieldaddbutton",
        moduleId: void 0,
        moduleIdvalue: void 0,
        field: void 0,
        fieldId: void 0,
        fieldTitle: void 0,
        initComponent: function() {
                this.callParent(arguments)
        },
        listeners: {
                click: function(e) {
                        var t = e.up("form"),
                        i = t.data;
                        if (!i) return Jfok.system.warnInfo("\u6b64\u6761\u8bb0\u5f55\u5c1a\u672a\u4fdd\u5b58\uff0c\u8bf7\u5148\u4fdd\u5b58\u540e\u518d\u589e\u52a0\u9644\u4ef6"),
                        void 0;
                        this.moduleIdvalue = i.getIdValue();
                        var o = Jfok.mainRegion.addParentFilterModule("_Addition", t.module.tf_moduleName, this.moduleIdvalue, i.getTitleTpl(), {
                                showAdditionView: !0,
                                notFocus: !0,
                                newDefault: {
                                        _t9506___tf_fieldId: "" + this.fieldId
                                }
                        }),
                        n = o.down("button#new");
                        n && n.fireEvent("click", n)
                }
        }
}),
Ext.define("Jfok.lib.AdditionFieldDisplayButton", {
        extend: "Ext.button.Button",
        alias: "widget.additionfielddisplaybutton",
        moduleId: void 0,
        moduleIdvalue: void 0,
        field: void 0,
        fieldId: void 0,
        fieldTitle: void 0,
        initComponent: function() {
                this.callParent(arguments)
        },
        listeners: {
                click: function(e) {
                        var t = e.up("form"),
                        i = t.data;
                        if (!i) return Jfok.system.warnInfo("\u6b64\u6761\u8bb0\u5f55\u5c1a\u672a\u4fdd\u5b58\uff0c\u8bf7\u5148\u4fdd\u5b58\u540e\u518d\u663e\u793a\u9644\u4ef6"),
                        void 0;
                        var o = this.fieldId,
                        n = t.module.tf_moduleName,
                        a = i.getIdValue(),
                        l = i.getTitleTpl(),
                        r = this.fieldTitle,
                        d = {
                                equalsMethod: null,
                                equalsValue: o,
                                fieldtitle: "\u9644\u4ef6\u5bf9\u5e94\u5b57\u6bb5",
                                isCodeLevel: !1,
                                moduleName: "_AdditionOnField",
                                primarykey: "tf_fieldId",
                                tableAsName: "_t9506",
                                text: r
                        },
                        s = {
                                defaultNavigateValues: [{
                                        _AdditionOnField: d
                                }]
                        };
                        Jfok.attachmentFieldWin && Jfok.attachmentFieldWin.pModuleName !== n && (Jfok.attachmentFieldWin.destroy(), Jfok.attachmentFieldWin = null),
                        Jfok.attachmentFieldWin ? (Jfok.attachmentFieldWin.changeParentFilter(n, t.module.tf_title, a, l, s), Jfok.attachmentFieldWin.show()) : (Jfok.attachmentFieldWin = Ext.widget("attahcmentwindow", {
                                pModuleName: n,
                                pModuleTitle: t.module.tf_title,
                                aid: a,
                                aname: l,
                                frame: !1,
                                border: !1,
                                x: .1 * document.body.clientWidth,
                                y: .1 * document.body.clientHeight,
                                height: .8 * document.body.clientHeight,
                                width: .8 * document.body.clientWidth,
                                param: s
                        }), Jfok.attachmentFieldWin.show(null,
                        function() {
                                Jfok.attachmentFieldWin.down("attachmentnavigate").setWidth(180)
                        }))
                }
        }
}),
Ext.define("Jfok.lib.ManyToOneFieldDisplayButton", {
        extend: "Ext.button.Button",
        alias: "widget.manytoonefielddisplaybutton",
        initComponent: function() {
                this.callParent(arguments)
        },
        listeners: {
                click: function(e) {
                        var t = e.up("form"),
                        i = t.getForm().findField(this.fieldName),
                        o = i.getValue();
                        "textfield" == i.xtype && (o = null, t.data && (o = t.data.raw[this.primaryKey])),
                        o ? Jfok.modules.showModuleRecord(i.moduleName, o) : Jfok.system.errorInfo("\u5c1a\u672a\u9009\u62e9\u300e" + this.title + "\u300f\u7684\u5b57\u6bb5\u503c\uff01")
                },
                mouseout: function() {
                        this.setTransparent(document.getElementById(this.id))
                },
                mouseover: function() {
                        var e = document.getElementById(this.id);
                        e.style.backgroundImage = "",
                        e.style.backgroundColor = "",
                        e.style.borderColor = ""
                },
                afterrender: function() {
                        this.setTransparent(document.getElementById(this.id))
                }
        },
        setTransparent: function(e) {
                e.style.backgroundImage = "inherit",
                e.style.backgroundColor = "inherit",
                e.style.borderColor = "transparent"
        }
}),
Ext.define("Ext.lib.datetime.DateTimeMenu", {
        extend: "Ext.menu.Menu",
        alias: "widget.datetimemenu",
        requires: ["Jfok.lib.datetime.DateTimePicker"],
        hideOnClick: !0,
        pickerId: null,
        initComponent: function() {
                var e = this;
                Ext.apply(e, {
                        showSeparator: !1,
                        plain: !0,
                        border: !1,
                        bodyPadding: 0,
                        items: Ext.applyIf({
                                cls: Ext.baseCSSPrefix + "menu-date-item",
                                id: e.pickerId,
                                xtype: "datetimepicker"
                        },
                        e.initialConfig)
                }),
                e.callParent(arguments),
                e.picker = e.down("datetimepicker"),
                e.relayEvents(e.picker, ["select"]),
                e.hideOnClick && e.on("select", e.hidePickerOnSelect, e)
        },
        hidePickerOnSelect: function() {
                Ext.menu.Manager.hideAll()
        }
}),
Ext.define("Jfok.r.widget.BaseModuleSelectMenu", {
        extend: "Ext.button.Button",
        alias: "widget.basemoduleselectmenu",
        config: {
                allModules: null,
                baseModuleName: null
        },
        applyBaseModuleName: function(e) {
                this.baseModuleName = e,
                this.down("menuitem[moduleName=" + e + "]").setChecked(!0);
                var t = Jfok.modules.getModule(e);
                this.setText(this.text_ + t.tf_title)
        },
        applyAllModules: function(e) {
                var t = this;
                this.allModules = e,
                this.menu.removeAll(!0),
                Ext.Array.forEach(this.allModules,
                function(e) {
                        var i = Jfok.modules.getModule(e);
                        i && t.menu.add({
                                moduleName: e,
                                text: i.tf_title,
                                checked: !1,
                                group: t.getId()
                        })
                })
        },
        initComponent: function() {
                this.text = "\u57fa\u51c6\u6a21\u5757\uff1a",
                this.text_ = this.text,
                this.menu = {
                        xtype: "menu",
                        style: {
                                overflow: "visible"
                        },
                        items: []
                },
                this.callParent(arguments)
        }
}),
Ext.define("Jfok.r.widget.YearMonthSelectMenu", {
        extend: "Ext.menu.Menu",
        alias: "widget.yearmonthselectmenu",
        initComponent: function() {
                var e = (new Date).getFullYear(),
                t = (new Date).getMonth() + 1,
                i = (new Date).getDate(),
                o = parseInt((new Date).getMonth() / 3) + 1;
                this.style = {
                        overflow: "visible"
                },
                this.items = [{
                        text: "\u6240\u6709\u5e74\u5ea6",
                        dateType: "all"
                },
                "-", {
                        text: "\u5f53\u524d\u5e74\u5ea6",
                        dateType: "thisyear",
                        year: e,
                        icon: "images/button/calendar.png"
                },
                {
                        text: "\u5f53\u524d\u5b63\u5ea6",
                        year: e,
                        quarter: o,
                        dateType: "thisquarter"
                },
                {
                        text: "\u5f53\u524d\u6708\u4efd",
                        year: e,
                        month: t,
                        dateType: "thismonth"
                },
                {
                        text: "\u5f53\u524d\u65e5\u671f",
                        year: e,
                        month: t,
                        day: i,
                        dateType: "thisday"
                },
                "-", {
                        xtype: "menuitem",
                        text: "\u6307\u5b9a\u5e74\u5ea6",
                        menu: [{
                                xtype: "menuitem",
                                text: "\u5e74\u5ea6\u533a\u95f4",
                                menu: [{
                                        xtype: "form",
                                        itemId: "yearsection",
                                        border: !0,
                                        width: 190,
                                        bodyStyle: "padding : 8px",
                                        items: [{
                                                xtype: "fieldcontainer",
                                                layout: "hbox",
                                                items: [{
                                                        xtype: "checkbox",
                                                        margin: "0 10 0 0",
                                                        name: "_enablefirst",
                                                        value: !0
                                                },
                                                {
                                                        labelWidth: 60,
                                                        xtype: "numberfield",
                                                        name: "firstyear",
                                                        value: e,
                                                        editable: !1,
                                                        minValue: 1900,
                                                        maxValue: 2999,
                                                        incrementValue: 1,
                                                        width: 130,
                                                        fieldLabel: "\u8d77\u59cb\u5e74\u5ea6"
                                                }]
                                        },
                                        {
                                                xtype: "fieldcontainer",
                                                layout: "hbox",
                                                items: [{
                                                        xtype: "checkbox",
                                                        margin: "0 10 0 0",
                                                        name: "_enablelast",
                                                        value: !0
                                                },
                                                {
                                                        labelWidth: 60,
                                                        xtype: "numberfield",
                                                        name: "lastyear",
                                                        value: e,
                                                        editable: !1,
                                                        minValue: 1900,
                                                        maxValue: 2999,
                                                        incrementValue: 1,
                                                        width: 130,
                                                        fieldLabel: "\u7ec8\u6b62\u5e74\u5ea6"
                                                }]
                                        },
                                        {
                                                margin: "5 5 0 80",
                                                xtype: "button",
                                                text: "\u786e \u5b9a"
                                        }]
                                }]
                        },
                        "-"],
                        listeners: {
                                render: function(e) {
                                        for (var t = (new Date).getFullYear(), i = t + 2; i > t - 10; i--) e.menu.add({
                                                text: i + " \u5e74" + (i == t ? " (\u4eca\u5e74)": ""),
                                                year: i,
                                                dateType: "year"
                                        })
                                }
                        }
                },
                {
                        xtype: "menuitem",
                        text: "\u5e74\u5ea6\u5b63\u5ea6",
                        menu: [{
                                xtype: "menuitem",
                                text: "\u5b63\u5ea6\u533a\u95f4",
                                menu: [{
                                        xtype: "form",
                                        itemId: "quartersection",
                                        border: !0,
                                        width: 300,
                                        bodyStyle: "padding : 8px",
                                        items: [{
                                                xtype: "fieldcontainer",
                                                layout: "column",
                                                items: [{
                                                        xtype: "checkbox",
                                                        margin: "0 10 0 0",
                                                        name: "_enablefirst",
                                                        columnWidth: .1,
                                                        value: !0
                                                },
                                                {
                                                        labelWidth: 60,
                                                        xtype: "numberfield",
                                                        name: "firstyear",
                                                        editable: !1,
                                                        value: e,
                                                        minValue: 1900,
                                                        maxValue: 2999,
                                                        incrementValue: 1,
                                                        columnWidth: .5,
                                                        fieldLabel: "\u8d77\u59cb\u5e74\u5ea6",
                                                        labelAlign: "right"
                                                },
                                                {
                                                        labelWidth: 60,
                                                        xtype: "numberfield",
                                                        editable: !1,
                                                        name: "firstquarter",
                                                        value: o,
                                                        minValue: 1,
                                                        maxValue: 4,
                                                        incrementValue: 1,
                                                        columnWidth: .4,
                                                        fieldLabel: "\u5b63\u5ea6",
                                                        labelAlign: "right"
                                                }]
                                        },
                                        {
                                                xtype: "fieldcontainer",
                                                layout: "column",
                                                items: [{
                                                        xtype: "checkbox",
                                                        margin: "0 10 0 0",
                                                        name: "_enablelast",
                                                        columnWidth: .1,
                                                        value: !0
                                                },
                                                {
                                                        labelWidth: 60,
                                                        xtype: "numberfield",
                                                        editable: !1,
                                                        name: "lastyear",
                                                        value: e,
                                                        minValue: 1900,
                                                        maxValue: 2999,
                                                        incrementValue: 1,
                                                        columnWidth: .5,
                                                        fieldLabel: "\u7ec8\u6b62\u5e74\u5ea6",
                                                        labelAlign: "right"
                                                },
                                                {
                                                        labelWidth: 60,
                                                        xtype: "numberfield",
                                                        name: "lastquarter",
                                                        editable: !1,
                                                        value: o,
                                                        minValue: 1,
                                                        maxValue: 4,
                                                        incrementValue: 1,
                                                        columnWidth: .4,
                                                        fieldLabel: "\u5b63\u5ea6",
                                                        labelAlign: "right"
                                                }]
                                        },
                                        {
                                                margin: "5 5 0 150",
                                                xtype: "button",
                                                text: "\u786e \u5b9a"
                                        }]
                                }]
                        },
                        "-"],
                        listeners: {
                                render: function(t) {
                                        for (var i = e,
                                        n = i + 2; n > i - 10; n--) {
                                                for (var a = [], l = 1; 4 >= l; l++) a.push({
                                                        text: l + " \u5b63\u5ea6" + (n == i && l == o ? " (\u5f53\u5b63)": ""),
                                                        dateType: "yearquarter",
                                                        year: n,
                                                        quarter: l
                                                });
                                                t.menu.add({
                                                        text: n + " \u5e74" + (n == i ? " (\u4eca\u5e74)": ""),
                                                        year: n,
                                                        menu: a
                                                })
                                        }
                                }
                        }
                },
                {
                        xtype: "menuitem",
                        text: "\u5e74\u5ea6\u6708\u4efd",
                        menu: [{
                                xtype: "menuitem",
                                text: "\u6708\u4efd\u533a\u95f4",
                                menu: [{
                                        xtype: "form",
                                        itemId: "monthsection",
                                        border: !0,
                                        width: 300,
                                        bodyStyle: "padding : 8px",
                                        items: [{
                                                xtype: "fieldcontainer",
                                                layout: "column",
                                                items: [{
                                                        xtype: "checkbox",
                                                        margin: "0 10 0 0",
                                                        name: "_enablefirst",
                                                        columnWidth: .1,
                                                        value: !0
                                                },
                                                {
                                                        labelWidth: 60,
                                                        xtype: "numberfield",
                                                        name: "firstyear",
                                                        editable: !1,
                                                        value: e,
                                                        minValue: 1900,
                                                        maxValue: 2999,
                                                        incrementValue: 1,
                                                        columnWidth: .5,
                                                        fieldLabel: "\u8d77\u59cb\u5e74\u5ea6",
                                                        labelAlign: "right"
                                                },
                                                {
                                                        labelWidth: 60,
                                                        xtype: "numberfield",
                                                        name: "firstmonth",
                                                        value: t,
                                                        editable: !1,
                                                        minValue: 1,
                                                        maxValue: 12,
                                                        incrementValue: 1,
                                                        columnWidth: .4,
                                                        fieldLabel: "\u6708\u4efd",
                                                        labelAlign: "right"
                                                }]
                                        },
                                        {
                                                xtype: "fieldcontainer",
                                                layout: "column",
                                                items: [{
                                                        xtype: "checkbox",
                                                        margin: "0 10 0 0",
                                                        name: "_enablelast",
                                                        columnWidth: .1,
                                                        value: !0
                                                },
                                                {
                                                        labelWidth: 60,
                                                        xtype: "numberfield",
                                                        name: "lastyear",
                                                        editable: !1,
                                                        value: e,
                                                        minValue: 1900,
                                                        maxValue: 2999,
                                                        incrementValue: 1,
                                                        columnWidth: .5,
                                                        fieldLabel: "\u7ec8\u6b62\u5e74\u5ea6",
                                                        labelAlign: "right"
                                                },
                                                {
                                                        labelWidth: 60,
                                                        xtype: "numberfield",
                                                        name: "lastmonth",
                                                        editable: !1,
                                                        value: t,
                                                        minValue: 1,
                                                        maxValue: 12,
                                                        incrementValue: 1,
                                                        columnWidth: .4,
                                                        fieldLabel: "\u6708\u4efd",
                                                        labelAlign: "right"
                                                }]
                                        },
                                        {
                                                margin: "5 5 0 150",
                                                xtype: "button",
                                                text: "\u786e \u5b9a"
                                        }]
                                }]
                        },
                        "-"],
                        listeners: {
                                render: function(i) {
                                        for (var o = e,
                                        n = o + 2; n > o - 10; n--) {
                                                for (var a = [], l = 1; 12 >= l; l++) a.push({
                                                        text: l + " \u6708" + (n == o && l == t ? " (\u5f53\u6708)": ""),
                                                        dateType: "yearmonth",
                                                        year: n,
                                                        month: l
                                                });
                                                i.menu.add({
                                                        text: n + " \u5e74" + (n == o ? " (\u4eca\u5e74)": ""),
                                                        year: n,
                                                        menu: a
                                                })
                                        }
                                }
                        }
                },
                {
                        text: "\u9009\u62e9\u65e5\u671f",
                        menu: [{
                                text: "\u6307\u5b9a\u65e5\u671f",
                                menu: {
                                        xtype: "datemenu"
                                }
                        },
                        {
                                text: "\u65e5\u671f\u671f\u95f4",
                                menu: [{
                                        xtype: "form",
                                        itemId: "datesection",
                                        border: !0,
                                        width: 235,
                                        bodyStyle: "padding : 8px",
                                        items: [{
                                                xtype: "fieldcontainer",
                                                layout: "hbox",
                                                items: [{
                                                        xtype: "checkbox",
                                                        margin: "0 10 0 0",
                                                        name: "_enablefirst",
                                                        value: !0
                                                },
                                                {
                                                        labelWidth: 60,
                                                        xtype: "datefield",
                                                        name: "firstdate",
                                                        value: new Date,
                                                        format: "Y-m-d",
                                                        submitFormat: "Y-m-d",
                                                        width: 180,
                                                        fieldLabel: "\u8d77\u59cb\u65e5\u671f"
                                                }]
                                        },
                                        {
                                                xtype: "fieldcontainer",
                                                layout: "hbox",
                                                items: [{
                                                        xtype: "checkbox",
                                                        margin: "0 10 0 0",
                                                        name: "_enablelast",
                                                        value: !0
                                                },
                                                {
                                                        labelWidth: 60,
                                                        xtype: "datefield",
                                                        name: "lastdate",
                                                        value: new Date,
                                                        format: "Y-m-d",
                                                        submitFormat: "Y-m-d",
                                                        width: 180,
                                                        fieldLabel: "\u7ec8\u6b62\u65e5\u671f"
                                                }]
                                        },
                                        {
                                                margin: "5 5 0 80",
                                                xtype: "button",
                                                text: "\u786e \u5b9a"
                                        }]
                                }]
                        }]
                }],
                this.callParent(arguments)
        }
}),
Ext.define("Jfok.r.SelectConditionToolbar", {
        extend: "Ext.toolbar.Toolbar",
        alias: "widget.selectconditiontoolbar",
        requires: ["Jfok.r.widget.DateSelectButton"],
        layout: {
                overflowHandler: "Menu"
        },
        initComponent: function() {
                var e = this;
                this.items = [{
                        xtype: "dateselectbutton"
                },
                "-"];
                var t = [];
                Ext.Array.forEach(Jfok.modules.modulesinfo,
                function(e) {
                        e.tf_searchCondOrder && t.push({
                                type: "module",
                                conditionId: e.tf_moduleName,
                                moduleId: e.tf_moduleId,
                                codeLevel: e.tf_codeLevel,
                                fulltext: e.tf_title,
                                text: e.tf_shortname || e.tf_title,
                                moduleTitle: e.tf_title,
                                fieldTitle: Jfok.modules.getModule(e.tf_moduleName).getFieldDefineWithName(e.tf_nameFields).tf_title,
                                moduleName: e.tf_moduleName,
                                icon: e.iconURL || "images/button/selecttree.png",
                                order: e.tf_searchCondOrder
                        }),
                        Ext.Array.forEach(e.moduleFields,
                        function(i) {
                                i.searchCondOrder && t.push({
                                        type: "modulefield",
                                        conditionId: e.tf_moduleName + "-" + i.tf_fieldId,
                                        moduleId: e.tf_moduleId,
                                        moduleTitle: e.tf_title,
                                        fieldTitle: i.tf_title,
                                        fieldId: i.tf_fieldId,
                                        codeLevel: null,
                                        fulltext: (e.tf_shortname || e.tf_title) + i.tf_title,
                                        text: i.tf_title,
                                        moduleName: e.tf_moduleName,
                                        icon: e.iconURL || "images/button/selecttree.png",
                                        order: i.searchCondOrder
                                })
                        })
                }),
                t.sort(function(e, t) {
                        return e.order - t.order
                }),
                Ext.Array.forEach(t,
                function(t) {
                        e.items.push({
                                xtype: "conditionselectbutton",
                                searchConditionButton: !0,
                                text: "<text>" + t.text + "</text>",
                                icon: t.icon,
                                condition: t,
                                conditionId: t.conditionId,
                                listeners: {
                                        render: function(e) {
                                                e.dragZone = new Ext.dd.DragZone(e.getEl(), {
                                                        getDragData: function(t) {
                                                                var i = t.getTarget("text");
                                                                if (i) {
                                                                        var o = i.cloneNode(!0);
                                                                        return o.id = Ext.id(),
                                                                        {
                                                                                ddel: o,
                                                                                sourceEl: i,
                                                                                repairXY: Ext.fly(i).getXY(),
                                                                                button: e
                                                                        }
                                                                }
                                                        },
                                                        getRepairXY: function() {
                                                                return this.dragData.repairXY
                                                        }
                                                })
                                        }
                                }
                        })
                }),
                this.callParent(arguments)
        }
}),
Ext.define("Jfok.m.model.ApproveBase", {
        getApproveToolTip: function() {
                var e = "";
                this.meCanApprove() && (e += this.changeColor("\u6211\u53ef\u4ee5\u5ba1\u6279\u6b64\u6761\u8bb0\u5f55<br/><br/>")),
                e += "\u5ba1\u6279\u4e2d" == this.get("tf_shResult") ? this.changeColor("\u6b63\u5728\u5ba1\u6279\u4e2d") : this.changeColor("\u5ba1\u6279" + this.get("tf_shResult")),
                e += "<br/><br/>";
                for (var t = 0; 5 >= t; t++) null != this.get("tf_shdate" + (t + 1)) && (e += Ext.String.format("{4}\u3001{0} \u7684 {1} \u4e8e {2} \u8fdb\u884c\u4e86\u5ba1\u6279\uff0c\u5ba1\u6279\u7ed3\u679c\uff1a{3}\u3002<br/>", this.module.moduleApproves[t].tf_departmentName, this.changeColor(this.get("tf_shname" + (t + 1))), Ext.Date.format(this.get("tf_shdate" + (t + 1)), "Y-m-d"), this.changeColor(this.get("tf_shresult" + (t + 1))), t + 1));
                return e
        },
        changeColor: function(e) {
                return "<span class='treeitemimportant'>" + e + "</span>"
        },
        meCanApprove: function() {
                var e = this.module.tf_userRole;
                if (e.tf_allowApprove && e.tf_approveLevel && null == this.get("tf_shResultDate") && null == this.get("tf_shdate" + e.tf_approveOrder)) {
                        for (var t = 0; t < this.module.moduleApproves.length; t++) if (this.module.moduleApproves[t].tf_level < e.tf_approveLevel && null == this.get("tf_shdate" + (t + 1))) return ! 1;
                        return ! 0
                }
                return ! 1
        },
        meCanCancelApprove: function() {
                var e = this.module.tf_userRole;
                if (null == this.get("tf_shResultDate")) {
                        if (null != this.get("tf_shdate" + e.tf_approveOrder)) {
                                for (var t = 0; t < this.module.moduleApproves.length; t++) if (this.module.moduleApproves[t].tf_level > e.tf_approveLevel && null != this.get("tf_shdate" + (t + 1))) return ! 1;
                                return ! 0
                        }
                        return ! 1
                }
                return this.get("tf_shResultName") === Jfok.system.tf_userName ? !0 : !1
        },
        meApproved: function() {
                return this.get("tf_shdate" + this.module.tf_userRole.tf_approveOrder) ? !0 : !1
        }
}),
Ext.define("Jfok.m.w.ApproveActionColumn", {
        extend: "Ext.grid.column.Action",
        alias: "widget.approveactioncolumn",
        dataIndex: "tf_shNowCount",
        text: "\u5ba1<br/>\u6279",
        align: "center",
        menuDisabled: !0,
        sortable: !0,
        resizable: !1,
        getClass: function(e, t, i) {
                return i.getIdValue() ? "\u5df2\u901a\u8fc7" == i.get("tf_shResult") ? "approve_ok": "\u5df2\u7ec8\u6b62" == i.get("tf_shResult") ? "approve_cancel": "approve_" + e: void 0
        },
        getTip: function(e, t, i) {
                return i.getIdValue() ? i.getApproveToolTip() : null
        },
        handler: function(e, t) {
                var i = e.getStore().getAt(t),
                o = e.getSelectionModel();
                o.select(i);
                var n = e.up("modulepanel").down("button#approve");
                n && n.fireEvent("click", n)
        }
}),
Ext.define("Jfok.m.w.AttachmentNumberColumn", {
        extend: "Ext.grid.column.Column",
        alias: "widget.attachmentnumbercolumn",
        dataIndex: "tf_additionCount",
        text: '<img src="images/button/additionli.png" />\u3000',
        tooltip: "\u9644\u4ef6\u6570",
        align: "right",
        menuDisabled: !0,
        sortable: !0,
        resizable: !1,
        renderer: function(e, t, i) {
                if (e) {
                        var o = "<a onclick=\"javascript:Jfok.mainRegion.addParentFilterModule('_Addition','" + i.module.tf_moduleName + "','" + i.get(i.idProperty) + "','" + i.getTitleTpl() + '\',{showAdditionView : true});return false;" href="#"><span style="color:green;">' + (e > 9 ? e: "0" + e) + "</span></a>";
                        return o
                }
        }
}),
Ext.define("Jfok.m.w.AuditingActionColumn", {
        extend: "Ext.grid.column.Action",
        alias: "widget.auditingactioncolumn",
        dataIndex: "tf_auditinged",
        text: "\u5ba1<br/>\u6838",
        align: "center",
        menuDisabled: !0,
        sortable: !0,
        resizable: !1,
        getClass: function(e, t, i) {
                return i.getIdValue() ? i.get("tf_auditinged") ? "already_auditing": "not_auditing": null
        },
        getTip: function(e, t, i) {
                return i.getIdValue() ? i.get("tf_auditinged") ? String.format("\u5df2\u5ba1\u6838<br/><br/>\u7531 {0} \u4e8e {1} \u5ba1\u6838\u5b8c\u6210\u3002<br/>\u5ba1\u6838\u7ed3\u679c\uff1a{2}", i.get("tf_auditingName"), Ext.Date.format(i.get("tf_auditingDate"), "Y-m-d"), i.get("tf_auditingRemark")) : "\u5c1a\u672a\u5ba1\u6838": null
        },
        handler: function(e, t) {
                var i = e.getStore().getAt(t),
                o = e.getSelectionModel();
                o.select(i);
                var n = e.up("modulepanel").down("button#auditing");
                console.log(n),
                n && n.fireEvent("click", n)
        }
}),
Ext.define("Jfok.m.w.ComboModuleGrid", {
        extend: "Ext.form.field.Trigger",
        alias: "widget.combomodulegrid",
        initComponent: function() {
                this.onTriggerClick = function() {
                        this.selectMenu || (this.selectMenu = new Ext.menu.Menu({
                                border: "0 0 0 0",
                                items: [{
                                        margin: "0 0 0 0",
                                        xtype: "panel",
                                        width: 800,
                                        height: 500,
                                        layout: "fit",
                                        items: [Jfok.modules.getModule("Global").getModulePanel()]
                                }]
                        })),
                        this.selectMenu.isHidden() ? this.selectMenu.showBy(this.el, "tl-bl?", [this.labelWidth + 5, 0]) : this.selectMenu.hide(this.el)
                },
                this.callParent(arguments)
        }
}),
Ext.define("Jfok.m.w.DetailSchemeCombo", {
        extend: "Ext.form.field.ComboBox",
        alias: "widget.detailschemecombo",
        fieldLabel: "\u65b9\u6848",
        editable: !1,
        labelWidth: 40,
        labelAlign: "right",
        width: 160,
        queryMode: "local",
        displayField: "tf_schemeName",
        valueField: "tf_detailId",
        initComponent: function() {
                var e = this.modulePanel.module.moduleDetailSchemes;
                this.store = Ext.create("Ext.data.Store", {
                        fields: ["tf_detailId", "tf_schemeName"],
                        data: e
                }),
                this.value = e[0].tf_detailId,
                this.callParent(arguments)
        }
}),
Ext.define("Jfok.m.w.FormSubModuleMenu", {
        extend: "Ext.menu.Menu",
        alias: "widget.formsubmodulemenu",
        margin: "0 0 10 0",
        floating: !0,
        initComponent: function() {
                this.items = [];
                var e = [],
                t = this.module.moduleSubToolbar;
                for (var i in t) {
                        var o = this.getModuleButtonWithSingle(t[i].tf_subMoudleName, t[i].tf_openInWindow, this.window);
                        t[i].tf_inSubMenu ? (o.isMenu = !0, e.push(o)) : this.items.push(o)
                }
                e.length > 0 && this.items.push({
                        text: "\u66f4\u591a",
                        menu: e
                }),
                this.callParent(arguments)
        },
        getModuleButtonWithSingle: function(e, t, i) {
                var o = Jfok.modules.getModule(e);
                if (!o) return null;
                if (!o.tf_userRole || !o.tf_userRole.tf_allowBrowse) return null;
                var n = {
                        text: o.tf_shortname ? o.tf_shortname: o.tf_title,
                        icon: o.iconURL,
                        moduleName: o.tf_moduleName,
                        formChildButton: !0,
                        openInWindow: t,
                        window: i
                };
                return n
        }
}),
Ext.define("Jfok.m.w.GridGroupCombo", {
        extend: "Ext.form.field.ComboBox",
        alias: "widget.gridgroupcombo",
        fieldLabel: "\u5206\u7ec4",
        editable: !1,
        labelWidth: 40,
        labelAlign: "right",
        width: 160,
        queryMode: "local",
        displayField: "title",
        valueField: "id",
        initComponent: function() {
                var e = [];
                e.push({
                        id: "none",
                        title: "\u53d6\u6d88\u5206\u7ec4"
                });
                for (var t in this.modulePanel.module.moduleFields) {
                        var i = this.modulePanel.module.moduleFields[t];
                        i.g && e.push({
                                id: i.manytoone_IdName ? i.manytoone_TitleName: i.tf_fieldName,
                                title: i.tf_title
                        })
                }
                this.store = Ext.create("Ext.data.Store", {
                        fields: ["id", "title"],
                        data: e
                }),
                e.length > 0 && (this.value = e[0].id),
                1 == e.length && (this.hidden = !0),
                this.callParent(arguments)
        }
}),
Ext.define("Jfok.m.w.GridSchemeCombo", {
        extend: "Ext.form.field.ComboBox",
        alias: "widget.gridschemecombo",
        fieldLabel: "\u65b9\u6848",
        editable: !1,
        labelWidth: 40,
        labelAlign: "right",
        width: 200,
        queryMode: "local",
        displayField: "tf_schemeName",
        valueField: "tf_schemeOrder",
        initComponent: function() {
                var e = this.modulePanel.module.moduleGridSchemes;
                this.store = Ext.create("Ext.data.Store", {
                        fields: ["tf_schemeOrder", "tf_schemeName"],
                        data: e
                }),
                this.value = e[0].tf_schemeOrder,
                1 == e.length && (this.hidden = !0),
                this.callParent(arguments)
        }
}),
Ext.define("Jfok.m.w.GridSearchField", {
        extend: "Ext.ux.form.SearchField",
        alias: "widget.gridsearchfield",
        focusWidth: 120,
        blurWidth: 60,
        listeners: {
                focus: function(e) {
                        e.getEl().animate({
                                to: {
                                        width: e.focusWidth
                                },
                                listeners: {
                                        afteranimate: function() {
                                                e.setWidth(e.focusWidth)
                                        }
                                }
                        })
                },
                blur: function(e) {
                        0 == e.getValue().length && e.getEl().animate({
                                to: {
                                        width: e.blurWidth
                                },
                                listeners: {
                                        afteranimate: function() {
                                                e.setWidth(e.blurWidth)
                                        }
                                }
                        })
                }
        }
}),
Ext.define("Jfok.m.w.GridSettingMenu", {
        extend: "Ext.menu.Menu",
        alias: "widget.gridsettingmenu",
        margin: "0 0 10 0",
        floating: !0,
        initComponent: function() {
                this.items = [{
                        text: "\u81ea\u52a8\u8c03\u6574\u5217\u5bbd",
                        itemId: "autocolumnwidth",
                        icon: "images/button/autosize.png"
                },
                {
                        text: "\u4fdd\u5b58\u5f53\u524d\u5217\u5bbd",
                        disabled: !0,
                        itemId: "savecolumnwidth"
                },
                {
                        text: "\u4fdd\u5b58\u5f53\u524d\u5217\u987a\u5e8f",
                        disabled: !0,
                        itemId: "savecolumnorder"
                }],
                this.modulegrid.allowDragToNavigate && this.modulegrid.module.tf_orderField && (this.items.push("-"), this.items.push({
                        text: "\u4fdd\u5b58\u5f53\u524d\u8bb0\u5f55\u987a\u5e8f\u53f7",
                        tooltip: "\u6839\u636e\u5f53\u524d\u7684\u8bb0\u5f55\u7684\u62d6\u653e\u987a\u5e8f\u4fdd\u5b58\u987a\u5e8f\u53f7\u3002",
                        itemId: "saverecordorder",
                        disabled: !0
                }));
                var e = this.modulegrid.module;
                e.tf_userRole.tf_allowInsert && e.tf_allowInsertExcel && (this.items.push("-"), this.items.push({
                        text: "\u4e0b\u8f7d\u7528\u4e8e\u65b0\u589e\u7684Excel\u8868",
                        tooltip: '\u5bf9\u6709\u5927\u6279\u91cf\u6570\u636e\u9700\u8981\u901a\u8fc7Excel\u5bfc\u5165\u7cfb\u7edf\uff0c\u5219\u4e0b\u8f7d\u6b64\u8868\uff0c\u6309\u7167\u8868\u4e2d\u7684\u8981\u6c42\u6dfb\u5165\u6570\u636e\uff0c\u7136\u540e\u5728\u65b0\u589e\u6309\u94ae\u4e0b\u9009\u62e9"Excel\u5bfc\u5165\u65b0\u589e"\u3002',
                        itemId: "downloadinsertexcel"
                })),
                this.callParent(arguments)
        }
}),
Ext.define("Jfok.m.w.PayoutActionColumn", {
        extend: "Ext.grid.column.Action",
        alias: "widget.payoutactioncolumn",
        dataIndex: "tf_payoutStatus",
        text: "\u652f<br/>\u4ed8",
        align: "center",
        menuDisabled: !0,
        sortable: !0,
        resizable: !1,
        getClass: function(e, t, i) {
                return i.getIdValue() ? "\u53ef\u652f\u4ed8" == i.get("tf_payoutStatus") ? "can_payout": "\u5df2\u652f\u4ed8\u5b8c\u6210" == i.get("tf_payoutStatus") ? "already_payout": "not_payout": null
        },
        getTip: function(e, t, i) {
                return i.getIdValue() ? i.get("tf_payoutStatus") : null
        },
        handler: function(e, t) {
                var i = e.getStore().getAt(t),
                o = e.getSelectionModel();
                if (o.select(i), e.up("modulepanel")) {
                        var n = e.up("modulepanel").down("button#payout");
                        n && n.fireEvent("click", n)
                }
        }
}),
Ext.define("Jfok.m.chart.AreaChart", {
        extend: "Ext.chart.Chart",
        alias: "widget.areachart",
        border: 1,
        shadow: !0,
        initComponent: function() {
                var e = this;
                this.axes = [{
                        type: "Numeric",
                        position: "left",
                        fields: this.numericField,
                        title: this.numericTitle,
                        minimum: 0,
                        label: {
                                renderer: Ext.util.Format.numberRenderer("0,0")
                        },
                        minorTickSteps: 4,
                        grid: this.grid
                },
                {
                        type: "Category",
                        position: "bottom",
                        fields: this.categoryField,
                        title: this.categoryTitle
                }],
                this.series = [{
                        type: "area",
                        axis: "left",
                        highlight: !0,
                        xField: this.categoryField,
                        yField: this.numericField,
                        title: this.numericTitle,
                        label: {
                                display: "insideEnd",
                                "text-anchor": "middle",
                                field: this.numericField,
                                renderer: Ext.util.Format.numberRenderer("0"),
                                orientation: "vertical",
                                color: "#333"
                        },
                        tips: {
                                trackMouse: !0,
                                width: 300,
                                height: 22,
                                renderer: function(t, i) {
                                        this.setTitle(t.get(e.categoryField) + ": " + t.get(i.yField))
                                }
                        }
                }],
                Ext.isArray(this.numericTitle) && (this.legend = {
                        position: "right"
                }),
                this.showDetailNumber || delete this.series[0].label,
                this.showTips || delete this.series[0].tips,
                this.callParent(arguments)
        }
}),
Ext.define("Jfok.m.chart.BarChart", {
        extend: "Ext.chart.Chart",
        alias: "widget.barchart",
        border: 1,
        shadow: !0,
        initComponent: function() {
                var e = this;
                this.axes = [{
                        type: "Numeric",
                        position: "bottom",
                        fields: this.numericField,
                        title: this.numericTitle,
                        minimum: 0,
                        label: {
                                renderer: Ext.util.Format.numberRenderer("0,0")
                        },
                        minorTickSteps: 4,
                        grid: this.grid
                },
                {
                        type: "Category",
                        position: "left",
                        fields: this.categoryField,
                        title: this.categoryTitle
                }],
                this.series = [{
                        type: "bar",
                        axis: "bottom",
                        highlight: !0,
                        xField: this.categoryField,
                        yField: this.numericField,
                        title: this.numericTitle,
                        label: {
                                display: "insideEnd",
                                "text-anchor": "middle",
                                field: this.numericField,
                                renderer: Ext.util.Format.numberRenderer("0"),
                                color: "#333"
                        },
                        tips: {
                                trackMouse: !0,
                                width: 300,
                                height: 22,
                                renderer: function(t, i) {
                                        this.setTitle(t.get(e.categoryField) + ": " + t.get(i.yField))
                                }
                        }
                }],
                Ext.isArray(this.numericTitle) && (this.legend = {
                        position: "right"
                }),
                this.showDetailNumber || delete this.series[0].label,
                this.showTips || delete this.series[0].tips,
                this.callParent(arguments)
        }
}),
Ext.define("Jfok.m.chart.ColumnChart", {
        extend: "Ext.chart.Chart",
        alias: "widget.columnchart",
        border: 1,
        shadow: !0,
        initComponent: function() {
                var e = this;
                this.axes = [{
                        type: "Numeric",
                        position: "left",
                        fields: this.numericField,
                        title: this.numericTitle,
                        minimum: 0,
                        label: {
                                renderer: Ext.util.Format.numberRenderer("0,0")
                        },
                        minorTickSteps: 4,
                        grid: this.grid
                },
                {
                        type: "Category",
                        position: "bottom",
                        fields: this.categoryField,
                        title: this.categoryTitle
                }],
                this.series = [{
                        type: "column",
                        axis: "left",
                        highlight: !0,
                        xField: this.categoryField,
                        yField: this.numericField,
                        title: this.numericTitle,
                        label: {
                                display: "insideEnd",
                                "text-anchor": "middle",
                                field: this.numericField,
                                renderer: Ext.util.Format.numberRenderer("0"),
                                orientation: "vertical",
                                color: "#333"
                        },
                        tips: {
                                trackMouse: !0,
                                width: 300,
                                height: 22,
                                renderer: function(t, i) {
                                        this.setTitle(t.get(e.categoryField) + ": " + t.get(i.yField))
                                }
                        }
                }],
                Ext.isArray(this.numericTitle) && (this.legend = {
                        position: "right"
                }),
                this.showDetailNumber || delete this.series[0].label,
                this.showTips || delete this.series[0].tips,
                this.callParent(arguments)
        }
}),
Ext.define("Jfok.m.chart.LineChart", {
        extend: "Ext.chart.Chart",
        alias: "widget.linechart",
        border: 1,
        shadow: !0,
        initComponent: function() {
                if (this.axes = [{
                        type: "Numeric",
                        position: "left",
                        fields: this.numericField,
                        title: this.numericTitle,
                        minimum: 0,
                        label: {
                                renderer: Ext.util.Format.numberRenderer("0,0")
                        },
                        minorTickSteps: 4,
                        grid: this.grid
                },
                {
                        type: "Category",
                        position: "bottom",
                        fields: this.categoryField,
                        title: this.categoryTitle
                }], Ext.isArray(this.numericTitle)) {
                        this.series = [];
                        for (var e = 0; e < this.numericTitle.length; e++) this.series.push({
                                type: "line",
                                axis: "left",
                                highlight: !0,
                                xField: this.categoryField,
                                yField: this.numericField[e],
                                title: this.numericTitle[e]
                        });
                        this.legend = {
                                position: "right"
                        }
                } else this.series = [{
                        type: "line",
                        axis: "left",
                        highlight: !0,
                        xField: this.categoryField,
                        yField: this.numericField,
                        title: this.numericTitle
                }];
                this.showDetailNumber || delete this.series[0].label,
                this.showTips || delete this.series[0].tips,
                this.callParent(arguments)
        }
}),
Ext.define("Jfok.m.chart.PieChart", {
        extend: "Ext.chart.Chart",
        alias: "widget.piechart",
        border: 1,
        shadow: !0,
        initComponent: function() {
                var e = this;
                Ext.isArray(this.numericField) && (this.numericField = this.numericField[0]),
                this.series = [{
                        type: "pie",
                        highlight: !0,
                        showInLegend: !0,
                        field: this.numericField,
                        label: {
                                display: "rotate",
                                "text-anchor": "middle",
                                field: this.categoryField,
                                contrast: !0,
                                color: "#333"
                        },
                        tips: {
                                trackMouse: !0,
                                width: 300,
                                height: 22,
                                renderer: function(t) {
                                        var i = 0;
                                        e.store.each(function(t) {
                                                i += t.get(e.numericField)
                                        }),
                                        console.log(i),
                                        this.setTitle(t.get(e.categoryField) + ": " + Math.round(t.get(e.numericField) / i * 100) + "%")
                                }
                        }
                }],
                this.legend = {
                        position: "right"
                },
                this.callParent(arguments)
        }
}),
Ext.define("Jfok.m.chart.CategoryCombo", {
        extend: "Ext.form.field.ComboBox",
        alias: "widget.categorycombo",
        forceSelection: !0,
        editable: !1,
        allowBlank: !1,
        displayField: "tf_title",
        valueField: "tf_fieldName",
        queryMode: "local",
        initComponent: function() {
                var e = [];
                Ext.each(this.module.moduleFields,
                function(t) {
                        t.cc && e.push({
                                tf_fieldName: t.tf_fieldName,
                                tf_title: t.tf_title.replace(new RegExp("--", "gm"), "")
                        })
                }),
                this.store = Ext.create("Ext.data.Store", {
                        fields: ["tf_fieldName", "tf_title"],
                        data: e
                }),
                e.length > 0 && (this.value = e[0].tf_fieldName),
                this.callParent(arguments)
        }
}),
Ext.define("Jfok.m.chart.NumericCombo", {
        extend: "Jfok.lib.BoxSelect",
        alias: "widget.numericcombo",
        forceSelection: !0,
        filterPickList: !0,
        editable: !1,
        allowBlank: !1,
        triggerAction: "all",
        displayField: "tf_title",
        valueField: "tf_fieldName",
        queryMode: "local",
        stacked: !0,
        delimiter: ",",
        initComponent: function() {
                var e = [];
                Ext.each(this.module.moduleFields,
                function(t) {
                        t.cn && e.push({
                                tf_fieldName: t.tf_fieldName,
                                tf_title: t.tf_title.replace(new RegExp("--", "gm"), "")
                        })
                }),
                this.store = Ext.create("Ext.data.Store", {
                        fields: ["tf_fieldName", "tf_title"],
                        data: e
                }),
                e.length > 0 && (this.value = e[0].tf_fieldName),
                this.callParent(arguments)
        }
}),
Ext.define("Jfok.r.chart.CategoryCombo", {
        extend: "Ext.form.field.ComboBox",
        alias: "widget.reportcategorycombo",
        forceSelection: !0,
        editable: !1,
        allowBlank: !1,
        displayField: "tf_title",
        valueField: "tf_fieldName",
        queryMode: "local",
        initComponent: function() {
                var e = [];
                this.grid.isGrouped && e.push({
                        tf_fieldName: "_total_",
                        tf_title: "\u5206\u7ec4\u9879\u76ee"
                }),
                Ext.Array.forEach(this.grid.groupAndFields,
                function(t) {
                        Ext.Array.forEach(t.fields,
                        function(t) {
                                "Double" != t.fieldType && "Integer" != t.fieldType && "Percent" != t.fieldType && "Float" != t.fieldType && e.push({
                                        tf_fieldName: t.dataIndex,
                                        tf_title: t.text.replace(new RegExp("--", "gm"), "")
                                })
                        })
                }),
                this.store = Ext.create("Ext.data.Store", {
                        fields: ["tf_fieldName", "tf_title"],
                        data: e
                }),
                e.length > 0 && (this.value = e[0].tf_fieldName),
                this.callParent(arguments)
        }
}),
Ext.define("Jfok.r.chart.NumericCombo", {
        extend: "Jfok.lib.BoxSelect",
        alias: "widget.reportnumericcombo",
        forceSelection: !0,
        filterPickList: !0,
        editable: !1,
        allowBlank: !1,
        triggerAction: "all",
        displayField: "tf_title",
        valueField: "tf_fieldName",
        queryMode: "local",
        stacked: !0,
        delimiter: ",",
        initComponent: function() {
                var e = [];
                this.grid.isGrouped && e.push({
                        tf_fieldName: "_count_",
                        tf_title: "\u8bb0\u5f55\u6570"
                }),
                Ext.Array.forEach(this.grid.groupAndFields,
                function(t) {
                        Ext.Array.forEach(t.fields,
                        function(t) { ("Double" == t.fieldType || "Integer" == t.fieldType || "Percent" == t.fieldType || "Float" == t.fieldType) && e.push({
                                        tf_fieldName: t.dataIndex,
                                        tf_title: t.text.replace(new RegExp("--", "gm"), "")
                                })
                        })
                }),
                this.store = Ext.create("Ext.data.Store", {
                        fields: ["tf_fieldName", "tf_title"],
                        data: e
                }),
                e.length > 0 && (this.value = e[0].tf_fieldName),
                this.callParent(arguments)
        }
}),
Ext.define("Jfok.m.additionFunction.RoleSetPopedom", {
        extend: "Ext.window.Window",
        width: 900,
        layout: "fit",
        modal: !0,
        buttonText: null,
        selectRecord: null,
        initComponent: function() {
                this.height = .9 * document.body.clientHeight;
                var e = this;
                this.title = this.buttonText + "\u300e\u89d2\u8272\uff1a" + this.selectRecord.get("tf_roleName") + "\u300f",
                this.items = [{
                        xtype: "form",
                        autoScroll: !0,
                        bodyPadding: "5 5 5 5",
                        buttonAlign: "center",
                        buttons: [{
                                text: "\u4fdd\u5b58",
                                itemId: "save",
                                icon: "images/button/save.png",
                                scope: this,
                                handler: function() {
                                        var e = [],
                                        t = "";
                                        for (var i in this.formdata) {
                                                var o = this.formdata[i];
                                                for (var n in o.popedoms) {
                                                        var a = o.popedoms[n],
                                                        l = a.tf_moduleId,
                                                        r = {
                                                                tf_moduleId: a.tf_moduleId
                                                        };
                                                        r.tf_allowBrowse = this.down("[name=_" + l + "_browse]").getValue(),
                                                        null != a.tf_allowInsert && (r.tf_allowInsert = this.down("[name=_" + l + "_insert]").getValue()),
                                                        null != a.tf_allowEdit && (r.tf_allowEdit = this.down("[name=_" + l + "_edit]").getValue()),
                                                        null != a.tf_allowDelete && (r.tf_allowDelete = this.down("[name=_" + l + "_delete]").getValue()),
                                                        null != a.tf_allowAuditing && (r.tf_allowAuditing = this.down("[name=_" + l + "_auditing]").getValue()),
                                                        null != a.tf_allowApprove && (r.tf_allowApprove = this.down("[name=_" + l + "_approve]").getValue()),
                                                        null != a.tf_allowEditDirect && (r.tf_allowEditDirect = this.down("[name=_" + l + "_editDirect]").getValue()),
                                                        null != a.tf_allowPayment && (r.tf_allowPayment = this.down("[name=_" + l + "_payment]").getValue()),
                                                        null != a.tf_additionBrowse && (r.tf_additionBrowse = this.down("[name=_" + l + "_additionBrowse]").getValue(), r.tf_additionInsert = this.down("[name=_" + l + "_additionInsert]").getValue(), r.tf_additionEdit = this.down("[name=_" + l + "_additionEdit]").getValue(), r.tf_additionDelete = this.down("[name=_" + l + "_additionDelete]").getValue()),
                                                        e.push(r);
                                                        var d = this;
                                                        a.additionFunctions && Ext.each(a.additionFunctions,
                                                        function(e) {
                                                                d.down("[name=_" + l + "_" + e.id + "]").getValue() && (t += e.id + ",")
                                                        })
                                                }
                                        }
                                        Ext.Ajax.request({
                                                scope: this,
                                                url: "role/saverolepopedoms.do",
                                                params: {
                                                        roleId: this.selectRecord.get("tf_roleId"),
                                                        formdata: Ext.encode(e),
                                                        additionids: t
                                                },
                                                success: function() {
                                                        Jfok.system.smileInfo(this.title + "\u7684\u4fee\u6539\u5df2\u4fdd\u5b58!"),
                                                        this.hide()
                                                },
                                                failure: function() {
                                                        window.alert(this.title + "\u4fdd\u5b58\u5931\u8d25!")
                                                }
                                        })
                                }
                        },
                        {
                                text: "\u5173\u95ed",
                                icon: "images/button/return.png",
                                scope: this,
                                handler: function() {
                                        this.hide()
                                }
                        }]
                }],
                Ext.Ajax.request({
                        async: !1,
                        url: "role/getrolepopedoms.do",
                        params: {
                                roleId: this.selectRecord.get("tf_roleId")
                        },
                        success: function(t) {
                                e.formdata = Ext.decode(t.responseText)
                        }
                }),
                this.listeners = {
                        render: function() {
                                e.createForm()
                        }
                },
                this.callParent(arguments)
        },
        createForm: function() {
                for (var e in this.formdata) {
                        var t = this.formdata[e],
                        i = new Ext.form.FieldSet({
                                title: t.tf_title,
                                collapsible: !0
                        });
                        for (var o in t.popedoms) {
                                var n = t.popedoms[o];
                                i.add(this.getFieldContainer(n))
                        }
                        this.down("form").add(i)
                }
        },
        getFieldContainer: function(e) {
                var t = Ext.widget("fieldcontainer", {
                        layout: "vbox",
                        margin: "0 0 0 0"
                }),
                i = Ext.widget("fieldcontainer", {
                        layout: "hbox",
                        defaults: {
                                width: 100
                        }
                });
                t.add(i);
                var o = Ext.widget("checkbox", {
                        fieldLabel: e.tf_title,
                        labelAlign: "right",
                        labelWidth: 120,
                        width: 225,
                        moduleId: e.tf_moduleId,
                        name: "_" + e.tf_moduleId + "_browse",
                        checked: e.tf_allowBrowse,
                        boxLabel: "\u53ef\u6d4f\u89c8",
                        listeners: {
                                change: function(t, i) {
                                        Ext.each(t.up("form").query("[moduleId=" + e.tf_moduleId + "]"),
                                        function(e) {
                                                e != t && (!i || i && -1 == e.name.indexOf("_editDirect")) && e.setValue(i)
                                        })
                                }
                        }
                });
                if (i.add(o), null != e.tf_allowInsert) {
                        var n = Ext.widget("checkbox", {
                                name: "_" + e.tf_moduleId + "_insert",
                                checked: e.tf_allowInsert,
                                moduleId: e.tf_moduleId,
                                boxLabel: "\u53ef\u65b0\u589e"
                        });
                        i.add(n)
                } else i.add({
                        xtype: "tbspacer"
                });
                if (null != e.tf_allowEdit) {
                        var a = Ext.widget("checkbox", {
                                name: "_" + e.tf_moduleId + "_edit",
                                checked: e.tf_allowEdit,
                                moduleId: e.tf_moduleId,
                                boxLabel: "\u53ef\u4fee\u6539"
                        });
                        i.add(a)
                }
                if (null != e.tf_allowDelete) {
                        var l = Ext.widget("checkbox", {
                                name: "_" + e.tf_moduleId + "_delete",
                                checked: e.tf_allowDelete,
                                moduleId: e.tf_moduleId,
                                boxLabel: "\u53ef\u5220\u9664"
                        });
                        i.add(l)
                }
                if (null != e.tf_allowAuditing) {
                        var l = Ext.widget("checkbox", {
                                name: "_" + e.tf_moduleId + "_auditing",
                                checked: e.tf_allowAuditing,
                                moduleId: e.tf_moduleId,
                                boxLabel: "\u53ef\u5ba1\u6838"
                        });
                        i.add(l)
                }
                if (null != e.tf_allowApprove) {
                        var l = Ext.widget("checkbox", {
                                name: "_" + e.tf_moduleId + "_approve",
                                checked: e.tf_allowApprove,
                                moduleId: e.tf_moduleId,
                                boxLabel: "\u53ef\u5ba1\u6279"
                        });
                        i.add(l)
                }
                if (null != e.tf_allowEditDirect) {
                        var r = Ext.widget("checkbox", {
                                name: "_" + e.tf_moduleId + "_editDirect",
                                checked: e.tf_allowEditDirect,
                                moduleId: e.tf_moduleId,
                                boxLabel: "\u76f4\u63a5\u4fee\u6539"
                        });
                        i.add(r)
                }
                if (null != e.tf_allowPayment) {
                        var l = Ext.widget("checkbox", {
                                name: "_" + e.tf_moduleId + "_payment",
                                checked: e.tf_allowPayment,
                                moduleId: e.tf_moduleId,
                                boxLabel: "\u53ef\u652f\u4ed8"
                        });
                        i.add(l)
                }
                if (null != e.tf_additionBrowse) {
                        var d = this.getHboxContainer();
                        t.add(d),
                        d.add({
                                name: "_" + e.tf_moduleId + "_additionBrowse",
                                checked: e.tf_additionBrowse,
                                moduleId: e.tf_moduleId,
                                boxLabel: "\u9644\u4ef6\u6d4f\u89c8"
                        }),
                        d.add({
                                name: "_" + e.tf_moduleId + "_additionInsert",
                                checked: e.tf_additionInsert,
                                moduleId: e.tf_moduleId,
                                boxLabel: "\u9644\u4ef6\u65b0\u589e"
                        }),
                        d.add({
                                name: "_" + e.tf_moduleId + "_additionEdit",
                                checked: e.tf_additionEdit,
                                moduleId: e.tf_moduleId,
                                boxLabel: "\u9644\u4ef6\u4fee\u6539"
                        }),
                        d.add({
                                name: "_" + e.tf_moduleId + "_additionDelete",
                                checked: e.tf_additionDelete,
                                moduleId: e.tf_moduleId,
                                boxLabel: "\u9644\u4ef6\u5220\u9664"
                        })
                }
                var s = this;
                if (e.additionFunctions) {
                        var d, u = 0;
                        Ext.each(e.additionFunctions,
                        function(i) {
                                0 == u && (d = s.getHboxContainer(), t.add(d));
                                var o = Ext.widget("checkbox", {
                                        name: "_" + e.tf_moduleId + "_" + i.id,
                                        checked: i.checked,
                                        moduleId: e.tf_moduleId,
                                        boxLabel: i.title
                                });
                                d.add(o),
                                u += 1,
                                u = 4 == u ? 0 : u
                        }),
                        t.add(d)
                }
                return t
        },
        getHboxContainer: function() {
                return Ext.widget("fieldcontainer", {
                        layout: "hbox",
                        margin: "-10 0 0 0",
                        defaults: {
                                xtype: "checkbox",
                                width: 100
                        },
                        items: [{
                                xtype: "tbspacer",
                                width: 125
                        }]
                })
        }
}),
Ext.define("Jfok.m.additionFunction.SetAdditionFields", {
        extend: "Ext.window.Window",
        width: 350,
        layout: "fit",
        modal: !0,
        buttonText: null,
        module: null,
        selectRecord: null,
        initComponent: function() {
                this.height = .7 * document.body.clientHeight,
                this.module = Jfok.modules.getModule(this.selectRecord.get("tf_moduleName")),
                this.title = this.buttonText + "\u300e\u6a21\u5757\uff1a" + this.module.tf_title + "\u300f",
                this.items = [{
                        xtype: "checktreepanel",
                        rootVisible: !1,
                        buttonAlign: "center",
                        buttons: [{
                                text: "\u4fdd\u5b58",
                                disabled: !0,
                                itemId: "save",
                                icon: "images/button/save.png",
                                scope: this,
                                handler: function(e) {
                                        var t = e.up("treepanel").getView(),
                                        i = [];
                                        t.node.cascadeBy(function(e) {
                                                e.data.leaf && i.push({
                                                        moduleName: e.raw.moduleName,
                                                        checked: e.data.checked,
                                                        tag: e.raw.tag,
                                                        fieldvalue: e.raw.fieldvalue
                                                })
                                        }),
                                        Ext.Ajax.request({
                                                scope: this,
                                                url: "systemframe/saveadditionfields.do",
                                                params: {
                                                        moduleName: this.module.tf_moduleName,
                                                        noderecords: Ext.encode(i)
                                                },
                                                success: function() {
                                                        Jfok.system.smileInfo(this.title + "\u7684\u8bbe\u7f6e\u5df2\u4fdd\u5b58!"),
                                                        e.disable()
                                                },
                                                failure: function() {
                                                        window.alert(this.title + "\u4fdd\u5b58\u5931\u8d25!")
                                                }
                                        })
                                }
                        },
                        {
                                text: "\u5173\u95ed",
                                icon: "images/button/return.png",
                                scope: this,
                                handler: function() {
                                        this.hide()
                                }
                        }],
                        store: new Ext.data.TreeStore({
                                autoLoad: !0,
                                proxy: {
                                        type: "ajax",
                                        url: "systemframe/getalladditionfields.do",
                                        extraParams: {
                                                moduleName: this.module.tf_moduleName
                                        }
                                }
                        })
                }],
                this.callParent(arguments)
        }
}),
Ext.define("Jfok.m.additionFunction.SetDetailGroupFields", {
        extend: "Ext.window.Window",
        width: 350,
        layout: "fit",
        modal: !0,
        buttonText: null,
        selectRecord: null,
        detailId: null,
        initComponent: function() {
                this.height = .7 * document.body.clientHeight,
                this.detailId = this.selectRecord.get("tf_detailId"),
                this.title = this.buttonText + "\u300e\u5206\u7ec4\u540d\u79f0\uff1a" + this.selectRecord.get("tf_schemeName") + "\u300f",
                this.items = [{
                        xtype: "checktreepanel",
                        rootVisible: !1,
                        buttonAlign: "center",
                        buttons: [{
                                text: "\u4fdd\u5b58",
                                disabled: !0,
                                itemId: "save",
                                icon: "images/button/save.png",
                                scope: this,
                                handler: function(e) {
                                        var t = e.up("treepanel").getView(),
                                        i = [];
                                        t.node.cascadeBy(function(e) {
                                                e.data.leaf && i.push({
                                                        moduleName: e.raw.moduleName,
                                                        checked: e.data.checked,
                                                        tag: e.raw.tag,
                                                        fieldvalue: e.raw.fieldvalue
                                                })
                                        }),
                                        Ext.Ajax.request({
                                                scope: this,
                                                url: "systemframe/savedetailgroupfields.do",
                                                params: {
                                                        detailId: this.detailId,
                                                        noderecords: Ext.encode(i)
                                                },
                                                success: function() {
                                                        Jfok.system.smileInfo(this.title + "\u7684\u8bbe\u7f6e\u5df2\u4fdd\u5b58!"),
                                                        e.disable()
                                                },
                                                failure: function() {
                                                        window.alert(this.title + "\u4fdd\u5b58\u5931\u8d25!")
                                                }
                                        })
                                }
                        },
                        {
                                text: "\u5173\u95ed",
                                icon: "images/button/return.png",
                                scope: this,
                                handler: function() {
                                        this.hide()
                                }
                        }],
                        store: new Ext.data.TreeStore({
                                autoLoad: !0,
                                proxy: {
                                        type: "ajax",
                                        url: "systemframe/getdetailgroupfields.do",
                                        extraParams: {
                                                detailId: this.detailId
                                        }
                                }
                        })
                }],
                this.callParent(arguments)
        }
}),
Ext.define("Jfok.m.additionFunction.SetFormGroupFields", {
        extend: "Ext.window.Window",
        width: 350,
        layout: "fit",
        modal: !0,
        buttonText: null,
        selectRecord: null,
        formGroupId: null,
        initComponent: function() {
                this.height = .7 * document.body.clientHeight,
                this.formGroupId = this.selectRecord.get("tf_formGroupId"),
                this.title = this.buttonText + "\u300e\u5206\u7ec4\u540d\u79f0\uff1a" + this.selectRecord.get("tf_formGroupName") + "\u300f",
                this.items = [{
                        xtype: "checktreepanel",
                        rootVisible: !1,
                        buttonAlign: "center",
                        buttons: [{
                                text: "\u4fdd\u5b58",
                                disabled: !0,
                                itemId: "save",
                                icon: "images/button/save.png",
                                scope: this,
                                handler: function(e) {
                                        var t = e.up("treepanel").getView(),
                                        i = [];
                                        t.node.cascadeBy(function(e) {
                                                e.data.leaf && i.push({
                                                        moduleName: e.raw.moduleName,
                                                        checked: e.data.checked,
                                                        tag: e.raw.tag,
                                                        fieldvalue: e.raw.fieldvalue
                                                })
                                        }),
                                        Ext.Ajax.request({
                                                scope: this,
                                                url: "systemframe/saveformgroupfields.do",
                                                params: {
                                                        formGroupId: this.formGroupId,
                                                        noderecords: Ext.encode(i)
                                                },
                                                success: function() {
                                                        Jfok.system.smileInfo(this.title + "\u7684\u8bbe\u7f6e\u5df2\u4fdd\u5b58!"),
                                                        e.disable()
                                                },
                                                failure: function() {
                                                        window.alert(this.title + "\u4fdd\u5b58\u5931\u8d25!")
                                                }
                                        })
                                }
                        },
                        {
                                text: "\u5173\u95ed",
                                icon: "images/button/return.png",
                                scope: this,
                                handler: function() {
                                        this.hide()
                                }
                        }],
                        store: new Ext.data.TreeStore({
                                autoLoad: !0,
                                proxy: {
                                        type: "ajax",
                                        url: "systemframe/getformgroupfields.do",
                                        extraParams: {
                                                formGroupId: this.formGroupId
                                        }
                                }
                        })
                }],
                this.callParent(arguments)
        }
}),
Ext.define("Jfok.m.additionFunction.SetGridGroupFields", {
        extend: "Ext.window.Window",
        width: 350,
        layout: "fit",
        modal: !0,
        buttonText: null,
        selectRecord: null,
        gridGroupId: null,
        initComponent: function() {
                this.height = .7 * document.body.clientHeight,
                this.gridGroupId = this.selectRecord.get("tf_gridGroupId"),
                this.title = this.buttonText + "\u300e\u5206\u7ec4\u540d\u79f0\uff1a" + this.selectRecord.get("tf_gridGroupName") + "\u300f",
                this.items = [{
                        xtype: "checktreepanel",
                        rootVisible: !1,
                        buttonAlign: "center",
                        buttons: [{
                                text: "\u4fdd\u5b58",
                                disabled: !0,
                                itemId: "save",
                                icon: "images/button/save.png",
                                scope: this,
                                handler: function(e) {
                                        var t = e.up("treepanel").getView(),
                                        i = [];
                                        t.node.cascadeBy(function(e) {
                                                e.data.leaf && i.push({
                                                        moduleName: e.raw.moduleName,
                                                        checked: e.data.checked,
                                                        tag: e.raw.tag,
                                                        fieldvalue: e.raw.fieldvalue
                                                })
                                        }),
                                        Ext.Ajax.request({
                                                scope: this,
                                                url: "systemframe/savegridgroupfields.do",
                                                params: {
                                                        gridGroupId: this.gridGroupId,
                                                        noderecords: Ext.encode(i)
                                                },
                                                success: function() {
                                                        Jfok.system.smileInfo(this.title + "\u7684\u8bbe\u7f6e\u5df2\u4fdd\u5b58!"),
                                                        e.disable()
                                                },
                                                failure: function() {
                                                        window.alert(this.title + "\u4fdd\u5b58\u5931\u8d25!")
                                                }
                                        })
                                }
                        },
                        {
                                text: "\u5173\u95ed",
                                icon: "images/button/return.png",
                                scope: this,
                                handler: function() {
                                        this.hide()
                                }
                        }],
                        store: new Ext.data.TreeStore({
                                autoLoad: !0,
                                proxy: {
                                        type: "ajax",
                                        url: "systemframe/getgridgroupfields.do",
                                        extraParams: {
                                                gridGroupId: this.gridGroupId
                                        }
                                }
                        })
                }],
                this.callParent(arguments)
        }
}),
Ext.define("Jfok.m.additionFunction.UserPopedom", {
        extend: "Ext.window.Window",
        width: 900,
        layout: "fit",
        modal: !0,
        selectRecord: null,
        initComponent: function() {
                this.height = .9 * document.body.clientHeight;
                var e = this;
                this.selectRecord && (this.userName = this.selectRecord.get("tf_userName"), this.userId = this.selectRecord.get("tf_userId")),
                this.title = Ext.String.format("\u7528\u6237\u6743\u9650\u300e\u7528\u6237\uff1a{0} \u300f", this.userName),
                this.items = [{
                        xtype: "form",
                        autoScroll: !0,
                        bodyPadding: "5 5 5 5",
                        buttonAlign: "center",
                        buttons: [{
                                text: "\u5173\u95ed",
                                icon: "images/button/return.png",
                                scope: this,
                                handler: function() {
                                        this.hide()
                                }
                        }]
                }],
                Ext.Ajax.request({
                        async: !1,
                        url: "role/getuserpopedoms.do",
                        params: {
                                userId: this.userId
                        },
                        success: function(t) {
                                e.formdata = Ext.decode(t.responseText)
                        }
                }),
                this.listeners = {
                        render: function() {
                                e.createForm()
                        }
                },
                this.callParent(arguments)
        },
        createForm: function() {
                for (var e in this.formdata) {
                        var t = this.formdata[e],
                        i = new Ext.form.FieldSet({
                                title: t.tf_title,
                                collapsible: !0
                        });
                        for (var o in t.popedoms) {
                                var n = t.popedoms[o];
                                i.add(this.getFieldContainer(n))
                        }
                        this.down("form").add(i),
                        Ext.each(i.query("checkbox"),
                        function(e) {
                                e.readOnly = !0
                        })
                }
        },
        getFieldContainer: function(e) {
                var t = Ext.widget("fieldcontainer", {
                        layout: "vbox",
                        margin: "0 0 0 0"
                }),
                i = Ext.widget("fieldcontainer", {
                        layout: "hbox",
                        defaults: {
                                width: 100
                        }
                });
                t.add(i);
                var o = Ext.widget("checkbox", {
                        fieldLabel: e.tf_title,
                        labelAlign: "right",
                        labelWidth: 120,
                        width: 225,
                        moduleId: e.tf_moduleId,
                        name: "_" + e.tf_moduleId + "_browse",
                        checked: e.tf_allowBrowse,
                        boxLabel: "\u53ef\u6d4f\u89c8",
                        listeners: {
                                change: function(t, i) {
                                        Ext.each(t.up("form").query("[moduleId=" + e.tf_moduleId + "]"),
                                        function(e) {
                                                e != t && (!i || i && -1 == e.name.indexOf("_editDirect")) && e.setValue(i)
                                        })
                                }
                        }
                });
                if (i.add(o), null != e.tf_allowInsert) {
                        var n = Ext.widget("checkbox", {
                                name: "_" + e.tf_moduleId + "_insert",
                                checked: e.tf_allowInsert,
                                moduleId: e.tf_moduleId,
                                boxLabel: "\u53ef\u65b0\u589e"
                        });
                        i.add(n)
                } else i.add({
                        xtype: "tbspacer"
                });
                if (null != e.tf_allowEdit) {
                        var a = Ext.widget("checkbox", {
                                name: "_" + e.tf_moduleId + "_edit",
                                checked: e.tf_allowEdit,
                                moduleId: e.tf_moduleId,
                                boxLabel: "\u53ef\u4fee\u6539"
                        });
                        i.add(a)
                }
                if (null != e.tf_allowDelete) {
                        var l = Ext.widget("checkbox", {
                                name: "_" + e.tf_moduleId + "_delete",
                                checked: e.tf_allowDelete,
                                moduleId: e.tf_moduleId,
                                boxLabel: "\u53ef\u5220\u9664"
                        });
                        i.add(l)
                }
                if (null != e.tf_allowAuditing) {
                        var l = Ext.widget("checkbox", {
                                name: "_" + e.tf_moduleId + "_auditing",
                                checked: e.tf_allowAuditing,
                                moduleId: e.tf_moduleId,
                                boxLabel: "\u53ef\u5ba1\u6838"
                        });
                        i.add(l)
                }
                if (null != e.tf_allowApprove) {
                        var l = Ext.widget("checkbox", {
                                name: "_" + e.tf_moduleId + "_approve",
                                checked: e.tf_allowApprove,
                                moduleId: e.tf_moduleId,
                                boxLabel: "\u53ef\u5ba1\u6279"
                        });
                        i.add(l)
                }
                if (null != e.tf_allowEditDirect) {
                        var r = Ext.widget("checkbox", {
                                name: "_" + e.tf_moduleId + "_editDirect",
                                checked: e.tf_allowEditDirect,
                                moduleId: e.tf_moduleId,
                                boxLabel: "\u76f4\u63a5\u4fee\u6539"
                        });
                        i.add(r)
                }
                if (null != e.tf_allowPayment) {
                        var l = Ext.widget("checkbox", {
                                name: "_" + e.tf_moduleId + "_payment",
                                checked: e.tf_allowPayment,
                                moduleId: e.tf_moduleId,
                                boxLabel: "\u53ef\u652f\u4ed8"
                        });
                        i.add(l)
                }
                if (null != e.tf_additionBrowse) {
                        var d = this.getHboxContainer();
                        t.add(d),
                        d.add({
                                name: "_" + e.tf_moduleId + "_additionBrowse",
                                checked: e.tf_additionBrowse,
                                moduleId: e.tf_moduleId,
                                boxLabel: "\u9644\u4ef6\u6d4f\u89c8"
                        }),
                        d.add({
                                name: "_" + e.tf_moduleId + "_additionInsert",
                                checked: e.tf_additionInsert,
                                moduleId: e.tf_moduleId,
                                boxLabel: "\u9644\u4ef6\u65b0\u589e"
                        }),
                        d.add({
                                name: "_" + e.tf_moduleId + "_additionEdit",
                                checked: e.tf_additionEdit,
                                moduleId: e.tf_moduleId,
                                boxLabel: "\u9644\u4ef6\u4fee\u6539"
                        }),
                        d.add({
                                name: "_" + e.tf_moduleId + "_additionDelete",
                                checked: e.tf_additionDelete,
                                moduleId: e.tf_moduleId,
                                boxLabel: "\u9644\u4ef6\u5220\u9664"
                        })
                }
                var s = this;
                if (e.additionFunctions) {
                        var d, u = 0;
                        Ext.each(e.additionFunctions,
                        function(i) {
                                0 == u && (d = s.getHboxContainer(), t.add(d));
                                var o = Ext.widget("checkbox", {
                                        name: "_" + e.tf_moduleId + "_" + i.id,
                                        checked: i.checked,
                                        moduleId: e.tf_moduleId,
                                        boxLabel: i.title
                                });
                                d.add(o),
                                u += 1,
                                u = 4 == u ? 0 : u
                        }),
                        t.add(d)
                }
                return t
        },
        getHboxContainer: function() {
                return Ext.widget("fieldcontainer", {
                        layout: "hbox",
                        margin: "-10 0 0 0",
                        defaults: {
                                xtype: "checkbox",
                                width: 100
                        },
                        items: [{
                                xtype: "tbspacer",
                                width: 125
                        }]
                })
        }
}),
Ext.define("Jfok.m.additionFunction.UserSetFieldHiddenRole", {
        extend: "Ext.window.Window",
        width: 350,
        layout: "fit",
        modal: !0,
        buttonText: null,
        selectRecord: null,
        initComponent: function() {
                this.height = .5 * document.body.clientHeight,
                this.title = this.buttonText + "\u300e\u7528\u6237\uff1a" + this.selectRecord.get("tf_userName") + "\u300f",
                this.items = [{
                        xtype: "checktreepanel",
                        rootVisible: !1,
                        buttonAlign: "center",
                        buttons: [{
                                text: "\u4fdd\u5b58",
                                disabled: !0,
                                itemId: "save",
                                icon: "images/button/save.png",
                                scope: this,
                                handler: function(e) {
                                        var t = e.up("treepanel").getView(),
                                        i = "";
                                        t.node.cascadeBy(function(e) {
                                                e.data.leaf && e.raw.tag && e.data.checked && (i += e.raw.fieldvalue + ",")
                                        }),
                                        Ext.Ajax.request({
                                                scope: this,
                                                url: "user/saveuserfieldhiddenroles.do",
                                                params: {
                                                        userId: this.selectRecord.get("tf_userId"),
                                                        noderecords: i
                                                },
                                                success: function() {
                                                        Jfok.system.smileInfo(this.title + "\u7684\u4fee\u6539\u5df2\u4fdd\u5b58!"),
                                                        e.disable()
                                                },
                                                failure: function() {
                                                        window.alert(this.title + "\u4fdd\u5b58\u5931\u8d25!")
                                                }
                                        })
                                }
                        },
                        {
                                text: "\u5173\u95ed",
                                icon: "images/button/return.png",
                                scope: this,
                                handler: function() {
                                        this.hide()
                                }
                        }],
                        store: new Ext.data.TreeStore({
                                autoLoad: !0,
                                proxy: {
                                        type: "ajax",
                                        url: "user/getuserfieldhiddenroles.do",
                                        extraParams: {
                                                userId: this.selectRecord.get("tf_userId")
                                        }
                                }
                        })
                }],
                this.callParent(arguments)
        }
}),
Ext.define("Jfok.m.additionFunction.UserSetFieldReadonlyRole", {
        extend: "Ext.window.Window",
        width: 350,
        layout: "fit",
        modal: !0,
        buttonText: null,
        selectRecord: null,
        initComponent: function() {
                this.height = .5 * document.body.clientHeight,
                this.title = this.buttonText + "\u300e\u7528\u6237\uff1a" + this.selectRecord.get("tf_userName") + "\u300f",
                this.items = [{
                        xtype: "checktreepanel",
                        rootVisible: !1,
                        buttonAlign: "center",
                        buttons: [{
                                text: "\u4fdd\u5b58",
                                disabled: !0,
                                itemId: "save",
                                icon: "images/button/save.png",
                                scope: this,
                                handler: function(e) {
                                        var t = e.up("treepanel").getView(),
                                        i = "";
                                        t.node.cascadeBy(function(e) {
                                                e.data.leaf && e.raw.tag && e.data.checked && (i += e.raw.fieldvalue + ",")
                                        }),
                                        Ext.Ajax.request({
                                                scope: this,
                                                url: "user/saveuserfieldreadonlyroles.do",
                                                params: {
                                                        userId: this.selectRecord.get("tf_userId"),
                                                        noderecords: i
                                                },
                                                success: function() {
                                                        Jfok.system.smileInfo(this.title + "\u7684\u4fee\u6539\u5df2\u4fdd\u5b58!"),
                                                        e.disable()
                                                },
                                                failure: function() {
                                                        window.alert(this.title + "\u4fdd\u5b58\u5931\u8d25!")
                                                }
                                        })
                                }
                        },
                        {
                                text: "\u5173\u95ed",
                                icon: "images/button/return.png",
                                scope: this,
                                handler: function() {
                                        this.hide()
                                }
                        }],
                        store: new Ext.data.TreeStore({
                                autoLoad: !0,
                                proxy: {
                                        type: "ajax",
                                        url: "user/getuserfieldreadonlyroles.do",
                                        extraParams: {
                                                userId: this.selectRecord.get("tf_userId")
                                        }
                                }
                        })
                }],
                this.callParent(arguments)
        }
}),
Ext.define("Jfok.m.additionFunction.UserSetRole", {
        extend: "Ext.window.Window",
        width: 350,
        layout: "fit",
        modal: !0,
        buttonText: null,
        selectRecord: null,
        initComponent: function() {
                this.height = .7 * document.body.clientHeight,
                this.title = this.buttonText + "\u300e\u7528\u6237\uff1a" + this.selectRecord.get("tf_userName") + "\u300f",
                this.items = [{
                        xtype: "checktreepanel",
                        rootVisible: !1,
                        buttonAlign: "center",
                        buttons: [{
                                text: "\u4fdd\u5b58",
                                disabled: !0,
                                itemId: "save",
                                icon: "images/button/save.png",
                                scope: this,
                                handler: function(e) {
                                        var t = e.up("treepanel").getView(),
                                        i = "";
                                        t.node.cascadeBy(function(e) {
                                                e.data.leaf && e.raw.tag && e.data.checked && (i += e.raw.fieldvalue + ",")
                                        }),
                                        Ext.Ajax.request({
                                                scope: this,
                                                url: "user/saveuserroles.do",
                                                params: {
                                                        userId: this.selectRecord.get("tf_userId"),
                                                        noderecords: i
                                                },
                                                success: function() {
                                                        Jfok.system.smileInfo(this.title + "\u7684\u4fee\u6539\u5df2\u4fdd\u5b58!"),
                                                        e.disable()
                                                },
                                                failure: function() {
                                                        window.alert(this.title + "\u4fdd\u5b58\u5931\u8d25!")
                                                }
                                        })
                                }
                        },
                        {
                                text: "\u5173\u95ed",
                                icon: "images/button/return.png",
                                scope: this,
                                handler: function() {
                                        this.hide()
                                }
                        }],
                        store: new Ext.data.TreeStore({
                                autoLoad: !0,
                                proxy: {
                                        type: "ajax",
                                        url: "user/getuserroles.do",
                                        extraParams: {
                                                userId: this.selectRecord.get("tf_userId")
                                        }
                                }
                        })
                }],
                this.callParent(arguments)
        }
}),
Ext.define("Jfok.m.chart.ChartPanel", {
        extend: "Ext.panel.Panel",
        alias: "widget.chartpanel",
        requires: ["Jfok.m.chart.ColumnChart", "Jfok.m.chart.BarChart", "Jfok.m.chart.LineChart", "Jfok.m.chart.PieChart", "Jfok.m.chart.AreaChart"],
        layout: "border",
        store: null,
        record: null,
        isLoadingRecord: !1,
        initComponent: function() {
                this.module = this.grid.module,
                this.store = this.grid.getSelectionCount() >= 2 ? Ext.create("Ext.data.Store", {
                        model: this.module.model,
                        data: this.grid.getSelection()
                }) : this.grid.store,
                this.chartModule = Jfok.modules.getModule("_ModuleChart"),
                this.chartModel = this.chartModule.model;
                var e = Jfok.modules.getModule("_Module");
                this.chartStore = Ext.create("Ext.data.Store", {
                        panel: this,
                        autoLoad: !0,
                        model: this.chartModel,
                        pageSize: 100,
                        extraParams: {
                                navigates: Ext.encode([{
                                        moduleName: e.tf_moduleName,
                                        tableAsName: e.tableAsName,
                                        primarykey: e.tf_primaryKey,
                                        fieldtitle: this.module.tf_title,
                                        equalsValue: this.module.tf_moduleId,
                                        equalsMethod: null,
                                        text: this.module.tf_title,
                                        isCodeLevel: !1
                                }])
                        },
                        listeners: {
                                beforeload: function(e) {
                                        for (var t in e.extraParams) e.proxy.extraParams[t] = e.extraParams[t]
                                },
                                load: function(e) {
                                        for (var t in e.extraParams) delete e.proxy.extraParams[t];
                                        e.getCount() > 0 && e.panel.setFormData(e.getAt(0)),
                                        e.panel.recreateChart()
                                }
                        }
                }),
                this.listeners = {
                        render: function() {}
                },
                this.items = [{
                        region: "west",
                        width: 360,
                        split: !0,
                        frame: !1,
                        border: !1,
                        collapsible: !0,
                        collapseMode: "mini",
                        tools: [{
                                type: "save",
                                tooltip: "\u4fdd\u5b58\u56fe\u8868\u65b9\u6848\u53c2\u6570"
                        },
                        {
                                type: "plus",
                                tooltip: "\u5c06\u5f53\u524d\u56fe\u8868\u65b9\u6848\u53e6\u5b58\u4e3a\u4e00\u4e2a\u65b0\u7684"
                        },
                        {
                                type: "minus",
                                tooltip: "\u5220\u9664\u5f53\u524d\u56fe\u8868\u65b9\u6848"
                        }],
                        xtype: "form",
                        layout: "fit",
                        title: "\u56fe\u8868\u53c2\u6570\u8bbe\u7f6e",
                        items: [{
                                xtype: "fieldset",
                                title: "\u56fe\u8868\u53c2\u6570\u8bbe\u7f6e",
                                layout: "anchor",
                                margin: "5 5 5 5",
                                defaults: {
                                        labelAlign: "right",
                                        labelWidth: 65,
                                        anchor: "100%"
                                },
                                items: [{
                                        xtype: "combo",
                                        name: "tf_chartId",
                                        displayField: "tf_name",
                                        valueField: "tf_chartId",
                                        fieldLabel: "\u65b9\u6848\u540d\u79f0",
                                        editable: !1,
                                        store: this.chartStore
                                },
                                {
                                        xtype: "textfield",
                                        name: "tf_title",
                                        fieldLabel: "\u65b9\u6848\u6807\u9898",
                                        maxLength: 50,
                                        enforceMaxLength: !0
                                },
                                {
                                        xtype: "categorycombo",
                                        fieldLabel: "\u9879\u76ee\u5185\u5bb9",
                                        module: this.module,
                                        name: "tf_categoryField"
                                },
                                {
                                        xtype: "numericcombo",
                                        fieldLabel: "\u6570\u503c\u5185\u5bb9",
                                        module: this.module,
                                        name: "tf_numericFields",
                                        width: 280
                                },
                                {
                                        xtype: "combo",
                                        forceSelection: !0,
                                        editable: !1,
                                        allowBlank: !1,
                                        displayField: "title",
                                        valueField: "id",
                                        queryMode: "local",
                                        name: "tf_chartType",
                                        fieldLabel: "\u56fe\u8868\u7c7b\u578b",
                                        value: "columnchart",
                                        store: Ext.create("Ext.data.Store", {
                                                fields: ["id", "title"],
                                                data: [{
                                                        id: "columnchart",
                                                        title: "\u67f1\u72b6\u56fe"
                                                },
                                                {
                                                        id: "barchart",
                                                        title: "\u6761\u72b6\u56fe"
                                                },
                                                {
                                                        id: "linechart",
                                                        title: "\u6298\u7ebf\u56fe"
                                                },
                                                {
                                                        id: "piechart",
                                                        title: "\u997c\u72b6\u56fe"
                                                },
                                                {
                                                        id: "areachart",
                                                        title: "\u9762\u79ef\u56fe"
                                                }]
                                        })
                                },
                                {
                                        xtype: "combo",
                                        forceSelection: !0,
                                        editable: !1,
                                        allowBlank: !1,
                                        displayField: "title",
                                        valueField: "id",
                                        queryMode: "local",
                                        name: "tf_colorScheme",
                                        fieldLabel: "\u914d\u8272\u65b9\u6848",
                                        value: "Base",
                                        store: Ext.create("Ext.data.Store", {
                                                fields: ["id", "title"],
                                                data: [{
                                                        id: "Base",
                                                        title: "\u9ed8\u8ba4"
                                                },
                                                {
                                                        id: "Sky",
                                                        title: "\u6df1\u9752\u8272"
                                                },
                                                {
                                                        id: "Red",
                                                        title: "\u8fa3\u6912\u7ea2"
                                                },
                                                {
                                                        id: "Purple",
                                                        title: "\u8461\u8404\u7d2b"
                                                },
                                                {
                                                        id: "Blue",
                                                        title: "\u591c\u7a7a\u84dd"
                                                },
                                                {
                                                        id: "Yellow",
                                                        title: "\u6d45\u8910\u8272"
                                                },
                                                {
                                                        id: "Category1",
                                                        title: "\u592a\u4e0a\u9ec4"
                                                },
                                                {
                                                        id: "Category2",
                                                        title: "\u6625\u5929\u7eff"
                                                },
                                                {
                                                        id: "Category3",
                                                        title: "\u6a58\u9ec4\u8272"
                                                },
                                                {
                                                        id: "Category4",
                                                        title: "\u8349\u9709\u7ea2"
                                                },
                                                {
                                                        id: "Category5",
                                                        title: "\u4eae\u7eff\u8272"
                                                },
                                                {
                                                        id: "Category6",
                                                        title: "\u5929\u7a7a\u84dd"
                                                }]
                                        })
                                },
                                {
                                        xtype: "fieldcontainer",
                                        layout: "hbox",
                                        defaults: {
                                                labelAlign: "right",
                                                labelWidth: 65,
                                                flex: 1
                                        },
                                        items: [{
                                                xtype: "checkbox",
                                                fieldLabel: "\u663e\u793a\u6570\u503c",
                                                name: "tf_isShowDetailNumber"
                                        },
                                        {
                                                xtype: "checkbox",
                                                fieldLabel: "\u63d0\u793a\u4fe1\u606f",
                                                name: "tf_isShowTips"
                                        }]
                                },
                                {
                                        xtype: "fieldcontainer",
                                        layout: "hbox",
                                        defaults: {
                                                labelAlign: "right",
                                                labelWidth: 65,
                                                flex: 1
                                        },
                                        items: [{
                                                xtype: "checkbox",
                                                fieldLabel: "\u52a8\u753b\u5c55\u793a",
                                                name: "tf_isAnimate"
                                        },
                                        {
                                                xtype: "checkbox",
                                                checked: !0,
                                                fieldLabel: "\u5b9a\u4f4d\u7ebf",
                                                name: "tf_isGridLine"
                                        }]
                                }]
                        }]
                },
                {
                        itemId: "_chartowner",
                        xtype: "panel",
                        region: "center",
                        frame: !1,
                        border: !0,
                        layout: "fit",
                        tbar: ["->", {
                                xtype: "label",
                                itemId: "titlelabel",
                                text: "",
                                style: "font-size : 15px;"
                        },
                        "->"]
                }],
                this.callParent(arguments)
        },
        setFormData: function(e) {
                this.record = e,
                this.isLoadingRecord = !0,
                this.down("form").loadRecord(this.record),
                this.isLoadingRecord = !1
        },
        recreateChart: function() {
                if (1 != this.isLoadingRecord) {
                        var e = this,
                        t = this.down("#_chartowner"),
                        i = this.down("form").getForm(),
                        o = i.findField("tf_categoryField").getValue(),
                        n = i.findField("tf_numericFields").getValue(),
                        a = {
                                store: this.store,
                                showDetailNumber: i.findField("tf_isShowDetailNumber").getValue(),
                                showTips: i.findField("tf_isShowTips").getValue(),
                                animate: i.findField("tf_isAnimate").getValue(),
                                theme: i.findField("tf_colorScheme").getValue(),
                                grid: i.findField("tf_isGridLine").getValue(),
                                margin: "10 10 10 10"
                        };
                        if (Ext.each(this.module.moduleFields,
                        function(e) {
                                e.tf_fieldName == o && Ext.apply(a, {
                                        categoryField: e.manytoone_TitleName || e.tf_fieldName,
                                        categoryTitle: e.tf_title.replace(new RegExp("--", "gm"), "")
                                })
                        }), 1 === n.length) Ext.each(this.module.moduleFields,
                        function(e) {
                                e.tf_fieldName == n && Ext.apply(a, {
                                        numericField: e.tf_fieldName,
                                        numericTitle: e.tf_title.replace(new RegExp("--", "gm"), "")
                                })
                        });
                        else {
                                var l = [],
                                r = [];
                                Ext.each(n,
                                function(t) {
                                        Ext.each(e.module.moduleFields,
                                        function(e) {
                                                e.tf_fieldName == t && (l.push(e.tf_fieldName), r.push(e.tf_title.replace(new RegExp("--", "gm"), "")))
                                        })
                                }),
                                Ext.apply(a, {
                                        numericField: l,
                                        numericTitle: r
                                })
                        }
                        t.removeAll(!0),
                        t.add(Ext.widget(i.findField("tf_chartType").getValue(), a))
                }
        }
}),
Ext.define("Jfok.m.chart.ChartWindow", {
        extend: "Ext.window.Window",
        alias: "widget.chartwindow",
        height: 600,
        width: 800,
        layout: "fit",
        icon: "images/button/chart_bar.png",
        maximizable: !0,
        grid: void 0,
        initComponent: function() {
                this.title = this.grid.module.tf_title,
                this.items = [{
                        frame: !1,
                        border: !1,
                        xtype: "chartpanel",
                        grid: this.grid
                }],
                this.callParent(arguments)
        }
}),
Ext.define("Jfok.m.factory.ColumnsFactory", {
        statics: {
                getColumns: function(module, schemeOrderId) {
                        var scheme = module.getGridScheme(schemeOrderId),
                        columns = [];
                        module.tf_hasAddition && module.tf_userRole.tf_additionBrowse && columns.push({
                                locked: !0,
                                xtype: "attachmentnumbercolumn",
                                width: "neptune" === Ext.themeName ? 36 : 28
                        }),
                        module.tf_hasAuditing && columns.push({
                                locked: !0,
                                xtype: "auditingactioncolumn",
                                width: "neptune" === Ext.themeName ? 36 : 28
                        }),
                        module.tf_hasApprove && columns.push({
                                locked: !0,
                                xtype: "approveactioncolumn",
                                width: "neptune" === Ext.themeName ? 36 : 28
                        }),
                        module.tf_hasPayment && columns.push({
                                locked: !0,
                                xtype: "payoutactioncolumn",
                                width: "neptune" === Ext.themeName ? 36 : 28
                        }),
                        "_Addition" == module.tf_moduleName && columns.push({
                                dataIndex: "tf_additionId",
                                text: "\u9884\u89c8",
                                align: "center",
                                menuDisabled: !0,
                                sortable: !0,
                                width: 56,
                                resizable: !1,
                                renderer: function(e, t, i) {
                                        return i.get("tf_filename") ? '<img height="16" width="16" src="attachment/preview.do?id=' + i.get("tf_additionId") + '" />': '<img height="16" width="16" src="" />'
                                }
                        });
                        for (var i in scheme.moduleGridSchemeGroups) {
                                var sg = scheme.moduleGridSchemeGroups[i],
                                isgroup = sg.tf_isShowHeaderSpans,
                                group = {
                                        gridGroupId: sg.tf_gridGroupId,
                                        text: sg.tf_gridGroupName,
                                        locked: sg.tf_isLocked,
                                        flex: 1,
                                        columns: []
                                };
                                for (var j in sg.moduleGridSchemeGroupFields) {
                                        var gf = sg.moduleGridSchemeGroupFields[j],
                                        fd = module.getFieldDefine(gf.tf_fieldId),
                                        field;
                                        if (fd) {
                                                if (fd.tf_isHidden) continue;
                                                field = this.getColumn(gf, fd, module)
                                        } else {
                                                var fd = module.getAdditionFieldDefine(gf.tf_fieldId);
                                                field = this.getColumn(gf, fd, module),
                                                0 == field.dataIndex.search("C_") && (field.moduleName = field.dataIndex.slice(2), field.renderer = this.childCountFieldRenderer)
                                        }
                                        if (field.locked = sg.tf_isLocked, gf.tf_otherSetting) try {
                                                eval("Ext.apply(field," + gf.tf_otherSetting + ")")
                                        } catch(err) {}
                                        isgroup ? (this.canReduceTitle(group, field), group.columns.push(field)) : columns.push(field)
                                }
                                isgroup && (this.canReduceTitle(group, field), columns.push(group))
                        }
                        return columns
                },
                canReduceTitle: function(e, t) {
                        0 == t.text.indexOf(e.text) && (t.text = t.text.slice(e.text.length).replace("(", "").replace(")", "").replace("\uff08", "").replace("\uff09", ""), 0 == t.text.indexOf("<br/>") && (t.text = t.text.slice(5)))
                },
                getColumn: function(e, t, i) {
                        var o = t.tf_title.replace(new RegExp("--", "gm"), "<br/>");
                        t.behindText && (o += "<br/>(" + t.behindText + ")");
                        var n = {
                                filter: {},
                                maxWidth: 800,
                                gridFieldId: e.tf_gridFieldId,
                                sortable: !0,
                                text: o,
                                dataIndex: t.baseField || t.tf_aggregate ? t.tf_fieldName: t.manytoone_TitleName
                        };
                        switch (e.tf_ishidden && (n.hidden = !0), i.tf_hasApprove && i.tf_userRole.tf_approveOrder >= 1 && 0 == n.dataIndex.indexOf("tf_sh") && n.dataIndex.substr(n.dataIndex.length - 1, 1) == i.tf_userRole.tf_approveOrder && (n.text = '<span class="approvethisgridheadicon" ><img src="images/approve/approve_edit.png" />' + t.tf_title + "</span>"), t.tf_fieldType) {
                        case "Date":
                                Ext.apply(n, {
                                        xtype: "datecolumn",
                                        align: "center",
                                        width: 100,
                                        renderer: Jfok.system.dateRenderer
                                });
                                break;
                        case "Datetime":
                                Ext.apply(n, {
                                        xtype: "datecolumn",
                                        align: "center",
                                        width: 130,
                                        renderer: Jfok.system.datetimeRenderer
                                });
                                break;
                        case "Boolean":
                                n.xtype = "checkcolumn",
                                n.stopSelection = !1,
                                n.processEvent = function(e) {
                                        return "click" == e ? !1 : void 0
                                };
                                break;
                        case "Integer":
                                Ext.apply(n, {
                                        align: "center",
                                        xtype: "numbercolumn",
                                        tdCls: "intcolor",
                                        format: "#",
                                        renderer: Jfok.system.intRenderer
                                });
                                break;
                        case "Double":
                                Ext.apply(n, {
                                        align: "center",
                                        xtype: "numbercolumn",
                                        width: 110,
                                        renderer: Jfok.system.moneyRenderer
                                });
                                break;
                        case "Float":
                                Ext.apply(n, {
                                        align: "center",
                                        xtype: "numbercolumn",
                                        width: 110,
                                        renderer: Jfok.system.moneyRenderer
                                });
                                break;
                        case "Percent":
                                Ext.apply(n, {
                                        align: "center",
                                        xtype: "numbercolumn",
                                        width: 110,
                                        renderer: Jfok.system.percentRenderer
                                });
                                break;
                        case "String":
                                i.tf_nameFields == t.tf_fieldName ? Ext.apply(n, {
                                        text: '<span class="gridheadicon" ><img src="images/button/namefield.png" />' + t.tf_title + "</span>",
                                        renderer: this.nameFieldRenderer,
                                        summaryType: "count",
                                        summaryRenderer: function(e) {
                                                return Ext.String.format("\u5c0f\u8ba1 ( {0} \u6761\u8bb0\u5f55)", e)
                                        }
                                }) : Ext.apply(n, {
                                        renderer: Jfok.system.defaultRenderer
                                })
                        }
                        if (t.s && Ext.apply(n, {
                                hasSummary: !0,
                                summaryType: "sum"
                        }), e.tf_columnWidth > 0 ? n.width = e.tf_columnWidth: -1 == e.tf_columnWidth && (n.flex = 1, n.minWidth = 120), t.manytoone_TitleName) {
                                var a = Jfok.modules.getModuleInfoWithName(t.tf_fieldType),
                                l = "";
                                a && a.iconURL && (l = '<img src="' + a.iconURL + '" />'),
                                Ext.apply(n, {
                                        renderer: Jfok.system.manytoOneFieldRenderer,
                                        text: '<span class="gridheadicon" >' + l + t.tf_title + "</span>",
                                        manytooneIdName: t.manytoone_IdName,
                                        moduleName: t.tf_fieldType
                                })
                        }
                        if (Ext.String.startsWith(t.tf_fieldName, "P_")) {
                                var r = t.tf_fieldName,
                                d = r.substring(2, 8),
                                a = Jfok.modules.getModuleInfoWithAsName(d);
                                if (Ext.String.endsWith(r, a.tf_nameFields)) {
                                        var l = "";
                                        a && a.iconURL && (l = '<img src="' + a.iconURL + '" />'),
                                        Ext.apply(n, {
                                                renderer: Jfok.system.manytoOneFieldRenderer,
                                                text: '<span class="gridheadicon" >' + l + t.tf_title.replace(new RegExp("--", "gm"), "<br/>") + "</span>",
                                                manytooneIdName: a.tableAsName + "___" + a.tf_primaryKey,
                                                moduleName: a.tf_moduleName
                                        })
                                }
                        }
                        return n
                },
                nameFieldRenderer: function(e, t, i, o, n, a) {
                        return filterTextSetBk(a, "<strong>" + e + "</strong>")
                },
                childCountFieldRenderer: function(e, t, i, o, n, a, l) {
                        try {
                                var r = l.headerCt.columnManager.columns[n],
                                d = '<span class="gridNameField"><a onclick="javascript:Jfok.mainRegion.addParentFilterModule(\'' + r.moduleName + "','" + i.module.tf_moduleName + "','" + i.get(i.idProperty) + "','" + i.getTitleTpl() + '\');return false;" href="#"><span class="childalignright">' + ("0" == e ? "": e) + " </span></a></span>";
                                return d
                        } catch(s) {
                                return e
                        }
                }
        }
}),
Ext.define("Jfok.m.factory.FieldContainerFactory", {
        statics: {
                getTableContainer: function(e, t, i, o) {
                        var n = {
                                xtype: "fieldcontainer",
                                layout: {
                                        type: "table",
                                        columns: e.tf_numCols,
                                        tdAttrs: {
                                                style: {
                                                        padding: "3 3 0 3"
                                                }
                                        },
                                        tableAttrs: {
                                                border: 2,
                                                style: {
                                                        "border-collapse": "collapse;",
                                                        "border-color": "green;"
                                                }
                                        }
                                },
                                margin: "0 0 5 0",
                                items: []
                        };
                        if (e.titles) for (var a = 0; a < e.tf_numCols; a++) n.items.push({
                                xtype: "label",
                                text: e.titles[a],
                                tdAttrs: e.widths ? {
                                        width: e.widths[a] || 100
                                }: null,
                                cellCls: "fieldContainerTableth"
                        });
                        for (var a in t) {
                                var l = t[a],
                                r = i.getFieldDefine(l.tf_fieldId),
                                d = Jfok.m.factory.FormFieldFactory.getField(r, l, o, i);
                                l.tf_colspan && l.tf_colspan > 1 && (d.colspan = l.tf_colspan, d.width = "100%", d.labelWidth = 100),
                                l.labelAlign && (d.labelAlign = l.labelAlign),
                                l.separateThreePart && (Ext.String.trim(d.fieldLabel), n.items.push({
                                        width: 300,
                                        xtype: "label",
                                        text: d.fieldLabel,
                                        margin: "0 0 0 " + 8 * (d.fieldLabel.length - Ext.String.trim(d.fieldLabel).length)
                                }), n.items.push({
                                        width: 100,
                                        xtype: "label",
                                        text: l.behindText || d.behindText
                                }), delete d.fieldLabel, delete d.behindText),
                                l.separateTwoPart && (Ext.String.trim(d.fieldLabel), n.items.push({
                                        width: 300,
                                        xtype: "label",
                                        text: d.fieldLabel,
                                        margin: "0 0 0 " + 8 * (d.fieldLabel.length - Ext.String.trim(d.fieldLabel).length)
                                }), delete d.fieldLabel, delete d.behindText),
                                n.items.push(d)
                        }
                        return n
                },
                getContainer: function(e, t, i) {
                        var o = {
                                xtype: "fieldcontainer",
                                layout: "hbox",
                                margin: "0 0 0 0",
                                items: []
                        };
                        for (var n in e) {
                                var a = e[n];
                                if (a.spacer) o.items.push({
                                        xtype: "fieldcontainer",
                                        layout: "anchor",
                                        margin: "0 0 0 0",
                                        flex: a.flex
                                });
                                else {
                                        var l = t.getFieldDefine(a.tf_fieldId),
                                        r = null,
                                        d = null;
                                        null == l && (r = t.getAdditionFieldDefine(a.tf_fieldId), d = Jfok.modules.getModule(r.targetModuleName), l = d.getFieldDefine(a.tf_fieldId));
                                        var s = t.tf_userRole.tf_additionBrowse && l.tf_haveAttachment;
                                        if (1 == e.length && !s && !l.manytoone_TitleName && null == r) {
                                                var u = Jfok.m.factory.FormFieldFactory.getField(l, a, i, t);
                                                return u
                                        }
                                        var u = Jfok.m.factory.FormFieldFactory.getField(l, a, i, t),
                                        c = {
                                                xtype: "fieldcontainer",
                                                layout: s || u.moduleName || r ? -1 != a.tf_width ? "table": "hbox": "anchor",
                                                flex: a.tf_colspan,
                                                items: []
                                        };
                                        "hbox" == c.layout && (c.margin = "0 0 5 0"),
                                        c.items.push(u),
                                        r ? (u.name = r.tf_fieldName, u.readOnly = !0, u.allowBlank = !0, r.tf_fieldName.endWith(d.tf_nameFields) && (u.xtype = "textfield", u.moduleName = d.tf_moduleName, "normal" == r.tf_aggregate && (u.flex = 1, c.items.push({
                                                xtype: "manytoonefielddisplaybutton",
                                                icon: "images/button/display.png",
                                                tooltip: "\u663e\u793a\u300e" + d.tf_title + "\u300f\u7684\u5185\u5bb9",
                                                fieldName: r.tf_fieldName,
                                                primaryKey: d.tableAsName + "___" + d.tf_primaryKey,
                                                title: d.tf_title
                                        })))) : u.moduleName && (u.flex = 1, c.items.push({
                                                xtype: "manytoonefielddisplaybutton",
                                                icon: "images/button/display.png",
                                                tooltip: "\u663e\u793a\u300e" + l.tf_title + "\u300f\u7684\u5185\u5bb9",
                                                fieldName: u.name,
                                                primaryKey: u.idName,
                                                title: l.tf_title
                                        })),
                                        s && (u.flex = 1, "edit" != i && "new" != i || !t.tf_userRole.tf_additionInsert ? c.items.push({
                                                xtype: "additionfielddisplaybutton",
                                                icon: "images/button/addition.png",
                                                tooltip: "\u663e\u793a " + l.tf_title + " \u7684\u9644\u4ef6",
                                                moduleId: t.tf_moduleId,
                                                fieldId: l.tf_fieldId,
                                                fieldTitle: l.tf_title
                                        }) : c.items.push({
                                                xtype: "additionfieldaddbutton",
                                                icon: "images/button/additionadd.png",
                                                tooltip: "\u65b0\u589e " + l.tf_title + " \u7684\u9644\u4ef6",
                                                moduleId: t.tf_moduleId,
                                                fieldId: l.tf_fieldId,
                                                fieldTitle: l.tf_title
                                        })),
                                        o.items.push(c)
                                }
                        }
                        return o
                },
                getBehindText: function(e) {
                        if (e.tf_otherSetting) {
                                var t = Ext.decode("{" + e.tf_otherSetting + "}", !0);
                                if (t && t.formfield && t.formfield.behindText) return t.formfield.behindText
                        }
                }
        }
}),
Ext.define("Jfok.m.factory.FormFieldFactory", {
        requires: ["Jfok.lib.ToggleSlide", "Jfok.lib.MoneyField", "Jfok.lib.datetime.DateTimeField", "Jfok.lib.TreePicker", "Jfok.lib.ClearButton"],
        statics: {
                labelDefaultWidth: "neptune" === Ext.themeName ? 98 : 92,
                dateDefaultSize: 14,
                integerDefaultSize: 10,
                moneyDefaultSize: 14,
                getField: function(e, t, i, o) {
                        var n = {
                                name: e.tf_fieldName,
                                fieldLabel: t.fieldLabel || (t.labelAhead ? t.labelAhead: "") + e.tf_title.replace(new RegExp("--", "gm"), ""),
                                labelAlign: t.labelAlign || "right",
                                labelWidth: t.labelWidth || this.labelDefaultWidth,
                                behindText: t.behindText || e.behindText
                        };
                        if (n.behindText && " " == n.behindText && delete n.behindText, o && o.moduleFormSchemes[0].labelWidth && (n.labelWidth = o.moduleFormSchemes[0].labelWidth), t.labelWidth && (n.labelWidth = t.labelWidth), t.hideLabel && (n.hideLabel = !0), this.getIsHidden(e, t)) return Ext.apply(n, {
                                xtype: "hiddenfield"
                        }),
                        n;
                        if (("display" == i || "new" == i && 0 == e.tf_allowNew || "edit" == i && 0 == e.tf_allowEdit || e.tf_isDisable) && (n.readOnly = !0), e.manytoone_TitleName) {
                                var a = Jfok.modules.getModuleInfoWithName(e.tf_fieldType),
                                l = "";
                                if (a && a.iconURL && (l = '<img src="' + a.iconURL + '" />'), n.readOnly && "new" != i) Ext.apply(n, {
                                        fieldLabel: '<span class="gridheadicon" >' + l + e.tf_title + "</span>",
                                        name: e.manytoone_TitleName,
                                        moduleName: e.tf_fieldType,
                                        xtype: "textfield",
                                        idName: e.manytoone_IdName
                                });
                                else {
                                        Ext.apply(n, {
                                                fieldLabel: '<span class="gridheadicon" >' + l + e.tf_title + "</span>",
                                                name: e.manytoone_IdName,
                                                moduleName: e.tf_fieldType,
                                                displayField: "text",
                                                valueField: "value"
                                        });
                                        var r = Jfok.modules.getModuleInfoWithName(e.tf_fieldType);
                                        r.tf_codeLevel ? Ext.apply(n, {
                                                xtype: "treepicker",
                                                forceSelection: !0,
                                                plugins: ["clearbutton"],
                                                editable: !1,
                                                store: Ext.create("Jfok.m.form.ManyToOneFieldTreeStore", {
                                                        moduleName: e.tf_fieldType,
                                                        allowParentValue: e.allowParentValue
                                                })
                                        }) : "remote" == t.queryMode && 1 != n.readOnly ? Ext.apply(n, {
                                                xtype: "combobox",
                                                queryMode: "remote",
                                                queryParam: "query",
                                                triggerAction: "query",
                                                plugins: ["clearbutton"],
                                                minChars: 2,
                                                forceSelection: !0,
                                                store: Ext.create("Jfok.m.form.ManyToOneFieldStore", {
                                                        moduleName: e.tf_fieldType
                                                })
                                        }) : Ext.apply(n, {
                                                xtype: "combobox",
                                                queryMode: "local",
                                                queryParam: "query",
                                                triggerAction: "all",
                                                editable: !1,
                                                plugins: ["clearbutton"],
                                                minChars: 2,
                                                store: Ext.create("Jfok.m.form.ManyToOneFieldStore", {
                                                        moduleName: e.tf_fieldType
                                                })
                                        })
                                }
                        }
                        if (Ext.apply(n, this.getFieldXType(e, n)), -1 == t.tf_width && (delete n.size, n.anchor = "100%"), e.tf_isRequired && Ext.apply(n, {
                                allowBlank: !1
                        }), o.tf_nameFields == e.tf_fieldName && Ext.apply(n, {
                                namefield: !0,
                                fieldLabel: "<strong>" + e.tf_title + "</strong>"
                        }), e.tf_otherSetting) {
                                var d = Ext.decode("{" + e.tf_otherSetting + "}", !0);
                                d && d.formfield && Ext.apply(n, d.formfield)
                        }
                        return n.comboThisField && !n.readOnly && Ext.apply(n, {
                                xtype: "combobox",
                                queryMode: "local",
                                queryParam: "query",
                                triggerAction: "all",
                                editable: !0,
                                plugins: ["clearbutton"],
                                minChars: 2,
                                store: Ext.create("Jfok.m.form.ComboThisFieldValueStore", {
                                        moduleName: o.tf_moduleName,
                                        fieldName: e.tf_fieldName
                                })
                        }),
                        "new" == i && "_Addition" == o.tf_moduleName && "tf_filename" == e.tf_fieldName && Ext.apply(n, {
                                name: "file",
                                xtype: "filefield",
                                readOnly: !1,
                                emptyText: "\u8bf7\u9009\u62e9\u4e00\u4e2a\u5c0f\u4e8e10M\u7684\u6587\u4ef6...",
                                buttonText: "\u9009\u62e9\u6587\u4ef6"
                        }),
                        n
                },
                getFieldXType: function(e) {
                        if (e.tf_PropertyType) {
                                var t = [];
                                return Ext.each(e.tf_PropertyType.tf_value.split(","),
                                function(e) {
                                        t.push({
                                                value: e
                                        })
                                }),
                                {
                                        xtype: "combobox",
                                        queryMode: "local",
                                        queryParam: "query",
                                        triggerAction: "all",
                                        displayField: "value",
                                        editable: e.tf_PropertyType.tf_canInput,
                                        store: Ext.create("Ext.data.Store", {
                                                fields: ["value"],
                                                data: t
                                        })
                                }
                        }
                        switch (e.tf_fieldType) {
                        case "Date":
                                return {
                                        size:
                                        this.dateDefaultSize,
                                        format: "Y-m-d",
                                        xtype: "datefield",
                                        submitFormat: "Y-m-d"
                                };
                        case "Datetime":
                                return {
                                        size:
                                        this.dateDefaultSize,
                                        format: "Y-m-d H:i:s",
                                        xtype: "datetimefield"
                                };
                        case "Boolean":
                                return {
                                        xtype:
                                        "checkboxfield",
                                        inputValue: "true"
                                };
                        case "Integer":
                                return {
                                        minValue:
                                        -9999999999,
                                        maxValue: 9999999999,
                                        fieldStyle: "text-align:right",
                                        size: this.integerDefaultSize,
                                        xtype: "numberfield",
                                        enableKeyEvents: !0,
                                        listeners: {
                                                keydown: function(e, t) {
                                                        if (t.getKey() == Ext.EventObject.ENTER) {
                                                                var i = e.nextSibling("field[readOnly=false]");
                                                                return i && i.focus(),
                                                                !1
                                                        }
                                                }
                                        }
                                };
                        case "Double":
                                return {
                                        size:
                                        this.moneyDefaultSize,
                                        hideTrigger: !0,
                                        xtype: "moneyfield",
                                        behindText: "\u5143"
                                };
                        case "Float":
                                return {
                                        minValue:
                                        -9999999999,
                                        maxValue: 9999999999,
                                        size: this.moneyDefaultSize,
                                        hideTrigger: !0,
                                        xtype: "moneyfield"
                                };
                        case "Percent":
                                return {
                                        size:
                                        this.moneyDefaultSize,
                                        xtype: "moneyfield",
                                        percent: !0
                                };
                        case "String":
                                var i = e.l;
                                return 0 == i || i > 100 ? {
                                        maxLength: 0 == i ? Number.MAX_VALUE: i,
                                        enforceMaxLength: !0,
                                        anchor: "100%",
                                        grow: !0,
                                        growMax: 200,
                                        growMin: 40,
                                        xtype: "textareafield"
                                }: {
                                        maxLength: i,
                                        size: i,
                                        enforceMaxLength: !0,
                                        xtype: "textfield",
                                        enableKeyEvents: !0,
                                        listeners: {
                                                keydown: function(e, t) {
                                                        if (t.getKey() == Ext.EventObject.ENTER) {
                                                                var i = e.nextSibling("field[readOnly=false]");
                                                                return i && i.focus(),
                                                                !1
                                                        }
                                                }
                                        }
                                }
                        }
                },
                getIsHidden: function(e, t) {
                        return e.tf_isHidden || t.tf_isHidden
                }
        }
}),
Ext.define("Jfok.m.factory.ModelFactory", {
        statics: {
                getModelByModule: function(e) {
                        var t = Ext.define("Jfok.model." + e.tf_moduleName, {
                                extend: "Ext.data.Model",
                                mixins: ["Jfok.m.model.ApproveBase"],
                                module: e,
                                idProperty: e.tf_primaryKey,
                                nameFields: e.tf_nameFields,
                                titleTpl: e.tf_titleTpl,
                                titleTemplate: null,
                                fields: this.getFields(e),
                                proxy: {
                                        type: "rest",
                                        batchActions: !0,
                                        extraParams: {
                                                moduleName: e.tf_moduleName
                                        },
                                        api: {
                                                read: "rest/module/fetchdata.do",
                                                update: "rest/module/update.do",
                                                create: "rest/module/create.do",
                                                destroy: "rest/module/remove.do"
                                        },
                                        actionMethods: {
                                                create: "POST",
                                                read: "GET",
                                                update: "PUT",
                                                destroy: "DELETE"
                                        },
                                        reader: {
                                                type: "json",
                                                root: "records",
                                                totalProperty: "totalCount"
                                        },
                                        writer: {
                                                type: "json",
                                                writeRecordId: !0,
                                                writeAllFields: !1
                                        },
                                        listeners: {
                                                exception: function(e, t) {
                                                        e.errorInfo = Ext.decode(t.responseText, !0),
                                                        e.errorInfo || (e.errorInfo = {
                                                                resultCode: -1,
                                                                errorMessage: "\u672a\u77e5\u539f\u56e0:" + t.responseText
                                                        })
                                                }
                                        }
                                },
                                getTitleTpl: function() {
                                        return this.titleTemplate || (this.titleTemplate = this.titleTpl ? new Ext.Template(this.titleTpl) : new Ext.Template("{" + this.nameFields + "}")),
                                        this.titleTemplate.apply(this.getData())
                                },
                                canEdit: function() {
                                        return this.module.tf_hasAuditing && this.get("tf_auditinged") ? !1 : this.module.tf_hasApprove && this.get("tf_shNowCount") > 0 ? !1 : !0
                                },
                                canOperate: function() {
                                        return this.module.tf_hasAuditing && this.get("tf_auditinged") ? !1 : !0
                                },
                                canDelete: function() {
                                        return this.module.tf_hasAuditing && this.get("tf_auditinged") ? {
                                                canDelete: !1,
                                                message: "\u3010" + this.getTitleTpl() + "\u3011\u5df2\u8fdb\u884c\u8fc7\u5ba1\u6838\uff0c\u4e0d\u5141\u8bb8\u8fdb\u884c\u5220\u9664\u64cd\u4f5c!"
                                        }: this.module.tf_hasApprove && this.get("tf_shNowCount") > 0 ? {
                                                canDelete: !1,
                                                message: "\u3010" + this.getTitleTpl() + "\u3011\u6b63\u5728\u5ba1\u6279\u6216\u5df2\u7ecf\u5ba1\u6279\u5b8c\u6210,\u4e0d\u5141\u8bb8\u8fdb\u884c\u5220\u9664\u64cd\u4f5c!"
                                        }: !0
                                },
                                getIdValue: function() {
                                        return this.get(this.idProperty)
                                },
                                getNameValue: function() {
                                        return this.nameFields ? this.get(this.nameFields) : null
                                }
                        });
						console.log(t);
                        return t
                },
                getFields: function(e) {
				console.log('moduefiel ');
				console.log(e);
                        var t = [];
                        e.tf_hasAddition && t.push({
                                name: "tf_additionCount",
                                title: "\u9644\u4ef6\u5f20\u6570",
                                persist: !1,
                                type: "int"
                        });
                        for (var i in e.moduleFields) {
                                var o = e.moduleFields[i];
                                console.log(o);
                                if (o.manyToOne || o.oneToOne) t.push({
                                        name: o.manytoone_IdName,
                                        useNull: !0,
                                        type: "string",
                                        serialize: this.convertToNull
                                }),
                                t.push({
                                        name: o.manytoone_TitleName,
                                        title: o.tf_title,
                                        persist: !1,
                                        type: "string"
                                });
                                else {
                                        var n = {
                                                name: o.tf_fieldName,
                                                title: o.tf_title,
                                                type: this.getTypeByStr(o.tf_fieldType)
                                        };
                                        "string" == n.type && (n.useNull = !0, n.serialize = this.convertToNull)
                                }
                                "Date" == o.tf_fieldType && (n.dateWriteFormat = "Y-m-d", n.dateReadFormat = "Y-m-d"),
                                "Datetime" == o.tf_fieldType && (n.dateReadFormat = "Y-m-d H:i:s"),
                                n.tf_haveAttachment = o.tf_haveAttachment,
                                t.push(n)
                        }
                        for (var i in e.moduleAdditionFields) {
                                var o = e.moduleAdditionFields[i],
                                n = {
                                        name: o.tf_fieldName,
                                        title: o.tf_title,
                                        type: this.getTypeByStr(o.tf_fieldType),
                                        persist: !1
                                };
                                t.push(n)
                        }
                        return t
                },
                getTypeByStr: function(e) {
                        switch (e) {
                        case "String":
                                return "string";
                        case "Boolean":
                                return "boolean";
                        case "Integer":
                                return "int";
                        case "Date":
                                return "date";
                        case "Datetime":
                                return "date";
                        case "Double":
                        case "Float":
                        case "Percent":
                                return "float";
                        default:
                                return "string"
                        }
                },
                convertToNull: function(e) {
                        return e ? e: null
                }
        }
}),
Ext.define("Jfok.m.form.ComboThisFieldValueStore", {
        extend: "Ext.data.Store",
        fields: ["value", "text"],
        idProperty: "value",
        constructor: function() {
                Ext.apply(this, arguments[0]),
                this.proxy = {
                        type: "ajax",
                        extraParams: {
                                moduleName: this.moduleName,
                                fieldName: this.fieldName
                        },
                        url: "module/getModuleFieldComboData.do",
                        reader: {
                                type: "json"
                        }
                },
                this.callParent(arguments)
        },
        autoLoad: !0
}),
Ext.define("Jfok.m.form.ManyToOneFieldStore", {
        extend: "Ext.data.Store",
        fields: ["value", "text"],
        idProperty: "value",
        constructor: function() {
                Ext.apply(this, arguments[0]),
                this.proxy = {
                        type: "ajax",
                        extraParams: {
                                moduleName: this.moduleName
                        },
                        url: "module/getModuleComboData.do",
                        reader: {
                                type: "json"
                        }
                },
                this.callParent(arguments)
        },
        autoLoad: !0
}),
Ext.define("Jfok.m.form.ManyToOneFieldTreeStore", {
        extend: "Ext.data.TreeStore",
        fields: ["value", "text", {
                name: "disabled",
                type: "bool",
                defaultValue: !1
        }],
        root: [],
        constructor: function() {
                Ext.apply(this, arguments[0]),
                this.proxy = {
                        type: "ajax",
                        extraParams: {
                                moduleName: this.moduleName,
                                allowParentValue: this.allowParentValue
                        },
                        url: "module/getModuleTreeData.do",
                        reader: {
                                type: "json"
                        }
                },
                this.callParent(arguments)
        },
        autoLoad: !0
}),
Ext.define("Jfok.m.navigate.NavigateTreeStore", {
        extend: "Ext.data.TreeStore",
        autoLoad: !0,
        allowAppend: !0,
        constructor: function() {
                this.proxy = {
                        type: "ajax",
                        url: "navigatetree/fetchdata.do",
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
								console.log(o);
                                this.addCountToItemText(o)
                        }
                        this.allowAppend = !1
                }
        },
        addCountToItemText: function(e) {
                var t = Jfok.modules.getModuleInfoWithName(e.raw.moduleName);
                t && t.iconURL || (e.data.icon = null),
                e.raw.count && (e.data.text = e.raw.text + '<span class="navigateTreeItem"><em>(' + e.raw.count + ")</em></span>");
                for (var i in e.childNodes) this.addCountToItemText(e.childNodes[i])
        }
}),
Ext.define("Jfok.m.navigate.SettingMenu", {
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
}),
Ext.define("Jfok.r.ReportCondition", {
        extend: "Ext.data.Model",
        fields: [{
                name: "conditionId",
                type: "string"
        },
        {
                name: "se_modulename",
                type: "string"
        },
        {
                name: "se_condname",
                type: "string"
        },
        {
                name: "se_values",
                type: "string"
        },
        {
                name: "se_texts",
                type: "string"
        },
        {
                name: "se_displaycond",
                type: "string"
        },
        {
                name: "se_recordnum",
                type: "int"
        },
        {
                name: "type",
                type: "string"
        }]
}),
Ext.define("Jfok.r.ConditionListGridStore", {
        extend: "Ext.data.Store",
        model: "Jfok.r.ReportCondition",
        autoLoad: !0,
        listeners: {
                load: function(e) {
                        var t = [];
                        e.each(function(e) {
                                "module" != e.get("type") && "modulefield" != e.get("type") && t.push(e)
                        }),
                        e.remove(t),
                        e.sync(),
                        e.each(function(t) {
                                var i = e.grid.up("panel").down("conditionselectbutton[conditionId=" + t.get("conditionId") + "]");
                                i.updateTextNumber(t.get("se_values").split(",").length)
                        })
                }
        },
        constructor: function(e, t) {
                this.grid = t,
                this.proxy = {
                        type: "localstorage",
                        id: "reportGroup__" + e.reportGroupId
                },
                this.callParent(arguments)
        }
}),
Ext.define("Jfok.r.ConditionTreeStore", {
        extend: "Ext.data.TreeStore",
        autoLoad: !0,
        constructor: function() {
                this.proxy = {
                        type: "ajax",
                        url: "report/fetchmoduleconitiontree.do",
                        extraParams: arguments[0]
                },
                this.callParent(arguments)
        },
        listeners: {
                load: function(e, t) {
                        var i = e.ownerTree.selectedValues;
                        if ("string" == typeof e.ownerTree.selectedValues) var i = e.ownerTree.selectedValues.split(",");
                        for (var o in t.childNodes) {
                                var n = t.childNodes[o];
                                n.cascadeBy(function(t) { - 1 != i.indexOf(t.raw.fieldvalue) && (t.data.checked = !0, e.setChildChecked(t, !0))
                                })
                        }
                        for (var o in t.childNodes) {
                                var n = t.childNodes[o];
                                n.cascadeBy(function(e) {
                                        e.data.checked && -1 != i.indexOf(e.raw.fieldvalue) && (e.data.checked = !0)
                                })
                        }
                }
        },
        setChildChecked: function(e, t) {
                e.hasChildNodes() && e.eachChild(function(e) {
                        setChildChecked(e, t)
                })
        }
}),
Ext.define("Jfok.r.ReportSelectComboStore", {
        extend: "Ext.data.TreeStore",
        fields: ["value", "text", {
                name: "disabled",
                type: "bool",
                defaultValue: !1
        },
        {
                name: "tag",
                type: "int"
        }],
        root: [],
        autoLoad: !0,
        combo: null,
        constructor: function() {
                this.proxy = {
                        type: "ajax",
                        url: "report/getgroupreports.do",
                        extraParams: {
                                reportGroupId: null
                        }
                },
                this.callParent(arguments)
        },
        listeners: {
                beforeload: function(e) {
                        e.getProxy().extraParams.reportGroupId = e.combo.reportGroupId
                },
                load: function(e, t) {
                        t.childNodes.length > 0 && e.combo.setValue(t.childNodes[0].childNodes[0].data.value)
                }
        }
}),
Ext.define("Jfok.r.chart.ChartPanel", {
        extend: "Ext.panel.Panel",
        alias: "widget.reportchartpanel",
        requires: ["Jfok.m.chart.ColumnChart", "Jfok.m.chart.BarChart", "Jfok.m.chart.LineChart", "Jfok.m.chart.PieChart", "Jfok.m.chart.AreaChart", "Jfok.r.chart.CategoryCombo", "Jfok.r.chart.NumericCombo"],
        layout: "border",
        store: null,
        record: null,
        isLoadingRecord: !1,
        initComponent: function() {
                this.module = this.grid.module,
                this.store = this.grid.getSelectionCount() >= 2 ? Ext.create("Ext.data.Store", {
                        model: this.grid.getStore().model,
                        data: this.grid.getSelectionModel().getSelection()
                }) : this.grid.getStore(),
                this.chartModule = Jfok.modules.getModule("_ReportChart"),
                this.chartModel = this.chartModule.model;
                var e = Jfok.modules.getModule("_Report");
                this.chartStore = Ext.create("Ext.data.Store", {
                        panel: this,
                        autoLoad: !0,
                        model: this.chartModel,
                        pageSize: 100,
                        extraParams: {
                                navigates: Ext.encode([{
                                        moduleName: e.tf_moduleName,
                                        tableAsName: e.tableAsName,
                                        primarykey: e.tf_primaryKey,
                                        fieldtitle: this.module.tf_title,
                                        equalsValue: this.reportId,
                                        equalsMethod: null,
                                        text: this.module.tf_title,
                                        isCodeLevel: !1
                                }])
                        },
                        listeners: {
                                beforeload: function(e) {
                                        for (var t in e.extraParams) e.proxy.extraParams[t] = e.extraParams[t]
                                },
                                load: function(e) {
                                        for (var t in e.extraParams) delete e.proxy.extraParams[t];
                                        e.getCount() > 0 && e.panel.setFormData(e.getAt(0)),
                                        e.panel.recreateChart()
                                }
                        }
                }),
                this.listeners = {
                        render: function() {}
                },
                this.items = [{
                        region: "west",
                        width: 360,
                        split: !0,
                        collapsible: !0,
                        collapseMode: "mini",
                        border: !1,
                        frame: !1,
                        tools: [{
                                type: "save",
                                tooltip: "\u4fdd\u5b58\u56fe\u8868\u65b9\u6848\u53c2\u6570"
                        },
                        {
                                type: "plus",
                                tooltip: "\u5c06\u5f53\u524d\u56fe\u8868\u65b9\u6848\u53e6\u5b58\u4e3a\u4e00\u4e2a\u65b0\u7684"
                        },
                        {
                                type: "minus",
                                tooltip: "\u5220\u9664\u5f53\u524d\u56fe\u8868\u65b9\u6848"
                        }],
                        xtype: "form",
                        layout: "fit",
                        title: "\u56fe\u8868\u53c2\u6570\u8bbe\u7f6e",
                        items: [{
                                xtype: "fieldset",
                                title: "\u56fe\u8868\u53c2\u6570\u8bbe\u7f6e",
                                layout: "anchor",
                                margin: "5 5 5 5",
                                defaults: {
                                        labelAlign: "right",
                                        labelWidth: 65,
                                        anchor: "100%"
                                },
                                items: [{
                                        xtype: "combo",
                                        name: "tf_chartId",
                                        displayField: "tf_name",
                                        valueField: "tf_chartId",
                                        fieldLabel: "\u65b9\u6848\u540d\u79f0",
                                        editable: !1,
                                        store: this.chartStore
                                },
                                {
                                        xtype: "textfield",
                                        name: "tf_title",
                                        fieldLabel: "\u65b9\u6848\u6807\u9898",
                                        value: this.methodTitle,
                                        maxLength: 50,
                                        enforceMaxLength: !0
                                },
                                {
                                        xtype: "reportcategorycombo",
                                        fieldLabel: "\u9879\u76ee\u5185\u5bb9",
                                        grid: this.grid,
                                        name: "tf_categoryField"
                                },
                                {
                                        xtype: "reportnumericcombo",
                                        fieldLabel: "\u6570\u503c\u5185\u5bb9",
                                        grid: this.grid,
                                        name: "tf_numericFields",
                                        width: 280
                                },
                                {
                                        xtype: "combo",
                                        forceSelection: !0,
                                        editable: !1,
                                        allowBlank: !1,
                                        displayField: "title",
                                        valueField: "id",
                                        queryMode: "local",
                                        name: "tf_chartType",
                                        fieldLabel: "\u56fe\u8868\u7c7b\u578b",
                                        value: "columnchart",
                                        store: Ext.create("Ext.data.Store", {
                                                fields: ["id", "title"],
                                                data: [{
                                                        id: "columnchart",
                                                        title: "\u67f1\u72b6\u56fe"
                                                },
                                                {
                                                        id: "barchart",
                                                        title: "\u6761\u72b6\u56fe"
                                                },
                                                {
                                                        id: "linechart",
                                                        title: "\u6298\u7ebf\u56fe"
                                                },
                                                {
                                                        id: "piechart",
                                                        title: "\u997c\u72b6\u56fe"
                                                },
                                                {
                                                        id: "areachart",
                                                        title: "\u9762\u79ef\u56fe"
                                                }]
                                        })
                                },
                                {
                                        xtype: "combo",
                                        forceSelection: !0,
                                        editable: !1,
                                        allowBlank: !1,
                                        displayField: "title",
                                        valueField: "id",
                                        queryMode: "local",
                                        name: "tf_colorScheme",
                                        fieldLabel: "\u914d\u8272\u65b9\u6848",
                                        value: "Base",
                                        store: Ext.create("Ext.data.Store", {
                                                fields: ["id", "title"],
                                                data: [{
                                                        id: "Base",
                                                        title: "\u9ed8\u8ba4"
                                                },
                                                {
                                                        id: "Sky",
                                                        title: "\u6df1\u9752\u8272"
                                                },
                                                {
                                                        id: "Red",
                                                        title: "\u8fa3\u6912\u7ea2"
                                                },
                                                {
                                                        id: "Purple",
                                                        title: "\u8461\u8404\u7d2b"
                                                },
                                                {
                                                        id: "Blue",
                                                        title: "\u591c\u7a7a\u84dd"
                                                },
                                                {
                                                        id: "Yellow",
                                                        title: "\u6d45\u8910\u8272"
                                                },
                                                {
                                                        id: "Category1",
                                                        title: "\u592a\u4e0a\u9ec4"
                                                },
                                                {
                                                        id: "Category2",
                                                        title: "\u6625\u5929\u7eff"
                                                },
                                                {
                                                        id: "Category3",
                                                        title: "\u6a58\u9ec4\u8272"
                                                },
                                                {
                                                        id: "Category4",
                                                        title: "\u8349\u9709\u7ea2"
                                                },
                                                {
                                                        id: "Category5",
                                                        title: "\u4eae\u7eff\u8272"
                                                },
                                                {
                                                        id: "Category6",
                                                        title: "\u5929\u7a7a\u84dd"
                                                }]
                                        })
                                },
                                {
                                        xtype: "fieldcontainer",
                                        layout: "hbox",
                                        defaults: {
                                                labelAlign: "right",
                                                labelWidth: 65,
                                                flex: 1
                                        },
                                        items: [{
                                                xtype: "checkbox",
                                                fieldLabel: "\u663e\u793a\u6570\u503c",
                                                name: "tf_isShowDetailNumber",
                                                inputValue: "true"
                                        },
                                        {
                                                xtype: "checkbox",
                                                fieldLabel: "\u63d0\u793a\u4fe1\u606f",
                                                name: "tf_isShowTips",
                                                inputValue: "true"
                                        }]
                                },
                                {
                                        xtype: "fieldcontainer",
                                        layout: "hbox",
                                        defaults: {
                                                labelAlign: "right",
                                                labelWidth: 65,
                                                flex: 1
                                        },
                                        items: [{
                                                xtype: "checkbox",
                                                fieldLabel: "\u52a8\u753b\u5c55\u793a",
                                                name: "tf_isAnimate",
                                                inputValue: "true"
                                        },
                                        {
                                                xtype: "checkbox",
                                                checked: !0,
                                                fieldLabel: "\u5b9a\u4f4d\u7ebf",
                                                name: "tf_isGridLine",
                                                inputValue: "true"
                                        }]
                                }]
                        }]
                },
                {
                        itemId: "_chartowner",
                        xtype: "panel",
                        region: "center",
                        layout: "fit",
                        border: !0,
                        frame: !1,
                        tbar: ["->", {
                                xtype: "label",
                                itemId: "titlelabel",
                                text: this.methodTitle,
                                style: "font-size : 15px;"
                        },
                        "->"]
                }],
                this.callParent(arguments)
        },
        setFormData: function(e) {
                this.record = e,
                this.isLoadingRecord = !0,
                this.down("form").loadRecord(this.record),
                this.isLoadingRecord = !1
        },
        recreateChart: function() {
                if (1 != this.isLoadingRecord) {
                        var e = this.down("#_chartowner"),
                        t = this.down("form").getForm(),
                        i = t.findField("tf_categoryField").getValue(),
                        o = t.findField("tf_numericFields").getValue(),
                        n = {
                                store: this.store,
                                showDetailNumber: t.findField("tf_isShowDetailNumber").getValue(),
                                showTips: t.findField("tf_isShowTips").getValue(),
                                animate: t.findField("tf_isAnimate").getValue(),
                                theme: t.findField("tf_colorScheme").getValue(),
                                grid: t.findField("tf_isGridLine").getValue(),
                                margin: "10 10 10 10"
                        };
                        if (Ext.apply(n, {
                                categoryField: i,
                                categoryTitle: t.findField("tf_categoryField").getRawValue()
                        }), 1 === o.length) Ext.apply(n, {
                                numericField: o,
                                numericTitle: t.findField("tf_numericFields").getRawValue()
                        });
                        else {
                                var a = [],
                                l = [];
                                Ext.each(o,
                                function(e) {
                                        t.findField("tf_numericFields").getStore().each(function(t) {
                                                t.get("tf_fieldName") == e && (a.push(t.get("tf_fieldName")), l.push(t.get("tf_title")))
                                        })
                                }),
                                Ext.apply(n, {
                                        numericField: a,
                                        numericTitle: l
                                })
                        }
                        e.removeAll(!0),
                        e.add(Ext.widget(t.findField("tf_chartType").getValue(), n))
                }
        }
}),
Ext.define("Jfok.r.chart.ChartWindow", {
        extend: "Ext.window.Window",
        alias: "widget.reportchartwindow",
        requires: ["Jfok.r.chart.ChartPanel"],
        height: 600,
        width: 800,
        layout: "fit",
        icon: "images/button/chart_bar.png",
        maximizable: !0,
        mainReport: void 0,
        initComponent: function() {
                this.title = this.mainReport.down("reportselectcombo").getRawValue() + "--\u56fe\u8868\u5206\u6790",
                this.items = [{
                        methodTitle: this.title,
                        border: !1,
                        frame: !1,
                        xtype: "reportchartpanel",
                        grid: this.mainReport.down("resultlistgrid"),
                        mainReport: this.mainReport,
                        reportId: this.mainReport.down("reportselectcombo").getValue()
                }],
                this.callParent(arguments)
        }
}),
Ext.define("Jfok.r.g.ResultListGridStore", {
        extend: "Ext.data.Store",
        remoteSort: !0,
        autoLoad: !0,
        autoSync: !1,
        extraParams: {},
        navigates: [],
        constructor: function(e) {
                this.grid = e.grid,
                this.module = e.module,
                this.groupAndFields = e.groupAndFields,
                this.model = this.getModel(this.module, this.groupAndFields),
                this.pageSize = Jfok.system.pageSize,
                this.grid.mainReport.getIsLiveGrid() && (this.remoteGroup = !0, this.buffered = !0, this.leadingBufferZone = 200, this.pageSize = 100),
                this.proxy = {
                        type: "rest",
                        batchActions: !0,
                        url: "report/fetchdata.do",
                        actionMethods: {
                                read: "POST"
                        },
                        reader: {
                                type: "json",
                                root: "records",
                                totalProperty: "totalCount"
                        }
                },
                this.callParent(arguments)
        },
        listeners: {
                beforeprefetch: function(e) {
                        for (var t in e.extraParams) e.proxy.extraParams[t] = e.extraParams[t]
                },
                prefetch: function(e) {
                        for (var t in e.extraParams) delete e.proxy.extraParams[t]
                },
                beforeload: function(e) {
                        var t = this.grid.up("mainreport"),
                        i = t.down("conditionlistgrid");
                        e.proxy.extraParams.groupFields = Ext.encode(t.getGroupFields()),
                        e.proxy.extraParams.groupShowDetail = t.getGroupShowDetail();
                        var o = [];
                        i.getStore().each(function(e) {
                                o.push({
                                        type: e.get("type"),
                                        conditionId: e.get("conditionId"),
                                        values: e.get("se_values")
                                })
                        }),
                        e.proxy.extraParams.moduleConditions = Ext.encode(o),
                        e.proxy.extraParams.selectedFields = Ext.encode(t.changeGroupAndFieldsToMin(t.getSelectdGroupAndFields())),
                        e.proxy.extraParams.reportGroupId = t.reportGroup.reportGroupId,
                        e.proxy.extraParams.reportId = t.getReportId(),
                        e.proxy.extraParams.baseModuleName = t.getBaseModuleName(),
                        e.proxy.extraParams.isShowTotal = t.getIsShowTotal()
                },
                load: function(e) {
                        e.data.length > 0 && e.grid.columnsAutoSize()
                }
        },
        getModel: function(e, t) {
                if (!e) return null;
                var i = Ext.define("Jfok.model.report.model", {
                        mixins: ["Jfok.m.model.ApproveBase"],
                        extend: "Ext.data.Model",
                        module: e,
                        idProperty: e.tf_primaryKey,
                        nameFields: e.tf_nameFields,
                        titleTpl: e.tf_titleTpl,
                        titleTemplate: null,
                        fields: this.getFields(e, t),
                        getTitleTpl: function() {
                                return this.titleTemplate || (this.titleTemplate = this.titleTpl ? new Ext.Template(this.titleTpl) : new Ext.Template("{" + this.nameFields + "}")),
                                this.titleTemplate.apply(this.getData())
                        },
                        getIdValue: function() {
                                return this.get(this.idProperty)
                        },
                        getNameValue: function() {
                                return this.nameFields ? this.get(this.nameFields) : null
                        }
                });
                return i
        },
        getFields: function(e, t) {
                var i = [{
                        name: "_total_",
                        type: "string"
                },
                {
                        name: "_level_",
                        type: "int"
                },
                {
                        name: "_count_",
                        type: "int"
                }];
                e.tf_hasAddition && i.push({
                        name: "tf_additionCount",
                        title: "\u9644\u4ef6\u5f20\u6570",
                        persist: !1,
                        type: "int"
                });
                for (var o in e.moduleFields) {
                        var n = e.moduleFields[o];
                        if (n.manyToOne || n.oneToOne) i.push({
                                name: n.manytoone_IdName,
                                useNull: !0,
                                type: "string",
                                serialize: this.convertToNull
                        }),
                        i.push({
                                name: n.manytoone_TitleName,
                                title: n.tf_title,
                                persist: !1,
                                type: "string"
                        });
                        else {
                                var a = {
                                        name: n.tf_fieldName,
                                        title: n.tf_title,
                                        type: this.getTypeByStr(n.tf_fieldType)
                                };
                                "string" == a.type && (a.useNull = !0, a.serialize = this.convertToNull)
                        }
                        "Date" == n.tf_fieldType && (a.dateWriteFormat = "Y-m-d", a.dateReadFormat = "Y-m-d"),
                        "Datetime" == n.tf_fieldType && (a.dateReadFormat = "Y-m-d H:i:s"),
                        a.tf_haveAttachment = n.tf_haveAttachment,
                        i.push(a)
                }
                return i = i.concat(this.getParentFields(t))
        },
        getParentFields: function(e) {
                var t = [],
                i = this;
                return Ext.Array.forEach(e,
                function(e) {
                        Ext.Array.forEach(e.fields,
                        function(e) {
                                if (e.moduleName != i.module.tf_moduleName) {
                                        var o = Jfok.modules.getModuleInfoWithName(e.moduleName),
                                        n = i.getAParentField(o, e.fieldId, t, e);
                                        n && t.push(n)
                                }
                        })
                }),
                t
        },
        getAParentField: function(e, t, i, o) {
                var n = null;
                for (var a in e.moduleFields) if (e.moduleFields[a].tf_fieldId == t) {
                        n = e.moduleFields[a];
                        break
                }
                if (null == n) return null;
                if (n.manyToOne || n.oneToOne) i.push({
                        name: n.manytoone_IdName,
                        useNull: !0,
                        type: "string",
                        serialize: this.convertToNull
                }),
                i.push({
                        name: n.manytoone_TitleName,
                        title: n.tf_title,
                        persist: !1,
                        type: "string"
                });
                else {
                        var l = {
                                name: e.tableAsName + "___" + n.tf_fieldName,
                                title: n.tf_title,
                                type: this.getTypeByStr(n.tf_fieldType)
                        };
                        "string" == l.type && (l.useNull = !0, l.serialize = this.convertToNull),
                        "Date" == n.tf_fieldType && (l.dateWriteFormat = "Y-m-d", l.dateReadFormat = "Y-m-d"),
                        "Datetime" == n.tf_fieldType && (l.dateReadFormat = "Y-m-d H:i:s"),
                        l.tf_haveAttachment = n.tf_haveAttachment
                }
                return "sum" == o.aggregateType ? (l.name = "S_" + l.name, l.title += "\u5c0f\u8ba1") : "count" == o.aggregateType ? (l.name = "C_" + l.name, l.title += "\u4e2a\u6570", l.type = "int") : "avg" == o.aggregateType ? (l.name = "A_" + l.name, l.title += "\u5747\u503c") : "max" == o.aggregateType ? (l.name = "X_" + l.name, l.title += "\u6700\u5927\u503c") : "min" == o.aggregateType && (l.name = "N_" + l.name, l.title += "\u6700\u5c0f\u503c"),
                l
        },
        getTypeByStr: function(e) {
                switch (e) {
                case "String":
                        return "string";
                case "Boolean":
                        return "boolean";
                case "Integer":
                        return "int";
                case "Date":
                        return "date";
                case "Datetime":
                        return "date";
                case "Double":
                case "Float":
                case "Percent":
                        return "float";
                default:
                        return "string"
                }
        }
}),
Ext.define("Jfok.r.selectfields.CanSelectedFieldsTreeStore", {
        extend: "Ext.data.TreeStore",
        autoLoad: !1,
        selectedValues: [],
        constructor: function() {
                this.proxy = {
                        type: "ajax",
                        url: "report/fetchmodulefields.do",
                        extraParams: {}
                },
                this.callParent(arguments)
        },
        listeners: {
                load: function(e, t) {
                        for (var i in t.childNodes) {
                                var o = t.childNodes[i];
                                o.data.expanded = !0,
                                o.cascadeBy(function(e) {
                                        e.data.checked = !1,
                                        e.data.cls = getTypeClass(e.raw.tooltip)
                                })
                        }
                }
        },
        setChildChecked: function(e, t) {
                e.hasChildNodes() && e.eachChild(function(e) {
                        setChildChecked(e, t)
                })
        }
}),
Ext.define("Jfok.r.selectfields.FieldConditionForm", {
        extend: "Ext.form.Panel",
        alias: "widget.fieldconditionform",
        defaultType: "textfield",
        bodyPadding: 5,
        fieldDefaults: {
                labelWidth: 45,
                labelAlign: "right",
                margin: "0 0 2 0"
        },
        tools: [{
                type: "refresh",
                tooltip: "\u6e05\u9664\u5f53\u524d\u6761\u4ef6"
        }],
        selectedNode: null,
        initComponent: function() {
                this.items = [{
                        xtype: "fieldcontainer",
                        layout: "hbox",
                        defaultType: "textfield",
                        fieldDefaults: {
                                labelWidth: 20,
                                labelAlign: "right",
                                labelSeparator: " "
                        },
                        items: [{
                                flex: 1,
                                fieldLabel: ">",
                                padding: "0 5 0 0",
                                name: "morethan"
                        },
                        {
                                flex: 1,
                                fieldLabel: "<",
                                padding: "0 0 0 5",
                                name: "lessthan"
                        }]
                },
                {
                        xtype: "fieldcontainer",
                        layout: "hbox",
                        defaultType: "textfield",
                        fieldDefaults: {
                                labelWidth: 20,
                                labelAlign: "right",
                                labelSeparator: " "
                        },
                        items: [{
                                flex: 1,
                                fieldLabel: "=",
                                padding: "0 5 0 0",
                                name: "equals"
                        },
                        {
                                flex: 1,
                                fieldLabel: "\u2260",
                                padding: "0 0 0 5",
                                name: "notequals"
                        }]
                },
                {
                        fieldLabel: "\u7c7b\u4f3c\u4e8e",
                        anchor: "100%",
                        name: "like"
                },
                {
                        fieldLabel: "\u5217\u8868",
                        anchor: "100%",
                        name: "list"
                },
                {
                        xtype: "textareafield",
                        fieldLabel: "\u81ea\u5b9a\u4e49",
                        grow: !1,
                        height: 40,
                        anchor: "100%",
                        emptyText: '\u81ea\u5b9a\u4e49\u7684\u8868\u8fbe\u5f0f\u3002"this"\u4ee3\u8868\u6b64\u5b57\u6bb5,\u4f8b\u5982 this\u227b=100 and this\u227a=1000',
                        name: "udf"
                },
                {
                        xtype: "textareafield",
                        fieldLabel: "\u63cf\u8ff0",
                        grow: !1,
                        height: 40,
                        anchor: "100%",
                        name: "title"
                },
                {
                        xtype: "fieldcontainer",
                        layout: "hbox",
                        fieldDefaults: {
                                labelWidth: 38
                        },
                        items: [{
                                xtype: "checkbox",
                                name: "count",
                                fieldLabel: "\u8ba1\u6570"
                        },
                        {
                                xtype: "checkbox",
                                name: "sum",
                                fieldLabel: "\u6c42\u548c"
                        },
                        {
                                xtype: "checkbox",
                                name: "avg",
                                fieldLabel: "\u5e73\u5747"
                        },
                        {
                                xtype: "checkbox",
                                name: "max",
                                fieldLabel: "\u6700\u5927"
                        },
                        {
                                xtype: "checkbox",
                                name: "min",
                                fieldLabel: "\u6700\u5c0f"
                        }]
                }],
                this.callParent(arguments)
        },
        setFieldNode: function(e) {
                this.selectedNode = null,
                this.getForm().reset(),
                this.setaFieldCond(e.raw.condition),
                this.setAggregate(e.raw.aggregate),
                this.selectedNode = e;
                var t = e.raw.fieldType.toLowerCase(),
                i = this.getForm();
                i.findField("sum").disable(),
                i.findField("avg").disable(),
                i.findField("max").enable(),
                i.findField("min").enable(),
                "integer" == t || "double" == t || "float" == t ? (i.findField("sum").enable(), i.findField("avg").enable()) : "boolean" == t && (i.findField("max").disable(), i.findField("min").disable())
        },
        fieldchange: function() {
                if (this.selectedNode) {
                        var e = this.genaFieldCond(),
                        t = this.getAggregate();
                        this.selectedNode.set({
                                text: this.selectedNode.raw.title + (e || t ? ' <span class="hascondition">\u273d</span>': "") + this.selectedNode.store.treeStore.ownerTree.setIcon
                        }),
                        this.selectedNode.save(),
                        e ? this.selectedNode.raw.condition = e: delete this.selectedNode.raw.condition,
                        t ? this.selectedNode.raw.aggregate = t: delete this.selectedNode.raw.aggregate
                }
        },
        genacond: function(e, t) {
                return null == t || "" == t ? "": ":" + e + ":" + t + "|"
        },
        getav: function(e, t) {
                var i = e.indexOf(":" + t + ":");
                if ( - 1 == i) return null;
                var o = e.indexOf("|", i + 1);
                return - 1 == o ? null: e.substring(i + (":" + t + ":").length, o)
        },
        setaFieldCond: function(e) {
                var t = this.getForm();
                null != e && "" != e && (t.findField("morethan").setValue(this.getav(e, ">")), t.findField("lessthan").setValue(this.getav(e, "<")), t.findField("equals").setValue(this.getav(e, "=")), t.findField("notequals").setValue(this.getav(e, "!=")), t.findField("like").setValue(this.getav(e, "like")), t.findField("list").setValue(this.getav(e, "list")), t.findField("udf").setValue(this.getav(e, "udf")), t.findField("title").setValue(this.getav(e, "title")))
        },
        genaFieldCond: function() {
                var e = "",
                t = this.getForm();
                return e += this.genacond(">", t.findField("morethan").getValue()),
                e += this.genacond("<", t.findField("lessthan").getValue()),
                e += this.genacond("=", t.findField("equals").getValue()),
                e += this.genacond("!=", t.findField("notequals").getValue()),
                e += this.genacond("like", t.findField("like").getValue()),
                e += this.genacond("list", t.findField("list").getValue()),
                e += this.genacond("udf", t.findField("udf").getValue()),
                e += this.genacond("title", t.findField("title").getValue())
        },
        setAggregate: function(e) {
                e || (e = "");
                var t = this.getForm();
                t.findField("count").setValue(e.indexOf("count") >= 0),
                t.findField("sum").setValue(e.indexOf("sum") >= 0),
                t.findField("avg").setValue(e.indexOf("avg") >= 0),
                t.findField("max").setValue(e.indexOf("max") >= 0),
                t.findField("min").setValue(e.indexOf("min") >= 0)
        },
        getAggregate: function() {
                var e = this.getForm(),
                t = (e.findField("count").getValue() ? "count,": "") + (e.findField("sum").getValue() ? "sum,": "") + (e.findField("avg").getValue() ? "avg,": "") + (e.findField("max").getValue() ? "max,": "") + (e.findField("min").getValue() ? "min,": "");
                return "" == t ? null: t
        }
}),
Ext.define("Jfok.r.selectfields.FieldConditionWindow", {
        extend: "Ext.window.Window",
        alias: "widget.fieldconditionwindow",
        requires: ["Jfok.r.selectfields.FieldConditionForm"],
        modal: !0,
        width: 350,
        title: "\u5b57\u6bb5\u6761\u4ef6\u8bbe\u7f6e",
        layout: "fit",
        tools: [{
                type: "save",
                tooltip: "\u4fdd\u5b58\u6761\u4ef6,\u5e76\u5237\u65b0\u67e5\u8be2\u7ed3\u679c",
                listeners: {
                        click: function(e) {
                                var t = e.up("window");
                                t.down("form").fieldchange();
                                var i = t.tree,
                                o = i.up("mainreport"),
                                n = getGroupAndFieldsWithTree(i);
                                Ext.Ajax.request({
                                        url: "report/validselectedfields.do",
                                        params: {
                                                fields: Ext.encode(n)
                                        },
                                        success: function(i) {
                                                var n = Ext.decode(i.responseText, !0);
                                                n.success ? (o.down("button#save").enable(), o.setSelectdGroupAndFields(n.msg.groups), o.refreshConditionAndRecreateResult(), t.close()) : Ext.MessageBox.show({
                                                        title: "\u9009\u62e9\u9519\u8bef",
                                                        msg: n.msg,
                                                        buttons: Ext.MessageBox.OK,
                                                        animateTarget: e.id,
                                                        icon: Ext.MessageBox.ERROR
                                                })
                                        }
                                })
                        }
                }
        },
        {
                type: "refresh",
                tooltip: "\u6e05\u9664\u5f53\u524d\u6761\u4ef6",
                listeners: {
                        click: function(e) {
                                var t = e.up("window").down("form");
                                t.getForm().reset()
                        }
                }
        }],
        listeners: {
                show: function(e) {
                        e.down("fieldconditionform").setFieldNode(e.treeNode)
                }
        },
        initComponent: function() {
                this.items = [{
                        xtype: "fieldconditionform",
                        tools: null
                }],
                this.callParent(arguments)
        }
}),
Ext.define("Jfok.r.selectfields.SelectedFieldsTreeStore", {
        extend: "Ext.data.TreeStore",
        autoLoad: !1,
        selectedValues: [],
        constructor: function() {
                this.callParent(arguments)
        }
}),
Ext.define("Jfok.m.form.FieldSet", {
        extend: "Ext.form.FieldSet",
        requires: ["Jfok.m.factory.FormFieldFactory", "Jfok.m.factory.FieldContainerFactory"],
        defaultType: "textfield",
        defaults: {},
        layout: "anchor",
        config: {
                module: void 0,
                schemeGroup: void 0,
                numCols: void 0,
                formtype: void 0
        },
        initComponent: function() {
                this.title = this.schemeGroup.tf_formGroupName,
                this.collapsible = this.schemeGroup.tf_collapsible,
                this.collapsed = this.schemeGroup.tf_collapsed,
                this.schemeGroup.tf_approveGroup && (this.approveOrder = this.schemeGroup.approveOrder),
                this.items = [];
                var e = [],
                t = [],
                i = [],
                o = 0;
                for (var n in this.schemeGroup.moduleFormSchemeGroupFields) {
                        var a = this.schemeGroup.moduleFormSchemeGroupFields[n],
                        l = this.module.getFieldDefine(a.tf_fieldId);
                        l && l.tf_isHidden && t.push(a)
                }
                if ("table" === this.schemeGroup.type) {
                        for (var n in this.schemeGroup.moduleFormSchemeGroupFields) {
                                var a = this.schemeGroup.moduleFormSchemeGroupFields[n],
                                l = this.module.getFieldDefine(a.tf_fieldId);
                                l && l.tf_isHidden || i.push(a)
                        }
                        this.items.push(Jfok.m.factory.FieldContainerFactory.getTableContainer(this.schemeGroup, i, this.module, this.formtype))
                } else {
                        for (var n in this.schemeGroup.moduleFormSchemeGroupFields) {
                                var a = this.schemeGroup.moduleFormSchemeGroupFields[n],
                                l = this.module.getFieldDefine(a.tf_fieldId);
                                l && l.tf_isHidden || (a.tf_colspan = a.tf_colspan ? a.tf_colspan: 1, a.tf_colspan > this.numCols && (a.tf_colspan = this.numCols), o + a.tf_colspan > this.numCols ? (this.numCols - o > 0 && i.push({
                                        spacer: !0,
                                        flex: this.numCols - o
                                }), e.push(i), i = [], i.push(a), o = a.tf_colspan) : (i.push(a), o += a.tf_colspan, (o >= this.numCols || a.tf_isEndRow) && (this.numCols - o > 0 && i.push({
                                        spacer: !0,
                                        flex: this.numCols - o
                                }), o = 0, e.push(i), i = [])))
                        }
                        i.length > 0 && e.push(i);
                        for (var n in e) this.items.push(Jfok.m.factory.FieldContainerFactory.getContainer(e[n], this.module, this.formtype))
                }
                for (var n in t) {
                        var a = t[n],
                        l = this.module.getFieldDefine(a.tf_fieldId),
                        r = Jfok.m.factory.FormFieldFactory.getField(l, a, this.formtype);
                        this.items.push(r)
                }
                this.schemeGroup.fieldset && Ext.apply(this, this.schemeGroup.fieldset),
                this.callParent(arguments)
        }
}),
Ext.define("Jfok.r.navigate.ReportNavigate", {
        extend: "Ext.panel.Panel",
        alias: "widget.reportnavigate",
        layout: "accordion",
        bodyCls: "reportnavigate",
        items: [{
                title: "\u9009\u62e9\u7684\u5b57\u6bb5",
                icon: "images/button/selectfield.png",
                itemId: "navigatefields",
                xtype: "selectedfieldstree"
        }],
        listeners: {
                render: function(e) {
                        e.dropZone = new Ext.dd.DropZone(e.body.el, {
                                getTargetFromEvent: function(e) {
                                        return e.getTarget(".reportnavigate")
                                },
                                onNodeOver: function() {
                                        return Ext.dd.DropZone.prototype.dropAllowed
                                },
                                onNodeDrop: function(t, i, o, n) {
                                        e.addNavigateTree(n.button.condition)
                                }
                        })
                },
                expand: function(e) {
                        var t = e.down("selectedfieldstree");
                        t.selectedGroupAndFields && setTimeout(function() {
                                t.fireEvent("groupandfieldschanged", t, t.selectedGroupAndFields)
                        },
                        0)
                }
        },
        addNavigateTree: function(e) {
                this.collapsed && this.expand();
                var t = this.down("conditionnavigatetree[conditionId=" + e.conditionId + "]");
                if (t) return t.expand(),
                !0;
                var i = [],
                o = null;
                return this.up("mainreport").down("conditionlistgrid").getStore().each(function(t) {
                        return t.get("conditionId") == e.conditionId ? (o = t, !1) : void 0
                }),
                o && (i = o.get("se_values")),
                this.add({
                        xtype: "conditionnavigatetree",
                        title: e.fulltext,
                        icon: e.icon,
                        condition: e,
                        conditionId: e.conditionId,
                        selectedValues: i
                }).expand(),
                !0
        }
}),
Ext.define("Jfok.m.form.BaseForm", {
        extend: "Ext.form.Panel",
        alias: "widget.baseform",
        autoScroll: !0,
        moduleGrid: void 0,
        module: void 0,
        formScheme: void 0,
        formtype: void 0,
        formtypetext: void 0,
        submitSuccessed: !1,
        data: null,
        buttonAlign: "center",
        initComponent: function() {
                var e = this;
                this.buttons.push({
                        text: "\u5173\u95ed",
                        itemId: "close",
                        icon: "images/button/return.png"
                }),
                this.buttons.push("->"),
                e.items = [],
                this.formScheme || (this.formScheme = this.module.moduleFormSchemes[0]);
                var t, i = this.formScheme.moduleFormSchemeGroups,
                o = !1,
                n = !1;
                if (Ext.each(i,
                function(t) {
                        t.tf_numCols = t.tf_numCols || e.formScheme.tf_numCols,
                        o = o || "tab" == t.tf_displayMode,
                        n = n || "intabpanel" == t.tf_displayMode
                }), o) {
                        var a = {
                                xtype: "tabpanel",
                                frame: !1,
                                border: !1,
                                bodyPadding: "5 5 5 5",
                                items: []
                        };
                        i[0].tf_displayMode = "tab";
                        var l;
                        Ext.each(i,
                        function(t) {
                                e.isShowThisFieldSet(t) && ("tab" == t.tf_displayMode && (l && a.items.push(l), l = {
                                        xtype: "container",
                                        title: t.tf_formGroupName,
                                        items: []
                                }), l.items.push(e.createFieldSetOrSubModule(t)))
                        }),
                        a.items.push(l),
                        e.items = a
                } else e.bodyStyle = "padding : 5px 5px 0",
                Ext.each(i,
                function(i) {
                        if (e.isShowThisFieldSet(i)) if ("intabpanel" == i.tf_displayMode) t = {
                                xtype: "tabpanel",
                                frame: !1,
                                border: !1,
                                height: 400,
                                items: []
                        },
                        Ext.apply(t, e.getOtherSetting(i.tf_otherSetting)),
                        e.items.push(t);
                        else if ("intab" == i.tf_displayMode) {
                                var o = e.createFieldSetOrSubModule(i);
                                o.title = i.tf_formGroupName,
                                t.items.push(o)
                        } else e.items.push(e.createFieldSetOrSubModule(i))
                });
                e.callParent(arguments)
        },
        getOtherSetting: function(e) {
                return e ? Ext.decode("{" + e + "}", !0) : {}
        },
        createFieldSetOrSubModule: function(e) {
                var t = this;
                if (e.tf_subModuleName) {
                        var i = Jfok.modules.getModule(e.tf_subModuleName);
                        if (i) {
                                var o = i.getNewPanelWithParentModuleForm(this.module.tf_moduleName, null, null, {
                                        autoFetch: !1,
                                        enableNavigate: !1
                                },
                                !0);
                                return o.setHeight(300),
                                o.setWidth("100%"),
                                o
                        }
                }
                return Ext.create("Jfok.m.form.FieldSet", {
                        autoScroll: !0,
                        module: t.module,
                        schemeGroup: e,
                        numCols: e.tf_numCols,
                        formtype: t.formtype
                })
        },
        initForm: function() {},
        isShowThisFieldSet: function(e) {
                if (("new" == this.formtype || "edit" == this.formtype) && (e.tf_auditingGroup || e.tf_approveGroup)) return ! 1;
                if ("approve" == this.formtype && e.tf_approveGroup) {
                        var t = this.module.tf_userRole.tf_approveOrder,
                        i = this.module.tf_userRole.tf_approveLevel,
                        o = this.getFieldSetApproveOrder(e);
                        if (t > o) return this.module.moduleApproves[o - 1].tf_level < i ? !0 : !1;
                        if (o > t) return ! 1
                }
                return ! 0
        },
        getFieldSetApproveOrder: function(e) {
                var t = -1,
                i = this;
                return Ext.each(e.moduleFormSchemeGroupFields,
                function(e) {
                        var o = i.module.getFieldDefine(e.tf_fieldId);
                        return null != o && 10 == o.tf_fieldName.length && o.tf_fieldName.indexOf("tf_shdate") ? (t = o.tf_fieldName.substr(9, 1), !1) : void 0
                }),
                t > -1 && (e.approveOrder = t),
                t
        },
        setLinkedGrid: function(e) {
                this.moduleGrid = e,
                "display" == this.formtype && (e.getSelectionModel().getSelection().length > 0 ? this.setData(e.getSelectionModel().getSelection()[0]) : this.setData(null), this.setWindowTitle())
        },
        setFormSubModuleParentFilter: function(e) {
                var t = this.query("modulepanel");
                if (t.length > 0) {
                        var i = {
                                moduleId: this.module.tf_moduleId,
                                moduleName: this.module.tf_moduleName,
                                tableAsName: this.module.tableAsName,
                                primarykey: this.module.tf_primaryKey,
                                fieldtitle: this.module.tf_title,
                                equalsValue: e ? e.getIdValue() : null,
                                equalsMethod: null,
                                text: e ? e.getTitleTpl() : null,
                                isCodeLevel: this.module.codeLevel
                        };
                        Ext.each(t,
                        function(e) {
                                e.setParentFilter(i)
                        })
                }
        },
        setRecordId: function(e) {
                var t = this;
                this.module.model.load(e, {
                        success: function(e) {
                                t.setData(Ext.create(t.module.model, Ext.decode(e.raw)))
                        }
                })
        },
        setParentFilter: function(e) {
                this.parentFilter = e
        },
        setData: function(e) {
                this.data = e,
                this.data ? this.getForm().loadRecord(this.data) : this.getForm().reset(),
                this.setFormSubModuleParentFilter(this.data)
        },
        setWindowTitle: function() {
                if (!this.disableSetWindowTitle) {
                        var e;
                        this.data ? e = this.data.getTitleTpl() : (nf = this.getForm().findField(this.module.tf_nameFields), e = nf ? nf.getValue() : "");
                        var t = this.formtypetext + " " + this.module.tf_title + " \u3016<em>" + e + "</em>\u3017";
                        return this.up("window") && this.up("window").setTitle(t),
                        t
                }
        }
}),
Ext.define("Jfok.m.navigate.NavigateTree", {
        extend: "Ext.tree.Panel",
        alias: "widget.navigatetree",
        requires: ["Jfok.lib.TreeSearchField"],
        rootVisible: !1,
        mixins: {
                treeFilter: "Jfok.lib.TreeFilter"
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
                }
        },
        initComponent: function() {
                var e = this;
                Ext.applyIf(e, this.config),
                this.store = Ext.create("Jfok.m.navigate.NavigateTreeStore", {
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
}),
Ext.define("Jfok.r.ConditionListGrid", {
        extend: "Ext.grid.Panel",
        alias: "widget.conditionlistgrid",
        columnLines: !0,
        scroll: "vertical",
        border: 1,
        conditionCount: 0,
        columns: [{
                text: "\u6240\u5c5e\u6a21\u5757",
                dataIndex: "se_modulename",
                width: 200,
                tdCls: "x-condition-cell"
        },
        {
                text: "\u67e5\u8be2\u5b57\u6bb5",
                dataIndex: "se_condname",
                width: 100,
                tdCls: "x-condition-cell"
        },
        {
                text: "\u5df2\u8bbe\u7f6e\u7684\u67e5\u8be2\u6761\u4ef6",
                dataIndex: "se_displaycond",
                tdCls: "x-condition-cell",
                renderer: function(e) {
                        var t = new Ext.Template('<div style="white-space:pre-line; word-wrap: break-word;">{val}</div>');
                        return t.apply({
                                val: e
                        })
                },
                flex: 1
        },
        {
                text: "\u8bb0\u5f55\u6570",
                dataIndex: "se_recordnum",
                width: 90,
                align: "center",
                tdCls: "x-condition-cell",
                renderer: function(e, t, i) {
                        return - 1 == i.get("se_recordnum") ? "\u65e0\u4f5c\u7528\u6761\u4ef6": -99 == i.get("se_recordnum") ? '<span style="color:blue;float:right;">\u4f5c\u7528\u4e8e\u5b50\u67e5\u8be2</span>': '<span style="color:blue;float:right;">' + e + "</span>"
                }
        },
        {
                width: 40,
                xtype: "actioncolumn",
                menuDisabled: !0,
                sortable: !1,
                tdCls: "x-condition-cell",
                items: [{
                        icon: "images/button/edit.png",
                        tooltip: "\u4fee\u6539\u5f53\u524d\u67e5\u8be2\u6761\u4ef6",
                        handler: function(e, t) {
                                var i = e.getStore().getAt(t);
                                if ("selectfield" == i.get("type")) {
                                        var o = e.up("mainreport").down("button#selectfields");
                                        o.fireEvent("click", o, i.get("conditionId").split("-")[1])
                                } else {
                                        var n = i.get("conditionId"),
                                        a = e.up("mainreport").down("selectconditiontoolbar button[conditionId=" + n + "]");
                                        a && a.fireEvent("click", a)
                                }
                        }
                },
                {
                        icon: "images/button/delete.png",
                        tooltip: "\u5220\u9664\u5f53\u524d\u67e5\u8be2\u6761\u4ef6",
                        tdCls: "x-condition-cell",
                        handler: function(e, t) {
                                var i = e.getStore().getAt(t);
                                console.log("\u5220\u9664\u7684module"),
                                console.log(i);
                                var o = i.get("conditionId"),
                                n = e.up("mainreport");
                                "selectfield" == i.get("type") && (Ext.Array.each(n.getSelectdGroupAndFields(),
                                function(e) {
                                        Ext.Array.each(e.fields,
                                        function(e) {
                                                return e.moduleName + "-" + e.fieldId == o ? (e.condition = null, !1) : void 0
                                        })
                                }), n.down("selectedfieldstree").fireEvent("groupandfieldschanged", n.down("selectedfieldstree"), n.getSelectdGroupAndFields())),
                                e.getStore().removeAt(t),
                                e.getStore().sync();
                                var a = e.up("panel").down("conditionselectbutton[conditionId=" + o + "]");
                                a && a.updateTextNumber(0),
                                "module" == i.get("type") && n.refreshNavigateTree(o, []),
                                e.ownerCt.updateConditionCount(),
                                n.down("resultlistgrid").getStore().removeAll(!0),
                                n.down("resultlistgrid").store.loadPage(1)
                        }
                }]
        }],
        viewConfig: {
                getRowClass: function(e) {
                        var t = e.get("se_recordnum");
                        return - 1 == t ? "conditionunused": -99 == t ? "conditionsubquery": void 0
                },
                plugins: {
                        ptype: "gridviewdragdrop",
                        enableDrop: !0
                },
                listeners: {
                        drop: function(e, t) {
                                t.view.ownerCt.updateConditionCount()
                        },
                        itemdblclick: function(e, t) {
                                if ("selectfield" == t.get("type")) {
                                        var i = e.up("mainreport").down("button#selectfields");
                                        i.fireEvent("click", i, t.get("conditionId").split("-")[1])
                                } else {
                                        var o = t.get("conditionId"),
                                        n = e.up("mainreport").down("selectconditiontoolbar button[conditionId=" + o + "]");
                                        n && n.fireEvent("click", n)
                                }
                        }
                }
        },
        initComponent: function() {
                this.id = "__conditionlistgrid" + this.reportGroup.reportGroupId,
                this.store = Ext.create("Jfok.r.ConditionListGridStore", this.reportGroup, this),
                this.tbar = {
                        xtype: "selectconditiontoolbar"
                },
                this.callParent(arguments)
        },
        updateBaseModuleDateSection: function(e, t) {
                var i = null;
                this.getStore().each(function(e) {
                        return "basemoduledate" == e.get("type") ? (i = e, !1) : void 0
                }),
                i && (this.getStore().remove(i), this.getStore().sync()),
                t && "all" != t.sectiontype && (this.getStore().add({
                        conditionId: e.moduleName + "-" + e.fieldId,
                        se_modulename: Jfok.modules.getModuleInfoWithName(e.moduleName).tf_title,
                        se_condname: e.fieldTitle,
                        se_displaycond: t.text,
                        se_recordnum: 0,
                        se_values: Ext.encode(t),
                        se_texts: null,
                        type: "basemoduledate"
                }), this.getStore().sync())
        },
        updateModuleCondition: function(e, t, i) {
                console.log(e);
                var o = this,
                n = -1 == e.conditionId.indexOf("-") ? "module": "modulefield",
                a = this.up("panel").down("conditionselectbutton[conditionId=" + e.conditionId + "]");
                a && a.updateTextNumber(t.length);
                var l = null;
                if (this.getStore().each(function(t) {
                        return t.get("conditionId") == e.conditionId ? (l = t, !1) : void 0
                }), 0 == t.length) l && this.getStore().remove(l);
                else {
                        var r = "",
                        d = 0;
                        Ext.Array.forEach(i,
                        function(i) {
                                r += '<span style="white-space:nowrap;"><font color=blue>' + (d + 1) + "." + ("module" == n ? "</font><a onclick=\"javascript:__smr('" + e.conditionId + "','" + t[d] + '\');return false;" href="#">' + i + "</a>": t[d]) + ";<a onclick=\"javascript:__delcond('" + o.reportGroup.reportGroupId + "','" + e.conditionId + "','" + t[d] + '\');return false;" href="#"><img class="condition_clear" src="images/button/tab-close.png"/></a></span>&nbsp; ',
                                d++
                        }),
                        l ? (l.set("se_displaycond", r), l.set("se_texts", i), l.set("se_values", t)) : this.getStore().add({
                                conditionId: e.conditionId,
                                se_modulename: e.moduleTitle,
                                se_condname: e.fieldTitle,
                                se_displaycond: r,
                                se_recordnum: 0,
                                se_values: t,
                                se_texts: i,
                                type: n
                        })
                }
                this.getStore().sync(),
                this.up("mainreport").down("resultlistgrid").getStore().removeAll(!0),
                this.up("mainreport").down("resultlistgrid").store.loadPage(1),
                this.updateConditionCount()
        },
        deleteAllSelectFieldCondition: function() {
                var e = [];
                this.getStore().each(function(t) { ("selectfield" == t.get("type") || "basemoduledate" == t.get("type")) && e.push(t)
                }),
                this.getStore().remove(e),
                this.getStore().sync()
        },
        updateSelectFieldCondition: function(e) {
                this.getStore().add({
                        conditionId: e.moduleName + "-" + e.fieldId,
                        se_modulename: Jfok.modules.getModuleInfoWithName(e.moduleName).tf_title,
                        se_condname: e.fieldTitle,
                        se_displaycond: e.fieldTitle,
                        se_recordnum: 0,
                        se_values: e.condition,
                        se_texts: null,
                        type: "selectfield"
                }),
                this.getStore().sync()
        },
        deleteConditionItem: function(e, t) {
                var i = null;
                this.getStore().each(function(t) {
                        return t.get("conditionId") == e ? (i = t, !1) : void 0
                });
                var o = i.get("se_values").split(","),
                n = i.get("se_texts").split(","),
                a = o.indexOf(t);
                a >= 0 && (o.splice(a, 1), n.splice(a, 1), this.up("mainreport").refreshNavigateTree(i.get("conditionId"), o), this.updateModuleCondition({
                        conditionId: e
                },
                o, n))
        },
        updateConditionCount: function() {
                var e = this,
                t = this.up("mainreport"),
                i = [];
                this.getStore().each(function(e) {
                        i.push({
                                type: e.get("type"),
                                conditionId: e.get("conditionId"),
                                values: e.get("se_values")
                        })
                }),
                i.length > 0 && Ext.Ajax.request({
                        url: "report/getconditionsrecordcount.do",
                        method: "POST",
                        params: {
                                baseModuleName: t.getBaseModuleName(),
                                moduleConditions: Ext.encode(i),
                                fields: Ext.encode(t.changeGroupAndFieldsToMin(t.getSelectdGroupAndFields()))
                        },
                        success: function(t) {
                                var i = Ext.decode(t.responseText, !0);
                                for (var o in i) e.getStore().each(function(e) {
                                        return e.get("conditionId") == o ? (e.set("se_recordnum", i[o].count), "selectfield" == e.get("type") && e.set("se_displaycond", i[o].displayText), e.commit(), !1) : void 0
                                })
                        }
                }),
                0 == this.getStore().getCount() ? this.setHeight(this.down("selectconditiontoolbar").getHeight()) : this.getStore().getCount() != this.conditionCount && this.setHeight(this.down("selectconditiontoolbar").getHeight() + this.view.headerCt.getHeight() + 3 + 25 * this.getStore().getCount()),
                this.conditionCount = this.getStore().getCount()
        }
}),
Ext.define("Jfok.r.ConditionTree", {
        extend: "Ext.tree.Panel",
        alias: "widget.conditiontree",
        requires: ["Jfok.lib.TreeSearchField"],
        rootVisible: !1,
        mixins: {
                treeFilter: "Jfok.lib.TreeFilter"
        },
        header: {},
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
                tooltip: "\u5c55\u5f00\u4e00\u7ea7",
                listeners: {
                        click: function(e) {
                                e.up("conditiontree").expandToNextLevel()
                        }
                }
        },
        {
                type: "collapse",
                tooltip: "\u5168\u90e8\u6298\u53e0",
                listeners: {
                        click: function(e) {
                                e.up("conditiontree").collapseAll(),
                                e.up("conditiontree").setLevel(1)
                        }
                }
        }],
        listeners: {
                checkchange: function(e, t) {
                        setChildChecked(e, t),
                        setParentChecked(e, t),
                        e.getOwnerTree().up("window").syncSelected()
                },
                load: function() {
                        this.getView().refresh(),
                        this.calcMaxLevel(this.getRootNode()),
                        this.setLevel(1),
                        this.up("window").syncSelected()
                },
                afterrender: function(e) {
                        e.getHeader().insert(1, {
                                xtype: "treesearchfield",
                                emptyText: "\u8f93\u5165\u7b5b\u9009\u503c",
                                labelAlign: "right",
                                fieldLabel: "\u7b5b\u9009\u6761\u4ef6",
                                labelAlign: "right",
                                labelWidth: 60,
                                width: "50%",
                                treePanel: e
                        })
                }
        },
        initComponent: function() {
                var e = this;
                Ext.applyIf(e, this.config),
                this.store = Ext.create("Jfok.r.ConditionTreeStore", {
                        conditionId: this.conditionId,
                        selectedValues: this.selectedValues
                }),
                this.callParent(arguments)
        },
        clearAllChecked: function() {
                setChildChecked(this.getRootNode(), !1)
        },
        selectAllChecked: function() {
                setChildChecked(this.getRootNode(), !0)
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
}),
Ext.define("Jfok.r.navigate.ConditionNavigateTree", {
        extend: "Ext.tree.Panel",
        alias: "widget.conditionnavigatetree",
        requires: ["Jfok.lib.TreeSearchField"],
        rootVisible: !1,
        icon: "images/button/selecttree.png",
        frame: !1,
        border: !1,
        mixins: {
                treeFilter: "Jfok.lib.TreeFilter"
        },
        selectedValues: [],
        changeCount: 0,
        header: {},
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
                tooltip: "\u5c55\u5f00\u4e00\u7ea7",
                listeners: {
                        click: function(e) {
                                e.up("conditionnavigatetree").expandToNextLevel()
                        }
                }
        },
        {
                type: "collapse",
                tooltip: "\u5168\u90e8\u6298\u53e0",
                listeners: {
                        click: function(e) {
                                e.up("conditionnavigatetree").collapseAll(),
                                e.up("conditionnavigatetree").setLevel(1)
                        }
                }
        },
        {
                type: "close",
                listeners: {
                        click: function(e) {
                                var t = e.up("reportnavigate"),
                                i = e.up("conditionnavigatetree");
                                i.collapsed || i.prev().expand(),
                                t.remove(i, !0)
                        }
                }
        }],
        listeners: {
                checkchange: function(e, t) {
                        var i = this;
                        setChildChecked(e, t),
                        setParentChecked(e, t),
                        i.changeCount++;
                        var o = i.changeCount;
                        setTimeout(function() {
                                i.refreshReport(o)
                        },
                        1500)
                },
                load: function() {
                        this.getView().refresh(),
                        this.calcMaxLevel(this.getRootNode()),
                        this.setLevel(1)
                }
        },
        refreshReport: function(e) {
                if (e == this.changeCount) {
                        console.log("\u5237\u65b0\u6570\u636e");
                        var t = [],
                        i = [];
                        this.getRootNode().cascadeBy(function(e) {
                                1 != e.data.checked || !e.parentNode || "Root" != e.parentNode.data.text && 0 != e.parentNode.data.checked || (t.push(e.raw.fieldvalue), i.push(e.data.text.replace(new RegExp(",", "gm"), "\uff0c")))
                        }),
                        this.up("mainreport").down("conditionlistgrid").updateModuleCondition(this.condition, t, i)
                }
        },
        initComponent: function() {
                var e = this;
                Ext.applyIf(e, this.config),
                this.store = Ext.create("Jfok.r.ConditionTreeStore", {
                        conditionId: this.conditionId,
                        selectedValues: this.selectedValues
                }),
                this.bbar = [{
                        xtype: "treesearchfield",
                        emptyText: "\u8f93\u5165\u7b5b\u9009\u503c",
                        labelAlign: "right",
                        fieldLabel: "\u7b5b\u9009\u6761\u4ef6",
                        labelAlign: "right",
                        labelWidth: 60,
                        width: "100%",
                        treePanel: this
                }],
                this.callParent(arguments)
        },
        refreshChecked: function(e) {
                this.selectedValues = e,
                me = this;
                var t = this.selectedValues;
                if ("string" == typeof this.selectedValues) var t = this.selectedValues.split(",");
                this.clearAllChecked(),
                Ext.each(t,
                function(e) {
                        var t = me.getRootNode().findChildBy(function(t) {
                                return t.raw.fieldvalue == e ? !0 : void 0
                        },
                        me, !0);
                        t && (t.set({
                                checked: !0
                        }), setChildChecked(t, !0))
                })
        },
        clearAllChecked: function() {
                setChildChecked(this.getRootNode(), !1)
        },
        selectAllChecked: function() {
                setChildChecked(this.getRootNode(), !0)
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
}),
Ext.define("Jfok.r.selectfields.CanSelectedFieldsTree", {
        extend: "Ext.tree.Panel",
        alias: "widget.canselectedfieldstree",
        rootVisible: !1,
        tools: [{
                type: "expand",
                tooltip: "\u5168\u90e8\u5c55\u5f00",
                listeners: {
                        click: function(e) {
                                e.up("canselectedfieldstree").expandAll()
                        }
                }
        },
        {
                type: "collapse",
                tooltip: "\u5168\u90e8\u6298\u53e0",
                listeners: {
                        click: function(e) {
                                e.up("canselectedfieldstree").collapseAll()
                        }
                }
        }],
        initComponent: function() {
                var e = this;
                Ext.applyIf(e, this.config),
                this.store = Ext.create("Jfok.r.selectfields.CanSelectedFieldsTreeStore", {}),
                this.callParent(arguments)
        },
        setModuleName: function(e) {
                this.moduleName = e,
                this.getStore().getProxy().extraParams.moduleName = this.moduleName,
                this.getStore().reload()
        }
}),
Ext.define("Jfok.r.selectfields.GroupAndModulePanel", {
        extend: "Ext.panel.Panel",
        alias: "widget.groupandmodulepanel",
        title: "\u6a21\u5757\u5206\u7ec4\u548c\u5217\u8868",
        layout: {
                type: "accordion",
                animate: !1
        },
        initComponent: function() {
                this.callParent(arguments)
        },
        anchorToModule: function(e) {
                Ext.Array.forEach(this.items.items,
                function(t) {
                        var i = t.getRootNode().findChildBy(function(t) {
                                return t.raw.value == e
                        },
                        this, !0);
                        i && (t.expand(), t.getSelectionModel().deselectAll(), t.getSelectionModel().select(i))
                })
        }
}),
Ext.define("Jfok.r.selectfields.SelectedFieldsTree", {
        extend: "Ext.tree.Panel",
        alias: "widget.selectedfieldstree",
        rootVisible: !0,
        canEditGroupText: !1,
        editIcon: '<span class="rightsrc"><img src="images/button/edit.png"/><span> ',
        setIcon: '<span class="rightsrc"><img src="images/button/setting.png"/><span> ',
        tools: [{
                type: "expand",
                tooltip: "\u5168\u90e8\u5c55\u5f00",
                listeners: {
                        click: function(e) {
                                e.up("panel").expandAll()
                        }
                }
        },
        {
                type: "collapse",
                tooltip: "\u5168\u90e8\u6298\u53e0",
                listeners: {
                        click: function(e) {
                                e.up("panel").getRootNode().eachChild(function(e) {
                                        e.collapse()
                                })
                        }
                }
        }],
        viewConfig: {
                plugins: {
                        ptype: "treeviewdragdrop",
                        containerScroll: !0
                }
        },
        root: {
                text: "\u5df2\u9009\u62e9\u7684\u5b57\u6bb5",
                expanded: !0
        },
        initComponent: function() {
                var e = this;
                Ext.applyIf(e, this.config),
                this.store = Ext.create("Jfok.r.selectfields.SelectedFieldsTreeStore", {
                        tree: this
                }),
                this.callParent(arguments)
        }
}),
Ext.define("Jfok.r.widget.ConditionSelectButton", {
        extend: "Ext.button.Button",
        alias: "widget.conditionselectbutton",
        firstText: null,
        initComponent: function() {
                this.callParent(arguments)
        },
        updateTextNumber: function(e) {
                var t = "\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469";
                this.firstText || (this.firstText = this.text),
                e > 0 ? this.setText(this.firstText + '<font color="red"> ' + (10 >= e ? t.substr(e - 1, 1) : "(" + e + ")") + "</font>") : this.setText(this.firstText)
        }
}),
Ext.define("Jfok.m.form.ApproveForm", {
        extend: "Jfok.m.form.BaseForm",
        alias: "widget.approveform",
        approveFields: ["tf_shname", "tf_shdate", "tf_shresult", "tf_shexplain"],
        initComponent: function() {
                this.formtype = "approve",
                this.formtypetext = "\u5ba1\u6279",
                this.buttons = [{
                        xtype: "image",
                        itemId: "image",
                        src: "images/approve/approve_nopass.png",
                        width: 80,
                        height: 30
                },
                "->", {
                        text: "\u901a\u8fc7\u5ba1\u6279",
                        itemId: "saveapprove",
                        icon: "images/approve/approveaction.png"
                },
                {
                        text: "\u53d6\u6d88\u5ba1\u6279",
                        itemId: "cancelapprove",
                        icon: "images/button/cancel.png"
                },
                "-", {
                        text: "\u4e0a\u4e00\u6761",
                        itemId: "prior",
                        icon: "images/button/prior.png"
                },
                {
                        text: "\u4e0b\u4e00\u6761",
                        itemId: "next",
                        icon: "images/button/next.png"
                },
                "-"],
                this.callParent(arguments),
                this.order = this.module.tf_userRole.tf_approveOrder,
                this.level = this.module.tf_userRole.tf_approveLevel,
                Ext.each(this.query("fieldset"),
                function(e) {
                        Ext.each(e.query("field"),
                        function(e) {
                                e.setReadOnly(!0)
                        })
                })
        },
        initForm: function() {
                this.getForm().reset();
                var e = this.down("tabpanel");
                e && e.setActiveTab(0);
                var t = this.moduleGrid.getSelectionModel().getSelection()[0];
                if (this.setData(t), this.down("button#saveapprove").setVisible(!1), this.down("button#cancelapprove").setVisible(!1), this.setFieldSetReadonly(!0), t.meCanApprove()) {
                        this.setFieldSetReadonly(!1),
                        this.down("image#image").setSrc("images/approve/approve_can.png"),
                        this.down("button#saveapprove").setVisible(!0);
                        var i = this.getForm().findField(this.approveFields[0] + this.order);
                        i && i.setValue(Jfok.system.tf_userName);
                        var i = this.getForm().findField(this.approveFields[1] + this.order);
                        i && i.setValue(new Date);
                        var i = this.getForm().findField(this.approveFields[2] + this.order);
                        i && i.setValue("\u540c\u610f")
                } else t.meCanCancelApprove() ? (this.setFieldSetReadonly(!1), this.down("image#image").setSrc("images/approve/approve_pass.png"), this.down("button#cancelapprove").setVisible(!0)) : t.get("tf_shResultDate") ? "\u5df2\u7ec8\u6b62" === t.get("tf_shResult") ? this.down("image#image").setSrc("images/approve/approve_nopass.png") : this.down("image#image").setSrc("images/approve/approve_pass.png") : t.meApproved() ? this.down("image#image").setSrc("images/approve/approve_pass.png") : this.down("image#image").setSrc("images/approve/approve_can.png");
                this.setWindowTitle(),
                this.getForm().getFields().first().focus()
        },
        setFieldSetReadonly: function(e) {
                var t = this,
                i = this.down("fieldset[approveOrder=" + this.order + "]");
                Ext.each(i.query("field"),
                function(i) {
                        i.name == t.approveFields[0] + t.order || i.name == t.approveFields[1] + t.order ? i.setReadOnly(!0) : i.setReadOnly(e)
                })
        }
}),
Ext.define("Jfok.m.form.AuditingForm", {
        extend: "Jfok.m.form.BaseForm",
        alias: "widget.auditingform",
        auditingFields: ["tf_auditingName", "tf_auditingDate"],
        initComponent: function() {
                var e = this;
                this.formtype = "auditing",
                this.formtypetext = "\u5ba1\u6838",
                this.buttons = [{
                        xtype: "image",
                        itemId: "image",
                        src: "images/button/auditing_no.png",
                        width: 80,
                        height: 30
                },
                "->", {
                        text: "\u901a\u8fc7\u5ba1\u6838",
                        itemId: "saveauditing",
                        icon: "images/button/auditingaction.png"
                },
                {
                        text: "\u53d6\u6d88\u5ba1\u6838",
                        itemId: "cancelauditing",
                        icon: "images/button/cancel.png"
                },
                "-", {
                        text: "\u4e0a\u4e00\u6761",
                        itemId: "prior",
                        icon: "images/button/prior.png"
                },
                {
                        text: "\u4e0b\u4e00\u6761",
                        itemId: "next",
                        icon: "images/button/next.png"
                },
                "-"],
                this.callParent(arguments),
                Ext.each(this.query("fieldset"),
                function(e) {
                        e.schemeGroup.tf_auditingGroup || Ext.each(e.query("field"),
                        function(e) {
                                e.setReadOnly(!0)
                        })
                }),
                Ext.each(this.auditingFields,
                function(t) {
                        var i = e.getForm().findField(t);
                        i && i.setReadOnly(!0)
                })
        },
        initForm: function() {
                this.getForm().reset();
                var e = this.down("tabpanel");
                e && e.setActiveTab(0);
                var t = this.moduleGrid.getSelectionModel().getSelection()[0];
                if (this.setData(t), t.get("tf_auditinged")) this.down("button#saveauditing").setVisible(!1),
                this.down("button#cancelauditing").setVisible(!0),
                this.down("image#image").setSrc("images/button/auditing_yes.png");
                else {
                        this.down("button#saveauditing").setVisible(!0),
                        this.down("button#cancelauditing").setVisible(!1),
                        this.down("image#image").setSrc("images/button/auditing_no.png");
                        var i = this.getForm().findField(this.auditingFields[0]);
                        i && i.setValue(Jfok.system.tf_userName);
                        var i = this.getForm().findField(this.auditingFields[1]);
                        i && i.setValue(new Date)
                }
                this.setWindowTitle(),
                this.getForm().getFields().first().focus()
        }
}),
Ext.define("Jfok.m.form.DisplayForm", {
        extend: "Jfok.m.form.BaseForm",
        alias: "widget.displayform",
        initComponent: function() {
                this.formtype = "display",
                this.formtypetext = "\u663e\u793a",
                this.buttons = ["->", {
                        text: "\u4e0a\u4e00\u6761",
                        itemId: "prior",
                        formButton: !0,
                        icon: "images/button/prior.png"
                },
                {
                        text: "\u4e0b\u4e00\u6761",
                        itemId: "next",
                        formButton: !0,
                        icon: "images/button/next.png"
                }],
                this.callParent(arguments)
        },
        setLinkedGrid: function() {
                this.down("button#prior[formButton]").setVisible(!0),
                this.down("button#next[formButton]").setVisible(!0),
                this.callParent(arguments)
        },
        setRecordId: function() {
                this.down("button#prior[formButton]").setVisible(!1),
                this.down("button#next[formButton]").setVisible(!1),
                this.callParent(arguments)
        }
}),
Ext.define("Jfok.m.form.EditForm", {
        extend: "Jfok.m.form.BaseForm",
        alias: "widget.editform",
        initComponent: function() {
                this.formtype = "edit",
                this.formtypetext = "\u4fee\u6539",
                this.buttons = ["->", {
                        text: "\u4fdd\u5b58",
                        itemId: "saveedit",
                        disabled: !0,
                        icon: "images/button/save.png"
                },
                "-", {
                        text: "\u4e0a\u4e00\u6761",
                        itemId: "editprior",
                        icon: "images/button/prior.png"
                },
                {
                        text: "\u4e0b\u4e00\u6761",
                        itemId: "editnext",
                        icon: "images/button/next.png"
                },
                "-"];
                var e = "_Addition" == this.module.tf_moduleName;
                e && this.buttons.push({
                        text: "\u4e0a\u4f20\u65b0\u9644\u4ef6",
                        itemId: "uploadnewattachment",
                        icon: "images/button/addition.png",
                        tooltip: "\u4e0a\u4f20\u65b0\u7684\u9644\u4ef6\uff0c\u539f\u9644\u4ef6\u4f1a\u88ab\u5220\u9664\u3002"
                }),
                this.callParent(arguments)
        },
        initForm: function() {
                this.getForm().reset();
                var e = this.down("tabpanel");
                e && e.setActiveTab(0);
                var t = this.moduleGrid.getSelectionModel().getSelection()[0];
                this.setData(t),
                this.module.tf_userRole.tf_allowEditDirect ? Ext.each(this.query("fieldset"),
                function(e) {
                        e.setDisabled(!1)
                }) : Ext.each(this.query("fieldset"),
                function(e) {
                        e.setDisabled(!t.canEdit())
                }),
                this.setWindowTitle(),
                this.getForm().getFields().first().focus(),
                this.down("button#saveedit").disable()
        }
}),
Ext.define("Jfok.m.form.NewForm", {
        extend: "Jfok.m.form.BaseForm",
        alias: "widget.newform",
        initComponent: function() {
                var e = "_Addition" == this.module.tf_moduleName;
                this.formtype = "new",
                this.formtypetext = "\u65b0\u589e",
                this.buttons = ["->", {
                        text: e ? "\u4e0a\u4f20": "\u4fdd\u5b58",
                        itemId: e ? "upload": "savenew",
                        itemAction: "savenew",
                        icon: "images/button/save.png"
                },
                {
                        text: "\u7ee7\u7eed\u589e\u52a0",
                        itemId: "newnext",
                        hidden: !0,
                        icon: "images/button/new.png",
                        xtype: "splitbutton",
                        menu: {
                                items: [{
                                        text: "\u590d\u5236\u65b0\u589e",
                                        tooltip: "\u65b0\u589e\u65f6\u5148\u5c06\u5f53\u524d\u8bb0\u5f55\u6dfb\u5165\u5230\u65b0\u8bb0\u5f55\u4e2d",
                                        itemId: "newwithcopy"
                                }]
                        }
                }],
                this.callParent(arguments)
        },
        initForm: function() {
                if (this.copyrecord) {
                        this.setData(this.copyrecord);
                        var e = this.getForm().findField(this.module.tf_primaryKey);
                        e && e.setValue(null),
                        this.copyrecord = null
                } else this.setData(null);
                this.down("button[itemAction=savenew]").setVisible(!0),
                this.down("button#newnext").setVisible(!1),
                Ext.each(this.query("fieldset"),
                function(e) {
                        e.setDisabled(!1)
                });
                var t = this,
                i = this.down("tabpanel");
                i && i.setActiveTab(0),
                Ext.each(this.module.moduleFields,
                function(e) {
                        e.tf_defaultValue && e.tf_defaultValue.length > 0 && t.setFieldValue(e.tf_fieldName, e.tf_defaultValue)
                });
                var o = this.moduleGrid.up("modulepanel");
                if (o.param && o.param.newDefault) for (var n in o.param.newDefault) t.setFieldValue(n, o.param.newDefault[n]);
                var a = this.moduleGrid.store.navigates;
                a && Ext.each(a,
                function(e) {
                        var i = Jfok.modules.getModule(e.moduleName);
                        if (i && i.tf_primaryKey == e.primarykey) {
                                var o = t.down("field[moduleName=" + e.moduleName + "]");
                                o && o.setValue("" + e.equalsValue)
                        }
                });
                var l = this.moduleGrid.parentFilter;
                if (l) {
                        var r = this.down("field[moduleName=" + l.moduleName + "]");
                        r && r.setValue("" + l.equalsValue)
                }
                Ext.Ajax.request({
                        url: "rest/module/getnewdefault.do",
                        params: {
                                moduleName: this.module.tf_moduleName,
                                parentFilter: Ext.encode(this.moduleGrid.parentFilter),
                                navigates: Ext.encode(this.moduleGrid.getStore().navigates)
                        },
                        success: function(e) {
                                var i = Ext.decode(e.responseText, !0);
                                for (var o in i) t.setFieldValue(o, i[o])
                        }
                }),
                this.setWindowTitle(),
                this.getForm().getFields().each(function(e) {
                        return - 1 != e.xtype.indexOf("hidden") || e.readOnly ? void 0 : (e.focus(), !1)
                })
        },
        setFieldValue: function(e, t) {
                var i = this.getForm().findField(e);
                i ? i.setValue(t) : (i = this.down("field[moduleName=" + e + "]"), i && i.setValue(t))
        }
}),
Ext.define("Jfok.m.form.PaymentForm", {
        extend: "Jfok.m.form.BaseForm",
        alias: "widget.paymentform",
        initComponent: function() {
                var e = "_Addition" == this.module.tf_moduleName;
                this.formtype = "new",
                this.formtypetext = "\u65b0\u589e",
                this.buttons = ["->", {
                        text: e ? "\u4e0a\u4f20": "\u4fdd\u5b58",
                        itemId: e ? "upload": "savenew",
                        itemAction: "savenew",
                        icon: "images/button/save.png"
                }],
                this.callParent(arguments)
        },
        initForm: function() {
                delete this.data,
                this.getForm().reset(),
                this.down("button[itemAction=savenew]").setVisible(!0),
                Ext.each(this.query("fieldset"),
                function(e) {
                        e.setDisabled(!1)
                });
                var e = this,
                t = this.down("tabpanel");
                if (t && t.setActiveTab(0), Ext.each(this.module.moduleFields,
                function(t) {
                        if (t.tf_defaultValue && t.tf_defaultValue.length > 0) {
                                var i = e.getForm().findField(t.tf_fieldName);
                                i ? i.setValue(t.tf_defaultValue) : (i = e.down("field[moduleName=" + t.tf_fieldType + "]"), i && i.setValue(t.tf_defaultValue))
                        }
                }), this.parentFilter) {
                        var i = this.down("field[moduleName=" + this.parentFilter.moduleName + "]");
                        i && i.setValue("" + this.parentFilter.equalsValue)
                }
                Ext.Ajax.request({
                        url: "rest/module/getnewdefault.do",
                        params: {
                                moduleName: this.module.tf_moduleName,
                                parentFilter: Ext.encode(this.parentFilter),
                                navigates: null
                        },
                        success: function(t) {
                                var i = Ext.decode(t.responseText, !0);
                                for (var o in i) {
                                        var n = e.getForm().findField(o);
                                        n ? n.setValue(i[o]) : (n = e.down("field[moduleName=" + o + "]"), n && n.setValue(i[o]))
                                }
                        }
                }),
                this.setWindowTitle(),
                this.getForm().getFields().each(function(e) {
                        return - 1 != e.xtype.indexOf("hidden") || e.readOnly ? void 0 : (e.focus(), !1)
                })
        }
}),
Ext.define("Jfok.m.navigate.Navigate", {
        extend: "Ext.panel.Panel",
        alias: "widget.modulenavigate",
        requires: ["Jfok.m.navigate.NavigateTree"],
        layout: "fit",
        config: {
                tabPosition: "left",
                navigateMode: "tab",
                allSelected: !1,
                module: null,
                settingMenu: null,
                parentFilter: null
        },
        header: {
                tag: "modulenavigate"
        },
        tools: [{
                type: "refresh",
                tooltip: "\u5237\u65b0\u6240\u6709\u5bfc\u822a\u8bb0\u5f55"
        },
        {
                type: "plus",
                tooltip: "\u6240\u6709\u9009\u4e2d\u7684\u5bfc\u822a\u6761\u4ef6\u90fd\u6709\u6548"
        },
        {
                type: "minus",
                hidden: !0,
                tooltip: "\u4ec5\u5f53\u524d\u9009\u4e2d\u7684\u5bfc\u822a\u6761\u4ef6\u6709\u6548"
        },
        {
                type: "pin",
                tooltip: "\u4ee5Tab\u5f62\u5f0f\u663e\u793a\u5404\u5bfc\u822a\u6811",
                hidden: !0
        },
        {
                type: "unpin",
                tooltip: "\u4ee5\u5c42\u53e0\u5f62\u5f0f\u663e\u793a\u5404\u5bfc\u822a\u6811"
        },
        {
                type: "gear",
                tooltip: "\u66f4\u591a\u504f\u597d\u8bbe\u7f6e"
        }],
        initComponent: function() {
                this.items = [],
                this.navigateValues = new Ext.util.MixedCollection,
                this.setSelectedNavigates(this.defaultNavigateValues),
                this.listeners = {
                        render: function() {
                                this.initNavigateInTab()
                        }
                },
                this.callParent(arguments)
        },
        setSelectedNavigates: function(e) {
                var t = this;
                e && e.length > 0 && (t.navigateValues.clear(), Ext.each(e,
                function(e) {
                        for (var i in e) t.navigateValues.add(i, e[i])
                }))
        },
        getSettingMenu: function() {
                return this.settingMenu || (this.settingMenu = Ext.create("Jfok.m.navigate.SettingMenu", {
                        navigate: this
                })),
                this.settingMenu
        },
        applyNavigateMode: function(e) {
                this.navigateMode = e;
                var t;
                t = "tab" == this.navigateMode ? new Ext.widget("tabpanel", {
                        tabPosition: this.tabPosition,
                        plugins: [Ext.create("Ext.ux.TabReorderer")]
                }) : new Ext.widget("panel", {
                        layout: {
                                type: "accordion",
                                animate: !0,
                                multi: this.module.moduleGridNavigates.length < 4
                        }
                });
                for (var i in this.module.moduleGridNavigates) {
                        var o = this.module.moduleGridNavigates[i];
                        t.add({
                                title: o.tf_text,
                                layout: "fit",
                                items: [this.down("navigatetree#" + o.tf_fields)]
                        })
                }
                this.removeAll(!0),
                this.add(t)
        },
        initNavigateInTab: function() {
	  console.log("======initNavigateInTab=====module===================")
    	   console.log(this.module)
                var e = new Ext.widget("tabpanel", {
                        tabPosition: this.tabPosition,
                        plugins: [Ext.create("Ext.ux.TabReorderer")]
                });
                for (var t in this.module.moduleGridNavigates) {
                        var i = this.module.moduleGridNavigates[t];
                        e.add({
                                title: i.tf_text,
                                datapanel: !0,
                                layout: "fit",
                                items: [{
                                        xtype: "navigatetree",
                                        border: !0,
                                        itemId: i.tf_fields,
                                        navigatetitle: i.tf_text,
                                        path: i.tf_fields,
                                        cascading: i.tf_cascading,
                                        mode: Ext.encode(i.tf_NumberGroup),
                                        type: i.tf_type,
                                        reverseOrder: i.tf_reverseOrder,
                                        module: this.module,
                                        parentFilter: this.parentFilter
                                }]
                        })
                }
				  console.log("==========initNavigateInTab this===============")
                console.log(this);
                this.add(e)
        },
        clearNavigateValues: function() {
                this.navigateValues.clear(),
                this.refreshGridStore()
        },
        addNavigateValue: function(e, t) {
                this.allSelected ? (this.navigateValues.removeAtKey(e), t && this.navigateValues.add(e, t)) : (this.navigateValues.clear(), t && this.navigateValues.add(e, t)),
                this.refreshGridStore()
        },
        applyParentFilter: function(e) {
                this.navigateValues.clear(),
                this.parentFilter = e,
                Ext.each(this.query("navigatetree"),
                function(t) {
                        t.setParentFilter(e)
                })
        },
        changeParentFilter: function(e) {
                this.navigateValues.clear(),
                this.parentFilter = e,
                Ext.each(this.query("navigatetree"),
                function(t) {
                        t.setParentFilter(e)
                })
        },
        refreshNavigateTree: function() {
                Ext.each(this.query("navigatetree"),
                function(e) {
                        e.store.reload()
                })
        },
        refreshGridStore: function() {
                var e = [];
                this.navigateValues.each(function(t) {
                        e.push(t)
                }),
                this.up("modulepanel").down("modulegrid").store.applyNavigates(e),
                this.up("modulepanel").down("modulegrid").updateTitle()
        }
}),
Ext.define("Jfok.r.SelectConditionWindow", {
        extend: "Ext.window.Window",
        alias: "widget.selectconditionwindow",
        width: 700,
        height: 550,
        closable: !0,
        maximizable: !0,
        modal: !0,
        tools: [{
                type: "help"
        },
        {
                type: "pin",
                tooltip: "\u5c06\u67e5\u8be2\u6761\u4ef6\u9009\u62e9\u653e\u5230\u5bfc\u822a\u533a\u57df\u4e2d",
                listeners: {
                        click: function(e) {
                                e.up("window").mainReport.down("reportnavigate").addNavigateTree(e.up("window").condition),
                                e.up("window").animateTarget = e.up("window").mainReport.down("reportnavigate").down("conditionnavigatetree[conditionId=" + e.up("window").condition.conditionId + "]"),
                                e.up("window").close()
                        }
                }
        }],
        tbar: [{
                text: "\u91cd\u65b0\u9009\u62e9",
                icon: "images/button/clear.png",
                listeners: {
                        click: function(e) {
                                e.up("window").down("conditiontree").clearAllChecked(),
                                e.up("window").syncSelected()
                        }
                }
        },
        "-", {
                text: "\u5168\u90e8\u9009\u62e9",
                icon: "images/button/selectall.png",
                listeners: {
                        click: function(e) {
                                e.up("window").down("conditiontree").selectAllChecked(),
                                e.up("window").syncSelected()
                        }
                }
        },
        "-", {
                text: "\u5173\u95ed\u9000\u51fa",
                icon: "images/button/return.png",
                listeners: {
                        click: function(e) {
                                e.up("window").close()
                        }
                }
        },
        {
                text: "\u786e\u5b9a\u8fd4\u56de",
                icon: "images/button/accept.png",
                listeners: {
                        click: function(e) {
                                var t = e.up("window"),
                                i = t.down("treepanel#selected"),
                                o = [],
                                n = [];
                                i.getRootNode().eachChild(function(e) {
                                        o.push(e.raw.value),
                                        n.push(e.data.text.replace(new RegExp(",", "gm"), "\uff0c"))
                                }),
                                t.mainReport.refreshNavigateTree(t.condition.conditionId, o),
                                t.mainReport.down("conditionlistgrid").updateModuleCondition(t.condition, o, n),
                                t.close()
                        }
                }
        }],
        mainReport: null,
        layout: "border",
        initComponent: function() {
                this.title = "\u67e5\u8be2\u6761\u4ef6\u9009\u62e9 " + this.title,
                this.bbar = Ext.create("Ext.ux.statusbar.StatusBar", {
                        items: [{
                                xtype: "label",
                                itemId: "count",
                                text: "\u672a\u9009\u4e2d\u8bb0\u5f55"
                        }]
                }),
                this.items = [{
                        title: "\u53ef\u9009\u62e9\u7684\u5217\u8868",
                        region: "center",
                        width: "350",
                        xtype: "conditiontree",
                        conditionId: this.condition.conditionId,
                        moduleName: this.condition.moduleName,
                        selectedValues: this.selectedValues
                },
                {
                        itemId: "selected",
                        region: "east",
                        xtype: "treepanel",
                        root: {
                                text: "\u5df2\u9009\u62e9\u7684\u6761\u4ef6\u503c",
                                expanded: !0
                        },
                        width: 300,
                        title: "\u9009\u4e2d\u5217\u8868",
                        split: !0,
                        collapsible: !0
                }],
                this.callParent(arguments)
        },
        syncSelected: function() {
                var e = 0,
                t = this.down("conditiontree"),
                i = this.down("treepanel#selected");
                i.getRootNode().removeAll(!0),
                t.getRootNode().cascadeBy(function(t) {
                        1 != t.data.checked || !t.parentNode || "Root" != t.parentNode.data.text && 0 != t.parentNode.data.checked || (e++, i.getRootNode().appendChild({
                                value: t.raw.fieldvalue,
                                text: t.data.text,
                                leaf: !0
                        }))
                }),
                this.down("label#count").setText((e ? "\u5df2\u9009\u4e2d " + e + " \u4e2a": "\u672a\u9009\u4e2d") + this.condition.fulltext + " ")
        }
}),
Ext.define("Jfok.r.selectfields.SelectFieldsWindow", {
        extend: "Ext.window.Window",
        alias: "widget.selectfieldswindow",
        width: 800,
        height: 600,
        closable: !0,
        maximizable: !0,
        modal: !0,
        tools: [{
                type: "help"
        }],
        tbar: [{
                text: "\u91cd\u65b0\u9009\u62e9",
                icon: "images/button/clear.png",
                scope: this,
                itemId: "clearfields"
        },
        "-", {
                text: "\u9000\u51fa",
                icon: "images/button/return.png",
                listeners: {
                        click: function(e) {
                                e.up("window").close()
                        }
                }
        },
        {
                text: "\u786e\u5b9a\u8fd4\u56de",
                icon: "images/button/accept.png",
                itemId: "saveselectedfields"
        }],
        mainReport: null,
        layout: "border",
        icon: "images/button/selectfield.png",
        initComponent: function() {
                this.title = "\u5b57\u6bb5\u9009\u62e9\u53ca\u9644\u52a0\u6761\u4ef6",
                this.items = [{
                        itemId: "tablegroup",
                        xtype: "groupandmodulepanel",
                        width: 220,
                        region: "west",
                        split: !0,
                        collapsible: !0,
                        title: "\u6a21\u5757\u5206\u7ec4\u548c\u5217\u8868"
                },
                {
                        region: "center",
                        layout: "border",
                        items: [{
                                region: "center",
                                border: !1,
                                xtype: "canselectedfieldstree",
                                title: "\u53ef\u9009\u62e9\u7684\u5b57\u6bb5"
                        }]
                },
                {
                        region: "east",
                        width: 300,
                        split: !0,
                        layout: "border",
                        items: [{
                                title: "\u5df2\u9009\u62e9\u7684\u5b57\u6bb5",
                                xtype: "selectedfieldstree",
                                canEditGroupText: !0,
                                border: !1,
                                setIcon: "",
                                region: "center"
                        },
                        {
                                region: "south",
                                title: "\u5b57\u6bb5\u6761\u4ef6\u8bbe\u7f6e",
                                xtype: "fieldconditionform",
                                border: !1,
                                height: 270,
                                collapsible: !0,
                                collapsed: !0
                        }]
                }],
                this.callParent(arguments)
        },
        syncSelected: function() {
                var e = this.down("selectedfieldstree"),
                t = this.down("canselectedfieldstree");
                t.getRootNode().eachChild(function(i) {
                        i.eachChild(function(i) {
                                if (i.data.checked) {
                                        if (!e.getRootNode().findChildBy(function(e) {
                                                return e.internalId == i.raw.value
                                        },
                                        this, !0)) {
                                                var o = i.parentNode.data.text;
                                                if ("\u9ed8\u8ba4\u7ec4" == o) {
                                                        var n = Jfok.modules.getModuleInfoWithName(t.moduleName);
                                                        n && (o = n.tf_title)
                                                }
                                                var a = e.getRootNode().findChildBy(function(e) {
                                                        return e.raw.title == o
                                                },
                                                this, !1);
                                                a || (a = e.getRootNode().appendChild({
                                                        moduleName: t.moduleName,
                                                        title: o,
                                                        text: o + (e.canEditGroupText ? e.editIcon: ""),
                                                        leaf: !1,
                                                        expanded: !0
                                                })),
                                                a.appendChild({
                                                        moduleName: t.moduleName,
                                                        id: i.raw.value,
                                                        value: i.raw.value,
                                                        fieldType: i.raw.tooltip,
                                                        cls: getTypeClass(i.raw.tooltip),
                                                        title: i.data.text,
                                                        text: i.data.text,
                                                        leaf: !0
                                                })
                                        }
                                } else {
                                        var l = e.getRootNode().findChildBy(function(e) {
                                                return e.internalId == i.raw.value
                                        },
                                        this, !0);
                                        if (l) {
                                                var a = l.parentNode;
                                                a.removeChild(l),
                                                a.hasChildNodes() || a.parentNode.removeChild(a)
                                        }
                                }
                        })
                }),
                this.refreshStatusBar()
        },
        refreshStatusBar: function() {
                var e = this.down("selectedfieldstree"),
                t = 0;
                e.getRootNode().eachChild(function(e) {
                        t += e.childNodes.length
                }),
                this.down("selectedfieldstree").setTitle("\u5df2\u9009\u62e9\u7684\u5b57\u6bb5 " + (t ? "(" + t + "\u4e2a)": ""))
        },
        syncCanSelectedFocusNode: function() {
                var e = this.down("selectedfieldstree"),
                t = this.down("canselectedfieldstree"),
                i = null;
                e.getSelectionModel().hasSelection() && (i = e.getSelectionModel().getLastSelected().internalId),
                t.getRootNode().eachChild(function(e) {
                        e.eachChild(function(e) {
                                e.raw.value === i && t.getSelectionModel().select(e)
                        })
                })
        },
        syncCanSelected: function() {
                var e = this.down("selectedfieldstree"),
                t = this.down("canselectedfieldstree");
                t.getRootNode().eachChild(function(t) {
                        t.eachChild(function(t) {
                                var i = e.getRootNode().findChildBy(function(e) {
                                        return e.internalId == t.raw.value
                                },
                                this, !0);
                                i && t.set({
                                        checked: !0
                                })
                        })
                }),
                this.syncCanSelectedFocusNode()
        },
        syncConditionForm: function(e) {
                var t = this.down("fieldconditionform");
                t.setFieldNode(e)
        }
}),
Ext.define("Jfok.m.ChildToolBar", {
        extend: "Ext.toolbar.Toolbar",
        alias: "widget.childtoolbar",
        layout: {
                overflowHandler: "Menu"
        },
        initComponent: function() {
                this.items = [];
                var e = [],
                t = this.modulePanel.module.moduleSubToolbar;
                if (t && t.length > 2) {
                        for (var i in t) {
                                var o = Jfok.m.ChildToolBar.getModuleButtonWithSingle(t[i].tf_subMoudleName, t[i].tf_openInWindow);
                                t[i].tf_inSubMenu ? (o.isMenu = !0, e.push(o)) : this.items.push(o)
                        }
                        e.length > 0 && this.items.push({
                                text: "\u66f4\u591a",
                                menu: e
                        })
                } else this.hidden = !0;
                this.callParent(arguments)
        },
        statics: {
                getModuleButtonWithSingle: function(e, t) {
                        var i = Jfok.modules.getModule(e);
                        if (!i) return null;
                        if (!i.tf_userRole || !i.tf_userRole.tf_allowBrowse) return null;
                        var o = {
                                text: i.tf_shortname ? i.tf_shortname: i.tf_title,
                                icon: i.iconURL,
                                moduleName: i.tf_moduleName,
                                childButton: !0,
                                openInWindow: t
                        };
                        return o
                },
                getModuleButton: function(e, t) {
                        var i = Jfok.modules.getModule(e);
                        if (!i) return null;
                        if (!i.tf_userRole || !i.tf_userRole.tf_allowBrowse) return null;
                        var o = {
                                text: i.tf_shortname ? i.tf_shortname: i.tf_title,
                                icon: i.iconURL,
                                moduleName: i.tf_moduleName,
                                childButton: !0
                        };
                        if (i.childNames && i.childNames.length > 0) {
                                t || Ext.apply(o, {
                                        xtype: "splitbutton"
                                }),
                                Ext.apply(o, {
                                        menu: {}
                                }),
                                o.menu.items = [];
                                for (var n in i.childNames) o.menu.items.push(Jfok.m.ChildToolBar.getModuleButton(i.childNames[n], !0))
                        }
                        return o
                }
        }
}),
Ext.define("Jfok.m.Detail", {
        extend: "Ext.grid.property.Grid",
        alias: "widget.recorddetail",
        emptyText: "\u6ca1\u6709\u9009\u4e2d\u7684\u8bb0\u5f55",
        nameColumnWidth: 150,
        modulePanel: null,
        detailScheme: null,
        fields: null,
        printArray: [],
        record: null,
        additionFields: {},
        recordTitle: null,
        tools: [{
                type: "prev",
                tooltip: "\u4e0a\u4e00\u6761\u8bb0\u5f55",
                handler: function(e, t, i) {
                        i.ownerCt.up("modulepanel").down("modulegrid").selectPriorRecord()
                }
        },
        {
                type: "next",
                tooltip: "\u4e0b\u4e00\u6761\u8bb0\u5f55",
                handler: function(e, t, i) {
                        i.ownerCt.up("modulepanel").down("modulegrid").selectNextRecord()
                }
        },
        {
                type: "print",
                tooltip: "\u6253\u5370\u5f53\u524d\u660e\u7ec6\u8bb0\u5f55",
                handler: function(e, t, i) {
                        i.ownerCt.printDetail()
                }
        }],
        listeners: {
                cellclick: function(e, t, i, o, n, a, l) {
                        var r = e.ownerCt;
                        if (void 0 !== l.target.src) {
                                var d = l.target.attributes.fieldId.value,
                                s = this.modulePanel.module.tf_moduleName,
                                u = r.record.data[this.modulePanel.module.tf_primaryKey],
                                c = r.record.data[this.modulePanel.module.tf_nameFields],
                                m = l.target.attributes.fieldTitle.value,
                                f = {
                                        equalsMethod: null,
                                        equalsValue: d,
                                        fieldtitle: "\u9644\u4ef6\u5bf9\u5e94\u5b57\u6bb5",
                                        isCodeLevel: !1,
                                        moduleName: "_AdditionOnField",
                                        primarykey: "tf_fieldId",
                                        tableAsName: "_t9506",
                                        text: m
                                },
                                h = {
                                        defaultNavigateValues: [{
                                                _AdditionOnField: f
                                        }]
                                },
                                p = r.up("modulepanel").down("modulegrid");
                                Jfok.attachmentFieldWin && Jfok.attachmentFieldWin.pModuleName !== s && (Jfok.attachmentFieldWin.destroy(), Jfok.attachmentFieldWin = null),
                                Jfok.attachmentFieldWin ? (Jfok.attachmentFieldWin.changeParentFilter(s, this.modulePanel.module.tf_title, u, c, h), Jfok.attachmentFieldWin.show()) : (Jfok.attachmentFieldWin = Ext.widget("attahcmentwindow", {
                                        pModuleName: s,
                                        pModuleTitle: this.modulePanel.module.tf_title,
                                        aid: u,
                                        aname: c,
                                        frame: !1,
                                        border: !1,
                                        x: p.getX(),
                                        y: p.getY(),
                                        height: p.getHeight(),
                                        width: p.getWidth(),
                                        param: h
                                }), Jfok.attachmentFieldWin.show(null,
                                function() {
                                        Jfok.attachmentFieldWin.down("attachmentnavigate").setWidth(180)
                                }))
                        }
                }
        },
        initComponent: function() {
                var e = this.modulePanel.module.moduleDetailSchemes;
                e && e.length >= 1 && (this.selectScheme(e[0].tf_detailId), e.length > 1 && (this.bbar = [{
                        xtype: "detailschemecombo",
                        modulePanel: this.modulePanel
                }])),
                this.sourceConfig = {},
                this.callParent(arguments)
        },
        selectScheme: function(e) {
                var t = this,
                i = this.modulePanel.module;
                Ext.each(i.moduleDetailSchemes,
                function(i) {
                        return i.tf_detailId == e ? (t.detailScheme = i, !1) : void 0
                }),
                this.fields = [],
                Ext.each(this.detailScheme.moduleDetailSchemeFields,
                function(e) {
                        var o = i.getFieldDefine(e.tf_fieldId);
                        if (o) {
                                if (o.tf_isHidden) return;
                                t.fields.push(o)
                        } else o = i.getAdditionFieldDefine(e.tf_fieldId),
                        o && t.fields.push(o)
                })
        },
        updateSource: function(e) {
                if (this.record = e, !this.collapsed) {
                        var t = this;
                        if (t.printArray = [], null == e) return t.setSource({}),
                        void 0;
                        t.recordTitle = e.data[t.modulePanel.module.tf_nameFields];
                        var i = {},
                        o = {};
                        if (null == t.detailScheme) {
                                var n = e.store.model.getFields();
                                for (var a in n) {
                                        var l = n[a],
                                        r = l.title;
                                        r && (r = r.replace(new RegExp("--", "gm"), ""), i[r] = e.data[l.name]),
                                        t.printArray.push({
                                                title: r,
                                                value: e.data[l.name]
                                        })
                                }
                                return this.setSource(i),
                                void 0
                        }
                        var d = e.store.model,
                        a = 1;
                        Ext.each(this.fields,
                        function(n) {
                                Ext.each(d.getFields(),
                                function(l) {
                                        if (l.name == n.tf_fieldName) {
                                                var r = t.formatNumber(a) + l.title.replace(new RegExp("--", "gm"), "");
                                                n.behindText && (r += "(" + n.behindText + ")"),
                                                l.tf_haveAttachment && (r += " <img src='images/button/addition.png' fieldId='" + n.tf_fieldId + "' fieldTitle='" + n.tf_title + "'/>");
                                                var d = e.data[l.name];
                                                return i[r] = e.data[l.name],
                                                "Date" == n.tf_fieldType ? (d = Jfok.system.dateRenderer(d), o[r] = {
                                                        renderer: Jfok.system.dateRenderer
                                                }) : "Integer" == n.tf_fieldType ? (d = Jfok.system.intRenderer(d), o[r] = {
                                                        renderer: Jfok.system.intRenderer
                                                }) : "Double" == n.tf_fieldType ? (d = Jfok.system.moneyRenderer(d), o[r] = {
                                                        renderer: Jfok.system.moneyRenderer
                                                }) : "Boolean" == n.tf_fieldType ? (d = Jfok.system.booleanTextRenderer(d), o[r] = {
                                                        renderer: Jfok.system.booleanTextRenderer
                                                }) : "Percent" == n.tf_fieldType && (d = Jfok.system.percentRenderer1(d), o[r] = {
                                                        renderer: Jfok.system.percentRenderer1
                                                }),
                                                t.printArray.push({
                                                        title: r,
                                                        value: d
                                                }),
                                                a++,
                                                !1
                                        }
                                        if (l.name == n.manytoone_TitleName) {
                                                var r = t.formatNumber(a) + l.title.replace(new RegExp("--", "gm"), "");
                                                return t.printArray.push({
                                                        title: r,
                                                        value: e.data[l.name]
                                                }),
                                                i[r] = e.data[l.name],
                                                a++,
                                                !1
                                        }
                                })
                        }),
                        this.setSource(i, o)
                }
        },
        formatNumber: function(e) {
                return 10 > e ? "0" + e + ".": e + "."
        },
        printDetail: function() {
                if (0 == this.printArray.length) return Jfok.system.warnInfo("\u5f53\u524d\u6ca1\u6709\u9009\u4e2d\u7684\u8bb0\u5f55\uff0c\u8bf7\u5148\u9009\u62e9\u4e00\u6761\u8bb0\u5f55!"),
                void 0;
                var e = "";
                for (i in this.printArray) e += Ext.String.format('<tr><td width="30%" height="25px">{0}</td><td width="70%">{1}</td>', this.printArray[i].title, this.printArray[i].value);
                var t = ["<html>", "<head>", '<link rel="Shortcut Icon" href="favicon.png" type="image/png" />', '<link href="styles/printrecord.css" rel="stylesheet" type="text/css" />', "<title>\u6253\u5370" + this.modulePanel.module.tf_title + "\u8bb0\u5f55</title>", "</head>", "<body>", '<div class="printer-noprint">', '<div class="buttons">', '<a class="button-print" href="javascript:void(0);" onclick="window.print();">\u6253\u5370</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;', '<a class="button-exit" href="javascript:void(0);" onclick="window.close();">\u5173\u95ed</a>', "<hr/>", "</div>", "</div>", '<div class="headtitle">', '<printtable><table width="600"><tr><td class="headtitle" height="40" align="center" valign="middle">', this.modulePanel.module.tf_title + "\uff1a" + this.recordTitle, "</td></tr></table>", '<table width="600" border="1" cellpadding="3">', e, "</table></printtable>", "</body>", "</html>"],
                o = Ext.create("Ext.XTemplate", t).apply(),
                n = window.open("", "printrecord");
                n.document.open(),
                n.document.write(o),
                n.document.close()
        }
}),
Ext.define("Jfok.r.MainReport", {
        extend: "Ext.panel.Panel",
        alias: "widget.mainreport",
        requires: ["Jfok.r.ReportSelectCombo", "Jfok.r.SelectConditionToolbar", "Jfok.r.navigate.ReportNavigate", "Jfok.r.chart.ChartWindow"],
        tools: [{
                type: "refresh",
                tooltip: "\u5237\u65b0\u67e5\u8be2\u6570\u636e"
        }],
        layout: "border",
        config: {
                reportGroup: null,
                reportId: null,
                reportText: null,
                baseModuleDateField: null,
                baseModuleDateSection: null,
                selectdGroupAndFields: null,
                factGroupAndFields: null,
                moduleConditions: [],
                isShowTotal: null,
                groupFields: [],
                groupShowDetail: null,
                isLiveGrid: !1,
                allModules: null,
                baseModuleName: null,
                baseModule: null
        },
        reportChange: function(e, t, i, o, n, a) {
                e && this.setAllModules(e),
                t && this.setBaseModuleName(t),
                void 0 != o && null != o && this.setIsShowTotal(o),
                this.setSelectdGroupAndFields(i),
                Ext.isArray(n) ? this.setGroupFields(n) : this.setGroupFields([]),
                this.setGroupShowDetail( !! a),
                this.refreshAll()
        },
        applyBaseModuleDateSection: function(e) {
                this.baseModuleDateSection = e;
                var t = this.down("conditionlistgrid");
                this.baseModuleDateField ? (t.updateBaseModuleDateSection(this.baseModuleDateField, this.baseModuleDateSection), this.down("conditionlistgrid").updateConditionCount(), this.down("resultlistgrid").getStore().removeAll(!0), this.down("resultlistgrid").getStore().loadPage(1)) : Jfok.system.warnInfo("\u5f53\u524d\u7684\u57fa\u51c6\u6a21\u5757\u300e" + Jfok.modules.getModuleInfoWithName(this.baseModuleName).tf_title + "\u300f\u6ca1\u6709\u8bbe\u7f6e\u6839\u636e\u67e5\u8be2\u533a\u95f4\u81ea\u52a8\u67e5\u8be2\u7684\u65e5\u671f\u5b57\u6bb5\u3002")
        },
        applyBaseModuleName: function(e) {
                if (this.baseModuleName = e, this.baseModule = Jfok.modules.getModuleInfoWithName(this.baseModuleName), this.down("basemoduleselectmenu").setBaseModuleName(this.baseModuleName), this.baseModule.tf_yearfield) {
                        var t = (new Date).getFullYear(),
                        i = (new Date).getMonth() + 1,
                        o = parseInt((new Date).getMonth() / 3) + 1,
                        n = this.down("dateselectbutton");
                        this.baseModule.tf_monthField ? (n.setButtonText("\u5f53\u524d\u6708\u4efd"), this.baseModuleDateSection = {
                                sectiontype: "thismonth",
                                value: "" + t + "-" + i,
                                text: "\u5f53\u524d\u6708\u4efd"
                        }) : this.baseModule.tf_seasonField ? (n.setButtonText("\u5f53\u524d\u5b63\u5ea6"), this.baseModuleDateSection = {
                                sectiontype: "thisquarter",
                                value: "" + t + "-" + o,
                                text: "\u5f53\u524d\u5b63\u5ea6"
                        }) : (n.setButtonText("\u5f53\u524d\u5e74\u5ea6"), this.baseModuleDateSection = {
                                sectiontype: "thisyear",
                                value: "" + t,
                                text: "\u5f53\u524d\u5e74\u5ea6"
                        })
                }
        },
        applyAllModules: function(e) {
                this.allModules = e,
                this.down("basemoduleselectmenu").setAllModules(e)
        },
        applySelectdGroupAndFields: function(e) {
                this.selectdGroupAndFields = e
        },
        refreshNavigate: function() {
                this.down("selectedfieldstree").fireEvent("groupandfieldschanged", this.down("selectedfieldstree"), this.selectdGroupAndFields)
        },
        refreshNavigateTree: function(e, t) {
                console.log("\u5237\u65b0\u5bfc\u822a\u6811:" + e);
                var i = this.down("conditionnavigatetree[conditionId=" + e + "]");
                console.log(i),
                i && i.refreshChecked(t)
        },
        refreshConditionAndRecreateResult: function() {
                this.reCreateResultGrid(),
                this.refreshConditionGrid()
        },
        refreshAll: function() {
                this.down("selectedfieldstree").fireEvent("groupandfieldschanged", this.down("selectedfieldstree"), this.selectdGroupAndFields),
                this.reCreateResultGrid(),
                this.refreshConditionGrid()
        },
        refreshConditionGrid: function() {
                var e = this;
                this.baseModuleDateField = null;
                var t = this.down("conditionlistgrid");
                t.deleteAllSelectFieldCondition(),
                Ext.Array.each(e.selectdGroupAndFields,
                function(i) {
                        Ext.Array.each(i.fields,
                        function(i) {
                                i.condition && 0 != i.condition.indexOf(":title:") && t.updateSelectFieldCondition(i),
                                e.baseModuleDateField || e.getBaseModule().tableAsName + "." + e.getBaseModule().tf_dateField == i.fieldname && (e.baseModuleDateField = i, t.updateBaseModuleDateSection(e.baseModuleDateField, e.baseModuleDateSection))
                        })
                }),
                t.updateConditionCount()
        },
        reCreateResultGrid: function() {
                var e = this;
                Ext.Ajax.request({
                        url: "report/getfactgroupandfields.do",
                        method: "POST",
                        params: {
                                baseModuleName: e.getBaseModuleName(),
                                fields: Ext.encode(e.changeGroupAndFieldsToMin(e.getSelectdGroupAndFields())),
                                groupFields: Ext.encode(e.getGroupFields()),
                                groupShowDetail: e.getGroupShowDetail()
                        },
                        success: function(t) {
                                e.setFactGroupAndFields(Ext.decode(t.responseText, !0));
                                var i = e.down("panel[region=center]");
                                i.removeAll(!0);
                                var o = Ext.widget("resultlistgrid", {
                                        module: Jfok.modules.getModuleInfoWithName(e.baseModuleName),
                                        groupAndFields: e.getFactGroupAndFields(),
                                        mainReport: e
                                });
                                i.add(o)
                        }
                })
        },
        changeGroupAndFieldsToMin: function(e) {
                var t = [];
                return Ext.each(e,
                function(e) {
                        var i = [];
                        Ext.each(e.fields,
                        function(e) {
                                var t = {
                                        moduleName: e.moduleName,
                                        fieldId: e.fieldId
                                };
                                e.condition && (t.condition = e.condition),
                                e.aggregate && (t.aggregate = e.aggregate),
                                i.push(t)
                        }),
                        t.push({
                                groupTitle: e.groupTitle,
                                fields: i
                        })
                }),
                t
        },
        canEditorDelete: function() {
                var e = this.down("reportselectcombo"),
                t = e.store.getRootNode().findChildBy(function(t) {
                        return t.data.value == e.getValue() ? !0 : void 0
                },
                this, !0);
                return t ? 1 == t.data.tag: !1
        },
        initComponent: function() {
                this.title = "\u7efc\u5408\u67e5\u8be2\u300e" + this.reportGroup.text + "\u300f",
                this.icon = this.reportGroup.icon,
                Jfok.system.groupsAndmodules || Ext.Ajax.request({
                        url: "report/fetchgroupandmodule.do",
                        success: function(e) {
                                Jfok.system.groupsAndmodules = Ext.decode(e.responseText)
                        }
                }),
                this.tbar = [{
                        xtype: "reportselectcombo",
                        reportGroupId: this.reportGroup.reportGroupId
                },
                "-", {
                        text: "\u5b57\u6bb5\u9009\u62e9",
                        icon: "images/button/edit.png",
                        tooltip: "\u9009\u62e9\u6240\u8981\u663e\u793a\u7684\u5b57\u6bb5",
                        itemId: "selectfields"
                },
                {
                        xtype: "basemoduleselectmenu"
                },
                "->", {
                        text: "\u4fdd\u5b58",
                        tooltip: "\u5c06\u5f53\u524d\u7684\u67e5\u8be2\u8bbe\u7f6e\u4fdd\u5b58\u5230\u9009\u4e2d\u7684\u65b9\u6848",
                        icon: "images/button/save.png",
                        itemId: "save",
                        disabled: !0
                },
                {
                        text: "\u53e6\u5b58\u4e3a",
                        tooltip: "\u5c06\u5f53\u524d\u7684\u67e5\u8be2\u65b9\u6848\u53e6\u5b58\u4e3a\u4e00\u4e2a\u65b0\u7684\u65b9\u6848\u6837",
                        icon: "images/button/saveas.png",
                        itemId: "saveas"
                },
                "-", {
                        text: "\u5220\u9664",
                        tooltip: "\u5220\u9664\u5f53\u524d\u7684\u67e5\u8be2\u65b9\u6848",
                        icon: "images/button/delete.png",
                        itemId: "delete"
                }],
                this.items = [{
                        region: "west",
                        title: "\u5bfc\u822a",
                        split: !0,
                        width: 230,
                        collapseMode: "mini",
                        collapsible: !0,
                        collapsed: !0,
                        xtype: "reportnavigate"
                },
                {
                        xtype: "container",
                        region: "center",
                        layout: "border",
                        border: !1,
                        frame: !1,
                        items: [{
                                xtype: "conditionlistgrid",
                                reportGroup: this.reportGroup,
                                height: 150,
                                region: "north",
                                split: !0,
                                collapseMode: "mini",
                                listeners: {
                                        render: function(e) {
                                                e.next().setHeight(2)
                                        }
                                }
                        },
                        {
                                xtype: "panel",
                                layout: "fit",
                                region: "center"
                        }]
                }],
                this.callParent(arguments)
        }
}),
Ext.define("Jfok.m.GridStore", {
        extend: "Ext.data.Store",
        modulePanel: null,
        remoteSort: !0,
        autoLoad: !1,
        autoSync: !1,
        leadingBufferZone: 100,
        buffered: !1,
        config: {
                extraParams: {},
                navigates: []
        },
        constructor: function(e) {
                if (this.pageSize = Jfok.system.pageSize, this.model = e.module.model, this.extraParams = {},
                this.navigates = [], e.modulePanel.param) {
                        var t = e.modulePanel.param.defaultNavigateValues;
                        this.setDefaultNavigates(t)
                }
                this.callParent(arguments)
        },
        listeners: {
                beforeprefetch: function(e) {
                        for (var t in e.extraParams) e.proxy.extraParams[t] = e.extraParams[t]
                },
                prefetch: function(e) {
                        for (var t in e.extraParams) delete e.proxy.extraParams[t];
                        this.modulePanel && this.modulePanel.down("modulegrid").reselectSelection()
                },
                beforeload: function(e) {
                        for (var t in e.extraParams) e.proxy.extraParams[t] = e.extraParams[t]
                },
                load: function(e) {
                        for (var t in e.extraParams) delete e.proxy.extraParams[t];
                        if (this.modulePanel) {
                                var i = this.modulePanel.down("modulegrid");
                                i.reselectSelection(),
                                0 == i.getSelectionModel().getSelection().length && 1 == this.count() && i.getSelectionModel().select(this.first()),
                                "_Addition" == this.modulePanel.module.tf_moduleName && this.count() >= 1 && this.modulePanel.down("panel").down("attachmentview").getSelectionModel().select(this.first())
                        }
                }
        },
        setDefaultNavigates: function(e) {
                var t = this;
                t.navigates = [],
                delete t.extraParams.navigates,
                e && e.length > 0 && (Ext.each(e,
                function(e) {
                        for (var i in e) t.navigates.push(e[i])
                }), t.navigates.length > 0 && Ext.apply(t.extraParams, {
                        navigates: Ext.encode(t.navigates)
                }))
        },
        applyNavigates: function(e) {
                this.navigates = e,
                this.navigates.length > 0 ? Ext.apply(this.extraParams, {
                        navigates: Ext.encode(this.navigates)
                }) : delete this.extraParams.navigates,
                this.buffered && this.data.clear(),
                this.loadPage(1)
        }
}),
Ext.define("Jfok.m.Grid", {
        extend: "Ext.grid.Panel",
        alias: "widget.modulegrid",
        requires: ["Jfok.m.factory.ColumnsFactory", "Jfok.m.w.PageSizeCombo", "Jfok.lib.GridPrinter", "Jfok.m.w.AuditingActionColumn", "Jfok.m.w.PayoutActionColumn", "Jfok.m.w.ApproveActionColumn", "Jfok.m.w.AttachmentNumberColumn", "Jfok.m.w.OwnPaging"],
        module: null,
        columnLines: !0,
        bodyCls: "panel-background",
        multiSelect: !0,
        selType: "rowmodel",
        enableLocking: !0,
        viewConfig: {},
        config: {
                parentFilter: null,
                gridSettingMenu: null,
                gridType: "normal"
        },
        schemeOrder: null,
        tools: [{
                type: "refresh",
                tooltip: "\u5237\u65b0\u6570\u636e"
        },
        {
                type: "print",
                listeners: {
                        click: function(e) {
                                Jfok.lib.GridPrinter.mainTitle = e.up("grid").module.tf_title + "<br />\u3000",
                                Jfok.lib.GridPrinter.print(e.up("grid"))
                        }
                }
        },
        {
                type: "gear"
        },
        {
                type: "maximize",
                hidden: !0,
                tooltip: "\u5f53\u524d\u5217\u8868\u6700\u5927\u5316"
        },
        {
                type: "restore",
                tooltip: "\u663e\u793a\u5bfc\u822a\u53ca\u660e\u7ec6"
        }],
        initComponent: function() {
                this.module = this.modulePanel.module,
                this.store = this.modulePanel.store,
                this.parentFilter && (this.store.extraParams.parentFilter = Ext.encode(this.parentFilter)),
                this.schemeOrder = this.module.moduleGridSchemes[0].tf_schemeOrder,
                this.columns = Jfok.m.factory.ColumnsFactory.getColumns(this.module, this.schemeOrder),
                this.setColumnsNameToStoreExtraParams(),
                this.allowDragToNavigate = !1,
                this.allowDragToNavigate = "_Addition" == this.module.tf_moduleName ? Jfok.modules.getModule(this.parentFilter.moduleName).tf_userRole.tf_additionEdit: this.module.tf_userRole.tf_allowEdit,
                this.allowDragToNavigate ? Ext.apply(this.viewConfig, {
                        plugins: [{
                                ptype: "gridviewdragdrop",
                                ddGroup: "DD_" + this.module.tf_moduleName,
                                enableDrop: this.module.tf_orderField
                        }],
                        listeners: {
                                drop: function(e, t) {
                                        t.view.up("modulegrid").getGridSettingMenu().down("#saverecordorder").setDisabled(!1)
                                }
                        }
                }) : this.viewConfig = {},
                this.dockedItems = [{
                        dock: "top",
                        modulePanel: this.modulePanel,
                        xtype: "moduletoolbar"
                },
                {
                        dock: "top",
                        modulePanel: this.modulePanel,
                        xtype: "childtoolbar"
                },
                {
                        xtype: "ownpagingtoolbar",
                        prependButtons: !0,
                        items: [{
                                xtype: "gridschemecombo",
                                modulePanel: this.modulePanel
                        },
                        1 == this.modulePanel.module.moduleGridSchemes.length ? null: "-", {
                                xtype: "pagesizecombo",
                                value: this.store.pageSize
                        },
                        "\u6761", "-"],
                        store: this.store,
                        dock: "bottom",
                        displayInfo: !0
                }],
                this.callParent(arguments)
        },
        updateTitle: function() {
                var e = this.view.getSelectionModel().selected.items[0],
                t = this.module.tf_title;
                e && e.getTitleTpl() && (t = t + "\u3000\u3016<em>" + e.getTitleTpl() + "</em>\u3017"),
                this.parentFilter && (t = t + " \u300e" + this.parentFilter.fieldtitle + ":" + this.parentFilter.text + "\u300f ");
                var i = this.store.navigates,
                o = "";
                if (i && i.length > 0) {
                        o += '<div style="display :inline-table;">';
                        for (var n in i) o = o + "\u25a0 " + i[n].fieldtitle + "\uff1a<em>" + i[n].text + "</em><br/>";
                        o += "</div>"
                }
                o && (o = "\u5bfc\u822a\u503c\uff1a" + o),
                this.setTitle(t + "\u3000\u3000\u3000" + o)
        },
        applyParentFilter: function(e) {
                this.parentFilter = e,
                this.store.extraParams.parentFilter = Ext.encode(this.parentFilter),
                this.store.setNavigates([]),
                this.updateTitle()
        },
        changeParentFilter: function(e, t) {
                this.parentFilter = e,
                this.store.extraParams.parentFilter = Ext.encode(this.parentFilter),
                "object" == typeof t ? this.store.setDefaultNavigates(t.defaultNavigateValues) : this.store.setDefaultNavigates([]),
                this.store.loadPage(1),
                this.updateTitle()
        },
        getParentOrNavigateValue: function(e) {
                var t = this,
                i = null;
                return t.parentFilter && t.parentFilter.moduleName == e ? i = t.parentFilter.equalsValue: t.store.navigates && Ext.each(t.store.navigates,
                function(t) {
                        return t.moduleName == e ? (i = t.equalsValue, !1) : void 0
                }),
                i
        },
        getNavigateWithFieldName: function(e) {
                var t = this,
                i = null;
                return t.store.navigates && Ext.each(t.store.navigates,
                function(t) {
                        return t.primarykey == e ? (i = t, !1) : void 0
                }),
                i
        },
        updateColumnFieldsWithSchemeId: function(e) {
                this.schemeOrder = e,
                this.columns = Jfok.m.factory.ColumnsFactory.getColumns(this.module, e),
                this.reconfigure(this.store, this.columns),
                this.setColumnsNameToStoreExtraParams()
        },
        updateRecordDetail: function(e) {
                e[0] ? this.up("modulepanel").down("recorddetail").updateSource(e[0]) : this.up("modulepanel").down("recorddetail").updateSource(null)
        },
        setShowMaximize: function(e) {
                this.rendered && (this.down("tool[type=maximize]").setVisible(e), this.down("tool[type=restore]").setVisible(!e))
        },
        setColumnsNameToStoreExtraParams: function() {
                var e = [];
                for (var t in this.columns) if (this.columns[t].columns) for (var i in this.columns[t].columns) e.push(this.columns[t].columns[i].dataIndex);
                else e.push(this.columns[t].dataIndex);
                Ext.apply(this.store.extraParams, {
                        schemeOrder: this.schemeOrder,
                        columns: e.join(",")
                })
        },
        getColumnsSummaryCount: function() {
                var e = 0;
                for (var t in this.columns) if (this.columns[t].columns) for (var i in this.columns[t].columns) this.columns[t].columns[i].hasSummary && (e += 1);
                else this.columns[t].hasSummary && (e += 1);
                return e
        },
        refreshWithSilent: function() {
                var e = this;
                e.silent || (this.silent = !0, this.getStore().reload({
                        callback: function() {
                                e.silent = !1
                        }
                }))
        },
        reselectSelection: function() {
                if (0 == this.getSelectionModel().getSelection().length) return null;
                var e = this.module.tf_primaryKey,
                t = this.getSelectionModel().getSelection()[0].get(e),
                i = this;
                this.getSelectionModel().deselectAll(),
                this.getStore().each(function(o) {
                        return o.get(e) == t ? (i.getSelectionModel().select(o), !1) : void 0
                })
        },
        getSelectionCount: function() {
                return this.getSelectionModel().getSelection().length
        },
        getSelection: function() {
                return this.getSelectionModel().getSelection()
        },
        getSelectionTitleTpl: function() {
                var e = [];
                return Ext.each(this.getSelectionModel().getSelection(),
                function(t) {
                        e.push(t.getTitleTpl() ? t.getTitleTpl() : t.getIdValue())
                }),
                e
        },
        getSelectionIds: function() {
                var e = [];
                return Ext.each(this.getSelectionModel().getSelection(),
                function(t) {
                        e.push(t.getIdValue())
                }),
                e
        },
        refreshSelectedRecord: function() {
                if (0 == this.getSelectionModel().getSelection().length) return null;
                var e = this.getSelectionModel().getSelection()[0],
                t = this;
                this.module.model.load(e.getIdValue(), {
                        success: function(i) {
                                var o = Ext.create(t.module.model, Ext.decode(i.raw));
                                e.fields.each(function(t) {
                                        e.get(t.name) != o.get(t.name) && e.set(t.name, o.get(t.name))
                                }),
                                e.commit()
                        }
                })
        },
        refreshAll: function() {
                this.store.reload(),
                this.up("modulepanel").refreshNavigate(),
                this.module.tf_linkedModule && Jfok.modules.refreshModuleGrid(this.module.tf_linkedModule)
        },
        getFirstSelectedRecord: function() {
                if (0 == this.getSelectionModel().getSelection().length) return Jfok.system.warnInfo("\u8bf7\u5148\u9009\u62e9\u4e00\u6761\u8bb0\u5f55,\u7136\u540e\u518d\u6267\u884c\u6b64\u64cd\u4f5c\uff01"),
                null;
                var e = this.getSelectionModel().getSelection()[0];
                return e
        },
        selectNextRecord: function() {
                var e = this.getSelectionModel();
                if (0 == e.getCount()) this.store.getCount() > 0 ? e.select(this.store.getAt(0)) : Jfok.system.warnInfo("\u5f53\u524d\u5217\u8868\u4e2d\u6ca1\u6709\u53ef\u663e\u793a\u7684\u8bb0\u5f55!");
                else {
                        var t = e.getSelection()[0].index,
                        i = this.store.getPageFromRecordIndex(t);
                        if (t == this.store.getTotalCount() - 1) Jfok.system.warnInfo("\u5df2\u7ecf\u662f\u5f53\u524d\u5217\u8868\u7684\u6700\u540e\u4e00\u6761\u8bb0\u5f55!");
                        else if (this.store.buffered) e.select(this.store.getAt(t + 1));
                        else {
                                if (t == i * this.store.pageSize - 1) return this.store.nextPage({
                                        scope: this,
                                        callback: function(t) {
                                                t.length > 0 && e.select(t[0])
                                        }
                                }),
                                void 0;
                                this.store.each(function(i) {
                                        return i.index == t + 1 ? (e.select(i), !1) : void 0
                                })
                        }
                }
        },
        getGridSettingMenu: function() {
                return this.gridSettingMenu || (this.gridSettingMenu = Ext.create("Jfok.m.w.GridSettingMenu", {
                        modulegrid: this
                })),
                this.gridSettingMenu
        },
        selectPriorRecord: function() {
                var e = this.getSelectionModel();
                if (0 == e.getCount()) return this.store.getCount() > 0 ? (e.select(this.store.getAt(0)), !0) : (Jfok.system.warnInfo("\u5f53\u524d\u5217\u8868\u4e2d\u6ca1\u6709\u53ef\u663e\u793a\u7684\u8bb0\u5f55!"), !1);
                var t = e.getSelection()[0].index,
                i = this.store.getPageFromRecordIndex(t);
                return 0 == t ? (Jfok.system.warnInfo("\u5df2\u7ecf\u662f\u5f53\u524d\u5217\u8868\u7684\u7b2c\u4e00\u6761\u8bb0\u5f55!"), !1) : this.store.buffered ? (e.select(this.store.getAt(t - 1)), !0) : t == (i - 1) * this.store.pageSize ? (1 == this.store.currentPage ? this.store.loadPage(1) : this.store.previousPage({
                        scope: this,
                        callback: function(t) {
                                t.length > 0 && e.select(t[t.length - 1])
                        }
                }), void 0) : (this.store.each(function(i) {
                        return i.index == t - 1 ? (e.select(i), !1) : void 0
                }), void 0)
        }
}),
Ext.define("Jfok.m.ToolBar", {
        extend: "Ext.toolbar.Toolbar",
        alias: "widget.moduletoolbar",
        requires: ["Jfok.m.w.GridSchemeCombo", "Jfok.m.w.DetailSchemeCombo", "Jfok.m.w.GridGroupCombo"],
        layout: {
                overflowHandler: "Menu"
        },
        initComponent: function() {
                var e = this;
                this.items = [],
                this.items.push({
                        text: "\u663e\u793a",
                        icon: "images/button/display.png",
                        itemId: "display"
                });
                var t = this.modulePanel.module.tf_userRole;
                if ("_Addition" == this.modulePanel.module.tf_moduleName) {
                        var i = Jfok.modules.getModule(this.modulePanel.parentFilter.moduleName).tf_userRole;
                        i.tf_additionInsert && this.items.push({
                                text: "\u65b0\u589e",
                                icon: "images/button/new.png",
                                itemId: "new"
                        }),
                        i.tf_additionEdit && this.items.push({
                                text: "\u4fee\u6539",
                                icon: "images/button/edit.png",
                                itemId: "edit"
                        }),
                        i.tf_additionDelete && this.items.push({
                                text: "\u5220\u9664",
                                icon: "images/button/delete.png",
                                itemId: "delete"
                        })
                } else {
                        if (t.tf_allowInsert && "normal" == this.modulePanel.gridType) {
                                var o = [{
                                        text: "\u590d\u5236\u65b0\u589e",
                                        tooltip: "\u65b0\u589e\u65f6\u5148\u5c06\u5f53\u524d\u8bb0\u5f55\u6dfb\u5165\u5230\u65b0\u8bb0\u5f55\u4e2d",
                                        itemId: "newwithcopy"
                                }],
                                n = this.modulePanel.module.moduleExcelRecordAdds;
                                n && n.length > 0 && (o.push("-"), o.push({
                                        text: "\u4e0a\u4f20Excel\u8868\u5355\u6761\u65b0\u589e",
                                        tooltip: "\u6839\u636e\u6307\u5b9a\u7684excel\u8868\u6dfb\u597d\u6570\u636e\u540e\uff0c\u4e0a\u4f20\u65b0\u589e\u4e00\u6761\u8bb0\u5f55",
                                        itemId: "uploadinsertexcelrecord",
                                        methodId: n[0].tf_id,
                                        remark: n[0].tf_remark
                                })),
                                this.modulePanel.module.tf_allowInsertExcel && (o.push("-"), o.push({
                                        text: "\u4e0a\u4f20Excel\u8868\u6279\u91cf\u65b0\u589e",
                                        tooltip: "\u6839\u636e\u4e0b\u8f7d\u7684Excel\u8868\u4e2d\u7684\u8981\u6c42\u6dfb\u52a0\u6570\u636e\u540e\uff0c\u4e0a\u4f20\u6279\u91cf\u65b0\u589e\u6570\u636e",
                                        itemId: "uploadinsertexcel"
                                })),
                                this.items.push({
                                        text: "\u65b0\u589e",
                                        icon: "images/button/new.png",
                                        itemId: "new",
                                        xtype: "splitbutton",
                                        menu: {
                                                items: o
                                        }
                                })
                        }
                        t.tf_allowEdit && "normal" == this.modulePanel.gridType && (this.items.push({
                                text: "\u4fee\u6539",
                                icon: "images/button/edit.png",
                                itemId: "edit"
                        }), this.modulePanel.module.tf_fileField && this.items.push({
                                text: "\u4e0a\u4f20",
                                icon: "images/button/upload.png",
                                tooltip: "\u4e0a\u4f20\u6b64\u6761\u8bb0\u5f55\u5305\u542b\u7684\u6587\u4ef6",
                                itemId: "uploadfile"
                        })),
                        t.tf_allowAuditing && this.items.push({
                                text: "\u5ba1\u6838",
                                icon: "images/button/auditing.png",
                                itemId: "auditing",
                                xtype: "splitbutton",
                                menu: {
                                        items: [{
                                                text: "\u81ea\u52a8\u5ba1\u6838\u9009\u4e2d\u7684\u8bb0\u5f55",
                                                itemId: "auditing_thisselection"
                                        },
                                        "-", {
                                                text: "\u81ea\u52a8\u5ba1\u6838\u5f53\u524d\u9875\u7684\u8bb0\u5f55",
                                                tooltip: "\u81ea\u52a8\u5ba1\u6838\u5f53\u524d\u9875\u663e\u793a\u7684\u672a\u5ba1\u6838\u8bb0\u5f55\u3002",
                                                itemId: "auditing_thispage"
                                        },
                                        "-", {
                                                text: "\u5ba1\u6838\u5f53\u524d\u5bfc\u822a\u503c\u786e\u5b9a\u7684\u8bb0\u5f55",
                                                tooltip: "\u81ea\u52a8\u5ba1\u6838\u5f53\u524d\u5bfc\u822a\u6761\u4ef6\u503c\u9650\u5b9a\u4e0b\u7684\u6240\u6709\u672a\u5ba1\u6838\u8bb0\u5f55\u3002",
                                                itemId: "auditing_thiscondition"
                                        },
                                        "-", {
                                                text: "\u5168\u90e8\u81ea\u52a8\u5ba1\u6838",
                                                tooltip: "\u5728\u6743\u9650\u8303\u56f4\u5185\uff0c\u5c06\u672c\u6a21\u5757\u672a\u5ba1\u6838\u7684\u8bb0\u5f55\u5168\u90e8\u81ea\u52a8\u5ba1\u6838\u3002",
                                                itemId: "auditing_all"
                                        }]
                                }
                        }),
                        t.tf_allowApprove && t.tf_approveOrder > 0 && this.items.push({
                                text: "\u5ba1\u6279",
                                icon: "images/button/approve.png",
                                itemId: "approve",
                                xtype: "splitbutton",
                                menu: {
                                        items: [{
                                                text: "\u81ea\u52a8\u5ba1\u6279\u9009\u4e2d\u7684\u8bb0\u5f55",
                                                itemId: "approve_thisselection"
                                        },
                                        "-", {
                                                text: "\u81ea\u52a8\u5ba1\u6279\u5f53\u524d\u9875\u7684\u8bb0\u5f55",
                                                tooltip: "\u81ea\u52a8\u5ba1\u6279\u5f53\u524d\u9875\u663e\u793a\u7684\u6211\u80fd\u5ba1\u6279\u7684\u8bb0\u5f55\u3002",
                                                itemId: "approve_thispage"
                                        },
                                        "-", {
                                                text: "\u5ba1\u6279\u5f53\u524d\u5bfc\u822a\u503c\u786e\u5b9a\u7684\u8bb0\u5f55",
                                                tooltip: "\u81ea\u52a8\u5ba1\u6279\u5f53\u524d\u5bfc\u822a\u6761\u4ef6\u503c\u9650\u5b9a\u4e0b\u7684\u6240\u6709\u6211\u80fd\u5ba1\u6279\u8bb0\u5f55\u3002",
                                                itemId: "approve_thiscondition"
                                        },
                                        "-", {
                                                text: "\u5168\u90e8\u81ea\u52a8\u5ba1\u6279",
                                                tooltip: "\u5728\u6743\u9650\u8303\u56f4\u5185\uff0c\u5c06\u672c\u6a21\u5757\u6211\u80fd\u5ba1\u6279\u7684\u8bb0\u5f55\u5168\u90e8\u81ea\u52a8\u5ba1\u6279\u3002",
                                                itemId: "approve_all"
                                        }]
                                }
                        }),
                        t.tf_allowPayment && this.items.push({
                                text: "\u652f\u4ed8",
                                icon: "images/button/approve.png",
                                itemId: "payout"
                        }),
                        t.tf_allowDelete && "normal" == this.modulePanel.gridType && this.items.push({
                                text: "\u5220\u9664",
                                icon: "images/button/delete.png",
                                itemId: "delete"
                        })
                }
                if (this.modulePanel.module.moduleAdditions && Ext.each(this.modulePanel.module.moduleAdditions,
                function(i) {
                        t.userRoleAdditions && Ext.each(t.userRoleAdditions,
                        function(t) {
                                if (t.tf_moduleAdditionFunctionId == i.tf_moduleAdditionFunctionId) {
                                        var o = {
                                                tooltip: i.tf_description,
                                                text: i.tf_title,
                                                icon: i.iconURL,
                                                additionName: i.tf_additionName,
                                                needRecord: i.tf_needRecord,
                                                showWindow: i.tf_showWindow
                                        };
                                        if (i.tf_menuName) {
                                                var n = null;
                                                Ext.each(e.items,
                                                function(e) {
                                                        return e.menuText == i.tf_menuName ? (n = e, !1) : void 0
                                                }),
                                                n || (n = {
                                                        text: i.tf_menuName,
                                                        menuText: i.tf_menuName,
                                                        xtype: "splitbutton",
                                                        menu: []
                                                },
                                                e.items.push(n)),
                                                n.menu.push(o),
                                                Ext.String.endsWith(i.tf_title, " ") && n.menu.push("-")
                                        } else e.items.push(o);
                                        return ! 1
                                }
                        })
                }), this.modulePanel.module.tf_hasAddition && t.tf_additionBrowse) {
                        var a = [];
                        t.tf_additionInsert && (a.push({
                                text: "\u65b0\u589e\u9644\u4ef6",
                                icon: "images/button/additionadd.png",
                                itemId: "additionviewandinsert"
                        }), a.push("-")),
                        a.push({
                                text: "\u9884\u89c8\u6240\u6709\u9644\u4ef6",
                                itemId: "additionview"
                        },
                        "-", {
                                text: "\u4e0b\u8f7d\u6240\u6709\u9644\u4ef6",
                                itemId: "downloadall",
                                icon: "images/button/download.png"
                        }),
                        this.items.push({
                                xtype: "splitbutton",
                                tooltip: "\u663e\u793a\u5f53\u524d\u8bb0\u5f55\u7684\u6240\u6709\u9644\u4ef6",
                                icon: "images/button/addition.png",
                                itemId: "additiongrid",
                                menu: a
                        })
                }
                var l = this.modulePanel.module.recordPrintSchemes,
                r = [{
                        text: "\u5217\u8868\u5bfc\u51fa\u81f3excel",
                        icon: "images/button/excel.png",
                        itemId: "exportgrid"
                },
                "-"],
                d = this.modulePanel.module.moduleExcelReports;
                d && d.length > 0 ? Ext.each(d,
                function(e) {
                        r.push({
                                reportId: e.tf_id,
                                text: e.tf_name,
                                action: "excelreport",
                                icon: "images/button/report.png"
                        })
                }) : r.push({
                        text: "\u9009\u4e2d\u8bb0\u5f55\u5bfc\u51fa\u81f3excel",
                        icon: "images/button/excelone.png",
                        schemeId: null,
                        action: "exportrecord"
                }),
                l && l.length > 1 && (r.push("-"), Ext.each(l,
                function(e) {
                        r.push({
                                text: e.tf_schemeName,
                                schemeId: e.tf_printSchemeId,
                                action: "exportrecord"
                        })
                })),
                this.items.push({
                        xtype: "splitbutton",
                        icon: "images/button/excel.png",
                        menu: r,
                        handler: function(e) {
                                var t = e.down("#exportgrid");
                                t.fireEvent("click", t)
                        }
                });
                var s = [{
                        text: "\u6253\u5370\u5f53\u524d\u9875",
                        icon: "images/button/print.png",
                        itemId: "printgrid",
                        handler: function(e) {
                                Jfok.lib.GridPrinter.mainTitle = e.up("modulepanel").down("modulegrid").module.tf_title + "<br />\u3000",
                                Jfok.lib.GridPrinter.print(e.up("modulepanel").down("modulegrid"))
                        }
                },
                {
                        text: "\u6253\u5370\u6240\u6709\u8bb0\u5f55",
                        icon: "images/button/print.png",
                        itemId: "printgridall"
                }];
                l && l.length > 1 && (s.push("-"), Ext.each(l,
                function(e) {
                        s.push({
                                text: e.tf_schemeName,
                                schemeId: e.tf_printSchemeId,
                                action: "printrecord"
                        })
                })),
                d && d.length > 0 && (s.push("-"), Ext.each(d,
                function(e) {
                        s.push({
                                reportId: e.tf_id,
                                text: e.tf_name,
                                action: "showpdfreport",
                                icon: "images/button/report.png"
                        })
                })),
                this.items.push({
                        xtype: "splitbutton",
                        icon: "images/button/print.png",
                        menu: s,
                        handler: function(e) {
                                console.log("aa");
                                var t = e.down("#printgrid");
                                t.handler(t)
                        }
                }),
                this.modulePanel.module.tf_hasChart && this.items.push({
                        xtype: "button",
                        icon: "images/button/chart_bar.png",
                        action: "chart",
                        tooltip: "\u56fe\u8868\u5206\u6790"
                });
                var u = this.modulePanel.module.moduleSubToolbar;
                if (u && u.length > 0 && u.length <= 2) {
                        this.items.push("-");
                        for (var c in u) this.items.push(Jfok.m.ChildToolBar.getModuleButtonWithSingle(u[c].tf_subMoudleName, u[c].tf_openInWindow))
                }
                this.items.push("-", "\u7b5b\u9009", {
                        width: 60,
                        xtype: "gridsearchfield",
                        store: this.modulePanel.store
                }),
                this.callParent(arguments)
        }
}),
Ext.define("Jfok.m.ModulePanel", {
        extend: "Ext.panel.Panel",
        alias: "widget.modulepanel",
        frame: !1,
        border: !1,
        layout: "border",
        requires: ["Jfok.m.ToolBar", "Jfok.m.ChildToolBar", "Jfok.m.factory.ModelFactory", "Jfok.m.Grid", "Jfok.m.Detail", "Jfok.m.navigate.Navigate"],
        module: null,
        collapseNavigate: !1,
        enableNavigate: !0,
        param: {},
        config: {
                parentFilter: null,
                gridType: "normal"
        },
        initComponent: function() {
                this.margin = "neptune" === Ext.themeName ? "0 0 0 0": "1 1 1 1",
                Ext.apply(this, this.param),
                console.log(this.module),
                this.store = Ext.create("Jfok.m.GridStore", {
                        module: this.module,
                        modulePanel: this
                }),
                this.moduleName = this.module.tf_moduleName;
                var e = [{
                        region: "center",
                        xtype: "modulegrid",
                        modulePanel: this,
                        parentFilter: this.parentFilter,
                        gridType: this.gridType
                },
                {
                        region: "east",
                        xtype: "recorddetail",
                        modulePanel: this,
                        width: 400,
                        title: "\u8bb0\u5f55\u660e\u7ec6",
                        split: !0,
                        collapsible: !0,
                        collapsed: !0,
                        collapseMode: "mini"
                }];
                "_Addition" == this.moduleName ? (this.store.pageSize = 100, this.items = [{
                        xtype: "attachmenttabpanel",
                        region: "center",
                        store: this.store,
                        grid_detail: e
                }]) : this.items = e,
                this.enableNavigate && this.module.moduleGridNavigates && this.module.moduleGridNavigates.length > 0 && this.items.push({
                        region: "west",
                        width: 258,
                        title: "\u5bfc\u822a",
                        xtype: "modulenavigate",
                        defaultNavigateValues: this.param ? this.param.defaultNavigateValues: null,
                        parentFilter: this.parentFilter,
                        module: this.module,
                        split: !0,
                        collapsed: this.collapseNavigate,
                        collapsible: !0,
                        collapseMode: "mini"
                }),
                this.callParent(arguments)
        },
        listeners: {
                render: function() {}
        },
        applyParentFilter: function(e) {
                this.parentFilter = e,
                this.down("modulegrid").setParentFilter(e),
                this.down("modulenavigate") && this.down("modulenavigate").setParentFilter(e)
        },
        refreshNavigate: function() {
                var e = this.down("modulenavigate tool[type=refresh]");
                e && e.fireEvent("click", e)
        },
        changeParentFilter: function(e, t, i, o) {
                var n = Jfok.modules.getModuleInfoWithName(e),
                a = {
                        moduleId: n.tf_moduleId,
                        moduleName: e,
                        tableAsName: n.tableAsName,
                        primarykey: n.tf_primaryKey,
                        fieldtitle: n.tf_title,
                        equalsValue: t,
                        equalsMethod: null,
                        text: i,
                        isCodeLevel: n.codeLevel
                };
                this.parentFilter = a,
                this.down("modulegrid").changeParentFilter(a, o),
                this.down("modulenavigate") && this.down("modulenavigate").changeParentFilter(a, o)
        }
}),
Ext.define("Jfok.attachment.AttachmentNavigate", {
        extend: "Ext.panel.Panel",
        alias: "widget.attachmentnavigate",
        title: "\u9644\u4ef6\u7f29\u7565\u56fe",
        region: "west",
        width: 330,
        layout: "fit",
        split: !0,
        collapsible: !0,
        tools: [{
                type: "refresh",
                tooltip: "\u5237\u65b0\u6570\u636e"
        }],
        initComponent: function() {
                this.tbar = {
                        layout: {
                                overflowHandler: "Menu"
                        },
                        items: [{
                                text: "\u4e0b\u8f7d",
                                itemId: "download",
                                icon: "images/button/download.png"
                        },
                        {
                                text: "\u5168\u90e8\u4e0b\u8f7d",
                                itemId: "downloadall",
                                tooltip: "\u5c06\u5168\u90e8\u6587\u4ef6\u9644\u4ef6\u538b\u7f29\u6210.zip\u6587\u4ef6\u540e\u4e0b\u8f7d",
                                icon: "images/button/download.png"
                        },
                        "-", "\u7b5b\u9009", {
                                width: 80,
                                xtype: "searchfield",
                                store: this.store
                        }]
                },
                this.items = [{
                        xtype: "attachmentview",
                        store: this.store
                }],
                this.callParent(arguments)
        }
}),
Ext.define("Jfok.attachment.AttachmentTabPanel", {
        extend: "Ext.tab.Panel",
        alias: "widget.attachmenttabpanel",
        tabPosition: "bottom",
        initComponent: function() {
                this.items = [{
                        layout: "border",
                        title: "\u9644\u4ef6\u64cd\u4f5c",
                        icon: "images/module/_Addition.png",
                        items: this.grid_detail
                },
                {
                        layout: "border",
                        title: "\u9644\u4ef6\u663e\u793a",
                        icon: "images/button/display.png",
                        items: [{
                                title: "\u9644\u4ef6\u6587\u4ef6\u9884\u89c8",
                                itemId: "attachmentpreview",
                                xtype: "panel",
                                region: "center",
                                layout: "fit",
                                items: [{
                                        xtype: "component",
                                        itemId: "attachmentfile",
                                        hidden: !0,
                                        autoEl: {
                                                tag: "iframe"
                                        }
                                },
                                {
                                        xtype: "imagepreviewpanel",
                                        hidden: !0
                                },
                                Ext.create("Jfok.m.form.DisplayForm", {
                                        module: Jfok.modules.getModule("_Addition"),
                                        disableSetWindowTitle: !0
                                })]
                        },
                        {
                                xtype: "attachmentnavigate",
                                store: this.store
                        }]
                }],
                this.listeners = {
                        scope: this,
                        afterrender: function() {
                                this.setActiveTab(1),
                                this.setActiveTab(0),
                                this.up("modulepanel").param && this.up("modulepanel").param.showAdditionView && this.setActiveTab(1),
                                this.down("displayform toolbar").setVisible(!1)
                        }
                },
                this.callParent(arguments)
        }
}),
Ext.define("Jfok.attachment.AttachmentView", {
        extend: "Ext.view.View",
        alias: "widget.attachmentview",
        baseCls: "images-view",
        tpl: new Ext.XTemplate('<tpl for=".">', '<div class="thumb-wrap" id="_preview_{tf_additionId}" >', '<div class="thumb"><img src="', '<tpl if="tf_filename">', "attachment/preview.do?id={tf_additionId}", "<tpl else>", "images/addition/no.png", "</tpl>", '" data-qtip="{tf_name}<br/>{_t9502___tf_name}<br/><tpl if="tf_filename"> {tf_filename}', "<tpl else>&nbsp;", "</tpl>", '"/></div>', "<span>", "<a onclick=\"javascript:__smr('_Addition','", "{tf_additionId}", '\');return false;" href="#">', "{tf_name}</a>", '</br><tpl if="tf_filename"> {tf_filename}', "<tpl else>&nbsp;", "</tpl>\u3000</span>", "</div>", "</tpl>", '<div class="x-clear"></div>'),
        trackOver: !0,
        overItemCls: "x-item-over",
        itemSelector: "div.thumb-wrap",
        autoScroll: !0
}),
Ext.define("Jfok.attachment.ImagePreviewPanel", {
        extend: "Ext.panel.Panel",
        alias: "widget.imagepreviewpanel",
        layout: "fit",
        autoScroll: !1,
        frame: !1,
        border: !1,
        tbar: [{
                text: "\u7f29\u653e\u663e\u793a",
                itemId: "stretch",
                icon: "images/button/pictureStretch.png",
                tooltip: "\u538b\u7f29\u6216\u653e\u5927\u56fe\u7247\u4ee5\u9002\u5408\u663e\u793a",
                toggleGroup: "imagepreviewtoggle",
                pressed: !0,
                listeners: {
                        click: function(e) {
                                if (e.pressed) {
                                        var t = e.up("imagepreviewpanel");
                                        t.down("#stretchpanel image").src != t.url && t.down("#stretchpanel image").setSrc(t.url),
                                        t.down("#normalpanel").setVisible(!1),
                                        t.down("#stretchpanel").setVisible(!0),
                                        t.adjustSize()
                                } else e.toggle(!0, !0)
                        }
                }
        },
        {
                text: "\u9002\u5408\u5217\u5bbd",
                itemId: "adjustwidth",
                icon: "images/button/adjustwidth.png",
                tooltip: "\u56fe\u7247\u6839\u636e\u5f53\u524d\u5bbd\u5ea6\u6765\u9002\u5408\u663e\u793a",
                toggleGroup: "imagepreviewtoggle",
                pressed: !1,
                listeners: {
                        click: function(e) {
                                if (e.pressed) {
                                        var t = e.up("imagepreviewpanel");
                                        t.down("#normalpanel image").src != t.url && t.down("#normalpanel image").setSrc(t.url),
                                        t.down("#normalpanel").setVisible(!0),
                                        t.down("#stretchpanel").setVisible(!1),
                                        t.adjustSize()
                                } else e.toggle(!0, !0)
                        }
                }
        },
        {
                text: "\u539f\u59cb\u5c3a\u5bf8",
                icon: "images/button/pictureNormal.png",
                tooltip: "\u4ee5\u539f\u59cb\u5c3a\u5bf8\u663e\u793a\u56fe\u7247",
                toggleGroup: "imagepreviewtoggle",
                listeners: {
                        click: function(e) {
                                if (e.pressed) {
                                        var t = e.up("imagepreviewpanel");
                                        t.down("#normalpanel image").src != t.url && t.down("#normalpanel image").setSrc(t.url),
                                        t.down("#normalpanel").setVisible(!0),
                                        t.down("#stretchpanel").setVisible(!1),
                                        t.adjustSize()
                                } else e.toggle(!0, !0)
                        }
                }
        },
        "-", {
                text: "\u6253\u5370",
                icon: "images/button/print.png",
                handler: function(e) {
                        e.up("imagepreviewpanel").printImage(e.up("imagepreviewpanel").url)
                }
        }],
        items: [{
                xtype: "panel",
                layout: "fit",
                items: [{
                        xtype: "panel",
                        layout: "absolute",
                        itemId: "stretchpanel",
                        frame: !1,
                        border: !1,
                        items: [{
                                itemId: "imagepanel",
                                autoScroll: !0,
                                x: -100,
                                y: -100,
                                width: 1,
                                height: 1,
                                layout: "fit",
                                items: [{
                                        xtype: "image"
                                }],
                                border: !0
                        }],
                        listeners: {
                                resize: function(e) {
                                        e.up("imagepreviewpanel").adjustSize()
                                }
                        }
                },
                {
                        itemId: "normalpanel",
                        frame: !1,
                        border: !1,
                        hidden: !0,
                        layout: "fit",
                        items: [{
                                itemId: "imagepanel",
                                autoScroll: !0,
                                frame: !1,
                                border: !0,
                                padding: "1 1 1 1",
                                items: [{
                                        xtype: "image"
                                }]
                        }],
                        listeners: {
                                resize: function(e) {
                                        e.up("imagepreviewpanel").adjustSize()
                                }
                        }
                }]
        }],
        url: null,
        imageWidth: null,
        imageHeight: null,
        imagepading: 1,
        setImage: function(e, t, i) {
                this.url = e,
                this.down("#stretch").pressed ? this.down("#stretchpanel image").setSrc(e) : this.down("#normalpanel image").setSrc(e),
                this.imageHeight = i,
                this.imageWidth = t,
                this.adjustSize()
        },
        adjustSize: function() {
                if (this.imageWidth) if (this.down("#stretch").pressed) {
                        var e = this.down("#stretchpanel"),
                        t = this.down("#stretchpanel #imagepanel"),
                        i = e.getHeight(),
                        o = e.getWidth();
                        if (i / o > this.imageHeight / this.imageWidth) {
                                var n = o - 2 * this.imagepading,
                                a = n * this.imageHeight / this.imageWidth;
                                t.setWidth(n),
                                t.setPosition(this.imagepading, (i - a) / 2),
                                t.setHeight(a)
                        } else {
                                var a = i - 2 * this.imagepading,
                                n = a * this.imageWidth / this.imageHeight;
                                t.setWidth(n),
                                t.setPosition((o - n) / 2, this.imagepading),
                                t.setHeight(a)
                        }
                } else if (this.down("#adjustwidth").pressed) {
                        var e = this.down("#normalpanel"),
                        t = this.down("#normalpanel #imagepanel"),
                        n = e.getWidth() - 2 - 2,
                        a = n * this.imageHeight / this.imageWidth;
                        this.down("#normalpanel image").setWidth(n),
                        this.down("#normalpanel image").setHeight(a)
                } else this.down("#normalpanel image").setWidth(this.imageWidth),
                this.down("#normalpanel image").setHeight(this.imageHeight)
        },
        printImage: function(e) {
                var t = "\u9644\u4ef6\u56fe\u7247\u6253\u5370",
                i = ['<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN">', "<html>", "<head>", '<meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />', "<title>" + t + "</title>", "</head>", "<body>", '<img src="' + e + '"/>', "</body>", "</html>"],
                o = Ext.create("Ext.XTemplate", i).apply(),
                n = window.open("", "attachementfileprint");
                n.document.open(),
                n.document.write(o),
                n.document.close(),
                n.print()
        }
}),
Ext.define("Jfok.m.window.AttachmentWindow", {
        extend: "Ext.window.Window",
        alias: "widget.attahcmentwindow",
        layout: "fit",
        maximizable: !0,
        icon: "images/module/_Addition.png",
        height: 600,
        width: 800,
        shadowOffset: 20,
        closeAction: "hide",
        pModuleName: null,
        pModuleTitle: null,
        aid: null,
        aname: null,
        param: null,
        initComponent: function() {
                var e = Jfok.modules.getModule("_Addition");
                this.title = this.pModuleTitle + "\u9644\u4ef6\u300e" + this.aname + "\u300f";
                var t = e.getNewPanelWithParentModule("tabItemId", this.pModuleName, this.aid, this.name, {
                        showAdditionView: !0,
                        param: this.param
                },
                !0);
                t && (t.header = null, t.title = null, this.items = [t]),
                this.callParent(arguments)
        },
        changeParentFilter: function(e, t, i, o, n) {
                this.pModuleName = e,
                this.pModuleTitle = t,
                this.aid = i,
                this.aname = o,
                this.setTitle(this.pModuleTitle + "\u9644\u4ef6\u300e" + this.aname + "\u300f"),
                this.down("modulepanel").changeParentFilter(e, i, o, n)
        },
        listeners: {
                show: function(e) {
                        e.iso || (e.iso = !0, e.down("panel").getHeader().hide(), e.down("panel").down("modulenavigate").collapse(), e.down("attachmenttabpanel").setActiveTab(1))
                }
        }
}),
Ext.define("Jfok.m.window.BaseWindow", {
        extend: "Ext.window.Window",
        alias: "widget.basewindow",
        layout: "fit",
        maximizable: !0,
        closeAction: "hide",
        bodyStyle: "padding : 2px 2px 0",
        shadowOffset: 30,
        layout: "fit",
        module: void 0,
        formScheme: void 0,
        formtype: void 0,
        form: void 0,
        initComponent: function() {
                this.maxHeight = .9 * document.body.clientHeight;
                var e = this;
                this.formScheme = this.module.moduleFormSchemes[0],
                this.module.moduleFormSchemes.length > 1 && Ext.Array.each(this.module.moduleFormSchemes,
                function(t) {
                        return t.tf_displayMode == e.formtype ? (e.formScheme = t, !1) : void 0
                });
                var t = this.formScheme.tf_windowWidth,
                i = this.formScheme.tf_windowHeight; - 1 == t && -1 == i ? (this.width = 600, this.height = 400, this.maximized = !0) : ( - 1 != t && (this.width = Math.min(t, document.body.clientWidth - 2)), -1 != i && (this.height = Math.min(i, document.body.clientHeight - 2))),
                -1 == t && -1 != i && (this.width = document.body.clientWidth - 40),
                this.icon = this.module.iconURL,
                this.tools = [{
                        type: "collapse",
                        tooltip: "\u5f53\u524d\u8bb0\u5f55\u5bfc\u51fa\u81f3Excel"
                }],
                this.module.tf_hasAddition && this.tools.push({
                        type: "search",
                        tooltip: "\u663e\u793a\u9644\u4ef6"
                });
                var o = this.module.moduleSubToolbar;
                o && o.length > 0 && this.tools.push({
                        type: "gear",
                        tooltip: "\u5b50\u6a21\u5757\u64cd\u4f5c"
                });
                var n = {
                        module: this.module,
                        formScheme: this.formScheme
                };
                this.module.moduleFormSchemes.length > 1 && Ext.Array.each(this.module.moduleFormSchemes,
                function(t) {
                        return t.tf_displayMode == e.formtype ? (n.formScheme = t, !1) : void 0
                }),
                "display" == this.formtype ? this.form = Ext.create("Jfok.m.form.DisplayForm", n) : "new" == this.formtype ? (this.modal = !0, this.form = Ext.create("Jfok.m.form.NewForm", n)) : "edit" == this.formtype ? (this.modal = !0, this.form = Ext.create("Jfok.m.form.EditForm", n)) : "auditing" == this.formtype ? (this.modal = !0, this.form = Ext.create("Jfok.m.form.AuditingForm", n)) : "approve" == this.formtype ? (this.modal = !0, this.form = Ext.create("Jfok.m.form.ApproveForm", n)) : "payment" == this.formtype && (this.modal = !0, this.form = Ext.create("Jfok.m.form.PaymentForm", n)),
                this.items = [this.form],
                this.callParent(arguments)
        }
}),
Ext.define("Jfok.m.window.ExcelReportSelectSection", {
        extend: "Ext.window.Window",
        layout: "border",
        icon: "images/button/report.png",
        layout: "fit",
        width: 400,
        shadowOffset: 20,
        modal: !0,
        module: null,
        initComponent: function() {
                var e = this;
                this.title = "\u4e0b\u8f7d\u62a5\u8868 \u300e" + this.excelReport.tf_name + "\u300f";
                var t = (new Date).getFullYear(),
                i = (new Date).getMonth() + 1;
                1 == i ? (t--, i = 12) : i--,
                this.items = [{
                        xtype: "form",
                        region: "center",
                        bodyPadding: "5 5 5 5",
                        items: [{
                                xtype: "fieldset",
                                title: "\u8bf7\u9009\u62e9\u5e74\u5ea6\u548c\u6708\u4efd",
                                defaults: {
                                        labelWidth: 60,
                                        width: 150,
                                        labelAlign: "right"
                                },
                                items: [{
                                        xtype: "numberfield",
                                        name: "year",
                                        fieldLabel: "\u5e74\u5ea6",
                                        value: t,
                                        maxValue: 2050,
                                        minValue: 2e3
                                },
                                {
                                        xtype: "numberfield",
                                        name: "month",
                                        fieldLabel: "\u6708\u4efd",
                                        value: i,
                                        maxValue: 12,
                                        minValue: 1
                                }]
                        }],
                        buttons: ["->", {
                                text: "\u786e\u5b9a",
                                icon: "images/button/download.png",
                                handler: function(t) {
                                        var i = t.up("form");
                                        if (i.isValid()) {
                                                if (!e.excelReport.tf_filename) return Jfok.system.errorInfo("\u5f53\u524d\u9009\u4e2d\u7684\u62a5\u8868\u65b9\u6848\u6ca1\u6709\u4e0a\u4f20\u6a21\u677f\u6587\u4ef6\uff01"),
                                                void 0;
                                                if (Ext.String.endsWith(), !Ext.String.endsWith(e.excelReport.tf_filename, ".xls")) return Jfok.system.errorInfo("\u5f53\u524d\u9009\u4e2d\u7684\u62a5\u8868\u65b9\u6848\u7684\u4e0a\u4f20\u6587\u4ef6\u4e0d\u662f\u540e\u7f00\u540d\u4e3a.xls\u7684Excel\u6587\u4ef6\uff01"),
                                                void 0;
                                                window.location.href = Ext.String.format("rest/module/downloadexcelreportmonth.do?moduleId={0}&excelReportId={1}&year={2}&month={3}", e.module.tf_moduleId, e.excelReport.tf_id, i.getForm().findField("year").getValue(), i.getForm().findField("month").getValue())
                                        }
                                }
                        },
                        {
                                text: "\u5173\u95ed",
                                itemId: "close",
                                icon: "images/button/return.png",
                                handler: function(e) {
                                        e.up("window").close()
                                }
                        },
                        "->"]
                }],
                this.callParent(arguments)
        }
}),
Ext.define("Jfok.m.window.SubModuleWindow", {
        extend: "Ext.window.Window",
        alias: "widget.submodulewindow",
        layout: "fit",
        maximizable: !0,
        height: 600,
        width: 800,
        shadowOffset: 20,
        modal: !0,
        closeAction: "destroy",
        pModuleName: null,
        pModuleTitle: null,
        pId: null,
        pName: null,
        param: null,
        initComponent: function() {
                var e = this.childModuleName + "_pf_win",
                t = Jfok.modules.getModule(this.childModuleName),
                i = t.getNewPanelWithParentModule(e, this.pModuleName, this.pId, this.pName, this.param, !0);
                i.border = !1,
                i.frame = !1,
                this.icon = i.icon,
                this.title = i.title,
                delete i.icon,
                delete i.title,
                delete i.closable,
                this.items = [i],
                this.callParent(arguments)
        }
}),
Ext.define("Jfok.m.window.UploadInsertExcelRecordWindow", {
        extend: "Ext.window.Window",
        layout: "border",
        icon: "images/button/new.png",
        height: 300,
        width: 600,
        shadowOffset: 20,
        modal: !0,
        module: null,
        initComponent: function() {
                var e = this;
                this.title = this.module.tf_title + "\uff08\u4e0a\u4f20Excel\u6587\u4ef6\u5bfc\u5165\u65b0\u589e\u4e00\u6761\u8bb0\u5f55\uff09",
                this.items = [{
                        xtype: "form",
                        region: "center",
                        bodyPadding: 20,
                        defaults: {
                                anchor: "100%"
                        },
                        items: [{
                                xtype: "hidden",
                                name: "moduleId",
                                value: this.module.tf_moduleId
                        },
                        {
                                xtype: "hidden",
                                name: "id",
                                value: this.methodId
                        },
                        {
                                xtype: "displayfield",
                                value: this.remark
                        },
                        {
                                padding: "20 0 20 0",
                                fieldLabel: "\u65b0\u589e\u4e0a\u4f20\u6587\u4ef6",
                                msgTarget: "side",
                                width: 300,
                                name: "file",
                                xtype: "filefield",
                                allowBlank: !1,
                                emptyText: "\u8bf7\u9009\u62e9\u4e00\u4e2a\u5c0f\u4e8e10M\u7684\u6587\u4ef6...",
                                buttonText: "\u9009\u62e9\u6587\u4ef6"
                        },
                        {
                                xtype: "displayfield",
                                value: Ext.String.format('<a href="module/downloadinsertexcelrecord.do?moduleId={0}&methodId={1} " >\u5355\u51fb\u6b64\u5904\u4e0b\u8f7d\u7528\u4e8e\u65b0\u589e\u8bb0\u5f55\u7684Excel\u6587\u4ef6</a>', this.module.tf_moduleId, this.methodId)
                        }],
                        buttons: ["->", {
                                text: "\u4e0a\u4f20",
                                icon: "images/button/save.png",
                                handler: function(t) {
                                        var i = t.up("form");
                                        if (i.isValid()) {
                                                var o = i.getForm().findField("file").getValue(),
                                                n = o.lastIndexOf("."),
                                                a = o.substring(n, o.length);
                                                if (".xls" !== a) return Ext.MessageBox.show({
                                                        title: "\u9009\u62e9\u6587\u4ef6\u9519\u8bef",
                                                        msg: "\u8bf7\u9009\u62e9\u4e00\u4e2aExcel\u6587\u4ef6\u6765\u4e0a\u4f20\u65b0\u589e\u8bb0\u5f55\uff01",
                                                        buttons: Ext.MessageBox.OK,
                                                        icon: Ext.MessageBox.ERROR
                                                }),
                                                void 0;
                                                i.submit({
                                                        url: "module/uploadexcelinsertrecord.do",
                                                        waitMsg: "\u6b63\u5728\u5904\u7406\u4e2d\uff0c\u8bf7\u7a0d\u5019...",
                                                        timeout: 120,
                                                        success: function(t, i) {
                                                                var o = i.result.success;
                                                                o && (e.grid.refreshAll(), Ext.MessageBox.show({
                                                                        title: "\u4fdd\u5b58\u6210\u529f",
                                                                        msg: "\u4e0a\u4f20\u7684Excel\u5df2\u6210\u529f\u65b0\u589e\u8bb0\u5f55\uff0c\u8bf7\u627e\u5230\u76f8\u5e94\u8bb0\u5f55\uff0c\u67e5\u770b\u662f\u5426\u6b63\u786e\u3002",
                                                                        buttons: Ext.MessageBox.OK,
                                                                        icon: Ext.MessageBox.INFO
                                                                }))
                                                        },
                                                        failure: function(e, t) {
                                                                Ext.MessageBox.show({
                                                                        title: "\u9519\u8bef",
                                                                        msg: t.result.msg,
                                                                        buttons: Ext.MessageBox.OK,
                                                                        icon: Ext.MessageBox.ERROR
                                                                })
                                                        }
                                                })
                                        }
                                }
                        },
                        {
                                text: "\u5173\u95ed",
                                itemId: "close",
                                icon: "images/button/return.png",
                                handler: function(e) {
                                        e.up("window").close()
                                }
                        },
                        "->"]
                }],
                this.callParent(arguments)
        }
}),
Ext.define("Jfok.m.window.UploadInsertExcelWindow", {
        extend: "Ext.window.Window",
        layout: "border",
        icon: "images/button/new.png",
        height: 300,
        width: 600,
        shadowOffset: 20,
        modal: !0,
        module: null,
        initComponent: function() {
                var e = this;
                this.fnstart = this.module.tf_title + "(\u65b0\u589e\u5bfc\u5165\u8868)",
                this.errorMessage = Ext.String.format("\u6ce8\u610f\uff1a\u8bf7\u9009\u62e9\u6587\u4ef6\u540d\u4e3a \u300e{0}\u300f \u5f00\u5934\u7684Excel\u6587\u4ef6\u3002", this.fnstart),
                this.title = this.module.tf_title + "\uff08\u4e0a\u4f20Excel\u6587\u4ef6\u5bfc\u5165\u65b0\u589e\uff09",
                this.items = [{
                        xtype: "form",
                        region: "center",
                        bodyPadding: 20,
                        defaults: {
                                anchor: "100%"
                        },
                        items: [{
                                xtype: "hidden",
                                name: "moduleId",
                                value: this.module.tf_moduleId
                        },
                        {
                                xtype: "displayfield",
                                value: "\u6b64\u7a97\u53e3\u7528\u4e8e\u5c06\u4e0b\u8f7d\u7684\u65b0\u589eExcel\u8868\u683c\u586b\u5236\u597d\u65b0\u589e\u7684\u8bb0\u5f55\u540e\uff0c\u4e0a\u4f20\u5bfc\u5165\u65b0\u589e\u3002"
                        },
                        {
                                padding: "20 0 20 0",
                                fieldLabel: "\u65b0\u589e\u4e0a\u4f20\u6587\u4ef6",
                                msgTarget: "side",
                                width: 300,
                                name: "file",
                                xtype: "filefield",
                                allowBlank: !1,
                                emptyText: "\u8bf7\u9009\u62e9\u4e00\u4e2a\u5c0f\u4e8e10M\u7684\u6587\u4ef6...",
                                buttonText: "\u9009\u62e9\u6587\u4ef6"
                        },
                        {
                                xtype: "displayfield",
                                value: this.errorMessage,
                                fieldCls: "errorMessage"
                        }],
                        buttons: ["->", {
                                text: "\u4e0a\u4f20",
                                icon: "images/button/save.png",
                                handler: function(t) {
                                        var i = t.up("form");
                                        if (i.isValid()) {
                                                var o = i.getForm().findField("file").getValue(),
                                                n = o.lastIndexOf("."),
                                                a = o.substring(n, o.length);
                                                if (".xls" !== a || -1 == o.indexOf("\\" + e.fnstart)) return Ext.MessageBox.show({
                                                        title: "\u9009\u62e9\u6587\u4ef6\u9519\u8bef",
                                                        msg: e.errorMessage,
                                                        buttons: Ext.MessageBox.OK,
                                                        icon: Ext.MessageBox.ERROR
                                                }),
                                                void 0;
                                                i.submit({
                                                        url: "module/uploadexcelinsert.do",
                                                        waitMsg: "\u6b63\u5728\u5904\u7406\u4e2d\uff0c\u8bf7\u7a0d\u5019...",
                                                        timeout: 120,
                                                        success: function(e, t) {
                                                                var i = t.result.success;
                                                                if (i) {
                                                                        var o = "<br/><br/>\u4f60\u53ef\u4ee5\u5728\u7cfb\u7edf\u64cd\u4f5c\u65e5\u5fd7\u4e2d\u4e0b\u8f7d\u65b0\u589e\u5bfc\u5165\u5904\u7406\u8fc7\u540e\u7684Excel\u6587\u4ef6\u3002<br/><br/><a onclick=\"javascript:window.location.href='systemoperatelog/download.do?id=" + t.result.tag + '\';return false;" href="#">\u70b9\u51fb\u4e0b\u8f7d\u5df2\u5904\u7406\u8fc7\u7684\u65b0\u589e\u6587\u4ef6\uff0c\u5728\u6700\u540e\u4e00\u5217\u53ef\u4ee5\u770b\u5230\u5bfc\u5165\u60c5\u51b5</a><br/>';
                                                                        Ext.MessageBox.show({
                                                                                title: "\u4fdd\u5b58\u6210\u529f",
                                                                                msg: t.result.msg + o,
                                                                                buttons: Ext.MessageBox.OK,
                                                                                icon: Ext.MessageBox.INFO
                                                                        })
                                                                }
                                                        },
                                                        failure: function(e, t) {
                                                                Ext.MessageBox.show({
                                                                        title: "\u9519\u8bef",
                                                                        msg: t.result.msg,
                                                                        buttons: Ext.MessageBox.OK,
                                                                        icon: Ext.MessageBox.ERROR
                                                                })
                                                        }
                                                })
                                        }
                                }
                        },
                        {
                                text: "\u5173\u95ed",
                                itemId: "close",
                                icon: "images/button/return.png",
                                handler: function(e) {
                                        e.up("window").close()
                                }
                        },
                        "->"]
                }],
                this.callParent(arguments)
        }
}),
Ext.define("Jfok.m.window.UploadModuleFile", {
        extend: "Ext.window.Window",
        layout: "border",
        icon: "images/button/new.png",
        height: 150,
        width: 600,
        shadowOffset: 20,
        modal: !0,
        module: null,
        initComponent: function() {
                var e = this;
                this.title = "\u4e0a\u4f20\u6587\u4ef6 " + this.module.tf_title + "\u300e" + this.model.getTitleTpl() + "\u300f",
                this.items = [{
                        xtype: "form",
                        region: "center",
                        bodyPadding: 20,
                        defaults: {
                                anchor: "100%"
                        },
                        items: [{
                                xtype: "hidden",
                                name: "moduleId",
                                value: this.module.tf_moduleId
                        },
                        {
                                xtype: "hidden",
                                name: "id",
                                value: this.model.getIdValue()
                        },
                        {
                                padding: "10 0 0 0",
                                fieldLabel: "\u65b0\u589e\u4e0a\u4f20\u6587\u4ef6",
                                msgTarget: "side",
                                width: 300,
                                name: "file",
                                xtype: "filefield",
                                allowBlank: !1,
                                emptyText: "\u8bf7\u9009\u62e9\u4e00\u4e2a\u5c0f\u4e8e10M\u7684\u6587\u4ef6...",
                                buttonText: "\u9009\u62e9\u6587\u4ef6"
                        }],
                        buttons: ["->", {
                                text: "\u4e0a\u4f20",
                                icon: "images/button/save.png",
                                handler: function(t) {
                                        var i = t.up("form");
                                        i.isValid() && i.submit({
                                                url: "module/uploadmodulefile.do",
                                                waitMsg: "\u6b63\u5728\u5904\u7406\u4e2d\uff0c\u8bf7\u7a0d\u5019...",
                                                timeout: 120,
                                                success: function(t, i) {
                                                        var o = i.result.success;
                                                        o && (Jfok.system.smileInfo("\u6240\u9009\u7684\u6587\u4ef6\u5df2\u6210\u529f\u4e0a\u4f20!"), e.hide())
                                                },
                                                failure: function(e, t) {
                                                        t.response.responseText.indexOf("MaxUploadSize") ? Ext.MessageBox.show({
                                                                title: "\u4e0a\u4f20\u6587\u4ef6\u5931\u8d25",
                                                                msg: "\u5931\u8d25\u539f\u56e0:\u4e0a\u4f20\u6587\u4ef6\u7684\u5927\u5c0f\u8d85\u8fc7\u4e8610M,\u8bf7\u91cd\u65b0\u4e0a\u4f20...",
                                                                buttons: Ext.MessageBox.OK,
                                                                icon: Ext.MessageBox.ERROR
                                                        }) : Ext.Msg.alert("\u4e0a\u4f20\u6587\u4ef6\u5931\u8d25", t.response.responseText)
                                                }
                                        })
                                }
                        },
                        {
                                text: "\u5173\u95ed",
                                itemId: "close",
                                icon: "images/button/return.png",
                                handler: function(e) {
                                        e.up("window").close()
                                }
                        },
                        "->"]
                }],
                this.callParent(arguments)
        }
}),
Ext.define("Jfok.m.window.UploadNewAttachment", {
        extend: "Ext.window.Window",
        layout: "border",
        icon: "images/button/new.png",
        height: 150,
        width: 600,
        shadowOffset: 20,
        modal: !0,
        module: null,
        initComponent: function() {
                var e = this;
                this.title = "\u4e0a\u4f20\u9644\u4ef6 " + this.module.tf_title + "\u300e" + this.model.getTitleTpl() + "\u300f",
                this.items = [{
                        xtype: "form",
                        region: "center",
                        bodyPadding: 20,
                        defaults: {
                                anchor: "100%"
                        },
                        items: [{
                                xtype: "hidden",
                                name: "tf_additionId",
                                value: this.model.getIdValue()
                        },
                        {
                                padding: "10 0 0 0",
                                fieldLabel: "\u4e0a\u4f20\u65b0\u6587\u4ef6",
                                msgTarget: "side",
                                width: 300,
                                name: "file",
                                xtype: "filefield",
                                allowBlank: !1,
                                emptyText: "\u8bf7\u9009\u62e9\u4e00\u4e2a\u5c0f\u4e8e10M\u7684\u6587\u4ef6...",
                                buttonText: "\u9009\u62e9\u6587\u4ef6"
                        }],
                        buttons: ["->", {
                                text: "\u4e0a\u4f20",
                                icon: "images/button/save.png",
                                handler: function(t) {
                                        var i = t.up("form");
                                        i.isValid() && i.submit({
                                                url: "attachment/uploadnewattachment.do",
                                                waitMsg: "\u6b63\u5728\u5904\u7406\u4e2d\uff0c\u8bf7\u7a0d\u5019...",
                                                timeout: 120,
                                                success: function(t, i) {
                                                        var o = i.result.success;
                                                        o && (Jfok.system.smileInfo("\u6240\u9009\u7684\u6587\u4ef6\u5df2\u6210\u529f\u4e0a\u4f20!"), e.hide())
                                                },
                                                failure: function(e, t) {
                                                        t.response.responseText.indexOf("MaxUploadSize") ? Ext.MessageBox.show({
                                                                title: "\u4e0a\u4f20\u6587\u4ef6\u5931\u8d25",
                                                                msg: "\u5931\u8d25\u539f\u56e0:\u4e0a\u4f20\u6587\u4ef6\u7684\u5927\u5c0f\u8d85\u8fc7\u4e8610M,\u8bf7\u91cd\u65b0\u4e0a\u4f20...",
                                                                buttons: Ext.MessageBox.OK,
                                                                icon: Ext.MessageBox.ERROR
                                                        }) : Ext.Msg.alert("\u4e0a\u4f20\u6587\u4ef6\u5931\u8d25", t.response.responseText)
                                                }
                                        })
                                }
                        },
                        {
                                text: "\u5173\u95ed",
                                itemId: "close",
                                icon: "images/button/return.png",
                                handler: function(e) {
                                        e.up("window").close()
                                }
                        },
                        "->"]
                }],
                this.callParent(arguments)
        }
}),
Ext.define("Jfok.shared.ThemeSelectPanel", {
        extend: "Ext.panel.Panel",
        alias: "widget.themeselectpanel",
        border: !1,
        margin: "1 1 1 1",
        width: 11,
        height: 11,
        theme: null,
        themetext: null,
        listeners: {
                afterrender: function(e) {
                        Ext.create("Ext.tip.ToolTip", {
                                target: this.id,
                                html: "\u754c\u9762\u4e3b\u9898:" + this.themetext
                        });
                        var t = Ext.get(this.id);
                        t.on("click",
                        function() {
                                Cookies.set("theme", e.theme, 365),
                                location.reload(!0)
                        }),
                        t.addClsOnOver("theme-select-over")
                }
        }
}),
Ext.define("Jfok.shared.ThemeSelect", {
        extend: "Ext.panel.Panel",
        alias: "widget.themeselect",
        margin: "0 3 0 0",
        bodyStyle: "background:#cde; padding:0px;",
        border: !1,
        height: 26,
        width: 26,
        layout: {
                type: "table",
                columns: 2
        },
        initComponent: function() {
                this.defaults = {
                        xtype: "themeselectpanel"
                },
                this.items = [{
                        baseCls: "theme-neptune",
                        theme: "neptune",
                        themetext: "\u73b0\u4ee3\u6c14\u606f"
                },
                {
                        baseCls: "theme-classic",
                        theme: "classic",
                        themetext: "\u6de1\u84dd\u8272"
                },
                {
                        baseCls: "theme-gray",
                        theme: "gray",
                        themetext: "\u6d45\u7070\u8272"
                },
                {
                        baseCls: "theme-steelblue",
                        theme: "steelblue",
                        themetext: "\u6df1\u68d5\u8272"
                }],
                this.callParent(arguments)
        }
}),
Ext.define("Jfok.view.widget.FunctionNavigatePanel", {
        extend: "Ext.panel.Panel",
        alias: "widget.functionnavigatepanel",
        bodyPadding: 30,
        layout: {
                type: "table",
                columns: 3,
                tdAttrs: {
                        style: "padding : 10px 10px"
                }
        },
        bodyCls: "panel-background",
        initComponent: function() {
                var e = this,
                t = Jfok.modules.modulesinfo;
                e.items = [],
                Ext.each(t,
                function(t) {
                        if (t.tf_homePageTag && t.tf_userRole && t.tf_userRole.tf_allowBrowse) {
                                var i = t.tf_title;
                                if (i.length > 12) {
                                        var o = i.length / 2 + 2;
                                        i = i.slice(0, o) + "<br/>" + i.slice(o)
                                }
                                e.items.push({
                                        xtype: "button",
                                        cls: "breakword",
                                        tag: t.tf_homePageTag,
                                        enableToggle: !0,
                                        allowDepress: !1,
                                        text: i,
                                        moduleName: t.tf_moduleName,
                                        iconAlign: "top",
                                        scale: "large",
                                        height: 80,
                                        width: 250
                                })
                        }
                }),
                e.items.sort(function(e, t) {
                        return e.tag - t.tag
                }),
                this.callParent(arguments)
        }
}),
Ext.define("Jfok.view.widget.ModuleApproveInfoTree", {
        extend: "Ext.tree.Panel",
        alias: "widget.moduleapproveinfotree",
        title: "\u53ef\u5ba1\u6279\u7684\u6a21\u5757",
        rootVisible: !1,
        store: Ext.create("Ext.data.TreeStore", {
                proxy: {
                        type: "ajax",
                        url: "moduleapprove/getmoduleapproveinfo.do"
                }
        }),
        tools: [{
                type: "refresh",
                tooltip: "\u5237\u65b0\u6570\u636e",
                listeners: {
                        click: function(e) {
                                e.up("treepanel").store.reload()
                        }
                }
        }],
        listeners: {
                itemclick: function(e, t) {
                        t.raw.tag && Jfok.mainRegion.addModuleToApprove(t.raw.moduleName)
                }
        }
}),
Ext.define("Jfok.view.widget.ModuleAuditingInfoTree", {
        extend: "Ext.tree.Panel",
        alias: "widget.moduleauditinginfotree",
        title: "\u53ef\u5ba1\u6838\u7684\u6a21\u5757",
        rootVisible: !1,
        store: Ext.create("Ext.data.TreeStore", {
                proxy: {
                        type: "ajax",
                        url: "moduleauditing/getmoduleauditinginfo.do"
                }
        }),
        tools: [{
                type: "refresh",
                tooltip: "\u5237\u65b0\u6570\u636e",
                listeners: {
                        click: function(e) {
                                e.up("treepanel").store.reload()
                        }
                }
        }],
        listeners: {
                itemclick: function(e, t) {
                        t.raw.tag && Jfok.mainRegion.addModuleToAuditing(t.raw.moduleName)
                }
        }
}),
Ext.define("Jfok.view.widget.ModulePayoutInfoTree", {
        extend: "Ext.tree.Panel",
        alias: "widget.modulepayoutinfotree",
        title: "\u53ef\u652f\u4ed8\u7684\u6a21\u5757",
        rootVisible: !1,
        store: Ext.create("Ext.data.TreeStore", {
                proxy: {
                        type: "ajax",
                        url: "modulepayout/getmodulepayoutinfo.do"
                }
        }),
        tools: [{
                type: "refresh",
                tooltip: "\u5237\u65b0\u6570\u636e",
                listeners: {
                        click: function(e) {
                                e.up("treepanel").store.reload()
                        }
                }
        }],
        listeners: {
                itemclick: function(e, t) {
                        t.raw.tag && Jfok.mainRegion.addModuleToPayout(t.raw.moduleName)
                }
        }
}),
Ext.define("Jfok.view.widget.MonetarySelect", {
        extend: "Jfok.lib.ButtonTransparent",
        alias: "widget.monetaryselect",
        unittext: "\u5355\u4f4d\uff1a",
        initComponent: function() {
                this.monetarys = [{
                        text: "\u5143",
                        div: 1
                },
                {
                        text: "\u5343\u5143",
                        div: 1e3
                },
                {
                        text: "\u4e07\u5143",
                        div: 1e4
                },
                {
                        text: "\u767e\u4e07\u5143",
                        div: 1e6
                },
                {
                        text: "\u4ebf\u5143",
                        div: 1e8
                }],
                this.changeMonetary(Cookies.get("monetary", "\u4e07\u5143")),
                this.menu = [];
                for (var e in this.monetarys) this.menu.push(Ext.apply({
                        xtype: "monetaryitem",
                        checked: this.monetarys[e].text == Jfok.system.monetary
                },
                this.monetarys[e]));
                this.callParent(arguments)
        },
        changeMonetary: function(e) {
                Jfok.system.monetary = e,
                this.setText(this.unittext + e);
                for (var t in this.monetarys) this.monetarys[t].text == Jfok.system.monetary && (Jfok.system.monetaryUnit = this.monetarys[t].div);
                Jfok.system.monetaryUnitText = Jfok.system.monetary.replace("\u5143", "")
        }
}),
Ext.define("Jfok.view.widget.MonetaryItem", {
        extend: "Ext.menu.CheckItem",
        group: "monetary_",
        alias: "widget.monetaryitem",
        handler: function(e) {
                e.up("toolbar").down("monetaryselect").changeMonetary(e.text),
                Cookies.set("monetary", e.text),
                Ext.each(e.up("viewport").query("modulegrid"),
                function(e) {
                        e.getView().refresh(),
                        e.updateRecordDetail(e.getSelectionModel().getSelection())
                }),
                Ext.each(e.up("viewport").query("resultlistgrid"),
                function(e) {
                        e.getView().refresh()
                })
        }
}),
Ext.define("Jfok.view.window.AboutWindow", {
        extend: "Ext.window.Window",
        height: 600,
        width: 800,
        defaults: {
                bodyStyle: "background : transparent;",
                border: !1
        },
        bodyCls: "panel-background",
        initComponent: function() {
                this.title = "\u5173\u4e8e " + Jfok.system.tf_systemName,
                this.icon = "images/system/favicon16.png",
                this.items = [{
                        width: "100%",
                        flex: 5,
                        minHeight: 80,
                        layout: {
                                type: "vbox",
                                align: "center"
                        },
                        defaults: {
                                bodyStyle: "background : transparent;",
                                border: !1
                        },
                        items: [{
                                flex: 1
                        },
                        {
                                height: 80,
                                layout: {
                                        type: "hbox",
                                        align: "middle"
                                },
                                items: [{
                                        xtype: "image",
                                        src: "images/system/favicon36.png",
                                        width: 36,
                                        height: 36
                                },
                                {
                                        xtype: "label",
                                        baseCls: "hh1",
                                        text: Jfok.system.tf_systemName
                                }]
                        },
                        {
                                flex: 1
                        }]
                },
                {
                        flex: 20,
                        width: "100%",
                        xtype: "panel",
                        height: 380
                },
                {
                        flex: 10,
                        xtype: "panel",
                        width: "100%",
                        layout: {
                                type: "vbox",
                                align: "center"
                        },
                        defaults: {
                                bodyStyle: "background : transparent;",
                                border: !1
                        },
                        items: [{
                                flex: 5,
                                width: "100%"
                        },
                        {
                                xtype: "toolbar",
                                width: "100%",
                                items: ["->", "\u4f7f\u7528\u5355\u4f4d\uff1a" + Jfok.system.tf_userdwmc, " ", "\u5f00\u59cb\u4f7f\u7528\u65e5\u671f\uff1a" + Ext.Date.format(new Date(Jfok.system.tf_userStartdate), "Y-m-d"), "->"]
                        },
                        {
                                xtype: "toolbar",
                                margin: "5 0 5 0",
                                width: "100%",
                                items: ["->", "\u670d\u52a1\u5355\u4f4d\uff1a" + Jfok.system.tf_serviceDepartment, " ", Jfok.system.tf_serviceMen, " ", "\u8054\u7cfb\u7535\u8bdd\uff1a" + Jfok.system.tf_serviceTelnumber, Jfok.system.tf_serviceEmail, Jfok.system.tf_serviceQQ, "->"]
                        },
                        {
                                xtype: "toolbar",
                                width: "100%",
                                items: ["->", Jfok.system.tf_copyrightInfo, "->"]
                        },
                        {
                                flex: 1,
                                width: "100%"
                        }]
                }],
                this.callParent(arguments)
        }
}),
Ext.define("Jfok.system.Module", {
        requires: ["Jfok.m.window.BaseWindow", "Jfok.m.window.AttachmentWindow", "Jfok.m.factory.ModelFactory"],
        modulePanel: null,
        modulePanelWithParent: null,
        modulePanelWithFilter: null,
        modulePanelToApprove: null,
        modulePanelToAuditing: null,
        modulePanelToPayout: null,
        newModulePanelWithParent: null,
        parentModuleName: null,
        tf_moduleId: null,
        tf_moduleName: null,
        tf_title: null,
        displayWindow: null,
        newWindow: null,
        editWindow: null,
        model: null,
        auditingWindow: null,
        approveWindow: null,
        paymentWindow: null,
        constructor: function(e) {
                Ext.apply(this, e),
                this.model = Jfok.m.factory.ModelFactory.getModelByModule(this)
        },
        updateActiveForm: function() {
                this.editWindow && !this.editWindow.isHidden() && this.editWindow.form.initForm(),
                this.auditingWindow && !this.auditingWindow.isHidden() && this.auditingWindow.form.initForm(),
                this.approveWindow && !this.approveWindow.isHidden() && this.approveWindow.form.initForm()
        },
        showRecord: function(e) {
                var t = this.getDisplayWindow();
                t.show(),
                t.form.setRecordId(e)
        },
        getDisplayWindow: function() {
                return this.displayWindow || (this.displayWindow = Ext.widget("basewindow", {
                        module: this,
                        formtype: "display"
                })),
                this.displayWindow
        },
        getNewWindow: function() {
                return this.newWindow || (this.newWindow = Ext.widget("basewindow", {
                        module: this,
                        formtype: "new"
                })),
                this.newWindow
        },
        getEditWindow: function() {
                return this.editWindow || (this.editWindow = Ext.widget("basewindow", {
                        module: this,
                        formtype: "edit"
                })),
                this.editWindow
        },
        getAuditingWindow: function() {
                return this.auditingWindow || (this.auditingWindow = Ext.widget("basewindow", {
                        module: this,
                        formtype: "auditing"
                })),
                this.auditingWindow
        },
        getApproveWindow: function() {
                return this.approveWindow || (this.approveWindow = Ext.widget("basewindow", {
                        module: this,
                        formtype: "approve"
                })),
                this.approveWindow
        },
        getPaymentWindow: function() {
                return this.paymentWindow = Ext.widget("basewindow", {
                        module: this,
                        formtype: "payment"
                }),
                this.paymentWindow
        },
        getPanelWithParentModule: function(e, t, i, o, n) {
                if (!this.canBrowseThisModule()) return null;
                var a = Jfok.modules.getModuleInfoWithName(t),
                l = {
                        moduleId: a.tf_moduleId,
                        moduleName: t,
                        tableAsName: a.tableAsName,
                        primarykey: a.tf_primaryKey,
                        fieldtitle: a.tf_title,
                        equalsValue: i,
                        equalsMethod: null,
                        text: o,
                        isCodeLevel: a.codeLevel
                };
                "_Addition" == this.tf_moduleName && this.modulePanelWithParent && this.parentModuleName != t && (Ext.destroy(this.modulePanelWithParent), this.modulePanelWithParent = null),
                this.parentModuleName = t;
                var r = this.tf_title + "[" + o + "]";
                return this.modulePanelWithParent ? (this.modulePanelWithParent.down("modulepanel").setParentFilter(l), this.modulePanelWithParent.down("modulepanel").param = n) : this.modulePanelWithParent = Ext.widget("panel", {
                        moduleName: this.tf_moduleName,
                        parentModuleName: t,
                        itemId: e,
                        title: r,
                        closable: !0,
                        icon: this.iconURL,
                        layout: "border",
                        items: [Ext.create("Jfok.m.ModulePanel", {
                                region: "center",
                                module: this,
                                param: n,
                                parentFilter: l
                        })]
                }),
                "_Addition" == this.tf_moduleName && (n && 1 == n.showAdditionView ? this.modulePanelWithParent.down("attachmenttabpanel").setActiveTab(1) : this.modulePanelWithParent.down("attachmenttabpanel").setActiveTab(0)),
                this.modulePanelWithParent
        },
        getNewPanelWithParentModuleForm: function(e, t, i, o) {
                if (!this.canBrowseThisModule()) return null;
                var n = Jfok.modules.getModuleInfoWithName(e),
                a = {
                        moduleId: n.tf_moduleId,
                        moduleName: e,
                        tableAsName: n.tableAsName,
                        primarykey: n.tf_primaryKey,
                        fieldtitle: n.tf_title,
                        equalsValue: t,
                        equalsMethod: null,
                        text: i,
                        isCodeLevel: n.codeLevel
                };
                return Ext.create("Jfok.m.ModulePanel", {
                        region: "center",
                        module: this,
                        param: o,
                        parentFilter: a
                })
        },
        getNewPanelWithParentModule: function(e, t, i, o, n) {
                if (!this.canBrowseThisModule()) return null;
                var a = Jfok.modules.getModuleInfoWithName(t),
                l = {
                        moduleId: a.tf_moduleId,
                        moduleName: t,
                        tableAsName: a.tableAsName,
                        primarykey: a.tf_primaryKey,
                        fieldtitle: a.tf_title,
                        equalsValue: i,
                        equalsMethod: null,
                        text: o,
                        isCodeLevel: a.codeLevel
                },
                r = this.tf_title + "[" + o + "]";
                return this.newModulePanelWithParent = Ext.widget("panel", {
                        moduleName: this.tf_moduleName,
                        parentModuleName: t,
                        itemId: e,
                        title: r,
                        closable: !0,
                        icon: this.iconURL,
                        layout: "border",
                        items: [Ext.create("Jfok.m.ModulePanel", {
                                region: "center",
                                module: this,
                                param: n,
                                parentFilter: l
                        })]
                }),
                this.newModulePanelWithParent
        },
        getPanelWithParentFilter: function(e, t) {
                if (!this.canBrowseThisModule()) return null;
                var i = this.tf_title + "[" + t.ptitle + "]";
                return this.modulePanelWithFilter ? this.modulePanelWithFilter.down("modulepanel").setParentFilter(t) : this.modulePanelWithFilter = Ext.widget("panel", {
                        moduleName: this.tf_moduleName,
                        itemId: e,
                        title: i,
                        closable: !0,
                        icon: this.iconURL,
                        layout: "border",
                        items: [Ext.create("Jfok.m.ModulePanel", {
                                region: "center",
                                module: this,
                                parentFilter: t
                        })]
                }),
                this.modulePanelWithFilter
        },
        getModulePanelToPayout: function(e) {
                if (!this.canBrowseThisModule()) return null;
                var t = {
                        moduleId: this.tf_moduleId,
                        moduleName: this.tf_moduleName,
                        tableAsName: this.tableAsName,
                        primarykey: "tf_payoutStatus",
                        fieldtitle: "\u652f\u4ed8",
                        equalsValue: "\u53ef\u652f\u4ed8",
                        equalsMethod: null,
                        text: "\u6211\u53ef\u4ee5\u652f\u4ed8\u7684",
                        isCodeLevel: !1
                };
                return this.modulePanelToPayout || (this.modulePanelToPayout = Ext.widget("panel", {
                        moduleName: this.tf_moduleName,
                        itemId: e,
                        title: this.tf_title,
                        icon: this.iconURL,
                        closable: !0,
                        layout: "border",
                        items: [Ext.create("Jfok.m.ModulePanel", {
                                region: "center",
                                gridType: "normal",
                                module: this,
                                parentFilter: t
                        })]
                })),
                this.modulePanelToPayout
        },
        getModulePanelToAuditing: function(e) {
                if (!this.canBrowseThisModule()) return null;
                var t = {
                        moduleId: this.tf_moduleId,
                        moduleName: this.tf_moduleName,
                        tableAsName: this.tableAsName,
                        primarykey: "tf_auditinged",
                        fieldtitle: "\u5ba1\u6838",
                        equalsValue: "0",
                        equalsMethod: null,
                        text: "\u6211\u53ef\u4ee5\u5ba1\u6838\u7684",
                        isCodeLevel: !1
                };
                return this.modulePanelToAuditing || (this.modulePanelToAuditing = Ext.widget("panel", {
                        moduleName: this.tf_moduleName,
                        itemId: e,
                        title: this.tf_title,
                        icon: this.iconURL,
                        closable: !0,
                        layout: "border",
                        items: [Ext.create("Jfok.m.ModulePanel", {
                                region: "center",
                                gridType: "auditing",
                                module: this,
                                parentFilter: t
                        })]
                })),
                this.modulePanelToAuditing
        },
        getModulePanelToApprove: function(e) {
                if (!this.canBrowseThisModule()) return null;
                var t = {
                        moduleId: this.tf_moduleId,
                        moduleName: this.tf_moduleName,
                        tableAsName: this.tableAsName,
                        primarykey: "approvetype",
                        fieldtitle: "\u5ba1\u6279\u7c7b\u578b",
                        equalsValue: "\u6211\u53ef\u4ee5\u5ba1\u6279\u7684",
                        equalsMethod: null,
                        text: "\u6211\u53ef\u4ee5\u5ba1\u6279\u7684",
                        isCodeLevel: !1
                };
                return this.modulePanelToApprove || (this.modulePanelToApprove = Ext.widget("panel", {
                        moduleName: this.tf_moduleName,
                        itemId: e,
                        title: this.tf_title,
                        icon: this.iconURL,
                        closable: !0,
                        layout: "border",
                        items: [Ext.create("Jfok.m.ModulePanel", {
                                region: "center",
                                gridType: "approve",
                                module: this,
                                parentFilter: t
                        })]
                })),
                this.modulePanelToApprove
        },
        getModulePanel: function(e) {
                return this.canBrowseThisModule() ? (this.modulePanel || (this.modulePanel = Ext.widget("panel", {
                        moduleName: this.tf_moduleName,
                        itemId: e,
                        title: this.tf_title,
                        icon: this.iconURL,
                        closable: !0,
                        layout: "border",
                        items: [Ext.create("Jfok.m.ModulePanel", {
                                region: "center",
                                gridType: "normal",
                                module: this
                        })]
                })), this.modulePanel) : null
        },
        canBrowseThisModule: function() {
                return this.tf_userRole && this.tf_userRole.tf_allowBrowse ? !0 : (Jfok.system.warnInfo("\u5f53\u524d\u64cd\u4f5c\u5458\u6ca1\u6709\u67e5\u770b\u6a21\u5757\u300e" + this.tf_title + "\u300f\u7684\u6743\u9650"), !1)
        },
        getFieldDefine: function(e) {
                for (var t in this.moduleFields) if (this.moduleFields[t].tf_fieldId == e) return this.moduleFields[t];
                return null
        },
        getFieldDefineWithName: function(e) {
                for (var t in this.moduleFields) if (this.moduleFields[t].tf_fieldName == e) return this.moduleFields[t];
                return null
        },
        getAdditionFieldDefine: function(e) {
                for (var t in this.moduleAdditionFields) if (this.moduleAdditionFields[t].tf_fieldId == e) return this.moduleAdditionFields[t];
                return null
        },
        getGridScheme: function(e) {
                for (var t in this.moduleGridSchemes) if (this.moduleGridSchemes[t].tf_schemeOrder == e) return this.moduleGridSchemes[t];
                return null
        }
}),
Ext.define("Jfok.system.System", {
        viewport: null,
        monetary: "\u4e07\u5143",
        monetaryUnit: 1e4,
        monetaryUnitText: "\u4e07",
        constructor: function(e) {
                this.pageSize = parseInt(Cookies.get("pagesize", "20")),
                Ext.apply(this, e),
                this.tf_previewExts = this.tf_previewExts.split(",")
        },
        getViewport: function() {
                return this.viewport
        },
        setViewport: function(e) {
                this.viewport = e
        },
        getMaxTab: function() {
                var e = Cookies.get("maxtab", 8);
                return parseInt(e)
        },
        setMaxTab: function(e) {
                Cookies.set("maxtab", "" + e)
        },
        getAutoOpenModules: function() {
                var e = Cookies.get("autoopen", "");
                return e.length > 1 ? e.split(";") : []
        },
        isModuleAutoOpen: function(e) {
                var t = Cookies.get("autoopen", ""),
                i = t ? t.split(";") : [],
                o = !1;
                return Ext.each(i,
                function(t) {
                        t == e && (o = !0)
                }),
                o
        },
        addModuleToAutoOpen: function(e) {
                var t = Cookies.get("autoopen", ""),
                i = t ? t.split(";") : [],
                o = !1;
                Ext.each(i,
                function(t) {
                        t == e && (o = !0)
                }),
                o || (i.push(e), Cookies.set("autoopen", i.join(";")))
        },
        deleteModuleToAutoOpen: function(e) {
                var t = Cookies.get("autoopen", ""),
                i = t ? t.split(";") : [],
                o = -1;
                Ext.each(i,
                function(t, i) {
                        return t == e ? (o = i, !1) : void 0
                }),
                -1 != o && (i.splice(o, 1), Cookies.set("autoopen", i.join(";")))
        },
        smileInfo: function(e, t) {
                Ext.create("Jfok.lib.Notification", {
                        title: t ? t: "\u63d0\u9192\u4fe1\u606f",
                        position: "tr",
                        width: 300,
                        slideInDuration: 800,
                        slideBackDuration: 1500,
                        iconCls: "ux-notification-icon-smile",
                        autoCloseDelay: 3e3,
                        slideInAnimation: "elasticIn",
                        slideBackAnimation: "elasticIn",
                        html: e
                }).show()
        },
        warnInfo: function(e, t) {
                Ext.create("Jfok.lib.Notification", {
                        title: t ? t: "\u63d0\u793a\u4fe1\u606f",
                        position: "tr",
                        width: 300,
                        slideInDuration: 800,
                        slideBackDuration: 1500,
                        iconCls: "ux-notification-icon-warn",
                        autoCloseDelay: 3e3,
                        slideInAnimation: "elasticIn",
                        slideBackAnimation: "elasticIn",
                        html: e
                }).show()
        },
        errorInfo: function(e, t) {
                Ext.create("Jfok.lib.Notification", {
                        title: t ? t: "\u9519\u8bef\u63d0\u793a",
                        position: "tr",
                        useXAxis: !0,
                        width: 300,
                        slideInDuration: 800,
                        slideBackDuration: 1500,
                        iconCls: "ux-notification-icon-error",
                        autoCloseDelay: 3e3,
                        slideInAnimation: "elasticIn",
                        slideBackAnimation: "elasticIn",
                        html: e
                }).show()
        },
        defaultRenderer: function(e, t, i, o, n, a) {
                return filterTextSetBk(a, e)
        },
        dateRenderer: function(e, t, i, o, n, a) {
                return '<span class="datecolor">' + filterTextSetBk(a, Ext.util.Format.date(e, "Y-m-d")) + "</span>"
        },
        datetimeRenderer: function(e, t, i, o, n, a) {
                return '<span class="datecolor">' + filterTextSetBk(a, Ext.util.Format.date(e, "Y-m-d H:i:s")) + "</span>"
        },
        intRenderer: function(e, t, i, o, n, a) {
                return '<span style="color:#00C;float:right;">' + (0 == e ? "": filterTextSetBk(a, "" + e)) + "</span>"
        },
        booleanTextRenderer: function(e) {
                return e ? "\u662f": " "
        },
        moneyRenderer: function(e) {
                if (0 == e) return "";
                e /= Jfok.system.monetaryUnit,
                e = Math.round(100 * (e - 0)) / 100,
                e = e == Math.floor(e) ? e + ".00": 10 * e == Math.floor(10 * e) ? e + "0": e,
                e = String(e);
                for (var t = e.split("."), i = t[0], o = t[1] ? "." + t[1] : ".00", n = /(\d+)(\d{3})/; n.test(i);) i = i.replace(n, "$1,$2");
                e = i + o;
                var n = "";
                return n = "-" == e.charAt(0) ? "-" + e.substr(1) + Jfok.system.monetaryUnitText: "" + e + Jfok.system.monetaryUnitText,
                '<span style="color: #00C;float:right;">' + n + "</span>"
        },
        percentRenderer1: function(e) {
                return '<span style="color: #00C;float:right;">' + (e + " %") + "</span>"
        },
        percentRenderer: function(e) {
                var t = e > 100 ? 100 : e;
                t = 0 > t ? 0 : t;
                var i = parseInt(2.55 * t).toString(16);
                return 1 == i.length && (i = "0" + i),
                String.format('<div><div style="float:left;border:1px solid #008000;height:15px;width:100%;"><div style="float:left;text-align:center;width:100%;color:blue;">{0}%</div><div style="background: #FAB2{2};width:{1}%;height:13px;"></div></div></div>', e, t, i)
        },
        manytoOneFieldRenderer: function(e, t, i, o, n, a, l) {
                var r = e;
                try {
                        var d = l.headerCt.columnManager.columns[n],
                        s = i.data[d.manytooneIdName];
                        if (void 0 == s && (s = i.raw[d.manytooneIdName]), !s) return filterTextSetBk(a, e);
                        r = '<span class="gridNameField"><a onclick="javascript:__smr(\'' + d.moduleName + "','" + s + '\');return false;" href="#">' + filterTextSetBk(a, e) + "</a></span>"
                } catch(u) {}
                return r
        }
}),
Ext.define("Jfok.system.Modules", {
        modulesinfo: null,
        roles: null,
        SEPARATOR: "___",
        modules: new Ext.util.MixedCollection,
        constructor: function(e) {
                var t = this;
                t.modulesinfo = e.tf_Modules,
                t.roles = e.tf_userRoleDetails,
                t.fieldhiddenroles = e.tf_userFieldHiddenRoleDetails,
                t.fieldreadonlyroles = e.tf_userFieldReadonlyRoleDetails,
                Ext.each(t.modulesinfo,
                function(e) {
                        Ext.each(t.roles,
                        function(t) {
                                return t.tf_moduleId == e.tf_moduleId ? (e.tf_userRole = t, !1) : void 0
                        })
                }),
                Ext.each(t.modulesinfo,
                function(e) {
                        Ext.each(e.moduleFields,
                        function(e) {
                                if (e.tf_otherSetting) {
                                        var i = Ext.decode("{" + e.tf_otherSetting + "}", !0);
                                        i && i.field && Ext.apply(e, i.field)
                                }
                                Ext.each(t.fieldhiddenroles,
                                function(t) {
                                        t.tf_fieldId == e.tf_fieldId && (e.tf_isHidden = !0)
                                }),
                                Ext.each(t.fieldreadonlyroles,
                                function(t) {
                                        t.tf_fieldId == e.tf_fieldId && (e.tf_allowEdit = !1, e.tf_allowNew = !1)
                                })
                        }),
                        Ext.each(e.moduleFormSchemes,
                        function(e) {
                                if (e.tf_otherSetting) {
                                        var t = Ext.decode("{" + e.tf_otherSetting + "}", !0);
                                        Ext.apply(e, t)
                                }
                                Ext.each(e.moduleFormSchemeGroups,
                                function(e) {
                                        if (e.tf_otherSetting) {
                                                var t = Ext.decode("{" + e.tf_otherSetting + "}", !0);
                                                Ext.apply(e, t)
                                        }
                                        Ext.each(e.moduleFormSchemeGroupFields,
                                        function(e) {
                                                if (e.tf_otherSetting) {
                                                        var t = Ext.decode("{" + e.tf_otherSetting + "}", !0);
                                                        Ext.apply(e, t)
                                                }
                                        })
                                })
                        })
                }),
                Ext.each(t.modulesinfo,
                function(e) {
                        e.tf_userRole && e.tf_userRole.tf_allowApprove > 0 && e.tf_userRole.tf_approveOrder > 0 && e.moduleGridNavigates.push({
                                tf_cascading: !1,
                                tf_enabled: !0,
                                tf_fields: "approvetype",
                                tf_text: "\u5ba1\u6279\u7c7b\u578b",
                                tf_type: null
                        })
                })
        },
        showModuleRecord: function(e, t) {
                this.getModule(e).showRecord(t)
        },
        getModule: function(e) {
                var t = this.modules.get(e);
                if (!t) {
                        var i = this.getModuleInfoWithName(e);
                        if (!i) return null;
                        t = Ext.create("Jfok.system.Module", i)
                }
                return this.modules.add(e, t),
                t
        },
        refreshModuleGrid: function(e) {
                if (e) {
                        var t = e.split(","),
                        i = this;
                        Ext.each(t,
                        function(e) {
                                console.log(e + "---- grid refresh");
                                var t = i.modules.get(e);
                                t && (t.modulePanel && t.modulePanel.down("modulegrid").refreshWithSilent(), t.modulePanelWithParent && t.modulePanelWithParent.down("modulegrid").refreshWithSilent(), t.modulePanelWithFilter && t.modulePanelWithFilter.down("modulegrid").refreshWithSilent(), t.newModulePanelWithParent && t.newModulePanelWithParent.down("modulegrid") && t.newModulePanelWithParent.down("modulegrid").refreshWithSilent())
                        })
                }
        },
        getModuleInfoWithId: function(e) {
                for (var t in this.modulesinfo) {
                        var i = this.modulesinfo[t];
                        if (i.tf_moduleId == e) return i
                }
                return null
        },
        getModuleInfoWithName: function(e) {
                for (var t in this.modulesinfo) {
                        var i = this.modulesinfo[t];
                        if (i.tf_moduleName == e) return i
                }
                return null
        },
        getModuleInfoWithAsName: function(e) {
                for (var t in this.modulesinfo) {
                        var i = this.modulesinfo[t];
                        if (i.tableAsName == e) return i
                }
                return null
        },
        getUserRoleWithId: function(e) {
                for (var t in this.roles) {
                        var i = this.roles[t];
                        if (i.tf_moduleId == e) return i
                }
                return null
        },
        urlExists: function(e) {
                var t = new XMLHttpRequest;
                try {
                        if (t.open("GET", e, !1), t.send(null), 4 == t.readyState) return 200 == t.status ? e: null
                } catch(i) {
                        return null
                }
        }
}),
Ext.define("Jfok.view.region.BottomRegion", {
        extend: "Ext.toolbar.Toolbar",
        alias: "widget.bottomregion",
        requires: ["Jfok.lib.ButtonTransparent"],
        baseCls: "index-header",
        cls: "topheader-" + Cookies.get("theme", "neptune"),
        initComponent: function() {
                this.defaults = {
                        xtype: "buttontransparent"
                },
                this.items = [{
                        text: Jfok.system.tf_userdwmc,
                        itemId: "showuserdw",
                        icon: "images/system/favicon16.png"
                },
                {
                        text: Jfok.system.tf_departmentName,
                        itemId: "showdepartment",
                        icon: "images/module/_Department.png",
                        margin: "0 0 0 10"
                },
                {
                        text: Jfok.system.tf_userName,
                        margin: "0 0 0 10",
                        icon: "images/module/_User.png",
                        menu: [{
                                text: "\u6211\u7684\u4fe1\u606f",
                                itemId: "showuserinfo",
                                icon: "images/module/_User.png"
                        },
                        {
                                text: "\u6211\u7684\u89d2\u8272\u8bbe\u7f6e",
                                itemId: "myuserroles",
                                icon: "images/module/_Role.png"
                        },
                        {
                                text: "\u6211\u7684\u64cd\u4f5c\u6743\u9650",
                                itemId: "myuserpopedom",
                                icon: "images/button/userPopedom.png"
                        },
                        "-", {
                                text: "\u6211\u7684\u767b\u5f55\u65e5\u5fd7",
                                itemId: "mylogininfo"
                        },
                        {
                                text: "\u6211\u7684\u64cd\u4f5c\u65e5\u5fd7",
                                itemId: "myoperinfo"
                        },
                        "-", {
                                text: "\u4fee\u6539\u767b\u5f55\u5bc6\u7801",
                                itemId: "changepassword",
                                icon: "images/button/resetpassword.png"
                        },
                        "-", {
                                text: "\u6ce8\u9500\u767b\u5f55",
                                action: "logout"
                        }]
                },
                "->", {
                        text: Jfok.system.tf_serviceDepartment + "\u3000" + Jfok.system.tf_serviceMen,
                        icon: "images/button/help.png"
                },
                Jfok.system.tf_serviceTelnumber ? {
                        text: Jfok.system.tf_serviceTelnumber,
                        icon: "images/button/telephone.png"
                }: null, Jfok.system.tf_serviceQQ ? {
                        text: Jfok.system.tf_serviceQQ,
                        icon: "images/button/qq.png",
                        action: "qq"
                }: null, Jfok.system.tf_serviceEmail ? {
                        action: "email",
                        text: Jfok.system.tf_serviceEmail,
                        icon: "images/button/email.png"
                }: null, Jfok.system.tf_copyrightOwner ? {
                        text: "\xa9" + Jfok.system.tf_copyrightOwner
                }: null],
                this.callParent(arguments)
        }
}),
Ext.define("Jfok.view.region.MainMenuToolbar", {
        extend: "Ext.toolbar.Toolbar",
        alias: "widget.mainmenutoolbar",
        items: [{
                xtype: "tool",
                type: "left",
                itemId: "left",
                tooltip: "\u5728\u5de6\u8fb9\u680f\u4e2d\u663e\u793a\u6811\u72b6\u83dc\u5355"
        }],
        initComponent: function() {
                for (var e in Jfok.system.tf_MenuGroups) {
                        var t = Jfok.system.tf_MenuGroups[e],
                        i = [];
                        for (var o in t.tf_menuModules) {
                                var n = t.tf_menuModules[o],
                                a = Jfok.modules.getModuleInfoWithId(n.tf_ModuleId);
                                if (a && a.tf_userRole && a.tf_userRole.tf_allowBrowse) {
                                        var l = Ext.widget("menuitem", {
                                                mainmenu: "true",
                                                moduleId: a.tf_moduleId,
                                                moduleName: a.tf_moduleName,
                                                text: n.tf_title || a.tf_title,
                                                parentFilter: n.tf_parentFilter,
                                                icon: a.iconURL
                                        });
                                        if (n.tf_parentMenu) {
                                                var r = null;
                                                Ext.each(i,
                                                function(e) {
                                                        return e.isParentMenu && e.text == n.tf_parentMenu ? (r = e, !1) : void 0
                                                }),
                                                r || (r = {
                                                        xtype: "menuitem",
                                                        isParentMenu: !0,
                                                        text: n.tf_parentMenu,
                                                        menu: {
                                                                items: []
                                                        }
                                                },
                                                i.push(r)),
                                                r.menu.items.push(l),
                                                n.tf_addSeparator && r.menu.items.push("-")
                                        } else i.push(l),
                                        n.tf_addSeparator && i.push("-")
                                }
                        }
                        if (i.length > 0) {
                                var d = Ext.widget("button", {
                                        text: t.tf_title,
                                        menu: i
                                });
                                t.tf_iconURL && d.setIcon(t.tf_iconURL),
                                this.items.push(d)
                        }
                        if ("\u7efc\u5408\u67e5\u8be2" == t.tf_title && Jfok.system.tf_ReportGroups.length > 0) {
                                var i = [];
                                for (var e in Jfok.system.tf_ReportGroups) {
                                        var s = Jfok.system.tf_ReportGroups[e];
                                        i.push({
                                                report: !0,
                                                reportGroupId: s.tf_reportGroupId,
                                                text: s.tf_title,
                                                icon: s.tf_iconURL
                                        }),
                                        s.tf_addSeparator && i.push("-")
                                }
                                var d = Ext.widget("button", {
                                        text: t.tf_title,
                                        menu: i
                                });
                                this.items.push(d)
                        }
                }
                this.callParent(arguments)
        }
}),
Ext.define("Jfok.view.region.MainMenuRegion", {
        extend: "Ext.panel.Panel",
        alias: "widget.mainmenuregion",
        layout: {
                type: "accordion",
                animate: !0
        },
        multi: !0,
        menuAccordion: !1,
        tools: [{
                type: "pin",
                tooltip: "\u5c42\u53e0\u65b9\u5f0f\u663e\u793a\u83dc\u5355",
                listeners: {
                        click: function(e) {
                                var t = e.up("mainmenuregion");
                                t.insert(0, t.getMenuWithAccordion()),
                                t.items.items[0].expand(),
                                t.remove(t.down("mainmenutree"), !0),
                                e.hide(),
                                e.nextSibling().show()
                        }
                }
        },
        {
                type: "unpin",
                tooltip: "\u6811\u72b6\u65b9\u5f0f\u663e\u793a\u83dc\u5355",
                hidden: !0,
                listeners: {
                        click: function(e) {
                                var t = e.up("mainmenuregion");
                                t.insert(0, {
                                        xtype: "mainmenutree"
                                }),
                                t.items.items[0].expand(),
                                Ext.each(t.query("panel[menuAccordion]"),
                                function(e) {
                                        t.remove(e, !0)
                                }),
                                e.hide(),
                                e.previousSibling().show()
                        }
                }
        },
        {
                itemId: "up",
                type: "up",
                tooltip: "\u5728\u4e0a\u9762\u663e\u793a\u83dc\u5355\u6761"
        }],
        initComponent: function() {
                this.items = [],
                this.items = this.items.concat([{
                        xtype: "mainmenutree"
                },
                {
                        title: "\u5f85\u529e\u4e8b\u9879",
                        collapsed: !0,
                        layout: {
                                type: "accordion",
                                animate: !0,
                                multi: !0
                        },
                        items: [{
                                xtype: "moduleapproveinfotree",
                                width: "100%"
                        },
                        {
                                xtype: "moduleauditinginfotree",
                                width: "100%"
                        },
                        {
                                xtype: "modulepayoutinfotree",
                                width: "100%"
                        }]
                }]),
                this.callParent(arguments)
        },
        getMenuWithAccordion: function() {
                var e = [];
                for (var t in Jfok.system.tf_MenuGroups) {
                        var i = Jfok.system.tf_MenuGroups[t],
                        o = {
                                menuAccordion: !0,
                                xtype: "panel",
                                title: i.tf_title,
                                bodyStyle: {
                                        padding: "10px"
                                },
                                layout: "vbox",
                                items: [],
                                icon: "neptune" === Ext.themeName ? null: i.tf_iconURL
                        };
                        for (var n in i.tf_menuModules) {
                                var a = i.tf_menuModules[n],
                                l = Jfok.modules.getModuleInfoWithId(a.tf_ModuleId);
                                l && l.tf_userRole && l.tf_userRole.tf_allowBrowse && o.items.push({
                                        xtype: "label",
                                        width: "100%",
                                        cls: "labelmenu",
                                        menuLabel: !0,
                                        moduleId: l.tf_moduleId,
                                        moduleName: l.tf_moduleName,
                                        parentFilter: a.tf_parentFilter,
                                        text: a.tf_title || l.tf_title,
                                        icon: l.iconURL,
                                        listeners: {
                                                render: function(e) {
                                                        Ext.fly(this.el).on("click",
                                                        function() {
                                                                e.fireEvent("click", e)
                                                        })
                                                }
                                        }
                                })
                        }
                        if ("\u7efc\u5408\u67e5\u8be2" == i.tf_title && Jfok.system.tf_ReportGroups.length > 0) {
                                o = {
                                        menuAccordion: !0,
                                        xtype: "panel",
                                        title: i.tf_title,
                                        bodyStyle: {
                                                padding: "10px"
                                        },
                                        layout: "vbox",
                                        items: [],
                                        icon: i.tf_iconURL
                                };
                                for (var t in Jfok.system.tf_ReportGroups) {
                                        var r = Jfok.system.tf_ReportGroups[t];
                                        o.items.push({
                                                xtype: "label",
                                                width: "100%",
                                                cls: "labelmenu",
                                                menuLabel: !0,
                                                report: !0,
                                                reportGroupId: r.tf_reportGroupId,
                                                text: r.tf_title,
                                                icon: r.tf_iconURL,
                                                listeners: {
                                                        render: function(e) {
                                                                Ext.fly(this.el).on("click",
                                                                function() {
                                                                        e.fireEvent("click", e)
                                                                })
                                                        }
                                                }
                                        })
                                }
                        }
                        o.items.length > 0 && e.push(o)
                }
                return e
        }
}),
Ext.define("Jfok.view.region.MainMenuTree", {
        requires: ["Jfok.lib.TreeFilter"],
        extend: "Ext.tree.Panel",
        alias: "widget.mainmenutree",
        title: "\u7cfb\u7edf\u83dc\u5355",
        rootVisible: !1,
        mixins: {
                treeFilter: "Jfok.lib.TreeFilter"
        },
        lines: !0,
        initComponent: function() {
                this.store = Ext.create("Ext.data.TreeStore", {
                        root: {
                                text: "\u7cfb\u7edf\u83dc\u5355",
                                leaf: !1,
                                expanded: !0
                        }
                });
                var e = this.store.getRootNode();
                for (var t in Jfok.system.tf_MenuGroups) {
                        var i = Jfok.system.tf_MenuGroups[t],
                        o = e.appendChild({
                                text: i.tf_title,
                                expanded: i.tf_expand,
                                icon: "neptune" === Ext.themeName ? null: i.tf_iconURL
                        });
                        for (var n in i.tf_menuModules) {
                                var a = i.tf_menuModules[n],
                                l = Jfok.modules.getModuleInfoWithId(a.tf_ModuleId);
                                if (l && l.tf_userRole && l.tf_userRole.tf_allowBrowse) {
                                        var r = {
                                                moduleId: l.tf_moduleId,
                                                moduleName: l.tf_moduleName,
                                                parentFilter: a.tf_parentFilter,
                                                text: a.tf_title || l.tf_title,
                                                icon: "neptune" === Ext.themeName ? null: l.iconURL,
                                                leaf: !0
                                        };
                                        if (a.tf_parentMenu) {
                                                var d = o.findChild("text", a.tf_parentMenu);
                                                d || (d = o.appendChild({
                                                        isParentMenu: !0,
                                                        text: a.tf_parentMenu,
                                                        leaf: !1
                                                })),
                                                d.appendChild(r)
                                        } else o.appendChild(r)
                                }
                        }
                        if (o.childNodes && 0 != o.childNodes.length || e.removeChild(o), "\u7efc\u5408\u67e5\u8be2" == i.tf_title && Jfok.system.tf_ReportGroups.length > 0) {
                                var o = e.appendChild({
                                        text: i.tf_title,
                                        expanded: i.tf_expand,
                                        icon: "neptune" === Ext.themeName ? null: i.tf_iconURL
                                });
                                for (var t in Jfok.system.tf_ReportGroups) {
                                        var s = Jfok.system.tf_ReportGroups[t];
                                        o.appendChild({
                                                report: !0,
                                                reportGroupId: s.tf_reportGroupId,
                                                text: s.tf_title,
                                                icon: "neptune" === Ext.themeName ? null: s.tf_iconURL,
                                                leaf: !0
                                        })
                                }
                        }
                }
                this.callParent(arguments)
        }
}),
Ext.define("Jfok.view.region.HomepagePanel", {
        extend: "Ext.panel.Panel",
        alias: "widget.homepagepanel",
        layout: "border",
        items: [{
                region: "center",
                layout: "border",
                title: "\u529f\u80fd\u5bfc\u822a",
                items: [{
                        xtype: "functionnavigatepanel",
                        region: "center",
                        frame: !1,
                        border: !1
                },
                {
                        xtype: "panel",
                        region: "south",
                        height: 120,
                        frame: !1,
                        border: !1,
                        bodyCls: "panel-background",
                        loader: {
                                url: "content.html",
                                autoLoad: !0
                        }
                }]
        }],
        initComponent: function() {
                var e = !1,
                t = 0,
                i = 0,
                o = 0;
                Ext.each(Jfok.modules.modulesinfo,
                function(n) {
                        n.tf_userRole && (n.tf_userRole.tf_allowApprove || n.tf_userRole.tf_allowAuditing || n.tf_userRole.tf_allowPayment) && (e = !0, t += n.tf_hasAuditing ? 1 : 0, i += n.tf_hasApprove ? 1 : 0, o += n.tf_hasPayment ? 1 : 0)
                }),
                e && this.items.push({
                        collapsible: !0,
                        split: !0,
                        region: "west",
                        layout: {
                                type: "accordion",
                                animate: !0,
                                multi: !0
                        },
                        title: "\u5f85\u64cd\u4f5c",
                        width: 380,
                        tools: [{
                                type: "refresh",
                                tooltip: "\u5237\u65b0\u6570\u636e",
                                listeners: {
                                        click: function(e) {
                                                Ext.each(e.up("panel").query("treepanel"),
                                                function(e) {
                                                        e.store.reload()
                                                })
                                        }
                                }
                        }],
                        items: [i ? {
                                xtype: "moduleapproveinfotree",
                                width: "100%"
                        }: null, t ? {
                                xtype: "moduleauditinginfotree",
                                width: "100%"
                        }: null, o ? {
                                xtype: "modulepayoutinfotree",
                                width: "100%"
                        }: null]
                }),
                this.callParent(arguments)
        }
}),
Ext.define("Jfok.view.region.TopRegion", {
        extend: "Ext.toolbar.Toolbar",
        alias: "widget.topregion",
        requires: ["Jfok.shared.ThemeSelect", "Jfok.view.widget.MonetarySelect", "Jfok.lib.ButtonTransparent", "Jfok.lib.AdditionFieldAddButton", "Jfok.lib.AdditionFieldDisplayButton", "Jfok.lib.ManyToOneFieldDisplayButton", "Jfok.m.w.ComboModuleGrid"],
        height: 40,
        baseCls: "index-header",
        cls: "topheader-" + Cookies.get("theme", "neptune"),
        initComponent: function() {
                this.defaults = {
                        xtype: "buttontransparent"
                },
                this.items = [{
                        xtype: "image",
                        margin: "15 5 0 10",
                        width: 16,
                        height: 16,
                        src: "images/system/favicon16.png"
                },
                {
                        xtype: "label",
                        text: Jfok.system.tf_systemName,
                        baseCls: "index-title"
                },
                {
                        xtype: "label",
                        text: "(" + Jfok.system.tf_systemVersion + ")",
                        baseCls: "index-title-ver"
                },
                {
                        id: "homepagebutton",
                        text: "\u9996\u9875",
                        margin: "0 20 0 30",
                        action: "homepage",
                        icon: "images/button/homepage.png",
                        handler: function() {}
                },
                {
                        text: "\u5e2e\u52a9",
                        margin: "0 20 0 0",
                        icon: "images/button/help.png",
                        handler: function() {
                                localStorage.setItem("abc", "this is a abcdefg")
                        }
                },
                {
                        text: "\u5173\u4e8e",
                        icon: "images/button/about.png",
                        margin: "0 20 0 0",
                        handler: function() {
                                Ext.create("Jfok.view.window.AboutWindow").show()
                        }
                },
                {
                        text: "\u6ce8\u9500",
                        icon: "images/button/return.png",
                        action: "logout"
                },
                "->", {
                        xtype: "monetaryselect"
                },
                {
                        xtype: "themeselect",
                        margin: "0 5 0 5"
                }],
                this.callParent(arguments)
        }
}),
Ext.define("Jfok.view.region.Viewport", {
        extend: "Ext.container.Viewport",
        requires: ["Jfok.view.region.MainRegion", "Jfok.view.region.MainMenuToolbar", "Jfok.view.region.MainMenuTree"],
        layout: "border",
        items: [{
                region: "north",
                layout: "fit",
                border: !1,
                frame: !1,
                items: [{
                        xtype: "topregion"
                }],
                collapseMode: "mini",
                listeners: {
                        render: function(e) {
                                console.log(e),
                                Ext.widget("component", {
                                        floating: !0,
                                        id: "_hiddenshowtop",
                                        topShow: !0,
                                        height: 7,
                                        width: 48,
                                        x: (document.body.clientWidth - 48) / 2,
                                        firsty: e.getHeight() - 9,
                                        y: e.getHeight() - 9,
                                        cls: "hiddentop",
                                        listeners: {
                                                el: {
                                                        click: function() {
                                                                var t = Ext.getCmp("_hiddenshowtop");
                                                                e[t.topShow ? "hide": "show"](),
                                                                e.ownerCt.down("bottomregion")[t.topShow ? "hide": "show"](),
                                                                t.setY(t.topShow ? 0 : t.firsty),
                                                                t.removeCls(t.topShow ? "hiddentop": "showtop"),
                                                                t.topShow = !t.topShow,
                                                                t.addCls(t.topShow ? "hiddentop": "showtop")
                                                        }
                                                }
                                        }
                                }).show()
                        }
                }
        },
        {
                region: "north",
                xtype: "mainmenutoolbar",
                hidden: !("true" == Cookies.get("menutoolbar", "true"))
        },
        {
                region: "west",
                xtype: "mainmenuregion",
                title: "\u5bfc\u822a\u83dc\u5355",
                hidden: "true" == Cookies.get("menutoolbar", "true"),
                width: 220,
                collapsible: !0,
                split: !0
        },
        {
                region: "center",
                xtype: "mainregion",
                bodyCls: "panel-background",
                border: !1,
                frame: !1
        },
        {
                region: "south",
                xtype: "bottomregion"
        }],
        listeners: {
                resize: function() {
                        Ext.getCmp("_hiddenshowtop").setX((document.body.clientWidth - 48) / 2)
                }
        }
}),
Ext.define("Jfok.controller.report.DateSectionSelect", {
        extend: "Ext.app.Controller",
        views: ["Jfok.r.widget.YearMonthSelectMenu"],
        init: function() {
                this.control({
                        "yearmonthselectmenu datemenu": {
                                select: function(e, t) {
                                        var i = e.up("yearmonthselectmenu"),
                                        o = i.target;
                                        o.fireEvent("dateSectionChanged", o, {
                                                sectiontype: "day",
                                                text: Ext.Date.format(t, "Y-m-d"),
                                                value: Ext.Date.format(t, "Y-m-d")
                                        },
                                        i.dateField)
                                }
                        },
                        "yearmonthselectmenu menuitem[dateType]": {
                                click: this.dateSelectItemClick
                        },
                        "form#yearsection numberfield[name=firstyear]": {
                                change: function(e, t) {
                                        var i = e.up("form").down("numberfield[name=lastyear]");
                                        i.getValue() < t && i.setValue(t)
                                }
                        },
                        "form#yearsection numberfield[name=lastyear]": {
                                change: function(e, t) {
                                        var i = e.up("form").down("numberfield[name=firstyear]");
                                        i.getValue() > t && i.setValue(t)
                                }
                        },
                        "form#datesection datefield[name=firstdate]": {
                                change: function(e, t) {
                                        var i = e.up("form").down("datefield[name=lastdate]");
                                        i.getValue() < t && i.setValue(t)
                                }
                        },
                        "form#datesection datefield[name=lastdate]": {
                                change: function(e, t) {
                                        var i = e.up("form").down("datefield[name=firstdate]");
                                        i.getValue() > t && i.setValue(t)
                                }
                        },
                        "yearmonthselectmenu form button": {
                                click: function(e) {
                                        var t = e.up("form");
                                        if (t.isValid()) {
                                                var i, o, n, a, l, r = {
                                                        sectiontype: t.itemId
                                                };
                                                switch ("datesection" != t.itemId && (a = t.getForm().findField("firstyear"), l = t.getForm().findField("lastyear"), i = a.getValue(), o = l.getValue()), t.itemId) {
                                                case "datesection":
                                                        var d = t.getForm().findField("firstdate"),
                                                        s = t.getForm().findField("lastdate");
                                                        fd = Ext.Date.format(d.getValue(), "Y-m-d"),
                                                        ld = Ext.Date.format(s.getValue(), "Y-m-d"),
                                                        d.disabled || s.disabled ? d.disabled ? (r.value = "--" + ld, n = "\u81f3" + ld + "\u6b62") : (r.value = fd + "--", n = "\u4ece" + fd + "\u8d77") : fd == ld ? (n = fd, r = {
                                                                sectiontype: "day",
                                                                value: fd
                                                        }) : (r.value = fd + "--" + ld, n = r.value);
                                                        break;
                                                case "yearsection":
                                                        a.disabled || l.disabled ? a.disabled ? (r.value = "--" + o, n = "\u81f3" + o + "\u5e74\u6b62") : (r.value = i + "--", n = "\u4ece" + i + "\u5e74\u8d77") : i == o ? (n = i + "\u5e74", r = {
                                                                sectiontype: "year",
                                                                value: i + ""
                                                        }) : (r.value = i + "--" + o, n = r.value + "\u5e74");
                                                        break;
                                                case "monthsection":
                                                        firstmonth = t.getForm().findField("firstmonth").getValue(),
                                                        lastmonth = t.getForm().findField("lastmonth").getValue(),
                                                        a.disabled || l.disabled ? a.disabled ? (r.value = "--" + o + "-" + lastmonth, n = "\u81f3" + o + "\u5e74" + lastmonth + "\u6708\u6b62") : (r.value = i + "-" + firstmonth + "--", n = "\u4ece" + i + "\u5e74" + firstmonth + "\u6708\u8d77") : i == o ? firstmonth == lastmonth ? (n = i + "\u5e74" + firstmonth + "\u6708", r.value = i + "-" + firstmonth, r.sectiontype = "yearmonth") : (n = i + "\u5e74" + firstmonth + "--" + lastmonth + "\u6708", r.value = i + "-" + firstmonth + "--" + o + "-" + lastmonth) : (n = i + "\u5e74" + firstmonth + "\u6708--" + o + "\u5e74" + lastmonth + "\u6708", r.value = i + "-" + firstmonth + "--" + o + "-" + lastmonth);
                                                        break;
                                                case "quartersection":
                                                        firstquarter = t.getForm().findField("firstquarter").getValue(),
                                                        lastquarter = t.getForm().findField("lastquarter").getValue(),
                                                        a.disabled || l.disabled ? a.disabled ? (r.value = "--" + o + "-" + lastquarter, n = "\u81f3" + o + "\u5e74" + lastquarter + "\u5b63\u6b62") : (r.value = i + "-" + firstquarter + "--", n = "\u4ece" + i + "\u5e74" + firstquarter + "\u5b63\u8d77") : i == o ? firstquarter == lastquarter ? (n = i + "\u5e74" + firstquarter + "\u5b63", r.value = i + "-" + firstquarter, r.sectiontype = "yearquarter") : (n = i + "\u5e74" + firstquarter + "--" + lastquarter + "\u5b63", r.value = i + "-" + firstquarter + "--" + o + "-" + lastquarter) : (n = i + "\u5e74" + firstquarter + "\u5b63--" + o + "\u5e74" + lastquarter + "\u5b63", r.value = i + "-" + firstquarter + "--" + o + "-" + lastquarter)
                                                }
                                                r.text = n;
                                                var u = t.ownerCt.up("yearmonthselectmenu"),
                                                c = u.target;
                                                c && c.hideMenu ? c.hideMenu() : u.close(),
                                                c.fireEvent("dateSectionChanged", c, r, u.dateField)
                                        }
                                }
                        },
                        "form#monthsection numberfield[name=firstyear]": {
                                change: function(e, t) {
                                        var i = e.up("form").down("numberfield[name=lastyear]");
                                        if (i.getValue() < t) i.setValue(t);
                                        else if (i.getValue() == t) {
                                                var o = e.up("form").down("numberfield[name=firstmonth]").getValue(),
                                                n = e.up("form").down("numberfield[name=lastmonth]");
                                                n.getValue() < o && n.setValue(o)
                                        }
                                }
                        },
                        "form#monthsection numberfield[name=lastyear]": {
                                change: function(e, t) {
                                        var i = e.up("form").down("[name=firstyear]");
                                        if (i.getValue() > t) i.setValue(t);
                                        else if (i.getValue() == t) {
                                                var o = e.up("form").down("[name=lastmonth]").getValue(),
                                                n = e.up("form").down("[name=firstmonth]");
                                                n.getValue() > o && n.setValue(o)
                                        }
                                }
                        },
                        "form#monthsection numberfield[name=firstmonth]": {
                                change: function(e, t) {
                                        var i = e.up("form").down("[name=lastyear]").getValue(),
                                        o = e.up("form").down("[name=firstyear]").getValue();
                                        if (i == o) {
                                                var n = e.up("form").down("[name=lastmonth]");
                                                n.getValue() < t && n.setValue(t)
                                        }
                                }
                        },
                        "form#monthsection numberfield[name=lastmonth]": {
                                change: function(e, t) {
                                        var i = e.up("form").down("[name=lastyear]").getValue(),
                                        o = e.up("form").down("[name=firstyear]").getValue();
                                        if (i == o) {
                                                var n = e.up("form").down("[name=firstmonth]");
                                                n.getValue() > t && n.setValue(t)
                                        }
                                }
                        },
                        "form#quartersection numberfield[name=firstyear]": {
                                change: function(e, t) {
                                        var i = e.up("form").down("numberfield[name=lastyear]");
                                        if (i.getValue() < t) i.setValue(t);
                                        else if (i.getValue() == t) {
                                                var o = e.up("form").down("numberfield[name=firstquarter]").getValue(),
                                                n = e.up("form").down("numberfield[name=lastquarter]");
                                                n.getValue() < o && n.setValue(o)
                                        }
                                }
                        },
                        "form#quartersection numberfield[name=lastyear]": {
                                change: function(e, t) {
                                        var i = e.up("form").down("[name=firstyear]");
                                        if (i.getValue() > t) i.setValue(t);
                                        else if (i.getValue() == t) {
                                                var o = e.up("form").down("[name=lastquarter]").getValue(),
                                                n = e.up("form").down("[name=firstquarter]");
                                                n.getValue() > o && n.setValue(o)
                                        }
                                }
                        },
                        "form#quartersection numberfield[name=firstquarter]": {
                                change: function(e, t) {
                                        var i = e.up("form").down("[name=lastyear]").getValue(),
                                        o = e.up("form").down("[name=firstyear]").getValue();
                                        if (i == o) {
                                                var n = e.up("form").down("[name=lastquarter]");
                                                n.getValue() < t && n.setValue(t)
                                        }
                                }
                        },
                        "form#quartersection numberfield[name=lastquarter]": {
                                change: function(e, t) {
                                        var i = e.up("form").down("[name=lastyear]").getValue(),
                                        o = e.up("form").down("[name=firstyear]").getValue();
                                        if (i == o) {
                                                var n = e.up("form").down("[name=firstquarter]");
                                                n.getValue() > t && n.setValue(t)
                                        }
                                }
                        },
                        "form checkbox[name=_enablefirst]": {
                                change: function(e, t) {
                                        e.nextSibling()[t ? "enable": "disable"](),
                                        e.nextSibling().nextSibling() && e.nextSibling().nextSibling()[t ? "enable": "disable"](),
                                        t || e.up("form").down("checkbox[name=_enablelast]").setValue(!0)
                                }
                        },
                        "form checkbox[name=_enablelast]": {
                                change: function(e, t) {
                                        e.nextSibling()[t ? "enable": "disable"](),
                                        e.nextSibling().nextSibling() && e.nextSibling().nextSibling()[t ? "enable": "disable"](),
                                        t || e.up("form").down("checkbox[name=_enablefirst]").setValue(!0)
                                }
                        }
                })
        },
        dateSelectItemClick: function(e) {
                var t = e.dateType,
                i = {
                        sectiontype: t
                },
                o = e.text;
                switch (t) {
                case "all":
                        break;
                case "thisyear":
                        i.value = e.year + "";
                        break;
                case "thisquarter":
                        i.value = e.year + "-" + e.quarter;
                        break;
                case "thismonth":
                        i.value = e.year + "-" + e.month;
                        break;
                case "thisday":
                        i.value = e.year + "-" + e.month + "-" + e.day;
                        break;
                case "year":
                        i.value = e.year + "",
                        o = e.year + "\u5e74";
                        break;
                case "yearmonth":
                        i.value = e.year + "-" + e.month,
                        o = e.parentMenu.ownerItem.year + "\u5e74" + e.month + "\u6708";
                        break;
                case "yearquarter":
                        i.value = e.year + "-" + e.quarter,
                        o = e.parentMenu.ownerItem.year + "\u5e74" + e.quarter + "\u5b63\u5ea6"
                }
                i.text = o;
                var n = e.up("yearmonthselectmenu"),
                a = n.target;
                a.fireEvent("dateSectionChanged", a, i, n.dateField)
        }
}),
Ext.define("Jfok.controller.Approve", {
        extend: "Ext.app.Controller",
        views: [],
        init: function() {
                this.control({
                        "approveform button#saveapprove": {
                                click: this.saveOrCancelApprove
                        },
                        "approveform button#cancelapprove": {
                                click: this.saveOrCancelApprove
                        },
                        "modulepanel menuitem#approve_thisselection": {
                                click: this.approveThisSelection
                        },
                        "modulepanel menuitem#approve_thispage": {
                                click: this.approveThisPage
                        },
                        "modulepanel menuitem#approve_thiscondition": {
                                click: this.approve_thiscondition
                        },
                        "modulepanel menuitem#approve_all": {
                                click: this.approve_all
                        }
                })
        },
        approve_all: function(e) {
                var t = e.up("modulegrid"),
                i = t.getStore(),
                o = {
                        moduleName: t.module.tf_moduleName,
                        parentFilter: i.extraParams.parentFilter
                };
                Ext.MessageBox.confirm("\u786e\u5b9a\u5ba1\u6279", "\u786e\u5b9a\u8981\u81ea\u52a8\u5ba1\u6279\u6211\u80fd\u5ba1\u6279\u7684\u6240\u6709\u672a\u5ba1\u6279\u7684" + t.module.tf_title + "\u8bb0\u5f55\u5417\uff1f",
                function(e) {
                        "yes" == e && Ext.Ajax.request({
                                url: "moduleapprove/allapprove.do",
                                params: o,
                                success: function(e) {
                                        var i = Ext.decode(e.responseText, !0);
                                        t.store.reload(),
                                        t.up("modulepanel").refreshNavigate(),
                                        Jfok.system.smileInfo("\u6279\u91cf\u81ea\u52a8\u5ba1\u6279\u5b8c\u6210,\u5ba1\u6279\u4e86 " + i.msg + "\u6761\u8bb0\u5f55!")
                                }
                        })
                })
        },
        approve_thiscondition: function(e) {
                var t = e.up("modulegrid"),
                i = t.getStore(),
                o = {
                        moduleName: t.module.tf_moduleName
                };
                for (var n in i.extraParams) o[n] = i.extraParams[n];
                Ext.each(i.filters.items,
                function(e) {
                        o[e.property] = e.value
                }),
                Ext.MessageBox.confirm("\u786e\u5b9a\u5ba1\u6279", "\u786e\u5b9a\u8981\u81ea\u52a8\u5ba1\u6279\u5f53\u524d\u5bfc\u822a\u503c\u548c\u7b5b\u9009\u6761\u4ef6\u4e0b\u7684\u6211\u80fd\u5ba1\u6279\u7684" + t.module.tf_title + "\u8bb0\u5f55\u5417\uff1f",
                function(e) {
                        "yes" == e && Ext.Ajax.request({
                                url: "moduleapprove/thiscondition.do",
                                params: o,
                                success: function(e) {
                                        var i = Ext.decode(e.responseText, !0);
                                        t.store.reload(),
                                        t.up("modulepanel").refreshNavigate(),
                                        Jfok.system.smileInfo("\u6279\u91cf\u81ea\u52a8\u5ba1\u6279\u5b8c\u6210,\u5ba1\u6279\u4e86 " + i.msg + "\u6761\u8bb0\u5f55!")
                                }
                        })
                })
        },
        approveThisSelection: function(e) {
                var t = e.up("modulegrid"),
                i = (t.getStore(), []),
                o = [];
                return Ext.each(t.getSelection(),
                function(e) {
                        e.meCanApprove() && (i.push(e.getIdValue()), o.push(e.getNameValue()))
                }),
                0 == i.length ? (Jfok.system.warnInfo("\u5f53\u524d\u9009\u4e2d\u7684\u8bb0\u5f55\u4e2d\u6ca1\u6709\u53ef\u4ee5\u5ba1\u6279\u7684\u8bb0\u5f55\uff01"), void 0) : (Ext.MessageBox.confirm("\u786e\u5b9a\u5ba1\u6279", "\u786e\u5b9a\u8981\u81ea\u52a8\u5ba1\u6279" + t.module.tf_title + "\u7684\u4ee5\u4e0b\u8bb0\u5f55\u5417\uff1f<br/><br/>" + o.join(", "),
                function(e) {
                        "yes" == e && Ext.Ajax.request({
                                url: "moduleapprove/pagerecord.do",
                                params: {
                                        moduleName: t.module.tf_moduleName,
                                        ids: i.join(",")
                                },
                                success: function(e) {
                                        var i = Ext.decode(e.responseText, !0);
                                        t.store.reload(),
                                        t.up("modulepanel").refreshNavigate(),
                                        Jfok.system.smileInfo("\u6279\u91cf\u81ea\u52a8\u5ba1\u6279\u5b8c\u6210,\u5ba1\u6279\u4e86 " + i.msg + "\u6761\u8bb0\u5f55!")
                                }
                        })
                }), void 0)
        },
        approveThisPage: function(e) {
                var t = e.up("modulegrid"),
                i = t.getStore(),
                o = [],
                n = [];
                return i.each(function(e) {
                        e.meCanApprove() && (o.push(e.getIdValue()), n.push(e.getNameValue()))
                }),
                0 == o.length ? (Jfok.system.warnInfo("\u5f53\u524d\u9875\u9762\u4e2d\u6ca1\u6709\u672a\u5ba1\u6279\u7684\u8bb0\u5f55\uff01"), void 0) : (Ext.MessageBox.confirm("\u786e\u5b9a\u5ba1\u6279", "\u786e\u5b9a\u8981\u81ea\u52a8\u5ba1\u6279" + t.module.tf_title + "\u7684\u4ee5\u4e0b\u8bb0\u5f55\u5417\uff1f<br/><br/>" + n.join(", "),
                function(e) {
                        "yes" == e && Ext.Ajax.request({
                                url: "moduleapprove/pagerecord.do",
                                params: {
                                        moduleName: t.module.tf_moduleName,
                                        ids: o.join(",")
                                },
                                success: function(e) {
                                        var i = Ext.decode(e.responseText, !0);
                                        t.store.reload(),
                                        t.up("modulepanel").refreshNavigate(),
                                        Jfok.system.smileInfo("\u6279\u91cf\u81ea\u52a8\u5ba1\u6279\u5b8c\u6210,\u5ba1\u6279\u4e86 " + i.msg + "\u6761\u8bb0\u5f55!")
                                }
                        })
                }), void 0)
        },
        resetField: function(e, t) {
                var i = e.getForm().findField(t);
                i && i.reset()
        },
        saveOrCancelApprove: function(e) {
                var t = this,
                i = e.up("form"),
                o = "\u5df2\u5ba1\u6279\u6210\u529f\uff01",
                n = "approve";
                if ("cancelapprove" == e.itemId) {
                        o = "\u5df2\u53d6\u6d88\u5ba1\u6279\uff01",
                        n = "cancelapprove";
                        var a = i.approveFields;
                        this.resetField(i, a[0] + i.order),
                        this.resetField(i, a[1] + i.order),
                        this.resetField(i, a[2] + i.order),
                        this.resetField(i, a[3] + i.order)
                }
                if (i.getForm().isValid()) {
                        var l = new Ext.LoadMask(i, {
                                msg: "\u6b63\u5728\u4fdd\u5b58\u7ed3\u679c\uff0c\u8bf7\u7a0d\u5019......"
                        });
                        l.show();
                        var r = Ext.create(i.module.model, i.data.getData()),
                        d = i.getForm().getFields();
                        d.each(function(e) {
                                r.get(e.name) != e.getValue() && r.set(e.name, e.getValue())
                        }),
                        r.phantom = !1;
                        var s = i.module.tf_title + ":\u3010" + r.getTitleTpl() + "\u3011";
                        r.proxy.extraParams.operType = n,
                        r.save({
                                success: function(e, n) {
                                        l.hide(),
                                        i.moduleGrid.up("modulepanel").refreshNavigate(),
                                        delete r.proxy.extraParams.operType,
                                        delete r.proxy.extraParams.oldid;
                                        var a = Ext.decode(n.response.responseText);
                                        if (0 == a.resultCode) {
                                                Jfok.system.smileInfo(s + o);
                                                var d = Ext.create(i.module.model, Ext.decode(a.records[0])),
                                                u = i.moduleGrid.getSelectionModel().getSelection()[0];
                                                d.fields.each(function(e) {
                                                        u.get(e.name) != d.get(e.name) && u.set(e.name, d.get(e.name))
                                                }),
                                                u.commit(),
                                                i.initForm()
                                        } else i.getForm().markInvalid(a.errorMessage),
                                        Ext.MessageBox.show({
                                                title: "\u8bb0\u5f55\u4fee\u6539\u5931\u8d25",
                                                msg: s + "\u4fee\u6539\u5931\u8d25<br/><br/>" + t.getResponseError(i, a.errorMessage),
                                                buttons: Ext.MessageBox.OK,
                                                icon: Ext.MessageBox.ERROR
                                        })
                                },
                                failure: function() {
                                        l.hide(),
                                        delete r.proxy.extraParams.operType,
                                        delete r.proxy.extraParams.oldid
                                }
                        })
                } else Jfok.system.errorInfo(this.getFormError(i))
        },
        getResponseError: function(e, t) {
                var i = "";
                for (var o in t) {
                        var n = e.getForm().findField(o);
                        i = i + (n ? n.getFieldLabel() : n) + " : " + t[o] + "</br>"
                }
                return i
        }
}),
Ext.define("Jfok.controller.Attachment", {
        extend: "Ext.app.Controller",
        views: ["Jfok.attachment.AttachmentNavigate", "Jfok.attachment.AttachmentTabPanel", "Jfok.attachment.AttachmentView", "Jfok.attachment.ImagePreviewPanel"],
        canPreviewExt: [".pdf", ".swf", ".txt", ".htm", ".html", ".xml", ".sql", ".doc", ".xls"],
        init: function() {
                this.control({
                        "baseform button#uploadnewattachment": {
                                click: function(e) {
                                        console.log(e.up("form").data),
                                        Ext.create("Jfok.m.window.UploadNewAttachment", {
                                                module: e.up("form").module,
                                                model: e.up("form").data
                                        }).show()
                                }
                        },
                        attachmentview: {
                                scope: this,
                                itemdblclick: function(e) {
                                        var t = e.up("tabpanel"),
                                        i = t.down("button#download");
                                        i.fireEvent("click", i)
                                },
                                selectionchange: function(e, t) {
                                        var i = e.view.up("tabpanel");
                                        i.down("#attachmentpreview").setTitle("\u9644\u4ef6\u6587\u4ef6\u9884\u89c8");
                                        var o = i.down("#attachmentfile"),
                                        n = i.down("imagepreviewpanel");
                                        if (o.setVisible(!1), n.setVisible(!1), i.down("displayform").getForm().reset(), 0 != t.length) {
                                                var a = t[0];
                                                i.down("displayform").setData(a);
                                                var l = a.get("tf_filename");
                                                if (i.down("#attachmentpreview").setTitle("\u9644\u4ef6\u6587\u4ef6\u9884\u89c8\u300e" + a.get("tf_name") + (l ? " -- " + l: "") + "\u300f"), a.get("tf_filename")) if (a.get("tf_imgheight")) n.setVisible(!0),
                                                n.setImage("attachment/getattachment.do?id=" + a.get("tf_additionId"), a.get("tf_imgwidth"), a.get("tf_imgheight"));
                                                else {
                                                        var r = !1;
                                                        Ext.each(Jfok.system.tf_previewExts,
                                                        function(e) {
                                                                r = r || a.get("tf_filename").toLowerCase().slice( - e.length - 1) == "." + e
                                                        }),
                                                        r && (o.setVisible(!0), o.el.dom.src = "attachment/getattachment.do?id=" + a.get("tf_additionId"))
                                                } else {
                                                        var d = a.get("tf_remark");
                                                        d && 0 == d.indexOf("http") && (o.setVisible(!0), o.el.dom.src = d)
                                                }
                                        }
                                }
                        },
                        "attachmentnavigate tool[type=refresh]": {
                                click: function(e) {
                                        e.up("attachmentnavigate").store.reload()
                                }
                        },
                        "attachmentnavigate button#download": {
                                click: function(e) {
                                        var t = e.up("attachmentnavigate").down("attachmentview");
                                        if (0 == t.getSelectionModel().selected.items.length) Jfok.system.warnInfo("\u8bf7\u5148\u9009\u62e9\u4e00\u4e2a\u9644\u4ef6,\u7136\u540e\u518d\u6267\u884c\u6b64\u64cd\u4f5c\uff01");
                                        else {
                                                var i = t.getSelectionModel().selected.items[0];
                                                i.get("tf_filename") ? window.location.href = "attachment/download.do?id=" + i.get("tf_additionId") : Jfok.system.warnInfo("\u5f53\u524d\u9009\u4e2d\u7684\u9644\u4ef6\u5c1a\u672a\u4e0a\u4f20\u9644\u4ef6\u6587\u4ef6\uff01")
                                        }
                                }
                        },
                        "attachmentnavigate button#downloadall": {
                                click: function(e) {
                                        var t = e.up("attachmentnavigate").down("attachmentview"),
                                        i = Ext.decode(t.store.extraParams.parentFilter);
                                        window.location.href = "attachment/downloadall.do?moduleId=" + i.moduleId + "&id=" + i.equalsValue + "&text=" + i.text
                                }
                        }
                })
        }
}),
Ext.define("Jfok.controller.Auditing", {
        extend: "Ext.app.Controller",
        views: [],
        init: function() {
                this.control({
                        "auditingform button#saveauditing": {
                                click: this.saveOrCancelAuditing
                        },
                        "auditingform button#cancelauditing": {
                                click: this.saveOrCancelAuditing
                        },
                        "modulepanel menuitem#auditing_thisselection": {
                                click: this.auditingThisSelection
                        },
                        "modulepanel menuitem#auditing_thispage": {
                                click: this.auditingThisPage
                        },
                        "modulepanel menuitem#auditing_thiscondition": {
                                click: this.auditing_thiscondition
                        },
                        "modulepanel menuitem#auditing_all": {
                                click: this.auditing_all
                        }
                })
        },
        auditing_all: function(e) {
                var t = e.up("modulegrid"),
                i = t.getStore(),
                o = {
                        moduleName: t.module.tf_moduleName,
                        parentFilter: i.extraParams.parentFilter
                };
                Ext.MessageBox.confirm("\u786e\u5b9a\u5ba1\u6838", "\u786e\u5b9a\u8981\u81ea\u52a8\u5ba1\u6838\u6240\u6709\u672a\u5ba1\u6838\u7684" + t.module.tf_title + "\u8bb0\u5f55\u5417\uff1f",
                function(e) {
                        "yes" == e && Ext.Ajax.request({
                                url: "moduleauditing/allauditing.do",
                                params: o,
                                success: function(e) {
                                        var i = Ext.decode(e.responseText, !0);
                                        t.refreshAll(),
                                        Jfok.system.smileInfo("\u6279\u91cf\u81ea\u52a8\u5ba1\u6838\u5b8c\u6210,\u5ba1\u6838\u4e86 " + i.msg + "\u6761\u8bb0\u5f55!")
                                }
                        })
                })
        },
        auditing_thiscondition: function(e) {
                var t = e.up("modulegrid"),
                i = t.getStore(),
                o = {
                        moduleName: t.module.tf_moduleName
                };
                for (var n in i.extraParams) o[n] = i.extraParams[n];
                Ext.each(i.filters.items,
                function(e) {
                        o[e.property] = e.value
                }),
                Ext.MessageBox.confirm("\u786e\u5b9a\u5ba1\u6838", "\u786e\u5b9a\u8981\u81ea\u52a8\u5ba1\u6838\u5f53\u524d\u5bfc\u822a\u503c\u548c\u7b5b\u9009\u6761\u4ef6\u4e0b\u7684" + t.module.tf_title + "\u8bb0\u5f55\u5417\uff1f",
                function(e) {
                        "yes" == e && Ext.Ajax.request({
                                url: "moduleauditing/thiscondition.do",
                                params: o,
                                success: function(e) {
                                        var i = Ext.decode(e.responseText, !0);
                                        t.refreshAll(),
                                        Jfok.system.smileInfo("\u6279\u91cf\u81ea\u52a8\u5ba1\u6838\u5b8c\u6210,\u5ba1\u6838\u4e86 " + i.msg + "\u6761\u8bb0\u5f55!")
                                }
                        })
                })
        },
        auditingThisSelection: function(e) {
                var t = e.up("modulegrid"),
                i = (t.getSelection(), []),
                o = [];
                return Ext.each(t.getSelection(),
                function(e) {
                        e.get("tf_auditinged") || (i.push(e.getIdValue()), o.push(e.getTitleTpl()))
                }),
                0 == i.length ? (Jfok.system.warnInfo("\u5f53\u524d\u9009\u4e2d\u7684\u8bb0\u5f55\u4e2d\u6ca1\u6709\u672a\u5ba1\u6838\u7684\u8bb0\u5f55\uff01"), void 0) : (Ext.MessageBox.confirm("\u786e\u5b9a\u5ba1\u6838", "\u786e\u5b9a\u8981\u81ea\u52a8\u5ba1\u6838" + t.module.tf_title + "\u7684\u4ee5\u4e0b\u8bb0\u5f55\u5417\uff1f<br/><br/>" + o.join(", "),
                function(e) {
                        "yes" == e && Ext.Ajax.request({
                                url: "moduleauditing/pagerecord.do",
                                params: {
                                        moduleName: t.module.tf_moduleName,
                                        ids: i.join(",")
                                },
                                success: function(e) {
                                        var i = Ext.decode(e.responseText, !0);
                                        t.refreshAll(),
                                        Jfok.system.smileInfo("\u6279\u91cf\u81ea\u52a8\u5ba1\u6838\u5b8c\u6210,\u5ba1\u6838\u4e86 " + i.msg + "\u6761\u8bb0\u5f55!")
                                }
                        })
                }), void 0)
        },
        auditingThisPage: function(e) {
                var t = e.up("modulegrid"),
                i = t.getStore(),
                o = [],
                n = [];
                return i.each(function(e) {
                        e.get("tf_auditinged") || (o.push(e.getIdValue()), n.push(e.getTitleTpl()))
                }),
                0 == o.length ? (Jfok.system.warnInfo("\u5f53\u524d\u9875\u9762\u4e2d\u6ca1\u6709\u672a\u5ba1\u6838\u7684\u8bb0\u5f55\uff01"), void 0) : (Ext.MessageBox.confirm("\u786e\u5b9a\u5ba1\u6838", "\u786e\u5b9a\u8981\u81ea\u52a8\u5ba1\u6838" + t.module.tf_title + "\u7684\u4ee5\u4e0b\u8bb0\u5f55\u5417\uff1f<br/><br/>" + n.join(", "),
                function(e) {
                        "yes" == e && Ext.Ajax.request({
                                url: "moduleauditing/pagerecord.do",
                                params: {
                                        moduleName: t.module.tf_moduleName,
                                        ids: o.join(",")
                                },
                                success: function(e) {
                                        var i = Ext.decode(e.responseText, !0);
                                        t.refreshAll(),
                                        Jfok.system.smileInfo("\u6279\u91cf\u81ea\u52a8\u5ba1\u6838\u5b8c\u6210,\u5ba1\u6838\u4e86 " + i.msg + "\u6761\u8bb0\u5f55!")
                                }
                        })
                }), void 0)
        },
        saveOrCancelAuditing: function(e) {
                var t = this,
                i = e.up("form"),
                o = "\u5df2\u5ba1\u6838\u6210\u529f\uff01",
                n = "auditing";
                if ("cancelauditing" == e.itemId) {
                        o = "\u5df2\u53d6\u6d88\u5ba1\u6838\uff01",
                        n = "cancelauditing";
                        var a = i.getForm().findField(i.auditingFields[0]);
                        a && a.reset();
                        var a = i.getForm().findField(i.auditingFields[1]);
                        a && a.reset()
                }
                if (i.getForm().isValid()) {
                        var l = new Ext.LoadMask(i, {
                                msg: "\u6b63\u5728\u4fdd\u5b58\u7ed3\u679c\uff0c\u8bf7\u7a0d\u5019......"
                        });
                        l.show();
                        var r = Ext.create(i.module.model, i.data.getData()),
                        d = i.getForm().getFields();
                        d.each(function(e) {
                                r.get(e.name) != e.getValue() && r.set(e.name, e.getValue())
                        }),
                        r.phantom = !1;
                        var s = i.module.tf_title + ":\u3010" + r.getTitleTpl() + "\u3011";
                        r.proxy.extraParams.operType = n,
                        r.save({
                                success: function(e, n) {
                                        l.hide(),
                                        i.moduleGrid.up("modulepanel").refreshNavigate(),
                                        delete r.proxy.extraParams.operType,
                                        delete r.proxy.extraParams.oldid;
                                        var a = Ext.decode(n.response.responseText);
                                        if (0 == a.resultCode) {
                                                Jfok.system.smileInfo(s + o);
                                                var d = Ext.create(i.module.model, Ext.decode(a.records[0])),
                                                u = i.moduleGrid.getSelectionModel().getSelection()[0];
                                                d.fields.each(function(e) {
                                                        u.get(e.name) != d.get(e.name) && u.set(e.name, d.get(e.name))
                                                }),
                                                u.commit(),
                                                i.initForm()
                                        } else i.getForm().markInvalid(a.errorMessage),
                                        Ext.MessageBox.show({
                                                title: "\u8bb0\u5f55\u4fee\u6539\u5931\u8d25",
                                                msg: s + "\u4fee\u6539\u5931\u8d25<br/><br/>" + t.getResponseError(i, a.errorMessage),
                                                buttons: Ext.MessageBox.OK,
                                                icon: Ext.MessageBox.ERROR
                                        })
                                },
                                failure: function() {
                                        l.hide(),
                                        delete r.proxy.extraParams.operType,
                                        delete r.proxy.extraParams.oldid
                                }
                        })
                } else Jfok.system.errorInfo(this.getFormError(i))
        },
        getResponseError: function(e, t) {
                var i = "";
                for (var o in t) {
                        var n = e.getForm().findField(o);
                        i = i + (n ? n.getFieldLabel() : n) + " : " + t[o] + "</br>"
                }
                return i
        }
}),
Ext.define("Jfok.controller.BottomRegion", {
        extend: "Ext.app.Controller",
        models: [],
        stores: [],
        views: ["region.BottomRegion"],
        init: function() {
                this.control({
                        "bottomregion > button[action=email]": {
                                click: this.sendEmail
                        },
                        "bottomregion > button[action=qq]": {
                                click: function() {
                                        var e = document.getElementById("__qq__");
                                        e.target = "_blank",
                                        e.href = "http://wpa.qq.com/msgrd?V=1&Uin=" + Jfok.system.tf_serviceQQ + "&Site=http://wpa.qq.com&Menu=yes",
                                        e.click()
                                }
                        },
                        "bottomregion menuitem#changepassword": {
                                click: this.changePassword
                        },
                        "bottomregion menuitem#myuserroles": {
                                click: this.myUserRoles
                        },
                        "bottomregion menuitem#myuserpopedom": {
                                click: this.myUserPopedom
                        },
                        "bottomregion menuitem#mylogininfo": {
                                click: function() {
                                        this.showModuleWithName("_SystemLoginLog")
                                }
                        },
                        "bottomregion menuitem#myoperinfo": {
                                click: function() {
                                        this.showModuleWithName("_SystemOperateLog")
                                }
                        },
                        "bottomregion button#showuserdw": {
                                click: function() {
                                        Jfok.modules.showModuleRecord("_Systemset", "1")
                                }
                        },
                        "bottomregion button#showdepartment": {
                                click: function() {
                                        Jfok.modules.showModuleRecord("_Department", Jfok.system.tf_departmentId)
                                }
                        },
                        "bottomregion menuitem#showuserinfo": {
                                click: function() {
                                        Jfok.modules.showModuleRecord("_User", Jfok.system.tf_userId)
                                }
                        }
                }),
                Ext.apply(Ext.form.field.VTypes, {
                        password: function(e, t) {
                                if (t.initialPassField) {
                                        var i = t.up("form").down("#" + t.initialPassField);
                                        return e == i.getValue()
                                }
                                return ! 0
                        },
                        passwordText: "\u786e\u8ba4\u65b0\u5bc6\u7801\u4e0e\u65b0\u5bc6\u7801\u4e0d\u5339\u914d!"
                })
        },
        myUserPopedom: function() {
                var e = Ext.create("Jfok.m.additionFunction.UserPopedom", {
                        userId: Jfok.system.tf_userId,
                        userName: Jfok.system.tf_userName
                });
                e.show()
        },
        myUserRoles: function() {
                var e = Ext.widget("window", {
                        height: "50%",
                        width: 350,
                        layout: "fit",
                        modal: !0,
                        title: "\u89d2\u8272\u8bbe\u7f6e\u300e\u7528\u6237\uff1a" + Jfok.system.tf_userName + "\u300f",
                        items: [{
                                xtype: "treepanel",
                                rootVisible: !1,
                                buttonAlign: "center",
                                buttons: [{
                                        text: "\u5173\u95ed",
                                        icon: "images/button/return.png",
                                        scope: this,
                                        handler: function(e) {
                                                e.up("window").hide()
                                        }
                                }],
                                store: new Ext.data.TreeStore({
                                        autoLoad: !0,
                                        proxy: {
                                                type: "ajax",
                                                url: "user/getuserroles.do",
                                                extraParams: {
                                                        userId: Jfok.system.tf_userId
                                                }
                                        }
                                })
                        }]
                });
                e.down("treepanel").getView().onCheckChange = Ext.emptyFn,
                e.show()
        },
        changePassword: function() {
                var e = Ext.widget("window", {
                        title: "\u4fee\u6539\u5bc6\u7801",
                        width: 300,
                        modal: !0,
                        layout: "fit",
                        items: [{
                                xtype: "form",
                                bodyPadding: "15 15 15",
                                fieldDefaults: {
                                        labelAlign: "right",
                                        labelWidth: 80,
                                        msgTarget: "side",
                                        autoFitErrors: !1
                                },
                                defaults: {
                                        inputType: "password",
                                        maxLength: 10,
                                        enforceMaxLength: !0,
                                        allowBlank: !1
                                },
                                buttonAlign: "center",
                                buttons: [{
                                        text: "\u786e\u5b9a",
                                        formBind: !0,
                                        icon: "images/button/save.png",
                                        handler: function(e) {
                                                var t = e.up("form");
                                                t.isValid() && Ext.Ajax.request({
                                                        url: "user/changepassword.do",
                                                        params: {
                                                                oldPassword: t.down("[name=oldpass]").getValue(),
                                                                newPassword: t.down("[name=newpass]").getValue()
                                                        },
                                                        success: function(i) {
                                                                "true" == i.responseText ? (Jfok.system.smileInfo("\u5bc6\u7801\u4fee\u6539\u5df2\u4fdd\u5b58\u6210\u529f!"), e.up("window").hide()) : (t.down("[name=oldpass]").markInvalid("\u539f\u5bc6\u7801\u8f93\u5165\u9519\u8bef!"), Jfok.system.warnInfo("\u539f\u5bc6\u7801\u8f93\u5165\u9519\u8bef!"))
                                                        },
                                                        failure: function() {
                                                                window.alert("\u4fee\u6539\u5bc6\u4fee\u4fdd\u5b58\u5931\u8d25!")
                                                        }
                                                })
                                        }
                                },
                                {
                                        text: "\u5173\u95ed",
                                        icon: "images/button/return.png",
                                        handler: function(e) {
                                                e.up("window").hide()
                                        }
                                }],
                                defaultType: "textfield",
                                items: [{
                                        fieldLabel: "\u539f\u5bc6\u7801",
                                        name: "oldpass"
                                },
                                {
                                        fieldLabel: "\u65b0\u5bc6\u7801",
                                        name: "newpass",
                                        itemId: "newpass"
                                },
                                {
                                        fieldLabel: "\u786e\u8ba4\u65b0\u5bc6\u7801",
                                        initialPassField: "newpass",
                                        vtype: "password"
                                }]
                        }]
                });
                e.show(),
                e.down("field").focus()
        },
        showModuleWithName: function(e) {
                var t = Jfok.modules.getModuleInfoWithName(e),
                i = {
                        moduleId: t.tf_moduleId,
                        moduleName: e,
                        tableAsName: t.tableAsName,
                        primarykey: "tf_userName",
                        fieldtitle: "\u7528\u6237",
                        equalsValue: Jfok.system.tf_userName,
                        equalsMethod: null,
                        text: Jfok.system.tf_userName,
                        isCodeLevel: !1
                };
                Jfok.mainRegion.addFilterModule(e, i)
        },
        sendEmail: function() {
                var e = "mailto:" + Jfok.system.tf_serviceEmail + "?subject=" + Jfok.system.tf_userdwmc + Jfok.system.tf_userName + " \u5173\u4e8e " + Jfok.system.tf_systemName + " \u7684\u54a8\u8be2";
                window.location.href = e
        }
}),
Ext.define("Jfok.controller.Chart", {
        extend: "Ext.app.Controller",
        models: [],
        stores: [],
        views: ["Jfok.lib.BoxSelect", "Jfok.m.chart.CategoryCombo", "Jfok.m.chart.NumericCombo", "Jfok.m.chart.ChartWindow", "Jfok.m.chart.ChartPanel"],
        init: function() {
                var e = this;
                this.control({
                        "chartpanel tool[type=save]": {
                                click: function(t) {
                                        var i = t.up("chartpanel");
                                        if (0 == i.chartStore.getCount()) {
                                                var o = i.down("tool[type=plus]");
                                                o.fireEvent("click", o)
                                        } else Ext.MessageBox.confirm("\u786e\u5b9a\u4fdd\u5b58", "\u786e\u5b9a\u8981\u4fdd\u5b58\u5f53\u524d\u7684\u56fe\u8868\u65b9\u6848\u7684\u8bbe\u7f6e\u53c2\u6570\u5417\uff1f",
                                        function(i) {
                                                "yes" == i && e.saveChartScheme(t.up("chartpanel"))
                                        })
                                }
                        },
                        "chartpanel tool[type=plus]": {
                                click: function(t) {
                                        Ext.MessageBox.prompt("\u4fdd\u5b58\u56fe\u8868\u65b9\u6848", "\u8bf7\u8f93\u5165\u65b0\u65b9\u6848\u540d\u79f0",
                                        function(i, o) {
                                                "ok" == i && o && o.length > 0 && e.newChartScheme(t.up("chartpanel"), o)
                                        })
                                }
                        },
                        "chartpanel tool[type=minus]": {
                                click: function(e) {
                                        var t = e.up("chartpanel");
                                        if (t.chartStore.getCount() <= 1) return Jfok.system.warnInfo("\u5df2\u7ecf\u53ea\u6709\u4e00\u4e2a\u4e86\uff0c\u518d\u5220\u5c31\u6ca1\u4e86\uff01"),
                                        void 0;
                                        var i = t.down("form"),
                                        o = t.chartModule.tf_title + ":\u3010" + t.record.getTitleTpl() + "\u3011";
                                        Ext.MessageBox.confirm("\u786e\u5b9a\u5220\u9664", "\u786e\u5b9a\u8981\u5220\u9664\u5f53\u524d\u7684" + o + "\u5417?",
                                        function(e) {
                                                if ("yes" == e) {
                                                        var n = Ext.create(t.chartModel, i.getForm().getValues()),
                                                        a = n.data.tf_chartId;
                                                        n.destroy({
                                                                success: function(e, i) {
                                                                        var n = Ext.decode(i.response.responseText);
                                                                        0 == n.resultCode ? (Jfok.system.smileInfo(o + " \u5df2\u88ab\u6210\u529f\u5220\u9664\uff01"), t.chartStore.remove(t.chartStore.findRecord("tf_chartId", a)), t.setFormData(t.chartStore.getAt(0)), t.recreateChart()) : Ext.MessageBox.show({
                                                                                title: "\u8bb0\u5f55\u5220\u9664\u5931\u8d25",
                                                                                msg: o + "\u5220\u9664\u5931\u8d25<br/><br/>" + n.message,
                                                                                buttons: Ext.MessageBox.OK,
                                                                                animateTarget: button.id,
                                                                                icon: Ext.MessageBox.ERROR
                                                                        })
                                                                },
                                                                failure: function() {}
                                                        })
                                                }
                                        })
                                }
                        },
                        "chartpanel combo": {
                                select: function(e) {
                                        if ("tf_chartId" == e.name) {
                                                var t = e.up("chartpanel"),
                                                i = t.chartStore.getById(e.getValue());
                                                t.isLoadingRecord = !0,
                                                t.setFormData(i),
                                                t.isLoadingRecord = !1
                                        }
                                        e.up("chartpanel").recreateChart()
                                }
                        },
                        "chartpanel checkbox": {
                                change: function(e) {
                                        e.up("chartpanel").recreateChart()
                                }
                        },
                        "chartpanel textfield[name=tf_title]": {
                                change: function(e, t) {
                                        e.up("chartpanel").down("label#titlelabel").setText(t)
                                }
                        }
                })
        },
        saveChartScheme: function(e) {
                var t = e.down("form");
                if (t.getForm().isValid()) {
                        var i = new Ext.LoadMask(t, {
                                msg: "\u6b63\u5728\u4fdd\u5b58\u7ed3\u679c\uff0c\u8bf7\u7a0d\u5019......"
                        });
                        i.show();
                        var o = Ext.create(e.chartModel, e.record.data),
                        n = t.getForm().getFields();
                        n.each(function(e) {
                                o.get(e.name) != e.getValue() && o.set(e.name, e.getValue())
                        }),
                        o.phantom = !1;
                        var a = e.chartModule.tf_title + ":\u3010" + o.getTitleTpl() + "\u3011";
                        o.proxy.extraParams.operType = "edit",
                        o.save({
                                success: function(n, l) {
                                        i.hide(),
                                        delete o.proxy.extraParams.operType;
                                        var r = Ext.decode(l.response.responseText);
                                        if (0 == r.resultCode) {
                                                Jfok.system.smileInfo(a + "\u5df2\u88ab\u6210\u529f\u4fee\u6539\uff01");
                                                var d = Ext.create(e.chartModel, Ext.decode(r.records[0]));
                                                d.fields.each(function(t) {
                                                        e.record.get(t.name) != d.get(t.name) && e.record.set(t.name, d.get(t.name))
                                                }),
                                                e.record.commit()
                                        } else t.getForm().markInvalid(r.errorMessage),
                                        Ext.MessageBox.show({
                                                title: "\u8bb0\u5f55\u4fee\u6539\u5931\u8d25",
                                                msg: a + "\u4fee\u6539\u5931\u8d25<br/><br/>" + e.getResponseError(t, r.errorMessage),
                                                buttons: Ext.MessageBox.OK,
                                                icon: Ext.MessageBox.ERROR
                                        })
                                },
                                failure: function() {
                                        i.hide(),
                                        delete o.proxy.extraParams.operType
                                }
                        })
                } else Jfok.system.errorInfo(this.getFormError(t))
        },
        newChartScheme: function(e, t) {
                var i = e.down("form");
                if (i.getForm().isValid()) {
                        var o = new Ext.LoadMask(i, {
                                msg: "\u6b63\u5728\u4fdd\u5b58\u7ed3\u679c\uff0c\u8bf7\u7a0d\u5019......"
                        });
                        o.show();
                        var n = Ext.create(e.chartModel, i.getForm().getValues(!1, !1, !1, !0));
                        n.set("tf_name", t),
                        n.set("_t9902___tf_moduleId", e.module.tf_moduleId),
                        n.phantom = !0;
                        var t = e.chartModule.tf_title;
                        n.save({
                                success: function(n, a) {
                                        o.hide();
                                        var l = Ext.decode(a.response.responseText);
                                        if (0 == l.resultCode) {
                                                var r = Ext.create(e.chartModel, Ext.decode(l.records[0]));
                                                t += ":\u3010" + r.getTitleTpl() + "\u3011",
                                                Jfok.system.smileInfo(t + "\u5df2\u88ab\u6210\u529f\u6dfb\u52a0\uff01"),
                                                e.chartStore.add(r),
                                                e.setFormData(r)
                                        } else i.getForm().markInvalid(l.errorMessage),
                                        Ext.MessageBox.show({
                                                title: "\u8bb0\u5f55\u65b0\u589e\u5931\u8d25",
                                                msg: t + "\u65b0\u589e\u5931\u8d25<br/><br/>" + e.getResponseError(i, l.errorMessage),
                                                buttons: Ext.MessageBox.OK,
                                                icon: Ext.MessageBox.ERROR
                                        })
                                }
                        })
                } else Jfok.system.errorInfo(this.getFormError(i))
        }
}),
Ext.define("Jfok.controller.GridNavigate", {
        extend: "Ext.app.Controller",
        init: function() {
                this.control({
                        "navigatesettingmenu menuitem#showintab": {
                                click: function(e) {
                                        var t = e.parentMenu.parentMenu.navigate.down("header[tag=modulenavigate] tool[type=pin]");
                                        t.fireEvent("click", t)
                                }
                        },
                        "navigatesettingmenu menuitem#showinacce": {
                                click: function(e) {
                                        var t = e.parentMenu.parentMenu.navigate.down("header[tag=modulenavigate] tool[type=unpin]");
                                        t.fireEvent("click", t)
                                }
                        },
                        "navigatesettingmenu menuitem#clearAllFilter": {
                                click: function(e) {
                                        e.ownerCt.navigate.clearNavigateValues()
                                }
                        },
                        "navigatesettingmenu menuitem#refresh": {
                                click: function(e) {
                                        this.refreshNavigateTree(e.ownerCt.navigate)
                                }
                        },
                        "navigatesettingmenu menucheckitem#display0record": {
                                checkchange: function(e, t) {
                                        Ext.each(e.ownerCt.navigate.query("navigatetree"),
                                        function(e) {
                                                e.setIsContainNullRecord(t)
                                        })
                                }
                        },
                        "navigatesettingmenu menucheckitem#allselected": {
                                checkchange: function(e, t) {
                                        var i = e.ownerCt.navigate.down("tool[type=" + (t ? "plus": "minus") + "]");
                                        i.fireEvent("click", i)
                                }
                        },
                        "navigatesettingmenu menuitem#dockinleft": {
                                checkchange: function(e, t) {
                                        if (t) {
                                                var i = e.parentMenu.parentMenu.navigate;
                                                i.setBorderRegion("west");
                                                var o = i.down("tabpanel");
                                                o && (i.tabPosition = "left", i.setNavigateMode("tab"))
                                        }
                                }
                        },
                        "navigatesettingmenu menuitem#dockinright": {
                                checkchange: function(e, t) {
                                        if (t) {
                                                var i = e.parentMenu.parentMenu.navigate;
                                                i.setBorderRegion("east");
                                                var o = i.down("tabpanel");
                                                o && (i.tabPosition = "right", i.setNavigateMode("tab"))
                                        }
                                }
                        },
                        modulenavigate: {
                                collapse: function(e) {
                                        e.up("modulepanel").down("recorddetail").collapsed && e.up("modulepanel").down("modulegrid").setShowMaximize(!1)
                                },
                                expand: function(e) {
                                        e.up("modulepanel").down("modulegrid").setShowMaximize(!0)
                                },
                                afterrender: function(e) {
                                        setTimeout(function() {
                                                e.up("modulepanel").down("modulegrid").setShowMaximize(!0)
                                        },
                                        100)
                                }
                        },
                        "modulenavigate tool[type=gear]": {
                                click: function(e, t) {
                                        var i = e.up("modulenavigate").getSettingMenu();
                                        i.show(),
                                        i.setXY([Ext.Array.min([t.browserEvent.clientX, document.body.clientWidth - 200]), t.browserEvent.clientY])
                                }
                        },
                        "modulenavigate tool[type=refresh]": {
                                click: function(e) {
                                        this.refreshNavigateTree(e.up("modulenavigate"))
                                }
                        },
                        "modulenavigate header[tag=modulenavigate] tool[type=unpin]": {
                                click: function(e) {
                                        e.setVisible(!1),
                                        e.ownerCt.down("tool[type=pin]").setVisible(!0),
                                        e.up("modulenavigate").setNavigateMode("accordion"),
                                        e.up("modulenavigate").getSettingMenu().down("menuitem#showintab").setChecked(!1, !0),
                                        e.up("modulenavigate").getSettingMenu().down("menuitem#showinacce").setChecked(!0, !0)
                                }
                        },
                        "modulenavigate header[tag=modulenavigate] tool[type=pin]": {
                                click: function(e) {
                                        e.setVisible(!1),
                                        e.ownerCt.down("tool[type=unpin]").setVisible(!0),
                                        e.up("modulenavigate").setNavigateMode("tab"),
                                        e.up("modulenavigate").getSettingMenu().down("menuitem#showintab").setChecked(!0, !0),
                                        e.up("modulenavigate").getSettingMenu().down("menuitem#showinacce").setChecked(!1, !0)
                                }
                        },
                        "modulenavigate tool[type=plus]": {
                                click: function(e) {
                                        this.setAllSelected(e, !0)
                                }
                        },
                        "modulenavigate tool[type=minus]": {
                                click: function(e) {
                                        this.setAllSelected(e, !1)
                                }
                        }
                })
        },
        setAllSelected: function(e, t) {
                e.setVisible(!1),
                Jfok.system.smileInfo(e.tooltip),
                e.ownerCt.down("tool[type=" + (t ? "minus": "plus") + "]").setVisible(!0),
                e.ownerCt.up("modulenavigate").setAllSelected(t),
                e.up("modulenavigate").getSettingMenu().down("menuitem#allselected").setChecked(t, !0)
        },
        refreshNavigateTree: function(e) {
                Ext.each(e.query("navigatetree"),
                function(e) {
                        e.store.reload()
                })
        }
}),
Ext.define("Jfok.controller.GridNavigateTree", {
        extend: "Ext.app.Controller",
        init: function() {
                this.control({
                        "navigatetree treeview": {
                                drop: this.gridDropToTree,
                                nodedragover: this.gridnodedragover
                        },
                        navigatetree: {
                                selectionchange: this.navigateSelectionChange
                        },
                        "navigatetree tool[type=pin]": {
                                click: function(e) {
                                        e.setVisible(!1),
                                        e.ownerCt.down("tool[type=unpin]").setVisible(!0);
                                        var t = e.up("navigatetree");
                                        t.setCascading(!1)
                                }
                        },
                        "navigatetree tool[type=unpin]": {
                                click: function(e) {
                                        e.setVisible(!1),
                                        e.ownerCt.down("tool[type=pin]").setVisible(!0);
                                        var t = e.up("navigatetree");
                                        t.setCascading(!0)
                                }
                        },
                        "navigatetree tool[type=collapse]": {
                                click: function(e) {
                                        e.up("navigatetree").collapseAll(),
                                        e.up("navigatetree").setLevel(1)
                                }
                        },
                        "navigatetree tool[type=expand]": {
                                click: function(e) {
                                        e.up("navigatetree").expandToNextLevel()
                                }
                        }
                })
        },
        gridDropToTree: function(e, t, i) {
                var o, n = i.raw.moduleName,
                a = t.view.ownerCt.ownerCt.module,
                l = t.records[0].raw,
                r = n == a.tf_moduleName;
                Ext.MessageBox.confirm("\u786e\u8ba4\u4fee\u6539", "\u786e\u5b9a\u8981\u5c06" + a.tf_title + "\u300e" + l[a.tf_nameFields] + "\u300f\u7684" + i.raw.fieldtitle + "\u6539\u4e3a\u201c" + i.raw.text + "\u201d\u5417\uff1f",
                function(e) {
                        if ("yes" === e) {
                                var d = Ext.create(a.model, {});
                                d.set(a.tf_primaryKey, l[a.tf_primaryKey]),
                                r ? d.set(i.raw.fieldname, i.raw.fieldvalue) : (Ext.each(a.moduleFields,
                                function(e) {
                                        return e.tf_fieldType == n ? (o = e, !1) : void 0
                                }), d.set(o.manytoone_IdName, i.raw.fieldvalue)),
                                d.phantom = !1;
                                var s = a.tf_title + ":\u3010" + l[a.tf_nameFields] + "\u3011";
                                d.save({
                                        success: function(e, i) {
                                                delete d.proxy.extraParams.oldid;
                                                var o = Ext.decode(i.response.responseText);
                                                if (0 == o.resultCode) {
                                                        Jfok.system.smileInfo(s + "\u5df2\u88ab\u6210\u529f\u4fee\u6539\uff01");
                                                        var n = Ext.create(a.model, Ext.decode(o.records[0])),
                                                        l = t.view.ownerCt.getSelectionModel().getSelection()[0];
                                                        n.fields.each(function(e) {
                                                                l.get(e.name) != n.get(e.name) && l.set(e.name, n.get(e.name))
                                                        }),
                                                        l.commit(),
                                                        t.view.ownerCt.up("modulepanel").down("modulenavigate").refreshNavigateTree()
                                                } else Ext.MessageBox.show({
                                                        title: "\u8bb0\u5f55\u4fee\u6539\u5931\u8d25",
                                                        msg: s + "\u4fee\u6539\u5931\u8d25<br/><br/>" + o.errorMessage,
                                                        buttons: Ext.MessageBox.OK,
                                                        icon: Ext.MessageBox.ERROR
                                                })
                                        }
                                })
                        }
                })
        },
        gridnodedragover: function(e, t, i) {
                var o = i.view.ownerCt.ownerCt;
                if (!o.module.tf_userRole.tf_allowEditDirect && !o.getFirstSelectedRecord().canEdit()) return ! 1;
                var n, a = e.raw.moduleName,
                l = o.module,
                r = a == l.tf_moduleName;
                return r ? (Ext.each(l.moduleFields,
                function(t) {
                        return t.tf_fieldName == e.raw.fieldname ? (n = t, !1) : void 0
                }), !((n ? 0 : 1) || "String" != n.tf_fieldType && "Integer" != n.tf_fieldType || 1 != n.tf_allowEdit)) : (Ext.each(l.moduleFields,
                function(e) {
                        return e.tf_fieldType == a ? (n = e, !1) : void 0
                }), n && 1 == n.tf_allowEdit ? n.allowParentValue ? !0 : e.data.leaf: !1)
        },
        navigateSelectionChange: function(e, t) {
                if (t && t.length > 0) {
                        {
                                var i = e.view.ownerCt,
                                o = t[0],
                                n = i.up("modulenavigate");
                                i.up("modulepanel").down("modulegrid")
                        }
                        if (o.raw.fieldvalue) {
                                var a = {
                                        moduleName: o.raw.moduleName,
                                        tableAsName: o.raw.tableAsName,
                                        primarykey: o.raw.fieldname,
                                        fieldtitle: o.raw.fieldtitle,
                                        equalsValue: o.raw.fieldvalue,
                                        equalsMethod: o.raw.equalsMethod,
                                        text: o.raw.text,
                                        isCodeLevel: o.raw.isCodeLevel
                                };
                                n.addNavigateValue(i.path, a)
                        } else n.addNavigateValue(i.path, null)
                }
        }
}),
Ext.define("Jfok.controller.HomePagePanel", {
        extend: "Ext.app.Controller",
        models: [],
        stores: [],
        views: ["widget.ModuleAuditingInfoTree", "widget.ModuleApproveInfoTree", "widget.ModulePayoutInfoTree", "widget.FunctionNavigatePanel"],
        init: function() {
                this.control({})
        }
}),
Ext.define("Jfok.controller.MainRegion", {
        extend: "Ext.app.Controller",
        models: [],
        stores: [],
        views: ["region.HomepagePanel"],
        reports: new Ext.util.MixedCollection,
        init: function() {
                this.control({})
        },
        addParentFilterModule: function(e, t, i, o, n) {
                var a = Jfok.system.viewport.down("mainregion"),
                l = e + "_pf_tab",
                r = a.down("panel#" + l),
                d = Jfok.modules.getModule(e);
                r && "_Addition" == e && (a.remove(r, !1), r = null);
                var s = d.getPanelWithParentModule(l, t, i, o, n);
                return null != s ? (r || (r = a.add(s)), r.setTitle(d.tf_title + "\u300e" + o + "\u300f"), (!n || n && !n.notFocus) && a.setActiveTab(r), r) : void 0
        },
        addFilterModule: function(e, t) {
                var i = Jfok.system.viewport.down("mainregion"),
                o = e + "_filter_tab",
                n = i.down("panel#" + o),
                a = Jfok.modules.getModule(e);
                n && "_Addition" == e && (i.remove(n, !1), n = null);
                var l = a.getPanelWithParentFilter(o, t);
                null != l && (n || (n = i.add(l)), n.setTitle(a.tf_title + "\u300e" + t.text + "\u300f"), i.setActiveTab(n))
        },
        addModuleToPayout: function(e) {
                var t = Jfok.system.viewport.down("mainregion"),
                i = e + "_payout",
                o = t.down("panel#" + i),
                n = Jfok.modules.getModule(e),
                a = n.getModulePanelToPayout(i);
                null != a && (o || (o = t.add(a)), o.setTitle(n.tf_title + "\u300e\u53ef\u652f\u4ed8\u300f"), t.setActiveTab(o))
        },
        addModuleToAuditing: function(e) {
                var t = Jfok.system.viewport.down("mainregion"),
                i = e + "_auditing",
                o = t.down("panel#" + i),
                n = Jfok.modules.getModule(e),
                a = n.getModulePanelToAuditing(i);
                null != a && (o || (o = t.add(a)), o.setTitle(n.tf_title + "\u300e\u53ef\u5ba1\u6838\u300f"), t.setActiveTab(o))
        },
        addModuleToApprove: function(e) {
                var t = Jfok.system.viewport.down("mainregion"),
                i = e + "_approve",
                o = t.down("panel#" + i),
                n = Jfok.modules.getModule(e),
                a = n.getModulePanelToApprove(i);
                null != a && (o || (o = t.add(a)), o.setTitle(n.tf_title + "\u300e\u53ef\u5ba1\u6279\u300f"), t.setActiveTab(o))
        },
        addModuleToMainRegion: function(e) {
                e && this.isModuleInMainRegion(e)
        },
        addReportToMainRegion: function(e) {
                if (e) {
                        var t = Jfok.system.viewport.down("mainregion"),
                        i = "report_" + e.reportGroupId + "_tab",
                        o = t.down("panel#" + i);
                        if (!o) {
                                var n = this.reports.get(e.reportGroupId);
                                if (!n) {
                                        var n = Ext.create("Jfok.r.MainReport", {
                                                reportGroup: e,
                                                itemId: i,
                                                closable: !0
                                        });
                                        this.reports.add(e.reportGroupId, n)
                                }
                                o = t.add(n)
                        }
                        t.setActiveTab(o)
                }
        },
        isModuleInMainRegion: function(e) {
                if (e && "undefined" != e) {
                        var t = Jfok.system.viewport.down("mainregion"),
                        i = e + "_tab",
                        o = t.down("panel#" + i);
                        if (!o) {
                                var n = Jfok.modules.getModule(e).getModulePanel(i);
                                null != n && (o = t.add(n))
                        }
                        t.setActiveTab(o)
                }
        }
}),
Ext.define("Jfok.controller.MenuRegion", {
        extend: "Ext.app.Controller",
        views: ["Jfok.view.region.MainMenuToolbar", "Jfok.view.region.MainMenuTree"],
        init: function() {
                this.control({
                        "mainmenutoolbar menu menuitem": {
                                click: this.menuitemClick
                        },
                        mainmenutree: {
                                cellclick: this.cellClick
                        },
                        "mainmenutoolbar tool#left ": {
                                click: this.showMenuInTreePanel
                        },
                        "mainmenuregion tool#up": {
                                click: this.showMenuInToolbar
                        },
                        "functionnavigatepanel button": {
                                click: this.menuitemClick
                        },
                        "mainmenuregion label[menuLabel]": {
                                click: this.menuLabelClick
                        }
                })
        },
        menuLabelClick: function(e) {
                e.addCls("selected"),
                this.menuitemClick(e)
        },
        menuitemClick: function(item) {
                var mainregion = this.getApplication().getController("MainRegion");
                if (item.moduleName) if (item.parentFilter) {
                        var p = "var fp " + item.parentFilter;
                        eval(p),
                        mainregion.addFilterModule(item.moduleName, fp)
                } else mainregion.addModuleToMainRegion(item.moduleName);
                else item.report && mainregion.addReportToMainRegion({
                        reportGroupId: item.reportGroupId,
                        text: item.text,
                        icon: item.icon
                })
        },
        cellClick: function(cell, td, cellIndex, record) {
                var mainregion = this.getApplication().getController("MainRegion");
                if (record.raw.report) mainregion.addReportToMainRegion({
                        reportGroupId: record.raw.reportGroupId,
                        text: record.data.text,
                        icon: record.data.icon
                });
                else if (record.raw.parentFilter) {
                        var p = "var fp " + record.raw.parentFilter;
                        eval(p),
                        mainregion.addFilterModule(record.raw.moduleName, fp)
                } else mainregion.addModuleToMainRegion(record.raw.moduleName)
        },
        showMenuInToolbar: function(e) {
                e.up("viewport").down("mainmenuregion").setVisible(!1),
                e.up("viewport").down("mainmenutoolbar").setVisible(!0),
                Cookies.set("menutoolbar", "true")
        },
        showMenuInTreePanel: function(e) {
                e.up("viewport").down("mainmenuregion").setVisible(!0),
                e.up("viewport").down("mainmenutoolbar").setVisible(!1),
                Cookies.set("menutoolbar", "false")
        }
}),
Ext.define("Jfok.controller.Module", {
        extend: "Ext.app.Controller",
        models: [],
        stores: [],
        views: ["Jfok.m.model.ApproveBase"],
        init: function() {
                this.control({
                        gridschemecombo: {
                                change: this.gridSchemeChange
                        },
                        detailschemecombo: {
                                change: this.detailSchemeChange
                        },
                        gridgroupcombo: {
                                change: function(e, t) {
                                        var i = e.up("modulepanel").down("modulegrid");
                                        i.store.clearGrouping(),
                                        i.lockedGrid.getView().getFeature("grouping").disable(),
                                        "none" != t && (i.store.group(t), i.lockedGrid.getView().getFeature("grouping").enable())
                                }
                        },
                        recorddetail: {
                                beforeedit: function() {
                                        return ! 1
                                },
                                expand: function(e) {
                                        var t = e.up("modulepanel").down("modulegrid");
                                        t.updateRecordDetail(t.getSelectionModel().getSelection())
                                }
                        },
                        modulegrid: {
                                afterrender: this.gridAfterRender,
                                selectionchange: function(e, t) {
                                        var i = e.view.up("modulegrid");
                                        i.silent || (i.updateRecordDetail(t), i.module.updateActiveForm(), i.module.displayWindow && !i.module.getDisplayWindow().isHidden() && i.module.getDisplayWindow().form.setLinkedGrid(i), i.updateTitle())
                                },
                                cellclick: function() {},
                                itemdblclick: function(e) {
                                        var t = e.up("modulepanel").down("recorddetail");
                                        t.collapsed ? t.expand() : t.collapse()
                                }
                        },
                        "modulegrid tool[type=maximize]": {
                                click: function(e) {
                                        e.up("modulepanel").down("recorddetail").collapse(),
                                        e.up("modulepanel").down("modulenavigate") && e.up("modulepanel").down("modulenavigate").collapse(),
                                        e.up("modulegrid").setShowMaximize(!1)
                                }
                        },
                        "modulegrid tool[type=restore]": {
                                click: function(e) {
                                        e.up("modulepanel").down("recorddetail").expand(),
                                        e.up("modulepanel").down("modulenavigate") && e.up("modulepanel").down("modulenavigate").expand(),
                                        e.up("modulegrid").setShowMaximize(!0)
                                }
                        },
                        "modulegrid tool[type=refresh]": {
                                click: function(e) {
                                        e.up("modulegrid").store.reload()
                                }
                        },
                        "modulegrid headercontainer": {
                                columnmove: function(e, t) {
                                        t.up("modulegrid").getGridSettingMenu().down("#savecolumnorder").setDisabled(!1)
                                }
                        },
                        "modulegrid gridcolumn": {
                                resize: function(e, t, i, o) {
                                        "undefined" == typeof e.flex && "undefined" != typeof o && o != t && (e.up("modulegrid").getGridSettingMenu().down("#savecolumnwidth").setDisabled(!1), e.resized = !0, t += 4, t -= t % 5, e.setWidth(t))
                                }
                        },
                        "modulegrid tool[type=gear]": {
                                click: function(e, t) {
                                        var i = e.up("modulegrid").getGridSettingMenu();
                                        i.show(),
                                        i.setXY([Ext.Array.min([t.browserEvent.clientX, document.body.clientWidth - 200]), t.browserEvent.clientY])
                                }
                        },
                        gridsettingmenu: {
                                beforeshow: function() {}
                        },
                        "gridsettingmenu #saverecordorder": {
                                click: function(e) {
                                        var t = e.ownerCt.modulegrid,
                                        i = [];
                                        t.getStore().each(function(e) {
                                                i.push(e.getIdValue())
                                        }),
                                        Ext.Ajax.request({
                                                url: "moduleoperation/saverecordorder.do",
                                                params: {
                                                        moduleName: t.module.tf_moduleName,
                                                        param: i.join(",")
                                                },
                                                success: function() {
                                                        Jfok.system.smileInfo("\u5f53\u524d\u8bb0\u5f55\u987a\u5e8f\u53f7\u5df2\u4fdd\u5b58\u6210\u529f!"),
                                                        e.setDisabled(!0),
                                                        t.getStore().reload()
                                                }
                                        })
                                }
                        },
                        "gridsettingmenu #savecolumnorder": {
                                click: function(e) {
                                        var t = e.ownerCt.modulegrid,
                                        i = t.lockedGrid.getView().headerCt.items.items;
                                        i = i.concat(t.normalGrid.getView().headerCt.items.items);
                                        var o = [];
                                        Ext.each(i,
                                        function(e) {
                                                e.gridFieldId ? o.push(e.gridFieldId) : e.items.length > 0 && e.items.items && Ext.each(e.items.items,
                                                function(e) {
                                                        e.gridFieldId && o.push(e.gridFieldId)
                                                })
                                        }),
                                        Ext.Ajax.request({
                                                url: "moduleoperation/savegridcolumnorder.do",
                                                params: {
                                                        param: o.join(",")
                                                },
                                                success: function() {
                                                        Jfok.system.smileInfo("\u5217\u8868\u8868\u5934\u7684\u987a\u5e8f\u5df2\u4fdd\u5b58\u6210\u529f!"),
                                                        e.setDisabled(!0)
                                                }
                                        })
                                }
                        },
                        "gridsettingmenu #autocolumnwidth": {
                                click: function(e) {
                                        var t = e.ownerCt.modulegrid,
                                        i = t.lockedGrid.getView().headerCt.items.items;
                                        Ext.suspendLayouts(),
                                        Ext.each(i,
                                        function(e) {
                                                "attachmentnumbercolumn" != e.xtype && e.autoSize()
                                        });
                                        var i = t.normalGrid.getView().headerCt.items.items;
                                        Ext.each(i,
                                        function(e) {
                                                "attachmentnumbercolumn" != e.xtype && e.autoSize()
                                        }),
                                        Ext.resumeLayouts(!0),
                                        t.getGridSettingMenu().down("#savecolumnwidth").setDisabled(!1)
                                }
                        },
                        "gridsettingmenu #savecolumnwidth": {
                                click: function(e) {
                                        var t = e.ownerCt.modulegrid,
                                        i = t.lockedGrid.getView().headerCt.items.items,
                                        o = [];
                                        Ext.each(i,
                                        function(e) {
                                                e.isGroupHeader ? Ext.each(e.items.items,
                                                function(e) {
                                                        e.resized && o.push({
                                                                gridFieldId: e.gridFieldId,
                                                                width: e.width
                                                        })
                                                }) : e.resized && o.push({
                                                        gridFieldId: e.gridFieldId,
                                                        width: e.width
                                                })
                                        }),
                                        i = t.normalGrid.getView().headerCt.items.items,
                                        Ext.each(i,
                                        function(e) {
                                                e.isGroupHeader ? Ext.each(e.items.items,
                                                function(e) {
                                                        e.resized && o.push({
                                                                gridFieldId: e.gridFieldId,
                                                                width: e.width
                                                        })
                                                }) : e.resized && o.push({
                                                        gridFieldId: e.gridFieldId,
                                                        width: e.width
                                                })
                                        });
                                        var n = "";
                                        Ext.each(o,
                                        function(e) {
                                                n += e.gridFieldId + ":" + e.width + ","
                                        }),
                                        Ext.Ajax.request({
                                                url: "moduleoperation/savegridcolumnwidth.do",
                                                params: {
                                                        param: n
                                                },
                                                success: function() {
                                                        Jfok.system.smileInfo("\u5217\u8868\u8868\u5934\u7684\u5bbd\u5ea6\u5df2\u4fdd\u5b58\u6210\u529f!"),
                                                        e.setDisabled(!0),
                                                        Ext.each(i.items,
                                                        function(e) {
                                                                e.isGroupHeader ? Ext.each(e.items.items,
                                                                function(e) {
                                                                        delete e.resized
                                                                }) : delete e.resized
                                                        })
                                                }
                                        })
                                }
                        },
                        "gridsettingmenu #downloadinsertexcel": {
                                click: function(e) {
                                        e.ownerCt.modulegrid;
                                        window.location.href = "module/downloadinsertexcel.do?moduleId=" + e.ownerCt.modulegrid.module.tf_moduleId
                                }
                        }
                })
        },
        gridAfterRender: function(e) {
                e.getStore().load(),
                e.updateTitle()
        },
        gridSchemeChange: function(e, t) {
                e.up("modulepanel").down("modulegrid").updateColumnFieldsWithSchemeId(t, !0)
        },
        detailSchemeChange: function(e, t) {
                e.up("modulepanel").down("recorddetail").selectScheme(t);
                var i = e.up("modulepanel").down("modulegrid");
                i.updateRecordDetail(i.getSelectionModel().getSelection())
        }
}),
Ext.define("Jfok.controller.ModuleAdditionFunction", {
        extend: "Ext.app.Controller",
        requires: ["Jfok.lib.CheckTreePanel"],
        init: function() {
                this.control({
                        "toolbar button[needRecord=true][showWindow=true]": {
                                click: function(e) {
                                        this.executeWithSelectAndWindow(e)
                                }
                        },
                        "toolbar button[additionName=AddModule]": {
                                click: function(e) {
                                        this.addModule(e)
                                }
                        },
                        "toolbar button[additionName=RefreshFields]": {
                                click: function(e) {
                                        this.refreshFields(e)
                                }
                        },
                        "toolbar button[additionName=RefreshNavigateModule]": {
                                click: function(e) {
                                        var t = e.up("modulegrid"),
                                        i = t.getParentOrNavigateValue("_Module");
                                        i ? Ext.Ajax.request({
                                                scope: this,
                                                url: "systemframe/refreshnavigatemodule.do",
                                                params: {
                                                        moduleId: i
                                                },
                                                success: function(e) {
                                                        t.refreshAll(),
                                                        Jfok.system.smileInfo("\u6a21\u5757\u5bfc\u822a\u5b57\u6bb5\u5237\u65b0,\u52a0\u5165\u4e86 " + e.responseText + "\u4e2a\u8bb0\u5f55!")
                                                },
                                                failure: function() {
                                                        window.alert(text + "\u4fdd\u5b58\u5931\u8d25!")
                                                }
                                        }) : Jfok.system.warnInfo("\u8bf7\u5728\u5bfc\u822a\u5217\u8868\u4e2d\u9009\u62e9\u4e00\u4e2a\u6a21\u5757\uff0c\u518d\u6267\u884c\u6b64\u64cd\u4f5c!")
                                }
                        },
                        "toolbar button[additionName=ResetPassword]": {
                                click: function(e) {
                                        this.resetPassword(e)
                                }
                        },
                        "toolbar button[additionName=DownloadAdditionFile]": {
                                click: function(e) {
                                        this.downloadAdditionFile(e)
                                }
                        },
                        "toolbar button[additionName=DownloadBackupFile]": {
                                click: function(e) {
                                        this.downloadBackupFile(e)
                                }
                        },
                        "toolbar button[additionName=DownloadUploadedFile]": {
                                click: function(e) {
                                        this.downloadUploadedFile(e)
                                }
                        },
                        "toolbar menuitem[additionName=RestartTomcat]": {
                                click: function(e) {
                                        this.restartTomcat(e)
                                }
                        },
                        "toolbar menuitem[additionName=UpdateServerDate]": {
                                click: function() {
                                        var e = new Date;
                                        Ext.Ajax.request({
                                                url: "updateserverdate.do",
                                                params: {
                                                        d: e.getFullYear() + "-" + (e.getMonth() + 1) + "-" + e.getDate(),
                                                        t: e.getHours() + ":" + e.getMinutes() + ":" + e.getSeconds()
                                                },
                                                success: function(e) {
                                                        var t = e.responseText;
                                                        t ? Jfok.system.warnInfo(t) : jfok.system.smileInfo("\u670d\u52a1\u5668\u65f6\u95f4\u5df2\u6839\u636e\u5f53\u524d\u5ba2\u6237\u7aef\u65f6\u95f4\u66f4\u65b0\u5b8c\u6210\u3002")
                                                }
                                        })
                                }
                        },
                        "menuitem[additionName^=AgreementPlan]": {
                                click: function(e) {
                                        this.AgreementPlanAction(e)
                                }
                        },
                        "toolbar button[additionName=MoveToBlack]": {
                                click: function(e) {
                                        var t = e.up("modulegrid"),
                                        i = t.getFirstSelectedRecord(),
                                        o = i.getIdValue();
                                        Ext.MessageBox.confirm("\u786e\u5b9a", "\u786e\u5b9a\u5c06\u6b64\u5355\u4f4d\u79fb\u5165\u5230\u9ed1\u540d\u5355\u5417?",
                                        function(e) {
                                                "yes" == e && Ext.Ajax.request({
                                                        url: "developer/movetoblack.do",
                                                        params: {
                                                                developerId: o
                                                        },
                                                        success: function(e) {
                                                                var i = Ext.decode(e.responseText);
                                                                0 == i.success ? Jfok.system.warnInfo(i.msg) : Jfok.system.smileInfo("\u5df2\u5c06\u6b64\u5355\u4f4d\u52a0\u5165\u5230\u9ed1\u540d\u5355!"),
                                                                t.refreshAll()
                                                        },
                                                        failure: function() {
                                                                window.alert("\u52a0\u5165\u9ed1\u540d\u5355\u5931\u8d25!")
                                                        }
                                                })
                                        })
                                }
                        }
                })
        },
        AgreementPlanAutoCreate: function(e, t) {
                Ext.Ajax.request({
                        url: "agreementplan/autocreate.do",
                        params: {
                                agreementId: e
                        },
                        success: function(e) {
                                var i = Ext.decode(e.responseText);
                                0 == i.success ? Jfok.system.warnInfo(i.msg) : Jfok.system.smileInfo("\u6b64\u5408\u540c\u7684\u4ed8\u6b3e\u8ba1\u5212\u5df2\u81ea\u52a8\u751f\u6210!"),
                                t.refreshAll()
                        },
                        failure: function() {
                                window.alert("\u91cd\u65b0\u751f\u6210\u5408\u540c\u4ed8\u6b3e\u8ba1\u5212\u5931\u8d25!")
                        }
                })
        },
        AgreementPlanAction: function(e) {
                var t = this,
                i = e.up("modulegrid"),
                o = i.getParentOrNavigateValue("Agreement");
                if (o) if ("AgreementPlanAutoCreate" == e.additionName) i.store.count() > 0 ? Ext.MessageBox.confirm("\u786e\u5b9a", "\u786e\u5b9a\u8981\u91cd\u65b0\u81ea\u52a8\u751f\u6210\u6b64\u5408\u540c\u7684\u4ed8\u6b3e\u8ba1\u5212\u5417\uff1f(\u539f\u5df2\u5236\u5b9a\u7684\u8ba1\u5212\u4f1a\u88ab\u5168\u90e8\u5220\u9664)",
                function(e) {
                        "yes" == e && t.AgreementPlanAutoCreate(o, i)
                }) : t.AgreementPlanAutoCreate(o, i);
                else if ("AgreementPlanAutoBalance" == e.additionName) Ext.Ajax.request({
                        url: "agreementplan/autobalance.do",
                        params: {
                                agreementId: o
                        },
                        success: function(t) {
                                var o = Ext.decode(t.responseText);
                                0 == o.success ? Jfok.system.warnInfo(o.msg) : Jfok.system.smileInfo("\u5f53\u524d\u5408\u540c" + e.text + "\u64cd\u4f5c\u5b8c\u6210!"),
                                i.refreshAll()
                        },
                        failure: function() {
                                window.alert(e.title + "\u5931\u8d25!")
                        }
                });
                else {
                        var n = i.getFirstSelectedRecord();
                        if (n) {
                                var a = e.additionName,
                                l = ( - 1 == a.indexOf("Late") ? "-": "") + a.charAt(a.length - 1);
                                Ext.Ajax.request({
                                        url: "agreementplan/moveplanmonth.do",
                                        params: {
                                                agreementId: o,
                                                planId: n.get("tf_planId"),
                                                moveMonth: l
                                        },
                                        success: function(t) {
                                                var o = Ext.decode(t.responseText);
                                                0 == o.success ? Jfok.system.warnInfo(o.msg) : Jfok.system.smileInfo("\u4ed8\u6b3e\u6708\u4efd" + e.text + "\u64cd\u4f5c\u5b8c\u6210!"),
                                                i.refreshAll()
                                        },
                                        failure: function() {
                                                window.alert(e.title + "\u5931\u8d25!")
                                        }
                                })
                        }
                } else Jfok.system.warnInfo("\u8bf7\u5728\u5bfc\u822a\u5217\u8868\u4e2d\u9009\u62e9\u4e00\u4e2a\u9879\u76ee\u5408\u540c\uff0c\u518d\u6267\u884c\u6b64\u64cd\u4f5c!")
        },
        restartTomcat: function() {
                Ext.Ajax.request({
                        url: "restarttomcat.do"
                })
        },
        downloadBackupFile: function(e) {
                var t = e.up("modulegrid"),
                i = t.getFirstSelectedRecord();
                i && (window.location.href = "systembackup/download.do?id=" + i.get("tf_systembackupId"))
        },
        downloadUploadedFile: function(e) {
                var t = e.up("modulegrid"),
                i = t.getFirstSelectedRecord();
                i && (1 == i.get("tf_hasfiledata") ? window.location.href = "systemoperatelog/download.do?id=" + i.get("tf_systemlogId") : Jfok.system.warnInfo("\u5f53\u524d\u9009\u62e9\u7684\u65e5\u5fd7\u8bb0\u5f55\u6ca1\u6709\u6587\u4ef6\u4fe1\u606f\uff01"))
        },
        downloadAdditionFile: function(e) {
                var t = e.up("modulegrid"),
                i = t.getFirstSelectedRecord();
                i && (i.get("tf_filename") ? window.location.href = "attachment/download.do?id=" + i.get("tf_additionId") : Jfok.system.warnInfo("\u6b64\u9644\u4ef6\u8bb0\u5f55\u5c1a\u672a\u4e0a\u4f20\u9644\u4ef6\u6587\u4ef6!"))
        },
        resetPassword: function(e) {
                var t = e.up("modulegrid"),
                i = t.getFirstSelectedRecord();
                i && Ext.MessageBox.confirm("\u786e\u5b9a\u91cd\u7f6e", "\u786e\u5b9a\u8981\u91cd\u7f6e\u7528\u6237\u300e" + i.get("tf_userName") + "\u300f\u7684\u5bc6\u7801\u5417?",
                function(e) {
                        "yes" == e && Ext.Ajax.request({
                                url: "user/resetpassword.do",
                                params: {
                                        userId: i.get("tf_userId")
                                },
                                success: function() {
                                        Jfok.system.smileInfo("\u7528\u6237\u300e" + i.get("tf_userName") + "\u300f\u7684\u5bc6\u7801\u5df2\u91cd\u7f6e\u4e3a123456\uff0c\u8bf7\u901a\u77e5\u5176\u5c3d\u5feb\u4fee\u6539!")
                                },
                                failure: function() {
                                        window.alert("\u91cd\u7f6e\u7528\u6237\u5bc6\u7801\u4fdd\u5b58\u5931\u8d25!")
                                }
                        })
                })
        },
        executeWithSelectAndWindow: function(e) {
                var t = e.up("modulegrid"),
                i = t.getFirstSelectedRecord();
                i && Ext.create("Jfok.m.additionFunction." + e.additionName, {
                        buttonText: e.text,
                        selectRecord: i
                }).show()
        },
        refreshFields: function(e) {
                var t = e.up("modulegrid"),
                i = t.getParentOrNavigateValue("_Module");
                i ? Ext.Ajax.request({
                        scope: this,
                        url: "systemframe/refreshfields.do",
                        params: {
                                moduleId: i
                        },
                        success: function(e) {
                                t.refreshAll(),
                                Jfok.system.smileInfo("\u6a21\u5757\u5b57\u6bb5\u5237\u65b0,\u52a0\u5165\u4e86 " + e.responseText + "\u4e2a\u5b57\u6bb5!")
                        },
                        failure: function() {
                                window.alert(text + "\u4fdd\u5b58\u5931\u8d25!")
                        }
                }) : Jfok.system.warnInfo("\u8bf7\u5728\u5bfc\u822a\u5217\u8868\u4e2d\u9009\u62e9\u4e00\u4e2a\u6a21\u5757\uff0c\u518d\u6267\u884c\u6b64\u64cd\u4f5c!")
        },
        addModule: function(e) {
                Ext.MessageBox.prompt("\u589e\u52a0\u6a21\u5757", "\u8bf7\u8f93\u5165\u8981\u589e\u52a0\u6a21\u5757\u7684\u7c7b\u540d\u79f0:",
                function(t, i) {
                        "ok" == t && Ext.Ajax.request({
                                scope: this,
                                url: "systemframe/addmodule.do",
                                params: {
                                        moduleName: i
                                },
                                success: function(t) {
                                        t.responseText ? Ext.MessageBox.show({
                                                title: "\u5bfc\u5165\u5931\u8d25",
                                                msg: "\u5bfc\u5165\u6a21\u5757\u5931\u8d25<br/><br/>" + t.responseText,
                                                buttons: Ext.MessageBox.OK,
                                                icon: Ext.MessageBox.ERROR
                                        }) : (e.up("modulegrid").refreshAll(), Jfok.system.smileInfo("\u6a21\u5757:" + i + "\u7684\u5b9a\u4e49\u548cgrid,form\u5b9a\u4e49\u5df2\u7ecf\u5230\u52a0\u7cfb\u7edf\u4e2d!"))
                                },
                                failure: function() {
                                        window.alert(i + "\u4fdd\u5b58\u5931\u8d25!")
                                }
                        })
                })
        }
}),
Ext.define("Jfok.controller.ModuleForm", {
        extend: "Ext.app.Controller",
        init: function() {
                this.control({
                        "basewindow > header > tool[type=gear]": {
                                click: function(e, t) {
                                        var i = e.up("basewindow"),
                                        o = Ext.create("Jfok.m.w.FormSubModuleMenu", {
                                                module: i.module,
                                                window: i
                                        });
                                        o.show(),
                                        o.setXY([Ext.Array.min([t.browserEvent.clientX, document.body.clientWidth - 200]), t.browserEvent.clientY])
                                }
                        },
                        "menuitem[formChildButton=true]": {
                                click: function(e) {
                                        var t, i, o = e.window.down("baseform");
                                        if (o.data ? t = o.data.data[o.module.tf_primaryKey] : o.model && (t = o.model.getIdValue()), !t) return Jfok.system.warnInfo("\u6b64\u8bb0\u5f55\u5c1a\u672a\u4fdd\u5b58\uff0c\u4e0d\u80fd\u663e\u793a\u5176\u5b50\u6a21\u5757\u8bb0\u5f55\u3002"),
                                        void 0;
                                        i = o.data.data[o.module.tf_nameFields];
                                        var n = Ext.create("Jfok.m.window.SubModuleWindow", {
                                                childModuleName: e.moduleName,
                                                pModuleName: e.window.module.tf_moduleName,
                                                pId: t,
                                                pName: i,
                                                param: null,
                                                y: 50,
                                                x: 10,
                                                height: document.body.clientHeight - 100,
                                                width: document.body.clientWidth - 20
                                        });
                                        n.show()
                                }
                        },
                        "basewindow tool[type=collapse]": {
                                click: function(e) {
                                        var t, i = e.up("basewindow").down("baseform");
                                        i.data ? t = i.data.data[i.module.tf_primaryKey] : i.model && (t = i.model.getIdValue()),
                                        t ? window.location.href = Ext.String.format("rest/module/exportrecord.do?moduleName={0}&id={1}", i.module.tf_moduleName, t) : Jfok.system.warnInfo("\u6b64\u8bb0\u5f55\u5c1a\u672a\u4fdd\u5b58\uff0c\u4e0d\u80fd\u5bfc\u51faExcel\u3002")
                                }
                        },
                        "basewindow tool[type=print]": {
                                click: function(e) {
                                        var t = e.up("window"),
                                        i = window.open();
                                        i.document.write("<html><head>"),
                                        i.document.write("<title>Title</title>"),
                                        i.document.write('<link rel="Stylesheet" type="text/css" href="extjs4/resources/css/ext-all.css" />'),
                                        i.document.write('<script type="text/javascript" src="extjs4/ext-all.js"></script>'),
                                        i.document.write("</head><body>"),
                                        i.document.write(t.body.dom.innerHTML),
                                        i.document.write("</body></html>"),
                                        i.print()
                                }
                        },
                        "basewindow tool[type=search]": {
                                click: function(e) {
                                        var t = e.up("window"),
                                        i = t.down("form");
                                        if (!i.data || !i.data.getIdValue()) return Jfok.system.warnInfo("\u6b64\u8bb0\u5f55\u5c1a\u672a\u4fdd\u5b58\uff0c\u4e0d\u53ef\u4ee5\u67e5\u770b\u9644\u4ef6!"),
                                        void 0;
                                        var o = i.data.getIdValue(),
                                        n = i.data.getTitleTpl();
                                        window.attachmentWin && window.attachmentWin.pModuleName !== t.module.tf_moduleName && (window.attachmentWin.destroy(), window.attachmentWin = null),
                                        window.attachmentWin ? window.attachmentWin.changeParentFilter(t.module.tf_moduleName, t.module.tf_title, o, n) : window.attachmentWin = Ext.widget("attahcmentwindow", {
                                                pModuleName: t.module.tf_moduleName,
                                                pModuleTitle: t.module.tf_title,
                                                aid: o,
                                                aname: n,
                                                x: .1 * document.body.clientWidth,
                                                y: .1 * document.body.clientHeight,
                                                width: .8 * document.body.clientWidth,
                                                height: .8 * document.body.clientHeight,
                                                param: {}
                                        }),
                                        window.attachmentWin.show()
                                }
                        },
                        "basewindow baseform[formtype=edit] field": {
                                change: function(e) {
                                        e.up("modulepanel") || e.up("form").down("button#saveedit").enable()
                                }
                        },
                        "baseform button#editprior": {
                                click: this.editpriorornext
                        },
                        "baseform button#editnext": {
                                click: this.editpriorornext
                        },
                        "baseform button#saveedit": {
                                click: function(e) {
                                        var t = this,
                                        i = e.up("form");
                                        i.data.canEdit() ? this.saveedit(e) : Ext.MessageBox.show({
                                                title: "\u4fdd\u5b58\u4fee\u6539",
                                                msg: "\u5f53\u524d" + i.module.tf_title + "\u8bb0\u5f55\u5df2\u7ecf\u5ba1\u6838\u6216\u5ba1\u6279\u8fc7\u4e86\uff0c\u4f60\u786e\u5b9a\u8981\u4fdd\u5b58\u5417?",
                                                buttons: Ext.MessageBox.YESNO,
                                                fn: function(i) {
                                                        "yes" == i && t.saveedit(e)
                                                },
                                                icon: Ext.MessageBox.QUESTION
                                        })
                                }
                        },
                        basewindow: {
                                show: function(e) {
                                        e.form.submitSuccessed = !1,
                                        e.down("form").initForm()
                                },
                                beforeclose: function(e) {
                                        var t = this,
                                        i = e.down("form");
                                        return "edit" != i.formtype || i.down("button#saveedit").disabled || e.afterquery ? void 0 : (Ext.MessageBox.show({
                                                title: "\u4fdd\u5b58\u4fee\u6539",
                                                msg: "\u5f53\u524d" + i.module.tf_title + "\u8bb0\u5f55\u5df2\u7ecf\u88ab\u4fee\u6539\u8fc7\uff0c\u9700\u8981\u4fdd\u5b58\u5417?",
                                                buttons: Ext.MessageBox.YESNO,
                                                fn: function(o) {
                                                        "yes" == o && t.saveedit(i.down("button#saveedit")),
                                                        e.afterquery = !0,
                                                        e.close()
                                                },
                                                icon: Ext.MessageBox.QUESTION
                                        }), !1)
                                },
                                close: function(e) {
                                        delete e.afterquery,
                                        ("new" == e.form.formtype || "edit" == e.form.formtype || "auditing" == e.form.formtype || "approve" == e.form.formtype) && e.form.module.tf_linkedModule && Jfok.modules.refreshModuleGrid(e.form.module.tf_linkedModule),
                                        e.form.moduleGrid || "display" == e.form.formtype || Jfok.modules.refreshModuleGrid(e.form.module.tf_moduleName)
                                }
                        },
                        "baseform field[namefield=true]": {
                                change: function(e) {
                                        e.up("form").setWindowTitle()
                                }
                        },
                        "baseform button#close": {
                                click: function(e) {
                                        e.up("window").close()
                                }
                        },
                        "baseform button#prior": {
                                click: function(e) {
                                        e.up("form").moduleGrid.selectPriorRecord()
                                }
                        },
                        "baseform button#next": {
                                click: function(e) {
                                        e.up("form").moduleGrid.selectNextRecord()
                                }
                        },
                        "baseform button#savenew": {
                                click: this.savenew
                        },
                        "baseform button#upload": {
                                click: this.upload
                        },
                        "baseform button#newnext": {
                                click: function(e) {
                                        e.up("form").initForm()
                                }
                        },
                        "baseform menuitem#newwithcopy": {
                                click: function(e) {
                                        var t = e.up("form");
                                        t.copyrecord = t.data,
                                        e.up("form").initForm()
                                }
                        }
                })
        },
        editpriorornext: function(e) {
                var t = this,
                i = e.up("form");
                i.down("button#saveedit").disabled ? "editprior" == e.itemId ? i.moduleGrid.selectPriorRecord() : i.moduleGrid.selectNextRecord() : Ext.MessageBox.show({
                        title: "\u4fdd\u5b58\u4fee\u6539",
                        msg: "\u5f53\u524d" + i.module.tf_title + "\u8bb0\u5f55\u5df2\u7ecf\u88ab\u4fee\u6539\u8fc7\uff0c\u9700\u8981\u4fdd\u5b58\u5417?",
                        buttons: Ext.MessageBox.YESNOCANCEL,
                        fn: function(o) {
                                "yes" == o ? t.saveedit(i.down("button#saveedit")) : "no" == o && ("editprior" == e.itemId ? i.moduleGrid.selectPriorRecord() : i.moduleGrid.selectNextRecord())
                        },
                        icon: Ext.MessageBox.QUESTION
                })
        },
        saveedit: function(e) {
                var t = this,
                i = e.up("form");
                if (i.getForm().isValid()) {
                        var o = new Ext.LoadMask(i, {
                                msg: "\u6b63\u5728\u4fdd\u5b58\u7ed3\u679c\uff0c\u8bf7\u7a0d\u5019......"
                        });
                        o.show();
                        var n = Ext.create(i.module.model, i.data.getData()),
                        a = i.getForm().getFields(),
                        l = n.idProperty;
                        i.getForm().getValues()[l] && n.get(l) != i.getForm().getValues()[l] && (n.proxy.extraParams.oldid = n.get(l)),
                        a.each(function(e) {
                                n.get(e.name) != e.getValue() && n.set(e.name, e.getValue())
                        }),
                        n.phantom = !1;
                        var r = i.module.tf_title + ":\u3010" + n.getTitleTpl() + "\u3011";
                        n.proxy.extraParams.operType = "edit",
                        n.save({
                                success: function(a, l) {
                                        o.hide(),
                                        delete n.proxy.extraParams.operType,
                                        delete n.proxy.extraParams.oldid;
                                        var d = Ext.decode(l.response.responseText);
                                        if (0 == d.resultCode) {
                                                Jfok.system.smileInfo(r + "\u5df2\u88ab\u6210\u529f\u4fee\u6539\uff01");
                                                var s = Ext.create(i.module.model, Ext.decode(d.records[0])),
                                                u = i.moduleGrid.getSelectionModel().getSelection()[0];
                                                s.fields.each(function(e) {
                                                        u.get(e.name) != s.get(e.name) && u.set(e.name, s.get(e.name))
                                                }),
                                                u.commit(),
                                                i.getForm().loadRecord(s),
                                                e.disable(),
                                                i.submitSuccessed = !0
                                        } else i.getForm().markInvalid(d.errorMessage),
                                        Ext.MessageBox.show({
                                                title: "\u8bb0\u5f55\u4fee\u6539\u5931\u8d25",
                                                msg: r + "\u4fee\u6539\u5931\u8d25<br/><br/>" + t.getResponseError(i, d.errorMessage),
                                                buttons: Ext.MessageBox.OK,
                                                icon: Ext.MessageBox.ERROR
                                        })
                                },
                                failure: function() {
                                        o.hide(),
                                        delete n.proxy.extraParams.operType,
                                        delete n.proxy.extraParams.oldid
                                }
                        })
                } else Jfok.system.errorInfo(this.getFormError(i))
        },
        upload: function(e) {
                var t = e.up("form");
                t.getForm().isValid() && t.getForm().submit({
                        url: "attachment/uploadnew.do",
                        waitMsg: "\u6b63\u5728\u4e0a\u4f20\u6587\u4ef6,\u8bf7\u7a0d\u5019...",
                        timeout: 60,
                        success: function() {
                                Jfok.system.smileInfo("\u9644\u4ef6\u6587\u4ef6\u5df2\u4e0a\u4f20\u6210\u529f!"),
                                e.setVisible(!1),
                                e.ownerCt.down("#newnext").setVisible(!0),
                                Ext.each(t.query("fieldset"),
                                function(e) {
                                        e.setDisabled(!0)
                                });
                                var i = t.moduleGrid;
                                i.store.reload(),
                                i.up("modulepanel").param.parentModuleGrid && i.up("modulepanel").param.parentModuleGrid.refreshSelectedRecord()
                        },
                        failure: function(e, t) {
                                t.response.responseText.indexOf("MaxUploadSize") ? Ext.MessageBox.show({
                                        title: "\u4e0a\u4f20\u6587\u4ef6\u5931\u8d25",
                                        msg: "\u5931\u8d25\u539f\u56e0:\u4e0a\u4f20\u6587\u4ef6\u7684\u5927\u5c0f\u8d85\u8fc7\u4e8610M,\u8bf7\u91cd\u65b0\u4e0a\u4f20...",
                                        buttons: Ext.MessageBox.OK,
                                        icon: Ext.MessageBox.ERROR
                                }) : Ext.Msg.alert("\u4e0a\u4f20\u6587\u4ef6\u5931\u8d25", t.response.responseText)
                        }
                })
        },
        savenew: function(e) {
                var t = this,
                i = e.up("form");
                if (i.getForm().isValid()) {
                        var o = new Ext.LoadMask(i, {
                                msg: "\u6b63\u5728\u4fdd\u5b58\u7ed3\u679c\uff0c\u8bf7\u7a0d\u5019......"
                        });
                        o.show();
                        var n = Ext.create(i.module.model, i.getForm().getValues());
                        n.phantom = !0;
                        var a = i.module.tf_title;
                        n.save({
                                success: function(n, l) {
                                        o.hide();
                                        var r = Ext.decode(l.response.responseText);
                                        if (0 == r.resultCode) {
                                                var d = Ext.create(i.module.model, Ext.decode(r.records[0]));
                                                a += ":\u3010" + d.getTitleTpl() + "\u3011",
                                                Jfok.system.smileInfo(a + "\u5df2\u88ab\u6210\u529f\u6dfb\u52a0\uff01");
                                                var s = i.moduleGrid;
                                                if (s) {
                                                        var u = -1;
                                                        s.store.count() > 0 && (u = s.store.getAt(s.store.count() - 1).index),
                                                        d.index = u + 1;
                                                        var c = s.store.add(d);
                                                        s.store.totalCount++,
                                                        s.getSelectionModel().select(c),
                                                        s.up("modulepanel").refreshNavigate()
                                                }
                                                i.setData(d),
                                                e.setVisible(!1),
                                                e.ownerCt.down("#newnext") && e.ownerCt.down("#newnext").setVisible(!0),
                                                Ext.each(i.query("fieldset"),
                                                function(e) {
                                                        e.down("modulepanel") || e.setDisabled(!0)
                                                }),
                                                i.submitSuccessed = !0
                                        } else i.getForm().markInvalid(r.errorMessage),
                                        Ext.MessageBox.show({
                                                title: "\u8bb0\u5f55\u65b0\u589e\u5931\u8d25",
                                                msg: a + "\u65b0\u589e\u5931\u8d25<br/><br/>" + t.getResponseError(i, r.errorMessage),
                                                buttons: Ext.MessageBox.OK,
                                                icon: Ext.MessageBox.ERROR
                                        })
                                }
                        })
                } else Jfok.system.errorInfo(this.getFormError(i))
        },
        getResponseError: function(e, t) {
                var i = "";
                for (var o in t) {
                        var n = o,
                        a = e.getForm().findField(o);
                        if (a) if (a.getFieldLabel()) n = a.getFieldLabel();
                        else {
                                var l = e.module.getFieldDefineWithName(o);
                                l && (n = l.tf_title)
                        }
                        i = i + n + " : " + t[o] + "</br>"
                }
                return i
        },
        getFormError: function(e) {
                var t = e.getForm().getFields(),
                i = "";
                return t.each(function(e) {
                        Ext.each(e.getErrors(),
                        function(t) {
                                i = i + e.getFieldLabel() + " : " + t + "</br>"
                        })
                }),
                i
        }
}),
Ext.define("Jfok.controller.ModuleToolbar", {
        extend: "Ext.app.Controller",
        views: ["Jfok.m.w.GridSearchField"],
        init: function() {
                this.control({
                        "moduletoolbar menuitem[action=showpdfreport]": {
                                click: function(e) {
                                        var t, i = e.up("modulegrid"),
                                        o = Ext.Array.findBy(i.module.moduleExcelReports,
                                        function(t) {
                                                return t.tf_id == e.reportId
                                        });
                                        o.tf_isSelectRecord && (t = i.getFirstSelectedRecord(), t && window.open(Ext.String.format("rest/module/downloadrecordexcelreportPDF.do?moduleId={0}&excelReportId={1}&id={2}", i.module.tf_moduleId, o.tf_id, t.getIdValue()), "printexcelrecord"))
                                }
                        },
                        "moduletoolbar menuitem[action=excelreport]": {
                                click: function(e) {
                                        var t, i = e.up("modulegrid"),
                                        o = Ext.Array.findBy(i.module.moduleExcelReports,
                                        function(t) {
                                                return t.tf_id == e.reportId
                                        });
                                        if (o.tf_isSelectRecord) t = i.getFirstSelectedRecord(),
                                        t && (window.location.href = Ext.String.format("rest/module/downloadrecordexcelreport.do?moduleId={0}&excelReportId={1}&id={2}", i.module.tf_moduleId, o.tf_id, t.getIdValue()));
                                        else if (o.tf_isSelectMonth) {
                                                var n = Ext.create("Jfok.m.window.ExcelReportSelectSection", {
                                                        module: i.module,
                                                        excelReport: o
                                                });
                                                n.show()
                                        }
                                }
                        },
                        "moduletoolbar menuitem#downloadall": {
                                click: function(e) {
                                        var t = e.up("modulegrid"),
                                        i = t.getFirstSelectedRecord();
                                        i && (window.location.href = "attachment/downloadall.do?moduleId=" + t.module.tf_moduleId + "&id=" + i.getIdValue() + "&text=" + i.getTitleTpl())
                                }
                        },
                        "toolbar [childButton=true]": {
                                click: function(e) {
                                        var t = e.up("modulegrid"),
                                        i = t.getFirstSelectedRecord();
                                        if (i) {
                                                var o = e;
                                                if (e.isMenu && (o = e.up("[text=\u66f4\u591a]")), e.openInWindow) {
                                                        var n = Ext.create("Jfok.m.window.SubModuleWindow", {
                                                                childModuleName: e.moduleName,
                                                                pModuleName: t.module.tf_moduleName,
                                                                pId: i.getIdValue(),
                                                                pName: i.getTitleTpl(),
                                                                param: null,
                                                                animateTarget: o.id,
                                                                y: o.getY() + o.el.dom.offsetHeight + 2,
                                                                x: 10,
                                                                height: document.body.clientHeight - (o.getY() + o.el.dom.offsetHeight + 2 + 2),
                                                                width: document.body.clientWidth - 20
                                                        });
                                                        n.show()
                                                } else Jfok.mainRegion.addParentFilterModule(e.moduleName, t.module.tf_moduleName, i.getIdValue(), i.getTitleTpl(), {})
                                        }
                                }
                        },
                        "moduletoolbar [action=chart]": {
                                click: function(e) {
                                        var t = e.up("modulegrid");
                                        Ext.widget("chartwindow", {
                                                grid: t,
                                                x: t.getX(),
                                                y: t.getY(),
                                                height: t.getHeight(),
                                                width: t.getWidth()
                                        }).show()
                                }
                        },
                        "moduletoolbar [action=printrecord]": {
                                click: function(e) {
                                        var t = e.ownerCt.up("grid"),
                                        i = t.getFirstSelectedRecord();
                                        if (i) {
                                                Ext.Ajax.request({
                                                        async: !1,
                                                        url: "rest/module/printrecord.do",
                                                        params: {
                                                                moduleName: t.module.tf_moduleName,
                                                                id: i.getIdValue(),
                                                                schemeId: e.schemeId
                                                        },
                                                        success: function(e) {
                                                                var i = ["<html>", "<head>", '<link rel="Shortcut Icon" href="favicon.png" type="image/png" />', '<link href="styles/printrecord.css" rel="stylesheet" type="text/css" />', "<title>\u6253\u5370" + t.module.tf_title + "</title>", "</head>", "<body>", '<div class="printer-noprint">', '<div class="buttons">', '<a class="button-print" href="javascript:void(0);" onclick="window.print();return false;">\u6253\u5370</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;', '<a class="button-exit" href="javascript:void(0);" onclick="window.close();return false;">\u5173\u95ed</a>', "<hr/>", "</div>", "</div>", e.responseText, "</body>", "</html>"],
                                                                o = Ext.create("Ext.XTemplate", i).apply(),
                                                                n = window.open("", "printrecord");
                                                                n.document.open(),
                                                                n.document.write(o),
                                                                n.document.close()
                                                        }
                                                })
                                        }
                                }
                        },
                        "moduletoolbar [action=exportrecord]": {
                                click: function(e) {
                                        var t = e.ownerCt.up("grid"),
                                        i = t.getFirstSelectedRecord();
                                        i && (window.location.href = Ext.String.format("rest/module/exportrecord.do?moduleName={0}&id={1}&title={2}&schemeId={3}", t.module.tf_moduleName, i.getIdValue(), i.getTitleTpl(), e.schemeId))
                                }
                        },
                        "moduletoolbar menuitem#exportgrid": {
                                click: function(e) {
                                        var t = e.ownerCt.up("grid");
                                        this.exportOrprintGrid(t, !0)
                                }
                        },
                        "moduletoolbar menuitem#printgridall": {
                                click: function(e) {
                                        var t = e.ownerCt.up("grid");
                                        this.exportOrprintGrid(t, !1)
                                }
                        },
                        "moduletoolbar button#display": {
                                click: function(e) {
                                        var t = e.up("modulegrid"),
                                        i = t.getFirstSelectedRecord();
                                        if (i) {
                                                var o = t.module.getDisplayWindow();
                                                o.show(),
                                                o.form.setLinkedGrid(t)
                                        }
                                }
                        },
                        "moduletoolbar button#new": {
                                click: function(e) {
                                        var t = e.up("modulegrid"),
                                        i = !0;
                                        if (Ext.each(t.module.moduleFields,
                                        function(e) {
                                                return e.n && null == t.getParentOrNavigateValue(e.tf_fieldType) ? (Jfok.system.warnInfo("\u8bf7\u5728\u5bfc\u822a\u5217\u8868\u4e2d\u9009\u62e9\u4e00\u4e2a\u300e" + e.tf_title + "\u300f\u518d\u65b0\u589e\u3002"), i = !1, !1) : void 0
                                        }), i) {
                                                var o = t.module.getNewWindow();
                                                o.form.setLinkedGrid(t),
                                                o.show()
                                        }
                                }
                        },
                        "moduletoolbar menuitem#newwithcopy": {
                                click: function(e) {
                                        var t = e.up("modulegrid"),
                                        i = t.getFirstSelectedRecord();
                                        if (i) {
                                                var o = t.module.getNewWindow();
                                                o.form.copyrecord = i,
                                                o.form.setLinkedGrid(t),
                                                o.show()
                                        }
                                }
                        },
                        "moduletoolbar menuitem#uploadinsertexcel": {
                                click: function(e) {
                                        var t = e.up("modulegrid"),
                                        i = Ext.create("Jfok.m.window.UploadInsertExcelWindow", {
                                                module: t.module
                                        });
                                        i.show()
                                }
                        },
                        "moduletoolbar menuitem#uploadinsertexcelrecord": {
                                click: function(e) {
                                        var t = e.up("modulegrid"),
                                        i = Ext.create("Jfok.m.window.UploadInsertExcelRecordWindow", {
                                                module: t.module,
                                                methodId: e.methodId,
                                                remark: e.remark,
                                                grid: t
                                        });
                                        i.show()
                                }
                        },
                        "moduletoolbar button#payout": {
                                click: function(e) {
                                        var t = e.up("modulegrid"),
                                        i = t.getFirstSelectedRecord();
                                        if (i) {
                                                var o = i.get("tf_payoutStatus");
                                                if ("\u53ef\u652f\u4ed8" != o) return Jfok.system.warnInfo("\u6b64\u8bb0\u5f55\u7684\u652f\u4ed8\u72b6\u6001\u4e3a\uff1a\u300e" + o + "\u300f\uff0c\u4e0d\u80fd\u8fdb\u884c\u652f\u4ed8\u64cd\u4f5c\u3002"),
                                                void 0;
                                                var n = t.module,
                                                a = Jfok.modules.getModule(n.tf_moduleName + "Detail"),
                                                l = a.getPaymentWindow(),
                                                r = {
                                                        moduleId: n.tf_moduleId,
                                                        moduleName: n.tf_moduleName,
                                                        tableAsName: n.tableAsName,
                                                        primarykey: n.tf_primaryKey,
                                                        fieldtitle: n.tf_title,
                                                        equalsValue: i.getIdValue(),
                                                        equalsMethod: null,
                                                        text: i.getTitleTpl(),
                                                        isCodeLevel: n.codeLevel
                                                };
                                                l.form.setParentFilter(r),
                                                l.show(),
                                                l.on("hide",
                                                function() {
                                                        t.refreshAll()
                                                })
                                        }
                                }
                        },
                        "moduletoolbar button#delete": {
                                click: this.deleteRecord
                        },
                        "moduletoolbar button#edit": {
                                click: function(e) {
                                        var t = e.up("modulegrid"),
                                        i = t.getFirstSelectedRecord("edit");
                                        if (i) {
                                                var o = t.module.getEditWindow();
                                                o.form.setLinkedGrid(t),
                                                o.show()
                                        }
                                }
                        },
                        "moduletoolbar button#uploadfile": {
                                click: function(e) {
                                        var t = e.up("modulegrid"),
                                        i = t.getFirstSelectedRecord("edit");
                                        if (i) {
                                                var o = Ext.create("Jfok.m.window.UploadModuleFile", {
                                                        module: t.module,
                                                        model: i
                                                });
                                                o.show()
                                        }
                                }
                        },
                        "moduletoolbar button#auditing": {
                                click: function(e) {
                                        var t = e.up("modulegrid"),
                                        i = t.getFirstSelectedRecord();
                                        if (i) {
                                                var o = t.module.getAuditingWindow();
                                                o.form.setLinkedGrid(t),
                                                o.show()
                                        }
                                }
                        },
                        "moduletoolbar button#approve": {
                                click: function(e) {
                                        var t = e.up("modulegrid"),
                                        i = t.getFirstSelectedRecord();
                                        if (i) {
                                                var o = t.module.getApproveWindow();
                                                o.form.setLinkedGrid(t),
                                                o.show()
                                        }
                                }
                        },
                        "moduletoolbar #additiongrid": {
                                click: function(e) {
                                        var t = e.up("modulegrid"),
                                        i = t.getFirstSelectedRecord();
                                        i && Jfok.mainRegion.addParentFilterModule("_Addition", t.module.tf_moduleName, i.getIdValue(), i.getTitleTpl(), {})
                                }
                        },
                        "moduletoolbar #additionview": {
                                click: this.additionview
                        },
                        "moduletoolbar #additionviewandinsert": {
                                click: this.additionview
                        }
                })
        },
        additionview: function(e) {
                var t = e.up("modulegrid"),
                i = t.getFirstSelectedRecord();
                if (i) {
                        var o = Jfok.mainRegion.addParentFilterModule("_Addition", t.module.tf_moduleName, i.getIdValue(), i.getTitleTpl(), {
                                showAdditionView: !0,
                                notFocus: "additionviewandinsert" == e.itemId,
                                parentModuleGrid: t
                        });
                        if ("additionviewandinsert" == e.itemId) {
                                var n = o.down("button#new");
                                n && n.fireEvent("click", n)
                        }
                }
        },
        exportOrprintGrid: function(e, t) {
                var i;
                Ext.each(e.store.filters.items,
                function(e) {
                        return (e.property = "query") ? (i = e.value, !1) : void 0
                });
                var o = Ext.apply(e.store.extraParams);
                o.moduleName = e.module.tf_moduleName,
                i && (o.query = i);
                var n = [];
                Ext.each(e.store.sorters.items,
                function(e) {
                        n.push({
                                property: e.property,
                                direction: e.direction
                        })
                }),
                n.length > 0 && (o.sort = Ext.encode(n));
                var a = [];
                if (Ext.each(e.store.groupers.items,
                function(e) {
                        a.push({
                                property: e.property,
                                direction: e.direction
                        })
                }), a.length > 0 && (o.group = Ext.encode(a)), t) window.location.href = Ext.String.format("rest/module/exportgrid.do?{0}", Ext.Object.toQueryString(o));
                else {
                        var l = window.open();
                        l.document.write("<html><head>"),
                        l.document.write("<title>" + e.module.tf_title + "\u6253\u5370</title>"),
                        l.document.write("</head><body>"),
                        l.document.write('<iframe src="' + Ext.String.format("rest/module/exportgridtoprint.do?{0}", Ext.Object.toQueryString(o)) + '" style="width:100% ; height: 100%" frameborder="0"></iframe>'),
                        l.document.write("</body></html>"),
                        win.document.close()
                }
        },
        deleteRecord: function(e) {
                var t = e.up("modulegrid");
                if (t.getSelectionCount() > 1) return this.deleteRecords(e),
                void 0;
                var i = t.getFirstSelectedRecord("delete");
                if (i) {
                        var o = i.canDelete();
                        if ("object" == typeof o) return Jfok.system.warnInfo(o.message),
                        !1;
                        var n = t.module.tf_title + ":\u3010" + i.getTitleTpl() + "\u3011";
                        Ext.MessageBox.confirm("\u786e\u5b9a\u5220\u9664", "\u786e\u5b9a\u8981\u5220\u9664\u5f53\u524d\u9009\u4e2d\u7684" + n + "\u5417?",
                        function(o) {
                                if ("yes" == o) {
                                        var a = Ext.create(t.store.model, i.data);
                                        a.destroy({
                                                success: function(i, o) {
                                                        var a = Ext.decode(o.response.responseText);
                                                        0 == a.resultCode ? (Jfok.system.smileInfo(n + " \u5df2\u88ab\u6210\u529f\u5220\u9664\uff01"), t.refreshAll()) : Ext.MessageBox.show({
                                                                title: "\u8bb0\u5f55\u5220\u9664\u5931\u8d25",
                                                                msg: n + "\u5220\u9664\u5931\u8d25<br/><br/>" + a.message,
                                                                buttons: Ext.MessageBox.OK,
                                                                animateTarget: e.id,
                                                                icon: Ext.MessageBox.ERROR
                                                        })
                                                },
                                                failure: function() {}
                                        })
                                }
                        })
                }
        },
        deleteRecords: function(e) {
                var t = e.up("modulegrid"),
                i = t.getSelection("delete"),
                o = [];
                if (Ext.each(i,
                function(e) {
                        var t = e.canDelete();
                        "object" == typeof t && o.push(t.message)
                }), 0 != o.length) {
                        var n = Ext.String.format("\u4ee5\u4e0b {0} \u6761\u4e0d\u80fd\u5220\u9664\uff0c\u8bf7\u91cd\u65b0\u9009\u62e9\u540e\u518d\u5220\u9664\u3002<br/><br/>{1}", o.length, "<ol><li>" + o.join("</li><li>") + "</li></ol>");
                        return Jfok.system.warnInfo(n),
                        !1
                }
                var a = "<ol><li>" + t.getSelectionTitleTpl().join("</li><li>") + "</li></ol>";
                Ext.MessageBox.confirm("\u786e\u5b9a\u5220\u9664", Ext.String.format("\u786e\u5b9a\u8981\u5220\u9664" + t.module.tf_title + "\u5f53\u524d\u9009\u4e2d\u7684 {0} \u6761\u8bb0\u5f55\u5417?<br/><br/>{1}", i.length, a),
                function(i) {
                        "yes" == i && Ext.Ajax.request({
                                url: "rest/module/removerecords.do",
                                params: {
                                        moduleName: t.module.tf_moduleName,
                                        ids: t.getSelectionIds().join(","),
                                        titles: t.getSelectionTitleTpl().join("~~")
                                },
                                success: function(i) {
                                        var o = Ext.decode(i.responseText, !0);
                                        0 == o.resultCode ? Jfok.system.smileInfo(a + " \u5df2\u6210\u529f\u88ab\u5220\u9664\u3002") : Ext.MessageBox.show({
                                                title: "\u5220\u9664\u7ed3\u679c",
                                                msg: (o.okMessageList.length > 0 ? "\u5df2\u88ab\u5220\u9664\u8bb0\u5f55\uff1a<br/><ol><li>" + o.okMessageList.join("</li><li>") + "</li></ol><br/>": "") + "\u5220\u9664\u5931\u8d25\u8bb0\u5f55\uff1a<br/><ol><li>" + o.errorMessageList.join("</li><li>") + "</li></ol>",
                                                buttons: Ext.MessageBox.OK,
                                                animateTarget: e.id,
                                                icon: Ext.MessageBox.ERROR
                                        }),
                                        o.okMessageList.length > 0 && t.refreshAll()
                                },
                                failure: function() {
                                        window.alert("\u5220\u9664\u65f6\uff0c\u670d\u52a1\u5668\u8fd4\u56de\u8fd4\u56de\u9519\u8bef")
                                }
                        })
                })
        }
}),
Ext.define("Jfok.controller.TopRegion", {
        extend: "Ext.app.Controller",
        models: [],
        stores: [],
        views: ["region.TopRegion"],
        init: function() {
                this.control({
                        "[action=logout]": {
                                click: this.logout
                        },
                        "topregion button[action=homepage]": {
                                click: function() {
                                        Jfok.system.getViewport().down("mainregion").setActiveTab(0)
                                }
                        }
                })
        },
        logout: function() {
                Ext.Ajax.request({
                        url: "login/logout.do",
                        success: function() {
                                Cookies.set("password", "", -1),
                                location.reload(!0)
                        }
                })
        }
}),
Ext.define("Jfok.controller.report.Chart", {
        extend: "Ext.app.Controller",
        models: [],
        stores: [],
        views: [],
        init: function() {
                var e = this;
                this.control({
                        "reportchartpanel tool[type=save]": {
                                click: function(t) {
                                        var i = t.up("reportchartpanel");
                                        if (0 == i.chartStore.getCount()) {
                                                var o = i.down("tool[type=plus]");
                                                o.fireEvent("click", o)
                                        } else Ext.MessageBox.confirm("\u786e\u5b9a\u4fdd\u5b58", "\u786e\u5b9a\u8981\u4fdd\u5b58\u5f53\u524d\u7684\u56fe\u8868\u65b9\u6848\u7684\u8bbe\u7f6e\u53c2\u6570\u5417\uff1f",
                                        function(i) {
                                                "yes" == i && e.saveChartScheme(t.up("reportchartpanel"))
                                        })
                                }
                        },
                        "reportchartpanel tool[type=plus]": {
                                click: function(t) {
                                        Ext.MessageBox.prompt("\u4fdd\u5b58\u56fe\u8868\u65b9\u6848", "\u8bf7\u8f93\u5165\u65b0\u65b9\u6848\u540d\u79f0",
                                        function(i, o) {
                                                "ok" == i && o && o.length > 0 && e.newChartScheme(t.up("reportchartpanel"), o)
                                        })
                                }
                        },
                        "reportchartpanel tool[type=minus]": {
                                click: function(e) {
                                        var t = e.up("reportchartpanel");
                                        if (t.chartStore.getCount() < 1) return Jfok.system.warnInfo("\u5df2\u7ecf\u4e00\u4e2a\u65b9\u6848\u90fd\u6ca1\u6709\u4e86\uff0c\u8fd8\u600e\u4e48\u5220\uff01"),
                                        void 0;
                                        var i = t.down("form"),
                                        o = t.chartModule.tf_title + ":\u3010" + t.record.getTitleTpl() + "\u3011";
                                        Ext.MessageBox.confirm("\u786e\u5b9a\u5220\u9664", "\u786e\u5b9a\u8981\u5220\u9664\u5f53\u524d\u7684" + o + "\u5417?",
                                        function(e) {
                                                if ("yes" == e) {
                                                        var n = Ext.create(t.chartModel, i.getForm().getValues()),
                                                        a = n.data.tf_chartId;
                                                        n.destroy({
                                                                success: function(e, i) {
                                                                        var n = Ext.decode(i.response.responseText);
                                                                        0 == n.resultCode ? (Jfok.system.smileInfo(o + " \u5df2\u88ab\u6210\u529f\u5220\u9664\uff01"), t.chartStore.remove(t.chartStore.findRecord("tf_chartId", a)), t.setFormData(t.chartStore.getAt(0)), t.recreateChart()) : Ext.MessageBox.show({
                                                                                title: "\u8bb0\u5f55\u5220\u9664\u5931\u8d25",
                                                                                msg: o + "\u5220\u9664\u5931\u8d25<br/><br/>" + n.message,
                                                                                buttons: Ext.MessageBox.OK,
                                                                                animateTarget: button.id,
                                                                                icon: Ext.MessageBox.ERROR
                                                                        })
                                                                },
                                                                failure: function() {}
                                                        })
                                                }
                                        })
                                }
                        },
                        "reportchartpanel combo": {
                                select: function(e) {
                                        if ("tf_chartId" == e.name) {
                                                var t = e.up("reportchartpanel"),
                                                i = t.chartStore.getById(e.getValue());
                                                t.isLoadingRecord = !0,
                                                t.setFormData(i),
                                                t.isLoadingRecord = !1
                                        }
                                        e.up("reportchartpanel").recreateChart()
                                }
                        },
                        "reportchartpanel checkbox": {
                                change: function(e) {
                                        e.up("reportchartpanel").recreateChart()
                                }
                        },
                        "reportchartpanel textfield[name=tf_title]": {
                                change: function(e, t) {
                                        e.up("reportchartpanel").down("label#titlelabel").setText(t)
                                }
                        }
                })
        },
        saveChartScheme: function(e) {
                var t = e.down("form");
                if (t.getForm().isValid()) {
                        var i = new Ext.LoadMask(t, {
                                msg: "\u6b63\u5728\u4fdd\u5b58\u7ed3\u679c\uff0c\u8bf7\u7a0d\u5019......"
                        });
                        i.show();
                        var o = Ext.create(e.chartModel, e.record.data),
                        n = t.getForm().getFields();
                        n.each(function(e) {
                                o.get(e.name) != e.getValue() && o.set(e.name, e.getValue())
                        }),
                        o.phantom = !1;
                        var a = e.chartModule.tf_title + ":\u3010" + o.getTitleTpl() + "\u3011";
                        o.proxy.extraParams.operType = "edit",
                        o.save({
                                success: function(n, l) {
                                        i.hide(),
                                        delete o.proxy.extraParams.operType;
                                        var r = Ext.decode(l.response.responseText);
                                        if (0 == r.resultCode) {
                                                Jfok.system.smileInfo(a + "\u5df2\u88ab\u6210\u529f\u4fee\u6539\uff01");
                                                var d = Ext.create(e.chartModel, Ext.decode(r.records[0]));
                                                d.fields.each(function(t) {
                                                        e.record.get(t.name) != d.get(t.name) && e.record.set(t.name, d.get(t.name))
                                                }),
                                                e.record.commit()
                                        } else t.getForm().markInvalid(r.errorMessage),
                                        Ext.MessageBox.show({
                                                title: "\u8bb0\u5f55\u4fee\u6539\u5931\u8d25",
                                                msg: a + "\u4fee\u6539\u5931\u8d25<br/><br/>" + e.getResponseError(t, r.errorMessage),
                                                buttons: Ext.MessageBox.OK,
                                                icon: Ext.MessageBox.ERROR
                                        })
                                },
                                failure: function() {
                                        i.hide(),
                                        delete o.proxy.extraParams.operType
                                }
                        })
                } else Jfok.system.errorInfo(this.getFormError(t))
        },
        newChartScheme: function(e, t) {
                var i = e.down("form");
                if (i.getForm().isValid()) {
                        var o = new Ext.LoadMask(i, {
                                msg: "\u6b63\u5728\u4fdd\u5b58\u7ed3\u679c\uff0c\u8bf7\u7a0d\u5019......"
                        });
                        o.show();
                        var n = Ext.create(e.chartModel, i.getForm().getValues(!1, !1, !1, !0));
                        n.set("tf_name", t),
                        n.set("_t9052___tf_reportId", e.reportId),
                        n.phantom = !0;
                        var t = e.chartModule.tf_title;
                        n.save({
                                success: function(n, a) {
                                        o.hide();
                                        var l = Ext.decode(a.response.responseText);
                                        if (0 == l.resultCode) {
                                                var r = Ext.create(e.chartModel, Ext.decode(l.records[0]));
                                                t += ":\u3010" + r.getTitleTpl() + "\u3011",
                                                Jfok.system.smileInfo(t + "\u5df2\u88ab\u6210\u529f\u6dfb\u52a0\uff01"),
                                                e.chartStore.add(r),
                                                e.setFormData(r)
                                        } else i.getForm().markInvalid(l.errorMessage),
                                        Ext.MessageBox.show({
                                                title: "\u8bb0\u5f55\u65b0\u589e\u5931\u8d25",
                                                msg: t + "\u65b0\u589e\u5931\u8d25<br/><br/>" + e.getResponseError(i, l.errorMessage),
                                                buttons: Ext.MessageBox.OK,
                                                icon: Ext.MessageBox.ERROR
                                        })
                                }
                        })
                } else Jfok.system.errorInfo(this.getFormError(i))
        }
}),
Ext.define("Jfok.controller.report.NavigateSelectFieldsTree", {
        extend: "Ext.app.Controller",
        views: ["Jfok.r.selectfields.FieldConditionWindow"],
        init: function() {
                this.control({
                        "mainreport selectedfieldstree": {
                                itemclick: function(e, t, i, o, n) {
                                        if ("img" == n.target.localName) if ( - 1 != n.target.src.indexOf("setting.png")) {
                                                var a = Jfok.modules.getModule(t.raw.moduleName),
                                                l = a.getFieldDefine(t.raw.id),
                                                r = e.ownerCt.up("mainreport");
                                                if ("Date" == l.tf_fieldType) {
                                                        var d = r.getBaseModuleDateField();
                                                        if (d && d.fieldId == t.raw.id) r.down("dateselectbutton").showMenu();
                                                        else {
                                                                var s = Ext.createWidget("yearmonthselectmenu", {
                                                                        target: e.ownerCt,
                                                                        dateField: t
                                                                });
                                                                s.show(),
                                                                s.setXY([Ext.Array.min([n.browserEvent.clientX, document.body.clientWidth - 200]), Ext.Array.min([n.browserEvent.clientY, document.body.clientHeight - 250])])
                                                        }
                                                } else {
                                                        var u = Ext.widget("fieldconditionwindow", {
                                                                tree: r.down("selectedfieldstree"),
                                                                treeNode: t
                                                        });
                                                        u.show(),
                                                        u.setXY([Ext.Array.min([n.browserEvent.clientX, document.body.clientWidth - 200]), Ext.Array.min([n.browserEvent.clientY, document.body.clientHeight - 250])])
                                                }
                                        } else - 1 != n.target.src.indexOf("edit.png") && Ext.MessageBox.prompt("\u5206\u7ec4\u540d\u79f0", "\u8bf7\u8f93\u5165\u5b57\u6bb5\u5206\u7ec4\u540d\u79f0",
                                        function(i, o) {
                                                "ok" == i && (t.raw.title = o, t.set({
                                                        text: o + e.ownerCt.editIcon
                                                }), t.save())
                                        },
                                        this, !1, t.raw.title)
                                },
                                dateSectionChanged: function(e, t, i) {
                                        i.raw.condition = "all" == t.sectiontype ? null: Ext.encode(t);
                                        var o = e.up("mainreport");
                                        Ext.Array.each(o.selectdGroupAndFields,
                                        function(e) {
                                                Ext.Array.each(e.fields,
                                                function(e) {
                                                        return e.fieldId == i.raw.id ? (e.condition = i.raw.condition, !1) : void 0
                                                })
                                        }),
                                        o.refreshConditionAndRecreateResult()
                                }
                        },
                        selectedfieldstree: {
                                groupandfieldschanged: function(e, t) {
                                        if ("navigatefields" == e.itemId) {
                                                if (e.up("reportnavigate").collapsed) return e.selectedGroupAndFields = t,
                                                void 0;
                                                e.selectedGroupAndFields = null
                                        }
                                        e.getRootNode().eachChild(function(e) {
                                                e.removeAll(!0)
                                        }),
                                        e.getRootNode().removeAll(!0),
                                        Ext.Array.forEach(t,
                                        function(t) {
                                                groupnode = e.getRootNode().appendChild({
                                                        title: t.groupTitle,
                                                        text: t.groupTitle + (e.canEditGroupText ? e.editIcon: ""),
                                                        leaf: !1,
                                                        expanded: !0
                                                }),
                                                Ext.Array.forEach(t.fields,
                                                function(t) {
                                                        groupnode.appendChild({
                                                                moduleName: t.moduleName,
                                                                id: "" + t.fieldId,
                                                                value: "" + t.fieldId,
                                                                cls: getTypeClass(t.fieldType),
                                                                title: t.fieldTitle,
                                                                text: t.fieldTitle + (t.condition || t.aggregate ? ' <span class="hascondition">\u273d</span>': "") + e.setIcon,
                                                                condition: t.condition,
                                                                aggregate: t.aggregate,
                                                                fieldType: t.fieldType,
                                                                leaf: !0
                                                        })
                                                })
                                        })
                                }
                        },
                        "selectedfieldstree treeview": {
                                nodedragover: function(e, t, i) {
                                        if (1 == i.records.length) {
                                                var o = i.records[0];
                                                if (o.data.leaf) {
                                                        if ("root" == e.internalId) return ! 1;
                                                        if (("before" == t || "after" == t) && e.hasChildNodes()) return ! 1
                                                } else if ("append" == t || e.data.leaf) return ! 1
                                        }
                                }
                        }
                })
        }
}),
Ext.define("Jfok.controller.report.Report", {
        extend: "Ext.app.Controller",
        views: ["Jfok.r.SelectConditionWindow", "Jfok.lib.TreeSearchField", "Jfok.r.ConditionTree", "Jfok.r.ConditionListGrid", "Jfok.r.g.ResultListGrid", "Jfok.r.widget.ConditionSelectButton", "Jfok.r.widget.BaseModuleSelectMenu", "Jfok.r.widget.YearMonthSelectMenu", "Jfok.m.w.AttachmentNumberColumn", "Jfok.m.w.AuditingActionColumn", "Jfok.m.w.PayoutActionColumn", "Jfok.m.w.ApproveActionColumn", "Jfok.lib.ToggleSlide", "Jfok.r.selectfields.SelectedFieldsTree", "Jfok.r.navigate.ConditionNavigateTree"],
        init: function() {
                this.control({
                        mainreport: {
                                reportChange: function(e, t, i) {
                                        e.setReportId(t),
                                        e.setReportText(i),
                                        e.down("button#save").disable(),
                                        e.canEditorDelete() ? e.down("button#delete").enable() : e.down("button#delete").disable(),
                                        Ext.Ajax.request({
                                                url: "report/getreportinfo.do",
                                                params: {
                                                        reportId: e.getReportId()
                                                },
                                                success: function(t) {
                                                        var i = Ext.decode(t.responseText, !0);
                                                        e.reportChange(i.allModules, i.baseModuleName, i.groups, i.isShowTotal, Ext.decode(i.groupFields, !0), i.groupShowDetail)
                                                }
                                        })
                                },
                                dateSectionChanged: function(e, t, i) {
                                        i ? e.setDateSection(t, i) : e.setBaseModuleDateSection(t)
                                }
                        },
                        "mainreport reportselectcombo": {
                                change: function(e, t) {
                                        t && e.up("mainreport").fireEvent("reportChange", e.up("mainreport"), e.getValue(), e.getRawValue())
                                }
                        },
                        "mainreport basemoduleselectmenu menuitem": {
                                click: function(e) {
                                        var t = e.up("mainreport");
                                        t.canEditorDelete() && t.down("button#save").enable(),
                                        t.setBaseModuleName(e.moduleName),
                                        t.setGroupFields([]),
                                        t.setGroupShowDetail(!1),
                                        t.refreshAll()
                                }
                        },
                        "mainreport resultlistgridtoolbar button#newGroup": {
                                click: function(e, t) {
                                        var i = e.up("toolbar"),
                                        o = i.up("mainreport"),
                                        n = Ext.createWidget("menu", {
                                                mainReport: o,
                                                items: i.getCanSelectedMenu(o.getBaseModule().groupFieldDefines, o.getGroupFields()).menu
                                        });
                                        n.show(),
                                        n.setXY([Ext.Array.min([t.browserEvent.clientX, document.body.clientWidth - 200]), Ext.Array.min([t.browserEvent.clientY, document.body.clientHeight - 250])])
                                }
                        },
                        "menuitem[groupMenuItem]": {
                                click: function(e) {
                                        var t = e.up("mainreport");
                                        null == t && (t = e.ownerCt.mainReport),
                                        t.canEditorDelete() && t.down("button#save").enable();
                                        var i = e.level;
                                        "cancelGroup" == e.itemId ? t.getGroupFields().splice(i - 1, 1) : 1 == e.addGroupLevel ? t.getGroupFields().push({
                                                moduleName: e.moduleName,
                                                fieldId: e.fieldId
                                        }) : t.getGroupFields().splice(i - 1, 1, {
                                                moduleName: e.moduleName,
                                                fieldId: e.fieldId
                                        }),
                                        t.reCreateResultGrid()
                                }
                        },
                        "mainreport toggleslide#isShowDetail": {
                                change: function(e, t) {
                                        var i = e.up("mainreport");
                                        i.canEditorDelete() && i.down("button#save").enable(),
                                        i.setGroupShowDetail(t),
                                        i.reCreateResultGrid()
                                }
                        },
                        "mainreport toggleslide#isshowtotal": {
                                change: function(e, t) {
                                        var i = e.up("mainreport").setIsShowTotal(t);
                                        i.canEditorDelete() && i.down("button#save").enable(),
                                        0 == i.getGroupFields().length && (i.down("resultlistgrid").getStore().removeAll(!0), i.down("resultlistgrid").getStore().loadPage(1))
                                }
                        },
                        "mainreport toggleslide#islivegrid": {
                                change: function(e, t) {
                                        var i = e.up("mainreport").setIsLiveGrid(t);
                                        i.reCreateResultGrid()
                                }
                        },
                        "mainreport > toolbar > button#save": {
                                click: this.saveReportDefine
                        },
                        "mainreport > toolbar > button#saveas": {
                                click: this.saveReportDefineAs
                        },
                        "mainreport > toolbar > button#delete": {
                                click: this.deleteReport
                        },
                        "mainreport > toolbar > button#selectfields": {
                                click: function(e, t) {
                                        this.getController("report.SelectFields");
                                        var i = Ext.create("Jfok.r.selectfields.SelectFieldsWindow", {
                                                mainReport: e.up("mainreport"),
                                                focusNodeId: t
                                        });
                                        i.show()
                                }
                        },
                        "button[searchConditionButton]": {
                                click: function(e) {
                                        var t = [],
                                        i = null;
                                        e.up("mainreport").down("conditionlistgrid").getStore().each(function(t) {
                                                return t.get("conditionId") == e.condition.conditionId ? (i = t, !1) : void 0
                                        }),
                                        i && (t = i.get("se_values"));
                                        var o = Ext.create("Jfok.r.SelectConditionWindow", {
                                                enterButton: e,
                                                title: e.condition.fulltext,
                                                icon: e.condition.icon,
                                                condition: e.condition,
                                                mainReport: e.up("mainreport"),
                                                selectedValues: t
                                        });
                                        o.show()
                                }
                        }
                })
        },
        saveReportDefine: function(e) {
                var t = e.up("mainreport"),
                i = t.down("reportselectcombo");
                return 0 == t.canEditorDelete() ? (Jfok.system.errorInfo("\u4f60\u65e0\u6743\u4fee\u6539\u67e5\u8be2\u65b9\u6848\u300e" + i.getRawValue() + "\u300f\u3002"), void 0) : (Ext.Ajax.request({
                        url: "report/savereport.do",
                        params: {
                                reportId: t.getReportId(),
                                selectedFields: Ext.encode(t.getSelectdGroupAndFields()),
                                isShowTotal: t.getIsShowTotal(),
                                baseModuleName: t.getBaseModuleName(),
                                groupFields: Ext.encode(t.getGroupFields()),
                                groupShowDetail: t.getGroupShowDetail()
                        },
                        success: function(t) {
                                var o = Ext.decode(t.responseText, !0);
                                o.success ? (Jfok.system.smileInfo("\u7efc\u5408\u67e5\u8be2\u65b9\u6848\u300e" + i.getRawValue() + "\u300f\u5df2\u4fdd\u5b58\u3002"), e.disable()) : Ext.MessageBox.show({
                                        title: "\u4fdd\u5b58\u5931\u8d25",
                                        msg: "\u4fdd\u5b58\u5931\u8d25<br/><br/>" + o.msg,
                                        buttons: Ext.MessageBox.OK,
                                        animateTarget: e.id,
                                        icon: Ext.MessageBox.ERROR
                                })
                        }
                }), void 0)
        },
        saveReportDefineAs: function(e) {
                var t = e.up("mainreport");
                Ext.MessageBox.prompt("\u65b0\u589e\u65b9\u6848", "\u8bf7\u8f93\u5165\u65b0\u65b9\u6848\u540d\u79f0",
                function(e, i) {
                        "ok" == e && Ext.Ajax.request({
                                url: "report/saveasreport.do",
                                params: {
                                        reportId: null,
                                        reportGroupId: t.reportGroup.reportGroupId,
                                        text: i,
                                        selectedFields: Ext.encode(t.getSelectdGroupAndFields()),
                                        baseModuleName: t.getBaseModuleName(),
                                        isShowTotal: t.getIsShowTotal(),
                                        groupFields: Ext.encode(t.getGroupFields()),
                                        groupShowDetail: t.getGroupShowDetail()
                                },
                                success: function(e) {
                                        var o = Ext.decode(e.responseText, !0),
                                        n = t.down("reportselectcombo"),
                                        a = n.store.getRootNode().findChildBy(function(e) {
                                                return "\u6211\u7684\u67e5\u8be2\u65b9\u6848" == e.data.text ? !0 : void 0
                                        },
                                        this, !0);
                                        a || (a = n.store.getRootNode().insertChild(0, {
                                                text: "\u6211\u7684\u67e5\u8be2\u65b9\u6848",
                                                value: -1,
                                                disabled: !0,
                                                expanded: !0,
                                                leaf: !1
                                        })),
                                        a.appendChild({
                                                value: o.tag,
                                                text: i,
                                                leaf: !0,
                                                tag: 1
                                        }),
                                        n.setValue(o.tag),
                                        Jfok.system.smileInfo("\u7efc\u5408\u67e5\u8be2\u65b9\u6848\u300e" + i + "\u300f\u5df2\u4fdd\u5b58\u3002")
                                }
                        })
                })
        },
        deleteReport: function(e) {
                var t = e.up("mainreport"),
                i = t.down("reportselectcombo");
                if (0 == t.canEditorDelete()) return Jfok.system.errorInfo("\u4f60\u65e0\u6743\u5220\u9664\u67e5\u8be2\u65b9\u6848\u300e" + i.getRawValue() + "\u300f\u3002"),
                void 0;
                var o = "\u7efc\u5408\u67e5\u8be2\u65b9\u6848\u300e" + i.getRawValue() + "\u300f";
                Ext.MessageBox.confirm("\u786e\u5b9a\u5220\u9664", "\u786e\u5b9a\u8981\u5220\u9664" + o + "\u5417?",
                function(n) {
                        "yes" == n && Ext.Ajax.request({
                                url: "report/deletereport.do",
                                params: {
                                        reportId: t.getReportId()
                                },
                                success: function(t) {
                                        var n = Ext.decode(t.responseText, !0);
                                        if (n.success) {
                                                Jfok.system.smileInfo(o + "\u5df2\u88ab\u5220\u9664\u3002");
                                                var a = i.store.getRootNode().findChildBy(function(e) {
                                                        return e.data.value == i.getValue() ? !0 : void 0
                                                },
                                                this, !0);
                                                a.remove(!0),
                                                a = i.store.getRootNode().findChildBy(function(e) {
                                                        return 1 == e.data.leaf ? !0 : void 0
                                                },
                                                this, !0),
                                                i.setValue(a.data.value)
                                        } else Ext.MessageBox.show({
                                                title: "\u5220\u9664\u5931\u8d25",
                                                msg: "\u5220\u9664\u5931\u8d25<br/><br/>" + n.msg,
                                                buttons: Ext.MessageBox.OK,
                                                animateTarget: e.id,
                                                icon: Ext.MessageBox.ERROR
                                        })
                                }
                        })
                })
        }
}),
Ext.define("Jfok.controller.report.ResultListGridToolbar", {
        extend: "Ext.app.Controller",
        views: [],
        init: function() {
                this.control({
                        "resultlistgridtoolbar splitbutton#printExcel": {
                                click: function(e) {
                                        this.exportExcel(e, !1, !0, "print")
                                }
                        },
                        "resultlistgridtoolbar menuitem#printexcel": {
                                click: function(e) {
                                        this.exportExcel(e, !1, !0, "print")
                                }
                        },
                        "resultlistgridtoolbar menuitem#printexcelwanyuan": {
                                click: function(e) {
                                        this.exportExcel(e, !0, !0, "print")
                                }
                        },
                        "resultlistgridtoolbar menuitem#exportexcelwanyuan": {
                                click: function(e) {
                                        this.exportExcel(e, !0, !1)
                                }
                        },
                        "resultlistgridtoolbar splitbutton#exportExcel": {
                                click: function(e) {
                                        this.exportExcel(e, !1, !1)
                                }
                        },
                        "resultlistgridtoolbar menuitem#exportexcel": {
                                click: function(e) {
                                        this.exportExcel(e, !1, !1)
                                }
                        },
                        "resultlistgridtoolbar menuitem#exportpdf": {
                                click: function(e) {
                                        this.exportExcel(e, !1, !0)
                                }
                        },
                        "resultlistgridtoolbar menuitem#exportpdfwanyuan": {
                                click: function(e) {
                                        this.exportExcel(e, !0, !0)
                                }
                        },
                        "resultlistgridtoolbar button#chart": {
                                click: function(e) {
                                        this.getController("report.Chart");
                                        var t = e.ownerCt.up("mainreport"),
                                        i = Ext.widget("reportchartwindow", {
                                                mainReport: t
                                        });
                                        i.show()
                                }
                        }
                })
        },
        exportExcel: function(e, t, i, o) {
                var n = e.ownerCt.up("mainreport"),
                a = (n.down("conditionlistgrid"), n.down("resultlistgrid")),
                l = a.getStore(),
                r = {
                        iswanyuan: t,
                        ispdf: !!i,
                        print: !!o
                },
                d = [],
                s = a.lockedGrid.getView().headerCt.items.items;
                s = s.concat(a.normalGrid.getView().headerCt.items.items),
                Ext.Array.each(s,
                function(e) {
                        e.items.length > 0 && Ext.Array.each(e.items.items,
                        function(e) {
                                e && e.isHidden() && d.push(e.dataIndex)
                        })
                }),
                r.hiddenColumns = d.join(","),
                Ext.apply(r, l.proxy.extraParams),
                l.filters.length > 0 && (r.query = l.filters.items[0].value),
                l.sorters.length > 0 && (r.sort = Ext.encode([{
                        direction: l.sorters.items[0].direction,
                        property: l.sorters.items[0].property
                }]));
                var u = Ext.String.format("report/downloadresult.do?{0}", Ext.Object.toQueryString(r));
                if (o) {
                        var c = window.open();
                        c.document.write("<html><head>"),
                        c.document.write("<title>" + n.down("reportselectcombo").getRawValue() + "\u6253\u5370</title>"),
                        c.document.write("</head><body>"),
                        c.document.write('<iframe src="' + u + '" style="width:100% ; height: 100%" frameborder="0"></iframe>'),
                        c.document.write("</body></html>"),
                        c.document.close()
                } else window.location.href = u
        }
}),
Ext.define("Jfok.controller.report.SelectFields", {
        extend: "Ext.app.Controller",
        views: ["Jfok.r.selectfields.CanSelectedFieldsTree", "Jfok.r.selectfields.SelectedFieldsTree", "Jfok.r.selectfields.FieldConditionForm", "Jfok.r.selectfields.GroupAndModulePanel"],
        init: function() {
                this.control({
                        selectfieldswindow: {
                                show: function(e) {
                                        var t = e.mainReport.getSelectdGroupAndFields(),
                                        i = e.down("selectedfieldstree");
                                        e.setTitle("\u5b57\u6bb5\u9009\u62e9\u53ca\u9644\u52a0\u6761\u4ef6\u300e" + e.mainReport.reportText + "\u300f"),
                                        i.fireEvent("groupandfieldschanged", i, t),
                                        e.refreshStatusBar(),
                                        e.focusNodeId && i.getRootNode().eachChild(function(t) {
                                                t.eachChild(function(t) {
                                                        t.raw.value == e.focusNodeId && (e.down("fieldconditionform").expand(), setTimeout(function() {
                                                                i.getSelectionModel().select(t)
                                                        },
                                                        500))
                                                })
                                        })
                                }
                        },
                        "selectfieldswindow toolbar button#saveselectedfields": {
                                click: function(e) {
                                        var t = e.up("window"),
                                        i = t.down("selectedfieldstree"),
                                        o = getGroupAndFieldsWithTree(i);
                                        return 0 == o.length ? (Jfok.system.warnInfo("\u8bf7\u81f3\u5c11\u9009\u62e9\u4e00\u4e2a\u5b57\u6bb5\uff01"), void 0) : (Ext.Ajax.request({
                                                url: "report/validselectedfields.do",
                                                params: {
                                                        fields: Ext.encode(o)
                                                },
                                                success: function(i) {
                                                        var o = Ext.decode(i.responseText, !0);
                                                        if (o.success) {
                                                                var n = t.mainReport;
                                                                n.canEditorDelete() && n.down("button#save").enable();
                                                                var a = n.getBaseModuleName(); - 1 == o.msg.allModules.indexOf(a) && (a = o.msg.baseModuleName),
                                                                n.reportChange(o.msg.allModules, a, o.msg.groups, null, [], !1),
                                                                t.close()
                                                        } else Ext.MessageBox.show({
                                                                title: "\u9009\u62e9\u9519\u8bef",
                                                                msg: o.msg,
                                                                buttons: Ext.MessageBox.OK,
                                                                animateTarget: e.id,
                                                                icon: Ext.MessageBox.ERROR
                                                        })
                                                }
                                        }), void 0)
                                }
                        },
                        "selectfieldswindow fieldconditionform field": {
                                change: function(e) {
                                        e.up("form").fieldchange()
                                }
                        },
                        "selectfieldswindow fieldconditionform tool[type=refresh]": {
                                click: function(e) {
                                        var t = e.up("form");
                                        t.getForm().reset(),
                                        t.fieldchange()
                                }
                        },
                        "selectfieldswindow toolbar button#clearfields": {
                                click: function(e) {
                                        var t = e.up("window"),
                                        i = t.down("selectedfieldstree");
                                        i.getRootNode().removeAll(!1),
                                        t.syncCanSelected();
                                        var o = t.down("canselectedfieldstree");
                                        o.getRootNode().cascadeBy(function(e) {
                                                e.set({
                                                        checked: !1
                                                })
                                        }),
                                        t.refreshStatusBar()
                                }
                        },
                        groupandmodulepanel: {
                                render: function(e) {
                                        Ext.Array.forEach(Jfok.system.groupsAndmodules,
                                        function(t) {
                                                e.add({
                                                        title: t.text,
                                                        xtype: "treepanel",
                                                        rootVisible: !1,
                                                        store: Ext.create("Ext.data.TreeStore", {
                                                                root: {
                                                                        expanded: !0,
                                                                        children: t.children
                                                                }
                                                        })
                                                })
                                        })
                                }
                        },
                        "groupandmodulepanel treepanel": {
                                selectionchange: function(e, t) {
                                        t && t.length > 0 && e.view.panel.up("window").down("canselectedfieldstree").setModuleName(t[0].raw.value)
                                }
                        },
                        "selectfieldswindow selectedfieldstree": {
                                selectionchange: function(e, t) {
                                        if (t && t.length > 0) {
                                                var i = t[0].raw.moduleName,
                                                o = e.view.panel.up("window");
                                                if (i && t[0].data.leaf) {
                                                        var n = o.down("canselectedfieldstree");
                                                        n.moduleName != i ? o.down("panel#tablegroup").anchorToModule(i) : o.syncCanSelectedFocusNode(),
                                                        o.syncConditionForm(t[0])
                                                }
                                        }
                                },
                                itemclick: function(e, t, i, o, n) {
                                        "img" == n.target.localName && -1 != n.target.src.indexOf("edit.png") && Ext.MessageBox.prompt("\u5206\u7ec4\u540d\u79f0", "\u8bf7\u8f93\u5165\u5b57\u6bb5\u5206\u7ec4\u540d\u79f0",
                                        function(i, o) {
                                                "ok" == i && (t.raw.title = o, t.set({
                                                        text: o + (e.ownerCt.canEditGroupText ? e.ownerCt.editIcon: "")
                                                }), t.save())
                                        },
                                        this, !1, t.raw.title)
                                },
                                itemdblclick: function(e, t) {
                                        if (null != t.parentNode && t.hasChildNodes());
                                        else if (t.data.leaf) {
                                                var i = e.up("window").down("fieldconditionform");
                                                i.collapsed ? i.expand() : i.collapse()
                                        }
                                }
                        },
                        canselectedfieldstree: {
                                checkchange: function(e, t) {
                                        setChildChecked(e, t),
                                        setParentChecked(e, t),
                                        e.getOwnerTree().up("window").syncSelected()
                                },
                                load: function(e) {
                                        var t = e.ownerTree;
                                        t.expandAll(),
                                        t.up("window").syncCanSelected()
                                }
                        }
                })
        }
}),
Ext.Ajax.on("requestcomplete",
function(e, t) {
        if (t.getResponseHeader) {
                var i = t.getResponseHeader("sessionstatus");
                "undefined" != typeof i && Ext.MessageBox.show({
                        title: "\u670d\u52a1\u5668\u8d85\u65f6",
                        msg: "\u670d\u52a1\u5668\u767b\u5f55\u8d85\u65f6\uff0c\u60a8\u9700\u8981\u91cd\u65b0\u767b\u5f55\u7cfb\u7edf\u3002",
                        buttons: Ext.MessageBox.OK,
                        width: 250,
                        icon: Ext.MessageBox.WARNING,
                        fn: function() {
                                var e = "login.jsp";
                                window.location = e
                        }
                })
        }
}),
Ext.Ajax.on("requestexception",
function() {});
var alertFallback = !1; ("undefined" == typeof console || "undefined" == typeof console.log) && (console = {},
console.log = alertFallback ?
function(e) {
        alert(e)
}: function() {}),
Ext.namespace("Jfok"),
Ext.Loader.setPath("Ext.ux", "extjs4/ux"),
Ext.QuickTips.init(),
delete Ext.tip.Tip.prototype.minWidth,
Ext.application({
        name: "Jfok",
        appFolder: "js",
        controllers: ["TopRegion", "BottomRegion", "MainRegion", "MenuRegion", "Module", "ModuleForm", "ModuleToolbar", "ModuleAdditionFunction", "GridNavigate", "GridNavigateTree", "Attachment", "Auditing", "Approve", "HomePagePanel", "Chart", "report.Report", "report.DateSectionSelect", "report.NavigateSelectFieldsTree", "Jfok.controller.report.ResultListGridToolbar"],
        launch: function() {
                var e, t = this;
                Ext.themeName = Cookies.get("theme", "neptune"),
                Ext.Ajax.request({
                        url: "systemandlogininfo.do",
                        async: !1,
                        success: function(t) {
                                e = Ext.decode(t.responseText)
                        }
                }),
                Jfok.modules = Ext.create("Jfok.system.Modules", e),
                Jfok.system = Ext.create("Jfok.system.System", e),
                Jfok.system.setViewport(Ext.create("Jfok.view.region.Viewport")),
                Jfok.mainRegion = t.getApplication().getController("MainRegion"),
                Ext.each(Jfok.system.getAutoOpenModules(),
                function(e) {
                        Jfok.mainRegion.addModuleToMainRegion(e)
                }),
                Jfok.system.viewport.down("mainregion").setActiveTab(0),
                setTimeout(function() {
                        Ext.get("loading").remove()
                },
                100)
        }
}),
document.onkeypress = forbidBackSpace,
document.onkeydown = forbidBackSpace,
Ext.define("ExtThemeNeptune.Component", {
        override: "Ext.Component",
        initComponent: function() {
                this.callParent(),
                this.dock && void 0 === this.border && (this.border = !1)
        },
        initStyles: function() {
                var e = this,
                t = e.border;
                e.dock && (e.border = null),
                e.callParent(arguments),
                e.border = t
        }
}),
Ext.define("ExtThemeNeptune.panel.Panel", {
        override: "Ext.panel.Panel",
        border: !1,
        bodyBorder: !1,
        initBorderProps: Ext.emptyFn,
        initBodyBorder: function() {
                this.bodyBorder !== !0 && this.callParent()
        }
}),
Ext.define("ExtThemeNeptune.layout.component.Dock", {
        override: "Ext.layout.component.Dock",
        noBorderClassTable: [0, Ext.baseCSSPrefix + "noborder-l", Ext.baseCSSPrefix + "noborder-b", Ext.baseCSSPrefix + "noborder-bl", Ext.baseCSSPrefix + "noborder-r", Ext.baseCSSPrefix + "noborder-rl", Ext.baseCSSPrefix + "noborder-rb", Ext.baseCSSPrefix + "noborder-rbl", Ext.baseCSSPrefix + "noborder-t", Ext.baseCSSPrefix + "noborder-tl", Ext.baseCSSPrefix + "noborder-tb", Ext.baseCSSPrefix + "noborder-tbl", Ext.baseCSSPrefix + "noborder-tr", Ext.baseCSSPrefix + "noborder-trl", Ext.baseCSSPrefix + "noborder-trb", Ext.baseCSSPrefix + "noborder-trbl"],
        edgeMasks: {
                top: 8,
                right: 4,
                bottom: 2,
                left: 1
        },
        handleItemBorders: function() {
                var e, t, i, o, n, a, l, r, d, s, u, c, m = this,
                f = 0,
                h = 8,
                p = 4,
                g = 2,
                x = 1,
                v = m.owner,
                y = v.bodyBorder,
                b = v.border,
                w = m.collapsed,
                E = m.edgeMasks,
                k = m.noBorderClassTable,
                _ = v.dockedItems.generation;
                if (m.initializedBorders !== _) {
                        for (u = [], c = [], t = m.getBorderCollapseTable(), k = m.getBorderClassTable ? m.getBorderClassTable() : k, m.initializedBorders = _, m.collapsed = !1, i = m.getDockedItems(), m.collapsed = w, n = 0, a = i.length; a > n; n++) l = i[n],
                        l.ignoreBorderManagement || (r = l.dock, s = o = 0, u.length = 0, c.length = 0, "bottom" !== r && (f & h ? e = l.border: (e = b, e !== !1 && (o += h)), e === !1 && (s += h)), "left" !== r && (f & p ? e = l.border: (e = b, e !== !1 && (o += p)), e === !1 && (s += p)), "top" !== r && (f & g ? e = l.border: (e = b, e !== !1 && (o += g)), e === !1 && (s += g)), "right" !== r && (f & x ? e = l.border: (e = b, e !== !1 && (o += x)), e === !1 && (s += x)), (d = l.lastBorderMask) !== s && (l.lastBorderMask = s, d && (c[0] = k[d]), s && (u[0] = k[s])), (d = l.lastBorderCollapse) !== o && (l.lastBorderCollapse = o, d && (c[c.length] = t[d]), o && (u[u.length] = t[o])), c.length && l.removeCls(c), u.length && l.addCls(u), f |= E[r]);
                        s = o = 0,
                        u.length = 0,
                        c.length = 0,
                        f & h ? e = y: (e = b, e !== !1 && (o += h)),
                        e === !1 && (s += h),
                        f & p ? e = y: (e = b, e !== !1 && (o += p)),
                        e === !1 && (s += p),
                        f & g ? e = y: (e = b, e !== !1 && (o += g)),
                        e === !1 && (s += g),
                        f & x ? e = y: (e = b, e !== !1 && (o += x)),
                        e === !1 && (s += x),
                        (d = m.lastBodyBorderMask) !== s && (m.lastBodyBorderMask = s, d && (c[0] = k[d]), s && (u[0] = k[s])),
                        (d = m.lastBodyBorderCollapse) !== o && (m.lastBodyBorderCollapse = o, d && (c[c.length] = t[d]), o && (u[u.length] = t[o])),
                        c.length && v.removeBodyCls(c),
                        u.length && v.addBodyCls(u)
                }
        },
        onRemove: function(e) {
                var t = e.lastBorderMask;
                e.isDestroyed || e.ignoreBorderManagement || !t || (e.lastBorderMask = 0, e.removeCls(this.noBorderClassTable[t])),
                this.callParent([e])
        }
}),
Ext.define("ExtThemeNeptune.toolbar.Toolbar", {
        override: "Ext.toolbar.Toolbar",
        usePlainButtons: !1,
        border: !1
}),
Ext.define("ExtThemeNeptune.container.ButtonGroup", {
        override: "Ext.container.ButtonGroup",
        usePlainButtons: !1
}),
Ext.define("ExtThemeNeptune.toolbar.Paging", {
        override: "Ext.toolbar.Paging",
        defaultButtonUI: "plain-toolbar",
        inputItemWidth: 40
}),
Ext.define("ExtThemeNeptune.picker.Month", {
        override: "Ext.picker.Month",
        measureMaxHeight: 36
}),
Ext.define("ExtThemeNeptune.form.field.HtmlEditor", {
        override: "Ext.form.field.HtmlEditor",
        defaultButtonUI: "plain-toolbar"
}),
Ext.define("ExtThemeNeptune.panel.Table", {
        override: "Ext.panel.Table",
        bodyBorder: !0
}),
Ext.define("ExtThemeNeptune.grid.RowEditor", {
        override: "Ext.grid.RowEditor",
        buttonUI: "default-toolbar"
}),
Ext.define("ExtThemeNeptune.grid.column.RowNumberer", {
        override: "Ext.grid.column.RowNumberer",
        width: 25
}),
Ext.define("ExtThemeNeptune.resizer.Splitter", {
        override: "Ext.resizer.Splitter",
        size: 8
}),
Ext.define("ExtThemeNeptune.menu.Menu", {
        override: "Ext.menu.Menu",
        showSeparator: !1
}),
Ext.define("ExtThemeNeptune.menu.Separator", {
        override: "Ext.menu.Separator",
        border: !0
}),
Ext.define("ExtThemeNeptune.panel.Tool", {
        override: "Ext.panel.Tool",
        height: 16,
        width: 16
}),
Ext.define("ExtThemeNeptune.tab.Tab", {
        override: "Ext.tab.Tab",
        border: !1
});