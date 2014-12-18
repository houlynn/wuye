Ext.define("core.base.resident.store.UnitStore",{
	extend : "Ext.data.Store",
	model : factory.ModelFactory.getModelByName(
			"com.property.base.vo.UnitViewInfo", "").modelName,
   sortInfo: {
            field    : 'number',
            direction: 'ASC'
        },	
    navigates:[],   
	proxy : {
		type : "ajax",
		url : "/unite/load.action",
		actionMethods : {
			create : "POST",
			read : "GET",
			update : "POST",
			destroy : "POST"
		},
		reader : {
			type : "json",
			root : "records",
			totalProperty : 'totalCount'
		},
		writer : {
			type : "json"
		}
	},
	autoLoad : false
});