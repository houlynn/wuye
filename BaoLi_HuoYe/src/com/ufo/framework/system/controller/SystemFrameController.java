package com.ufo.framework.system.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ufo.framework.annotation.TableInfo;
import com.ufo.framework.common.core.web.ModuleServiceFunction;
import com.ufo.framework.system.ebi.SystemFrameEbi;

@Controller
@RequestMapping("/systemframe")
public class SystemFrameController {

	@Resource
	private SystemFrameEbi systemFrameService;
	
	/**
	 * 根据类名加入module 定义以及字段定义，生成grid form 的缺省
	 * 
	 * @param moduleName
	 * @return
	 */

	@RequestMapping(value = "/addmodule.do", produces = "application/json;text/plain;charset=UTF-8")
	// @Override
	public @ResponseBody
	String addModuleWithName(String moduleName) {
/*		try {
			return systemFrameService.addModuleWithName(moduleName);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}*/
	try{
		Class<?> moduleClass = ModuleServiceFunction.getModuleBeanClass(moduleName);
		if (moduleClass == null)
			return "未在指定的包中找到类:" + moduleName + "!";

		TableInfo tableDefine = (TableInfo) moduleClass.getAnnotation(TableInfo.class);
		if (tableDefine == null)
			return "未在指定的类中找到tableDefine的标注定义";

		String result = systemFrameService.addModuleWithName(moduleName, moduleClass, tableDefine);
		if (result == null) {
			// 生成此模块的字段
			systemFrameService.refreshModuleField(String.valueOf(tableDefine.id()));
			// 创建新的列表数据
			systemFrameService.createNewGridScheme(String.valueOf(tableDefine.id()), moduleClass);
			// 创建新的表单数据
			systemFrameService.createNewFormScheme(String.valueOf(tableDefine.id()), moduleClass);
		}}catch(Exception e){
			e.printStackTrace();
		}
		return null;
	}

}
