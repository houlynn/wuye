package com.ufo.framework.system.web;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.commons.lang.builder.ReflectionToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.AuthorizationException;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;

import com.model.hibernate.system.shared.Department;
import com.model.hibernate.system.shared.EndUser;
import com.model.hibernate.system.shared.Permission;
import com.model.hibernate.system.shared.Role;
import com.ufo.framework.common.core.utils.StringUtil;
import com.ufo.framework.system.ebi.SimpleEbi;

/**
 * 自定义的指定Shiro验证用户登录的类
* @author 作者 yingqu: 
* @version 创建时间：2014年7月4日 上午8:32:30 
* version 1.0
 */
public class UserRealm extends AuthorizingRealm {

	@Autowired
	protected SimpleEbi<EndUser> ebi;

	public SimpleEbi<EndUser> getEbi() {
		return ebi;
	}

	public void setEbi(SimpleEbi<EndUser> ebi) {
		this.ebi = ebi;
	}

	/**
	 * 为当前登录的Subject授予角色和权限
	 * 
	 * @see 经测试:本例中该方法的调用时机为需授权资源被访问时
	 * @see 经测试:并且每次访问需授权资源时都会执行该方法中的逻辑,这表明本例中默认并未启用AuthorizationCache
	 * @see 个人感觉若使用了Spring3
	 *      .1开始提供的ConcurrentMapCache支持,则可灵活决定是否启用AuthorizationCache
	 * @see 比如说这里从数据库获取权限信息时,先去访问Spring3.1提供的缓存,而不使用Shior提供的AuthorizationCache
	 */
	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(
			PrincipalCollection principals) {
		//参考自 http://blog.csdn.net/jadyer/article/details/12208847

		// 获取当前登录的用户名,等价于(String)principals.fromRealm(this.getName()).iterator().next()
		String userCode = (String) super.getAvailablePrincipal(principals);
		Subject currentUser = SecurityUtils.getSubject();
		List<String> roleList = new ArrayList<String>();
		List<String> permissionList = new ArrayList<String>();
		if (null != currentUser) {
			org.apache.shiro.session.Session session = currentUser.getSession();
			session.setTimeout(1800000);
			EndUser endUser = (EndUser) session.getAttribute("currentUser");
			if (endUser != null) {
				// 实体类User中包含有用户角色的实体类信息
				if (null != endUser.getRoles() && endUser.getRoles().size() > 0) {
					// //获取当前登录用户的角色
					for (Role role : endUser.getRoles()) {
						roleList.add(role.getRoleName());
						if (null != role.getPermissions()
								&& role.getPermissions().size() > 0) {
							for (Permission ps : role.getPermissions()) {
								permissionList.add(ps.getPerType());
							}
						}

					}
				}
			} else {
				throw new AuthorizationException();
			}
			// 为当前用户设置角色和权限
			SimpleAuthorizationInfo simpleAuthorInfo = new SimpleAuthorizationInfo();
			simpleAuthorInfo.addRoles(roleList);
			simpleAuthorInfo.addStringPermissions(permissionList);
		}
	  return null;
	}

	/**
	 * 验证当前登录的Subject
	 * 
	 * @see 经测试:本例中该方法的调用时机为LoginController.login()方法中执行Subject.login()时
	 */
	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(
			AuthenticationToken authcToken) throws AuthenticationException {
		// 获取基于用户名和密码的令牌
		UsernamePasswordToken token = (UsernamePasswordToken) authcToken;
		System.out.println("验证当前Subject时获取到token为"
				+ ReflectionToStringBuilder.toString(token,
						ToStringStyle.MULTI_LINE_STYLE));
		String userCode = token.getUsername();
		if (StringUtil.isNotEmpty(userCode)) {
			List<?> users = new ArrayList<EndUser>();
			String password =String.valueOf( token.getPassword());
			try {
				users = this.ebi.queryByHql("FROM EndUser WHERE userCode ="
						+ "'" + userCode + "' and password='"+password+"'");
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			if (users.isEmpty()) {
				return null;
			}
			EndUser user = (EndUser) users.get(0);
			user=this.buildCurrentUser(user);
			SecurityUserHolder.	setSession("currentUser", user);
			AuthenticationInfo authcInfo = new SimpleAuthenticationInfo(
					user.getUserCode(), user.getPassword(), this.getName());
			return authcInfo;
		}
		// 没有返回登录用户名对应的SimpleAuthenticationInfo对象时,就会在LoginController中抛出UnknownAccountException异常
		return null;
	}



	private EndUser buildCurrentUser(EndUser user) {
		EndUser currentUser = new EndUser();
		Department currentDept = new Department();
		// 封装用户信息
		currentUser.setUserId(user.getUserId());
		currentUser.setUserCode(user.getUserCode());
		currentUser.setUsername(user.getUsername());
		currentUser.setBirthday(user.getBirthday());
		currentUser.setSex(user.getSex());
		currentUser.setPassword(user.getPassword());
		Department dept = user.getDepartment();
		// 为登录用户添加所属部门
		if (null != dept) {
			currentDept.setDeptCode(dept.getDeptCode());
			currentDept.setDeptId(dept.getDeptId());
			currentDept.setDeptName(dept.getDeptName());
			currentUser.setDeptCode(dept.getDeptCode());
			currentUser.setDeptId(dept.getDeptId());
			currentUser.setDeptName(dept.getDeptName());
			
			currentUser.setDepartment(currentDept);
		}
		// 为登录用户添加所属角色
		Set<Role> roles = new HashSet<Role>();
		for (Role role : user.getRoles()) {
			Role r = new Role();
			r.setRoleCode(role.getRoleCode());
			r.setRoleName(role.getRoleName());
			r.setRoleId(role.getRoleId());
			roles.add(r);
		}
		currentUser.setRoles(roles);
		return currentUser;
	}
	
	
	 @Override
	    public void clearCachedAuthorizationInfo(PrincipalCollection principals) {
	        super.clearCachedAuthorizationInfo(principals);
	    }

	    @Override
	    public void clearCachedAuthenticationInfo(PrincipalCollection principals) {
	        super.clearCachedAuthenticationInfo(principals);
	    }

	    @Override
	    public void clearCache(PrincipalCollection principals) {
	        super.clearCache(principals);
	    }

	    public void clearAllCachedAuthorizationInfo() {
	        getAuthorizationCache().clear();
	    }

	    public void clearAllCachedAuthenticationInfo() {
	        getAuthenticationCache().clear();
	    }

	    public void clearAllCache() {
	        clearAllCachedAuthenticationInfo();
	        clearAllCachedAuthorizationInfo();
	    }
}
