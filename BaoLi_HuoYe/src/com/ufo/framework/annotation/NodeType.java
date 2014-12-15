package com.ufo.framework.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import com.ufo.framework.common.core.ext.TreeNodeType;

/**
 * 描述树形实体字段的注解
* @author 作者 yingqu: 
* @version 创建时间：2014年6月7日 上午11:21:07 
* version 1.0
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)  
public @interface NodeType {
	public TreeNodeType type(); //树形字段类型
}
