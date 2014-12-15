Ext.define("core.store.purchase.store.PurchaseItemStore", {
	extend : "Ext.data.Store",
	model : factory.ModelFactory.getModelByName(
			"org.yingqu.Purchase.model.PurchaseItemVO", "").modelName,
	proxy : {
		type : "ajax",
		url : "/store/purchaseItem/load.action",
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