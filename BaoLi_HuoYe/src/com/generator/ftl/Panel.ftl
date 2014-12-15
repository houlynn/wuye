Ext.define("core.${dist}.view.${className}Panel",{
	extend:"core.app.base.BasePanel",
	alias:"widget.${bm}.${className?uncap_first}Panel",
	funCode:"${className?uncap_first}_main",
	funData:{
	        action:"${namespace}", //请求Action
	        whereSql:"",//表格查询条件
	        orderSql:"operatingTime",//表格排序条件
	        pkName:"${pkName}",
	        modelName:"${classFullName}",//实体全路径
	        tableName:"${className}",//表名
	        defaultObj:{enabled:"1"},//默认信息，用于表格添加的时候字段默认值
	        isChildren:false,//是否子功能
	        children:[{//子功能的配置
	        	funCode:"${className?uncap_first}item_main"	        	
	        }],
	        //子功能信息
	        childFun:[],
	        parentCode:"${className?uncap_first}_main",//主功能功能编码
	        connectFields:[{//关联字段
			mainFieldCode:"",//主功能字段名
			childFieldCode:"",//子功能字段名
			foreignKey:"foreignKey",//外键虚字段
			isQuery:true
			}]
	},
		items:[{
		xtype:"basecenterpanel",
				items:[{
					xtype:"basequerypanel",
					region:"north",
					items:[
					 <#if queryFields?exists>
			  <#list queryFields?sort_by("index") as f> 
			  {
				xtype:"basequeryfield",
				queryType:"${f.getQueryType()}",
				fieldLabel:"${f.getFieldLabel()}",
				name:"${f.getName()}",
				config:{
				   <#if f.isDate()>
					dateType : 'datetime'
					</#if>	
					<#if f.isDd()>
					ddCode:"${f.getDdCode()}"
					</#if>				
				}
			},
			   </#list>
              </#if>
			]
			},{
			xtype:"${bm}.${className?uncap_first}Grid",
			region:"center"
		}]
	},{
	xtype:"${bm}.${className?uncap_first}Form",
		hidden:true
	}]
});
