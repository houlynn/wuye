package com.ufo.framework.common.core.json;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import net.sf.json.JSONObject;

/**
 * 将json 的数据转换成适合ognl使用的数据
 * 
 * { a=1,b:{b1="aa"}} 转换成 { a=1,b.b1="aa" }
 * 
 * @author jfok
 * 
 */
public class JsonToOgnlProcessor {
	@SuppressWarnings("unchecked")
	public static JSONObject JsonToOgnl(JSONObject object) {
		Iterator<String> iterator = ((Iterator<String>) object.keys());
		List<String> deleteKey = new ArrayList<String>();
		JSONObject result = new JSONObject();
		while (iterator.hasNext()) {
			String key = iterator.next();
			if (object.get(key) instanceof JSONObject) {
				deleteKey.add(key);
				nativeChange(result, (JSONObject) object.get(key), key);
			} else
				result.put(key, object.get(key));
		}
		return result;
	}

	@SuppressWarnings("unchecked")
	private static void nativeChange(JSONObject object, JSONObject subObject, String prevKey) {
		Iterator<String> iterator = (Iterator<String>) subObject.keys();
		while (iterator.hasNext()) {
			String key = iterator.next();
			if (subObject.get(key) instanceof JSONObject)
				nativeChange(object, (JSONObject) subObject.get(key), prevKey + "." + key);
			else
				object.put(prevKey + "." + key, subObject.get(key));
		}
	}

}
