Ext.define("core.app.basis.BasisGrid",{
	extend : 'Ext.grid.Panel',
	alias : 'widget.gridModue',
	style:'border-width:0 0 0 0;',
   columnLines : true, 
	multiSelect : true,
	width:"100%",
	enableLocking : true, 
    tools : [{type : 'gear'}],
    listeners : {
		    selectionChange : function(model, selected, eOpts){
		    var viewModel=system.getViewModel(this.code)
		    this.down('toolbar button#delete')[selected.length > 0? 'enable': 'disable']();
			var selectedNames =viewModel.get("tf_title");
			if (selected.length > 0) {
				if (!!selected[0].getNameValue()){
					selectedNames = selectedNames + '　『<em>' + selected[0].getNameValue()+ '</em>'+ (selected.length > 1 ? ' 等' + selected.length + '条' : '') + '』';
				    this.setTitle(selectedNames);
				}
			}
		}
	},
	
	
   initComponent : function() {
   	  var self=this;
   	   var  thar = [
   		{text : '新增',   ref:'addButton', xtype : 'splitbutton',itemId : 'new',glyph : 0xf016,menu : [{text : '复制新增', ref:'copyadd', tooltip : '新增时先将当前记录添入到新记录中',itemId : 'newwithcopy',glyph : 0xf0c5,
				  listeners : {
								click:function(){
								   var grid=self;
								   var sm = self.getSelectionModel();
									if (sm.getSelection().length != 1) {
										Ext.toast({
													title : '警告',
													html : '请先选择一条记录，然后再执行此操作！',
													bodyStyle : 'background-color:yellow;',
													header : {
														border : 1,
														style : {
															borderColor : 'pink'
														}
													},
													border : true,
													style : {
														borderColor : 'pink'
													},
													saveDelay : 10,
													align : 'tr',
													closable : true,
													minWidth : 200,
													useXAxis : true,
													slideInDuration : 500
												});
										return;get
									}
									var model = Ext.create(grid.getStore().model);
									Ext.Array.each(model.fields.keys, function(field) { // 将选中记录的model都赋给值新的记录
												model.set(field.name, sm.getSelection()[0].get(field.name));
												model.set(field, sm.getSelection()[0].get(field));
											});
									model.set(model.idProperty, null); // 设置为null,可自动增加
									grid.getStore().insert(0, model);
									sm.select(model); // 选中当前新增的记录
											}
										}
									}, '-']
				
						}, {
							text : '修改',
							glyph : 0xf044,
							itemId : 'edit',
							ref:"editButton"
						}, {
							text : '删除',
							disabled : true,
							glyph : 0xf014,
							ref:"removeButton",
							itemId : 'delete'
						}, '-',  '-', '筛选', {
							width : 60,
							xtype : 'gridsearchfield',
							store : Ext.create('Ext.data.Store', {
										proxy : {
											type : 'rest'
										}
									})
						}];
	var  barItem=[];
	if(!this.thar){
	  barItem=thar
	}else{
	 barItem=Ext.apply(thar,this.thar);
	}
   	var viewModel=system.getViewModel(this.code)
   		this.model = core.app.module.factory.ModelFactory.getModelByModule(viewModel.data);
				this.store = Ext.create('core.app.store.GridStore', {
							model : this.model,
							gridModue : this,
							modulePanel : this
						});
		this.columns = core.app.module.factory.ColumnsFactory.getColumns(viewModel);	
					this.dockedItems = [{
					xtype : 'toolbar', // 按钮toolbar
					dock : 'top',
				   style:'border-width:0 0 0 0;',
					items:barItem,
					grid : this,
					viewModel:viewModel
					
				}, {
					xtype : 'pagingtoolbar', // grid数据分页
					store : this.store,
					displayInfo : true,
					prependButtons : true,
					dock : 'bottom'
				}];	
		this.store.modulegrid = this;
		this.viewModel=viewModel;
		var title = viewModel.get('tf_title');
		this.setTitle(title);
		// 可以在grid中进行行编辑的设置
		this.rowEditing = new Ext.grid.plugin.RowEditing({
			     saveBtnText: '保存', 
                 cancelBtnText: "取消", 
				 clicksToEdit : 2
				});
		this.plugins = [this.rowEditing];
		this.selType = 'rowmodel';
		this.on('edit', function(editor, e) {
					// 每一行编辑完保存之后，都提交数据
			// 每一行编辑完保存之后，都提交数据
			e.grid.getStore().sync({
						callback : function(data,store) {
							    e.record.commit();
							   system.smileInfo("保存成功!")
						}
					});
			var proxy= e.grid.getStore().getProxy();
			var errorInfo=proxy.proxy;
			if(errorInfo){
				
			}else{
				showMsg("添加信息","添加成功!",1);
			}
		});

		this.viewConfig = {
				stripeRows : true, // 奇偶行不同底色
				enableTextSelection : false,
				// 加入允许拖动功能
				plugins : [{
					ptype : 'gridviewdragdrop',
					ddGroup : 'DD_grid_' + viewModel.get('tf_moduleName'), // 拖动分组必须设置，这个分组名称为:DD_grid_Global
					enableDrop : false  // 设为false，不允许在本grid中拖动
					}]

			}
				this.callParent();
   },
   
   
	columnAutoSize : function() {
		Ext.Array.forEach(this.columnManager.getColumns(), function(column) {
					if (!column.autoSizeDisabled) {
						column.autoSize();
					}
				});
	}
})