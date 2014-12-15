package com.ufo.framework.system.repertory;

import org.springframework.stereotype.Repository;

import com.model.hibernate.system.shared.Permission;
import com.ufo.framework.system.irepertory.PermissionRepertory;

@Repository
public class PermissionRepertoryImpl extends SimpleRepertoryHibernateImpl<Permission>  implements PermissionRepertory{

	protected PermissionRepertoryImpl() {
		super( Permission.class);
	}

}
