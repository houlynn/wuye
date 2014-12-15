Ext.define("core.sys.icon.view.IconGrid",{
	extend:"core.app.base.BaseGrid",
	alias:"widget.icon.icongrid",
	columns:[{
		xtype:"rownumberer",
		width : 35,
		text :'No.',
		align : 'center'
	},{
		text:"主键",
		dataIndex:"id",
		hidden:true
	
	},{
		text:"图标",
		dataIndex:"icon",
		renderer:function(value,data,record){
			var pixel=record.get("pixel");
			var width=16;
			var height=16;
			if(pixel){
				Ext.each(pixel.split("*"),function(v,index){
					if(index==0){
						width=v*1;	
					}else{
						height=v*1;
					}
				});
			}
		 	return "<img src='"+value+"' width="+width+" height="+height+" />";
		}
	},{
		text:"名称",
		dataIndex:"iconName"
	},{
		text:"IconCls",
		dataIndex:"iconCls"
	},{
		text:"像素",
		dataIndex:"pixel"
	},{
		text:"下载",
		dataIndex:"icon",
		renderer:function(value,data,record){
			return "<a href='"+value+"' target='_blank'>附件下载</a>";
		}
		
	},{
		text:"描述",
		dataIndex:"remark",
		width:300
	}],
	store:"core.sys.icon.store.IconStore",
	bbar:{
		xtype:'pagingtoolbar',
		store:"core.sys.icon.store.IconStore",
		dock:'bottom',
		displayInfo:true
	}
});