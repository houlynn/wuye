		Ext.Ajax.on('requestcomplete',
				function(conn, response, options) {
					if (response.getResponseHeader) {
						var sessionStatus = response
								.getResponseHeader("sessionstatus");
						if (typeof (sessionStatus) != "undefined") {
							Ext.MessageBox.show({
								title : '服务器超时',
								msg : '服务器登录超时，您需要重新登录系统。',
								buttons : Ext.MessageBox.OK,
								width : 250,
								icon : Ext.MessageBox.WARNING,
								fn : function() {
									var redirect = 'login.jsp';
									window.location = redirect
								}
							})
						}
					}
				});
Ext.setGlyphFontFamily('FontAwesome'); // 设置图标字体文件，只有设置了以后才能用glyph属性		
//开启动态加载
Ext.Loader.setConfig({
	enabled : true
});

Ext.Loader.setPath({
	'Ext.ux' : 'extjs/ux',
	'Ext.app' : 'extjs/app'
});

/**静态变量声明*/
 var comm = Ext.create("Ext.util.MixedCollection");
 
var errors = Ext.create("Ext.util.MixedCollection");
 /**声明主控制器*/
 var coreApp=null;
 /**持久化登录用户信息*/
 Ext.Ajax.request({
 	url:"/rbacUser/getCurrentUser.action",
 	method:"POST",
	async:false,
	timeout:4000,
	success:function(response){
		data = Ext.decode(Ext.value(response.responseText,'{}'));
		if(data.success){
			comm.add("currentUser",data.obj);
		}
	}
 });
 /**表单必填项样式*/
 comm.add('required','<span style="color:red;font-weight:bold" data-qtip="必填项">*</span>');
 
