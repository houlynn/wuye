package com.property.base.controllers;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.model.hibernate.property.BillItem;
import com.model.hibernate.property.FeesInfo;
import com.model.hibernate.property.MeterInfo;
import com.property.base.ebi.UnitFeesEbi;
import com.ufo.framework.common.core.utils.AppUtils;
import com.ufo.framework.common.log.LogerManager;
import com.ufo.framework.system.ebi.Ebi;
import com.ufo.framework.system.irepertory.IModelRepertory;
import com.ufo.framework.system.shared.module.DataFetchResponseInfo;
import com.ufo.framework.system.shared.module.DataUpdateResponseInfo;
/**
* @author HouLynn
* @date 2014年12月20日
  @version 1.0
 */
@Controller
@RequestMapping("/unite")
public class UnitFeesController  implements LogerManager{
	
	private static final String RTYPE_HIS="001";
	private static final String RTYPE_FEES="002";
	
	@Resource
	private IModelRepertory moduleDAO;
	@Autowired
	private UnitFeesEbi uebi;
	@Resource(name="ebo")
	private Ebi ebi;
	
	public UnitFeesEbi getUebi() {
		return uebi;
	}

	public void setUebi(UnitFeesEbi uebi) {
		this.uebi = uebi;
	}

	@RequestMapping("/load")
	public @ResponseBody  Map<String, Object> loadUnite(
			@RequestParam(value = "navigates", required =true) String  navigates,
			@RequestParam(value = "moduleType", required =true) String moduleType,
			@RequestParam(value = "sort", required =true,defaultValue="order by tf_number ASC ") String orderSql
			 ){
		DataFetchResponseInfo response= uebi.loadUnit(navigates, orderSql, moduleType);
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("records", response.getMatchingObjects());
		result.put("totalCount", response.getTotalRows());
		return result;
	}
	
