package com.ufo.framework.system.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.model.hibernate.system.shared.OperateLog;

@Controller("OperateLogAction")
@Scope("prototype")
@RequestMapping("/log")
public class OperateLogController extends SimpleBaseController<OperateLog> {
	protected OperateLogController() {
		super(OperateLog.class);
		// TODO Auto-generated constructor stub
	}

	@Override
	public OperateLog getModel(HttpServletRequest request, OperateLog model) {
		// TODO Auto-generated method stub
		return model;
	}

}