var ajax = function(config) { 
		Ext.Ajax.request({
					url : config.url, 
					params : config.params, 
					method : 'post',
					callback : function(options, success, response) {
						config.callback(Ext.JSON.decode(response.responseText));
					}
				});
		return false;
	};
	
	/**
	 * 这里存放了Grid的列renderer的各种自定义的方法
	 */

	Ext.onReady(function() {
		Ext.monetaryText = '千'; // 加在数字后面的金额单位
		Ext.monetaryUnit = 1000;
		if (Ext.util && Ext.util.Format) {
			Ext.apply(Ext.util.Format, {
				// 金额字段
				monetaryRenderer : function(val) {
					if (val) {
						if (Ext.monetaryUnit && Ext.monetaryUnit != 1)
							val = val / Ext.monetaryUnit;
						// 正数用蓝色显示，负数用红色显示
						return '<span style="color:' + (val > 0 ? 'blue' : 'red')
								+ ';float:right;">' + Ext.util.Format.number(val, '0,000.00')
								+ Ext.monetaryText + '</span>';
					} else
						return ''; // 如果为0,则不显示
				},

				// 日期
				dateRenderer : function(val) {
					return '<span style="color:#a40;">'
							+ Ext.util.Format.date(val, 'Y-m-d') + '</span>';
				},

				// 整型变量
				floatRenderer : function(val, rd, model, row, col, store, gridview) {
					return '<span style="color:' + (val > 0 ? 'blue' : 'red')
							+ ';float:right;">' + (val == 0 ? '' : val) + '</span>';
				},

				// 整型变量
				intRenderer : function(val, rd, model, row, col, store, gridview) {
					return '<span style="color:' + (val > 0 ? 'blue' : 'red')
							+ ';float:right;">' + (val == 0 ? '' : val) + '</span>';
				},

				// 百分比
				percentRenderer : function(v, rd, model) {
					v = v * 100;
					var v1 = v > 100 ? 100 : v;
					v1 = v1 < 0 ? 0 : v1;
					var v2 = parseInt(v1 * 2.55).toString(16);
					if (v2.length == 1)
						v2 = '0' + v2;
					return Ext.String
							.format(
									'<div>'
											+ '<div style="float:left;border:1px solid #008000;height:15px;width:100%;">'
											+ '<div style="float:left;text-align:center;width:100%;color:blue;">{0}%</div>'
											+ '<div style="background: #FAB2{2};width:{1}%;height:13px;"></div>'
											+ '</div></div>', v, v1, v2);
				},

				// 对模块的namefields字段加粗显示
				nameFieldRenderer : function(val, rd, model, row, col, store, gridview) {
					return ('<strong>' + val + '</strong>');
				},
				  manytoOneFieldRenderer: function(e, t, i, o, n, a, l) {
		                var r = e;
		                try {
		                        r = '<span class="gridNameField"><a onclick="javascript:return false;" href="#">' + filterTextSetBk(a, e) + "</a></span>"
		                } catch(u) {}
		                return r
		        }

			})
		};
	});

	
	
	Ext.define("app.system.System", {
        constructor: function(e) {
               this.pageSize = parseInt(Cookies.get("pagesize", "20"));
                Ext.apply(this, e);
               // this.tf_previewExts = this.tf_previewExts.split(",")
        },
        getViewport: function() {
                return this.viewport;
        },
        setViewport: function(e) {
                this.viewport = e;
        },
        getMaxTab: function() {
                var e = Cookies.get("maxtab", 8);
                return parseInt(e);
        },
        setMaxTab: function(e) {
                Cookies.set("maxtab", "" + e);
        },
        getAutoOpenModules: function() {
                var e = Cookies.get("autoopen", "");
                return e.length > 1 ? e.split(";") : [];
        },
        isModuleAutoOpen: function(e) {
                var t = Cookies.get("autoopen", "");
                i = t ? t.split(";") : [];
                o = !1;
                return Ext.each(i,  function(t) {
                        t == e && (o = !0)
                })
        },
        addModuleToAutoOpen: function(e) {
                var t = Cookies.get("autoopen", "");
                i = t ? t.split(";") : [];
                o = !1;
                Ext.each(i,
                function(t) {    t == e && (o = !0) }),
                o || (i.push(e), Cookies.set("autoopen", i.join(";")));
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
                Ext.createWidget("uxNotification", {
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
                Ext.createWidget("uxNotification", {
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
                Ext.createWidget("uxNotification", {
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
        errorAlertInfo:function(e,t){
    		Ext.MessageBox.show({
    		    title: t ? t: "\u9519\u8bef\u63d0\u793a",
    			msg : e,
    			buttons : Ext.MessageBox.OK,
    			icon : Ext.MessageBox.ERROR
    		});
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
        },
        getViewModel:function (modueId){
        	 var module=system.getModuleDefine(modueId);
        	 viewModel =Ext.create("core.app.module.ModuleModel");
 			 Ext.apply(viewModel.data, module);
 			 return viewModel;
        }
        
        
        
        
        
});
	
	Ext.define('core.app.main.MainModel', {
	    extend: 'Ext.container.Container',
	    alias:"widget.mainViewModel",
		initComponent : function() {
			Ext.log('module constructor');
			Ext.log('MainModel constructor');
			var me = this;
			// 这一句是关键，如果没有的话，this还没有初始化完成,下面的Ext.apply(me.data,....)这句就会出错
			this.callParent(arguments);
			// 同步调用取得系统参数
			Ext.Ajax.request({
						url : 'applicationinfo.do',
						async : false, // 同步
						success : function(response) {
							var text = response.responseText;
							// 将字段串转换成本地变量
							var applicationInfo = Ext.decode(text, true);
							// 把从后台传过来的参数加入到data中去
							Ext.apply(me.data, applicationInfo);
						}
					});
			comm.add("viewModel",this);
		},
		data : {
			name : 'app',
			// 系统信息
			system : {
				name : '',
				version : '5.2014.06.60',
				iconUrl : ''
			},
			// 用户单位信息和用户信息
			user : {
				company : '',
				department : '',
				name : ''
			},
			// 服务单位和服务人员信息
			service : {
				company : '',
				name : '',
				phonenumber : '',
				qq : '',
				email : '',
				copyright : ''
			},
			menuType : {
				value : 'toolbar'
			}, // 菜单的位置，'button' , 'toolbar' , 'tree'
			// 系统菜单的定义，这个菜单可以是从后台通过ajax传过来的
			systemMenu : [{
						text : '工程管理', // 菜单项的名称
						icon : '', // 菜单顶的图标地址
						glyph : 0,// 菜单项的图标字体的数值
						expanded : true, // 在树形菜单中是否展开
						description : '', // 菜单项的描述
						items : [{
							text : '工程项目', // 菜单条的名称
							module : 'Global', // 对应模块的名称
							icon : '', // 菜单条的图标地址
							glyph : 0xf0f7
								// 菜单条的图标字体
							}, {
							text : '工程标段',
							module : 'Project',
							icon : '',
							glyph : 0xf02e
						}]

					}, {
						text : '合同管理',
						expanded : true,
						items : [{
									text : '项目合同',
									module : 'Agreement',
									glyph : 0xf02d
								}, {
									text : '合同付款计划',
									module : 'AgreementPlan',
									glyph : 0xf03a
								}, {
									text : '合同请款单',
									module : 'Payment',
									glyph : 0xf022
								}, {
									text : '合同付款单',
									module : 'Payout',
									glyph : 0xf0d6
								}, {
									text : '合同发票',
									module : 'Invoice',
									glyph : 0xf0a0
								}]
					}, {
						text : '综合查询',
						glyph : 0xf0ce,
						expanded : true,
						items : [{
									text : '项目合同台帐',
									module : 'Agreement',
									glyph : 0xf02d
								}, {
									text : '合同付款计划台帐',
									module : 'AgreementPlan',
									glyph : 0xf03a
								}, {
									text : '合同请款单台帐',
									module : 'Payment',
									glyph : 0xf022
								}, {
									text : '合同付款单台帐',
									module : 'Payout',
									glyph : 0xf0d6
								}, {
									text : '合同发票台帐',
									module : 'Invoice',
									glyph : 0xf0a0
								}]
					}]
		},
		getModuleDefine : function(moduleId) {
			var result = null;
			Ext.Array.each(this.get("tf_Modules"), function(module) {
						if (module.tf_moduleId == moduleId + ''
								|| module.tf_moduleName == moduleId) {
							result = module;
							return false;
						}
					})
			return result;
		},
		get:function(key){
			return this.data[key];
			
		}
	});
	
 system=Ext.create("app.system.System",Ext.createWidget("mainViewModel"));
 

	
	
	
	
	
	
	
	
	
	