Ext.define("core.bl.rbacDept.controller.DepartmentController",{
	extend:"Ext.app.Controller",
	init:function(){
		var self=this
		//事件注册
		this.control({
			"basegrid button[ref=gridUpload]":{
				click:function(btn){
					Ext.getBody().mask('正在处理中....');
					//得到组件
					var baseGrid=btn.up("basegrid");						
					var store=baseGrid.getStore();
					var funCode=baseGrid.funCode;
					var basePanel=baseGrid.up("basepanel[funCode="+funCode+"]");
					//得到配置信息
					var funData=basePanel.funData;
					//处理特殊默认值
					var insertObj={};
					/**----------------主子功能处理开始----------------------*/
					if(funData.isChildren){
						//得到主功能的记录
						var mainRecord=basePanel.mainRecord;
						var parentObj={};
						if(funData.connectFields){
							Ext.each(funData.connectFields,function(connectField){
								if(connectField.foreignKey){
									parentObj[connectField.foreignKey]=mainRecord[connectField.mainFieldCode];
								}else{
									parentObj[connectField.childFieldCode]=mainRecord[connectField.mainFieldCode];
								}
							});
						}
						insertObj=Ext.apply(insertObj,parentObj);
					}
					var contentObj=basePanel.contentObj;
					insertObj=Ext.apply(insertObj,contentObj);
					 var win=Ext.create("Ext.window.Window",{
							modal : true,
							maximizable : false,
							resizable:false,
							frame : false,
							title : "文件上传",
							alias : 'widget.mapWindow',
							layout : "fit",
							width : 700,
							height : 130,
							items:{
								xtype:'bl.deptImageUrlForm',
								id:"fielForm"
							}});
					 win.show();
				 var from=Ext.getCmp("fielForm");
					var formObj=from.getForm();
				 var btnUpload= from.down("button[ref=formUpload]");
				 console.log(insertObj)
				 btnUpload.on("click",function(btn){
						formObj.submit({
							url:funData.action+"/uploadField.action",
							params:insertObj,
							//可以提交空的字段值
							submitEmptyText:true,
							//成功回调函数-
							success:function(form,action){
								var obj=action.result.obj;
								if(action.result.success){
									 Ext.MessageBox.alert("提示",'上传成功!');
										var store=baseGrid.getStore();
										var proxy=store.getProxy();
										proxy.extraParams.parentSql=" and dept='"+insertObj.foreignKey+"'";
										store.load();		
								}}
						});
					 
				 });
					//执行回调函数
					if(btn.callback){
						btn.callback();
					}
					  Ext.getBody().unmask();	
					
					
					
				}
			},
			"basegrid button[ref=gridMap]":{
				click:function(btn){
					//得到组件
					var baseGrid=btn.up("basegrid");
					var funCode=baseGrid.funCode;
					var basePanel=baseGrid.up("basepanel[funCode="+funCode+"]");
					var baseForm=basePanel.down("baseform[funCode="+funCode+"]");
					//得到选中数据
					var rescords=baseGrid.getSelectionModel().getSelection();
					var funData=basePanel.funData;
					var location='广州';
					var data={};
					if(rescords.length==1){							
						data=rescords[0].data;
						location=data.location;
					}else{
						return ;
					}
				 var win=Ext.create("Ext.window.Window",{
						modal : true,
						maximizable : false,
						resizable:false,
						frame : false,
						title : "使用地图定位",
						alias : 'widget.mapWindow',
						layout : "fit",
						width : comm.get("clientWidth") * 0.6,
						height : comm.get("resolutionHeight") * 0.8,
						items:[
						       {
						    		xtype : 'panel',
									id : 'mapPanel',
									html :'<div id="container" style="position: absolute; margin-top:1px; width: 100%;  height: 100%;   top: 1;   border: 1px solid gray;   overflow:hidden;"> </div>"', 
								    afterRender:function(){
								    var self=this;
								    var map = new BMap.Map("container");
								    this.location=location;
								    this.updateObj=data;
								    this.locationxy='0,0';
								    this.city='广州';
								    this.showLocationInfo=function(pt, rs,marker){
				　 　 　 　 　 　 　 　 　 　 　 　 	      var opts = {  
										    	          width : 250,     //信息窗口宽度  
										    	          height: 100,     //信息窗口高度  
										    	          title : "采集经度维度"  //信息窗口标题  
										    	       }  
										    	        var addComp = rs.addressComponents;  
										    	        var addr = "当前位置：" + addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber + "<br/>";  
										    	        addr += "纬度: " + pt.lat + ", " + "经度：" + pt.lng;  
										    	        var infoWindow = new BMap.InfoWindow("<p style='font-size:14px;'>" + addr + "</p>", opts);  //创建信息窗口对象  
										    	        marker.openInfoWindow(infoWindow);  
										    	        var city=Ext.getCmp("map_city");
										     	        var point=Ext.getCmp("map_point");
										    	        addr += "纬度: " + pt.lat + ", " + "经度：" + pt.lng;  
										    	        this.locationxy= pt.lat + "," +pt.lng;
										    	        city.setText("<font color='red'>"+addComp.city+"</font>");
										    	        this.city=addComp.city;
										    	        point.setText("<font color='green'>"+"纬度: " + pt.lat + ", " + "经度：" + pt.lng+"</font>");
				　 　 　 　 　 　 　 　 　 　 　 　 　 　 　};
				　 　 　 　 　 　 　 　 　 　 　 this.localSearch=function(keyWord){
				　 　 　 　 　 　 　 　 　 　 　 　 	       var mapPanel=Ext.getCmp("mapPanel")
											   var map = new BMap.Map("container");
				　 　 　 　 　 　 　 　 　 　 　 　 	       
				　 　 　 　 　 　 　 　 　 　 　 　 	       
				　 　 　 　 　 　 　 　 　 　 　 　 	       
				　 　 　 　 　 　 　 　 　 　 　 　 	       
				　 　 　 　 　 　 　 　 　 　 　 　 	       
											    var localSearch = new BMap.LocalSearch(map);
											    localSearch.enableAutoViewport(); //允许自动调节窗体大小
											    map.clearOverlays();//清空原来的标注
											    map.addControl(new BMap.NavigationControl());  //添加默认缩放平移控件
									    	    map.addControl(new BMap.ScaleControl());///地图显示比例的控件，默认在左下方
									    	    map.addControl(new BMap.MapTypeControl());///地图显示比例的控件，默认在左下方
									    	    map.addControl(new BMap.OverviewMapControl({ isOpen: true, anchor: BMAP_ANCHOR_BOTTOM_RIGHT }));   //右下角，打开
									    	    var gc = new BMap.Geocoder();//地址解析类  
											    localSearch.setSearchCompleteCallback(function (searchResult) {
											        var poi = searchResult.getPoi(0);
											        console.log(poi.point.lng + "," + poi.point.lat);
											        map.centerAndZoom(poi.point, 15);
											        var marker = new BMap.Marker(new BMap.Point(poi.point.lng, poi.point.lat));  // 创建标注，为要查询的地方对应的经纬度
											        map.addOverlay(marker);
											        marker.enableDragging();
											        //标注拖拽后的位置
											        marker.addEventListener("dragend", function (e) {
											            gc.getLocation(e.point, function(rs){  
											            	mapPanel.showLocationInfo(e.point, rs,marker);  
											              });  
											        });
											        
											        marker.addEventListener("click", function (e) {
											        	 gc.getLocation(e.point, function(rs){  
											        		 mapPanel.showLocationInfo(e.point, rs,marker); 
											            });  
											        });
											        // marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
											    });
											    localSearch.search(keyWord);
				　 　 　 　 　 　 　 　 　 　 　 　   };
				　 　 　 　 　 　 　 　 　 　 　 　   
				　 　 　 　 　 　 　 　 　 　 　 　   this.localSearch(location);
				　 　 　 　 　 　 　 　 　 　 　 　   

										}	
						       }
						       ],
						
						tbar:[{
							 text:'小区地址'
						}, {
							xtype:"textfield",
							width:180,
							emptyText:"请输入小区地址",
							id:"keWord",
							afterRender:function(){
								var me=this;
								this.setValue(location);
							}
							
							
						},
						  {
							 xtype:"button",
							 text:'查询',
							 handler:function(btn){
								 var mapPanel=Ext.getCmp("mapPanel");
								 var keyWord=Ext.getCmp("keWord").getValue();
								 alert(keyWord);
								  mapPanel.localSearch(keyWord);
							 }
							
						},{
							text:'城市',
							id:"map_city"	
						},{
							text:'经度维度',
						   id:"map_point"		
						},
						,{
							text:'请确定',
							 handler:function(btn){
								 var mapPanel=Ext.getCmp("mapPanel");
								 var obj=mapPanel.updateObj;
								 var parentObj={locationxy:mapPanel.locationxy,city:mapPanel.city}
								 obj=Ext.apply(obj,parentObj);
								 var url="/rbacDept/doUpdate.action";
									Ext.Ajax.request({
										url:url,
										method:'POST',
										params:obj,
										timeout:4000,
										async:false,//很关键 我不需要异步操作
										success:function(response,opts){
											var  ddItem = Ext.decode(response.responseText);
											if(ddItem.success){
												 Ext.MessageBox.alert("提示",'录入成功!');
													var store=baseGrid.getStore();
													store.load();	
											}
											
										}
									});
								 
								 
								 
								 
							 }
							
						}
									
						
						]
						
						

						
					});
				 win.show();
				}
			}
		});
	},
	views:[
	"core.bl.rbacDept.view.DepartmentGrid",
	"core.bl.rbacDept.view.DepartmentPanel",
	"core.bl.rbacDept.view.DepartmentForm",
	"core.bl.deptimg.view.DeptImageUrlGrid",
	"core.bl.deptimg.view.DeptImageUrlPanel",
	"core.bl.deptimg.view.DeptImageUrlForm"
	],
	stores:[
	        "core.bl.rbacDept.store.DepartmentStore",
	        "core.bl.deptimg.store.DeptImageUrlStore"
		]
});