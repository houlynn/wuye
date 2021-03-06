package com.aspect.property.base;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.aspect.ModuleAspect;
import com.model.hibernate.property.Village;
import com.ufo.framework.system.repertory.SqlGenerator;
import com.ufo.framework.system.repertory.SqlModuleFilter;
import com.ufo.framework.system.shared.module.DataFetchRequestInfo;
import com.ufo.framework.system.shared.module.DataFetchResponseInfo;
import com.ufo.framework.system.shared.module.grid.GridFilterData;
import com.ufo.framework.system.web.SecurityUserHolder;

public class VillageAspect  implements ModuleAspect {

	@Override
	public void loadBefore(DataFetchRequestInfo dsRequest,HttpServletRequest req,
			SqlGenerator generator) throws Exception {
		// TODO Auto-generated method stub
		String whereSql=" where 1=1 and xcode='"+SecurityUserHolder.getIdentification()+"'";
		generator.setSearchText(whereSql);
	}


	@Override
	public void beforeCreate(Object record, String moduleName,
			List<SqlModuleFilter> navs,HttpServletRequest req) throws Exception {
		// TODO Auto-generated method stub
		Village villeg=(Village) record;
		villeg.setXcode(SecurityUserHolder.getIdentification());
		
		
	}

	@Override
	public void afterCreate(Object record, String moduleName,
			List<SqlModuleFilter> navs) throws Exception {
		// TODO Auto-generated method stub
		
	}


	@Override
	public void afterLoad(String moduleName, DataFetchRequestInfo dsRequest,
			GridFilterData gridFilterData, DataFetchResponseInfo response) {
		// TODO Auto-generated method stub
		
	}

}
