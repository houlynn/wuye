Ext.define("core.util.SuppleUtil",{
	/**
	 * 同步请求Ajax
	 * @param {} config
	 * @return {}
	 */
	ajax:function(config){
		var data={};
		var request={
			method:"POST",
			async:false,
			success:function(response){
				data = Ext.decode(Ext.value(response.responseText,'{}'));
				if(data.defaultMsg){
				  system.smileInfo(data.defaultMsg);
				}
			},
			failure : function(response){
				var  errorinfo = Ext.decode(Ext.value(response.responseText,'{}'));
				 system.errorAlertInfo(errorinfo.errorInfo.errorMessage.error,"错误提示")
		    	
		    	return; 
		    }
		};
		var request=Ext.apply(request,config);
		Ext.Ajax.request(request);
		return data;		
	}
});