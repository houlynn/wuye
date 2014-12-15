package com.ufo.framework.system.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.context.annotation.Scope;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.model.hibernate.system.shared.Menu;
import com.model.hibernate.system.shared.TreeBaseEntity;
import com.ufo.framework.common.core.ext.NodeType;
import com.ufo.framework.common.core.utils.ProcessFieldsUploadUtil;
import com.ufo.framework.common.core.utils.StringUtil;
import com.ufo.framework.common.model.Model;

@Controller("MenuAction")
@Scope("prototype")
@RequestMapping("/pcMenu")
public class MenuController extends SimpleBaseController<Menu> {
	protected MenuController() {
		super(Menu.class);
		// TODO Auto-generated constructor stub
	}

	private Menu menu=new Menu();
	@RequestMapping(value="/doSave",method=RequestMethod.POST)
	public void doSave(Menu model, HttpServletRequest request, HttpServletResponse response) {
		
		Object entity=getModel(request, model);
		try{
			if(entity instanceof Model){
				//buildModelCreateInfo((BaseEntity)entity,request,response);
			}else{
				error("实体信息获取错误");
				toWrite(response,jsonBuilder.returnFailureJson("'传入的实体信息错误'"));
				return;
			}
			//构建创建信息
			
			//保存实体
			entity=ebi.save(entity);
			Menu m=(Menu) entity;
			Menu parent=(Menu) ebi.findById(Menu.class, m.getParent().getMenuId());
			if(!parent.getMenuId().equals(NodeType.ROOT.getType())){
				parent.setNodeType(NodeType.GENERAL.getType());
				ebi.update(parent);
			}
			toWrite(response,jsonBuilder.returnSuccessJson(jsonBuilder.toJson(entity)));
		}catch(Exception e){
			error("保存方法出错，错误信息"+e.getMessage());
			toWrite(response,jsonBuilder.returnFailureJson("'保存方法出错，错误信息"+e.getMessage()+"'"));
		}
	}
	@RequestMapping(value="/doUpdate",method=RequestMethod.POST)
	public void doUpdate(@Validated  Menu model, BindingResult br,@RequestParam("icon") MultipartFile icon,@RequestParam("bigIcon") MultipartFile bigIcon, HttpServletRequest request, HttpServletResponse response) throws IOException{
		ProcessFieldsUploadUtil.processFieldsUpload(request, model, bigIcon, "bigIcon");
		ProcessFieldsUploadUtil.processFieldsUpload(request, model, icon, "icon");
		super.doUpdate(model, request, response);
	
	}
	@Override
	public Menu getModel(HttpServletRequest request, Menu model) {
		String parentId=request.getParameter("parentId");
		if(StringUtil.isEmpty(parentId)){
			parentId=NodeType.ROOT.getType();
		}
		Menu parent=new Menu();
		parent.setMenuId(parentId);
		menu.setParent(parent);
		return menu;
	}

	@Override
	protected TreeBaseEntity getTreeModel() {
		// TODO Auto-generated method stub
		return new Menu();
	}
	
	
	
}
