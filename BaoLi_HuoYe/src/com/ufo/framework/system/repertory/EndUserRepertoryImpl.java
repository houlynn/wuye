package com.ufo.framework.system.repertory;

import org.springframework.stereotype.Repository;

import com.model.hibernate.system.shared.EndUser;
import com.ufo.framework.system.irepertory.EndUserRepertory;

@Repository
public class EndUserRepertoryImpl extends SimpleRepertoryHibernateImpl<EndUser>  implements EndUserRepertory{

	protected EndUserRepertoryImpl() {
		super( EndUser.class);
	}

}
