package com.ufo.framework.system.irepertory;

import com.model.hibernate.system.shared.EndUser;



public interface EndUserRepertory extends ISimpleRepertory<EndUser> {

	public void  updateUser(String[] updateSqls ,String ids[]) throws Exception;

}
