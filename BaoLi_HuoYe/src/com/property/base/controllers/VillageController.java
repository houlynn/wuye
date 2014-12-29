package com.property.base.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.model.hibernate.property.Village;
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
	
	
}
