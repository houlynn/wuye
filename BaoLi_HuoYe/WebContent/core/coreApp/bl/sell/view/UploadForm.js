Ext.define("core.bl.sell.view.UploadForm", {
	extend : "core.app.base.BaseForm",
	alias : "widget.bl.sellimgformm",
	tbar:[
			{xtype:"button",text:"上传图片",ref:"formUpload",iconCls:"table_upload"}
			],
	items : [ {
		fieldLabel : "主键",
		name : "rid",
		hidden : true
	},
 {
		xtype:"filefield",
		fieldLabel:"链接路径",
		columnWidth:1,
		name:"imgurl",
		beforeLabelTextTpl : comm.get('required'),
		allowBlank : false
   }
	]
});