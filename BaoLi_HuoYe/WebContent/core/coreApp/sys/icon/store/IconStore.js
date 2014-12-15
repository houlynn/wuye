 Ext.define("core.sys.icon.store.IconStore",{
	extend:"Ext.data.Store",
	model:factory.ModelFactory.getModelByName("com.model.hibernate.system.shared.SysIcon","").modelName,
	proxy:{
		type:"ajax",		
		url:"/coreIcon/load.action",
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
