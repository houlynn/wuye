Ext.define("core.base.resident.view.FeeSettingFrom",{
	extend:"Ext.form.Panel",
	alias:"widget.resident.feesettingfrom",
    buttonAlign : 'center',
    autoHeight:true,  
    bodyPadding: 5,
    border: false,
    autoWidth:true,
    width:600,
    style:'border-width:0 0 0 0;',
   tbar:[
		{xtype:"button",text:"添加",ref:"addBtn",iconCls:"table_save"}
		],
    fieldDefaults: {
        labelWidth: 80,
        labelAlign: "right"
    },
   initComponent : function() {
				var me = this;
				this.buttons = [];
				var self=this;
				this.buttons.push({
							text : '设置',
							itemId : 'save',
							ref:"settingBtan",
							glyph : 0xf0c7,
							handler : function(button){
							}
						},{
							text : '取消',
							itemId : 'close',
							glyph : 0xf148,
							handler : function(button){
								button.up('window').hide();
							}
						});
				me.bodyStyle = 'padding : 5px 5px 0';
				me.callParent(arguments);
				var grid=this.down("gridpanel[xtype=resident.feesettinggrid]");
				grid.getStore().removeAll();
					this.getForm().reset();
				var model=Ext.create(grid.getStore().model);
				this.getForm().loadRecord(model);
			
			},
			
			 items: [
			 	{
			    xtype:'fieldset',  
                autoHeight:true, 
                title:'请选择选择收费项目', 
                items:[
               
                {
                    xtype: "fieldcontainer",
                    layout: "hbox",
                    items: [
                        { xtype: "moduecombobox", name: "itemId", fieldLabel: "收费标准", flex: 1, allowBlank : false,	itemId : 'feeeItemCombobox', ddCode :{
                           modeuName:"FeesInfo",
                           marking:'1',
                           identification:'1'
                        }}
                    ]
                },
                
                {
                    xtype: "fieldcontainer",
                    layout: "hbox",
                    items: [
                        {	xtype : 'datefield',submitFormat : 'Y-m-d', 	format : 'Y-m-d', allowBlank : false, name: "startdate", fieldLabel: "开始收费时间", flex: 2},
						
                    ]
                },
                
                     {
                    xtype: "fieldcontainer",
                    layout: "hbox",
                    fieldLabel:"是否有结束时间",
                    flex:5,
                    labelWidth:100,
                    items: [
                     {  xtype : "radiogroup",items:[
                         {xtype:"radiofield",fieldLabel:"有", labelWidth:30,  inputValue: "1",name:"hasEndDate", itemId:"hasEndDateTrue" },
                         {xtype:"radiofield",fieldLabel:"无",  labelWidth:30, inputValue: "0",name:"hasEndDate",checked:true,itemId:"hasEndDateFalse"}
                     ]},
                    
                        {  	xtype : 'datefield',submitFormat : 'Y-m-d', 	format : 'Y-m-d', name: "enddate", fieldLabel: "结束时间", flex: 6,itemId:"endDate",disabled:true},
                    ]
                },
                
                
                {
                xtype:'fieldset',  
                autoHeight:true, 
                title:'收费费项目列表',
                items:[{
                	 xtype: "fieldcontainer",
                    layout: "hbox",
                    items:[{
                         xtype: "resident.feesettinggrid",
                         flex: 2
                    }
                    ]}]
               
                }
            ]
			 	}
]
	
	
});