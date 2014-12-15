Ext.define("core.sys.menu.store.MenuStore",{
	extend:"Ext.data.TreeStore",
	defaultRootId:"ROOT",
	model:factory.ModelFactory.getModelByName("com.ufo.framework.system.model.ui.JSONTreeNode","checked").modelName,
	proxy:{
		type:"ajax",
		url:"/pcMenu/getTree.action",
		extraParams :{excludes: 'checked'},
		reader:{
			type:"json"
		},
		writer:{
			type:"json"
		}
	},
	autoLoad:true
 });