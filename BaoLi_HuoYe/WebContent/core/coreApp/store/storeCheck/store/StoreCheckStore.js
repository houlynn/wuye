Ext.define("core.store.storeCheck.store.StoreCheckStore", {
	extend : "Ext.data.Store",
	model : factory.ModelFactory.getModelByName(
			"org.yingqu.Purchase.model.StoreCheckVO", "").modelName,
	proxy : {
		type : "ajax",
		url : "/store/storeCheck/load.action",
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