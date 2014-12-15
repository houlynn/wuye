package com.ufo.framework.system.shared.module;

import java.io.Serializable;
import java.util.List;

import com.ufo.framework.common.core.web.SortParameter;
import com.ufo.framework.system.repertory.SqlModuleFilter;
/**
 * 前台listgrid fetch 数据时，传入后台的数据
 *
* @author HouLynn
* @date 2014年10月21日
  @version 1.0
 */
@SuppressWarnings("serial")
public class DataFetchRequestInfo implements Serializable {

	private   List<SqlModuleFilter> moduleFilters;
	private String moduleId; // moduleID
	private String moduleName; // moduleName
	private Integer startRow; // 起始行
	private Integer endRow; // 终止行
	private SortParameter[] sorts; // 当前grid 的排序字段
	private Boolean isExport; // 是否是执行的导出

	private ModuleOperateType moduleOperateType; // grid 的操作类型
	
	private String tag;

	public DataFetchRequestInfo() {
		super();
	}

	public DataFetchRequestInfo(String moduleId, String moduleName, Integer startRow,
			Integer endRow, ModuleOperateType moduleOperateType) {
		super();
		this.moduleId = moduleId;
		this.moduleName = moduleName;
		this.startRow = startRow;
		this.endRow = endRow;
		this.moduleOperateType = moduleOperateType;

	}

	@Override
	public String toString() {
		return "DataFetchRequestInfo [moduleId=" + moduleId + ", moduleName=" + moduleName
				+ ", startRow=" + startRow + ", endRow=" + endRow + ", sorts=" + sorts
				+ ", isExport=" + isExport + ", moduleOperateType=" + moduleOperateType + "]";
	}


	public Integer getStartRow() {
		return startRow;
	}

	public void setStartRow(Integer startRow) {
		this.startRow = startRow;
	}

	public Integer getEndRow() {
		return endRow;
	}

	public void setEndRow(Integer endRow) {
		this.endRow = endRow;
	}


	public String getModuleId() {
		return moduleId;
	}

	public void setModuleId(String moduleId) {
		this.moduleId = moduleId;
	}

	public Boolean getIsExport() {
		return isExport == null ? false : isExport;
	}

	public void setIsExport(Boolean isExport) {
		this.isExport = isExport;
	}

	public ModuleOperateType getModuleOperateType() {
		return moduleOperateType;
	}

	public SortParameter[] getSorts() {
		return sorts;
	}

	public void setSorts(SortParameter[] sorts) {
		this.sorts = sorts;
	}

	public void setModuleOperateType(ModuleOperateType moduleOperateType) {
		this.moduleOperateType = moduleOperateType;
	}

	public String getModuleName() {
		return moduleName;
	}

	public void setModuleName(String moduleName) {
		this.moduleName = moduleName;
	}

	public List<SqlModuleFilter> getModuleFilters() {
		return moduleFilters;
	}

	public void setModuleFilters(List<SqlModuleFilter> moduleFilters) {
		this.moduleFilters = moduleFilters;
	}

	public String getTag() {
		return tag;
	}

	public void setTag(String tag) {
		this.tag = tag;
	}



}
