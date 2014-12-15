Ext.define("core.util.GridActionUtil", {
	requires : ['Ext.MessageBox', 'Ext.ux.Toast'],
	statics : {
		editRecord : function(btn,modulegrid) {
			var modueId=modulegrid.ownerCt.code;
			var viewModel=system.getViewModel(modueId);
			var window = Ext.create('core.app.view.region.BaseWindow', {
				viewModel:viewModel,
				grid:modulegrid
			});
	        console.log(modulegrid.getSelectionModel().getSelection()[0]);
	       console.log(modulegrid.getStore().getAt(0));
	       window.down('baseform').setData(modulegrid.getSelectionModel().getSelection()[0]);
	       window.show();
		},
		
		// 新增一条记录
		addRecord : function(btn) {
			var modulegrid = btn.up("modulegrid");
			var model = Ext.create(modulegrid.getStore().model);
			model.set(model.idProperty, null); // 设置主键为null,可自动
			// 插入空记录到第一条
			modulegrid.getStore().insert(0, model);
			// 编辑第一条
			modulegrid.rowEditing.startEdit(0,0); 
		},
		
		// 根据选中的记录复制新增一条记录
		addRecordWithCopy : function(grid) {
		     var sm = grid.getSelectionModel();
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
	
		},
		
		// 删除一条或多条记录
		deleteRecords : function(btn) {
			var modulegrid=btn.up("modulegrid");
			var modulePanle =modulegrid.ownerCt;
			var code=modulePanle.code;
			var module=system.getViewModel(code);
			var selection=modulegrid.getSelectionModel().getSelection();
			var message='';
			var infoMessage='';
			if (selection.length == 1) { // 如果只选择了一条
				message = ' 『' + selection[0].getNameValue() + '』 吗?';
				infoMessage = '『' + selection[0].getNameValue() + '』';
			} else { // 选择了多条记录
				message = '<ol>';
				Ext.Array.each(selection, function(record) {
							message += '<li>' + record.getNameValue() + '</li>';
						});
				message += '</ol>';
				infoMessage = message;
				message = '以下 ' + selection.length + ' 条记录吗?' + message;
			}
			var moduletitle = '<strong>' + module.get('tf_title')
					+ '</strong>';
			Ext.MessageBox.confirm('确定删除', '确定要删除 ' + moduletitle + ' 中的' + message,
					function(btn) {
						if (btn == 'yes') {
							modulegrid.getStore().remove(modulegrid.getSelectionModel().getSelection());
							modulegrid.getStore().sync();
							 Ext.toast({
										title : '删除成功',
										html : moduletitle + infoMessage + '已成功删除！',
										bodyStyle : 'background-color:#7bbfea;',
										header : {
											border : 1,
											style : {
												borderColor : '#9b95c9'
											}
										},
										border : true,
										style : {
											borderColor : '#9b95c9'
										},
										saveDelay : 10,
										align : 'tr',
										closable : true,
										minWidth : 200,
										maxheight:250,
										useXAxis : true,
										slideInDuration : 500
									});
						}
					})
		},
		
		// 用户修改了grid列表方案后执行
		gridSchemeChange : function(combo, schemeId) {
			console.log(schemeId);
			this.getView().down('modulegrid').changeGridScheme(schemeId)

		},
		
		// 选中的记录发生变化过后的事件
		selectionChange : function(view, model, selected, eOpts) {
			
			var modueId=view.ownerCt.code;
			var viewModel=system.getViewModel(modueId);
			// 设置删除按钮的状态
			view.up('modulepanel').down('toolbar button#delete')[selected.length > 0
					? 'enable'
					: 'disable']();
			// 下面将组织选中的记录的name显示在title上，有二种方案可供选择，一种是用下面的MVVM特性，第二种是调用refreshTitle()
			var selectedNames =viewModel.get("tf_title");
			if (selected.length > 0) {
				if (!!selected[0].getNameValue()){
					selectedNames = selectedNames + '　『<em>' + selected[0].getNameValue()
							+ '</em>'
							+ (selected.length > 1 ? ' 等' + selected.length + '条' : '') + '』';
				view.setTitle(selectedNames);
				}
			}
			
		},
		
		
		
		
		
	},
	

	
	
	
	
	
	
			/**
			 * 得到默认值对象
			 * 
			 * @param {}
			 *            defaultObj
			 */
			getDefaultValue : function(defaultObj) {
				var resObj={};
				for (var field in defaultObj) {
					var value = defaultObj[field];
					// @createTime@ @createUser@ @createDept@
					if (value.indexOf("@") >= 0) {
						var currentUser=comm.get("currentUser");
						if (value == "@createUser@") {
							value =currentUser.userCode ;
						} else if (value == "@createUserName@") {
							value = currentUser.username;
						} else if (value == "@createDept@") {
							value = currentUser.deptCode;
						} else if (value == "@createDeptName@") {
							value = currentUser.deptName;
						} else if (value == "@createTime@") {
							value = new Date();
						}else if(value=="@LONGTIME@"){
							value=new Date().getTime()+"";
						}
					}
					resObj[field]=value;					
				}
				return resObj;
			}
});