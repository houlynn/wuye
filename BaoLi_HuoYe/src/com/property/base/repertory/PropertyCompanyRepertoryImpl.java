package com.property.base.repertory;
import org.springframework.stereotype.Repository;

import com.model.hibernate.property.PropertyCompany;
import com.property.base.irepertory.PropertyCompanyRepertory;
import com.ufo.framework.system.repertory.SimpleRepertoryHibernateImpl;

@Repository
public class PropertyCompanyRepertoryImpl extends SimpleRepertoryHibernateImpl<PropertyCompany> implements PropertyCompanyRepertory {

	protected PropertyCompanyRepertoryImpl() {
		super(PropertyCompany.class);
	}

}
