Ext.define('core.prop.point.view.PointbonneForm', {
	extend : "Ext.form.Panel",
	alias : 'widget.pointbonne.form',
	border:!1,
	title:null,
	autoHeight:true,  
    bodyPadding: 5,
    border: false,
    autoWidth:true,
    width:600,
        fieldDefaults: {
        labelWidth: 80,
        labelAlign: "right"
    },
	buttons:[{
	text : '保存',
	itemId : 'save',
	glyph : 0xf0c7,
    style:'border-width:0 0 0 0;',
	/*handler:function(button){
			var self=this;
								var form = button.up('form');
								console.log(button.up('form').getForm().getRecord());
								button.up('form').updateRecord();
							    var store= self.up("window[xtype=point.window]").grid.getStore();
							      if (form.isValid()) {
							    		var model= button.up('form').getForm().getRecord().save();
							    		var task = new Ext.util.DelayedTask(function() {
							    			if(model.getProxy().errorInfo){
							    			console.log(model.getProxy().errorInfo);	
							    			   if( self.callback){	
							    			      self.callback(model.getProxy().errorInfo);
							    			   }
								    			return;
								    		}
								    		delete model.getProxy().errorInfo;
								    		system.smileInfo("保存成功!")
								    		store.reload();
							    	});
							    	task.delay(500);
							      }
		
	}*/},
	{
	text : '关闭',
	itemId : 'close',
	glyph : 0xf148,
	handler : function(button){
				button.up('window').hide();
	}}
	], 
	initComponent : function() {
		var me = this;
		var self = this;
		me.bodyStyle = 'padding : 5px 5px 0';
		me.callParent(arguments);
		this.getForm().reset();
	},
	items : [{
	            xtype : 'fieldset',
				autoHeight : true,
				title : '终点工信息',
				width:"100%",
				bodyStyle : 'padding : 5px 5px 5px 5px',
				items:[
				{
					 xtype: "fieldcontainer",
                    layout: "hbox",
                   items:[{
			      xtype : "textfield",
				  fieldLabel : "ID",
				  itemId:"tf_pointId",
				  name : "tf_pointId",
				  hidden:true
                   }]},
				{
				 xtype: "fieldcontainer",
                    layout: "hbox",
                    items:[{
				   xtype : "basecombobox",
				  fieldLabel : "保姆类型",
				  itemId:"tf_type",
				  name : "tf_type",
				  ddCode:"BAOMU",
				  beforeLabelTextTpl : comm.get('required'),
			       allowBlank : false,
			         flex:5,
				}]},
					{
					 xtype: "fieldcontainer",
                    layout: "hbox",
                   items:[{
					xtype : "textfield",
				  fieldLabel : "姓名",
				  itemId:"tf_name;",
				  name : "tf_name",
				  beforeLabelTextTpl : comm.get('required'),
			       allowBlank : false,
			         flex:5,
				}]},
					{
					xtype: "fieldcontainer",
                    layout: "hbox",
                   items:[{
					xtype : "basecombobox",
				  fieldLabel : "性别",
				  itemId:"tf_sex",
				  name : "tf_sex",
				  ddCode:"SEX",
				    flex:5,
				    beforeLabelTextTpl : comm.get('required'),
				     allowBlank : false,
						}]},
				{
					xtype: "fieldcontainer",
                    layout: "hbox",
                   items:[{
					xtype : "numberfield",
				   fieldLabel : "年龄",
				     flex:5,
				   name : "tf_age",
				    beforeLabelTextTpl : comm.get('required'),
				     allowBlank : false,
				}]},
					{
							xtype: "fieldcontainer",
                    layout: "hbox",
                   items:[{
					xtype : "numberfield",
				   fieldLabel : "薪资",
				     flex:5,
				   name : "tf_price",
				   beforeLabelTextTpl : comm.get('required'),
				     allowBlank : false,
			}]},
					{
							xtype: "fieldcontainer",
                    layout: "hbox",
                   items:[{
					xtype : "basecombobox",
					 ddCode:"NIANXIAN",
				   fieldLabel : "工作年限",
				     flex:5,
				   name : "tf_taex",
				   beforeLabelTextTpl : comm.get('required'),
				     allowBlank : false,
			}]},
			{
				/*	 xtype:"filefield",
				      fieldLabel : "头像",
				      name : "tf_topUrl",
				      renderer:function(){
				      
				      }*/
				      
					xtype: "fieldcontainer",
                    layout: "hbox",
                   items:[{
					 xtype:"filefield",
				      fieldLabel : "头像",
				      name : "tf_topUrl",
				      itemId:"tf_topUrl",
				      flex:5,
				      
			}]
			},
			
			
					{
							xtype: "fieldcontainer",
                    layout: "hbox",
                   items:[{
					xtype : "textareafield",
				    fieldLabel : "简历",
				    name : "tf_rmark",
				      flex:5,
				    preventScrollbars : true,   //设置多行文本框没有滚动条显示
                    columnWidth:1
			}]}
				
				]}],
								

});