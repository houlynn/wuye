package com.ufo.framework.common.core.properties;

import java.io.InputStream;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.ufo.framework.common.core.BaseDto;
import com.ufo.framework.common.core.CommConstants;
import com.ufo.framework.common.core.Dto;

/**
 * 
* @author 作者 yingqu: 
* @version 创建时间：2014年6月28日 下午4:58:15 
* version 1.0
 */
public class PropertiesFactory {
	private static Log log = LogFactory.getLog(PropertiesFactory.class);
	/**
	 * 属性文件实例容器
	 */
	private static Dto container = new BaseDto();

	static {
		ClassLoader classLoader = Thread.currentThread().getContextClassLoader();

		if (classLoader == null) {
			classLoader = PropertiesFactory.class.getClassLoader();
		}
		// 加载属性文件global.g4.properties
		try {
			InputStream is = classLoader.getResourceAsStream("global.g4.properties");
			PropertiesHelper ph = new PropertiesHelper(is);
			container.put(PropertiesFile.G4, ph);
		} catch (Exception e1) {
			log.error(CommConstants.Exception_Head + "加载属性文件global.g4.properties出错!");
			e1.printStackTrace();
		}
		// 加载属性文件global.app.properties
		try {
			InputStream is = classLoader.getResourceAsStream("global.app.properties");
			PropertiesHelper ph = new PropertiesHelper(is);
			container.put(PropertiesFile.APP, ph);
		} catch (Exception e1) {
			log.error(CommConstants.Exception_Head + "加载属性文件global.app.properties出错!");
			e1.printStackTrace();
		}
		// 加载属性文件global.app.properties
		try {
			InputStream is = classLoader.getResourceAsStream("appServer.properties");
			PropertiesHelper ph = new PropertiesHelper(is);
			container.put(PropertiesFile.G4SERVER, ph);
		} catch (Exception e1) {
			log.error(CommConstants.Exception_Head + "加载属性文件appServer.properties出错!");
			e1.printStackTrace();
		}
	}

	/**
	 * 获取属性文件实例
	 * 
	 * @param pFile
	 *            文件类型
	 * @return 返回属性文件实例
	 */
	public static PropertiesHelper getPropertiesHelper(String pFile) {
		PropertiesHelper ph = (PropertiesHelper) container.get(pFile);
		return ph;
	}
}
