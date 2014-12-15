package com.ufo.framework.system.repertory;

import org.springframework.stereotype.Repository;

import com.model.hibernate.system.shared.Role;
import com.ufo.framework.system.irepertory.RoleRepertory;

@Repository
public class RoleRepertoryImpl extends SimpleRepertoryHibernateImpl<Role>  implements RoleRepertory{

	protected RoleRepertoryImpl() {
		super( Role.class);
	}

}
