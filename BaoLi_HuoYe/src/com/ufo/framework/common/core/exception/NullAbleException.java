package com.ufo.framework.common.core.exception;

import com.ufo.framework.common.constant.CommConstants;



/**
 *  非空异常校验类<br>
* @author 作者 yingqu: 
* @version 创建时间：2014年6月28日 下午5:35:52 
* version 1.0
 */
@SuppressWarnings("serial")
public class NullAbleException extends RuntimeException {

	private String nullField;

	/**
	 * 构造函数1
	 * 
	 * @param 非空校验类
	 */
	public NullAbleException() {
		super(CommConstants.Exception_Head + "对象不能为空,请检查.");
	}

	/**
	 * 构造函数2
	 * 
	 * @param 非空校验类
	 */
	public NullAbleException(Class<?> cs) {
		super(CommConstants.Exception_Head + "对象不能为空,请检查.[" + cs + "]");
	}

	/**
	 * 构造函数3
	 * 
	 * @param pNullField
	 *            异常附加信息
	 */
	public NullAbleException(String pNullField) {
		super(CommConstants.Exception_Head + "对象属性[" + pNullField + "]不能为空,请检查.");
		this.setNullField(pNullField);
	}

	public String getNullField() {
		return nullField;
	}

	public void setNullField(String nullField) {
		this.nullField = nullField;
	}
}
