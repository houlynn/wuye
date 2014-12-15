package com.ufo.framework.system.ebo;


import org.springframework.stereotype.Service;

import com.model.hibernate.system.shared.Department;
import com.ufo.framework.system.ebi.DepartmentDDeEbi;

@Service
public class DepartmentDDeEbo extends SimpleEbo<Department> implements DepartmentDDeEbi {

	protected DepartmentDDeEbo() {
		super(Department.class);
		// TODO Auto-generated constructor stub
	}


}
