package com.ufo.framework.system.controller;

import java.io.IOException;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.session.mgt.eis.EnterpriseCacheSessionDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.model.hibernate.system.shared.Department;
import com.model.hibernate.system.shared.EndUser;
import com.ufo.framework.common.core.utils.StringUtil;
import com.ufo.framework.system.ebi.SimpleEbi;
import com.ufo.framework.system.web.SecurityUserHolder;

/**
 * 
 * @author 作者 yingqu:
 * @version 创建时间：2014年6月24日 上午9:45:05 version 1.0
 */
@Controller("index")
@Scope("prototype")
@RequestMapping("/app")
public class AppController {

	@Autowired
	protected SimpleEbi<Department> ebi;

	public SimpleEbi<Department> getEbi() {
		return ebi;
	}

	public void setEbi(SimpleEbi<Department> ebi) {
		this.ebi = ebi;
	}

	@Autowired
	private EnterpriseCacheSessionDAO sessionDao;

	public EnterpriseCacheSessionDAO getSessionDao() {
		return sessionDao;
	}

	public void setSessionDao(EnterpriseCacheSessionDAO sessionDao) {
		this.sessionDao = sessionDao;
	}

	@RequestMapping("/index")
	public void execute(HttpServletRequest request, HttpServletResponse response) {
		try {
			EndUser currentUser = SecurityUserHolder.getCurrentUser();
			if (StringUtil.isNotEmpty(currentUser.getUserCode())) {
				currentUser.setDeptId(SecurityUserHolder.getCurrentDept()
						.getDeptId());
				SecurityUserHolder.setSession("currentUser", currentUser);
				Cookie userCodeCookie = new Cookie("loginUserCode",
						currentUser.getUserCode());
				userCodeCookie.setMaxAge(Integer.MAX_VALUE);
				userCodeCookie.setPath("/");
				response.addCookie(userCodeCookie);
				response.sendRedirect("/index.jsp");
			}

		} catch (Exception e) {
			e.printStackTrace();
			try {
				response.sendRedirect("/login.jsp");
			} catch (IOException e1) {
				e1.printStackTrace();
			}
		}

	}

}
