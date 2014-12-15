     columnsAutoSize: function() {
                this.getColumnAutoFited() || (this.setColumnAutoFited(!0), Ext.suspendLayouts(), Ext.Array.forEach(this.lockedGrid.getView().headerCt.items.items,
                function(e) {
                        e.resizeDisabled || e.autoSize()
                }), Ext.Array.forEach(this.normalGrid.getView().headerCt.items.items,
                function(e) {
                        e.autoSize()
                }), Ext.resumeLayouts(!0))
        },
        
        
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
    
 // 根据字段类型取得该字段显示的颜色，一目了然
    function getTypeClass(fieldType) {
    	return fieldType == 'Date' ? 'datecolor' : (fieldType == 'Boolean'
    			? 'booleancolor'
    			: (fieldType == 'Double' || fieldType == 'Integer'
    					|| fieldType == 'Float' || fieldType == 'Percent'
    					? 'numbercolor'
    					: null))
    },
        
     // 给grid 中选中的筛选条件的记录的筛选部分换一下颜色
        function filterTextSetBk(store, text) {
        	if (!store)
        		return text;
        	var s = store;
        	if (store.store)
        		s = store.store;
        	if (s.filters.items.length > 0)
        		return text.replace(new RegExp(s.filters.items[0].value, 'gm'),
        				'<span class="filtertext">' + s.filters.items[0].value + '</span>');
        	else
        		return text;
        };
    
    
    
