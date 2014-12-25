Ext.define('core.app.basis.BasePanel', {
	extend : 'Ext.container.Container',
	alias:"widget.ufopanel",
	funCode:"",
	layout:"border",
    initComponent : function() {
   	       var self=this;
   	        var  funData={
	             api:{
	                read : 'rest/module/fetchdata.do',
		            update : 'rest/module/update.do',
			        create : 'rest/module/create.do',
			       destroy : 'rest/module/remove.do'
	        },
	      showTitle:false,
	      code:!0,
	      navigateShow:true,
	      navigatesStore:false,
	      navigates:[],
   	    }
	   	Ext.apply(funData,this.funData);
   	    this.funData=funData;	
   	    if(this.funData.showTitle==false){
		this.title=null;
		this.tools=null;
		}
		if(this.funData.navigateShow&&funData.navigateShow==true){
						var viewModel=system.getViewModel(this.funData.code);
						var navigate=	{
						xtype : 'modulenavigate', // 导航区域
						region : 'west',
						title: "\u5bfc\u822a",
						width : 250,
						//defaultNavigateValues: this.param ? this.param.defaultNavigateValues: null,
                       // parentFilter: this.parentFilter,
						collapsible : true,
						collapsed : true,
						split : true,
						collapseMode : 'mini', // 折叠陷藏模式
						module : viewModel.data,
						itemId:this.funCode+"navigate"
					}
					 this.items.push(navigate);
		}
		
	   this.callParent(arguments);
    }
});