package com.model.hibernate.system.shared;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import com.ibm.icu.text.Transliterator.Position;
import com.ufo.framework.annotation.FieldInfo;
import com.ufo.framework.annotation.NodeType;
import com.ufo.framework.common.core.ext.ExtFieldType;
import com.ufo.framework.common.core.ext.TreeNodeType;
/**
 *小区信息
* @author HouLynn
* @date 2014年8月26日
  @version 1.0
 */
@Entity
@GenericGenerator(name="systemUUID",strategy="uuid")
public class Department extends TreeBaseEntity {
	@NodeType(type=TreeNodeType.ID)
	@FieldInfo(name="主键", type=ExtFieldType.ID)
	private String deptId;
	@NodeType(type=TreeNodeType.TEXT)
	@FieldInfo(name="小区名称",visible=true,nullAble=true)
	private String deptName;
	@NodeType(type=TreeNodeType.CODE)
	@FieldInfo(name="小区代码")
	private String deptCode;
	@NodeType(type=TreeNodeType.PARENT)
	private Department parent;
	private Set<Department> children=new HashSet<Department>();
	private Set<EndUser> users=new HashSet<EndUser>();
	private Set<Position> postes=new HashSet<Position>(); 
	@Id
	@GeneratedValue(generator="systemUUID")
	@Column(length=50)
	public String getDeptId() {
		return deptId;
	}
	public void setDeptId(String deptId) {
		this.deptId = deptId;
	}
	public String getDeptName() {
		return deptName;
	}
	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}
	public String getDeptCode() {
		return deptCode;
	}
	public void setDeptCode(String deptCode) {
		this.deptCode = deptCode;
	}
	@JsonIgnore
	@ManyToOne(optional=true,fetch=FetchType.LAZY)
	@JoinColumn(name="PARENT")
	public Department getParent() {
		return parent;
	}
	public void setParent(Department parent) {
		this.parent = parent;
	}
	@JsonIgnore
	@OneToMany(fetch=FetchType.LAZY,mappedBy="parent",cascade={CascadeType.REMOVE})
	@LazyCollection(LazyCollectionOption.TRUE)
	public Set<Department> getChildren() {
		return children;
	}
	public void setChildren(Set<Department> children) {
		this.children = children;
	}
	@JsonIgnore
	@OneToMany(fetch=FetchType.LAZY,mappedBy="department",cascade={CascadeType.MERGE})
	@LazyCollection(LazyCollectionOption.TRUE)
	public Set<EndUser> getUsers() {
		return users;
	}
	public void setUsers(Set<EndUser> users) {
		this.users = users;
	}
/*	
	@JsonIgnore
	@OneToMany(fetch=FetchType.LAZY,mappedBy="dept",cascade={CascadeType.MERGE})
	@LazyCollection(LazyCollectionOption.TRUE)
	public Set<Position> getPostes() {
		return postes;
	}
	public void setPostes(Set<Position> postes) {
		this.postes = postes;
	}*/
	
}
