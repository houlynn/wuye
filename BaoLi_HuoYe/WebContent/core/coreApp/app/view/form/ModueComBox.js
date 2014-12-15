Ext.define("core.app.view.form.ModueComBox",{
	extend:"Ext.form.field.ComboBox",
	alias: 'widget.moduecombobox',
	triggerAction : 'all' ,
	 mode: "local",
	forceSelection: true,
	displayField: 'itemName',
	valueField: 'itemCode',
    margin:"1 1 0 0 0",
	trigger1Cls: Ext.baseCSSPrefix + 'form-clear-trigger',
    trigger2Cls: Ext.baseCSSPrefix + 'form-arrow-trigger',
    editable:false,
	initComponent: function(){
		var self=this;
		this.selectOnFocus=false; 
		var ddCode=this.ddCode;
		var store=Ext.create("Ext.data.Store",{
	    model:factory.ModelFactory.getModelByName("com.model.hibernate.system.shared.DictionaryItem","").modelName,
	    proxy:{
		type:"ajax",		
		url:'/coreDDe/getDDItemByDDCode.action',
	    extraParams :ddCode,
		reader:{
			type:"json",
			root:"rows",
			totalProperty :'totalCount'
		},
		writer:{
			type:"json"
		}
	    },
	   autoLoad:false
		});
		//将数据字典数据赋值到组件属性上
		var dicData={};
		store.each(function(rec){
			dicData[rec.get(this.valueField)]=dicData[rec.get(this.displayField)];			
		});
		this.store=store;
		self.dicData=dicData;
		self.onTrigger2Click = Ext.clone(self.onTrigger1Click);
		self.onTrigger1Click = function(){
			self.reset();//重置
//			me.setConfigInfo();
		}
		this.callParent(arguments);
	}
});