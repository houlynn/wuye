Ext.define("core.bl.rbacDept.view.DepartmentGrid", {
	extend : "core.app.base.BaseGrid",
	alias : "widget.bl.departmentGrid",
	tbar:[
			{xtype:'button',text:'详细录入',ref:'gridInsertF',iconCls:'table_add',hidden:false},
			{xtype:'button',text:'添加',ref:'gridInsert',iconCls:'table_add'},
			{xtype:'button',text:'编辑',ref:'gridEdit',iconCls:'table_remove',hidden:false},
			{xtype:'button',text:'删除',ref:'gridDelete',iconCls:'table_remove'},
			{xtype:'button',text:'保存',ref:'gridSave',iconCls:'table_save'},
			{xtype:'button',text:'地图定位',ref:'gridMap',iconCls:'table_save'}
		],
	columns : [{
		xtype:"rownumberer",
		width : 35,
		text :'No.',
		align : 'center'
	},{
		text:"主键",
		dataIndex:"deptId",
		hidden:true
	}
, {
		text:"小区名称",
		dataIndex:"deptName",
		width : 220,
		 columnType:"textfield",
		field:{
			 xtype:"textfield",
		allowBlank : true,
		  hideTrigger : false
		}
	}
, {
		text:"城市",
		dataIndex:"city",
		width : 100,
		 columnType:"textfield",
		field:{
			 xtype:"textfield",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'城市必填',
		allowBlank : false,
		  hideTrigger : false
		}
	}
, {
		text:"地理位置",
		dataIndex:"location",
		width : 580,
		 columnType:"textfield",
		field:{
			 xtype:"textfield",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'地理位置必填',
		allowBlank : false,
		  hideTrigger : false
		}
	}, {
		text:"经度纬度",
		dataIndex:"locationxy",
		width : 220,
		 columnType:"textfield",
		field:{
			 xtype:"textfield",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'经度纬度必填',
		allowBlank : false,
		  hideTrigger : false
		}
	}
	
	 ],
	store:"core.bl.rbacDept.store.DepartmentStore",
	bbar:{
		xtype:'pagingtoolbar',
		store:"core.bl.rbacDept.store.DepartmentStore",
		dock:'bottom',
		displayInfo:true
	}
});