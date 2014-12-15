Ext.define("core.sys.dd.view.DDForm",{
	extend:"core.app.base.BaseForm",
	alias:"widget.dd.ddform",
	items:[{
		fieldLabel:"主键",
		name:"ddId",
		hidden:true
	
	},{
		fieldLabel:"字典名称",
		name:"ddName",
		beforeLabelTextTpl : comm.get('required'),
		allowBlank : false
	},{
		fieldLabel:"字典编码",
		name:"ddCode",
		beforeLabelTextTpl : comm.get('required'),
		allowBlank : false
	},{
		fieldLabel:"字典类型",
		name:"ddType",
		beforeLabelTextTpl : comm.get('required'),
		allowBlank : false,
		xtype:"basecombobox",
		ddCode:"DDTYPE"
	},{
		fieldLabel:"启用",
		name:"enabled",
		beforeLabelTextTpl : comm.get('required'),
		allowBlank : false,
		xtype:"basecombobox",
		ddCode:"ENABLED"
	},{
		xtype:"tabpanel",
		columnWidth : 1,
		menuAlign:"center",
		items:[{
			title:'<center height=40>数据字典项</center>',
			xtype:"dd.dditemlayout",
			height:comm.get("resolutionHeight")*0.45
		}],
		tabConfig  : {//标签配置参数
			
        }
	}]
});