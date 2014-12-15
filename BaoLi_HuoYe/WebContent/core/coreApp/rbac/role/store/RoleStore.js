Ext.define("core.rbac.role.store.RoleStore",{
	extend:"Ext.data.TreeStore",
	defaultRootId:"ROOT",
	model:factory.ModelFactory.getModelByName("com.ufo.framework.system.model.ui.JSONTreeNode","checked").modelName,
	proxy:{
		type:"ajax",
		url:"/rbacRole/getTree.action",
		extraParams :{excludes: 'checked',whereSql:" and 1=1",orderSql:" order by orderIndex"},
		reader:{
			type:"json"
		},
		writer:{
			type:"json"
		}
	},
	autoLoad:true
 });