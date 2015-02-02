Ext.define("core.base.user.model.ProUserModel", {
		extend : 'Ext.data.Model',
		  idProperty : "id",//主键
	    fields:factory.ModelFactory.getFields({modelName:"com.property.base.vo.ProUserInfo",excludes:""}),
		proxy : {
					type : 'rest',
					batchActions : true,
				    isSynchronous: true,
					api : {
					  read : 'rbacUser/fetchdata.action',
						//update : 'rbacUser/updateuser.action',
						create : 'rbacUser/create.action',
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