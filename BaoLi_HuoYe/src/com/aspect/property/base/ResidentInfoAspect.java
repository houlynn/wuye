package com.aspect.property.base;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;








import javax.servlet.http.HttpServletRequest;

import com.aspect.ModuleAspect;
import com.model.hibernate.property.FeesTypeItem;
import com.model.hibernate.property.ResidentInfo;
import com.ufo.framework.common.core.web.SpringContextHolder;
import com.ufo.framework.system.ebi.CommonException;
import com.ufo.framework.system.ebi.Ebi;
import com.ufo.framework.system.irepertory.XcodeInterface;
import com.ufo.framework.system.repertory.SqlGenerator;
import com.ufo.framework.system.repertory.SqlModuleFilter;
import com.ufo.framework.system.shared.module.DataFetchRequestInfo;
import com.ufo.framework.system.shared.module.DataFetchResponseInfo;
import com.ufo.framework.system.shared.module.grid.GridFilterData;

public class ResidentInfoAspect implements  ModuleAspect ,XcodeInterface,CommonException {

	@Override
	public void loadBefore(DataFetchRequestInfo dsRequest,
			SqlGenerator generator) throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void afterLoad(String moduleName, DataFetchRequestInfo dsRequest,
			GridFilterData gridFilterData, DataFetchResponseInfo response) throws Exception {
		// TODO Auto-generated method stub
		Ebi ebi= SpringContextHolder.getBean("ebo");
		List<Map<String,Object>> dataList=(List<Map<String, Object>>) response.getMatchingObjects();
		dataList=dataList.stream().map(item->{
			int rid=Integer.parseInt( item.get("tf_residentId")+"");
			String hql=" from  FeesTypeItem where 1=1 and tf_ResidentInfo="+rid;
			try {
				List<FeesTypeItem> fees=(List<FeesTypeItem>) ebi.queryByHql(hql);
				String feesStr="";
				if(fees!=null&&fees.size()>0){
					for(FeesTypeItem ft : fees ){
					feesStr+=" "+ft.getTf_FeesInfo().getTf_freesName();
					}
				}
				item.put("itemRemark", feesStr);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			return item;
		}).collect(Collectors.toList());
		response.setMatchingObjects(dataList);
		
		
		
		
		
		
	}

	@Override
	public void beforeCreate(Object record, String moduleName,
			List<SqlModuleFilter> navs,HttpServletRequest req) throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void afterCreate(Object record, String moduleName,
			List<SqlModuleFilter> navs) throws Exception {
		// TODO Auto-generated method stub
		
	}

}
