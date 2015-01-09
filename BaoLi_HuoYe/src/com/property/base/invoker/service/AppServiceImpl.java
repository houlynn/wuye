package com.property.base.invoker.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import net._139130.www.WebServiceStub.PostResponse;

import org.apache.commons.beanutils.BeanUtils;
import org.springframework.stereotype.Service;

import com.model.app.common.AppContract;
import com.model.hibernate.property.BillContext;
import com.model.hibernate.property.BillItem;
import com.model.hibernate.property.ExpressInfo;
import com.model.hibernate.property.PayKey;
import com.model.hibernate.property.PointFrientInfo;
import com.model.hibernate.property.RepairInfo;
import com.model.hibernate.property.ResidentInfo;
import com.model.hibernate.property.Village;
import com.model.hibernate.system.shared.Dictionary;
import com.model.hibernate.system.shared.DictionaryItem;
import com.model.hibernate.system.shared.EndUser;
import com.model.hibernate.system.shared.XCodeInfo;
import com.property.base.ebi.UnitFeesEbi;
import com.property.base.invoker.model.AppExpressInfo;
import com.property.base.invoker.model.AppItemInfo;
import com.property.base.invoker.model.AppPointInfo;
import com.property.base.invoker.model.AppResident;
import com.property.base.invoker.model.AppVillage;
import com.property.base.invoker.serviceinterface.AppService;
import com.ufo.framework.common.core.utils.AppUtils;
import com.ufo.framework.common.core.utils.StringUtil;
import com.ufo.framework.common.model.Model;
import com.ufo.framework.system.ebi.Ebi;
import com.ufo.framework.system.shared.module.DataUpdateResponseInfo;
import com.ufo.framework.system.web.SecurityUserHolder;

@Service
public class AppServiceImpl implements AppService {

	private final static String POINTTYPE = "POINTTYPE";// 终点工
	private final static String BAOMU = "BAOMU";// 保姆
	private final static String YUESAO = "YUESAO";// 月嫂

	@Resource(name = "ebo")
	private Ebi ebi;
	
	@Resource
	private UnitFeesEbi  unitFeesEbi;

	@Override
	public List<AppVillage> loadVis(String tf_locationxy, String city)
			throws Exception {
		String hql = " from  Village where 1=1 and tf_city='" + city
				+ "' order by tf_locationxy desc";
		List<Village> vages = (List<Village>) ebi.queryByHql(hql);
		List<AppVillage> views = new ArrayList<AppVillage>();
		if (vages.size() == 0) {
			hql = " from  Village where 1=1  order by tf_locationxy desc ";
			vages = (List<Village>) ebi.queryByHql(hql);
		}
		views = vages.stream().map(item -> {
			AppVillage viewItem = new AppVillage();
			try {
				BeanUtils.copyProperties(viewItem, item);
			} catch (Exception e) {
				e.printStackTrace();
			}
			return viewItem;
		}).collect(Collectors.toList());
		return views;
	}

