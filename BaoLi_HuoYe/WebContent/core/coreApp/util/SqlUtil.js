Ext.define("core.util.SqlUtil",{
	/**
	 * 构建执行的Sql字符串
	 * @param {} updateArray
	 * @param {} modelName
	 * @param {} pkName
	 */
	getUpdateSql:function(updateArray,modelName,pkName){
		var datas=new Array();
		Ext.each(updateArray,function(obj){
			var pkValue="";
			var setArray=new Array();
			var fields=new Array();
			for(var f in obj){
				var value=Ext.value(obj[f],'');
				if(f==pkName){
					pkValue=obj[pkName];					
				}else{
					fields.push(f);
					if(typeof(value)=="string"){
						value=value.replace("'","''");//因为sql语句执行的'有特殊意义，前面加一个单引号标识转义
						setArray.push(f+"='"+value+"'");
					}else if(typeof(value)=="int" || typeof(value)=="float"){
						setArray.push(f+"="+value);
					}else{
						setArray.push(f+"='"+value+"'");
					}
				}
			}
			datas.push("{pkValue:'"+pkValue+"',fields:'"+fields.join(",")+"',sql:\"update "+modelName+" set "+setArray+" where "+pkName+"='"+pkValue+"'\"}")
		});
		return "["+datas.join(",")+"]";
	},
	/**
	 * 得到查询的querySql
	 * @param {} queryPanel
	 */
	getQuerySql:function(queryPanel){
		var queryFields=queryPanel.query("basequeryfield");
		var querySql="";
		Ext.each(queryFields,function(queryField){
			var fieldName=queryField.name;
			var queryTypeField=queryField.down("combobox[name="+fieldName+"_type]");
			if(queryTypeField){
				//代表是系统查询组件
				//1.解析文本类型字段
				var type=queryTypeField.getValue();
				if(type=="like"){//模糊查询
					var valueField=queryField.down("field[name="+fieldName+"_field]");
					var value=valueField.getValue();
					if(value){
						querySql+=" and "+fieldName+" like '%"+value+"%'";
					}
				}else if(type=="="){//精确查询
					var valueField=queryField.down("field[name="+fieldName+"_field]");
					var value=valueField.getValue();
					if(value && valueField.xtype!="numberfield"){
						querySql+=" and "+fieldName+" = '"+value+"'";
					}else if(value && valueField.xtype=="numberfield"){
						querySql+=" and "+fieldName+" = "+value+"";
						
					}
				}else if(type=="between"){//区间查询
					var startField=queryField.down("field[name="+fieldName+"_start]");
					var endField=queryField.down("field[name="+fieldName+"_end]");
					var startValue=startField.getValue();
					var endValue=endField.getValue();
					if(startValue && endValue && startField.xtype!="numberfield"){
						querySql+=" and "+fieldName+" >= '"+startValue+"' and "+fieldName+" <='"+endValue+"'";
					}else if(startValue && endValue && startField.xtype=="numberfield"){
						querySql+=" and "+fieldName+" >= "+startValue+" and "+fieldName+" <="+endValue+"";
					}					
				}
			}else{// 其他组件查询
				var valueField=queryField.down("field[name="+fieldName+"_field]");
				var value=valueField.getValue();
				if(value){
					querySql+=" and "+fieldName+"='"+value+"'";
				}
			}
		});
		return querySql;
	}
});