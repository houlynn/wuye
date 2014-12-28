package com.aspect.property.base;

import java.util.List;

import com.aspect.ModuleAspect;
import com.model.hibernate.property.PropertyCompany;
import com.model.hibernate.system.shared.XCodeInfo;
import com.sun.org.apache.xml.internal.resolver.helpers.Debug;
import com.ufo.framework.common.core.utils.AppUtils;
import com.ufo.framework.common.core.web.SpringContextHolder;
import com.ufo.framework.system.ebi.Ebi;
import com.ufo.framework.system.repertory.SqlGenerator;
import com.ufo.framework.system.repertory.SqlModuleFilter;
import com.ufo.framework.system.shared.module.DataFetchRequestInfo;

public class PropertyCompanyAspect  implements ModuleAspect {

	
	@Override
	public void loadBefore(DataFetchRequestInfo dsRequest,
			SqlGenerator generator) throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void loadAfter() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void beforeCreate(Object record, String moduleName,
			List<SqlModuleFilter> navs) throws Exception {
		// TODO Auto-generated method stub
		
		
		
	}

	@Override
	public void afterCreate(Object record, String moduleName,
			List<SqlModuleFilter> navs) throws Exception {
		PropertyCompany pro=(PropertyCompany)record;
		XCodeInfo codeInfo=new XCodeInfo();
		codeInfo.setTf_createTime(AppUtils.getCurrentTime());
		codeInfo.setTf_propertyCompany(pro);
		Ebi ebi= SpringContextHolder.getBean("ebo");
		ebi.save(codeInfo);
	
		
	}

}
