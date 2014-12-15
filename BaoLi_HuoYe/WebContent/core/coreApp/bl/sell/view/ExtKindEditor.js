Ext.define("core.bl.sell.view.ExtKindEditor",{
		extend : 'Ext.form.field.TextArea',
		alias : 'widget.extkindeditor',
		initComponent : function() {
			this.html = "<textarea id='" + this.getId() + "-input' name='" + this.name + "'></textarea>";
			this.callParent(arguments);
			var self=this;
			this.inputEL = Ext.get(this.getId() + "-input");
			this.on('render',self.initEditor,self);
			//self.down("textarea[name="+this.name+"]")
	/*		this.on("boxready", function(t) {
				this.inputEL = Ext.get(this.getId() + "-input");
				this.editor = KindEditor.create('textarea[name="' + this.name + '"]', {
					width : t.getWidth()+4,
					height : t.getHeight()-4,
					cssPath : '../plugins/code/prettify.css',
					uploadJson : '../jsp/upload_json.jsp',
					fileManagerJson : '../jsp/file_manager_json.jsp',
					allowFileManager : true,
					afterCreate : function() {
					}
			
					//items : ['source', '|', 'undo', 'redo', '|', 'preview', 'print', 'template', 'code', 'cut', 'copy', 'paste', 'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript', 'superscript', 'clearhtml', 'quickformat', 'selectall', '|', 'fullscreen', '/', 'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|', 'image', 'flash', 'media', 'table', 'hr', 'emoticons', 'pagebreak', 'anchor', 'link', 'unlink']
				});
			});*/
			this.on("resize",function(t,w,h){
				this.editor.resize(w+4,h-4)
				
			});
		},
		
		   initEditor:function(){
			   this.inputEL = Ext.get(this.getId() + "-input");
				this.editor = KindEditor.create('textarea[name="' + this.name + '"]', {
					width : 300,//t.getWidth()+4,
					height : 400,//t.getHeight()-4,
					cssPath : '../plugins/code/prettify.css',
					uploadJson : '../jsp/upload_json.jsp',
					fileManagerJson : '../jsp/file_manager_json.jsp',
					allowFileManager : true,
					afterCreate : function() {
					}});
			   
		        console.log("init");
		        var me = this;
		   /*     var textarea = me.down('textarea[name=content]').getEl().dom;
		        K = KindEditor;*/
		        me.editor;
		    },
		setValue : function(value) {
			if (this.editor) {
				console.log(value);
				this.editor.html(value);
			}
		},
		reset : function() {
			if (this.editor) {
				this.editor.html('');
			}
		},
		setRawValue : function(value) {
			if (this.editor) {
				this.reset();
				this.editor.text(value);
			}
		},
		getValue : function() {
			if (this.editor) {
				return this.editor.html();
			} else {
				return ''
			}
		},
		getRawValue : function() {
			if (this.editor) {
				return this.editor.text();
			} else {
				return ''
			}
		}
/*	    onRender : function(ct, position){     
            Ext.form.TextArea.superclass.onRender.call(this, ct, position);  
            this.fieldId = this.fieldName+'KindEditor';  
            var parentEle = $(this.el.dom).parent();  
            this.height = isNaN(this.fieldHeight) ? 200 : this.fieldHeight;  
            parentEle.empty()  
            var random = Math.random();  
            parentEle.append("<iframe id="+this.fieldId+  
            " name="+this.fieldId+  
            " height="+this.height+  
            " width=97% src=jsp/editor.jsp?ran="+random+  
            " frameborder=0 scrolling=no marginwidth=0 marginheight=0></iframe>"+  
            " <form action='jsp/editor.jsp?ran="+random+  
            "' id="+this.fieldId+"Form method=post target="+this.fieldId+  
            " style='display: none;'>"+  
            "   <textarea name='editorValue'></textarea>"+  
            "   <input type='submit'/>"+  
            " </form>");  
      
        },  
        getValue : function(){  
            //这里可能存在延迟，所以，如果如果没有数据，不管即可，反正在读取的时候，肯定有值  
            var func = window.frames[this.fieldId].getValueForEditor;  
            if(func){  
                return window.frames[this.fieldId].getValueForEditor();  
            }else{  
                return "";  
            }  
        },   
        setValue : function(v){  
            //直接通过请求方式传递，首先读取父页面的editorForm对象  
            var editorForm = document.getElementById(this.fieldId+"Form");  
            editorForm.editorValue.value = v;  
            editorForm.submit();  
        }  */
	});

