package com.ufo.framework.system.shared;

/**
 * 字段里用到的数据类型
 */
public enum FieldType {
	String("String"), Boolean("Boolean"), Integer("Integer"), Date("Date"), DateTime("DateTime"), Double("Double"), Float(
			"Float");

	private String value;

	FieldType(String value) {
		this.value = value;
	}

	public String getValue() {
		return value;
	}

}