	/**
	 * 业主欠费数据
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping("/loadUniteFees")
	public @ResponseBody Map<String,Object> loadUniteFees(
			@RequestParam(value = "rid", required =true) int rid,
			@RequestParam(value = "rtype", required =false,defaultValue="002") String rtype,
	    	@RequestParam(value="orderSql",required=false,defaultValue=" order by tf_feesTime desc") String orderSql,
	    	@RequestParam(value="start",required=false,defaultValue="0") int start,
	    	@RequestParam(value="limit",required=false,defaultValue="20") int limit,
	    	@RequestParam(value="whereSql",required=false ,defaultValue="" ) String whereSql
			) throws Exception{
				switch (rtype) {
					case RTYPE_HIS: //收费历史
					 	return getFees(orderSql, start, limit, whereSql, rid);
					case RTYPE_FEES://欠费
					   return loadFees(rid);
				}
		    return  null;
	}

	private Map<String, Object> loadFees(int rid) throws Exception {
		DataFetchResponseInfo response= uebi.addUniteFees(rid);
		SimpleDateFormat sdd=new SimpleDateFormat("yyyy-MM-dd");
		List<BillItem> listData=(List<BillItem>) response.getMatchingObjects();
		listData.stream().map(item->{
		  FeesInfo feesInfo=item.getTf_FeesInfo();
		  MeterInfo meterInfo=  item.getTf_MeterInfo();
		  item.setTf_feesType("周期性收费");
		  if(meterInfo.getTf_mtype().equals(MeterInfo.FEES_TYPE_LL)){
			  item.setTf_feesType("临时性收费");
		  }
          try {
			String startDate= sdd.format( AppUtils.getMonthStart(sdd.parse(item.getTf_feesDate()+"-01")));
			String endDate= sdd.format( AppUtils.getMonthEnd(sdd.parse(item.getTf_feesDate()+"-01")));
			item.setTf_startDate(startDate);
			item.setTf_endDate(endDate);
		} catch (Exception e) {
			e.printStackTrace();
		}
          item.setTf_feesName(feesInfo.getTf_freesName());
           item.setTf_startNuber(String.valueOf(meterInfo.getTf_startnumber()));
           item.setTf_endNuber(String.valueOf(meterInfo.getTf_endnumber()));
       /*    item.setTf_price(String.valueOf(feesInfo.getTf_price()));
           double sumAcount=feesInfo.getTf_price()*meterInfo.getTf_acount();
           item.setTf_aacount(String.valueOf(sumAcount));*/
           //item.setTf_count(meterInfo.getTf_acount());
			return item;
		}).collect(Collectors.toList());
		Object obj= response.getMatchingObjects();
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("records", listData);
		result.put("totalCount", response.getTotalRows());
		return result;
	}
	/**
	 * 业主收费
	 *
	 */
	@RequestMapping("/fees")
  public @ResponseBody DataUpdateResponseInfo audite( 
			@RequestParam(value = "tf_shouldCount", required =true)   double tf_shouldCount,
			@RequestParam(value = "tf_realACount", required =true)   double tf_realACount,
			@RequestParam(value = "rid", required =true)   int rid,
			String tf_remark,
			@RequestParam(value = "bids", required =true)   int[] bids
		  ) throws Exception
		  {
	   DataUpdateResponseInfo resutl=new DataUpdateResponseInfo();
	   uebi.adduniteFees(tf_shouldCount, tf_realACount, rid, tf_remark, bids);
	  return resutl;
  }
	  /**
	   * 统计欠费金额
	   * @param rid
	   * @return
	   */
		@RequestMapping("/sum")	
	   public @ResponseBody double getSum(
			  @RequestParam(value = "rid", required =true)   int rid
			){
		  return uebi.getUniteFeesAcount(rid);
		
	}
		
		/**
		 * 收费历史
		 * @param rid
		 * @return
		 */
	
		public Map<String, Object>   getFees(
	    	@RequestParam(value="orderSql",required=false,defaultValue=" order by tf_feesTime desc") String orderSql,
	    	@RequestParam(value="start",required=false,defaultValue="0") int start,
	    	@RequestParam(value="limit",required=false,defaultValue="20") int limit,
	    	@RequestParam(value="whereSql",required=false ) String whereSql,
	    	@RequestParam(value="rid",required=true ) int rid) throws Exception{
			SimpleDateFormat sdd=new SimpleDateFormat("yyyy-MM-dd");
			Map<String, Object>  result=new HashMap<String, Object>();
		    whereSql+=" and b.tf_BillContext.tf_ResidentInfo="+rid;		
		    StringBuffer hql=new StringBuffer(" from BillItem b where 1=1");
		    StringBuffer countHql =new StringBuffer("select count(*) from  BillItem b  where 1=1 ");
			hql.append(whereSql);
			countHql.append(whereSql);
			Integer count =  ebi.getCount(countHql.toString()).intValue();
			hql.append(orderSql);
			List<BillItem> rows =  (List<BillItem>) ebi.queryByHql(hql.toString(), Integer.valueOf(start),Integer.valueOf(limit));
			rows=rows.stream().map(item->{
				  FeesInfo feesInfo=item.getTf_FeesInfo();
				  MeterInfo meterInfo=  item.getTf_MeterInfo();
				  item.setTf_feesType("周期性收费");
				  if(meterInfo.getTf_mtype().equals(MeterInfo.FEES_TYPE_LL)){
					  item.setTf_feesType("临时性收费");
				  }
		          try {
					String startDate= sdd.format( AppUtils.getMonthStart(sdd.parse(item.getTf_feesDate()+"-01")));
					String endDate= sdd.format( AppUtils.getMonthEnd(sdd.parse(item.getTf_feesDate()+"-01")));
					item.setTf_startDate(startDate);
					item.setTf_endDate(endDate);
				} catch (Exception e) {
					e.printStackTrace();
				}
		          item.setTf_feesName(feesInfo.getTf_freesName());
		           item.setTf_startNuber(String.valueOf(meterInfo.getTf_startnumber()));
		           item.setTf_endNuber(String.valueOf(meterInfo.getTf_endnumber()));
				return item;
			}).collect(Collectors.toList());
			result.put("records", rows);
			result.put("totalCount",count );
	        return result;
		}

}
