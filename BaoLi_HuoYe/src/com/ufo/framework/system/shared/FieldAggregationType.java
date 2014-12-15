package com.ufo.framework.system.shared;

/**
 * 字段的聚合属性
 * 
 * @author jiangfeng
 * 
 */
public enum FieldAggregationType {

	NORMAL("normal"), COUNT("count"), SUM("sum"), AVG("avg"), MAX("max"), MIN("min"), ADDITIONCOUNT(
			"additioncount");

	private String value;

	FieldAggregationType(String value) {
		this.value = value;
	}

	public String getValue() {
		return value;
	}
}
