/**
 * 系统主页的底部区域，主要放置用户单位信息，服务单位和服务人员信息
 */
Ext.define('core.main.view.region.Bottom', {

			extend : 'Ext.toolbar.Toolbar',

			alias : 'widget.mainbottom',
			style:'border-width:0 0 0 0;',
	   //	uses : ['app.ux.ButtonTransparent'],

			defaults : {
				xtype : 'buttontransparent'
			},

			style : 'background-color : #f6f5ec;',

			items : [{
						text :  comm.get("pro").name,
						glyph : 0xf0f7
					}, { text : comm.get("currentUser").username,
						glyph : 0xf007
					},
					 {
						text : comm.get("currentUser").deptName,
						glyph : 0xf059

					},
					'->', {
							text : "研发部",
					}, 
					 {
							text : "八二哥",
					},	
					{
					 text : '13698980',
						glyph : 0xf095
					}, {
					text : 'chuang@gzinterest.com',
						glyph : 0xf003,
						handler : function(button) {
							// 发送邮件
							var link = "mailto:" + vm.get('serviceInfo.tf_serviceEmail')
									+ "?subject=" + vm.get('userInfo.tf_userdwmc')
									+ vm.get('userInfo.tf_userName') + " 关于 "
									+ vm.get('systemInfo.tf_systemName') + " 的咨询";
							window.location.href = link;
						}
					}, {
						bind : {
							text : '©{serviceInfo.tf_copyrightOwner}'
						}
					}]
		});