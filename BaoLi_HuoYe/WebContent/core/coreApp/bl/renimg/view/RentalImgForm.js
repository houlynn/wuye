Ext.define("core.bl.renimg.view.RentalImgForm", {
	extend : "core.app.base.BaseForm",
	alias : "widget.bl.rentalImgForm",
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