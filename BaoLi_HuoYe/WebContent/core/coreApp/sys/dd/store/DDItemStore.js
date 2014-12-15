 Ext.define("core.sys.dd.store.DDItemStore",{
	extend:"Ext.data.Store",
	model:factory.ModelFactory.getModelByName("com.model.hibernate.system.shared.DictionaryItem","").modelName,
	proxy:{
		type:"ajax",		
		url:"/coreDDeItem/load.action",
		extraParams:{
			orderSql:" order by orderIndex"
		},
		reader:{
			type:"json",
			root:"rows",
			totalProperty :'totalCount'
		},
		writer:{
			type:"json"
		}
	},
	autoLoad:true
 });