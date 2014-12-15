Ext.define("core.${dist}.view.${className}Grid", {
	extend : "core.app.base.BaseGrid",
	alias : "widget.${bm}.${className?uncap_first}Grid",
	tbar:[
			{xtype:'button',text:'添加',ref:'gridInsert',iconCls:'table_add'},
			{xtype:'button',text:'删除',ref:'gridDelete',iconCls:'table_remove'},
			{xtype:'button',text:'保存',ref:'gridSave',iconCls:'table_save'}
		],
	columns : [{
		xtype:"rownumberer",
		width : 35,
		text :'No.',
		align : 'center'
	},{
		text:"主键",
		dataIndex:"${pkName}",
		hidden:true
	}
<#if gridfields?exists>
	<#list gridfields?sort_by("index") as m> 
, {
		text:"${m.getText()}",
		dataIndex:"${m.getDataIndex()}",
		width : ${m.getWidth()},
		<#if m.getColumnType()="datetimefield">
		 columnType:"textfield",
		  <#else>
		 columnType:"${m.getColumnType()}",
		   </#if>
		<#if m.isDD()>
	  ddCode:"${m.getDbCode()}",
		</#if>
		field:{
			 xtype:"${m.getColumnType()}",
			 <#if m.getColumnType()="datetimefield">
		      dateType:"date",
		  </#if>
			<#if m.getType()="float">
		      decimalPrecision:3,
		   </#if>
			<#if m.isDD()>
			ddCode:"${m.getDbCode()}",
		</#if>
		<#if !m.isAllowBlank()>
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'${m.getText()}必填',
		</#if>
		allowBlank : ${m.isAllowBlank()?string("true","false")},
		  hideTrigger : false
		}
	}
	 </#list>
</#if>
	
	 ],
	store:"core.${dist}.store.${className}Store",
	bbar:{
		xtype:'pagingtoolbar',
		store:"core.${dist}.store.${className}Store",
		dock:'bottom',
		displayInfo:true
	}
});