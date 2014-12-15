Ext.define("core.app.base.BaseQueryPanel",{
extend : 'Ext.form.Panel',
alias : 'widget.basequerypanel',
layout:"column",
title:"组合查询",
border:false,
frame:true,
cls:"addr-panel",
bodyStyle:'border-width:0px 0 0px 0;',
autoScroll : false,
animCollapse : false,
collapsible:true,
collapsed :true,
bodyPadding : '1 0 0 0',
defaults:{
	margin:"10 0 0 0 0",
	xtype : 'textfield',
	labelAlign : 'right',
	columnWidth : .5
},
buttonAlign:"center",
buttons:[{
	text : '查询',
	ref : 'queryBtn',
	iconCls : 'tree_ok'
					
	},{
	text: '重置',
	ref : 'resetBtn',
	iconCls : 'tree_delete'
}]
});