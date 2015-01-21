package com.ufo.framework.system.controller;

import java.io.IOException;
import java.io.Writer;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.model.hibernate.system.shared.Department;
import com.model.hibernate.system.shared.EndUser;
import com.model.hibernate.system.shared.TreeBaseEntity;
import com.ufo.framework.common.constant.StringVeriable;
import com.ufo.framework.common.core.ext.TreeVeriable;
import com.ufo.framework.common.core.ext.model.JSONTreeNode;
import com.ufo.framework.common.core.utils.JsonBuilder;
import com.ufo.framework.common.core.utils.ModelUtil;
import com.ufo.framework.common.core.utils.StringUtil;
import com.ufo.framework.common.log.LogerManager;
import com.ufo.framework.common.model.Model;
import com.ufo.framework.system.ebi.Ebi;
import com.ufo.framework.system.ebi.SimpleEbi;
import com.ufo.framework.system.shared.module.DataFetchResponseInfo;
import com.ufo.framework.system.web.SecurityUserHolder;

/**
* @author HouLynn
*创建时间：2014年6月20日 下午7:51:15 version 1.0
 */
public abstract class BaseAppController implements LogerManager {
	/** 项目部署的WebRoot路径 */
	public static String webrootAbsPath;
	/** 项目部署的class路径 */
	protected static String absClassPath;
	/** Json工具类 */
	public static JsonBuilder jsonBuilder;
	/** 应用名称 */
	public static String appName;

	@Resource(name = "ebo")
	private Ebi ebi;

	public Ebi getEbi() {
		return ebi;
	}

	static {
		jsonBuilder = JsonBuilder.getInstance();
	}
	
	
	public interface PrepareResult{
		public List<?> prepare(List<?> data);
	}
	
	public void load(HttpServletRequest request, HttpServletResponse response,String modueName,PrepareResult pr ) throws Exception {
			StringBuffer hql = new StringBuffer("from " +modueName
					+ " where 1=1");
			StringBuffer countHql = new StringBuffer("select count(*) from "
					+ modueName + " where 1=1");
			String whereSql = request.getParameter("whereSql");
			whereSql = whereSql == null ? "" : whereSql;
			hql.append(whereSql);
			String parentSql = request.getParameter("parentSql");
			parentSql = parentSql == null ? "" : parentSql;
			hql.append(parentSql);
			String querySql = request.getParameter("querySql");
			querySql = querySql == null ? "" : querySql;
			hql.append(querySql);
			String orderSql = request.getParameter("orderSql");
			orderSql = orderSql == null ? "" : orderSql;
			int start = 0;
			int limit = 30;
			String startStr = request.getParameter("start");
			start = startStr == null ? 0 : Integer.valueOf(startStr);
			String limitStr = request.getParameter("limit");
			countHql.append(whereSql);
			countHql.append(querySql);
			countHql.append(parentSql);
			Integer count = ebi.getCount(countHql.toString());
			limit = limitStr == null ? limit : Integer.valueOf(limitStr);
			hql.append(orderSql);
			List<?> lists = ebi.queryByHql(hql.toString(), start, limit);
			if(pr!=null){
				lists=pr.prepare(lists);
			}
			Map<String, Object> result = new HashMap<String, Object>();
			result.put("records", lists);
			result.put("totalCount", count);
			String strData = jsonBuilder.toJson(result);
			toWrite(response, strData);
	}

	
	
	
	/**
	 * 默认的保存方法
	 */
	@RequestMapping("/doSave")
	public  void doSave(Object model, HttpServletRequest request,
			HttpServletResponse response) {
		 ebi.save(model);
		toWrite(response,jsonBuilder.returnSuccessJson(jsonBuilder.toJson(model)));
	}

	/**
	 * 默认的更新
	 * @throws Exception 
	 */
	@RequestMapping("/doUpdate")
	public void doUpdate(Model model, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
			model = ebi.update(model);
			toWrite(response,
					jsonBuilder.returnSuccessJson(jsonBuilder.toJson(model)));

	}


	/**
	 * 根据实体主键值获取实体信息
	 */
	@RequestMapping("/getInfoById")
	public void getInfoById(HttpServletRequest request,
			HttpServletResponse response,Class<?> calzz ) {
		String pkValue = request.getParameter("pkValue");
		pkValue = pkValue == null ? "" : pkValue;
		try {
			if (StringUtil.isEmpty(pkValue)) {
				toWrite(response, jsonBuilder.returnFailureJson("'得到类主键值失败'"));
				return;
			}

			Object entity =  ebi.findById(calzz, pkValue);
			toWrite(response,
					jsonBuilder.returnSuccessJson(jsonBuilder.toJson(entity)));
		} catch (Exception e) {
			e.printStackTrace();
			error("获取实体信息失败，错误信息" + e.getMessage());
			toWrite(response,
					jsonBuilder.returnFailureJson("'获取实体信息失败，错误信息"
							+ e.getMessage() + "'"));
		}
	}


	public  void toWrite(HttpServletResponse response, String contents) {
		if (ModelUtil.isNotNull(response)) {
			response.setContentType("text/html;charset=UTF-8;");
			Writer writer = null;
			try {
				response.setCharacterEncoding("UTF-8");
				writer = response.getWriter();
				writer.write(contents);
			} catch (IOException e) {
				// TODO Auto-generated catch block
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

	
	
	
	
	

}
