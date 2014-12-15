/**
 * 表单控制器
 */
Ext.define("core.app.controller.PanelController",{
	extend:"Ext.app.Controller",
	initPanel:function(){
		var self=this;
		var panelCtr={
			"basepanel":{
				render:function(panel){
					//var funCode=panel.funCode;
					//panel.itemId=funCode+"_basepanel";
				}
			},
			"basecenterpanel":{
				render:function(panel){
					var basePanel=panel.up("basepanel");
					var funCode=basePanel.funCode;
					panel.funCode=funCode;
					//panel.itemId=funCode+"_basecenterpanel";
				}
			}
		}
		Ext.apply(self.ctr,panelCtr);
	}
});