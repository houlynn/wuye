<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%
	request.setCharacterEncoding("UTF-8");
	response.setCharacterEncoding("UTF-8");
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<style type="text/css">
html, body { 
height: 100%; 
margin:0px 0px 0px 0px;
} 
.titlefont{
font-size: 13pt;color: white; font-weight:bold;

/* body{height:100%; overflow:hidden; margin:0px; padding:0px;}
.box {height:100%; background:#ff0000; position:absolute; width:100%;}  */

}
.loginTitle{
font-size: 13pt;color: #3D83CC; font-weight:bold;
text-align: center;
font-size: 20px;

}


</style>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>保利物业信息管理系统</title>


 <link href="http://libs.baidu.com/bootstrap/3.0.3/css/bootstrap.min.css"
	rel="stylesheet"> 
 <script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
<script src="http://libs.baidu.com/bootstrap/3.0.3/js/bootstrap.min.js"></script>
  <link rel="stylesheet" type="text/css"
	href="/extjs/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=basePath%>extjs/ext-all-dev.js"></script>
</head>
<script type="text/javascript">
  function changeCode (obj){  
     var d = new Date();  
      obj.src = "<%=request.getContextPath()%>/rbacUser/LoginVerifyCodeImage.action?d="+d; 
 }  
Ext.QuickTips.init();
LoginWindow = Ext.extend(
		Ext.Panel,
	{
		width : 330,
		height : 320,
		collapsible : false,
		closable :false,
		border : false,
		renderTo:"loaginPanel",
		defaults : {
			border : false
		},
		buttonAlign : "center",
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
						url : "/rbacUser/Login.action",
						timeout : 3000,
						success : function(form, action) {
							 	var obj=action.result.obj;
							 	console.log(obj);
							    if (action.result.success){
							    	   window.location.href =obj ; 
							    	   this.hidden=true;
							    }else{
							    	var img=document.getElementById("code");
									changeCode(img);
							    	Ext.Msg.alert("错误提示", obj);
							    	
							    }
						},
						failure : function(form, action) {
							form.reset();
							var img=document.getElementById("code");
							changeCode(img);
							var obj=action.result.obj;
							switch (action.failureType) {
							case Ext.form.Action.CLIENT_INVALID:
								Ext.Msg.alert("错误提示", "表单数据非法请核实后重新输入！");
								break;
							case Ext.form.Action.CONNECT_FAILURE:
								Ext.Msg.alert("错误提示", "网络连接异常！");
								break;
							case Ext.form.Action.SERVER_INVALID:
								Ext.Msg.alert("错误提示", obj);
								form.reset();
							}
						}
					});
				}
			}
		
			var myform = new Ext.form.FormPanel({
				bodyStyle : "padding-top:6px",
				defaultType : "textfield",
				labelWidth : 35,
				cls:"well",
				labelPad : 2,
				height:"100&",
				border:false,
				frame : false,
				height : 320,
				// frame : true,
				method : "POST",
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
				items : [
				         {
				        	
				             xtype:"fieldcontainer",
				             flex:1,
				                  items:[{
				                	  width : 350,
				                	  flex:1,
				                	  textalign:"center",
				            	  xtype:"label",
				            	  html:"<h3 class='loginTitle'>用户登陆</h3>"
				                    }]
				         },
					     {
					     xtype:"fieldcontainer",
					     flex:1,
					             items:[{
					            	 flex:1,
					            	 labelAlign:"right",
						         cls : "user",
						         name : "userCode",
						           fieldLabel : "登录帐号",
						            blankText : "帐号不能为空",
						            xtype:"textfield"
					               }]
					},
					{
						 xtype:"fieldcontainer",
						 flex:1,
							items:[{
								 flex:1,
								 labelAlign:"right",
							cls : "key",
							name : "password",
							fieldLabel : "登录密码",
							blankText : "密码不能为空",
							  xtype:"textfield",
							inputType : "password",
							}]
						},
						{
							 xtype:"fieldcontainer",
							 flex:1,
							 items:[{
								 flex:1,
									cls : "key",
									labelAlign:"right",
									name : "verifyCode",
									id : "randCode",
									fieldLabel : "验证码",
									 xtype:"textfield",
									blankText : "验证码不能为空"
								},
								 {  
							           xtype:"container",
						                html:'<div style="padding-left:80px" mce_style="padding-left:80px"><a href="#" mce_href="#"><img alt="如果看不清单击图片更换图片。" onclick="javascript:changeCode(this)" id="code" height="30" width="72" src="<%=request.getContextPath()%>/rbacUser/LoginVerifyCodeImage.action" mce_src="validateCodeServlet" border=0></img></a></div>',  
							            border:false  
							            }  ]
							
						}
					
				      
                ],
				buttons : [ {
					text : "确定",
					id : "sure",
					cls:'btn btn-primary',
					handler : subjectForm//鼠标按键提交表单
				}, {
					text : "重置",
					id : "clear",
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
<%--
<body>
<center>
	<div id="tr" style="margin-top: 100px; margin-left: 100px"></div>
</center> --%>
<body>

	   <div style="height:8%;background: #3D83CC; margin-top: 0px">
			  <div class="span12" align="center"style="text-align: center; line-height: 58px;">
				<span class="titlefont">保利物业信息管理系统 </span> <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
				<span class="titlefont">关于我们</span> <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
				<span class="titlefont">联系我们</span> <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
				<span class="titlefont">020 -869-86385</span>
			  </div>
		</div>
		
		
		<div style="height:67%; background-image: url('/platform/login/images/bg.jpg'); background-repeat: no-repeat; background-size: 100% 100%;">
			   <div class="row-fluid" style="margin-top: 0px; margin-left: -0px; height: 310pt">
				  <div class="span12" style="padding-top: 65px; margin-left: 350px;" id="loaginPanel">
				
				</div>
			 </div>
		</div>
		
		<div style="height: 20%;background: white;" align="center">
		 <table style="margin-top: 0px">
		   <tr>
		     <td align="center" width="200px" >
		      <input type="image" src="/platform/login/images/appicon.png" height="120" width="120" title="保利小区管家下载"/><br>
		       <font size="1.8pt">保利小区管家APP下载</font> 
		     </td>
		      <td align="center" width="200px">
		     <input type="image" src="/platform/login/images/firefox.png" height="120" width="120" title="火狐浏览器下载"/><br>
		       <font size="1.8pt">火狐浏览器下载</font> 
		     </td>
		     <td align="center" width="200px">
		     <input type="image" src="/platform/login/images/chrome.png" height="120" width="120" title="谷歌浏览器下载"/><br>
		       <font size="1.8pt">谷歌浏览器下载</font> 
		     </td>
		   </tr>
		 </table>
	</div>
	
<div  style="height:5%;background: #EEEEEE; margin-top: 0px" ;align="center" >
		<div class="span12" style="height:30pt;" align="center">
		 <font size="1"    color="#A9A9A9">广州英趣科技有限公司 &nbsp;&nbsp;&nbsp;Copyright 2015</font><br>
		 <font></font>
		</div>
	</div>
	
	
</body>
</html>