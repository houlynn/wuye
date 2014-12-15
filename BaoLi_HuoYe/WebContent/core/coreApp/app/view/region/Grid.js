/**
 * 模块数据的主显示区域，继承自Grid
 */
Ext.define('core.app.view.region.Grid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.modulegrid',
	style:'border-width:0 0 0 0;',
	uses : ['core.app.view.region.GridToolbar',
			'core.app.module.factory.ColumnsFactory',
			'core.util.GridActionUtil'
			],
	requires : ['Ext.selection.CellModel', 'Ext.grid.*', 'Ext.data.*',
			'Ext.util.*'],
	tools : [{
				type : 'gear',
			}],
	columnLines : true, // 加上表格线
	multiSelect : true,
	enableLocking : true, // 使grid可以锁定列
	listeners : {
		 selectionChange : function(model, selected, eOpts){
			core.util.GridActionUtil.selectionChange(this, model, selected, eOpts);
		}
	},
	initComponent : function() {
		this.store.modulegrid = this;
		var viewModel=this.viewModel;
		console.log(viewModel);
		//var viewModel=this.ownerCt;
			//this.store.modulePanel.viewModel;
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
				system.errorAlertInfo(errorInfo.errorMessage);
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

			};


		// 创建grid列
		// 默认第一个grid方案
		this.gridSchemeId = viewModel.get('tf_gridSchemes')[0].tf_schemeOrder;
		// 将第一个方案的columns生成，第一个方案是要先设置好，并不是gridschemecombo触发来生成的
		this.columns = core.app.module.factory.ColumnsFactory.getColumns(viewModel);
		console.log("======colun,m,,=======")
		console.log(this.columns);
		this.dockedItems = [{
					xtype : 'gridtoolbar', // 按钮toolbar
					dock : 'top',
					grid : this,
					viewModel:viewModel,
					
				}, {
					xtype : 'pagingtoolbar', // grid数据分页
					store : this.store,
					displayInfo : true,
					prependButtons : true,
					dock : 'bottom',
					items : [{ // 在最前面加入grid方案的选择Combo
						//xtype : 'gridschemecombo'
					}]
				}];
		this.callParent();
	},

	/**
	 * 在选中的记录发生变化时，修改当前title，这是不用MVVM特性的做法
	 */
	refreshTitle : function() {
		var viewModel = this.up('modulepanel').viewModel;
		var selected = this.getSelectionModel().getSelection();
		var title = viewModel.get('tf_title');
		if (selected.length > 0) {
			if (!!selected[0].getNameValue())
				title = title + '　〖<em>' + selected[0].getNameValue() + '</em>'
						+ (selected.length > 1 ? ' 等' + selected.length + '条' : '') + '〗';
		}
		this.setTitle(title);
	},

	/**
	 * 重新适应所有列的宽度
	 */
	columnAutoSize : function() {
		Ext.Array.forEach(this.columnManager.getColumns(), function(column) {
					if (!column.autoSizeDisabled) {
						column.autoSize();
					}
				})
	},

	/**
	 * 重新选择了列表方案之后，替换方案中的字段
	 */
	setGridSchemeId : function(value) {
		if (this.gridSchemeId != value) {
			this.gridSchemeId = value;
			Ext.suspendLayouts();
			this.columns = core.app.module.factory.ColumnsFactory.getColumns(this
							.up('modulepanel').viewModel, value);
			this.reconfigure(this.store, this.columns);
			Ext.resumeLayouts(true);
			this.columnAutoSize();
		}
	}

})
