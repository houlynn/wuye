package com.ufo.framework.system.controller;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.context.annotation.Scope;
import org.springframework.web.bind.annotation.RequestMapping;

import com.model.hibernate.system.shared.EndUser;
import com.model.hibernate.system.shared.Menu;
import com.model.hibernate.system.shared.Role;
import com.ufo.framework.common.core.ext.model.JSONTreeNode;
import com.ufo.framework.common.core.utils.StringUtil;

@Controller("RoleAction")
@Scope("prototype")
@RequestMapping("/rbacRole")
public class RoleController extends SimpleBaseController<Role> {
	protected RoleController() {
		super(Role.class);
	}
	@RequestMapping("/loadUsers")
	public void loadUsers(Role role, HttpServletRequest request, HttpServletResponse response){
		try
		{
		Set<EndUser> users=new HashSet<EndUser>();
		if(StringUtil.isNotEmpty(role.getRoleId())){
			Role r=(Role) ebi.findById(Role.class, role.getRoleId());
			if(r!=null){
				users=r.getUsers();
			} 
		}
		toWrite(response,jsonBuilder.buildObjListToJson((long)users.size(), users, true));
		}
		catch(Exception e)
		{
			e.printStackTrace();
			toWrite(response,jsonBuilder.returnFailureJson("'加载用户信息失败！'+"+e.getMessage()+""));
		}
	}
	@RequestMapping("/addUsers")
	public void addUsers(Role role,HttpServletRequest request, HttpServletResponse response){
		try
		{
		String ids=request.getParameter("ids");
		String[] idArray=ids.split(",");
		String roleId=role.getRoleId();
		if(StringUtil.isNotEmpty(roleId)){
			for(String id:idArray){
				List<Object> objs=(List<Object>) ebi.queryBySql(" select count(*) from ROLE_USER where ROLEID='"+roleId+"' and USERID='"+id+"'");
				if(objs!=null && objs.size()>0 && objs.get(0)!=null && Integer.parseInt(objs.get(0).toString())>0){					
				}else{
					ebi.executeSql(" insert into ROLE_USER(ROLEID,USERID) values('"+roleId+"','"+id+"')");
				}
			}
			toWrite(response,jsonBuilder.returnSuccessJson("'添加成功'"));
		}else{
			toWrite(response,jsonBuilder.returnFailureJson("'传入角色主键错误！'"));
		}
		}
		catch(Exception e)
		{
			e.printStackTrace();
			toWrite(response,jsonBuilder.returnFailureJson("'传入角色主键错误！'"));
		}
	}
	@RequestMapping("/removeUsers")
	public void removeUsers(Role role,HttpServletRequest request, HttpServletResponse response){
		String ids=request.getParameter("ids");
		String[] idArray=ids.split(",");
		String roleId=role.getRoleId();
		try
		{
		if(StringUtil.isNotEmpty(roleId)){
			String idsWhere=StringUtil.fromArrayToStr(idArray);
			ebi.executeSql("delete from ROLE_USER where ROLEID='"+roleId+"' and USERID in ("+idsWhere+")");
			toWrite(response,jsonBuilder.returnSuccessJson("'移除成功'"));
		}else{
			toWrite(response,jsonBuilder.returnFailureJson("'传入角色主键错误！'"));
		}
		}
		catch(Exception e)
		{
			e.printStackTrace();
			toWrite(response,jsonBuilder.returnFailureJson("'传入角色主键错误！！'+"+e.getMessage()+""));
		}
	}
	@RequestMapping("/getTree")
	public void getTree(HttpServletRequest request,HttpServletResponse response){
		
		StringBuffer hql=new StringBuffer("from "+clazz.getSimpleName()+" where 1=1");
		StringBuffer countHql=new StringBuffer("select count(*) from "+clazz.getSimpleName()+" where 1=1");
		String whereSql=request.getParameter("whereSql");
		whereSql=whereSql==null?"":whereSql;
		String orderSql=request.getParameter("orderSql");
		orderSql=orderSql==null?"":orderSql;
		String excludes=request.getParameter("excludes");
		excludes=excludes==null?"":excludes;
		try
		{
		List<Role> roles=(List<Role>) ebi.queryByHql(" from Role where 1=1 "+whereSql+" "+orderSql);
		List<JSONTreeNode> lists=new ArrayList<JSONTreeNode>();
		for(Role r:roles){
			JSONTreeNode node=new JSONTreeNode();
			node.setId(r.getRoleId());
			node.setText(r.getRoleName());
			node.setCode(r.getRoleCode());
			node.setLeaf(true);
			node.setNodeInfo("ROLE");
			node.setIcon(r.getIcon());
			//node.setOrderIndex(r.getOrderIndex());
			lists.add(node);
		}
		String strData=jsonBuilder.buildList(lists, excludes);	
		toWrite(response,strData);
		}catch(Exception e)
		{
		e.printStackTrace();	
		toWrite(response,jsonBuilder.returnFailureJson("'获取数据失败！'+"+e.getMessage()+""));
		}
	}
	/**
	 * 获取模版树形数据
	 */
	@RequestMapping("/getModuleTree")
	public void getModuleTree(HttpServletRequest request,HttpServletResponse response){
		String orderSql=request.getParameter("orderSql");
		String excludes=request.getParameter("excludes");
		excludes=excludes==null?"":excludes;
		orderSql=orderSql==null?"":orderSql;
		try
		{
		List<Menu> menus=(List<Menu>) ebi.queryBySql(" select * from Menu where parent='ROOT'"+orderSql,Menu.class);
		List<JSONTreeNode> lists=new ArrayList<JSONTreeNode>();
		for(Menu menu:menus){
			JSONTreeNode node=new JSONTreeNode();
			node.setId(menu.getMenuId());
			node.setText(menu.getMenuName());
			node.setCode(menu.getModuleCode());
			node.setIcon(menu.getIcon());
			lists.add(node);
		}
		toWrite(response,jsonBuilder.buildList(lists, excludes));
		}catch(Exception e)
		{
			e.printStackTrace();	
			toWrite(response,jsonBuilder.returnFailureJson("'获取模版树形数据！'+"+e.getMessage()+""));
		}
	}
	
	
	@Override
	public Role getModel(HttpServletRequest request, Role model) {
		// TODO Auto-generated method stub
		return model;
	}
	

}
