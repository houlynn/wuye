<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
	<%
request.setCharacterEncoding("UTF-8");
response.setCharacterEncoding("UTF-8");
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>保利小区管家管理后台</title>
<link rel="stylesheet" type="text/css"
	href="/extjs/resources/css/ext-all.css" />
<link rel="stylesheet" type="text/css"
	href="/extjs/resources/css/example.css" />
<link rel="stylesheet" type="text/css"
	href="/extjs/resources/css/TabScrollerMenu.css" />
<link rel="stylesheet" type="text/css"
	href="/extjs/resources/css/CheckHeader.css" />
<script type="text/javascript" src="<%=basePath%>extjs/ext-all-dev.js"></script>
<link type="text/css" rel="stylesheet"
	href="<%=basePath%>css/module.css">
 	 <link rel="stylesheet" type="text/css"
	href="<%=basePath%>extjs/resources/ext-theme-neptune/ext-theme-neptune-all-debug.css">
<script type="text/javascript" src="/extjs/examples.js"></script>
</head>
<script type="text/javascript">
   function changeCode (obj){  
     var d = new Date();  
      obj.src = "<%=request.getContextPath()%>/rbacUser/LoginVerifyCodeImage.action?d="+d; 
 }  
Ext.QuickTips.init();
LoginWindow = Ext.extend(
				Ext.Window,
	{
		title : '管理员登录',
		width : 450,
		height : 200,
		collapsible : true,
		closable :false,
		border : false,
		defaults : {
			border : false
		},
		buttonAlign : 'center',
		createFormPanel : function() {
			// 表单重置函数
			function reset() {
				myform.form.reset();
			}
			;
			 document.onkeydown=function(event){
			      var e = event || window.event || arguments.callee.caller.arguments[0];
			      if(e && e.keyCode==27){ // 按 Esc 
			        }
			      if(e && e.keyCode==113){ // 按 F2 
			         }            
			       if(e && e.keyCode==13){ // enter 键
			    	   subjectForm();
			      }
			  }; 
			// 表单提交函数，这个是重点，单独提取出来，与myform一个层级
			function subjectForm() {
				if (myform.getForm().isValid()) {
					myform.form.submit({
						waitMsg : '正在登录......',
						url : '/rbacUser/Login.action',
						timeout : 3000,
						success : function(form, action) {
							 	var obj=action.result.obj;
							 	console.log(obj);
							    if (action.result.success){
							    	   window.location.href =obj ;  
							    }else{
							    	Ext.Msg.alert('错误提示', obj);
							    }
						},
						failure : function(form, action) {
							form.reset();
							var obj=action.result.obj;
							switch (action.failureType) {
							case Ext.form.Action.CLIENT_INVALID:
								Ext.Msg.alert('错误提示', '表单数据非法请核实后重新输入！');
								break;
							case Ext.form.Action.CONNECT_FAILURE:
								Ext.Msg.alert('错误提示', '网络连接异常！');
								break;
							case Ext.form.Action.SERVER_INVALID:
								Ext.Msg.alert('错误提示', obj);
								form.reset();
							}
						}
					});
				}
			}
		
			var myform = new Ext.form.FormPanel({
				bodyStyle : 'padding-top:6px',
				defaultType : 'textfield',
				labelAlign : 'right',
				labelWidth : 35,
				labelPad : 2,
				height:170,
				border:false,
				frame : true,
				// frame : true,
				method : 'POST',
				buttonAlign:"center",
				// 增加表单键盘事件，键盘按键10或者13会触发subjectForm方法
				keys : [ {
					key : [ 10, 13 ],
					fn : subjectForm
				} ],
				defaults : {
					allowBlank : false,
					width : 350
				},
				items : [ {
					cls : 'user',
					name : 'userCode',
					fieldLabel : '登录帐号',
					blankText : '帐号不能为空',
				}, {
					cls : 'key',
					name : 'password',
					fieldLabel : '登录密码',
					blankText : '密码不能为空',
					inputType : 'password',
				}, {
					cls : 'key',
					name : 'verifyCode',
					id : 'randCode',
					fieldLabel : '验证码',
					width : 200,
					blankText : '验证码不能为空'
				},{  
					           xtype:'container',
				                html:'<div style="padding-left:80px" mce_style="padding-left:80px"><a href="#" mce_href="#"><img alt="如果看不清单击图片更换图片。" onclick="javascript:changeCode(this)" id="code" height="30" width="72" src="<%=request.getContextPath()%>/rbacUser/LoginVerifyCodeImage.action" mce_src="validateCodeServlet" border=0></img></a></div>',  
					            border:false  
					            }  
 ],
				buttons : [ {
					text : '确定',
					id : 'sure',
					handler : subjectForm//鼠标按键提交表单
				}, {
					text : '重置',
					id : 'clear',
					handler : reset
				} ]
			});
			return myform;
		},
	
		initComponent : function() {
			LoginWindow.superclass.initComponent.call(this);
			this.fp = this.createFormPanel();
			this.add(this.fp);
	
		}
	});

Ext.onReady(function() {
	var win = new LoginWindow();
	win.show();

});

</script>
<body>
<center>
	<div id="tr" style="margin-top: 100px; margin-left: 100px"></div>
</center>


</body>
</html>