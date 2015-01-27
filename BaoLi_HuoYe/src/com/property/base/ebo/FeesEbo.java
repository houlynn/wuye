package com.property.base.ebo;

import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.annotation.Resource;
import javax.persistence.CascadeType;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.springframework.stereotype.Service;

import net.sf.json.JSONArray;
import net.sf.json.JSONSerializer;
import net.sf.json.JsonConfig;

import com.model.hibernate.property.InnstallBill;
import com.model.hibernate.property.LevelInfo;
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
public class FeesEbo implements FeesEbi, CommonException {

	@Resource(name = "ebo")
	private Ebi ebi;

	public Ebi getEbi() {
		return ebi;
	}

	public DataFetchResponseInfo fetchData(String moduleName, Integer start,
			Integer limit, String sort, String query, String navigates,
			String nodeInfoType) throws Exception {
		
		
		  DecimalFormat df = new DecimalFormat("#.00");
		DataFetchResponseInfo responseInfo = new DataFetchResponseInfo();
		SortParameter sorts[] = SortParameter.changeToSortParameters(sort);
		List<SqlModuleFilter> navigateFilters = changeToNavigateFilters(navigates);
		String hql = " from MeterInfo where 1=1 and tf_mtype='"
				+ MeterInfo.FEES_TYPE_WATER + "'" + getCurrentXcodeSql();
		String whereSql = "";
		if ("0".equals(nodeInfoType)) {
			SqlModuleFilter nav = navigateFilters.get(0);
			whereSql += " and  tf_ResidentInfo.tf_levelInfo.tf_parent="
					+ nav.getEqualsValue();
		} else if ("1".equals(nodeInfoType)) {
			SqlModuleFilter nav = navigateFilters.get(0);
			whereSql += " and  tf_ResidentInfo.tf_levelInfo="
					+ nav.getEqualsValue();
		} else if ("2".equals(nodeInfoType)) {
			SqlModuleFilter nav = navigateFilters.get(0);
			whereSql += " and  tf_ResidentInfo=" + nav.getEqualsValue();
		}
		String countHql = "select count(*) from " + moduleName + " where 1=1 ";
		try {
			List<MeterInfo> rows = (List<MeterInfo>) ebi.queryByHql(hql
					+ whereSql, start, limit);
			List<Map<String, Object>> views = new ArrayList<>();
			views = rows
					.stream()
					.map(item -> {
						Map<String, Object> itemView = new HashMap<>();
						itemView.put("tf_startnumber", item.getTf_startnumber());
						itemView.put("tf_MeterId", item.getTf_MeterId());
						itemView.put("tf_endnumber", item.getTf_endnumber());
						itemView.put("tf_meterdate", item.getTf_meterdate());
						itemView.put("tf_mtermane", item.getTf_mtermane());
						if (item.getTf_ResidentInfo() != null) {
							itemView.put("tf_ResidentInfo", item
									.getTf_ResidentInfo().getTf_number()
									+ "  "
									+ item.getTf_ResidentInfo()
											.getTf_residentName());
						}
						itemView.put("tf_state", item.getTf_state());
						itemView.put("tf_acount", df.format(item.getTf_acount()));
						itemView.put("tf_remark", item.getTf_remark());
						itemView.put("tf_mtype", MeterInfo.FEES_TYPE_WATER);
						return itemView;
					}).collect(Collectors.toList());

			Integer count = ebi.getCount(countHql + whereSql);
			responseInfo.setTotalRows(count);
			responseInfo.setMatchingObjects(views);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return responseInfo;

	}

	/**
	 * 结束抄表
	 * 
	 * @param rendate
	 *            抄表周期
	 * @param type
	 *            抄表类型
	 * @param leveid
	 *            栋
	 * @throws Exception
	 */
	public void updateAcount(String rendate, String type, int leveid)
			throws Exception {
		SimpleDateFormat datefd = new SimpleDateFormat("yyyy-MM-dd");
		SimpleDateFormat datefm = new SimpleDateFormat("yyyy-MM");
		Date rdate = datefd.parse(rendate);
		Date startDate = AppUtils.getMonthStart(rdate);
		Date endDate = AppUtils.getMonthEnd(rdate);
		String startStr = datefd.format(startDate);
		String endStr = datefd.format(endDate);
		String setHsql = " select count(*) from SettingRendInfo where 1=1 and tf_rendDate='"
				+ datefm.format(rdate)
				+ "' and tf_mtype='"
				+ type
				+ "' and tf_LevelInfo=" + leveid;
		Integer count = ebi.getCount(setHsql);
		if (count == 0) {
			SettingRendInfo settingRendInfo = new SettingRendInfo();
			settingRendInfo.addXcode();
			settingRendInfo.setTf_rendDate(datefm.format(rdate));
			settingRendInfo.setTf_mtype(type);
			LevelInfo levelInfo = new LevelInfo();
			levelInfo.setTf_leveId(leveid);
			settingRendInfo.setTf_LevelInfo(levelInfo);
			ebi.save(settingRendInfo);
		} else {
			getAppException("fees", datefm.format(rdate) + "已经结束抄表，请不要重复操作",
					ResponseErrorInfo.STATUS_APP_BAN);

		}
		String hql = " from MeterInfo where 1=1 and  tf_mtype='" + type
				+ "' and tf_meterdate between '" + startStr + "' and '"
				+ endStr + "' and tf_ResidentInfo.tf_levelInfo.tf_parent="
				+ leveid;
		List<MeterInfo> list = (List<MeterInfo>) ebi.queryByHql(hql);
		// 批量更新抄表状态 设置抄表周期
		list.stream().forEach(item -> {
			double startM = item.getTf_startnumber();
			double endN = item.getTf_endnumber();
			double acount = endN - startM;
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
			SqlModuleFilter[] navigateFilters = (SqlModuleFilter[]) JSONSerializer
					.toJava(JSONArray.fromObject(str), config);
			// System.out.println(navigateFilters[0]);
			for (SqlModuleFilter f : navigateFilters)
				result.add(f);
		}
		result.parallelStream().forEach(
				item -> System.out.println(item.getFilterSql()));
		return result;
	}

	public boolean addInnstallBill(int[] levfs, int instrid)
			throws Exception {
          boolean flag=false;
		String hql = " from InnstallBill where 1=1 and tf_insid=" + instrid
				+ "";
		List<InnstallBill> list = (List<InnstallBill>) ebi.queryByHql(hql);
		InnstallBill bill = null;
		if (list != null && list.size() > 0) {
			bill = list.get(0);
			List<LevelInfo> levfslist = bill.getTf_LevelInfos();
			if (levfslist != null && levfslist.size() > 0) {
				for (LevelInfo l : levfslist) {
					l.setTf_InnstallBill(null);
					Map<String,Object> values=new HashMap<String, Object>();
					values.put("tf_InnstallBill", null);
					ebi.update(values, LevelInfo.class, l.getTf_leveId());
				}
			}
		}
		if(bill!=null){
		for (int levf : levfs) {
			Map<String,Object> values=new HashMap<String, Object>();
			values.put("tf_InnstallBill", bill);
			ebi.update(values, LevelInfo.class, levf);
		}
		flag=true;
		}
		return flag;

	}

}
