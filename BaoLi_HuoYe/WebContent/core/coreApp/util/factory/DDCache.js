/**
 * 数据字典缓存类
 */
Ext.define("factory.DDCache",{
	statics:{
		ddItems:new Ext.util.MixedCollection(),
		/**
		 * 根据ddCode得到字典项
		 * @param {} ddCode
		 */
		getItemByDDCode:function(ddCode){
			if(Ext.isEmpty(ddCode)){
				return [];			
			}
			
			var params={};
			if(typeof(ddCode)=='string'){
			    params={
				ddCode:ddCode
			}
			}else{
			Ext.apply(params, ddCode);
			}
			var ddItem=[];
			if(!this.ddItems.containsKey(ddCode)){
				//发送ajax去加载
				Ext.Ajax.request({
						url:'/coreDDe/getDDItemByDDCode.action',
						method:'POST',
						params:params,
						timeout:4000,
						async:false,//很关键 我不需要异步操作
						success:function(response,opts){
							ddItem = Ext.decode(response.responseText);
							
						}
					});
				if(typeof(ddCode)=='string'){
					this.ddItems.add(ddCode,ddItem);
				}
			
			}else{
				ddItem=this.ddItems.get(ddCode);
			}
			return ddItem;
		},
		clearAll:function(){
			this.ddItems=new Ext.util.MixedCollection();	
		}
	}
});