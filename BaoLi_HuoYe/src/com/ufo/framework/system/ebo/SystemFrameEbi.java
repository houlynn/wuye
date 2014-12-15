package com.ufo.framework.system.ebo;


import com.ufo.framework.annotation.TableInfo;
import com.ufo.framework.system.irepertory.IModelRepertory;

public interface SystemFrameEbi {

	public abstract IModelRepertory getModuleDAO();

	public abstract void setModuleDAO(IModelRepertory moduleDAO);

	/**
	 * 根据系统类的定义刷新当前模块的字段,在新增一个module 以后也可执行此过程
	 * 
	 * @param moduleId
	 * @return
	 */
	public abstract Integer refreshModuleField(String moduleId);

	/**
	 * 根据类名加入module 定义以及字段定义，生成grid form 的缺省
	 * 
	 * @param moduleName
	 * @return
	 */

	public abstract String addModuleWithName(String moduleName,
			Class<?> moduleClass, TableInfo tableDefine);

	public abstract Boolean createNewGridScheme(String moduleId,
			Class<?> moduleClass);

	public abstract Boolean createNewFormScheme(String moduleId,
			Class<?> moduleClass);

	/**
	 * 
	 */
	public abstract Boolean saveGridGroupFields(String gridGroupId,
			String noderecords);

	public abstract Boolean saveFormGroupFields(String formGroupId,
			String noderecords);

}