/**
 * 一个模块的主控界面的容器，用来安放各个模块控件以及协调他们之间的关系
 */
Ext.define('core.app.module.Module', {
			extend : 'Ext.container.Container',
			alias : 'widget.modulepanel',
		    frame: !1,
            border: !1,
            enableNavigate: !0,
			requires : ['core.app.module.factory.ModelFactory'],
			uses : ['core.app.view.region.Navigate', 'core.app.view.region.Grid',
					'core.app.view.region.Detail', 'core.app.view.region.BaseWindow'],
			referenceHolder : true,
			    config: {
                parentFilter: null,
                gridType: "normal"
        },
			layout : 'border', // 模块采用border布局
			 param: {},
			initComponent : function() {
				console.log(this.moduleName + ' 正在创建');
				 //  this.margin = "neptune" === Ext.themeName ? "0 0 0 0": "1 1 1 1",
				   Ext.apply(this, this.param);
				// 从MainModel中取得当前模块的定义数据，包括字段和各种设置的信息
				var modueId=this.code;
				var viewModel=system.getViewModel(modueId);
			    this.moduleName = viewModel.get("tf_moduleName");
				//this.setTitle(viewModel.get("tf_title"));//设置标题
				this.glyph =viewModel.get('tf_glyph'); // 由于上面的glyph的bind无效，因此需要在这里加入glyph的设置
				this.model = core.app.module.factory.ModelFactory.getModelByModule(viewModel.data);
				this.store = Ext.create('core.app.store.GridStore', {
							module : viewModel.data,
							model : this.model,
							modulePanel : this
						});
				this.items = [ {
					xtype : 'gridModue', // 模块的grid显示区域
					region : 'center',
					modulePanel: this,
					viewModel:viewModel,
					store : this.store,
					parentFilter: this.parentFilter,
                    gridType: this.gridType
				}, {
					xtype : 'recorddetail', // 记录明细
					region : 'east',
					width : 250,
					collapsible : true, // 可以折叠隐藏
					collapsed : true,
					collapseMode : 'mini', // 折叠陷藏模式
					split : true
					// 可以拖动大小
			}]
				if(this.enableNavigate&&viewModel.get("tf_moduleGridNavigates")&&viewModel.get("tf_moduleGridNavigates").length>0){
				var navigate=	{
						xtype : 'modulenavigate', // 导航区域
						region : 'west',
						title: "\u5bfc\u822a",
						width : 250,
						defaultNavigateValues: this.param ? this.param.defaultNavigateValues: null,
                        parentFilter: this.parentFilter,
						collapsible : true,
						hidden:false,
						collapsed : true,
						split : true,
						collapseMode : 'mini', // 折叠陷藏模式
						module : viewModel.data,
					};
				//alert(0);
				this.items.push(navigate);
			}
			
				this.callParent(arguments)
			}

		})