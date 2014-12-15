Ext.define("core.store.ohertStore.view.OhertStorePanel",{
	extend:"core.app.base.BasePanel",
	alias:"widget.store.ohertStorePanel",
	funCode:"ohertStore_main",
	funData:{
	        action:"/store/ohertStore", //请求Action
	        whereSql:"",//表格查询条件
	        orderSql:"operatingTime",//表格排序条件
	        pkName:"osId",
	        modelName:"org.yingqu.Purchase.model.OhertStore",//实体全路径
	        tableName:"OhertStore",//表名
	        defaultObj:{enabled:"1"}//默认信息，用于表格添加的时候字段默认值
	},
		items:[{
			xtype:"store.ohertStoreGrid",
			region:"center"
	}]
});
