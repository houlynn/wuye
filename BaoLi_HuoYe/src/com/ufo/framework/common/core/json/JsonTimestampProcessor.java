package com.ufo.framework.common.core.json;

import java.text.SimpleDateFormat;
import net.sf.json.JsonConfig;
import net.sf.json.processors.JsonValueProcessor;
/**
 * spring mvc 转从数据库取得的 time 的值
 * @author jiangfeng
 *
 */
public class JsonTimestampProcessor implements JsonValueProcessor {  
	//   private String format = "yyyy-MM-dd HH:mm:ss";   
	   private String format = "yyyy-MM-dd";   

	   //private SimpleDateFormat sf = new SimpleDateFormat(format);   

	    public JsonTimestampProcessor() {   
	        super();   
	    }   
	  
	    public JsonTimestampProcessor(String format) {   
	        super();   
	        this.format = format;   
	    }   
	  
	    @Override  
	    public Object processArrayValue(Object value, JsonConfig jsonConfig) {   
	        String[] obj = {};   
	        if (value instanceof java.sql.Timestamp[]) {   
	            java.sql.Timestamp[] dates = (java.sql.Timestamp[]) value;   
	            obj = new String[dates.length];   
	            for (int i = 0; i < dates.length; i++) {   
	                obj[i] = new SimpleDateFormat(format).format(dates[i]);   
	            }   
	        }   
	        return obj;   
	    }   
	  
	    @Override  
	    public Object processObjectValue(String key, Object value, JsonConfig jsonConfig) {   
	        if (value== null)
	        	return "";
	    	if (value instanceof java.sql.Timestamp) {   
	            String str = new SimpleDateFormat(format).format((java.sql.Timestamp) value);   
	            return str;   
	        }   
	        return value.toString();   
	    }   
	  
	    public String getFormat() {   
	        return format;   
	    }   
	  
	    public void setFormat(String format) {   
	        this.format = format;   
	    }   
	  
	}  