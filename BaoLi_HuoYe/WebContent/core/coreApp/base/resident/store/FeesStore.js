Ext.define('core.base.resident.store.FeesStore', {
			extend : 'Ext.data.Store',
			modulePanel : null,
			remoteSort : true,
			autoLoad : true,
			autoSync : true,
			leadingBufferZone : 100,
			buffered : false, // buffered=true可以无限下拉，但是删除和新增，reload都有问题，暂时不用
			config : {
				extraParams : {},
				navigates : []
				// 导航属性选中的情况
			},
			constructor : function(param) {
				var me = this;
				this.pageSize = 20;
				this.extraParams = {};
				this.navigates = [];
				this.sum=0;
			/*	console.log(param.modulePanel);
				// 有创建时加进来的导航约束
				if (param.modulePanel.param) {
					var dnv = param.modulePanel.param.defaultNavigateValues;
					this.setDefaultNavigates(dnv);
				}*/
				// ///////////
				this.callParent(arguments);
			},

			listeners : {
				// 调用proxy进行ajax的时候，将参数加进 store.proxy中，在调用完成后，删除掉所有的extraParams参数
				// 这样model.proxy就可以多store，互相不干扰了
				beforeprefetch : function(store) {
					for (var i in store.extraParams)
						store.proxy.extraParams[i] = store.extraParams[i];
				},
				// buffered = true ,执行的是 prefetch
				prefetch : function(store, records, successful) {
					for (var i in store.extraParams){
						delete store.proxy.extraParams[i];
					}
				},

				// buffered = false ,执行的是 load
				beforeload : function(store) {
					// console.log(store);
					for (var i in store.extraParams)
						store.proxy.extraParams[i] = store.extraParams[i];

				},

				load : function(store) {
					 var rid =store.proxy.extraParams.rid;
					 var sum=0;
		              Ext.Ajax.request({
					   url : "unite/sum.action", 
					    params :{rid:rid}, 
					    method : 'post',
					   	async:false,
					   callback : function(options, success, response) {
					    sum=response.responseText;
					    store.sum=sum;
					}
				});
					//console.log(this.modulePanel.down('modulegrid'));
					//this.modulePanel.down('gridModue').columnAutoSize();
					for (var i in store.extraParams){
						 delete store.proxy.extraParams[i];
						
					}
				}

			}

		});
