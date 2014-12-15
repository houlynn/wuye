Ext.define("core.bl.fbd.view.FeedbackForm", {
	extend : "core.app.base.BaseForm",
	alias : "widget.bl.feedbackForm",
	items : [ {
		fieldLabel : "主键",
		name : "fbid",
		hidden : true
	}
 ,

 {
		fieldLabel:"反馈用户",
		name:"username",
		allowBlank : true,
		xtype:"textfield"
   }
 ,
 {
		fieldLabel:"反馈时间",
		name:"fbtime",
		readOnly:true,
		xtype:"datetimefield"
   }
 ,
 {
		fieldLabel:"反馈信息",
		name:"msg",
		allowBlank : true,
		xtype:"textfield",
		columnWidth:1,
		height:300
   }

	]
});