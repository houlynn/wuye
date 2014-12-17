Ext.define("core.base.resident.view.UnitDataView", {
	extend : "Ext.DataView",
	alias : "widget.nuit.dataview",
	id : 'phones',
	bodyPadding : '20 20 20 20',
	deferInitialRefresh : false,
	store :"core.base.resident.store.UnitStore",
	tpl : Ext
			.create(
					'Ext.XTemplate',
					'<tpl for=".">',
					'<div class="phone">',
					(!Ext.isIE6
							? '<img width="64" height="64" src="images/phones/{[values.name.replace(/ /g, "-")]}.png" />'
							: '<div style="width:74px;height:74px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'images/phones/{[values.name.replace(/ /g, "-")]}.png\',sizingMethod=\'scale\')"></div>'),
					'<strong>{name}</strong>',
					'<span>{price:usMoney} ({reviews} Review{[values.reviews == 1 ? "" : "s"]})</span>',
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