Ext.define("core.base.resident.view.UniteFeesGrid",{
extend:"Ext.grid.Panel",
alias:"widget.unite.unitefeesgrid",
columnLines : true, // 加上表格线
autoScroll : true,
 autoHeight:true,
 tbar:[{xtype:'button',text:'收费',itemId:'uniteFees',iconCls:'table_remove'},{xtype:'button',text:'添加临时收费',itemId:'uniteLFeesAdd',iconCls:'table_remove'}],
initComponent : function() {
			   var viewModel=system.getViewModel(301);
			    this.moduleName = viewModel.get("tf_moduleName");
				this.glyph =viewModel.get('tf_glyph'); 
				this.model = core.app.module.factory.ModelFactory.getModelByModule(viewModel.data,{read:"unite/loadUniteFees.action"});
				this.store = Ext.create('core.app.store.GridStore', {
							module : viewModel.data,
							model : this.model,
							autoLoad: !1,
						});
			this.columns = core.app.module.factory.ColumnsFactory.getColumns(viewModel);			
		this.callParent();
	}
});