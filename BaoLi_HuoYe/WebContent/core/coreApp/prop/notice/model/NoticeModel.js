Ext.define("core.prop.notice.model.NoticeModel", {
		extend : 'Ext.data.Model',
		  idProperty : "tf_noticeId",//主键
	    fields:factory.ModelFactory.getFields({modelName:"com.model.hibernate.property.NoticeInfo",excludes:""}),
		proxy : {
					type : 'rest',
					batchActions : true,
				    isSynchronous: true,
					api : {
					    read : 'vi/loadNotice.action',
						update : 'vid/updateNotice.action',
						create : 'vi/createNotice.action',
						destroy : 'vi/removeNotice.action'
					
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