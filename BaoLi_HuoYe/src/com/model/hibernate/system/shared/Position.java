package com.model.hibernate.system.shared;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.GenericGenerator;

import com.ufo.framework.annotation.FieldInfo;
import com.ufo.framework.common.core.ext.ExtFieldType;
import com.ufo.framework.common.model.BaseEntity;

@Entity
@GenericGenerator(name="systemUUID",strategy="uuid")
public class Position extends BaseEntity {
	@FieldInfo(name="主键",type=ExtFieldType.ID)
	private String pstid;
	@FieldInfo(name="职位名称",visible=true)
	private String  name;
	@FieldInfo(name="职位描述",visible=true)
	private String remark;
	@FieldInfo(name="所属不部门")
	private Department dept;
	@Id
	@GeneratedValue(generator="systemUUID")
	@Column(length=50)
	public String getPstid() {
		return pstid;
	}
	public void setPstid(String pstid) {
		this.pstid = pstid;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	@ManyToOne
    @JoinColumn(name="deptid")
	public Department getDept() {
		return dept;
	}
	public void setDept(Department dept) {
		this.dept = dept;
	}
	

}
