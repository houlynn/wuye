Ext.define("core.base.101.store.PropertyCompanyStore", {
	extend : "Ext.data.Store",
	model:'core.base.101.model.PropertyModel',
	
/*	model : factory.ModelFactory.getModelByName(
			"com.model.hibernate.property.PropertyCompany", "").modelName,*/
	
			
		
/*proxy : {
		type : "ajax",
		url : "/base/101/load.action",
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
	},*/
	autoLoad : true
});