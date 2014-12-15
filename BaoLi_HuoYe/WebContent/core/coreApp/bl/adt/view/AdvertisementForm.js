Ext.define("core.bl.adt.view.AdvertisementForm", {
	extend : "core.app.base.BaseForm",
	alias : "widget.bl.advertisementForm",
	items : [ {
		fieldLabel : "主键",
		name : "adverid",
		hidden : true
	}
 ,
 {
		fieldLabel:"广告类型",
		name:"advertype",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'请填入广告类型',
		allowBlank : false,
		xtype:"textfield"
   }
 ,
 {
		fieldLabel:"标题",
		name:"title",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'请填入标题',
		allowBlank : false,
		xtype:"textfield",
		columnWidth:1
   }
 ,
 {
		fieldLabel:"内容",
		name:"msg",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'请填入内容',
		allowBlank : false,
		xtype:'textareafield',
        preventScrollbars : true,   //设置多行文本框没有滚动条显示
        columnWidth:1
   }
 ,
 {
		fieldLabel:"投放状态",
		name:"ispost",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'投放状态必填',
		allowBlank : false,
		ddCode:"TSTATE",
		xtype:"basecombobox",
		readOnly:true
   }
 ,
 {
		fieldLabel:"投放时间",
		name:"posttime",
		xtype:"datetimefield",
		readOnly:true
   }
 ,
 {
		fieldLabel:"操作人",
		name:"userid",
		xtype:"textfield",
		readOnly:true
   }
 ,
 {
		fieldLabel:"链接地址",
		name:"linkUrl",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'链接地址必填',
		allowBlank : false,
		xtype:"textfield"
   },{
		xtype:"tabpanel",
		columnWidth : 1,
		menuAlign:"center",
		items:[{
			title:'<center height=40>上传图片</center>',
			xtype:"bl.avvertiseImageUrlPanel",
			height:comm.get("resolutionHeight")*0.28
		}],
		tabConfig  : {//标签配置参数
			
      }
	   
   }
	]
});