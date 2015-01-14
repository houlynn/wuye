package com.property.base.ebo;
import com.model.hibernate.property.BillItem;

import java.lang.reflect.Array;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.hibernate.jdbc.Work;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseBody;

import com.model.hibernate.property.BillContext;
import com.model.hibernate.property.FeesInfo;
import com.model.hibernate.property.FeesTypeItem;
import com.model.hibernate.property.MeterInfo;
import com.model.hibernate.property.ResidentInfo;
import com.model.hibernate.system.shared.EndUser;
import com.property.base.ebi.UnitFeesEbi;
import com.property.base.invoker.model.AppItemInfo;
import com.property.base.vo.UnitViewInfo;
import com.ufo.framework.common.core.utils.AppUtils;
import com.ufo.framework.common.core.utils.StringUtil;
import com.ufo.framework.common.core.web.ModuleServiceFunction;
import com.ufo.framework.common.core.web.SortParameter;
import com.ufo.framework.common.model.Model;
import com.ufo.framework.system.ebi.Ebi;
import com.ufo.framework.system.repertory.SqlModuleFilter;
import com.ufo.framework.system.shared.module.DataFetchResponseInfo;
import com.ufo.framework.system.shared.module.DataUpdateResponseInfo;
import com.ufo.framework.system.web.SecurityUserHolder;

@Service
public class UniteFeesEbo implements UnitFeesEbi {

	@Resource(name="ebo")
	private Ebi ebi;
	public Ebi getEbi() {
		return ebi;
	}
	public void setEbi(Ebi ebi) {
		this.ebi = ebi;
	}

