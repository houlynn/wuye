Ext.define("core.store.ohertStore.store.OhertStoreStore", {
	extend : "Ext.data.Store",
	model : factory.ModelFactory.getModelByName(
			"org.yingqu.Purchase.model.OhertStoreVO", "").modelName,
	proxy : {
		type : "ajax",
		url : "/store/ohertStore/load.action",
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