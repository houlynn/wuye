package com.property.base.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.model.hibernate.property.Village;
import com.model.hibernate.system.shared.EndUser;
import com.model.hibernate.system.shared.XCodeInfo;
import com.property.base.vo.ProUserInfo;
import com.ufo.framework.common.core.ext.model.JSONTreeNode;
import com.ufo.framework.system.ebi.Ebi;
import com.ufo.framework.system.web.SecurityUserHolder;

@RequestMapping("/vi")
@Controller
public class VillageController {

	@Resource(name="ebo")
	private Ebi ebi;
	
	
	/**
	 * 加载小区树
	 * @return
	 */
	@RequestMapping("/loadVi")
	public  @ResponseBody List<JSONTreeNode> getVill(){
		List<JSONTreeNode> views=new ArrayList<JSONTreeNode>();
		try {
			String hql=" from Village where 1=1 and xcode='"+SecurityUserHolder.getIdentification()+"'";
			List<Village> villages= (List<Village>) ebi.queryByHql(hql);
			views=	villages.stream().map(item->{
				JSONTreeNode node=new  JSONTreeNode();
				 node.setCode(item.getTf_viid()+"");
				 node.setText(item.getTf_name());
				 node.setNodeInfo("Village");
				return node;
			}).collect(Collectors.toList());
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return views;
	}
	
	
	public @ResponseBody
	Map<String, Object> fetchData(Integer start, Integer limit,
			@RequestParam(value="whereSql",required=false,defaultValue="") String whereSql,
	    	@RequestParam(value="parentSql",required=false,defaultValue="") String parentSql,
	    	@RequestParam(value="querySql",required=false,defaultValue="") String querySql,
	    	@RequestParam(value="orderSql",required=false,defaultValue="") String orderSql,
	    	@RequestParam(value="vid",required=true,defaultValue="") int vid,
			HttpServletRequest request) throws Exception {
		StringBuffer hql = new StringBuffer("from PointFrientInfo where 1=1  ");
		StringBuffer countHql = new StringBuffer("select count(*) from PointFrientInfo  where 1=1 ");
		whereSql = whereSql == null ? "" : whereSql;
		whereSql+=" tf_Village="+vid;
		hql.append(whereSql);
		parentSql = parentSql == null ? "" : parentSql;
		hql.append(parentSql);
		querySql = querySql == null ? "" : querySql;
		hql.append(querySql);
		orderSql = orderSql == null ? "" : orderSql;
		countHql.append(whereSql);
		countHql.append(querySql);
		countHql.append(parentSql);
		Integer count = ebi.getCount(countHql.toString());
		hql.append(orderSql);
		List<EndUser> list= (List<EndUser>) this.ebi.queryByHql(hql.toString(), start, limit);
		
		 List<ProUserInfo> viewitems= list.stream().map(item->{
			ProUserInfo pru=new ProUserInfo();
			pru.setCreateTime(item.getCreateTime());
			pru.setId(item.getUserId());
			pru.setLoginCode(item.getUserCode());
			XCodeInfo xcode=new XCodeInfo();
			try {
				xcode = (XCodeInfo) ebi.findById(XCodeInfo.class, item.getCodeId());
			} catch (Exception e) {
				e.printStackTrace();
			}
			pru.setProid(xcode.getTf_propertyCompany().getTf_name());
			pru.setPwd(item.getPassword());
			pru.setUserName(item.getUsername());
			return pru;
			
		}).collect(Collectors.toList());
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("records", viewitems);
		result.put("totalCount",count );
		return result;
		
	}
	
	
	
	
	
	
}
