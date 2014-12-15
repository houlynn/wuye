Ext.define("core.app.view.form.BaseQueryLoad",{
	extend:"Ext.form.TwinTriggerField",
	alias: 'widget.basequeryLoad',
	/*initComponent : function(){
		  this.callParent(arguments);
        this.on('specialkey', function(f, e){
            if(e.getKey() == e.ENTER){
                this.onTrigger2Click();
            }
        }, this);
    },
    validationEvent:false,
    validateOnBlur:false,
    trigger1Class:'x-form-clear-trigger',
    trigger2Class:'x-form-search-trigger',
    hideTrigger1:true,
    width:180,
    hasSearch : false,
    paramName : 'query',
    onTrigger1Click : function(){
        //if(this.hasSearch){
            this.el.dom.value = '';
            this.triggers[0].hide();
            this.hasSearch = false;
        //}
    },
    onTrigger2Click : function(){
        var v = this.getRawValue();
        if(v.length < 1){
            this.onTrigger1Click();
            return;
        }
        this.hasSearch = true;
        this.triggers[0].show();
		this.callParent(arguments);
		////http://download.csdn.net/download/leecho571/6398897
	}*/
});

