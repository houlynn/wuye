package com.ufo.framework.system.irepertory;

import com.model.hibernate.system._Module;
import com.ufo.framework.system.web.SecurityUserHolder;

public interface XcodeInterface {
	 default String getCurrentXcode() throws Exception{
		 return SecurityUserHolder.getIdentification();
	 }
	 default String getCurrentXcodeSql(_Module module) throws Exception{
		 return  "and "+module.getTableAsName()+".xcode='"+SecurityUserHolder.getIdentification()+"' ";
	 }
	 default String getCurrentXcodeSql(String tableAsName) throws Exception{
		 return  "and "+tableAsName+".xcode='"+SecurityUserHolder.getIdentification()+"' ";
	 }
	 default String getCurrentXcodeSql() throws Exception{
		 return  "and "+"xcode='"+SecurityUserHolder.getIdentification()+"' ";
	 }


}
