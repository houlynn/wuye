Ext.define('core.base.101.model.PropertyModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'tf_address',  type: 'string',sortable : true},
        {name: 'tf_contact',   type: 'string',sortable : true},
        {name: 'tf_name',   type: 'string',sortable : true},
        {name: 'tf_proid',  type: 'int',sortable : true},
        {name: 'tf_phone',   type: 'string',sortable : true}
    ],
	idProperty : "tf_proid",//主键
	nameFields :"tf_name",//唯一标示
	titleTpl : "<h1>tf_name</h1>",//标题模板
	titleTemplate : null,
    proxy : {
		type : 'rest',
		batchActions : true,
		 extraParams : {
			moduleName : "PropertyCompany"
		},
		api : {
			// 在这里加rest/是因为在web.xml中
			// <url-pattern>/rest/*</url-pattern>这一句，spring会根据rest
			// 后面的参数去进行匹配
			read : '/base/101/load.action',
			update : 'rest/module/update.do',
			create : 'rest/module/create.do',
			destroy : '/base/101/doRemove.action'
		},
		actionMethods : {
			create : 'POST',
			read : 'GET',
			update : 'PUT',
			destroy : 'DELETE'
		},
		reader : {
			type : 'json',
			root : "rows",
			totalProperty : 'totalCount'
		},
		writer : {
			type : 'json',
			writeRecordId : true,
			writeAllFields : false
			// 没有修改过的字段不加入到update和delete的json中去
		},

		listeners : {
			exception : function(proxy, response, operation) {
				// 将出错信息加到proxy中去，传递到store的sync中显示出错信息，显示后将此属性删除
				proxy.errorInfo = Ext.decode(response.responseText, true);
				// 如果出错信息解析出错，则加入一个缺省的
				if (!proxy.errorInfo)
					proxy.errorInfo = {
						resultCode : -1,
						errorMessage : '未知原因:' + response.responseText
					}
			}
		}
	},
	
});
