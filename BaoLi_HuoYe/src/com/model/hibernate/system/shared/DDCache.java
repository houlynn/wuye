package com.model.hibernate.system.shared;

import java.util.HashMap;
import java.util.Map;

/**
 * 字典缓存功能类
* @author 作者 yingqu: 
* @version 创建时间：2014年6月20日 下午9:31:56 
* version 1.0
 */
public class DDCache {
	private static Map<String,String> ddItems=new HashMap<String,String>();
	/**
	 * 缓存字典
	 * @param key
	 * @param value
	 */
	public static void push(String key,String value){
		ddItems.put(key, value);
	}
	public static String get(String key){
		return ddItems.get(key);
	}
	public static void clear(String key){
		ddItems.remove(key);
	}
	public static void clearAll(){
		ddItems=new HashMap<String,String>();
	}
}
