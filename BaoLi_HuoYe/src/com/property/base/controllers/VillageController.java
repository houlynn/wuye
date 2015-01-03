package com.property.base.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.quartz.impl.calendar.BaseCalendar;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.model.hibernate.property.PointFrientInfo;
import com.model.hibernate.property.Village;
import com.model.hibernate.system.shared.EndUser;
import com.model.hibernate.system.shared.XCodeInfo;
import com.property.base.vo.ProUserInfo;
import com.ufo.framework.common.core.ext.model.JSONTreeNode;
import com.ufo.framework.common.core.utils.AppUtils;
import com.ufo.framework.system.controller.BaseController;
import com.ufo.framework.system.ebi.Ebi;
import com.ufo.framework.system.shared.module.DataInsertResponseInfo;
import com.ufo.framework.system.web.SecurityUserHolder;

@RequestMapping("/vi")
@Controller
public class VillageController extends BaseController {

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
	
	
	@RequestMapping("/fetchData")
	public @ResponseBody Map<String, Object> fetchData(Integer start, Integer limit,
			@RequestParam(value="whereSql",required=false,defaultValue="") String whereSql,
	    	@RequestParam(value="parentSql",required=false,defaultValue="") String parentSql,
	    	@RequestParam(value="querySql",required=false,defaultValue="") String querySql,
	    	@RequestParam(value="orderSql",required=false,defaultValue="") String orderSql,
	    	@RequestParam(value="vid",required=true,defaultValue="") int vid,
			HttpServletRequest request) throws Exception {;
		whereSql+=" and tf_Village="+vid;
		return super.fetchData(start, limit, whereSql, parentSql, querySql, orderSql, "PointFrientInfo", request, (list->{
			List<PointFrientInfo> reusltList=(List<PointFrientInfo>) list;
			    reusltList=reusltList.stream().map(item->{
				item.setTf_vname(item.getTf_Village().getTf_name());
				return item;
			}).collect(Collectors.toList());
			return reusltList;
		}));
	}
	
	@RequestMapping(value = "/create.do", method = RequestMethod.POST)
	public @ResponseBody
	DataInsertResponseInfo add(  @RequestBody String inserted,
			@RequestParam(value="ptype",required=true)
			String ptype,
			@RequestParam(value="ctype",required=true)
			String ctype,
			@RequestParam(value="vid",required=true)
			int vid,
			HttpServletRequest request) throws Exception {
		return super.add("PointFrientInfo", inserted, PointFrientInfo.class, request, (record->{
			PointFrientInfo obj=(PointFrientInfo)record;
			obj.setTf_ctype(ptype);
			obj.setTf_type(ptype);
			obj.setTf_posttime(AppUtils.getCurrentTime());
			Village village=new Village();
			village.setTf_viid(vid);
			obj.setTf_Village(village);
		}));
	}

	
	
	
	
}
