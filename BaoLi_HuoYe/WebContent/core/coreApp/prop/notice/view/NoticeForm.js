Ext.define('core.prop.notice.view.PointForm', {
	extend : "Ext.form.Panel",
	alias : 'widget.notice.form',
	border:!1,
	title:null,
	autoHeight:true,  
    bodyPadding: 5,
    border: false,
    autoWidth:true,
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
				title : '公告信息',
				 growMax : 2000,
				 maxHeigth:2000,
				width:"100%",
				bodyStyle : 'padding : 5px 5px 5px 5px',
				items:[
				{
					 xtype: "fieldcontainer",
                    layout: "hbox",
                   items:[{
			      xtype : "textfield",
				  fieldLabel : "ID",
				  itemId:"tf_noticeId",
				  name : "tf_noticeId",
				  hidden:true
                   }]},
				{
				 xtype: "fieldcontainer",
                    layout: "hbox",
                    items:[{
				   xtype : "basecombobox",
				  fieldLabel : "公告等级",
				  itemId:"tf_levf",
				  name : "tf_levf",
				  ddCode:"NOTLEVF",
				  beforeLabelTextTpl : comm.get('required'),
			       allowBlank : false,
			         flex:5,
				}]},
									{
					xtype: "fieldcontainer",
                    layout: "hbox",
                   items:[{
				  fieldLabel : "发布单位",
				  xtype : "textfield",
				  itemId:"tf_souce",
				  name : "tf_souce",
				    flex:5,
				    beforeLabelTextTpl : comm.get('required'),
				     allowBlank : false,
						}]},
				
				
				
					{
					 xtype: "fieldcontainer",
                    layout: "hbox",
                   items:[{
					xtype : "textfield",
				  fieldLabel : "标题",
				  itemId:"tf_title;",
				  name : "tf_title",
				  beforeLabelTextTpl : comm.get('required'),
			       allowBlank : false,
			         flex:5,
				}]},

			
					{
					xtype: "fieldcontainer",
                    layout: "hbox",
                    autoHeight:true,  
                    growMax : 2000,
                    items:[{
					xtype : "textareafield",
				    fieldLabel : "内容",
				      grow: true,  
				     name : "tf_content",
				     flex:5,
				    preventScrollbars : true,   //设置多行文本框没有滚动条显示
                    columnWidth:1
			}]}
				
				]}],
								

});