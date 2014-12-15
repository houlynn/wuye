Ext.define("core.app.view.query.GridWindow",{
	extend:"Ext.window.Window",
	modal:true,
	maximizable:false,
	frame:false,
	title:"请选择数据",
	alias: 'widget.gridwindow',
	layout:"fit",
	width:comm.get("clientWidth")*0.6,
	height:comm.get("resolutionHeight")*0.6,
	initComponent: function(){
	 var config={
	    		querytype:"",
	    		haveButton:true,
	    		border:false,
	    		config:{
	    			tbar:[],
	    			border: false,
	    			readOnly:true
	    		}
	    	}
	  var funData=this.funData;
	  funData=Ext.apply(config,funData);
     	var items={
	   		xtype:funData.querytype,
	   		config:{}
	   	};
    
    	console.log(funData);
     	items=Ext.apply(items,funData);
	   	this.items=items;
	   	this.buttonAlign="center";
	   	if(funData.haveButton){
	   		this.buttons=[{
					text : '确定',
					ref : 'ssOkBtn',
					iconCls : 'tree_ok'
					
				},{
					text: '取消',
					ref : 'ssCancelBtn',
					iconCls : 'tree_delete'
				}];
	   	}
		this.callParent(arguments);
	}
})