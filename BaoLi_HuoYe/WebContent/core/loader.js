/**
 * 程序外部组件引用
 */
 //初始化Ext.QuickTips，以使得tip提示可用
 Ext.QuickTips.init();
//初始化提示工具框
Ext.tip.QuickTipManager.init();
//启动动态加载机制
Ext.Loader.setPath({
	'Ext.ux' : 'extjs/ux',
	'Ext.app' : 'extjs/app'
});
Ext.Loader.setConfig({
	enabled:true,
	paths:{
		baseUx:"core/ux/base",
		factory:"core/coreApp/util/factory"
	}
})
//同步加载
Ext.syncRequire([
        "baseUx.form.datetime.DateTimePicker",
        "baseUx.form.datetime.DateTime",
        'baseUx.ButtonTransparent',
        'baseUx.GridSearchField',
        'baseUx.Notification',
        "factory.ModelFactory",
        "factory.DDCache",
        "Ext.container.Viewport",
        "Ext.MessageBox",
]);
