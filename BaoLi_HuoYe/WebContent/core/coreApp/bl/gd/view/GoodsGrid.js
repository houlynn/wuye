Ext.define("core.bl.gd.view.GoodsGrid", {
	extend : "core.app.base.BaseGrid",
	alias : "widget.bl.goodsGrid",
	tbar:[
			{xtype:'button',text:'添加',ref:'gridInsertF',iconCls:'table_add',hidden:true},
			{xtype:'button',text:'添加',ref:'gridInsert',iconCls:'table_add',hidden:false},
			{xtype:'button',text:'编辑',ref:'gridEdit',iconCls:'table_edit',disabled:true},
			{xtype:'button',text:'删除',ref:'gridDelete',iconCls:'table_remove'},
			{xtype:'button',text:'保存',ref:'gridSave',iconCls:'table_save'},
			{xtype:'button',text:'发布到APP',ref:'gridPush',iconCls:'table_save'}
		],
	columns : [{
		xtype:"rownumberer",
		width : 45,
		text :'No.',
		align : 'center'
	},{
		text:"主键",
		dataIndex:"gid",
		hidden:true
	}
, {
		text:"商品名称",
		dataIndex:"name",
		width : 320,
		 columnType:"textfield",
		field:{
		xtype:"textfield",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'商品名称必填',
		allowBlank : false,
		}
	}
, {
		text:"价格",
		dataIndex:"price",
		width : 100,
		 columnType:"textfield",
		field:{
			 xtype:"textfield",
		      decimalPrecision:3,
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'价格必填',
		allowBlank : false,
		}
	}
, {
		text:"原价格",
		dataIndex:"yprice",
		width : 100,
		 columnType:"textfield",
		field:{
			 xtype:"textfield",
		      decimalPrecision:3,
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'原价格必填',
		allowBlank : false,
		}
	}, {
		text:"是否推荐商品",
	 	dataIndex:"hot",
		 width : 80,
		 columnType:"basecombobox",
	     ddCode:"ISHOTGOODS",
		 field:{
			 xtype:"basecombobox",
			ddCode:"ISHOTGOODS",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'是否推荐商品必填',
		allowBlank : false,
		}
	},{
		text:"是否包邮",
		dataIndex:"free",
		width : 80,
		 columnType:"basecombobox",
	  ddCode:"ISFREE",
		field:{
			 xtype:"basecombobox",
			ddCode:"ISFREE",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'是否包邮必填',
		allowBlank : false,
		  hideTrigger : false
		}
	}
,
 {
		text:"发布时间",
		dataIndex:"releasetime",
		width : 120,
		 columnType:"textfield",
		field:{
			 xtype:"datetimefield",
		      dateType:"date",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'发布时间必填',
		allowBlank : false,
		}
	}
, {
		text:"销量",
		dataIndex:"saleCount",
		width : 100,
		 columnType:"numberfield",
		field:{
			 xtype:"numberfield",
		      decimalPrecision:3,
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'销量必填',
		allowBlank : false,
		}
	}
, {
		text:"库存",
		dataIndex:"stock",
		width : 100,
		 columnType:"numberfield",
		field:{
			 xtype:"numberfield",
		      decimalPrecision:3,
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'库存必填',
		allowBlank : false,
		  hideTrigger : false
		}
	},{
		text:"广告词",
		dataIndex:"trip",
		width : 320,
		 columnType:"textfield",
		field:{
		xtype:"textfield",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'广告词',
		allowBlank : false,
		}},
		{
			text:"是否发布",
			dataIndex:"releases",
			width : 80,
			renderer : function(value, data, record) {
				if ("1" == value) {
					value = "<span style='color:red;font-weight:bold'>已发布</span>";
			} else {
				value = "<span style='color:green;font-weight:bold'>未发布</span>";
			}
			  return value;
		}
		}
	 ],
	store:"core.bl.gd.store.GoodsStore",
	bbar:{
		xtype:'pagingtoolbar',
		store:"core.bl.gd.store.GoodsStore",
		dock:'bottom',
		displayInfo:true
	}
});