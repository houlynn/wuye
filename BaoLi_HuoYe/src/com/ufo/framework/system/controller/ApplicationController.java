package com.ufo.framework.system.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.model.app.common.ApplicationInfo;
import com.model.hibernate.system.shared.EndUser;
import com.ufo.framework.system.ebi.ApplicationEbi;
import com.ufo.framework.system.ebi.Ebi;
import com.ufo.framework.system.web.SecurityUserHolder;


@Controller
public class ApplicationController {
	

	
	// spring注释，自动注入ApplicationService 的实例
	@Resource
	private ApplicationEbi applicationService;

	@RequestMapping("/applicationinfo")
	public synchronized @ResponseBody
	ApplicationInfo getApplicationInfo(HttpServletRequest request) {
		try {
			return applicationService.getApplicationInfo(request);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
}
