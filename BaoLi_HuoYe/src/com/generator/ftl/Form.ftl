Ext.define("core.${dist}.view.${className}Form", {
	extend : "core.app.base.BaseForm",
	alias : "widget.${bm}.${className?uncap_first}Form",
	items : [ {
		fieldLabel : "主键",
		name : "${pkName}",
		hidden : true
	}
 <#if formFields?exists>
 <#list formFields?sort_by("index") as m> 
 ,
 {
		fieldLabel:"${m.getFieldLabel()}",
		name:"${m.getName()}",
		<#if !m.isAllowBlank()>
		beforeLabelTextTpl : comm.get('${m.getBeforeLabelTextTpl()}'),
		emptyText :'${m.getFieldLabel()}必填',
		</#if>
		allowBlank : ${m.isAllowBlank()?string("true","false")},
		<#if m.isDd()=true>
		ddCode:"${m.getDbCode()}",
		</#if>
		<#if  m.getType()="int">
		allowDecimals:false,
		emptyText :'请输输入整数',
		</#if>
		<#if m.getType()="float">
		decimalPrecision:3,
		hideTrigger : false,
		emptyText :'请输输入小数',
		</#if>
		xtype:"${m.getXtype()}"
   }
 </#list>
</#if>
	]
});