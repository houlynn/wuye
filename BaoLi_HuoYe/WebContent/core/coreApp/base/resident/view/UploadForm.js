Ext.define("core.base.resident.view.UploadForm", {
    extend : "Ext.form.Panel",
	alias : "widget.base.fileUpload",
	tbar:[
			{xtype:"button",text:"导入",ref:"formUpload",iconCls:"table_upload"}
			],
	items : [ {
		fieldLabel : "主键",
		name : "id",
		hidden : true
	},
 {
		xtype:"filefield",
		fieldLabel:"请选择文件",
		columnWidth:1,
		name:"file",
		itemId:"fileUpload",
		beforeLabelTextTpl : comm.get('required'),
		allowBlank : false
   }
	]
});