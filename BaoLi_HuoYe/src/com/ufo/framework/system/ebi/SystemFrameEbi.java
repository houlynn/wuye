package com.ufo.framework.system.ebi;

import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.ufo.framework.annotation.TableInfo;

public interface SystemFrameEbi {



	/**
	 * 根据系统类的定义刷新当前模块的字段,在新增一个module 以后也可执行此过程
	 * 
	 * @param moduleId
	 * @return
	 * @throws Exception 
	 */
	public abstract Integer refreshModuleField(String moduleId) throws Exception;

	/**
	 * 根据类名加入module 定义以及字段定义，生成grid form 的缺省
	 * 
	 * @param moduleName
	 * @return
	 * @throws Exception 
	 */

	public abstract String addModuleWithName(String moduleName,
			Class<?> moduleClass, TableInfo tableDefine) throws Exception;

	public abstract Boolean createNewGridScheme(String moduleId,
			Class<?> moduleClass) throws Exception;

	public abstract Boolean createNewFormScheme(String moduleId,
			Class<?> moduleClass) throws Exception;

	/**
	 * 
	 */
	public abstract Boolean saveGridGroupFields(String gridGroupId,
			String noderecords);

	public abstract Boolean saveFormGroupFields(String formGroupId,
			String noderecords);
	
	

	public abstract String addModuleWithName(String moduleName) throws Exception;

}