Ext.define("core.rbac.role.view.ModuleTree",{
	extend:"Ext.tree.Panel",
	alias : "widget.role.moduletree",
	displayField : "text",
	rootVisible : false,
	border : false,
	store : "core.rbac.role.store.ModuleStore",
	title:"授权管理",
	rbar:[{
			xtype : 'button',
			tooltip : '授权',
				border : false,
			glyph : 0xf1c3,
			iconCls : 'tree_set_perm',
			ref : 'setPerm'
		}, {
			xtype : 'button',
			tooltip : '查看权限',
				border : false,
			glyph : 0xf019,
			iconCls : 'tree_see_perm',
			ref : 'seePerm'
		}]
})