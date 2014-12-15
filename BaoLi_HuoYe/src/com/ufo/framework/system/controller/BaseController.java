package com.ufo.framework.system.controller;
import java.util.HashMap;
import java.util.Map;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import com.ufo.framework.common.log.LogerManager;
import com.ufo.framework.system.ebi.Ebi;
import com.ufo.framework.system.ebi.ModelEbi;
import com.ufo.framework.system.repertory.SqlModuleFilter;
import com.ufo.framework.system.shared.module.DataFetchResponseInfo;
@RequestMapping(value = "/app")
public class BaseController  implements LogerManager{
/** Json工具类 */
	@Resource(name="ebo")
	private Ebi ebi;
	public void setEbi(Ebi ebi) {
		this.ebi = ebi;
	}
	public Ebi getEbi() {
		return ebi;
	}
	@Resource
	private ModelEbi moduleService;
	
	/**
	 * 根据前台的请求取得数据
	 * @throws Exception 
	 */
	@RequestMapping(value = "/fetchdata", method = RequestMethod.GET)
	public @ResponseBody
	Map<String, Object> fetchData(String moduleName, Integer start, Integer limit, String sort,
			String query, String columns, String navigates, String parentFilter,
			HttpServletRequest request) throws Exception {
		DataFetchResponseInfo response = moduleService.fetchDataInner(moduleName, start, limit, sort,
				query, columns, navigates, parentFilter, (SqlModuleFilter) null, request);
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("records", response.getMatchingObjects());
		result.put("totalCount", response.getTotalRows());
		return result;
	}
	
	
	
/*	
	
	
	
	
	
	
	
	*//** ------------开始封装通用方法------------------ *//*
	*//**
	 * 默认的读取方法
	 *//*
	@RequestMapping("/load")
	public void load(
		    	@RequestParam(value="whereSql",required=false,defaultValue="") String whereSql,
		    	@RequestParam(value="parentSql",required=false,defaultValue="") String parentSql,
		    	@RequestParam(value="querySql",required=false,defaultValue="") String querySql,
		    	@RequestParam(value="orderSql",required=false,defaultValue="orderIndex") String orderSql,
		    	@RequestParam(value="start",required=false,defaultValue="0") String start,
		    	@RequestParam(value="limit",required=false,defaultValue="25") String limit,
		    	@RequestParam(value="moduleName",required=true ) String simpleName,
		    	HttpServletResponse response
			) {
		
		try {
			StringBuffer hql = new StringBuffer(" from "+simpleName + " where 1=1 ");
			StringBuffer countHql = new StringBuffer("select count(*) from "
					+ simpleName + " where 1=1");
			hql.append(whereSql);
			hql.append(parentSql);
			hql.append(querySql);
			countHql.append(whereSql);
			countHql.append(querySql);
			countHql.append(parentSql);
			
			Integer count =  ebi.getCount(countHql.toString()).intValue();
			hql.append(orderSql);
			List<?> rows =  ebi.queryByHql(hql.toString(), Integer.valueOf(start),Integer.valueOf(limit));
			String strData = jsonBuilder.buildObjListToJson(new Long(count),
					rows, true);
			toWrite(response, strData);
		} catch (Exception e) {
			e.printStackTrace();
			error("默认读取方法出错，错误信息：" + e.getMessage(),e);
		}
	}

	*//**
	 * 默认的保存方法
	 *//*
	@RequestMapping("/doSave")
	public void doSave(M model,BindingResult br, HttpServletRequest request,HttpServletResponse response) {
		this.getModel(request, model);
		try {
			if (model instanceof BaseEntity) {
				// 构建创建信息
				// 保存实体
				buildModelCreateInfo((BaseEntity) model, request, response);
				model = (M) ebi.save(model);
				toWrite(response,
						jsonBuilder.returnSuccessJson(jsonBuilder.toJson(model)));
			} else {
				this.error("实体信息获取错误");
				toWrite(response, jsonBuilder.returnFailureJson("'传入的实体信息错误'"));
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			this.error("保存方法出错，错误信息" + e.getMessage(),e);
			toWrite(response,
					jsonBuilder.returnFailureJson("'保存方法出错，错误信息"
							+ e.getMessage() + "'"));
		}
	}

	*//**
	 * 默认的更新
	 *//*
	@RequestMapping("/doUpdate")
	public void doUpdate(M model, BindingResult br, HttpServletRequest request,
			HttpServletResponse response) {
		this.getModel(request, model);
		try {
			if (model instanceof BaseEntity) {
				buildModelModifyInfo(request, response, (BaseEntity) model);
				model = (M) ebi.formUpdate(model);
				toWrite(response,
						jsonBuilder.returnSuccessJson(jsonBuilder.toJson(model)));
			} else {
				this.error("实体信息获取错误");
				toWrite(response, jsonBuilder.returnFailureJson("'传入的实体信息错误'"));
			}
		} catch (Exception e) {
			e.printStackTrace();
			this.error("更新方法出错，错误信息" + e.getMessage(),e);
			toWrite(response, jsonBuilder.returnFailureJson("'传入的实体信息错误'"));
		}
	}

	*//**
	 * 默认的删除方法
	 *//*
	@RequestMapping("/doRemove")
	public void doRemove(M model,
			@RequestParam(value="ids",required=false,defaultValue="") String ids,
			@RequestParam(value="pkName",required=false,defaultValue="") String pkName,
			HttpServletRequest request,
			HttpServletResponse response) {
		this.getModel(request, model);
		try {
			if (StringUtil.isNotEmpty(ids)) {
				String[] idArray = ids.split(StringVeriable.STR_SPLIT);
				String idsStr = StringUtil.fromArrayToStr(idArray);
				if (StringUtil.isEmpty(pkName)) {
					pkName = ModelUtil.getClassPkName(model.getClass());
				}
				if (StringUtil.isEmpty(pkName)) {
					toWrite(response,
							jsonBuilder.returnFailureJson("'得到类主键名失败'"));
				}else
				{
					ebi.deleteBatchById(model.getClass(), pkName, idsStr);
					toWrite(response,
							jsonBuilder.returnSuccessJson("'" + idArray.length
									+ "条记录被删除'"));
				}
			} else {
				toWrite(response, jsonBuilder.returnFailureJson("'传入ids为空'"));
			}
		} catch (Exception e) {
			e.printStackTrace();
			toWrite(response, jsonBuilder.returnFailureJson("'删除失败，失败信息:"+e.getMessage()+"'"));
		}
	}

	*//**
	 * 默认的表格的更新方法
	 *//*
	@RequestMapping("/doUpdateList")
	public void doUpdateList(
			@RequestParam(value="strData",required=false,defaultValue="") String strData,
			@RequestParam(value="ids",required=false) String[] ids,
			HttpServletRequest request,
			HttpServletResponse response) {
		 [{sql:"update EndUser set name='zsp'"},{}]
		ExecuteResult result=new ExecuteResult();
		result.setSuccess(false);
		try {
			String[] updateSqls = jsonBuilder.jsonSqlToString(strData);
			ebi.executeBatchHql(updateSqls);
			toWrite(response,
					jsonBuilder.returnSuccessJson("'" + updateSqls.length
							+ "条记录被更新'"));
		} catch (Exception e) {
			e.printStackTrace();
			this.error("批量更新失败，错误信息:" + e.getMessage(),e);
			toWrite(response,
					jsonBuilder.returnFailureJson("'批量更新失败，错误信息："
							+ e.getMessage() + "'"));
		}
	}

	*//**
	 * 根据实体主键值获取实体信息
	 *//*
	@RequestMapping("/getInfoById")
	public void getInfoById(
			@RequestParam(value="pkValue",required=false,defaultValue="") String pkValue,
			HttpServletRequest request,
			HttpServletResponse response) {
		try {
			if (StringUtil.isEmpty(pkValue)) {
				toWrite(response, jsonBuilder.returnFailureJson("'得到类主键值失败'"));
				return;
			}else
			{
				M entity = (M) ebi.findById(clazz, pkValue);
				toWrite(response,
						jsonBuilder.returnSuccessJson(jsonBuilder.toJson(entity)));
			}
		} catch (Exception e) {
			e.printStackTrace();
			this.error("获取实体信息失败，错误信息" + e);
			toWrite(response,
					jsonBuilder.returnFailureJson("'获取实体信息失败，错误信息"
							+ e.getMessage() + "'"));
		}
	}

	*//**
	 * 默认的读取树形方法
	 *//*
	@RequestMapping("/getTree")
	public void getTree(
			@RequestParam(value="node",required=false,defaultValue="") String node,
			@RequestParam(value="nodeId",required=false,defaultValue="") String nodeId,
			@RequestParam(value="whereSql",required=false,defaultValue="") String whereSql,
			@RequestParam(value="expanded",required=false,defaultValue="") Boolean expanded,
			@RequestParam(value="excludes",required=false,defaultValue="") String excludes,
			HttpServletRequest request, 
			HttpServletResponse response) {
		TreeBaseEntity model = this.getTreeModel();
		if (model != null && model instanceof TreeBaseEntity) {
			Class<?> c = model.getClass();
			 得到根节点ID
			if (!(StringUtil.isNotEmpty(node) && node
					.equalsIgnoreCase(TreeVeriable.ROOT))) {
				node = TreeVeriable.ROOT;
			}
			if (StringUtil.isNotEmpty(nodeId)) {
				node = nodeId;
			}
			 得到表名
			String entityName = c.getSimpleName();
			 得到模版类
			JSONTreeNode template = ModelUtil.getJSONTreeNodeTemplate(c);
			try {
				 递归查询出集合
				List<JSONTreeNode> lists = ebi.getTreeList(node, entityName,
						whereSql, template, expanded);
				 构建成树形节点对象
				JSONTreeNode root = ebi.buildJSONTreeNode(lists, node);
				String strData = "";
				if (node.equalsIgnoreCase(TreeVeriable.ROOT)) {
					strData = jsonBuilder.buildList(root.getChildren(),
							excludes);
				} else {
					List<JSONTreeNode> alist = new ArrayList<JSONTreeNode>();
					alist.add(root);
					strData = jsonBuilder.buildList(root.getChildren(),
							excludes);
				}
				toWrite(response, strData);
			} catch (Exception e) {
				e.getStackTrace();
				e.printStackTrace();
			}

		}

	}

	protected TreeBaseEntity getTreeModel() {
		return new Department();
	}

	protected void toWrite(HttpServletResponse response, String contents) {
		if (ModelUtil.isNotNull(response)) {
			response.setContentType("text/html;charset=UTF-8;");
			Writer writer = null;
			try {
				response.setCharacterEncoding("UTF-8");
				writer = response.getWriter();
				writer.write(contents);
			} catch (IOException e) {
				 TODO Auto-generated catch block
				e.printStackTrace();
			} finally {
				try {
					writer.flush();
					writer.close();
					response.flushBuffer();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}

	*//**
	 * 构建创建的实体信息
	 * 
	 * @param model
	 * @throws Exception 
	 *//*

	protected void buildModelCreateInfo(BaseEntity entity,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		 登录人信息获取 ,从安全上下文中获取当前用户信息
		EndUser currentUser = SecurityUserHolder.getCurrentUser();
		if (StringUtil.isEmpty(currentUser.getUserCode())) {
			response.sendRedirect("/login.jsp");
		}

		 /
		Date now = new Date();
		String dateStr = DateUtil.formatDateTime(now);
		entity.setCreateUser(currentUser.getUserCode());
		entity.setCreateDept(currentUser.getDeptCode());
		entity.setCreateTime(dateStr);
		ebi.getOrderIndex(entity);

	}



	*//**
	 * 构建修改的实体信息
	 * 
	 * @param model
	 * @throws Exception 
	 *//*
	protected void buildModelModifyInfo(HttpServletRequest request,
			HttpServletResponse response, BaseEntity entity) throws Exception {
		EndUser currentUser = SecurityUserHolder.getCurrentUser();
		if ("GUEST".equals(currentUser.getUserCode())) {
			response.sendRedirect("/login.jsp");
		}
		Department currentDept = currentUser.getDepartment();
		Date now = new Date();
		String dateStr = DateUtil.formatDateTime(now);
		entity.setModifyUser(currentUser.getUserCode());
		entity.setModifyDept(currentDept.getDeptCode());
		entity.setUpdateTime(entity.getModifyTime());
		entity.setModifyTime(dateStr);
		ebi.getOrderIndex(entity);
	}

	public abstract M getModel(HttpServletRequest request, M model);
}
*/
}