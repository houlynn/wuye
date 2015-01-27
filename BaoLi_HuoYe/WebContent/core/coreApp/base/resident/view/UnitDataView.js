Ext.define("core.base.resident.view.UnitDataView", {
	extend : "Ext.DataView",
	alias : "widget.nuit.dataview",
	id : 'phones',
	bodyPadding : '20 20 20 20',
	deferInitialRefresh : false,
	store :"core.base.resident.store.UnitStore",
	tpl : Ext
			.create(
					"Ext.XTemplate",
					"<tpl for='.'>",
					"<div class='phone'>",
					(!Ext.isIE6
							? "<img width='64' height='64' src='{iamgUrl}' />"
							: '<div style="width:74px;height:74px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'{iamgUrl}\',sizingMethod=\'scale\')"></div>'),
					'<strong>{rname:ellipsis(10)}</strong>',
					'<span>房号:{number}</span>',
					'<span>状态:<font style="color:green;font-weight:bold">{stateOccupancy}</font> <font style="color:red;font-weight:bold">{stateFees} <font/> <font style="color:blue;font-weight:bold">{stateRepair}<font/></span>',
					'</div>', '</tpl>'),
	plugins : [Ext.create('Ext.ux.DataView.Animated', {
				duration : 550,
				idProperty : 'id'
			})],
	itemSelector : 'div.phone',
	overItemCls : 'phone-hover',
	multiSelect : false,
	autoScroll : true
});