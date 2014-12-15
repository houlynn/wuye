package com.ufo.framework.annotation;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

import com.ufo.framework.common.core.ext.ExtFieldType;


/**
 *
* @author HouLynn
* @date 2014年10月17日
  @version 1.0
 */
@Retention(RetentionPolicy.RUNTIME)
public @interface FieldInfo {
		
		String title() default "";

		int number() default 0;

		String remark() default "";

		boolean uniqueField() default false;

		boolean hidden() default false;

		String fieldGroup() default "默认组";

		boolean money() default false;
		
		boolean percent() default false;
		
		public String name() default ""; //字段名称
		public ExtFieldType type() default ExtFieldType.STRING; //字段类型
		public boolean visible()default false;//是否作为视图字段
		public int width() default 120;
		public boolean nullAble() default true;
		public String regexType()default"required";
		public int index() default 0;
	    public boolean 	mobileField() default false;
}
