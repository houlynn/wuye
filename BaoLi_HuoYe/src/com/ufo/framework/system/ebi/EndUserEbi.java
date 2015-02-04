package com.ufo.framework.system.ebi;

import com.model.hibernate.system.shared.EndUser;
import com.property.base.vo.ProUserInfo;


public interface EndUserEbi extends SimpleEbi<EndUser>,CommonException  {
	public void addUser(	String loginCode,
			String  userName,
			String  proId,
			String pwd,
			String sex) throws Exception;
	public void  updateUser(String[] updateSqls ,String ids[]) throws Exception;
	
}
