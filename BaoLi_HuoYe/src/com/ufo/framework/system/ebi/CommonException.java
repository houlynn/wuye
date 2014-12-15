package com.ufo.framework.system.ebi;

import com.ufo.framework.common.core.exception.CustomException;
import com.ufo.framework.common.core.exception.DeleteException;
import com.ufo.framework.common.core.exception.InsertException;
import com.ufo.framework.common.core.exception.ResponseErrorInfo;
import com.ufo.framework.common.core.exception.UpdateException;
import com.ufo.framework.common.core.exception.WebAppException;

/**
 * 业务异常
* @author HouLynn
* @date 2014年12月12日
  @version 1.0
 */
public interface CommonException {

	
	default void getInsertException(String modeuName,String msg,int code) throws InsertException{
		 InsertException exception=	 new InsertException(); 
		 ResponseErrorInfo errorInfo= new ResponseErrorInfo();
		 errorInfo.setModueName(modeuName);
		 errorInfo.getErrorMessage().put("error", msg);
		 errorInfo.setResultCode(code);
		 exception.setErrorInfo(errorInfo);
		 throw exception;
	}
	default void getInsertException(String modeuName,String msg,int code,Exception e) throws InsertException{
		 InsertException exception=	 new InsertException(e); 
		 ResponseErrorInfo errorInfo= new ResponseErrorInfo();
		 errorInfo.setModueName(modeuName);
		 errorInfo.getErrorMessage().put("error", msg);
		 errorInfo.setResultCode(code);
		 exception.setErrorInfo(errorInfo);
		 throw exception;
	}
	
	
	
	
	default void getUpdateException(String modeuName,String msg,int code) throws UpdateException{
		 UpdateException exception=	 new UpdateException(); 
		 ResponseErrorInfo errorInfo= new ResponseErrorInfo();
		 errorInfo.setModueName(modeuName);
		 errorInfo.getErrorMessage().put("error", msg);
		 errorInfo.setResultCode(code);
		 exception.setErrorInfo(errorInfo);
		 throw exception;
		 
	}
	
	default void getUpdateException(String modeuName,String msg,int code,Exception e) throws UpdateException{
		 UpdateException exception=	 new UpdateException(e); 
		 ResponseErrorInfo errorInfo= new ResponseErrorInfo();
		 errorInfo.setModueName(modeuName);
		 errorInfo.getErrorMessage().put("error", msg);
		 errorInfo.setResultCode(code);
		 exception.setErrorInfo(errorInfo);
		 throw exception;
		 
	}
	
	
	
	default void getDeleteException(String modeuName,String msg,int code) throws InsertException{
		 InsertException exception=	 new InsertException(); 
		 ResponseErrorInfo errorInfo= new ResponseErrorInfo();
		 errorInfo.setModueName(modeuName);
		 errorInfo.getErrorMessage().put("error", msg);
		 errorInfo.setResultCode(code);
		 exception.setErrorInfo(errorInfo);
		 throw exception;
		 
	}
	default void getDeleteException(String modeuName,String msg,int code,Exception e) throws DeleteException{
		DeleteException exception=	 new DeleteException(e); 
		 ResponseErrorInfo errorInfo= new ResponseErrorInfo();
		 errorInfo.setModueName(modeuName);
		 errorInfo.getErrorMessage().put("error", msg);
		 errorInfo.setResultCode(code);
		 exception.setErrorInfo(errorInfo);
		 throw exception;
	}
	
	
	
	default void getAppException(String modeuName,String msg,int code,Exception e) throws CustomException{
		CustomException exception=	 new CustomException(e); 
		 ResponseErrorInfo errorInfo= new ResponseErrorInfo();
		 errorInfo.setModueName(modeuName);
		 errorInfo.getErrorMessage().put("error", msg);
		 errorInfo.setResultCode(code);
		 exception.setErrorInfo(errorInfo);
		 throw exception;
	}
	
	default void getAppException(String modeuName,String msg,int code ) throws CustomException{
		 CustomException exception=	 new CustomException(); 
		 ResponseErrorInfo errorInfo= new ResponseErrorInfo();
		 errorInfo.setModueName(modeuName);
		 errorInfo.getErrorMessage().put("error", msg);
		 errorInfo.setResultCode(code);
		 exception.setErrorInfo(errorInfo);
		 throw exception;
	}
	
}
