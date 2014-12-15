Ext.define("core.bl.rbacDept.view.DepartmentPanel",{
	extend:"core.app.base.BasePanel",
	alias:"widget.bl.departmentPanel",
	funCode:"department_main",
	autoScroll : false,
	funData:{
	        action:"/rbacDept", //请求Action
	        whereSql:"",//表格查询条件
	        orderSql:"operatingTime",//表格排序条件
	        pkName:"deptId",
	        modelName:"com.model.hibernate.system.shared.Department",//实体全路径
	        tableName:"Department",//表名
	        defaultObj:{enabled:"1"},//默认信息，用于表格添加的时候字段默认值
	        isChildren:false,//是否子功能
	        children:[{//子功能的配置
	        	funCode:"deptImageUrl_main"	        	
	        }]
	        
	},
		items:[{
		xtype:"basecenterpanel",
				items:[{
					xtype:"basequerypanel",
					region:"north",
					items:[
					       {xtype:"basequeryfield",
								queryType:"textfield",
								fieldLabel:"小区名称",
								name:"deptName",
								config:{
								}},
								{
									xtype:"basequeryfield",
									queryType:"textfield",
									fieldLabel:"城市",
									name:"city",
									config:{
									}
								}
					       
					       
			]
			},{
			xtype:"bl.departmentGrid",
			region:"center",
			}]
	},{
	xtype:"bl.departmentForm",
		hidden:true
	}]
});
