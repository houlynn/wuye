package com.ufo.framework.common.core.properties;

import java.io.IOException;
import java.util.Properties;

import org.apache.log4j.Logger;
import org.springframework.core.io.support.PropertiesLoaderUtils;

import com.ufo.framework.common.core.exception.TypeCastException;
import com.ufo.framework.common.core.utils.StringUtil;
import com.ufo.framework.common.log.AppLoggerFactory;

/**
 * 配置文件工具类
* @author 作者 yingqu: 
* @version 创建时间：2014年7月4日 下午7:03:25 
* version 1.0
 */
public class PropUtil {
	  private static final Logger LOG = AppLoggerFactory.getyingquLogger(PropUtil.class);
	/**
	 * 根据key获取配置的值
	 * @param key
	 * @return
	 */
	public static String get(String key){
		try {
			Properties prop=PropertiesLoaderUtils.loadAllProperties("sysconfig.properties");
			return prop.getProperty(key,"");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "";
	}
	/**
	 * 根据key获取配置的值
	 * @param key
	 * @return
	 */
	public static String get(String fileName, String key){
		try {
			Properties prop=PropertiesLoaderUtils.loadAllProperties(fileName+".properties");
			return prop.getProperty(key,"");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "";
	}
	  public static boolean getBooleanProperty(String key)
	  {
		  try
		  {
			Properties prop=PropertiesLoaderUtils.loadAllProperties("sysconfig.properties");
			String value=prop.getProperty(key);
			if(StringUtil.isNotEmpty(value))
			{
			   return Boolean.valueOf(value);
			}
		  }catch(TypeCastException e)
		  {
			  LOG.info("类型转换失败！"+e.getMessage());
			  e.printStackTrace();
		  } catch (IOException e) {
			  LOG.info("加载文件失败！"+e.getMessage());
			e.printStackTrace();
		}
			return false;
			
	  }
	
	
}
