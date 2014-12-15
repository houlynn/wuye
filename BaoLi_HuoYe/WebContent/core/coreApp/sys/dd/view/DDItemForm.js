Ext.define("core.sys.dd.view.DDItemForm",{
	extend:"core.app.base.BaseForm",
	alias:"widget.dd.dditemform",	
	items:[{
		fieldLabel:"主键",
		name:"itemId",
		hidden:true
	},{
		fieldLabel:"项名称",
		name:"itemName",
		beforeLabelTextTpl : comm.get('required'),
		allowBlank : false
	},{
		fieldLabel:"项编码",
		name:"itemCode",
		beforeLabelTextTpl : comm.get('required'),
		allowBlank : false
	},{
		fieldLabel:"外键",
		name:"foreignKey"
	}]
});