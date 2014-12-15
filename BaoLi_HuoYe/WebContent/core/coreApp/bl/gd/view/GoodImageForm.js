Ext.define("core.bl.gd.view.GoodImageForm", {
	extend : "core.app.base.BaseForm",
	alias : "widget.bl.goodImageForm",
	items : [ {
		fieldLabel : "主键",
		name : "igid",
		hidden : true
	}
 ,
 {
		fieldLabel:"图片链接地址",
		name:"url",
		allowBlank : true,
		xtype:"textfield"
   }
	]
});