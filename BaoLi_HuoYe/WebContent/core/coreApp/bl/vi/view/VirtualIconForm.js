Ext.define("core.bl.vi.view.VirtualIconForm", {
	extend : "core.app.base.BaseForm",
	alias : "widget.bl.virtualIconForm",
	items : [ {
		fieldLabel : "主键",
		name : "iconid",
		hidden : true
	}
 ,
 {
		fieldLabel:"名称",
		name:"name",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'名称必填',
		allowBlank : false,
		xtype:"textfield"
   }
 ,
 {
		fieldLabel:"跳转地址",
		name:"linkUrl",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'跳转地址必填',
		allowBlank : false,
		xtype:"textfield"
   }
 ,
 {
	 xtype:"filefield",
		fieldLabel:"图片链接地址",
		name:"inconUrl",
		beforeLabelTextTpl : comm.get('required'),
		//allowBlank : false,
   }
 ,
 {
		fieldLabel:"备注",
		name:"remark",
		allowBlank : true,
		xtype:"textfield"
   }
	]
});