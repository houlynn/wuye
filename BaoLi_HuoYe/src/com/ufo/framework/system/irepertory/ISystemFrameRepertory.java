package com.ufo.framework.system.irepertory;

import java.util.List;

import com.model.hibernate.system._ModuleField;

public interface ISystemFrameRepertory extends ICommonRepertory {

	/**
	 * 查找某个gridgroup是否包含某个字段
	 * 
	 * @param gridGroupId
	 * @param fieldId
	 * @param tag
	 * @return true or false
	 */
	public abstract Boolean isGridGroupHasField(Integer gridGroupId,
			Integer fieldId);

	/**
	 * 查找某个formgroup是否包含某个字段
	 * 
	 * @param gridGroupId
	 * @param fieldId
	 * @param tag
	 * @return true or false
	 */
	public abstract Boolean isFormGroupHasField(Integer formGroupId,
			Integer fieldId);

	/**
	 * 
	 * @param moduleId
	 * @return
	 */
	public abstract List<_ModuleField> get_ModuleFields(String moduleId);

	/**
	 * 在自动新增一个grid方案时，取得模块的下一个grid方案的序号
	 * 
	 * @param moduleId
	 * @return
	 */
	public abstract Integer getNextGridSchemeOrder(String moduleId);

	/**
	 * 取得一个模块的字段的最大序号
	 * 
	 * @param moduleId
	 * @return
	 */
	public abstract Integer getMaxModuleFieldId(String moduleId);

	/**
	 * 在自动新增一个Form方案时，取得模块的下一个grid方案的序号
	 * 
	 * @param moduleId
	 * @return
	 */
	public abstract Integer getNextFormSchemeOrder(String moduleId);

	/**
	 * 用户选择了 grid scheme group 的字段之后，进行保存
	 * 
	 * @param gridGroupId
	 * @param parseInt
	 * @param isSelected
	 */
	public abstract void addorDeleteGridGroupFields(int gridGroupId,
			int fieldId, Boolean isSelected);

	/**
	 * 用户选择了 form scheme group 的字段之后，进行保存
	 * 
	 * @param formGroupId
	 * @param parseInt
	 * @param isSelected
	 */
	public abstract void addorDeleteFormGroupFields(int formGroupId,
			int fieldId, Boolean isSelected);

}