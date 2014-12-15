Ext.define("core.${dist}.store.${className}Store", {
	extend : "Ext.data.Store",
	model : factory.ModelFactory.getModelByName(
			"${classFullName}", "").modelName,
	proxy : {
		type : "ajax",
		url : "${namespace}/load.action",
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