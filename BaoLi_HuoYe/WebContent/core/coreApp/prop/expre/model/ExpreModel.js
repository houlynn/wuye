Ext.define("core.prop.expre.model.ExpreModel", {
		extend : 'Ext.data.Model',
		  idProperty : "tf_exprid",//主键
	    fields:factory.ModelFactory.getFields({modelName:"com.model.hibernate.property.ExpressInfo",excludes:""}),
		proxy : {
					type : 'rest',
					batchActions : true,
				    isSynchronous: true,
					api : {
					    read : 'vi/loadexpre.action',
					
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
							   var resutlCode=errorInfo.errorInfo.resultCode;
							    switch(resutlCode){
							    case 300:{
							    	system.warnInfo(errorInfo.errorInfo.errorMessage.error,"警告");
							    	break;
							    }
							    default:{
							    	  system.errorAlertInfo(errorInfo.errorInfo.errorMessage.error,"错误提示");
							    }
							    }
							 
						}
					}
				},

	  
});