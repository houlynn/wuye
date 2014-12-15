Ext.define("core.bl.deptimg.view.DeptImageUrlForm", {
	extend : "core.app.base.BaseForm",
	alias : "widget.bl.deptImageUrlForm",
	tbar:[
			{xtype:"button",text:"上传",ref:"formUpload",iconCls:"table_upload"},
			],
	items : [ {
		fieldLabel : "主键",
		name : "id",
		hidden : true
	}
 ,
 {
		fieldLabel:"描述信息",
		name:"remarks",
		emptyText :'描述信息',
		xtype:"textfield"
   }
 ,
 {
		xtype:"filefield",
		fieldLabel:"链接路径",
		name:"url",
		beforeLabelTextTpl : comm.get('required'),
		allowBlank : false
   }
	]
});