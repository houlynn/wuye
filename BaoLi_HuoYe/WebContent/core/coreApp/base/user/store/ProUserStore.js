Ext.define("core.base.resident.store.SettingStore",{
	 	extend : 'Ext.data.Store',
	  	 model:"core.base.resident.model.SettingModel",
	  	 proxy : {
					type : 'rest',
					batchActions : true,
					 api:{
						read : 'rest/module/fetchdata.do',
						update : 'rest/module/update.do',
						create : 'rest/module/create.do',
						destroy : 'rest/module/remove.do'
			         },
					actionMethods : {
						create : 'POST',
						read : 'GET',
						update : 'PUT',
						destroy : 'DELETE'
					},
					reader : {
						type : 'json',
						root : 'records',
						totalProperty : 'totalCount'
					},
					writer : {
						type : 'json',
						writeRecordId : true,
						writeAllFields : false
					},
		
					listeners : {
						exception : function(proxy, response, operation) {
							var  errorInfo = Ext.decode(response.responseText, true);
							  proxy.errorInfo=errorInfo;
							  system.errorAlertInfo(errorInfo.error);
						}
					}
				}
	  });