Ext.define("core.bl.rbacDept.store.DepartmentStore", {
	extend : "Ext.data.Store",
	model : factory.ModelFactory.getModelByName(
			"com.model.hibernate.system.shared.Department", "").modelName,
	proxy : {
		type : "ajax",
		url : "/rbacDept/load.action",
		extraParams :{whereSql: " and deptId!='ROOT' " },
		actionMethods : {
			create : "POST",
			read : "GET",
			update : "POST",
			destroy : "POST"
		},
		reader : {
			type : "json",
			root : "rows",
			totalProperty : 'totalCount'
		},
		writer : {
			type : "json"
		}
	},
	autoLoad : true
});