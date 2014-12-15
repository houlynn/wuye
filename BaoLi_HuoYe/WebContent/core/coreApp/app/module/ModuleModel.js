Ext.define('core.app.module.ModuleModel', {
	data : {
		tf_moduleId : null, // 模块ID号：一个数字的ID号，可以根据此ID号的顺序将相同分组的模块放在一块。
		tf_ModuleGroup : null,// 模块分组：模块分到哪个组里，比如说业务模块1、业务模块2、系统设置、系统管理等。
		tf_moduleName : null, // 模块标识：系统中唯一的模块的标识
		tf_title : null,// 模块名称：能够描述此模块信息的名称。
		tf_glyph : null, // 图标字符值
		tf_shortname : null,// 模块简称：如果名称过长，有些地方可以用简称来代替。
		tf_englishName : null,// 模块英文名称：万一要制作英文版，可以用英文名称。
		tf_englishShortName : null, // 模块英文简称：可以用作生成编码字段。
		tf_description : null,// 模块描述：
		tf_remark : null,
		// 备注：

		// 下面还有若干字段未加入，以后用到的时候再加入
		tf_primaryKey : null, // 主键
		tf_nameFields : null, // 可用于描述记录的字段

		// 此模块的自定义字段，此处先用手工定义，以后换成从数据库中自动取得
		tf_fields : [],

		// 模块的grid方案，可以定义多个方案
		tf_gridSchemes : [],

		// 模块的form方案，可以定义多个方案
		tf_formSchemes : [],
		tf_moduleGridNavigates:[],

		selectedNames : '' // 选中的记录的names显示在title上
},
	formulas : {
		// 模块grid方案的选择Combo是否显示
		gridSchemeHidden : function(get) {
			return this.get('tf_gridSchemes').length <= 1;
		}

	},
	// 根据字段id,找到字段相应的定义
	getFieldDefine : function(fieldId) {
		var result = null;
		Ext.Array.each(this.data.tf_fields, function(field) {
					if (field.tf_fieldId == fieldId) {
						result = field;
						return false;
					}
				});
		return result;
	},
	get:function(key){
		return this.data[key];
	},
	set:function(key,value){
		 this.data[key]=value;
	}
});