Ext.define("core.bl.sellimg.view.SellOferImgForm", {
	extend : "core.app.base.BaseForm",
	alias : "widget.bl.sellOferImgForm",
	items : [ {
		fieldLabel : "主键",
		name : "imgid",
		hidden : true
	}
 ,
 {
		fieldLabel:"图片",
		name:"url",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'图片必填',
		allowBlank : false,
		xtype:"textfield"
   }
	]
});