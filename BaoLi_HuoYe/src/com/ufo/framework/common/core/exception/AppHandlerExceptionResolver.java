package com.ufo.framework.common.core.exception;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerExceptionResolverComposite;

public class AppHandlerExceptionResolver extends
		HandlerExceptionResolverComposite {

	@Override
	public ModelAndView resolveException(HttpServletRequest request,
			HttpServletResponse httpServletResponse, Object handler, Exception exception) {
		// TODO Auto-generated method stub
		return super.resolveException(request, httpServletResponse, handler, exception);
	}

}
