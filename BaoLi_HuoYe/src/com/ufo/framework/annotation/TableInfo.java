package com.ufo.framework.annotation;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

/**
 *
* @author HouLynn
* @date 2014年10月17日
  @version 1.0
 */
@Retention(RetentionPolicy.RUNTIME)
public @interface TableInfo {
	// 此表的id号,为一个4位数字
	int id();

	// 模块名称
	String title();

	// 模块简称
	String shortname() default "";

	// 模块分组名称
	String group();

	// 模块的主键是否可以是分级的，如果是可以分级的，可定义为"2,2,2",表示有三级，每级代码长为2位，
	// 比如会计科目可以这样来定义
	// 10
	// 1001
	// 100101
	// 100102
	// 100102
	// 1002
	// ......
	String codeLevel() default "";

	// 模块是否有附件
	boolean attachment() default false;

}
