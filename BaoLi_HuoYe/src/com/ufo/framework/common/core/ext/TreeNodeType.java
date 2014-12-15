package com.ufo.framework.common.core.ext;
/**
 * 树形字段类型枚举
* @author 作者 yingqu: 
* @version 创建时间：2014年6月7日 上午11:18:48 
* version 1.0
 */
public enum TreeNodeType {
	   ID,
       TEXT, 
       CODE, 
       CLS,
       HREF,
       HREFTARGET,  
       EXPANDABLE,
       EXPANDED,
       DESCRIPTION, 
       ICON,
       CHECKED,   
       PARENT,
       LEAF,
       NODEINFO,    
       NODEINFOTYPE, 
       ORDERINDEX,
       LAYER,
       BIGICON,
       DISABLED;
	   public Boolean equalsType(TreeNodeType other){
		   int i=this.compareTo(other);
		   if(i!=0){
			   return false;
		   }
		   return true;
	   }
}
