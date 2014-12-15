Ext.define("core.bl.gd.view.GoodImageUrlForm", {
	extend : "core.app.base.BaseForm",
	alias : "widget.bl.goodimg",
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
		name:"url",
		beforeLabelTextTpl : comm.get('required'),
		allowBlank : false
   }
	]
});