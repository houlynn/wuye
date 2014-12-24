/**
 * 
 */
package com.ufo.framework.system.web.invoker;


import java.util.Map;
import org.springframework.context.ApplicationContext;
import org.springframework.remoting.httpinvoker.HttpInvokerServiceExporter;
/**
 * @author rg
 * 
 */
public class SpringRemoteServiceContext {
	private static Map<String, HttpInvokerServiceExporter> servicesMap;
/*	public static void initContext(
			ApplicationContext applicationContext) {
		servicesMap = applicationContext.getBeansOfType(HttpInvokerServiceExporter.class);
	}
	public static void initContext() {
		servicesMap = SpringContext.getApplicationContext().getBeansOfType(HttpInvokerServiceExporter.class);
	}
	public static Map<String, HttpInvokerServiceExporter> getServicesMap(){
		return servicesMap;
	}*/
}
