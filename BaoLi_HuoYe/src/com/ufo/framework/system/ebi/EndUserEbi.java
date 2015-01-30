package com.ufo.framework.system.ebi;

import com.model.hibernate.system.shared.EndUser;


public interface EndUserEbi extends SimpleEbi<EndUser>,CommonException  {
	public void addUser(String inserted) throws Exception;
	public void  updateUser(String[] updateSqls ,String ids[]) throws Exception;
	
}
