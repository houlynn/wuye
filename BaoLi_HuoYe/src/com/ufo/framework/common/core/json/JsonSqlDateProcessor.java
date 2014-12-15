package com.ufo.framework.common.core.json;


/**
 * spring mvc 转从数据库取得的 date 的值
 * @author jiangfeng
 *
 */

import java.text.SimpleDateFormat;
import java.sql.Date;
import net.sf.json.JsonConfig;
import net.sf.json.processors.JsonValueProcessor;

public class JsonSqlDateProcessor implements JsonValueProcessor {

	private String format = "yyyy-MM-dd";
	
	//private SimpleDateFormat sf = new SimpleDateFormat(format);

	

	public JsonSqlDateProcessor() {
		super();
	}

	public JsonSqlDateProcessor(String format) {
		super();
		this.format = format;
	}

	@Override
	public Object processArrayValue(Object value, JsonConfig jsonConfig) {
		String[] obj = {};
		if (value instanceof Date[]) {
			Date[] dates = (Date[]) value;
			obj = new String[dates.length];
			for (int i = 0; i < dates.length; i++) {
				obj[i] = new SimpleDateFormat(format).format(dates[i]);
			}
		}
		return obj;
	}

	@Override
	public Object processObjectValue(String key, Object value, JsonConfig jsonConfig) {
		if (value == null)
			return "";
		if (value instanceof Date) {
			String str = new SimpleDateFormat(format).format((Date) value);
			return str;
		}
		return value.toString();
	}


}