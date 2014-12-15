package com.ufo.framework.system.web;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.subject.Subject;

import com.model.hibernate.system.shared.Department;
import com.model.hibernate.system.shared.EndUser;
import com.ufo.framework.common.core.exception.DeleteException;
import com.ufo.framework.common.core.exception.ResponseErrorInfo;
import com.ufo.framework.common.core.exception.TimeoutException;

/**
 * 
 * @author 作者 yingqu:
 * @version 创建时间：2014年7月4日 上午8:32:03 version 1.0
 */
public class SecurityUserHolder {
	public static EndUser getCurrentUser() {
		Subject currentUser = SecurityUtils.getSubject();
		if (currentUser.isAuthenticated()) {
			EndUser user = (EndUser) currentUser.getSession().getAttribute(
					"currentUser");
			return user;
		} else {
			EndUser  user=new EndUser();
			user.setUserCode("GUEST");
			return user; 
		}
	}

	public static Department getCurrentDept() {
		Subject currentUser = SecurityUtils.getSubject();
		if (currentUser.isAuthenticated()) {
			EndUser user = (EndUser) currentUser.getSession().getAttribute(
					"currentUser");
			return user.getDepartment();
		} else {
			Department d = new Department();
			return d;
		}
	}

	/**
	 * 将一些数据放到ShiroSession中,以便于其它地方使用
	 * 
	 * @see 比如Controller,使用时直接用HttpSession.getAttribute(key)就可以取到
	 */
	public static void setSession(Object key, Object value) {
		Subject currentUser = SecurityUtils.getSubject();
		if (null != currentUser) {
			org.apache.shiro.session.Session session = currentUser.getSession();

			System.out.println("Session默认超时时间为[" + session.getTimeout() + "]毫秒"
					+ "sessionID" + session.getId() + "host:"
					+ session.getHost());
			if (null != session) {
				session.setAttribute(key, value);
			}
		}
	}

	public static String getCurrentUserLoginIp() {
		Subject currentUser = SecurityUtils.getSubject();
		if (null != currentUser) {
			org.apache.shiro.session.Session session = currentUser.getSession();
			if (null != session) {
				return  session.getHost();
			}
		}
		return null;

	}
	
	public static String  getIdentification() throws Exception{
		Subject currentUser = SecurityUtils.getSubject();
		String indent="";
		if (currentUser.isAuthenticated()) {
			EndUser user = (EndUser) currentUser.getSession().getAttribute(
					"currentUser");
			indent=user.getXcode();
		}else{
			TimeoutException exception=	 new TimeoutException(); 
			 ResponseErrorInfo errorInfo= new ResponseErrorInfo();
			 errorInfo.getErrorMessage().put("error", "用户未登陆，或回话过期!");
			 errorInfo.setResultCode(ResponseErrorInfo.STATUS_TIME_OUT);
			 exception.setErrorInfo(errorInfo);
			 throw exception;
			
		}
		return "7DA9BE06-14B0-DBAC-F5EF-FD2E3C600E59";
		
	}
	 

}
