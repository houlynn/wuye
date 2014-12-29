package com.model.hibernate.system.shared;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Transient;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import com.ufo.framework.annotation.FieldInfo;
import com.ufo.framework.common.core.ext.ExtFieldType;
import com.ufo.framework.common.core.properties.PropUtil;
import com.ufo.framework.common.model.BaseEntity;
import com.ufo.framework.common.model.Model;
/**
 *  角色表
* @author 作者 yingqu: 
* @version 创建时间：2014年6月21日 下午10:35:09 
* version 1.0
 */
@Entity
@GenericGenerator(name="systemUUID",strategy="uuid")
@Inheritance(strategy=InheritanceType.SINGLE_TABLE)
public class Role extends BaseEntity{
	public final static String PRO_ROLE="4028b8814a93f2d0014a93f3d2040000";
	
	@FieldInfo(name="主键", type=ExtFieldType.ID)
	private String roleId;
	@FieldInfo(name="角色名称")
	private String roleName;
	@FieldInfo(name="角色编码")
	private String roleCode;
	@FieldInfo(name="图标")
	private String icon=PropUtil.get("sys.rbac.roleIcon");
	/**人员*/
	private Set<EndUser> users=new HashSet<EndUser>();	
	/**权限*/
	private Set<Permission> permissions=new HashSet<Permission>();
	@Id
	@GeneratedValue(generator="systemUUID")
	@Column(length=50)
	public String getRoleId() {
		return roleId;
	}
	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}
	public String getRoleName() {
		return roleName;
	}
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	public String getRoleCode() {
		return roleCode;
	}
	public void setRoleCode(String roleCode) {
		this.roleCode = roleCode;
	}
	@Transient
	public String getIcon() {
		return icon;
	}
	public void setIcon(String icon) {
		this.icon = icon;
	}
	@JsonIgnore
	@ManyToMany(fetch=FetchType.LAZY,cascade={CascadeType.MERGE})
	@JoinTable(name = "ROLE_USER", joinColumns = {
			@JoinColumn(name = "roleId") },
			inverseJoinColumns = { @JoinColumn(name = "userId")
	})
	@LazyCollection(LazyCollectionOption.TRUE)
	public Set<EndUser> getUsers() {
		return users;
	}
	public void setUsers(Set<EndUser> users) {
		this.users = users;
	}
	@JsonIgnore
	@ManyToMany(fetch=FetchType.LAZY,cascade={CascadeType.REMOVE})
	@JoinTable(name = "ROLE_PERM", joinColumns = {
			@JoinColumn(name = "roleId") },
			inverseJoinColumns = { @JoinColumn(name = "perId")
	})
	@LazyCollection(LazyCollectionOption.TRUE)
	public Set<Permission> getPermissions() {
		return permissions;
	}
	public void setPermissions(Set<Permission> permissions) {
		this.permissions = permissions;
	}
	
}
