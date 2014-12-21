package com.ufo.framework.common.core.web;

import net.sf.json.JSONArray;
import net.sf.json.JSONSerializer;
import net.sf.json.JsonConfig;

public class KeysValuesInfo {
	private String key;
	private String value;
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	public String getKey() {
		return key;
	}
	public void setKey(String key) {
		this.key = key;
	}
	public KeysValuesInfo(String key, String value) {
		super();
		this.key = key;
		this.value = value;
	}
	public KeysValuesInfo() {
	}
	
	public static KeysValuesInfo[] changeToKeysValue(String str){
		if (str != null) {
			JsonConfig config = new JsonConfig();
			config.setArrayMode(JsonConfig.MODE_OBJECT_ARRAY);
			config.setRootClass(KeysValuesInfo.class);
			return (KeysValuesInfo[]) JSONSerializer.toJava(JSONArray.fromObject(str), config);
		} else
			return null;
	}

}
