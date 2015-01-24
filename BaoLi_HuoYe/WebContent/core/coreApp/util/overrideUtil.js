/**
 * 字段基类加载的时侯增加funCode属性
 */
Ext.override(Ext.form.field.Base,{
    onRender : function() {
        var me = this;
        var form = me.up('baseform');
        if(form){
            me.funCode=form.funCode;
        }
        me.callParent(arguments);
     } 
});

/**
 * 字段基类加载的时侯增加funCode属性
 */
Ext.override(Ext.form.field.Base,{
    fieldSubTpl: [ 
        '<input id="{id}" type="{type}" {inputAttrTpl}',
            ' size="1"', 
            '<tpl if="name"> name="{name}"</tpl>',
            '<tpl if="value"> value="{value}"</tpl>',
            '<tpl if="placeholder"> placeholder="{placeholder}"</tpl>',
            '<tpl if="maxLength !== undefined"> maxlength="{maxLength}"</tpl>',
            '<tpl if="readOnly"> readonly="readonly"</tpl>',
            '<tpl if="disabled"> disabled="disabled"</tpl>',
            '<tpl if="tabIdx"> tabIndex="{tabIdx}"</tpl>',
            '<tpl if="fieldStyle"> style="{fieldStyle}<tpl if="readOnly">;background:#E6E6E6;</tpl>"</tpl>',
        ' class="{fieldCls} {typeCls} {editableCls}" autocomplete="off"/>',
        {
            disableFormats: true
        }
    ]    
})

/**
 * 重写数值框字段，设置默认和最小值
 */
Ext.override(Ext.form.field.Number,{
	value:0,
	minValue:0
})
/**
 * 重写baseForm
 */
Ext.override(Ext.form.Basic,{  
    constructor :  function(owner, config){
        var me = this;
        //增加只读所有字段的方法
        me.setItemsReadOnly = function(flag){
            var fs = this.getFields();
            fs.each(function(f){
                if(!f.initialConfig.readOnly){
                    f.setReadOnly(flag);                    
                }
            })
        };
        me.callParent(arguments);
    },
    //如果是功能配置的form则只获取当前form下的字段
    getFields : function(){
        var fields = this._fields;
        if (!fields) {
            fields = this._fields = Ext.create('Ext.util.MixedCollection');
            if(this.owner.funCode){
                fields.addAll(this.owner.query('[isFormField][funCode='+this.owner.funCode+']'));
            }else{
                fields.addAll(this.owner.query('[isFormField]'));
            }
        }
        return fields
    }
});


/**
 * 增加按钮的点击前点击后事件
 */
Ext.override(Ext.button.Button,{
    initComponent: function() {
        var me = this;
        if(!Ext.isEmpty(me.handler) && Ext.isString(me.handler)){
            me.handler = eval(me.handler);
        }
        me.addEvents('beforeclick','clicked');
        me.callParent(arguments);
    },
    onClick : function(e){
        var me = this;
        if (me.preventDefault || (me.disabled && me.getHref()) && e) {
            e.preventDefault();
        }
        if (e.button !== 0) {
            return;
        }
        if (!me.disabled) {
            if (me.enableToggle && (me.allowDepress !== false || !me.pressed)) {
                me.toggle();
            }
            if (me.menu && !me.hasVisibleMenu() && !me.ignoreNextClick) {
                me.showMenu();
            }
            var flag = me.fireEvent('beforeclick', me, e);//单击前
            if(flag != false){
                me.fireEvent('click', me, e);
                if (me.handler) {
                    me.handler.call(me.scope || me, me, e);
                }
                me.onBlur();
            }else{
            	me.onBlur();
            }
            me.fireEvent('clicked', me, e);//单击后
        }
    }
});
/**附件字段的改造*/
Ext.override(Ext.form.field.File,{  
	setReadOnly : function(readOnly){
		var me = this;
		if(me.buttonEl)me.buttonEl.setVisible(!readOnly);//隐藏浏览按钮
        me.callParent(arguments);
	},
	buttonText: '浏览',
	setValue : function(v){
        var me = this;
        var inputEl = me.inputEl;
		var data = {docName : ''};
		if(!Ext.isEmpty(v)){
			//截取文件名
			var index = v.lastIndexOf('/');
			if(index == -1){
				index = v.lastIndexOf('\\');
			}
			var fn = v.substring(index+1,v.length);
			data.docName=fn;
			
		}
		v = Ext.value(v,'');
		data.address=v;
		//如果没有附件，则以自己本身的值作为路径
		data.address = Ext.value(data.address,v);
		me.fileData = data;
        if (inputEl && me.emptyText && !Ext.isEmpty(value)) {
            inputEl.removeCls(me.emptyCls);
        }
		if(inputEl){
			inputEl.dom.value = Ext.value(data.docName,v);
		}
        me.callParent(arguments);
        me.applyEmptyText();
	},
	afterRender: function(){
		var me = this;
        me.callParent();
        //下载链接
		var html = "<a style='color : red;' href = '#' target='_black'></a>";
		
		me.hiddenEl = me.bodyEl.insertHtml('afterBegin',html,true);
		me.inputEl.dom.onclick = function(){
			if(me.fileData && !Ext.isEmpty(me.fileData.address)){
				window.open(me.fileData.address);
			}
		};
		me.inputEl.dom.style.textDecoration = 'underline';
		me.inputEl.dom.style.color = 'blue';
    },
    getText : function(){
    	return this.fileData.docName;
    }
});

Ext.override(Ext.grid.RowEditor,
	    {
	      addFieldsForColumn : function(column, initial) {
		  var me = this, i, length, field;
		  if (Ext.isArray(column)) {
		      for (i = 0, length = column.length; i < length; i++) {
			   me.addFieldsForColumn(column[i], initial);
		      }
		      return;
		   }
		if (column.getEditor) {
		      field = column.getEditor(null, {
			                        xtype : 'displayfield',
						getModelData : function() {
								return null;
						}
			       });
		   if (column.align === 'right') {
		      field.fieldStyle = 'text-align:right';
		   }
		   if (column.xtype === 'actioncolumn') {
		    field.fieldCls += ' ' + Ext.baseCSSPrefix+ 'form-action-col-field';
		   }
		   if (me.isVisible() && me.context) {
		      if (field.is('displayfield')) {
			  me.renderColumnData(field, me.context.record,column);
			} else {
			  field.suspendEvents();
			  field.setValue(me.context.record.get(column.dataIndex));
			  field.resumeEvents();
			}
		    }
	            if (column.hidden) {
		        me.onColumnHide(column);
		    } else if (column.rendered && !initial) {
		        me.onColumnShow(column);
		    }

		    // -- start edit
		    me.mon(field, 'change', me.onFieldChange, me);
		    // -- end edit
	         }
	   }
	});
