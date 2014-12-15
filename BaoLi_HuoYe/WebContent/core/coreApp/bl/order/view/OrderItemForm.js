Ext.define("core.bl.order.view.OrderItemForm", {
	extend : "core.app.base.BaseForm",
	alias : "widget.bl.orderItemForm",
	items : [  {
		xtype:"tabpanel",
		columnWidth : 1,
		menuAlign:"center",
		items:[{
			title:'<center height=40>上传图片</center>',
			xtype:"bl.deptImageUrlPanel",
			height:comm.get("resolutionHeight")*0.28
		}],
		tabConfig  : {//标签配置参数
			
      }
  }
	]
});