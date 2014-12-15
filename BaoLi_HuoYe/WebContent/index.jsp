<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<%
	request.setCharacterEncoding("UTF-8");
	response.setCharacterEncoding("UTF-8");
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE HTML>
<html>
<head>
<base href="<%=basePath%>">
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>后台管理</title>
<link type="text/css" rel="stylesheet"
	href="<%=basePath%>css/font-awesome.css">
<script type="text/javascript" src="<%=basePath%>extjs/ext-all-dev.js"></script>
<link type="text/css" rel="stylesheet"
	href="<%=basePath%>css/module.css">
<link rel="stylesheet" type="text/css"
	href="<%=basePath%>extjs/resources/ext-theme-neptune/ext-theme-neptune-all-debug.css">
<script type="text/javascript" src="/extjs/ext-lang-zh_CN.js"></script>
<link rel="shortcut icon" href="/platform/login/images/favicon.ico" />
<link rel="stylesheet" type="text/css"
	href="/extjs/resources/css/example.css" />
<link rel="stylesheet" type="text/css"
	href="/extjs/resources/css/TabScrollerMenu.css" />
<link rel="stylesheet" type="text/css"
	href="/extjs/resources/css/CheckHeader.css" />
<link rel="stylesheet" type="text/css" href="/MyDesktop/css/desktop.css" />
<link rel="stylesheet" type="text/css" href="/core/css/comm.css" />
<link rel="stylesheet" type="text/css" href="/core/css/icon.css" />
<link rel="stylesheet" type="text/css"
	href="<%=request.getContextPath()%>/plugin/swfupload/UploadPanel.css" />
<link type="text/css" rel="stylesheet" href="styles/index.css">
<link type="text/css" rel="stylesheet" href="styles/module.css">
<link type="text/css" rel="stylesheet" href="styles/clearbutton.css">
<link type="text/css" rel="stylesheet" href="styles/toggleslide.css">
<link type="text/css" rel="stylesheet" href="styles/boxSelect.css">
<link type="text/css" rel="stylesheet" href="styles/data-view.css">
<link type="text/css" rel="stylesheet"
	href="extjs/ux/grid/css/GridFilters.css">
<link type="text/css" rel="stylesheet"
	href="extjs/ux/grid/css/RangeMenu.css">
<script type="text/javascript"
	src="<%=request.getContextPath()%>/plugin/swfupload/swfupload.js"></script>
<script type="text/javascript" src="/extjs/examples.js"></script>
<script type="text/javascript" src="/core/coreApp/util/overrideUtil.js"></script>
<script type="text/javascript" src="/core/loader.js"></script>
<script type="text/javascript" src="/core/coreApp/util/cookies.js"></script>
<script type="text/javascript" src="/core/coreApp/util/comm.js"></script>
<script type="text/javascript" src="/core/app.js"></script>
<link rel="stylesheet" href="/kindeditor/themes/default/default.css" />
<link rel="stylesheet" href="/kindeditor/plugins/code/prettify.css" />
<script charset="utf-8" src="/kindeditor/kindeditor.js"></script>
<script charset="utf-8" src="/kindeditor/lang/zh_CN.js"></script>
<script charset="utf-8" src="/kindeditor/plugins/code/prettify.js"></script>
<style type="text/css">
.addr-panel .x-grid-header-ct {
	border-width: 1px 0 0 0 !important;
}

，.addr-panel .x-panel-header {
	border-width: 0;
}
。
</style>
</head>
<body>
	<script type="text/javascript">
	//加载分辨率大小
	var clientWidth = document.body.clientWidth;
	var clientHeight = document.body.clientHeight;
	var screenWidth = document.body.scrollWidth;
	var screenHeight = document.body.scrollHeight;
	var resolutionHeight = window.screen.height;
	var resolutionWidth = window.screen.width;
	comm.add("clientWidth", clientWidth);
	comm.add("clientHeight", clientHeight);
	comm.add("screenWidth", screenWidth);
	comm.add("screenHeight", screenHeight);
	comm.add("resolutionWidth", resolutionWidth);
	comm.add("resolutionHeight", resolutionHeight);

	</script>
</body>
</html>