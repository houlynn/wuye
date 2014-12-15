package com.ufo.framework.common.core.web;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;


/**
 *  系统初始化监听器
* @author 作者 yingqu: 
* @version 创建时间：2014年6月7日 下午10:18:15 
* version 1.0
 */
public class AppContextLintener implements ServletContextListener {

	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void contextInitialized(ServletContextEvent sc) {
		// TODO Auto-generated method stub
		 String appName=sc.getServletContext().getContextPath();
	     String webrootAbsPath=sc.getServletContext().getRealPath("/");
		 String absClassPath=AppContextLintener.class.getResource("/").getPath().substring(1);
		System.out.println(webrootAbsPath);
		System.out.println(absClassPath);
		
	}

}
