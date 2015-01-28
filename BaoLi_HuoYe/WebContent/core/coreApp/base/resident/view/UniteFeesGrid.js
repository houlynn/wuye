/**
 * 业主欠费表格
 */
Ext.define("core.base.resident.view.UniteFeesGrid",{
extend:"Ext.grid.Panel",
	alias : 'widget.unite.unitefeesgrid',
    columnLines : true, // 加上表格线
    autoHeight:true,
 	selModel:{
		selType:"checkboxmodel"
	},
		listeners : {
		 selectionChange : function(model, selected, eOpts){
		 	   this.down('toolbar button#uniteFees')[selected.length > 0
					? 'enable'
					: 'disable']();
			var sum=0;		
			for(var i in selected){
				sum+=parseFloat(selected[i].get("tf_acount"));
			}		
		var unitefeesfrom=	this.up("form[xtype=unite.unitefeesfrom]");
		var realACount=unitefeesfrom.down("#tf_realACount");
		realACount.setValue(sum);
			
		 	
		}
	},
    tbar:[{xtype:'button',text:'收费',itemId:'uniteFees',glyph : 0xf016},{xtype:'button', hidden:true, text:'添加临时收费',itemId:'uniteLFeesAdd',iconCls:'table_remove'}],
      initComponent : function() {
			   var viewModel=system.getViewModel(301);
			    this.moduleName = viewModel.get("tf_moduleName");
				this.glyph =viewModel.get('tf_glyph'); 
				this.model = core.app.module.factory.ModelFactory.getModelByModule(viewModel.data,{read:"unite/loadUniteFees.action"});
				this.store = Ext.create('core.base.resident.store.FeesStore', {
							module : viewModel.data,
							model : this.model,
							grid:this,
							autoLoad: !1,
						});
			   this.columns = core.app.module.factory.ColumnsFactory.getColumns(viewModel);	
				if(this.viewBar){
				 this.tbar=null;
			  }
		this.callParent();
	}
});