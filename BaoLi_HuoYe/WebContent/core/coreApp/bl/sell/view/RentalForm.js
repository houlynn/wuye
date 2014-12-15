Ext.define("core.bl.sell.view.RentalForm", {
	extend : "core.app.base.BaseForm",
	alias : "widget.bl.sellForm",
	//id:"contentKindEditorForm",
	tbar:[
			{xtype:"button",text:"保存",ref:"formSave_sell",iconCls:"table_save"},
			{xtype:"button",text:"返回",ref:"formReturn",iconCls:"return"}
			],
	items : [ {
		fieldLabel : "主键",
		name : "rid",
		hidden : true
	}
 ,
 {
		fieldLabel:"面积",
		name:"area",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'面积必填',
		allowBlank : false,
		decimalPrecision:1,
		hideTrigger : false,
		emptyText :'请输输入小数',
		xtype:"numberfield"
   }
 ,
 {
		fieldLabel:"价格",
		name:"price",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'价格必填',
		allowBlank : false,
		xtype:"numberfield",
		decimalPrecision:1
   },
   {
  		fieldLabel:"出租信息",
  		name:"title",
  		beforeLabelTextTpl : comm.get('required'),
  		emptyText :'出租信息必填',
  		allowBlank : false,
  		xtype:"textfield",
  		columnWidth : 1,
     },
     {
 		fieldLabel : "简介",
	    xtype: 'extkindeditor',
		name : "sellContent",
		id:"sell_comtent",
		height:300,
		columnWidth : 1,
     },
{
		xtype : "tabpanel",
		columnWidth : 1,
		id : "salee_imgpanel",
		menuAlign : "center",
		margin : "1 1 0 99 0",
		split : true,
		items : [ {
			title : '<center height=40>上传图片</center>',
			xtype : "bl.sellImgPanel",
			height : comm.get("resolutionHeight") * 0.48
		} ],
		tabConfig : {// 标签配置参数
		}
   }
	   
   
	]
});