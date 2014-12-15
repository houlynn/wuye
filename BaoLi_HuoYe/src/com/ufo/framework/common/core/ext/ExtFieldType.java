package com.ufo.framework.common.core.ext;

/**
 * EXTJS类型模型
* @author 作者 yingqu: 
* @version 创建时间：2014年6月7日 上午11:13:59 
* version 1.0
 */
public enum ExtFieldType {

	STRING("string"), INTEGER("int"), FLOAT("float"), DATE("date"),ID("ID");

	private String name;

	private ExtFieldType(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	@Override
	public String toString() {
		return this.name;
	}

}
