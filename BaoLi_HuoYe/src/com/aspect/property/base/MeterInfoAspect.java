package com.aspect.property.base;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import com.aspect.ModuleAspect;
import com.model.hibernate.property.FeesInfo;
import com.model.hibernate.property.FeesItemLink;
import com.model.hibernate.property.MeterInfo;
import com.model.hibernate.property.ResidentInfo;
import com.model.hibernate.property.Village;
import com.model.hibernate.system._Module;
import com.ufo.framework.common.core.exception.ResponseErrorInfo;
import com.ufo.framework.common.core.web.KeysValuesInfo;
import com.ufo.framework.common.core.web.SpringContextHolder;
import com.ufo.framework.system.ebi.CommonException;
import com.ufo.framework.system.ebi.Ebi;
import com.ufo.framework.system.ebo.ApplicationService;
import com.ufo.framework.system.irepertory.XcodeInterface;
import com.ufo.framework.system.repertory.SqlGenerator;
import com.ufo.framework.system.repertory.SqlModuleFilter;
import com.ufo.framework.system.shared.module.DataFetchRequestInfo;
import com.ufo.framework.system.shared.module.DataFetchResponseInfo;
import com.ufo.framework.system.shared.module.grid.GridFilterData;

public class MeterInfoAspect implements ModuleAspect ,XcodeInterface,CommonException {


	@Override
	public void loadBefore(DataFetchRequestInfo dsRequest,HttpServletRequest req,
			SqlGenerator generator) throws Exception {
	   _Module module = ApplicationService.getModuleWithName(dsRequest.getModuleName());
	   String whereSql="";
	   SqlModuleFilter nav=dsRequest.getModuleFilters().get(0);
	   String type=nav.getText();
	   whereSql+= " and "+module.getTableAsName()+".tf_mtype='"+type+"' ";
	   generator.setSearchText(whereSql);
	   
	   
	   
	   
     /*   KeysValuesInfo[] keysvalues= KeysValuesInfo.changeToKeysValue(dsRequest.getTag());
        String whereSql="";//" and "+module.getTableAsName()+".tf_mtype='"+dsRequest.getTag()+"'";
        if(keysvalues!=null&&keysvalues.length>0){
        	for(KeysValuesInfo kv:keysvalues){
                String value=kv.getValue();
                String  key=kv.getKey();
                if("nodeInfoType".equals(key)&&"2".endsWith(value)){
                	whereSql+= " and "+module.getTableAsName()+".tf_residentId="+value;
                }
                if("tf_mtype".endsWith(key)){
                	whereSql+=" and "+module.getTableAsName()+".tf_mtype="+value;
                }
                }
        		switch (kv.getKey()) {
				case "0":
					
					SqlModuleFilter nav=navigateFilters.get(0);
					whereSql+=" and  tf_ResidentInfo.tf_levelInfo.tf_parent="+nav.getEqualsValue();
					break;
		        case "1":
		        	SqlModuleFilter nav=navigateFilters.get(0);
					whereSql+=" and  tf_ResidentInfo.tf_levelInfo="+nav.getEqualsValue();
					break;
		        case "2":
		    		SqlModuleFilter nav=navigateFilters.get(0);
					whereSql+=" and  tf_ResidentInfo="+nav.getEqualsValue();
					break;
        	}
        	//String key=keysvalues
        	
        }
        
    //	String whereSql=" and "+module.getTableAsName()+".tf_mtype='"+dsRequest.getTag()+"'";
		generator.setSearchText(whereSql);
        
		
	 String hql=" from MeterInfo where 1=1 and tf_mtype='"+FEES_TYPE_WATER+"'"+getCurrentXcodeSql();
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
		
		
		
		        // generator.getModuleFilters();
*/		
		
	}


	@Override
	public void beforeCreate(Object record, String moduleName,
			List<SqlModuleFilter> navs,HttpServletRequest req) throws Exception {
		
		String type=req.getParameter("type");
		MeterInfo info=(MeterInfo)record;
		info.setTf_mtype(type);
		ResidentInfo resin=  info.getTf_ResidentInfo();
		int rid=resin.getTf_residentId();
		Ebi ebi=SpringContextHolder.getBean("ebo");
		ResidentInfo res= (ResidentInfo) ebi.findById(ResidentInfo.class, rid);
		Village vill=  res.getTf_levelInfo().getTf_parent().getTf_village();
		String hql=" select count(*) from FeesItemLink where 1=1 and tf_Village="+vill.getTf_viid()+" and tf_type='"+type+"'";
		Integer count= ebi.getCount(hql);
		if(count==0){
			getAppException(moduleName, "第一次录入抄表信息需要关联收费标准,请确认当前录入的抄表信息与关联的收费标准是否相符一旦设定后讲无法更改，请慎重选择！！！", ResponseErrorInfo.STATUS_CUSTOM_WARM);
		}else{
			String hqlfee=" from FeesItemLink where 1=1 and tf_Village="+vill.getTf_viid()+" and tf_type='"+type+"'";
			List<FeesItemLink> list=(List<FeesItemLink>) ebi.queryByHql(hqlfee);
			if(list!=null&&list.size()>0){
				FeesItemLink itemLink=list.get(0);
				info.setTf_FeesInfo(itemLink.getTf_FeesInfo());
			}
		
		}
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
