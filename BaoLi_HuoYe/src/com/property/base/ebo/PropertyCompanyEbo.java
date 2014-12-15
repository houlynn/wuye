package com.property.base.ebo;
import org.springframework.stereotype.Service;

import com.model.hibernate.property.PropertyCompany;
import com.property.base.ebi.PropertyCompanyEbi;
import com.ufo.framework.system.ebo.SimpleEbo;

@Service
public class PropertyCompanyEbo extends SimpleEbo<PropertyCompany> implements PropertyCompanyEbi {

protected PropertyCompanyEbo()  {
		super(PropertyCompany.class);
	}
}
