Ext.define("core.bl.news.view.AppNewsForm", {
	extend : "core.app.base.BaseForm",
	alias : "widget.bl.appNewsForm",
	id:"news_from",
	tbar:[
			{xtype:"button",text:"保存",ref:"formSave_news",iconCls:"table_save"},
			{xtype:"button",text:"返回",ref:"formReturn",iconCls:"return"}
			],
	items : [ {
		fieldLabel : "主键",
		name : "newid",
		hidden : true
	}
 ,
 {
		fieldLabel:"标题",
		name:"title",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'标题必填',
		allowBlank : false,
		xtype:"textfield"
   }
 ,
 {
		fieldLabel:"来源",
		name:"source",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'来源必填',
		allowBlank : false,
		xtype:"textfield"
   }
 ,
 {
		fieldLabel:"上传缩略图",
		name:"shrinkimg",
		beforeLabelTextTpl : comm.get('required'),
		allowBlank : false,
		xtype:"filefield"
   },
   {
	   xtype: 'extkindeditor',
	   name: 'newContent',
	   id:"appnewsid-input",
	  　columnWidth:1,
	   height:800,
	   fieldLabel: '新闻编辑',
   }
	]
});


