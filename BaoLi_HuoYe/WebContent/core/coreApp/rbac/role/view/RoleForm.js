Ext.define("core.rbac.role.view.RoleForm",{
	extend:"Ext.form.Panel",
	alias:"widget.role.roleform",
	layout:"auto",
	align:"left",
	frame:true,
	title:"角色信息",
	border:false,
	defaults : {
				selectOnFocus : true,
				msgTarget : "side", // 提示信息现在的位置
				width : 680
			},
	items:[{
		      xtype : 'fieldset',
		      autoHeight : true,
			  title : "填写角色信息",
			  items : [
			{
				xtype:"textfield",
				fieldLabel:"主键",
				name:"roleId",
				hidden:true
			},{
			 xtype : "fieldcontainer",
			 layout : "hbox",
			  items : [
			  {
				xtype:"textfield",
				fieldLabel:"角色名称",
				name:"roleName",
				allowBlank : false,
				 flex: 1
			}]},
			{
			 xtype : "fieldcontainer",
			 layout : "hbox",
			  items : [
				{
				flex: 1,
				xtype:"textfield",
				fieldLabel:"角色编码",
				name:"roleCode",
				allowBlank : false
			}]},
			{
			 xtype : "fieldcontainer",
			 layout : "hbox",
			  items : [
			  {
			  	flex: 1,
				xtype:"numberfield",
				fieldLabel:"排序",
				name:"orderIndex"
			}]},
				{
				xtype:"button",
				ref:"submit",
				 flex: 0.2,
				 width : 80,
				text:"保存"
			},
			]
	}]
});