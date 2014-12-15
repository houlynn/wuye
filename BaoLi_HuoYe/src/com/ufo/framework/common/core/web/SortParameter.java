package com.ufo.framework.common.core.web;

import net.sf.json.JSONArray;
import net.sf.json.JSONSerializer;
import net.sf.json.JsonConfig;

public class SortParameter {

	private String property;

	private String direction;

	public SortParameter() {

	}

	public SortParameter(String property, String direction) {
		super();
		this.property = property;
		this.direction = direction;
	}


	/**
	 * 根据字符串生成 分组或者排序的 类
	 * 
	 * @param str
	 * @return
	 */
	public static  SortParameter[] changeToSortParameters(String str) {

		if (str != null) {
			JsonConfig config = new JsonConfig();
			config.setArrayMode(JsonConfig.MODE_OBJECT_ARRAY);
			config.setRootClass(SortParameter.class);
			return (SortParameter[]) JSONSerializer.toJava(JSONArray.fromObject(str), config);
		} else
			return null;
	}

	
	public String getProperty() {
		return property;
	}

	public void setProperty(String property) {
		this.property = property;
	}

	public String getDirection() {
		return direction;
	}

	public void setDirection(String direction) {
		this.direction = direction;
	}

	@Override
	public String toString() {
		return "SortParameter [property=" + property + ", direction=" + direction + "]";
	}

}
