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
	public void loadBefore(DataFetchRequestInfo dsRequest,HttpServletRequest req,
			SqlGenerator generator) throws Exception {
		// TODO Auto-generated method stub
		
		
		String type=req.getParameter("type");
		if("0".equals(type)){
		String value= dsRequest.getModuleFilters().get(0).getEqualsValue();
		System.out.println(" value :"+value);
		String sql="select "
				+ " _t104.tf_residentId as _t104tf_residentId ,"
				+ " _t104.tf_number as _t104tf_number ,"
				+ " _t104.tf_residentName as _t104tf_residentName , "
				+ "_t104.tf_appPhone as _t104tf_appPhone , "
				+ "_t104.tf_appPhone1 as _t104tf_appPhone1 ,"
				+ " _t104.tf_appPhone2 as _t104tf_appPhone2 , "
				+ "_t104.tf_repossession as _t104tf_repossession ,"
				+ " _t104.tf_sdate as _t104tf_sdate ,"
				+ " _t104.tf_adate as _t104tf_adate ,"
				+ " _t104.tf_builArea as _t104tf_builArea ,"
				+ " _t104.tf_userArea as _t104tf_userArea , "
				+ "_t104.tf_doman as _t104tf_doman ,"
				+ " _t104.tf_jfloorType as _t104tf_jfloorType ,"
				+ " _t104.tf_nature as _t104tf_nature ,"
				+ " _t104.tf_isposttip as _t104tf_isposttip , _"
				+ "t104.tf_license as _t104tf_license ,"
				+ " _t104.tf_isburglar as _t104tf_isburglar ,"
				+ " _t104.tf_remark1 as _t104tf_remark1 ,"
				+ " _t104.tf_remark2 as _t104tf_remark2 ,"
				+ " _t104.tf_remark3 as _t104tf_remark3 ,"
				+ " _t104.tf_remark4 as _t104tf_remark4 , "
				+ "_t104.tf_remark5 as _t104tf_remark5 , "
				+ "_t104.tf_state as _t104tf_state ,"
				+ " _t104.tf_stateOccupancy as _t104tf_stateOccupancy ,"
				+ " _t104.tf_stateFees as _t104tf_stateFees ,"
				+ " _t104.tf_stateRepair as _t104tf_stateRepair ,"
				+ " _t104.tf_rental as _t104tf_rental ,"
				+ " _t104.tf_sell as _t104tf_sell ,"
				+ " _t104.tf_residentCode as _t104tf_residentCode ,"
				+ " _t104.tf_residentType as _t104tf_residentType , "
				+ "_t104.tf_residentAddress as _t104tf_residentAddress ,"
				+ " _t104.tf_residentPhone as _t104tf_residentPhone ,"
				+ " _t104.tf_residentEmail as _t104tf_residentEmail ,"
				+ " _t104.tf_residentSex as _t104tf_residentSex ,"
				+ " _t104.tf_residentBirthDate as _t104tf_residentBirthDate ,"
				+ " _t104.tf_residentCard as _t104tf_residentCard ,"
				+ " _t104.tf_residentPlace as _t104tf_residentPlace ,"
				+ " _t104.tf_remarks as _t104tf_remarks ,"
				+ " _t104.tf_tf_residentAsName as _t104tf_tf_residentAsName ,"
				+ " _t104.tf_residentAsAddress as _t104tf_residentAsAddress ,"
				+ " _t104.tf_residentAsPhone as _t104tf_residentAsPhone ,"
				+ " _t104.tf_code as _t104tf_code ,"
				+ " _t104.tf_rightArea as _t104tf_rightArea ,"
				+ " _t104.tf_shareArea as _t104tf_shareArea , "
				+ "_t104.tf_decovolume as _t104tf_decovolume ,"
				+ " _t104.tf_chargingDate as _t104tf_chargingDate ,"
				+ " _t104.tf_subsDate as _t104tf_subsDate ,"
				+ " _t104.tf_sffloorType as _t104tf_sffloorType ,"
				+ " _t104.tf_remark6 as _t104tf_remark6 ,"
				+ " _t104.tf_remark7 as _t104tf_remark7 ,"
				+ " _t104.tf_remark8 as _t104tf_remark8 ,"
				+ " _t104.tf_remark9 as _t104tf_remark9 ,"
				+ " _t103.tf_leveName as _t103tf_leveName  "
				+ "  from  ResidentInfo _t104 "
				+" cross join LevelInfo _t103 "
				+"   where _t104.tf_leveId=_t103.tf_leveId and 1=1 "
			     +  "and _t103.tf_pid="+value+" order by _t104.tf_number, _t104.tf_leveId ASC";
		
		String sqlCount="select count(*) "
				+ "  from  ResidentInfo _t104 "
				+" cross join LevelInfo _t103 "
				+"   where _t104.tf_leveId=_t103.tf_leveId and 1=1 "
			     +  "and _t103.tf_pid="+value;
		          generator.setGene(true);
		          generator.setGeneSql(sql);
		          generator.setGeneCountSql(sqlCount);
		}
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		/*
		String type=req.getParameter("type");
		if(type.contains("0")){
			generator.setGene(true);
			String sql=" select residentin0_.tf_residentId as tf_resid1_26_, residentin0_.orderIndex as orderInd2_26_, residentin0_.xcode as xcode3_26_, residentin0_.tf_adate as tf_adate4_26_, residentin0_.tf_appPhone as tf_appPh5_26_, residentin0_.tf_appPhone1 as tf_appPh6_26_, residentin0_.tf_appPhone2 as tf_appPh7_26_, residentin0_.tf_builArea as tf_builA8_26_, residentin0_.tf_chargingDate as tf_charg9_26_, residentin0_.tf_code as tf_code10_26_, residentin0_.tf_decovolume as tf_deco11_26_, residentin0_.tf_doman as tf_doma12_26_, residentin0_.tf_isburglar as tf_isbu13_26_, residentin0_.tf_isposttip as tf_ispo14_26_, residentin0_.tf_jfloorType as tf_jflo15_26_, residentin0_.tf_leveId as tf_leve55_26_, residentin0_.tf_license as tf_lice16_26_, residentin0_.tf_nature as tf_natu17_26_, residentin0_.tf_number as tf_numb18_26_, residentin0_.tf_remark1 as tf_rema19_26_, residentin0_.tf_remark2 as tf_rema20_26_, residentin0_.tf_remark3 as tf_rema21_26_, residentin0_.tf_remark4 as tf_rema22_26_, residentin0_.tf_remark5 as tf_rema23_26_, residentin0_.tf_remark6 as tf_rema24_26_, residentin0_.tf_remark7 as tf_rema25_26_, residentin0_.tf_remark8 as tf_rema26_26_, residentin0_.tf_remark9 as tf_rema27_26_, residentin0_.tf_remarks as tf_rema28_26_, residentin0_.tf_rental as tf_rent29_26_, residentin0_.tf_repossession as tf_repo30_26_, residentin0_.tf_residentAddress as tf_resi31_26_, residentin0_.tf_residentAsAddress as tf_resi32_26_, residentin0_.tf_residentAsPhone as tf_resi33_26_, residentin0_.tf_residentBirthDate as tf_resi34_26_, residentin0_.tf_residentCard as tf_resi35_26_, residentin0_.tf_residentCode as tf_resi36_26_, residentin0_.tf_residentEmail as tf_resi37_26_, residentin0_.tf_residentName as tf_resi38_26_, residentin0_.tf_residentPhone as tf_resi39_26_, residentin0_.tf_residentPlace as tf_resi40_26_, residentin0_.tf_residentSex as tf_resi41_26_, residentin0_.tf_residentType as tf_resi42_26_, residentin0_.tf_rightArea as tf_righ43_26_, residentin0_.tf_sdate as tf_sdat44_26_, residentin0_.tf_sell as tf_sell45_26_, residentin0_.tf_sffloorType as tf_sffl46_26_, residentin0_.tf_shareArea as tf_shar47_26_, residentin0_.tf_state as tf_stat48_26_, residentin0_.tf_stateFees as tf_stat49_26_, residentin0_.tf_stateOccupancy as tf_stat50_26_, residentin0_.tf_stateRepair as tf_stat51_26_, residentin0_.tf_subsDate as tf_subs52_26_, residentin0_.tf_tf_residentAsName as tf_tf_r53_26_, residentin0_.tf_userArea as tf_user54_26_ from 
			              ResidentInfo residentin0_ cross join LevelInfo levelinfo1_ 
			            where residentin0_.tf_leveId=levelinfo1_.tf_leveId and 1=1
			         and levelinfo1_.tf_pid=6 order by residentin0_.tf_number ASC
			
		}*/
		
		
		System.out.println("prntsql:");

		
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
