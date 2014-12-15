package com.ufo.framework.common.core.exception;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.asm.Handle;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerExceptionResolverComposite;

import com.ufo.framework.common.log.LogerManager;
public class ExceptionHandler extends HandlerExceptionResolverComposite implements LogerManager {

	@Override
	public  ModelAndView resolveException(HttpServletRequest request,
			HttpServletResponse response, Object object, Exception e) {
		// TODO Auto-generated method stub
		response.setStatus(500);
		HandlerMethod method=(HandlerMethod)object;
		Class<?> controllerClass=method.getBeanType();
		RequestMapping mapping= method.getMethodAnnotation(RequestMapping.class);
		String methodName=method.getMethod().getName();
		error("请求："+controllerClass.getName()+"出错");
		error("请求路径："+mapping.value()[0]);
		error("请求方法:"+methodName);
		ResponseErrorInfo errorInfo = new ResponseErrorInfo();
		if (e instanceof InsertException) {
			WebAppException appException=(WebAppException)e;
			errorInfo=appException.getErrorInfo();
			error("添加数据异常");
		} else if (e instanceof UpdateException) {
			WebAppException appException=(WebAppException)e;
			errorInfo=appException.getErrorInfo();
			error("更新数据异常");
		}else if (e instanceof DeleteException) {
			WebAppException appException=(WebAppException)e;
			errorInfo=appException.getErrorInfo();
			error("删除数据异常");
		}else if (e instanceof TimeoutException) {
			WebAppException appException=(WebAppException)e;
			errorInfo=appException.getErrorInfo();
			error("回话过期!");
		}else if(e instanceof CustomException){
			WebAppException appException=(WebAppException)e;
			errorInfo=appException.getErrorInfo();
			error("其他业务异常!");
		}
		else{
			errorInfo.setResultCode(ResponseErrorInfo.STATUS_FAILURE);
			errorInfo.getErrorMessage().put("error", "未知错误!");
		}
		error( e.getMessage(),e);
		return new ModelAndView("jsonView").addObject("errorInfo", errorInfo);
	}

}
