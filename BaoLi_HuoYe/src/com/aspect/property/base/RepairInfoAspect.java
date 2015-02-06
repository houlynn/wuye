package com.aspect.property.base;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.aspect.ModuleAspect;
import com.model.hibernate.property.RepairInfo;
import com.ufo.framework.system.repertory.SqlGenerator;
import com.ufo.framework.system.repertory.SqlModuleFilter;
import com.ufo.framework.system.shared.module.DataFetchRequestInfo;
import com.ufo.framework.system.shared.module.DataFetchResponseInfo;
import com.ufo.framework.system.shared.module.grid.GridFilterData;
import com.ufo.framework.system.web.SecurityUserHolder;

public class RepairInfoAspect implements ModuleAspect{

	@Override
	public void loadBefore(DataFetchRequestInfo dsRequest,
			HttpServletRequest req, SqlGenerator generator) throws Exception {
		// TODO Auto-generated method stub
		
		if(dsRequest.getModuleFilters()==null||dsRequest.getModuleFilters().size()==0){
			   generator.setGene(true);
			   String whereSql="  where   _t302.xcode='"+SecurityUserHolder.getIdentification()+"' ";
			   String sqlCount=generator.getCountSqlStatement()+whereSql;
			   String sql=generator.getSqlStatment()+whereSql;
			    generator.setGeneSql(sql);
		        generator.setGeneCountSql(sqlCount);
		}else{
			   generator.setGene(true);
			   String whereSql="  and   _t302.xcode='"+SecurityUserHolder.getIdentification()+"' and _t302.tf_submit=0";
			   String sqlCount=generator.getCountSqlStatement()+whereSql;
			   String sql=generator.getSqlStatment()+whereSql;
			    generator.setGeneSql(sql);
		        generator.setGeneCountSql(sqlCount);
			
			
		}
		
	}

	@Override
	public void afterLoad(String moduleName, DataFetchRequestInfo dsRequest,
			GridFilterData gridFilterData, DataFetchResponseInfo response)
			throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void beforeCreate(Object record, String moduleName,
			List<SqlModuleFilter> navs, HttpServletRequest req)
			throws Exception {
		// TODO Auto-generated method stub
		RepairInfo repairInfo=(RepairInfo) record;
		repairInfo.setXcode(SecurityUserHolder.getIdentification());
	}

	@Override
	public void afterCreate(Object record, String moduleName,
			List<SqlModuleFilter> navs) throws Exception {
		// TODO Auto-generated method stub
		
	}

}