	/**
	 * 返回单元信息
	 * @param navigates
	 * @param sort
	 * @param moduleType
	 * @return
	 */
	public DataFetchResponseInfo loadUnit(String navigates,String orderSql,String moduleType){
	DataFetchResponseInfo responseInfo=new DataFetchResponseInfo();
	//String sorts=ModuleServiceFunction.getSortParam(sort);
	List<SqlModuleFilter> navigateFilters=ModuleServiceFunction.changeToNavigateFilters(navigates);
	String whereSql=" ";
	if("1".equals(moduleType)){
		   String value= navigateFilters.get(0).getEqualsValue();
		   whereSql+=" tf_levelInfo="+value;
	}else if("0".equals(moduleType)){
		 String value= navigateFilters.get(0).getEqualsValue();
		   whereSql+=" tf_levelInfo.tf_parent="+value;
	}
	String hql=" from ResidentInfo where 1=1 and"+whereSql+" "+orderSql;
	String  countHql=" select count(*) from ResidentInfo where 1=1 and "+whereSql;
	 try {
		 List<UnitViewInfo> views=new ArrayList<UnitViewInfo>();
	    Integer totalRows=ebi.getCount(countHql);
		List<ResidentInfo> list= (List<ResidentInfo>) ebi.queryByHql(hql);
		views=list.parallelStream().map(item->{
			UnitViewInfo view=new UnitViewInfo();
			view.setIamgUrl("images/system/resident.jpg");
			view.setRid(item.getTf_residentId());
			view.setRname(item.getTf_residentName());
			view.setStateFees("true".equals(item.getTf_stateFees())?"欠费":"");
			view.setStateOccupancy("true".equals(item.getTf_stateOccupancy())?"入住":"");
			view.setStateRepair("true".equals(item.getTf_stateRepair())?"报修":"");
			view.setNumber(item.getTf_number());
			return  view;
		}).collect(Collectors.toList());
		responseInfo.setTotalRows(totalRows);
		responseInfo.setMatchingObjects(views);
	} catch (Exception e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	return responseInfo;
	}
	
	/**
	 * 产生用欠费信息 如果收费标准有调整可以MeterInfo来调整单价也金额
	 * @throws Exception 
	 */
public 	DataFetchResponseInfo addUniteFees(int rid,int rtype
		) throws Exception{
	DataFetchResponseInfo reuslt=new DataFetchResponseInfo();
	String hql_ft=" from FeesTypeItem where 1=1 and tf_ResidentInfo="+rid;
	SimpleDateFormat sdd=new SimpleDateFormat("yyyy-MM-dd");
	SimpleDateFormat sdm=new SimpleDateFormat("yyyy-MM");
	//取当前时间为结束天
	String endTime=sdd.format(new Date());
	//取当前时间为结束月
	String endMonth=sdm.format(new Date());
	//获取业主收费项目
	List<FeesTypeItem> fessItems=(List<FeesTypeItem>) ebi.queryByHql(hql_ft);
	//遍历业主收费项目
	List<BillItem> bills=new ArrayList<>();
	fessItems.forEach(item->{
	debug("遍历:"+item.getTf_ResidentInfo().getTf_residentName()+item.getTf_FeesInfo().getTf_freesName());	
	int feesid=item.getTf_FeesInfo().getTf_feesid();
	//开始时间	
	String start=item.getTf_beginDate();
	//结束时间
	String end=StringUtil.isEmpty(item.getTf_endDate())?endTime:item.getTf_endDate();
	int reslut= endMonth.compareTo(end);
	String startDate=start+"-01";
	String endDate=end+"-01";
	if(reslut<0){
		endDate=endTime;
	}
	//取得至今收费周期
	List<String> months=AppUtils.getMonthList(startDate, endDate);
	for(String m : months){
		//已收项目
		String nchql=" select count(*) from BillItem where 1=1 and tf_state='1' and tf_FeesInfo="+feesid+" and tf_feesDate='"+m+"'";
		//未收项目
		String ochql=" select count(*) from BillItem where 1=1 and tf_state='0'  and tf_FeesInfo="+feesid+" and tf_feesDate='"+m+"'";
		String ohql="from BillItem where 1=1 and tf_state='0' and tf_FeesInfo="+feesid+"  and tf_feesDate='"+m+"' order by tf_feesDate desc,tf_FeesInfo";
		Integer count=0;
		try {
		 count=ebi.getCount(nchql);
		 if(count==1){
			 continue;//如果已经收过了不添加
		 }else{
		  count=ebi.getCount(ochql);
		     if(count==1){
			    List<BillItem> listItem= (List<BillItem>) ebi.queryByHql(ohql);
			    bills.add(listItem.get(0));//如何没收但是记录已经经存在则添加
			    continue;
		    }else{
		    	//如何未收但是记录不存在产生一条收费记录
		    	BillItem bill=new BillItem();
		    	bill.setTf_feesDate(m);//收费周期
		    	bill.setTf_FeesInfo(item.getTf_FeesInfo());//收费标准
		    	bill.setTf_state("0");//收费状态
		    	if(rtype==1){
		    	bill.addXcode();//物业标示
		    	}
		    	String feesType=item.getTf_FeesInfo().getTf_feesType();//收费项目类型
		    	//费用为抄表类型
		    	debug("收费标准类型:"+feesType);
		    	switch (feesType) {
		    	//抄表 度数计量类型
				case FeesInfo.FB:{
					//////////////////////查找当月的 电表 水表 煤气表 //////////////////////////////
			    	String mhql="from MeterInfo where 1=1 and  tf_rendDate='"+m+"' and tf_FeesInfo="+item.getTf_FeesInfo().getTf_feesid()+" and tf_ResidentInfo="+rid;
			    	List<MeterInfo> mlist= (List<MeterInfo>) ebi.queryByHql(mhql);
			    	if(mlist!=null&&mlist.size()>0){
			    		MeterInfo meterInfo=mlist.get(0);
			    		bill.setTf_MeterInfo(meterInfo);
			    		bill.setTf_count(meterInfo.getTf_endnumber()- meterInfo.getTf_startnumber());
			    		bill.setTf_acount(bill.getTf_count()*item.getTf_FeesInfo().getTf_price());
			    		bill.setTf_price(item.getTf_FeesInfo().getTf_price());
			    		debug(m+"查询到一条抄表费用");	
			    	}else{
			    		debug(m+"没有抄表信息");	
			    		continue;
			    	}
				}
			    break;
		     //////////////////////////////////////////////////////////	    
				//单价*建筑面积类型	
		        case FeesInfo.FC:{
		    		//非抄表类型只算单价作为收费金额
		    		String hql=" from MeterInfo where 1=1 and tf_mtype='"+MeterInfo.FEES_TYPE_UNITE+"' and tf_rendDate='"+m+"'and tf_FeesInfo="+item.getTf_FeesInfo().getTf_feesid();
		    		List<MeterInfo> mlist= (List<MeterInfo>) ebi.queryByHql(hql);
		    		if(mlist!=null&&mlist.size()>0){
			    		MeterInfo meterInfo=mlist.get(0);
			    		bill.setTf_MeterInfo(meterInfo);
			    		debug(m+"查询到一条单价*建筑面积类型费用");	
			    		}else{
			    			MeterInfo meterInfo=new MeterInfo();
			    			meterInfo.setTf_mtermane(item.getTf_FeesInfo().getTf_freesName());//项目名称
			    			meterInfo.setTf_FeesInfo(item.getTf_FeesInfo());//收费标准
			    			ResidentInfo residentInfo= ebi.findById(ResidentInfo.class, rid);
			    			meterInfo.setTf_ResidentInfo(residentInfo);
			    			meterInfo.setTf_acount(residentInfo.getTf_builArea());//建筑面积
			    			meterInfo.setTf_mtype(MeterInfo.FEES_TYPE_UNITE);
			    			meterInfo.setTf_rendDate(m);//收费周期
			    			if(rtype==1){
			    			meterInfo.addXcode();
			    			}
			    			meterInfo.setTf_meterdate(AppUtils.getCurDate());
			    			ebi.save(meterInfo);
			    			debug("插入一条/单价*建筑面积类型收费信息");		
			    			bill.setTf_MeterInfo(meterInfo);
			    			bill.setTf_count(meterInfo.getTf_acount());
			    			bill.setTf_price(item.getTf_FeesInfo().getTf_price());//设置单价
			    			bill.setTf_acount(item.getTf_FeesInfo().getTf_price()*meterInfo.getTf_acount());//计算金额
			    		}
				}
				break;
				/////////////////////////////////////////////////////////////
				//直收金额类型	
		        case FeesInfo.FM:{
		        	String hql=" from MeterInfo where 1=1 and tf_mtype='"+MeterInfo.FEES_TYPE_NOUNITE+"' and tf_rendDate='"+m+"'and tf_FeesInfo="+item.getTf_FeesInfo().getTf_feesid();
		        	List<MeterInfo> mlist= (List<MeterInfo>) ebi.queryByHql(hql);
		    		if(mlist!=null&&mlist.size()>0){
			    		MeterInfo meterInfo=mlist.get(0);
			    		bill.setTf_MeterInfo(meterInfo);
			    		debug(m+"查询到一条直收金额类型类型费用");	
			    		}else{
			    			MeterInfo meterInfo=new MeterInfo();
			    			meterInfo.setTf_mtermane(item.getTf_FeesInfo().getTf_freesName());//项目名称
			    			meterInfo.setTf_FeesInfo(item.getTf_FeesInfo());//收费标准
			    			meterInfo.setTf_mtype(MeterInfo.FEES_TYPE_NOUNITE);
			    			ResidentInfo residentInfo= ebi.findById(ResidentInfo.class, rid);
			    			meterInfo.setTf_ResidentInfo(residentInfo);
			    			meterInfo.setTf_rendDate(m);//收费周期
			    			if(rtype==1){
			    			meterInfo.addXcode();
			    			}
			    			meterInfo.setTf_meterdate(AppUtils.getCurDate());
			    			ebi.save(meterInfo);
			    			debug("插入一条直收金额类型收费信息");	
			    			bill.setTf_MeterInfo(meterInfo);
			    			bill.setTf_acount(item.getTf_FeesInfo().getTf_price());//设置
			    		}
		    				}
		    	break;		
				////////////////////////////////////////////////////////////////	
				}
		    	  ebi.save(bill);
		    	  debug("插入业主欠费信息");	
		    	  bills.add(bill);
		    }
		 }
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	});
	reuslt.setTotalRows(bills.size());
	reuslt.setMatchingObjects(bills);
	return reuslt;
}
	

/**
 * 应收金额
 * @param tf_shouldCount
 * 实收金额
 * @param tf_realACount
 * 收费条目ID[]
 * @param vid
 * @return
 */

public  DataUpdateResponseInfo adduniteFees(
		double tf_shouldCount,
		double tf_realACount,
		int rid,
		String tf_remark,
		int[] bids) throws Exception{
	DataUpdateResponseInfo result=new DataUpdateResponseInfo();
	BillContext bc=new BillContext();//构建长发
	EndUser endUser=SecurityUserHolder.getCurrentUser();
	bc.setTf_EndUser(endUser);//收费人
	bc.setTf_feesTime(AppUtils.getCurrentTime());//设置是收费时间
	ResidentInfo resinInf=new ResidentInfo();
	resinInf.setTf_residentId(rid);//业主
	bc.setTf_ResidentInfo(resinInf);
	bc.setTf_remark(tf_remark);//备注
	bc.setTf_shouldCount(tf_shouldCount);
	bc.setTf_realACount(tf_realACount);
	bc.setTf_month(AppUtils.getCurDate());
	bc.setTf_billCode(AppUtils.getRandomCode());
	ebi.save(bc);
	////////////////////////收费条目/////////////////////////////////////
	for(int bid :bids){
		BillItem bitem=ebi.findById(BillItem.class, bid);
		bitem.setTf_state(Model.MODEL_AUDIT);
		bitem.setTf_BillContext(bc);
        ebi.update(bitem);		
	}
	return result;
}

/**
 * 获取业主欠费总金额
 * @return
 */
public double getUniteFeesAcount(int rid){
	double sumAcount=0;
	String ohql="select sum(b.tf_acount) from BillItem b "+
 "inner join MeterInfo m on m.tf_MeterId=b.tf_MeterId "+
 " where b.tf_state='0'"+
 " and m.tf_residentId="+rid;
	 sumAcount =ebi.sum(ohql);
   	return sumAcount;
}

/**
 * App缴费信息
 * @param rid
 * @return
 * @throws Exception
 */
public List<Map<String,Object>> loadFees(int rid) throws Exception{
	DataFetchResponseInfo response= this.addUniteFees(rid,0);
	String sql= "select distinct tf_feesDate  from BillItem b "
			+ " inner  join MeterInfo m on m.tf_MeterId=b.tf_MeterId  "
			+ " inner  join ResidentInfo r on r.tf_residentId=m.tf_residentId  "
			+ "where 1=1 and b.tf_state='0' and r.tf_residentId="+rid; 
	SimpleDateFormat smm=new SimpleDateFormat("yyyy-MM");
	List<Map<String,String>> data=new ArrayList<>();
	  Work work=conn->{
		  PreparedStatement ps=  conn.prepareStatement(sql);
		  ResultSet rset=  ps.executeQuery();
		  while(rset.next()){
			  Map<String,String> viewItem=new HashMap<String, String>();
			  viewItem.put("tf_feesDate", rset.getString("tf_feesDate"));
			  data.add(viewItem);
			  viewItem=null;
		  }
		  rset.close();
	  };
	   ebi.doWork(sql, work, data);
	List<String>  dateList= data.stream().map(item->{
		   return item.get("tf_feesDate");
	   }).collect(Collectors.toList());
	List<Map<String,Object>> reuslt=new ArrayList<>();
	List<BillItem> bills=(List<BillItem>) response.getMatchingObjects();
	for(String date :dateList ){
		Map<String,Object> item=new HashMap<>();
		List<AppItemInfo> appItemInfos=new ArrayList<>();
		for(BillItem bill :bills){
			String billDate=bill.getTf_feesDate();
			if(date.equals( billDate)){
				AppItemInfo appItemInfo=new AppItemInfo();
				appItemInfo.setBillId(bill.getTf_billitemid());
				appItemInfo.setCount(bill.getTf_count());
				appItemInfo.setAcount(bill.getTf_acount());
				appItemInfo.setFeesName(bill.getTf_FeesInfo().getTf_freesName());
				appItemInfos.add(appItemInfo);
			}
		}
	
		item.put("date",date);
		item.put("feesItems",appItemInfos);
		reuslt.add(item);
		appItemInfos=null;
		item=null;
	}
	return reuslt;
	
}
/**
 * 为App生成订单
 * @param vid
 * @param rid
 * @param appUser
 * @param billids
 * @return
 * @throws Exception
 */
public Map<String, String> addpayByApp(int vid, int rid, String appUser,  int[] billids) throws Exception{
	float acount=0;
	boolean flag=false;
	Map<String, String> map=new HashMap<>();
	BillContext context=new BillContext();
	context.setTf_billCode(AppUtils.getRandomCode());
	context.setTf_feesTime(AppUtils.getCurrentTime());
	ResidentInfo residentInfo=new ResidentInfo();
	residentInfo.setTf_residentId(rid);
	context.setTf_ResidentInfo(residentInfo);
	context.setTf_isAppPay("1");
	context.setTf_appUser(appUser);
	context.setTf_month(AppUtils.getCurDate());
	ebi.save(context);
	flag=true;
	////////////////////////收费条目/////////////////////////////////////
	for(int bid :billids){
		BillItem bitem=ebi.findById(BillItem.class, bid);
		if(bitem==null){
		 map.put("msg", "无效的缴费信息!");	
		 flag=false;
		}
		bitem.setTf_BillContext(context);
		acount+=bitem.getTf_acount();
		bitem.setTf_state("0");
		ebi.update(bitem);
	}
	map.put("billCode", context.getTf_billCode());//订单号
	map.put("billContenId", context.getTf_billid()+"");//订单ID
	map.put("state", flag+"");//生成状态
	map.put("acount", acount+"");//实收金额
	map.put("createTime", context.getTf_feesTime());//时间
	return map;
}

/**
 * App支付
 * @param billConteId
 * @param billCode
 * @param vid
 * @param rid
 * @param billids
 * @param acount
 * @return
 * @throws Exception
 */
@Override
public Map<String, String> updateBill(int billConteId, String billCode, int vid, int rid, int[] billids,float acount)
		throws Exception {
	// TODO Auto-generated method stub
	 Map<String, String> reuslt=new HashMap<>();
	 boolean flag=true;
	 String hql=" from BillContext where 1=1 and tf_billid="+billConteId+" and tf_billCode='"+billCode+"' ";
     List<BillContext> list= (List<BillContext>) ebi.queryByHql(hql);
     if(list==null||list.size()==0){
    	 flag=false;
    	 debug("没有查找到主表记录!!!!!!!!");
    	 reuslt.put("msg", "无效的支付账单"); 
     }else{
    	 BillContext billContext= list.get(0);
    	 billContext.setTf_realACount(acount);//金额
    	 billContext.setTf_shouldCount(acount);//金额
    	 for(int bid :billids){
    			BillItem bitem=ebi.findById(BillItem.class, bid);
    			if(bitem==null){
    		     reuslt.put("msg", "无效的支付账单"); 
    		     debug("收费条目不存在！！");
    			 flag=false;
    			}
    			
    			if(flag){
    				BillContext bilContext=	bitem.getTf_BillContext();
    				 if(bilContext==null){
      				  reuslt.put("msg", "无效的支付账单"); 
      	    		    debug("提交了没关联的记录！！");
      	    		   flag=false;
      			  }
    			}
    			
    			
    			if(flag){
    				int cid= bitem.getTf_BillContext().getTf_billid();
    				if(cid!=billConteId){
    					 reuslt.put("msg", "无效的支付账单"); 
    					 debug("主从ID不相等!!!!!!!!");
    	    			 flag=false;
    			}
    		 }
    		 if(flag){
				bitem.setTf_state(Model.MODEL_AUDIT);
     			ebi.update(bitem);
    		 }
    	}
     }
     reuslt.put("state",flag+"");
	return reuslt;
}



	
}
