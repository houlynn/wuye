package com.property.base.ebo;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;




import javax.annotation.Resource;




import org.springframework.stereotype.Service;




import com.model.hibernate.property.ResidentInfo;
import com.property.base.ebi.UnitFeesEbi;
import com.property.base.vo.UnitViewInfo;
import com.ufo.framework.common.core.web.ModuleServiceFunction;
import com.ufo.framework.common.core.web.SortParameter;
import com.ufo.framework.system.ebi.Ebi;
import com.ufo.framework.system.repertory.SqlModuleFilter;
import com.ufo.framework.system.shared.module.DataFetchResponseInfo;

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
			view.setIamgUrl("images/phones/Audiovox-CDM8600.png");
			view.setRid(item.getTf_residentId());
			view.setRname(item.getTf_residentName());
			view.setStateFees("1".equals(item.getTf_stateFees())?"欠费":"");
			view.setStateOccupancy("1".equals(item.getTf_stateOccupancy())?"入住":"");
			view.setStateRepair("1".equals(item.getTf_stateRepair())?"报修":"");
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
	
	
}