	@Override
	public Map<String, Object> loadPoint(int start, int limit, String ctype,
			int vid) throws Exception {
		String whereSql = " and tf_ctype='" + ctype + "' and tf_Village=" + vid
				+ " and tf_state='1' ";
		String orderSql = " order  by tf_posttime desc  ";
		// TODO Auto-generated method stub
		Map<String, Object> map = this.load(start, limit, whereSql, "", "",
				orderSql, "PointFrientInfo");
		String type = AppServiceImpl.POINTTYPE;
		if ("001".equals(ctype)) {
			type = AppServiceImpl.POINTTYPE;
		} else if ("002".equals(ctype)) {
			type = AppServiceImpl.BAOMU;
		} else if ("003".equals(ctype)) {
			type = AppServiceImpl.YUESAO;
		}
		String hql = " from Dictionary where 1=1 and ddCode='" + type + "'";
		List<Dictionary> dds = (List<Dictionary>) ebi.queryByHql(hql);
		String typeName = "";
		if (dds == null || dds.size() == 0 || dds.get(0).getChildren() == null
				|| dds.get(0).getChildren().size() == 0) {
			typeName = "终点工";
		}
		final String typess = typeName;
		List<PointFrientInfo> list = (List<PointFrientInfo>) map.get("items");
		List<AppPointInfo> items = list
				.stream()
				.map(item -> {
					AppPointInfo view = new AppPointInfo();
					try {
						BeanUtils.copyProperties(view, item);
						if (StringUtil.isEmpty(typess)) {
							Dictionary dic = dds.get(0);
							for (DictionaryItem dd : dic.getChildren()) {
								String ddCode = dd.getItemCode();
								String ddName = dd.getItemName();
								if (StringUtil.isNotEmpty(ddName)) {
									if (item.getTf_type().equals(ddCode)) {
										view.setTf_type(ddName);
										view.setTf_vid(item.getTf_Village()
												.getTf_viid());
									}
								}
							}
						} else {
							item.setTf_ctype(typess);
						}
					} catch (Exception e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					return view;
				}).collect(Collectors.toList());
		map.put("items", items);

		return map;
	}

	public Map<String, Object> load(int start, int limit, String whereSql,
			String parentSql, String querySql, String orderSql,
			String moduleName) throws Exception {
		StringBuffer hql = new StringBuffer(" from " + moduleName
				+ " where 1=1 ");
		StringBuffer countHql = new StringBuffer("select count(*) from "
				+ moduleName + " where 1=1");
		hql.append(whereSql);
		hql.append(parentSql);
		hql.append(querySql);
		countHql.append(whereSql);
		countHql.append(querySql);
		countHql.append(parentSql);
		Integer count = ebi.getCount(countHql.toString()).intValue();
		hql.append(orderSql);
		List<?> rows = ebi.queryByHql(hql.toString(), Integer.valueOf(start),
				Integer.valueOf(limit));
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("totalCount", count);
		map.put("items", rows);
		return map;
	}

	public Map<String, String> addAppExpressInfo(AppExpressInfo model) {
		Map<String, String> resultMap = new HashMap<String, String>();
		boolean flag = false;
		int vid = model.getTf_vid();
		try {
			Village viinfo = ebi.findById(Village.class, vid);
			if (viinfo == null) {
				flag = false;
				resultMap.put("msg", "无效的小区标示");
			} else {
				ExpressInfo expressInfo = new ExpressInfo();
				BeanUtils.copyProperties(expressInfo, model);
				expressInfo.setTf_village(viinfo);
				expressInfo.setTf_postTime(AppUtils.getCurrentTime());
				ebi.save(expressInfo);
				flag = true;
			}

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			flag = false;
			resultMap.put("msg", "提交失败!");
		}
		resultMap.put("result", flag + "");
		return resultMap;
	}

	@Override
	public Map<String, String> addRepairInfo(String repairTitle,
			String repairContent, int rid) {
		boolean flag = false;
		RepairInfo repairInfo = new RepairInfo();
		repairInfo.setTf_repairItem(repairTitle);
		repairInfo.setTf_remark(repairContent);
		repairInfo.setTf_repairTime(AppUtils.getCurrentTime());
		repairInfo.setTf_state("001");
		Map<String, String> result = new HashMap<String, String>();
		ResidentInfo resInfo;
		try {
			resInfo = ebi.findById(ResidentInfo.class, rid);
			if (resInfo == null) {
				result.put("msg", "无效的业主信息,请使用业主账户登录!");
				flag = false;
			} else {
				repairInfo.setTf_ResidentInfo(resInfo);
				ebi.save(repairInfo);
				flag = true;
			}
		} catch (Exception e) {
			e.printStackTrace();
			flag = false;
			result.put("msg", "提交失败!");
		}
		result.put("result", "" + flag);
		return result;
	}

	@Override
	public AppResident getAppResident(int id) throws Exception {
		// TODO Auto-generated method stub
		ResidentInfo info=ebi.findById(ResidentInfo.class, id);
		AppResident appResident=new AppResident();
		BeanUtils.copyProperties(appResident, info);
		return appResident;
	}

	@Override
	public AppVillage getAppVillage(int id) throws Exception {
		// TODO Auto-generated method stub
		Village info=ebi.findById(Village.class, id);
		AppVillage  appVillage=new AppVillage();
		BeanUtils.copyProperties(appVillage, info);
		return appVillage;
	}

	@Override
	  public List<Map<String,Object>>  loadFeesItem(int rid) throws Exception {
		return unitFeesEbi.loadFees(rid);
	}

	@Override
	public Map<String, String> pay(int vid, int rid, String appUser,  int[] billids)
			throws Exception {
		// TODO Auto-generated method stub
		Map<String,String> map= unitFeesEbi.addpayByApp(vid, rid, appUser, billids);
		return map;
	}

	@Override
	public List<AppResident> loadAppResident(String loginCode) throws Exception {
		// TODO Auto-generated method stub
		String hql=" from ResidentInfo where 1=1 and tf_appPhone='"+loginCode+"' ";
		List<ResidentInfo> list= (List<ResidentInfo>) ebi.queryByHql(hql);
		List<AppResident> result=new ArrayList<AppResident>();
		result=list.stream().map(item->{
			AppResident appResident=new AppResident();
			try {
				BeanUtils.copyProperties(appResident, item);
				appResident.setTf_vid(item.getTf_levelInfo().getTf_village().getTf_viid());
				appResident.setTf_lefStr(item.getTf_levelInfo().getTf_parent().getTf_leveName()+" "+item.getTf_levelInfo().getTf_leveName());
				
			} catch (Exception e) {
				e.printStackTrace();
			}
			return appResident;
			
		}).collect(Collectors.toList());
		return result;
	}

	@Override
	public Map<String, String> getPayKey(int vid) throws Exception {
		// TODO Auto-generated method stub
		Village village=ebi.findById(Village.class, vid);
		String xcode=village.getXcode();
		String codeId=xcode.substring(0,xcode.length()-1);
		XCodeInfo codeInfo=ebi.findById(XCodeInfo.class, codeId);
		String hql=" from PayKey where 1=1 and proid="+codeInfo.getTf_propertyCompany().getTf_proid();
		 List<PayKey> list= (List<PayKey>) ebi.queryByHql(hql);
	    Map<String,String> result=new HashMap<>();
		 if(list!=null&&list.size()>0){
				      PayKey key=(PayKey)list.get(0);
					 	String keyWorrd= key.getKeyword();
						 String code= key.getPayCode();
						result.put("key", code);
						result.put("pwd", keyWorrd);
						result.put("payType", key.getPayType());
		 }
		return result;
	}

	@Override
	public synchronized Map<String, String> postSMS(String phoneNuber) throws Exception {
		// TODO Auto-generated method stub
		  Map<String,String> map=new HashMap<>();
		  Random rd = new Random();
		  String vode="";
		  int getNum;
		  do {
		   getNum = Math.abs(rd.nextInt())%10 + 48;//产生数字0-9的随机数
		   char num1 = (char)getNum;
		   String dn = Character.toString(num1);
		   vode += dn;
		  } while (vode.length()<6);
		PostResponse postResponse=  MsgPostService.postSms(AppContract.SMS_CONTENT+vode, phoneNuber, AppContract.SMS_ACCOUNT, AppContract.SMS_PWD);
		int ruslt= postResponse.getPostResult().getResult();
		map.put("code", String.valueOf(ruslt));
		map.put("vcode", vode);
		return map;
	}

}
