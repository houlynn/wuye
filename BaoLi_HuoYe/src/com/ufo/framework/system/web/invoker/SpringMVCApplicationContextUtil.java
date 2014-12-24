/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ufo.framework.system.web.invoker;

import javax.servlet.ServletContext;
import org.springframework.context.ApplicationContext;
import org.springframework.web.servlet.FrameworkServlet;

/**
 *
 * @author gengzi
 */
public class SpringMVCApplicationContextUtil {
    public static ApplicationContext getWebApplicationContext(ServletContext servletContext, String dispatcherServlet){
        return (ApplicationContext)servletContext.getAttribute(FrameworkServlet.SERVLET_CONTEXT_PREFIX+dispatcherServlet);
    }
}
