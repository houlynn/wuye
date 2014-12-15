package com.ufo.framework.common.core.web;

import javax.servlet.http.HttpServletRequest;

@SuppressWarnings("serial")
public class AjaxRequestException extends Exception {

	public final static String ERRORCODE = "__errorcode";
	public final static String ERRORMESSAGE = "__errormessage";

	public AjaxRequestException() {
		super();
	}

	public AjaxRequestException(Integer errorCode, String message, HttpServletRequest request) {
		super(message);
		request.setAttribute(ERRORCODE, errorCode);
		request.setAttribute(ERRORMESSAGE, message);
	}

}
