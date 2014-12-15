Ext.define("core.base.101.controller.PropertyCompanyController",{
	extend:"Ext.app.Controller",
	init:function(){
		var self=this
		//事件注册
		this.control({
			
			  "navigatetree tool[type=pin]": {
                                click: function(e) {
                                        e.setVisible(!1),
                                        e.ownerCt.down("tool[type=unpin]").setVisible(!0);
                                        var t = e.up("navigatetree");
                                        t.setCascading(!1)
                                }
                        },
                        "navigatetree tool[type=unpin]": {
                                click: function(e) {
                                        e.setVisible(!1),
                                        e.ownerCt.down("tool[type=pin]").setVisible(!0);
                                        var t = e.up("navigatetree");
                                        t.setCascading(!0)
                                }
                        },
                        "navigatetree tool[type=collapse]": {
                                click: function(e) {
                                        e.up("navigatetree").collapseAll(),
                                        e.up("navigatetree").setLevel(1)
                                }
                        },
                        "navigatetree tool[type=expand]": {
                                click: function(e) {
                                        e.up("navigatetree").expandToNextLevel()
                                }
                        }
                
			
			
			
		});
	},
	views:[
	],
	stores:[
		]
});