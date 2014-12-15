Ext.define("core.bl.incimg.view.PhotographForm", {
	extend : "core.app.base.BaseForm",
	alias : "widget.bl.photographForm",
	items : [ {
		fieldLabel : "主键",
		name : "pId",
		hidden : true
	}
 ,
 {
		fieldLabel:"图片链接地址",
		name:"imgurl",
		allowBlank : true,
		xtype:"textfield"
   }
	]
});