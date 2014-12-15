Ext.define("core.base.101.view.PropertyCompanyGrid", {
	extend : "Ext.grid.Panel",
	alias : "widget.base.propertyCompanyGrid",
	tbar : [{
		xtype:"gridtoolbar",
		height:26,
		border:0,
		margin:"1 1 0 0 0",
	}],
		initComponent : function() {
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
					e.grid.getStore().sync({
								callback : function(data,store) {
									 e.record.commit();
								}
							});
					var proxy= e.grid.getStore().getProxy();
					var errorInfo=proxy.proxy;
					if(errorInfo){
						
					}else{
						showMsg("添加信息","添加成功!",1);
					}
				});
		this.callParent();
		},

		
		
	columns : [{
		xtype:"rownumberer",
		width : 35,
		text :'No.',
		align : 'center'
	},{
		text:"主键",
		dataIndex:"tf_proid",
		hidden:true
	}
, {
		text:"物业公司名称",
		dataIndex:"tf_name",
		width : 120,
		 columnType:"textfield",
		field:{
			 xtype:"textfield",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'物业公司名称必填',
		allowBlank : false,
		}
	}
, {
		text:"法人代表",
		dataIndex:"tf_corporate",
		width : 120,
		 columnType:"textfield",
		field:{
			 xtype:"textfield",
		allowBlank : true,
		}
	}
, {
		text:"联系人",
		dataIndex:"tf_contact",
		width : 120,
		 columnType:"textfield",
		field:{
			 xtype:"textfield",
		allowBlank : true,
		}
	}
, {
		text:"联系电话",
		dataIndex:"tf_phone",
		width : 120,
		 columnType:"textfield",
		field:{
			 xtype:"textfield",
		allowBlank : true,
		}
	}
, {
		text:"联系地址",
		dataIndex:"tf_address",
		width : 120,
		 columnType:"textfield",
		field:{
			 xtype:"textfield",
		allowBlank : true,
		}
	}
	
	 ],
	store:"core.base.101.store.PropertyCompanyStore",
	bbar:{
		xtype:'pagingtoolbar',
		store:"core.base.101.store.PropertyCompanyStore",
		dock:'bottom',
		displayInfo:true
	}
});