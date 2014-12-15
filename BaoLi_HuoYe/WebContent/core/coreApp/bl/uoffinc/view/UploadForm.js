Ext.define("core.bl.uoffinc.view.UploadForm", {
	extend : "core.app.base.BaseForm",
	alias : "widget.bl.interimgfrom",
	tbar:[
			{xtype:"button",text:"上传",ref:"formUpload",iconCls:"table_upload"}
			],
	items : [ {
		fieldLabel : "主键",
		name : "id",
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