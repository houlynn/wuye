package com.ufo.framework.common.core.exception;

import java.io.Serializable;
import java.util.LinkedHashMap;
import java.util.Map;

public class ResponseErrorInfo implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public static final int STATUS_FAILURE = -1;
	public static final int STATUS_LOGIN_INCORRECT = -5;
	public static final int STATUS_LOGIN_REQUIRED = -7;
	public static final int STATUS_LOGIN_SUCCESS = -8;
	public static final int STATUS_MAX_LOGIN_ATTEMPTS_EXCEEDED = -6;
	public static final int STATUS_SERVER_TIMEOUT = -100;
	public static final int STATUS_SUCCESS = 0;
	public static final int STATUS_TRANSPORT_ERROR = -90;
	public static final int STATUS_TIME_OUT = -1000;
	public static final int STATUS_VALIDATION_ERROR = -4;
	public static final int STATUS_APP_BAN = -22;
	
	public static final int STATUS_CUSTOM_WARM=300;
	public static final int STATUS_CUSTOM_ERROR=501;
	
	
	
	
	
	
	
	
	
	
	
	   private Integer resultCode;
	    private Map<String, String> errorMessage;
	    private String modueName;
		public ResponseErrorInfo() {
			super();
			resultCode = 0;
			errorMessage = new LinkedHashMap<String, String>();
		}

		public Integer getResultCode() {
			return resultCode;
		}

		public void setResultCode(Integer resultCode) {
			this.resultCode = resultCode;
		}

		public Map<String, String> getErrorMessage() {
			return errorMessage;
		}

		public void setErrorMessage(Map<String, String> errorMessage) {
			this.errorMessage = errorMessage;
		}

		public String getModueName() {
			return modueName;
		}

		public void setModueName(String modueName) {
			this.modueName = modueName;
		}
}
