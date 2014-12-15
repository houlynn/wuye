Ext.define("core.store.purchase.store.PurchaseContentStore", {
	extend : "Ext.data.Store",
	model : factory.ModelFactory.getModelByName(
			"org.yingqu.Purchase.model.PurchaseContentVO", "").modelName,
	proxy : {
		type : "ajax",
		url : "/store/purchase/load.action",
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