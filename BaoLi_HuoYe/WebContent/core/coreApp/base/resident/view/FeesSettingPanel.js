Ext.define("core.base.resident.view.FeesSettingPanel",{
	extend:"Ext.container.Container",
	alias:"widget.resident.feesettingpanel",
	layout:"border",
		items : [{
		region:"north",
		title:"from",
		xtype:"resident.feesettingfrom"
	},{
		region:"center",
		title:"panel",
		xtype:"panel"
		//xtype:"resident.feesettinggrid"
	}]
});