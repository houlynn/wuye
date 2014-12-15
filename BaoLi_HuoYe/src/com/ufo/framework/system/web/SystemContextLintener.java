package com.ufo.framework.system.web;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import com.ufo.framework.system.controller.SimpleBaseController;


/**
 *  系统初始化监听器
* @author 作者 yingqu: 
* @version 创建时间：2014年6月7日 下午10:18:15 
* version 1.0
 */
public class SystemContextLintener implements ServletContextListener {

	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void contextInitialized(ServletContextEvent sc) {
		// TODO Auto-generated method stub
		SimpleBaseController.appName=	sc.getServletContext().getContextPath();
		SimpleBaseController.webrootAbsPath=sc.getServletContext().getRealPath("/");
		SimpleBaseController.absClassPath=SystemContextLintener.class.getResource("/").getPath().substring(1);
		System.out.println(SimpleBaseController.webrootAbsPath);
		System.out.println(SimpleBaseController.absClassPath);
		
	}

}
