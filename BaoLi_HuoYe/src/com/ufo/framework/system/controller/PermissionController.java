package com.ufo.framework.system.controller;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.authc.UnknownAccountException;
import org.springframework.stereotype.Controller;
import org.springframework.context.annotation.Scope;
import org.springframework.web.bind.annotation.RequestMapping;

import com.model.hibernate.system.shared.EndUser;
import com.model.hibernate.system.shared.Permission;
import com.model.hibernate.system.shared.PermissionQuery;
import com.ufo.framework.common.constant.AuthorType;
import com.ufo.framework.common.core.ext.TreeVeriable;
import com.ufo.framework.common.core.ext.model.JSONTreeNode;
import com.ufo.framework.common.core.utils.StringUtil;
import com.ufo.framework.system.ebi.PermissionEbi;
import com.ufo.framework.system.web.SecurityUserHolder;

@Controller("PermissionAction")
@Scope("prototype")
@RequestMapping("/rbacPermission")
public class PermissionController extends SimpleBaseController<Permission> {

	protected PermissionController() {
		super(Permission.class);
		// TODO Auto-generated constructor stub
	}
	/**
	 * 得到授权树形
	 */
	@RequestMapping("/getPermTree")
	public void getPermTree(HttpServletRequest request, HttpServletResponse response) {
		String node=request.getParameter("node");
		node=node==null?"":node;
		String nodeId=request.getParameter("nodeId");
		nodeId=nodeId==null?"":nodeId;
		
		String isSeeStr=request.getParameter("isSee");
	     boolean isSee=StringUtil.isEmpty(isSeeStr)==true?false:Boolean.parseBoolean(isSeeStr);
		String expandedStr=request.getParameter("expanded");
	    boolean expanded=StringUtil.isEmpty(expandedStr)==true?false:Boolean.parseBoolean(expandedStr);
		String excludes=request.getParameter("excludes");
		excludes=excludes==null?"":excludes;
		String roleId=request.getParameter("roleId");
		roleId=roleId==null?"":roleId;
		
		if(StringUtil.isEmpty(roleId)){
			toWrite(response,jsonBuilder.returnFailureJson("'传入角色失败'"));
			return;
		}
		if(StringUtil.isEmpty(node) || TreeVeriable.ROOT.equalsIgnoreCase(node)){
			node=TreeVeriable.ROOT;
		}
		if(StringUtil.isNotEmpty(nodeId)){
			node=nodeId;
		}
		try
		{
			//得到当前的树形
		PermissionEbi permissionEbi=(PermissionEbi)this.ebi;
		List<JSONTreeNode> lists=permissionEbi.getPermTree(node, roleId,AuthorType.ROLE, isSee,expanded);
		JSONTreeNode root=ebi.buildJSONTreeNode(lists, node);
		String	strData="";
		if(node.equalsIgnoreCase(TreeVeriable.ROOT)){
			 strData=jsonBuilder.buildList(root.getChildren(), excludes);
		}else{
			List<JSONTreeNode> alist=new ArrayList<JSONTreeNode>();
			alist.add(root);
			strData=jsonBuilder.buildList(alist, excludes);	
		}
		toWrite(response ,strData);
		
		}
		catch(Exception e)
		{
			e.printStackTrace();
			toWrite(response,jsonBuilder.returnFailureJson("无法加载授权树形："+e.getMessage()+"'"));
		}
	}
	/**
	 * 修改权限
	 */
	@RequestMapping("/updatePerm")
	public void updatePerm(PermissionQuery query,HttpServletResponse response){
		try{
			//得到当前的树形
			PermissionEbi permissionEbi=(PermissionEbi)this.ebi;
			permissionEbi.doUpdatePerm(query.getRoleId(), query.getAddIds(), query.getDelIds());
			toWrite(response, jsonBuilder.returnSuccessJson("'授权成功！'"));
		}catch(Exception e){
			e.printStackTrace();
			toWrite(response,jsonBuilder.returnFailureJson("'授权出错,错误信息："+e.getMessage()+"'"));
		}
	}
	/**
	 * 得到登录用户的权限树
	 */
	@RequestMapping("/getAuthorMenuTree")
	public void getAuthorMenuTree(HttpServletRequest request,HttpServletResponse response) throws Exception{
		
		String node=request.getParameter("node");
		node=node==null?"":node;
		String nodeId=request.getParameter("nodeId");
		nodeId=nodeId==null?"":nodeId;
		String isSeeStr=request.getParameter("isSee");
	     boolean isSee=StringUtil.isEmpty(isSeeStr)==true?false:Boolean.parseBoolean(isSeeStr);
		String expandedStr=request.getParameter("expanded");
	    boolean expanded=StringUtil.isEmpty(expandedStr)==true?false:Boolean.parseBoolean(expandedStr);
		String excludes=request.getParameter("excludes");
		excludes=excludes==null?"":excludes;
		String roleId=request.getParameter("roleId");
		roleId=roleId==null?"":roleId;
		if(StringUtil.isEmpty(node) || TreeVeriable.ROOT.equalsIgnoreCase(node)){
			node=TreeVeriable.ROOT;
		}
		
		EndUser currentUser = SecurityUserHolder.getCurrentUser();
		PermissionEbi permissionEbi=(PermissionEbi)this.ebi;
		List<JSONTreeNode> lists=permissionEbi.getPermTree(node, currentUser.getUserId(),AuthorType.USER, true,false);
		try
		{
		JSONTreeNode root=ebi.buildJSONTreeNode(lists, node);
	    String 	strData=jsonBuilder.buildList(root.getChildren(), excludes);
		toWrite(response,strData);
		}catch(UnknownAccountException e)
		{
			response.sendRedirect("/login.jsp");
		}
		catch(Exception e)
		{
			e.printStackTrace();
			toWrite(response,jsonBuilder.returnFailureJson("'得到登录用户的权限树："+e.getMessage()+"'"));
		}
	}
	@Override
	public Permission getModel(HttpServletRequest request, Permission model) {
		// TODO Auto-generated method stub
		return model;
	}
	

}
