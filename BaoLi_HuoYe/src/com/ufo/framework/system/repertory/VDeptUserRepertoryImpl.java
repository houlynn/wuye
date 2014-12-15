package com.ufo.framework.system.repertory;

import org.springframework.stereotype.Repository;

import com.ufo.framework.system.irepertory.VDeptUserRepertory;
import com.ufo.framework.system.model.VDeptUser;

@Repository
public class VDeptUserRepertoryImpl extends SimpleRepertoryHibernateImpl<VDeptUser>  implements VDeptUserRepertory{

	protected VDeptUserRepertoryImpl() {
		super( VDeptUser.class);
	}

}
