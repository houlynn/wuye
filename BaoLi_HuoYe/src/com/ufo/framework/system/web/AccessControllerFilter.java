package com.ufo.framework.system.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.builder.ReflectionToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.model.hibernate.system.shared.EndUser;
import com.ufo.framework.common.core.utils.MD5Util;

public class AccessControllerFilter implements HandlerInterceptor {

	@Override
	public void afterCompletion(HttpServletRequest request,
			HttpServletResponse arg1, Object arg2, Exception arg3)
			throws Exception {
		// TODO Auto-generated method stub

	}

	@Override
	public void postHandle(HttpServletRequest arg0,
			HttpServletResponse response, Object arg2, ModelAndView arg3)
			throws Exception {
		// TODO Auto-generated method stub

	}

	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object arg2) throws Exception {
		// TODO Auto-generated method stub
		
		
		// TODO Auto-generated method stub
		boolean flag = false;
		String url = request.getRequestURI();
		flag = url.contains("Login");
		if (!flag) {
			EndUser endUser = SecurityUserHolder.getCurrentUser();
			flag=!endUser.getUserCode().equals("GUEST");
			
			if(!flag)
			{
			UsernamePasswordToken token = new UsernamePasswordToken("admin",
					MD5Util.md5("123456"));
			token.setRememberMe(true);
			System.out.println("为了验证登录用户而封装的token为"
					+ ReflectionToStringBuilder.toString(token,
							ToStringStyle.MULTI_LINE_STYLE));
			// 获取当前的Subject
			Subject currentUser = SecurityUtils.getSubject();
			currentUser.login(token);
			}
		}
		if(!flag)
		{
			response.sendRedirect("/login.jsp");
		}
		return flag;
		
		
		
		
		
		
/*		UsernamePasswordToken token = new UsernamePasswordToken("admin",
				MD5Util.md5("123456"));
		token.setRememberMe(true);
		System.out.println("为了验证登录用户而封装的token为"
				+ ReflectionToStringBuilder.toString(token,
						ToStringStyle.MULTI_LINE_STYLE));
		// 获取当前的Subject
		Subject currentUser = SecurityUtils.getSubject();
		currentUser.login(token);
		
		
	boolean flag = false;
		String url = request.getRequestURI();
		flag = url.contains("Login") || url.contains("/app/")||url.contains("rbacUser/logout.action");
		if (!flag) {
			EndUser endUser = SecurityUserHolder.getCurrentUser();
			flag = !endUser.getUserCode().equals("GUEST");
			if (!flag) {
				//"window.location.href='rbacUser/logout.action'"
				response.getWriter().write("alert('会话过期请重新登录！')");

			}
		}
		return flag;*/
	}

}
