package com.ufo.framework.system.shared.module;

/**
 * 字段的聚合属性
 *
* @author HouLynn
* @date 2014年10月21日
  @version 1.0
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
