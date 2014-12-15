package com.ufo.framework.system.ebo;


import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.model.hibernate.system.shared.EndUser;
import com.model.hibernate.system.shared.Menu;
import com.model.hibernate.system.shared.Permission;
import com.model.hibernate.system.shared.Role;
import com.ufo.framework.common.constant.AuthorType;
import com.ufo.framework.common.constant.StringVeriable;
import com.ufo.framework.common.core.ext.PermType;
import com.ufo.framework.common.core.ext.TreeVeriable;
import com.ufo.framework.common.core.ext.model.JSONTreeNode;
import com.ufo.framework.common.core.utils.ModelUtil;
import com.ufo.framework.common.core.utils.StringUtil;
import com.ufo.framework.system.ebi.PermissionEbi;

@Service
public class PermissionEbo extends SimpleEbo<Permission> implements PermissionEbi {

	protected PermissionEbo() {
		super(Permission.class);
		// TODO Auto-generated constructor stub
	}
	/**
	 * @param rooId
	 * @param roleId
	 * @param isSee
	 * @return
	 */
	@Override
	public List<JSONTreeNode> getPermTree(String roodId, String author,String authorType,Boolean isSee,Boolean expanded)throws Exception {
		// TODO Auto-generated method stub
		JSONTreeNode template=ModelUtil.getJSONTreeNodeTemplate(Menu.class);
		//递归查询出集合
		List<JSONTreeNode> lists=this.getTreeList(roodId, "Menu", "", template,expanded);
		//得到当前角色的权限
		Map<String,Permission> maps=buildPermMap(author,authorType);
		if(maps==null){
			return null;
		}
		List<JSONTreeNode> removeLists=new ArrayList<JSONTreeNode>(); 
		for(JSONTreeNode node:lists){
			if(isSee){
				if(maps.get(node.getId())==null && !node.getId().equalsIgnoreCase(TreeVeriable.ROOT)){
					removeLists.add(node);
				}
			}else{
				if(maps.get(node.getId())==null){
					node.setChecked(false);
				}else{
					node.setChecked(true);
				}
			}
		}
		if(isSee){
			for(JSONTreeNode node:removeLists){
				lists.remove(node);
			}
		}
		return lists;
	}
	//构建权限map
	private Map<String,Permission> buildPermMap( String author,String authorType) throws Exception{
		Map<String,Permission> maps=new HashMap<String,Permission>();
		if(AuthorType.ROLE.equalsIgnoreCase(authorType)){
			Role role=(Role) repertory.findById(Role.class, author);
			if(role!=null){
				Set<Permission> perms=role.getPermissions();
				for(Permission perm:perms){
					maps.put(perm.getPerCode(), perm);
				}
			}
		}else{
			EndUser user=(EndUser) repertory.findById(EndUser.class, author);
			if(user!=null){
				//得到角色
				Set<Role> roles=user.getRoles();
				for(Role role:roles){
					//得到指定角色的权限
					Set<Permission> perms=role.getPermissions();
					for(Permission perm:perms){
						maps.put(perm.getPerCode(), perm);
					}
				}
			}			
		}
		return maps;
	}
	@Override
	public void doUpdatePerm(String roleId, String addIds, String delIds) throws Exception {
		// TODO Auto-generated method stub
		Role role=(Role) repertory.findById(Role.class, roleId);
		if(role==null){
			throw new Exception("角色未找到");
		}
		String[] addIdsArray=addIds.split(StringVeriable.STR_SPLIT);
		/**删除权限的操作*/
		String[] delIdsArray=delIds.split(StringVeriable.STR_SPLIT);
         System.out.println("打印===============================需要增加的权限============================================");
         Arrays.asList(addIdsArray).parallelStream().forEach(item->System.out.println(item));
         System.out.println("打印===============================需要删除的权限============================================");
         Arrays.asList(delIdsArray).parallelStream().forEach(item->System.out.println(item));
         System.out.println("打印===========================================================================");
         
		
		
		
		/**增加权限的操作*/
		for(String addId:addIdsArray){
			if(StringUtil.isEmpty(addId)){
				continue;
			}
			Permission perm=(Permission) repertory.getEntityByHql(" from Permission where perCode='"+addId+"' and perType='"+PermType.TYPE_MENU+"'");
			//权限已经存在，直接建立关系
			if(perm!=null){
				String insertSql="insert into ROLE_PERM(roleId,perId) values('"+role.getRoleId()+"','"+perm.getPerId()+"')";
				repertory.executeSql(insertSql);
			}else{
				perm=new Permission();
				perm.setPerCode(addId);
				perm.setPerType(PermType.TYPE_MENU);
				repertory.save(perm);
				//先提交到数据库存在进行并联
				repertory.flush();
				String insertSql="insert into ROLE_PERM(roleId,perId) values('"+role.getRoleId()+"','"+perm.getPerId()+"')";
				repertory.executeSql(insertSql);
				
			}
		}
	
		for(String delId:delIdsArray){
			if(StringUtil.isEmpty(delId)){
				continue;
			}
			Permission perm=(Permission) repertory.getEntityByHql(" from Permission where perCode='"+delId+"' and perType='"+PermType.TYPE_MENU+"'");
			if(perm!=null){
				//解除关系
				String delSql="delete from ROLE_PERM where perId='"+perm.getPerId()+"' and roleId='"+role.getRoleId()+"'";
				repertory.executeSql(delSql);
			}
		}
	}
	
}

