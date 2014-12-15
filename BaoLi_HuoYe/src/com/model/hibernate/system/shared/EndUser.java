package com.model.hibernate.system.shared;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import com.ufo.framework.annotation.DDItemCode;
import com.ufo.framework.annotation.DDItemName;
import com.ufo.framework.annotation.FieldInfo;
import com.ufo.framework.annotation.TableInfo;
import com.ufo.framework.common.core.ext.ExtFieldType;
import com.ufo.framework.common.core.properties.PropUtil;
import com.ufo.framework.common.model.BaseEntity;

/**
 * 人员表
* @author 作者 yingqu: 
* @version 创建时间：2014年6月21日 下午10:33:58 
* version 1.0
 */
@SuppressWarnings("serial")
@Entity
@DynamicUpdate(true)
@TableInfo(group = "系统模块", id = 9951, title = "用户管理")
@GenericGenerator(name="systemUUID",strategy="uuid")
public class EndUser extends BaseEntity {
	
	@FieldInfo(name="主键",type=ExtFieldType.ID,title = "ID号", number = 10, hidden = true)
	@DDItemCode
	private String userId;
	@DDItemName
	@FieldInfo(name="用户姓名",nullAble=false,visible=true,number=20)
	private String username;
	@FieldInfo(name="登录帐号",nullAble=false,visible=true,number=30)
	private String userCode;
	@FieldInfo(name="密码",nullAble=false,visible=true,hidden=true)
	private String password;
  	//@Dictionary("SEX")
	//@SearchProperty(value="SEX",index=1)
	@Column(length=10)
	@FieldInfo(name="性别",nullAble=false,visible=true,number=40)
	private String sex="0";//0代表男，1代表女
	@FieldInfo(name="出生日期",visible=true,type=ExtFieldType.DATE,hidden=true)
	private String birthday;
	/**后面属性不进行持久化操作*/
	@FieldInfo(name="图标",hidden=true)
	private String icon=PropUtil.get("sys.rbac.userIcon");
	@FieldInfo(name="部门主键",hidden=true)
	private String deptId;
	@FieldInfo(name="部门名称",hidden=true)
	private String deptName;
	@FieldInfo(name="部门编码",hidden=true)
	private String deptCode;
	
	@FieldInfo(title = "备注", number =50)
	@Column(length = 250)
	private String remark;
	private String admins;
	@FieldInfo(name="是否启用")
	private String enabled;
	
	public String getEnabled() {
		return enabled;
	}
	public void setEnabled(String enabled) {
		this.enabled = enabled;
	}
	/**角色*/
	private Set<Role> roles=new HashSet<Role>();
	/**部门*/
	private Department department=new Department();
	
	@FieldInfo(title = "创建时间", number = 190)
	private Date createTime;
	
	

	
	
	
	@Id
	@GeneratedValue(generator="systemUUID")
	@Column(length=50)
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	@Column(unique=true)
	public String getUserCode() {
		return userCode;
	}
	public void setUserCode(String userCode) {
		this.userCode = userCode;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}
	public String getBirthday() {
		return birthday;
	}
	public void setBirthday(String birthday) {
		this.birthday = birthday;
	}
	@Transient
	public String getIcon() {
		return icon;
	}
	public void setIcon(String icon) {
		this.icon = icon;
	}
	@Transient
	public String getDeptId() {
		return deptId;
	}
	public void setDeptId(String deptId) {
		this.deptId = deptId;
	}
	@Transient
	public String getDeptName() {
		return deptName;
	}
	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}
	@Transient
	public String getDeptCode() {
		return deptCode;
	}
	public void setDeptCode(String deptCode) {
		this.deptCode = deptCode;
	}
	
	@JsonIgnore
	@ManyToMany(fetch=FetchType.LAZY,cascade={CascadeType.MERGE})
	@JoinTable(name = "ROLE_USER", joinColumns = {
				@JoinColumn(name = "userId") },
				inverseJoinColumns = { @JoinColumn(name = "roleId")
	})
	@LazyCollection(LazyCollectionOption.TRUE)
	public Set<Role> getRoles() {
		return roles;
	}
	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}
	@JsonIgnore //构建json数据的时候排除此字段
	@ManyToOne(optional=false, fetch=FetchType.LAZY, cascade={CascadeType.MERGE})
	@JoinColumn(name="deptId")
	@LazyCollection(LazyCollectionOption.TRUE)
	public Department getDepartment() {
		return department;
	}
	public void setDepartment(Department department) {
		this.department = department;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getAdmins() {
		return admins;
	}
	public void setAdmins(String admins) {
		this.admins = admins;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	
	
}
