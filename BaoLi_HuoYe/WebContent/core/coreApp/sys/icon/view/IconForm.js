Ext.define("core.sys.icon.view.IconForm",{
	extend:"core.app.base.BaseForm",
	alias:"widget.icon.iconform",
	items:[{
		fieldLabel:"主键",
		name:"id",
		hidden:true
	
	},{
		fieldLabel:"名称",
		name:"iconName",
		beforeLabelTextTpl : comm.get('required'),
		allowBlank : false
	},{
		fieldLabel:"IconCls",
		name:"iconCls",
		beforeLabelTextTpl : comm.get('required'),
		allowBlank : false
	},{
		fieldLabel:"像素",
		name:"pixel",
		beforeLabelTextTpl : comm.get('required'),
		allowBlank : false,
		xtype:"basecombobox",
		ddCode:"XIANGSU"
	},{
		xtype:"filefield",
		fieldLabel:"图标",
		name:"icon",
		beforeLabelTextTpl : comm.get('required'),
		allowBlank : false
		
	},{
		xtype:"textarea",
		fieldLabel:"描述",
		name:"remark",
		columnWidth:1
	}]
});