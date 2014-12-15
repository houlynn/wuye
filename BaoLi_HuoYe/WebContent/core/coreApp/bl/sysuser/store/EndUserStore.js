Ext.define("core.bl.sysuser.store.EndUserStore", {
	extend : "Ext.data.Store",
	model : factory.ModelFactory.getModelByName(
			"com.model.hibernate.system.shared.EndUser", "").modelName,
	proxy : {
		type : "ajax",
		url : "/bl/sysuser/load.action",
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