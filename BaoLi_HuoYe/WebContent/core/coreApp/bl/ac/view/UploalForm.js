Ext.define("core.bl.ac.view.UploalForm", {
	extend : "core.app.base.BaseForm",
	alias : "widget.bl.uploadForm",
	tbar:[
			{xtype:"button",text:"添加类别",ref:"formUpload",iconCls:"table_upload"},
			],
	items : [ {
		fieldLabel : "主键",
		name : "id",
		hidden : true
	}
 ,
 {
		fieldLabel:"类别",
		name:"classify",
		emptyText :'填入列别',
		xtype:"textfield"
   }
 ,
 {
		xtype:"filefield",
		fieldLabel:"链接路径",
		name:"imgurl",
		beforeLabelTextTpl : comm.get('required'),
		allowBlank : false
   }
	]
});