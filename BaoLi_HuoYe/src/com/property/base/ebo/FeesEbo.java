package com.property.base.ebo;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import net.sf.json.JSONArray;
import net.sf.json.JSONSerializer;
import net.sf.json.JsonConfig;

import com.model.hibernate.property.MeterInfo;
import com.model.hibernate.property.SettingRendInfo;
import com.property.base.ebi.FeesEbi;
import com.ufo.framework.common.core.exception.InsertException;
import com.ufo.framework.common.core.exception.ResponseErrorInfo;
import com.ufo.framework.common.core.utils.AppUtils;
import com.ufo.framework.common.core.web.SortParameter;
import com.ufo.framework.system.ebi.CommonException;
import com.ufo.framework.system.ebi.Ebi;
import com.ufo.framework.system.repertory.SqlModuleFilter;
import com.ufo.framework.system.shared.module.DataFetchResponseInfo;

@Service
public class FeesEbo implements FeesEbi,CommonException {
	
	
	private static final String  FEES_TYPE_WATER="001";//水费
	private static final String  FEES_TYPE_POWER="002";//电费
	private static final String  FEES_TYPE_COAL="003";//煤气费
	
	
	@Resource(name="ebo")
	private Ebi ebi;

	public Ebi getEbi() {
		return ebi;
	}
	
	public  DataFetchResponseInfo fetchData(String moduleName, Integer start, Integer limit, String sort,String query, String navigates,String nodeInfoType
			) throws Exception {
		DataFetchResponseInfo responseInfo=new DataFetchResponseInfo();
		SortParameter sorts[] = SortParameter.changeToSortParameters(sort);
		List<SqlModuleFilter> navigateFilters=  changeToNavigateFilters(navigates);
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
		String countHql = "select count(*) from "
				+ moduleName + " where 1=1 ";
		  try {
			List<MeterInfo> rows= (List<MeterInfo>) ebi.queryByHql(hql+whereSql, start, limit);
			List<Map<String,Object>> views=new ArrayList<>();
			views=rows.parallelStream().map(item->{
				Map<String,Object> itemView=new HashMap<>();
				itemView.put("tf_startnumber", item.getTf_startnumber());
				itemView.put("tf_MeterId", item.getTf_MeterId());
				itemView.put("tf_endnumber", item.getTf_endnumber());
				itemView.put("tf_meterdate", item.getTf_meterdate());
				itemView.put("tf_mtermane", item.getTf_mtermane());
				if(item.getTf_ResidentInfo()!=null){
					itemView.put("tf_ResidentInfo", item.getTf_ResidentInfo().getTf_number()+"  "+item.getTf_ResidentInfo().getTf_residentName());	
				}
				itemView.put("tf_state", item.getTf_state());
				itemView.put("tf_acount", item.getTf_acount());
				itemView.put("tf_remark", item.getTf_remark());
				itemView.put("tf_mtype", FEES_TYPE_WATER);
				return itemView;
			}).collect(Collectors.toList());
			
			Integer count= ebi.getCount(countHql+whereSql);
			responseInfo.setTotalRows(count);
			responseInfo.setMatchingObjects(views);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return responseInfo;
		
		
	}
	
	public void updateAcount(String rendate,String type) throws Exception{
		SimpleDateFormat datefd=new SimpleDateFormat("yyyy-MM-dd");
		SimpleDateFormat datefm=new SimpleDateFormat("yyyy-MM");
		Date  rdate=datefd.parse(rendate);
		Date startDate=AppUtils.getMonthStart(rdate);
		Date endDate=AppUtils.getMonthEnd(rdate);
		String startStr=datefd.format(startDate);
		String endStr=datefd.format(endDate);
	    String setHsql=" select count(*) from SettingRendInfo where 1=1 and tf_rendDate='"+datefm.format(rdate)+"' and tf_mtype='"+type+"'"+getCurrentXcodeSql();
	    Integer count= ebi.getCount(setHsql);
	    if(count==0){
	    	SettingRendInfo  settingRendInfo=new SettingRendInfo();
	    	settingRendInfo.addXcode();
	    	settingRendInfo.setTf_rendDate(datefm.format(rdate));
	    	settingRendInfo.setTf_mtype(type);
	    	ebi.save(settingRendInfo);
	    }else{
	    	getAppException("fees", datefm.format(rdate)+"已经结束抄表，请不要重复操作", ResponseErrorInfo.STATUS_APP_BAN);
	    	
	    }
		String hql=" from MeterInfo where 1=1 and  tf_mtype='"+type+"' and tf_meterdate between '"+startStr+"' and '"+endStr+"'"+getCurrentXcodeSql();
	    List<MeterInfo> list= (List<MeterInfo>) ebi.queryByHql(hql);
	    list.parallelStream().forEach(item->{
	    	  double startM=item.getTf_startnumber();
	    	  double endN=item.getTf_endnumber();
	    	  double acount=endN-startM;
	    	  item.setTf_acount(acount);
	    	  item.setTf_rendDate(datefm.format(rdate));
	    	  item.setTf_state("1");
	    	  try {
				ebi.update(item);
			} catch (Exception e) {
				e.printStackTrace();
			}
	    });
	}
	private List<SqlModuleFilter> changeToNavigateFilters(String str) {
		List<SqlModuleFilter> result = new ArrayList<SqlModuleFilter>();
		if (str != null && str.length() > 5) {
			JsonConfig config = new JsonConfig();
			config.setArrayMode(JsonConfig.MODE_OBJECT_ARRAY);
			config.setRootClass(SqlModuleFilter.class);
			SqlModuleFilter[] navigateFilters = (SqlModuleFilter[]) JSONSerializer.toJava(
					JSONArray.fromObject(str), config);
			// System.out.println(navigateFilters[0]);
			for (SqlModuleFilter f : navigateFilters)
				result.add(f);
		}
		result.parallelStream().forEach(item->System.out.println(item.getFilterSql()));
		return result;
	}
	
	
	
	


}
