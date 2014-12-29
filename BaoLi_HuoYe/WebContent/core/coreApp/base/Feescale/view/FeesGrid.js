Ext.define("core.base.Feescale.view.FeesGrid",{
 extend : 'Ext.grid.Panel',
	alias : 'widget.feesv.grid',
	code:106,
   autoHeight:true,
     style:'border-width:0 0 0 0;',
     columnLines : true, // 加上表格线
	 multiSelect : true,
	 width:"100%",
	 showTitle:true,
	 tools : [{type : 'gear'}],
     listeners : {
		    selectionChange : function(model, selected, eOpts){
		 	var viewModel=system.getViewModel(this.code)
		    this.down('toolbar button#delete')[selected.length > 0? 'enable': 'disable']();
			var selectedNames =viewModel.get("tf_title");
			if (selected.length > 0) {
				if (!!selected[0].getNameValue()){
					selectedNames = selectedNames + '　『<em>' + selected[0].getNameValue()+ '</em>'+ (selected.length > 1 ? ' 等' + selected.length + '条' : '') + '』';
					if(!this.showTitle==false){
				     this.setTitle(selectedNames);
					}
				}
			}
		}
	},
	// enableLocking : true, // 使grid可以锁定列  列锁定后alias无效
     initComponent : function() {
   	  var self=this;
   	  var api= {
	                read : 'rest/module/fetchdata.do',
		            update : 'rest/module/update.do',
			        create : 'rest/module/create.do',
			       destroy : 'rest/module/remove.do'
	        };
	   if(this.api){     
	    api=Ext.apply(api,this.api);   
	   }
	   this.api=api;
	   var  thar = [
   		{text : '新增',   ref:'addButton', xtype : 'splitbutton',glyph : 0xf016,menu : [{text : '复制新增', ref:'copyadd', tooltip : '新增时先将当前记录添入到新记录中',itemId : 'newwithcopy',glyph : 0xf0c5,
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
										return;
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
							ref:"editButton"
						}, {
							text : '删除',
							disabled : true,
							glyph : 0xf014,
							itemId:'delete',
							ref:"removeButton",
						}
						, '-',  '-', '筛选', {
							width : 60,
							xtype : 'gridsearchfield',
							// store : this.grid.getStore() // 现在用的local数据，不可以进行筛选
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
   	 this.model = core.app.module.factory.ModelFactory.getModelByModule(viewModel.data,this.api);
				this.store = Ext.create('core.app.store.GridStore', {
							model : this.model,
							modulegrid:this,
							autoLoad:false
						});
		this.columns = core.app.module.factory.ColumnsFactory.getColumns(viewModel);	
					this.dockedItems = [{
					xtype : 'toolbar', // 按钮toolbar
					dock : 'top',
					items:barItem,
					grid : this,
					viewModel:viewModel
					
				}, {
					xtype : 'pagingtoolbar',
					store : this.store,
					displayInfo : true,
					prependButtons : true,
					dock : 'bottom',
					items : [{ 
					}]
				}];	
		var title = viewModel.get('tf_title');
		if(this.showTitle==true){
		this.setTitle(title);
		}
		this.rowEditing = new Ext.grid.plugin.RowEditing({
			     saveBtnText: '保存', 
                   cancelBtnText: "取消", 
					clicksToEdit : 2
				});
		this.plugins = [this.rowEditing];
		this.selType = 'rowmodel';
		this.on('edit', function(editor, e) {
			e.grid.getStore().sync({
						callback : function(data,store) {
							   e.record.commit();
							   //system.smileInfo("保存成功!")
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
				plugins : [{
					ptype : 'gridviewdragdrop',
					ddGroup : 'DD_grid_' + viewModel.get('tf_moduleName'), 
					enableDrop : false  // 设为false，不允许在本grid中拖动
					}]

			};
	var columns=new Array();
		Ext.each(this.columns,function(col){
			if(col.columnType=="basecombobox" || (col.field && col.field.xtype && col.field.xtype=="basecombobox")){
				col.renderer=function(value,data,record){
								var val=value;
								//如果该字段是可编辑的
								var ddCode=null;
								if(col.field){
									ddCode=col.field.ddCode;
								}else{
									ddCode=col.ddCode;
								}
								var ddItem=factory.DDCache.getItemByDDCode(ddCode);
								for(var i=0;i<ddItem.length;i++){
									var ddObj=ddItem[i];
									var displayField='itemName';
									var valueField='itemCode';
									if(col.field && col.field.displayField){
										displayField=column.field.displayField;
									}else if(col.displayField){
										displayField=col.displayField;
									}
									if(col.field && col.field.valueField){
										displayField=col.field.valueField;
									}else if(col.displayField){
										displayField=col.displayField;
									}
									if(value==ddObj[valueField]){
										val=ddObj[displayField];
										break;
									}
								}
								return val;
						}
			}
			columns.push(col);
		});
		this.columns=columns;
	   this.callParent(arguments);
		
   }
})