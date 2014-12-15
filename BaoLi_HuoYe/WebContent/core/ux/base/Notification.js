Ext.define("baseUx.Notification", {
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
});