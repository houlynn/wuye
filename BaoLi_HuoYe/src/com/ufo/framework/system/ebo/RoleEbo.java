package com.ufo.framework.system.ebo;


import org.springframework.stereotype.Service;

import com.model.hibernate.system.shared.Role;
import com.ufo.framework.system.ebi.RoleEbi;

@Service
public class RoleEbo extends SimpleEbo<Role> implements RoleEbi {

	protected RoleEbo() {
		super(Role.class);
	}


}
