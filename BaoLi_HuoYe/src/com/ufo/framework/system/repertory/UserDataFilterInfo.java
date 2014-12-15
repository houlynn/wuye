package com.ufo.framework.system.repertory;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.model.hibernate.system._Module;

/**
 *  存放该用户对module 的数据的过滤信息,有了过滤信息，需要在生成的sql中加入
* @author HouLynn
* @date 2014年10月21日
  @version 1.0
 */
@SuppressWarnings("serial")
public class UserDataFilterInfo implements Serializable {

	private _Module module;

	private String mode; // 方式，可以是 包括，和不包括 ,还未用到

	private List<String> keys; // 主键的列表
	private List<String> titles; // 主键的名称值，可以用来显示及打印

	public UserDataFilterInfo(_Module module) {
		this.module = module;
		keys = new ArrayList<String>();
		titles = new ArrayList<String>();

	}

	/**
	 * 生成where子句中的条件 field like "00% or field like "0023%" 或者 field in
	 * ('1,'2','3');
	 * 
	 * @return
	 */
	public String getSqlWhere() {
		String keyfieldname = module.getTableAsName() + "." + module.getTf_primaryKey();
		String result = "";
		if (module.isCodeLevel()) // 如果是分级的，那么用like %
			for (String s : keys)
				result = result + (result == "" ? "" : " or ") + keyfieldname + " like '"
						+ s.replaceAll("'", "") + "%' ";
		else {
			for (String s : keys)
				result = result + (result == "" ? "" : " , ") + "'" + s.replaceAll("'", "")+ "'";
			result = keyfieldname + " in (" + result + ")";
		}
		return " (" + result + ") ";
	}

	@Override
	public String toString() {
		return "UserDataFilterInfo [module=" + module.getTf_title() + ", mode=" + mode + ", keys="
				+ keys + ", titles=" + titles + "]";
	}

	public _Module getModule() {
		return module;
	}

	public void setModule(_Module module) {
		this.module = module;
	}

	public List<String> getKeys() {
		return keys;
	}

	public void setKeys(List<String> keys) {
		this.keys = keys;
	}

	public List<String> getTitles() {
		return titles;
	}

	public void setTitles(List<String> titles) {
		this.titles = titles;
	}

}
