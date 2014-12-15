package com.ufo.framework.system.repertory;

import org.springframework.stereotype.Repository;

import com.model.hibernate.system.shared.Department;
import com.ufo.framework.system.irepertory.DepartmentRepertory;

@Repository
public class DepartmentRepertoryImpl extends SimpleRepertoryHibernateImpl<Department>  implements DepartmentRepertory{

	protected DepartmentRepertoryImpl() {
		super(Department.class);
	}

}
