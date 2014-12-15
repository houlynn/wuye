Ext.define("core.bl.gd.view.GoodsForm", {
	extend : "core.app.base.BaseForm",
	alias : "widget.bl.goodsForm",
	items : [ {
		fieldLabel : "主键",
		name : "gid",
		hidden : true
	}
 ,
 {
		fieldLabel:"商品名称",
		name:"name",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'商品名称必填',
		allowBlank : false,
		xtype:"textfield"
   }
 ,
 {
		fieldLabel:"价格",
		name:"price",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'价格必填',
		allowBlank : false,
		decimalPrecision:3,
		emptyText :'请输输入小数',
		xtype:"textfield"
   }
 ,
 {
		fieldLabel:"原价格",
		name:"yprice",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'原价格必填',
		allowBlank : false,
		decimalPrecision:3,
		emptyText :'请输输入小数',
		xtype:"textfield"
   },
 {
		fieldLabel:"是否推荐商品",
		name:"hot",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'是否推荐商品必填',
		ddCode:"ISHOTGOODS",
		xtype:"basecombobox"
   }
 ,
 {
		fieldLabel:"是否发布",
		name:"releases",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'是否发布必填',
		ddCode:"ISPOST",
		xtype:"basecombobox"
   }
 ,
 {
		fieldLabel:"是否包邮",
		name:"free",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'是否包邮必填',
		allowBlank : false,
		ddCode:"ISFREE",
		xtype:"basecombobox"
   }
 ,
 {
		fieldLabel:"成分",
		name:"ingredient",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'成分',
   }
 ,
 {
		fieldLabel:"销量",
		name:"saleCount",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'请输入销量',
		allowBlank : false,
		decimalPrecision:3,
		hideTrigger : false,
		emptyText :'请输输入小数',
		xtype:"numberfield"
   }
 ,
 {
		fieldLabel:"库存",
		name:"stock",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'库存必填',
		allowBlank : false,
		decimalPrecision:3,
		hideTrigger : false,
		emptyText :'请输输入小数',
		xtype:"numberfield"
   }
 ,
 {
		fieldLabel:"运费",
		name:"moveprice",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'运费必填',
		decimalPrecision:3,
		hideTrigger : false,
		emptyText :'请输输入小数',
		xtype:"numberfield"
   }
 ,
 {
		fieldLabel:"保质期",
		name:"shelfdate",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'请输入保质期',
		xtype:"textfield"
   }
 ,
 {
		fieldLabel:"产地",
		name:"origin",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'请输入产地',
		xtype:"textfield"
   }
 ,
 {
		fieldLabel:"规格",
		name:"specification",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'请输入规格',
		xtype:"textfield"
   }
 ,
 {
		fieldLabel:"发货地",
		name:"shipfrom",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'发货地必填',
		xtype:"textfield"
   },   {
		fieldLabel:"商品简介",
		name:"remarks",
		emptyText :'请填入商品简介',
		xtype:'textareafield',
        preventScrollbars : true,   //设置多行文本框没有滚动条显示
        columnWidth:1
  },
  {
		xtype:"tabpanel",
		columnWidth : 1,
		menuAlign:"center",
		items:[{
			title:'<center height=40>上传图片</center>',
			xtype:"bl.goodImagePanel",
			height:comm.get("resolutionHeight")*0.28
		}],
		tabConfig  : {//标签配置参数
			
    }
  }
	]
});