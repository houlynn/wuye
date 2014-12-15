Ext.define("core.bl.adt.view.AvvertiseImageUrlPanel", {
	extend : "core.app.base.BasePanel",
	alias : "widget.bl.avvertiseImageUrlPanel",
	funCode : "avvertiseImageUrl_main",
	funData : {
		action : "/bl/adtimge", // 请求Action
		whereSql : "",// 表格查询条件
		orderSql : "operatingTime",// 表格排序条件
		pkName : "id",
		modelName : "org.yingqu.baoli.model.AvvertiseImageUrl",// 实体全路径
		tableName : "AvvertiseImageUrl",// 表名
		defaultObj : {
			enabled : "1"
		},// 默认信息，用于表格添加的时候字段默认值
		isChildren : true,// 是否子功能
		parentCode : "advertisement_main",// 主功能功能编码
		connectFields : [ {// 关联字段
			mainFieldCode : "adverid",// 主功能字段名
			childFieldCode : "adverid",// 子功能字段名
			foreignKey : "foreignKey",// 外键虚字段
			isQuery : true
		} ]
	},
	items : {
		xtype : "bl.avvertiseImageUrlGrid",
		region : "center"
	}
});
