package com.ufo.framework.system.shared.module.grid;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.ufo.framework.system.repertory.SqlModuleFilter;
import com.ufo.framework.system.shared.TreeNodeRecord;

/**
 * 所有对grid 有filter 的数据
 *
* @author HouLynn
* @date 2014年10月21日
  @version 1.0
 */
@SuppressWarnings("serial")
public class GridFilterData implements Serializable {

	// 输入查找框的文字
	private String searchText;

	// 当前显示的字段列表,传回去，可以把要查找的全局文字只对下列字段进行查找
	private String[] gridColumnNames ;
	
	
	// 当前显示的字段的信息，用于导出excel 中使用到
	private List<GridFieldInfo> gridFieldInfos ;
	
	// 当前显示方案名称
	private String listGridSchemaName;

	// 每个导航tree的选中值
	private Map<String, TreeNodeRecord> navigateTreeSelected = new HashMap<String, TreeNodeRecord>();

	// 父模块的 module 以及筛选值
	private SqlModuleFilter parentModuleFilter;

	// 加在每个字段上的筛选值
	private Map<String, String> eachFieldFilter = new HashMap<String, String>();

	// group field
	private String groupFieldName;

	public GridFilterData() {

	}

	@Override
	public String toString() {
		return "GridFilterData [searchText=" + searchText + ", gridColumnNames="
				+ gridColumnNames + ", navigateTreeSelected=" + navigateTreeSelected
				+ ", parentModuleFilter=" + parentModuleFilter + ", eachFieldFilter="
				+ eachFieldFilter + ", groupFieldName=" + groupFieldName + "]";
	}

	// 取得当前选中的树的导航的 所有title 值，用于显示在标题上，以后可以改成一个hyperlink 可以单击来查看
	public String getNavigateTreeSelectedAllTitle() {
		String result = "";
		if (navigateTreeSelected.size() != 0) {
			Iterator<String> key = navigateTreeSelected.keySet().iterator();
			while (key.hasNext()) {
				String string = (String) key.next();
				TreeNodeRecord record = navigateTreeSelected.get(string);
				result = result + " 『" + record.getText() + "』";
			}
		}
		return result;

	}

	// 取得当前选中的树的导航的 所有title 以及模块 值，用于显示导出的excel中加入条件
	public List<String> getTreeFilterTextList() {
		List<String> result = new ArrayList<String>();
		if (navigateTreeSelected.size() != 0) {
			Iterator<String> key = navigateTreeSelected.keySet().iterator();
			while (key.hasNext()) {
				String string = (String) key.next();
				TreeNodeRecord record = navigateTreeSelected.get(string);
				result.add( record.getModuleName() + ":" + record.getText()) ;
			}
		}
		return result;

	}
	
	
	/**
	 * 根据系统模块来取得是否navigate 中有包含moduleName 的导航记录
	 * @param moduleName
	 * @return
	 */
	
	public TreeNodeRecord getSelectedTreeNodeRecordWithModuleName(String moduleName) {
		if (navigateTreeSelected.size() != 0) {
			Iterator<String> key = navigateTreeSelected.keySet().iterator();
			while (key.hasNext()) {
				String string = (String) key.next();
				TreeNodeRecord record = navigateTreeSelected.get(string);
				if (record.getModuleName().equals(moduleName))
					return record;
			}
		}
		return null;
	}

	public String getSearchText() {
		return searchText;
	}

	public void setSearchText(String searchText) {
		this.searchText = searchText;
	}

	public String[] getGridColumnNames() {
		return gridColumnNames;
	}

	public void setGridColumnNames(String[] gridColumnNames) {
		this.gridColumnNames = gridColumnNames;
	}

	public Map<String, TreeNodeRecord> getNavigateTreeSelected() {
		return navigateTreeSelected;
	}

	public void setNavigateTreeSelected(Map<String, TreeNodeRecord> navigateTreeSelected) {
		this.navigateTreeSelected = navigateTreeSelected;
	}



	public SqlModuleFilter getParentModuleFilter() {
		return parentModuleFilter;
	}

	public void setParentModuleFilter(SqlModuleFilter parentModuleFilter) {
		this.parentModuleFilter = parentModuleFilter;
	}

	public Map<String, String> getEachFieldFilter() {
		return eachFieldFilter;
	}

	public void setEachFieldFilter(Map<String, String> eachFieldFilter) {
		this.eachFieldFilter = eachFieldFilter;
	}

	public String getGroupFieldName() {
		return groupFieldName;
	}

	public void setGroupFieldName(String groupFieldName) {
		this.groupFieldName = groupFieldName;
	}

	public String getListGridSchemaName() {
		return listGridSchemaName;
	}

	public void setListGridSchemaName(String listGridSchemaName) {
		this.listGridSchemaName = listGridSchemaName;
	}

	public List<GridFieldInfo> getGridFieldInfos() {
		return gridFieldInfos;
	}

	public void setGridFieldInfos(List<GridFieldInfo> gridFieldInfos) {
		this.gridFieldInfos = gridFieldInfos;
	}




}
