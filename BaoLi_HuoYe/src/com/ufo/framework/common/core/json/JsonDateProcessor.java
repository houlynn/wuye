package com.ufo.framework.common.core.json;

import java.text.SimpleDateFormat;
import java.util.Date;
import net.sf.json.JsonConfig;
import net.sf.json.processors.JsonValueProcessor;
import net.sf.json.util.CycleDetectionStrategy;

public class JsonDateProcessor implements JsonValueProcessor {
	private String format = "yyyy-MM-dd";
	//private String formatHs = "yyyy-MM-dd HH.mm";
	//private SimpleDateFormat sf = new SimpleDateFormat(format);
	//private SimpleDateFormat sfHs = new SimpleDateFormat(formatHs);

	public final static JsonConfig us_jsonConfig = getJsonConfig();

	private static JsonConfig getJsonConfig() {
		JsonConfig jsonConfig = new JsonConfig();
		jsonConfig.setIgnoreDefaultExcludes(false);
		jsonConfig.setCycleDetectionStrategy(CycleDetectionStrategy.LENIENT);
		jsonConfig.registerJsonValueProcessor(java.util.Date.class, new JsonDateProcessor());
		jsonConfig.registerJsonValueProcessor(java.sql.Date.class, new JsonSqlDateProcessor());
		jsonConfig.registerJsonValueProcessor(java.sql.Timestamp.class, new JsonTimestampProcessor());
		return jsonConfig;
	}

	public JsonDateProcessor() {
		super();
	}

	public JsonDateProcessor(String format) {
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
			Date d = (Date) value;
			String str;
			// if (d.getHours() + d.getSeconds() + d.getMinutes() == 0 )
			str = new SimpleDateFormat(format).format(d);
			// else
			// str = sfHs.format(d);
			return str;
		}
		return value.toString();
	}

}