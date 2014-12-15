Ext.define("core.bl.mesg.view.MassageForm", {
	extend : "core.app.base.BaseForm",
	alias : "widget.bl.massageForm",
	items : [ {
		fieldLabel : "主键",
		name : "msgid",
		hidden : true
	}
 ,
 {
		fieldLabel:"回复内容",
		name:"context",
		allowBlank : true,
		xtype:"textfield"
   }
 ,
 {
		fieldLabel:"帖子ID",
		name:"inid",
		allowBlank : true,
		xtype:"textfield"
   }
 ,
 {
		fieldLabel:"评论时间",
		name:"backtime",
		allowBlank : true,
		xtype:"textfield"
   }
 ,
 {
		fieldLabel:"用户id",
		name:"userid",
		allowBlank : true,
		xtype:"textfield"
   }
	]
});