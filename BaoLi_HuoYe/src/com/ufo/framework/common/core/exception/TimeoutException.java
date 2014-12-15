package com.ufo.framework.common.core.exception;

public class TimeoutException extends WebAppException {

	public TimeoutException(){};
	public TimeoutException(Throwable throwable){
		super(throwable);
		
	};
}
