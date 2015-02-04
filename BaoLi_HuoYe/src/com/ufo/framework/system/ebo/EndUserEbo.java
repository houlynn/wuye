package com.ufo.framework.system.ebo;
import java.util.Set;
import java.util.UUID;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.hibernate.exception.ConstraintViolationException;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import com.microsoft.sqlserver.jdbc.SQLServerException;
import com.model.hibernate.property.PropertyCompany;
import com.model.hibernate.system.shared.Department;
import com.model.hibernate.system.shared.EndUser;
import com.model.hibernate.system.shared.Permission;
import com.model.hibernate.system.shared.Role;
import com.model.hibernate.system.shared.XCodeInfo;
import com.property.base.vo.ProUserInfo;
import com.sun.javafx.geom.transform.BaseTransform.Degree;
import com.ufo.framework.common.core.exception.ResponseErrorInfo;
import com.ufo.framework.common.core.utils.AppUtils;
import com.ufo.framework.common.core.utils.MD5Util;
import com.ufo.framework.common.core.utils.StringUtil;
import com.ufo.framework.system.ebi.Ebi;
import com.ufo.framework.system.ebi.EndUserEbi;
import com.ufo.framework.system.repertory.SqlModuleFilter;

@Service
public class EndUserEbo extends SimpleEbo<EndUser> implements EndUserEbi{

	protected EndUserEbo() {
	
		super(EndUser.class);
		//System.out.println("EndUserEbo ivokeing ");
	}

	@Resource(name="ebo")
	private Ebi ebi;
	public Ebi getEbi() {
		return ebi;
	}
	public void setEbi(Ebi ebi) {
		this.ebi = ebi;
	}

	/**
	 * 添加一个物业管理员
	 * @param inserted
	 * @throws Exception
	 */
	public void addUser(
			String loginCode,
			String  userName,
			String  proId,
			String pwd,
			String sex
			) throws Exception{
		String msg="";
		try{
		PropertyCompany pc=(PropertyCompany) ebi.findById(PropertyCompany.class,Integer.valueOf( proId));
		boolean flag=true;
		EndUser endUser=new EndUser();
		endUser.setSex(sex);
		if(StringUtil.isEmpty(loginCode)){
			msg="不能为空!";
			flag=false;
			
		}
		if(StringUtil.isEmpty(userName)){
			msg="用户名不能为空!!";
			flag=false;
		}
		if(StringUtil.isEmpty(pwd)){
			msg="密码不能为空!!";
			flag=false;
		}
		if(null==pc){
			msg="所属物业公司不能能为空!!";
			flag=false;
		}
		if(flag){
			String hql="select count(*) from  EndUser where userCode='"+loginCode+"'";
		    int count= getCount(hql);
		    if(count>0){
		    	msg="该用户已经存在!";
				flag=false;
		    }
		}
		if(flag){
			String hql=" from XCodeInfo where tf_propertyCompany="+proId;
			XCodeInfo xCodeInfo=(XCodeInfo) getEntityByHql(hql);
			if(xCodeInfo==null){
				msg="错误的物业公司信息！";
				flag=false;
			}else{
				endUser.setCodeId(xCodeInfo.getTf_codeId());
				endUser.setXcode(xCodeInfo.getXcode());
			}
		}
		if(!flag){
			getAppException("EndUser", msg, ResponseErrorInfo.STATUS_APP_BAN);
		}
		
		endUser.setAdmins("1");
		endUser.setCreateTime(AppUtils.getCurrentTime());
		endUser.setPassword(MD5Util.md5(pwd));
		endUser.setEnabled("1");
		endUser.setUserCode(loginCode);
		endUser.setUsername(userName);
		/////////////////////////创建部门////////////////////////////////////
		   UUID userId = UUID.randomUUID();
		   UUID roleId = UUID.randomUUID();
		String dpetId=endUser.getXcode();
		//dept.set
		String deptSql=" insert into   Department(deptId,deptName, layer,nodeType,xcode) VALUES("+
		                "'"+dpetId+"',"
		                 +"'"+pc.getTf_name()+"',"
		                 + "'0',"
		                 + "'GENERAL',"
		              + "'"+endUser.getXcode()+"')";
		executeSql(deptSql);
		String userSql=" insert into EndUser(userId,sex,codeId,xcode,admins,createTime,password,enabled,userCode,username,deptId) VALUES("
				   +  "'"+userId+"',"
				     +  "'"+endUser.getSex()+"',"
				       + "'"+endUser.getCodeId()+"',"
				       + "'"+endUser.getXcode()+"',"
				      + "'"+endUser.getAdmins()+"',"
				      + "'"+endUser.getCreateTime()+"',"
				      + "'"+endUser.getPassword()+"',"
				       + "'"+endUser.getEnabled()+"',"
				        + "'"+endUser.getUserCode()+"',"
				       + "'"+endUser.getUsername()+"',"
				        + "'"+dpetId+"')";
		executeSql(userSql);
		/////////////////////////创建管理员角色////////////////////////////////////
		Role role=new Role();
		role.setRoleName("管理员");
		role.setRoleCode("admin");
		role.setXcode(endUser.getXcode());
		String roleSql=" insert into Role(roleId,roleCode,roleName,xcode) values("
				     + "'"+roleId+"',"
				     + "'"+role.getRoleCode()+"',"
				     + "'"+role.getRoleName()+"',"
				     + "'"+role.getXcode()+"')";
	   executeSql(roleSql);
		//关联角色
		 executeSql(" insert into ROLE_USER(ROLEID,USERID) values('"+roleId+"','"+userId+"')");
		// debug("用户并联了角色:"+endUser.getRoles().iterator().next().getRoleId());
		///给角色授权
		  Role proRoel=(Role) findById(Role.class, Role.PRO_ROLE);
		  Set<Permission> pers=proRoel.getPermissions();
		  for(Permission p : pers){
		   String insertSql="insert into ROLE_PERM(roleId,perId) values('"+roleId+"','"+p.getPerId()+"')";
			repertory.executeSql(insertSql);
		  }
		  debug("授权成功!");
		}catch(SQLServerException e){
			e.printStackTrace();
			  getInsertException("", "设置用户失败 "+e.getMessage(), ResponseErrorInfo.STATUS_FAILURE);
		}
		catch (Exception e) {
			e.printStackTrace();
		  getInsertException("", "设置用户失败 "+msg, ResponseErrorInfo.STATUS_FAILURE);
		}
	}
	
	
	public void  updateUser(String[] updateSqls ,String ids[]) throws Exception{
		this.executeBatchHql(updateSqls);
		for(String id : ids){
			 EndUser endUser= (EndUser) this.findById(EndUser.class, id);
			 String str=endUser.getUserCode();
			 if(StringUtil.isEmpty(str)){
				 getUpdateException("", "登陆账号不能为空!", ResponseErrorInfo.STATUS_FAILURE);
			 }
			
		}
		
	}
	

}
