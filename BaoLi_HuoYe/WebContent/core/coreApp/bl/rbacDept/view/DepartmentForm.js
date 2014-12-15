Ext.define("core.bl.rbacDept.view.DepartmentForm", {
	extend : "core.app.base.BaseForm",
	alias : "widget.bl.departmentForm",
	items : [ {
		fieldLabel : "主键",
		name : "deptId",
		hidden : true
	}
 ,
 {
		fieldLabel:"小区名称",
		name:"deptName",
		allowBlank : true,
		xtype:"textfield"
   }
 ,
 {
		fieldLabel:"小区代码",
		name:"deptCode",
		allowBlank : true,
		xtype:"textfield"
   }
 ,
 {
		fieldLabel:"城市",
		name:"city",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'城市必填',
		allowBlank : false,
		xtype:"textfield"
   },

 {
		fieldLabel:"经度纬度",
		name:"locationxy",
		beforeLabelTextTpl : comm.get('required'),
		emptyText :'经度纬度必填',
		allowBlank : false,
		xtype:"textfield"
   } 
   ,
   {
  		fieldLabel:"地理位置",
  		name:"location",
  		beforeLabelTextTpl : comm.get('required'),
  		emptyText :'地理位置必填',
  		 columnWidth:1,
  		allowBlank : false,
  		height:20,
  		xtype:"textareafield"
     }
   ,
   {
		fieldLabel:"简介",
		name:"summary",
		emptyText :'请填入小区简介',
		xtype:'textareafield',
        preventScrollbars : true,   //设置多行文本框没有滚动条显示
        columnWidth:1
  }
,
{
		fieldLabel:"小区介绍",
		name:"introduce",
		columnWidth:1,
		preventScrollbars : true,   //设置多行文本框没有滚动条显示
		emptyText :'请填入小区介绍',
		xtype:"textareafield"
  },
  {
		xtype:"tabpanel",
		columnWidth : 1,
		menuAlign:"center",
		items:[{
			title:'<center height=40>上传图片</center>',
			xtype:"bl.deptImageUrlPanel",
			height:comm.get("resolutionHeight")*0.28
		}],
		tabConfig  : {//标签配置参数
			
      }
  }
	]
});