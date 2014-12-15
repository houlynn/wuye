Ext.define("core.app.view.form.BaseQueryField",{
	extend:"Ext.form.FieldContainer",
	alias: 'widget.basequeryfield',
	layout:"hbox",
	defaults: {
	    hideLabel: true,
	    xtype : 'textfield'
	},
	initComponent: function(){
		var self=this;
		var columnWidth=.5;
		var queryType=this.queryType;
		var items=new Array();
		//声明下拉框的store
		var store=Ext.create("Ext.data.Store",{
			fields:['name','value']
		});
		var combobox=Ext.create("Ext.form.field.ComboBox",{
			queryMode: 'local',
			displayField: 'name',
			valueField: 'value',
			editable:false,
			name:this.name+"_type",
			width : 60,
			listeners:{
				change:function(cb,newValue,oldValue){
					//从区间切换成精确
					if(oldValue=="between" && newValue=="="){
						var fc=cb.up("basequeryfield[name="+self.name+"]");
						var start=fc.down("field[name="+self.name+"_start]");
						var end=fc.down("field[name="+self.name+"_end]");
						start.name=self.name+"_field";
						var startDom=start.getEl();
						start.setWidth(startDom.getWidth()*2);
						end.hide();
					//从精确切换到区间
					}else if(oldValue=="=" && newValue=="between"){
						var fc=cb.up("basequeryfield[name="+self.name+"]");
						var start=fc.down("field[name="+self.name+"_field]");
						start.name=self.name+"_start";
						var startDom=start.getEl();
						start.setWidth(startDom.getWidth()/2);
						var end=fc.down("field[name="+self.name+"_end]");
						end.show();
					}
				}
			}
		});
		if(queryType=="textfield"){
			var obj={name:this.name+"_field"};
			if(this.config){
				obj=Ext.apply(obj,this.config);
			}
			items.push(obj);
			store.loadData([{name:"模糊",value:"like"},{name:"精确",value:"="}]);
			combobox.store=store;
			combobox.setValue("like");
			items.push(combobox);			
		}else if(queryType=="datetimefield"){//如果是时间字段
			var start={
				xtype:"datetimefield",
				name:this.name+"_start"
			};
			var end={
				xtype:"datetimefield",
				name:this.name+"_end"
			};
			if(this.config){
				start=Ext.apply(start,this.config);
				end=Ext.apply(end,this.config);
			}
			items.push(start);
			items.push({xtype: 'displayfield', value: '~',name : this.name+'_df'});
			items.push(end);
			store.loadData([{name:"区间",value:"between"},{name:"精确",value:"="}]);
			combobox.store=store;
			combobox.setValue("between");
			items.push(combobox);
			columnWidth=1;
		}else if(queryType=="numberfield"){
			var start={
				xtype:"numberfield",
				value:null,
				name:this.name+"_start"
			};
			var end={
				xtype:"numberfield",
				value:null,
				name:this.name+"_end"
			};
			if(this.config){
				start=Ext.apply(start,this.config);
				end=Ext.apply(end,this.config);
			}
			items.push(start);
			items.push({xtype: 'displayfield', value: '~',name : this.name+'_df'});
			items.push(end);
			store.loadData([{name:"区间",value:"between"},{name:"精确",value:"="}]);
			combobox.store=store;
			combobox.setValue("between");
			items.push(combobox);			
			columnWidth=1;
		}else{
			columnWidth=.5;
			var obj={
				xtype:queryType,
				name:this.name+"_field"
			};
			if(this.config){
				obj=Ext.apply(obj,this.config);
			}
			items.push(obj);
		}
		self.items=items;
		self.columnWidth=columnWidth;
		this.callParent(arguments);
	}
});