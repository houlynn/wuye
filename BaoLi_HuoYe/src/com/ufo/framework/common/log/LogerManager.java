package com.ufo.framework.common.log;

import org.apache.log4j.Logger;

import com.ufo.framework.common.core.ext.model.ResultModel;
public interface LogerManager {

	public default void info( String msg) {
		Logger log = AppLoggerFactory.getyingquLogger(this.getClass());
		if (AppLoggerFactory.INFO) {
			log.info(msg);
		}
	}
	public default void debug(String msg) {
		Logger log = AppLoggerFactory.getyingquLogger(this.getClass());
		if (AppLoggerFactory.DEBUG) {
			log.info(msg);
		}
	}
	public default void error(String msg) {
		Logger log = AppLoggerFactory.getyingquLogger(this.getClass());
		if (AppLoggerFactory.ERROR) {
			log.error(msg);
		}
	}
	public default void error(String msg, Throwable e) {
		Logger log = AppLoggerFactory.getyingquLogger(this.getClass());
		if (AppLoggerFactory.ERROR) {
			log.error(msg,e);
		}
	}
	public default void error(ResultModel resultModel, Throwable e) {
		Logger log = AppLoggerFactory.getyingquLogger(this.getClass());
		if (AppLoggerFactory.ERROR) {
			log.error(resultModel.getMsg(),e);
		}
	}
}
