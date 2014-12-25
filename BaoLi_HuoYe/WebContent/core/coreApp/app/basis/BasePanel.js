Ext.define('core.app.basis.BasePanel', {
	extend : 'Ext.container.Container',
	alias:"widget.ufopanel",
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
	      code:00
   	    }
	   	Ext.apply(funData,this.funData);
   	    this.funData=funData;	
   	    if(this.funData.showTitle==false){
		this.title=null;
		this.tools=null;
		}
	   this.callParent(arguments);
    }
});