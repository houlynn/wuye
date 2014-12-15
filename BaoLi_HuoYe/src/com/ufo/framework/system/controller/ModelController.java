package com.ufo.framework.system.controller;

import java.io.IOException;
import java.io.Writer;
import java.lang.reflect.Field;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ufo.framework.common.core.utils.EntityUtil;
import com.ufo.framework.common.core.utils.JsonBuilder;
import com.ufo.framework.common.core.utils.ModelUtil;
import com.ufo.framework.common.core.utils.StringUtil;

/**
 * 模型类
 * 
 * @author 作者 yingqu:
 * @version 创建时间：2014年6月24日 上午9:45:35 version 1.0
 */
@Controller("modelAction")
@Scope("prototype")
@RequestMapping("/pcModel")
public class ModelController {

	/** Json工具类 */
	protected static JsonBuilder jsonBuilder;
	static {
		jsonBuilder = JsonBuilder.getInstance();
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

	@RequestMapping("/getModelFields")
	public void getModelFields(HttpServletResponse response,
			HttpServletRequest request) {
		String strData = "[]";
		String excludes = request.getParameter("excludes");
		excludes = excludes == null ? "" : excludes;

		String modelName = request.getParameter("modelName");
		modelName = modelName == null ? "" : modelName;

		if (StringUtil.isNotEmpty(modelName)) {
			if (!StringUtil.isNotEmpty(ModelUtil.modelJson.get(modelName))) {
				Class<?> c = EntityUtil.getClassByName(modelName);
				Field[] fields = ModelUtil.getClassFields(c, false);
				strData = jsonBuilder.getModelFileds(modelName, fields,
						excludes);
			} else {
				strData = ModelUtil.modelJson.get(modelName);
			}
		}
		toWrite(response, strData);
	}

}
