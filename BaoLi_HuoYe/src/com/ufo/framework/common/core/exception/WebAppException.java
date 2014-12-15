package com.ufo.framework.common.core.exception;


public class WebAppException extends Exception {
	 private  ResponseErrorInfo errorInfo;

	 
	    public WebAppException(Throwable cause) {
	        super(cause);
	    }
	 
	public WebAppException() {
		super();
		this.errorInfo = new ResponseErrorInfo();
	}

	public ResponseErrorInfo getErrorInfo() {
		return errorInfo;
	}

	public void setErrorInfo(ResponseErrorInfo errorInfo) {
		this.errorInfo = errorInfo;
	}

}
