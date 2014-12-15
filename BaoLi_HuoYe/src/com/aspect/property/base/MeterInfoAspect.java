package com.aspect.property.base;

import java.util.List;

import javax.annotation.Resource;

import com.aspect.ModuleAspect;
import com.model.hibernate.property.MeterInfo;
import com.model.hibernate.property.ResidentInfo;
import com.model.hibernate.property.Village;
import com.model.hibernate.system._Module;
import com.ufo.framework.common.core.exception.ResponseErrorInfo;
import com.ufo.framework.common.core.web.SpringContextHolder;
import com.ufo.framework.system.ebi.CommonException;
import com.ufo.framework.system.ebi.Ebi;
import com.ufo.framework.system.ebo.ApplicationService;
import com.ufo.framework.system.irepertory.XcodeInterface;
import com.ufo.framework.system.repertory.SqlGenerator;
import com.ufo.framework.system.repertory.SqlModuleFilter;
import com.ufo.framework.system.shared.module.DataFetchRequestInfo;

public class MeterInfoAspect implements ModuleAspect ,XcodeInterface,CommonException {


	@Override
	public void loadBefore(DataFetchRequestInfo dsRequest,
			SqlGenerator generator) throws Exception {
		
	   _Module module = ApplicationService.getModuleWithName(dsRequest.getModuleName());
		String whereSql=getCurrentXcodeSql(module)+" and "+module.getTableAsName()+".tf_mtype='001'";
		generator.setSearchText(whereSql);
		
/*		String hql=" from MeterInfo where 1=1 and tf_mtype='"+FEES_TYPE_WATER+"'"+getCurrentXcodeSql();
		String whereSql="";
		if("0".equals(nodeInfoType)){
			SqlModuleFilter nav=navigateFilters.get(0);
			whereSql+=" and  tf_ResidentInfo.tf_levelInfo.tf_parent="+nav.getEqualsValue();
		}else if("1".equals(nodeInfoType)){
			SqlModuleFilter nav=navigateFilters.get(0);
			whereSql+=" and  tf_ResidentInfo.tf_levelInfo="+nav.getEqualsValue();
		}else if("2".equals(nodeInfoType)){
			SqlModuleFilter nav=navigateFilters.get(0);
			whereSql+=" and  tf_ResidentInfo="+nav.getEqualsValue();
		}
		*/
		
		
		        // generator.getModuleFilters();
		
		
	}

	@Override
	public void loadAfter() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void beforeCreate(Object record, String moduleName,
			List<SqlModuleFilter> navs) throws Exception {
		
		MeterInfo info=(MeterInfo)record;
		ResidentInfo resin=  info.getTf_ResidentInfo();
		int rid=resin.getTf_residentId();
		Ebi ebi=SpringContextHolder.getBean("ebo");
		ResidentInfo res= (ResidentInfo) ebi.findById(ResidentInfo.class, rid);
		Village vill=  res.getTf_levelInfo().getTf_parent().getTf_village();
		String hql=" select count(*) from FeesItemLink where 1=1 and tf_Village="+vill.getTf_viid()+" and tf_type='001'";
		Integer count= ebi.getCount(hql);
		if(count==0){
			getAppException(moduleName, "收费标准未并联需要手动设置", ResponseErrorInfo.STATUS_CUSTOM_WARM);
		}
	}

}
