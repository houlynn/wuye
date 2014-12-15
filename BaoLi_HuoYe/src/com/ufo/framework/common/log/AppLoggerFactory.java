/**
 * 
 * APDPlat - Application Product Development Platform
 * Copyright (c) 2013, 杨尚川, yang-shangchuan@qq.com
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * 
 */

package com.ufo.framework.common.log;

import java.util.HashMap;
import java.util.Map;

import org.apache.log4j.Logger;

import com.ufo.framework.common.core.properties.PropUtil;

/**日志工厂
* @author HouLynn
 @version 创建时间：2014年7月4日 下午5:03:51 version 1.0
  @version 1.0
 */
public class AppLoggerFactory {

	public static final boolean INFO;
	public static final boolean DEBUG;
	public static final boolean ERROR;
	static {
		CACHE=new HashMap<>();
		INFO = PropUtil.getBooleanProperty("app.log.info");
		DEBUG = PropUtil.getBooleanProperty("app.log.debug");
		ERROR=PropUtil.getBooleanProperty("app.log.error");
		if(INFO){
			System.out.println("===================系统开启了 INFO 日志!================================");
		}else{
			System.out.println("====================系统禁用了 INFO 日志!===============================");
		}
		if(DEBUG){
			System.out.println("======================系统开启了 DEBUG 日志!================================");
		}else{
			System.out.println("======================系统禁用了 DEBUG 日志!===============================");
		}
		if(ERROR){
			System.out.println("=======================系统开启了 ERROR 日志!================================");
		}else{
			System.out.println("=======================系统禁用了 ERROR 日志!===============================");
		}
		
	}
	private static final Map<Class<?>, Logger> CACHE;
	private AppLoggerFactory() {
	}
	public static synchronized Logger getyingquLogger(Class<?> clazz) {
		Logger log = CACHE.get(clazz);
		if (log == null) {
			log = Logger.getLogger(clazz);
			CACHE.put(clazz, log);
		}
		return log;
	}

	
}
