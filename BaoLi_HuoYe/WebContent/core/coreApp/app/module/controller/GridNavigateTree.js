Ext.define('core.app.module.controller.ModueController',{
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
	
	
	
	
	
	
	
	
	
	
	
	
	
});