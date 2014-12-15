Ext.define("core.bl.adt.store.AvvertiseImageUrlStore", {
	extend : "Ext.data.Store",
	model : factory.ModelFactory.getModelByName(
			"org.yingqu.baoli.model.AvvertiseImageUrl", "").modelName,
	proxy : {
		type : "ajax",
		url : "/bl/adtimge/load.action",
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