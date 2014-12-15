package com.model.hibernate.systemset;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.GenericGenerator;

import com.model.hibernate.system._Module;
import com.ufo.framework.annotation.FieldInfo;
import com.ufo.framework.annotation.TableInfo;
import com.ufo.framework.common.model.BaseEntity;
import com.ufo.framework.common.model.Model;
/**
 * 模块的一级审批信息的定义
* @author HouLynn
* @date 2014年10月21日
  @version 1.0
 */
@SuppressWarnings("serial")
@Entity
@DynamicUpdate(true)
@TableInfo(group = "系统设置", id = 9045, title = "模块审批设置")
public class _ModuleApprove extends BaseEntity {

	@Id
	@GeneratedValue(generator = "increment")
	@GenericGenerator(name = "increment", strategy = "increment")
	@FieldInfo(title = "ID号", number = 10, hidden = true)
	private Integer tf_approveId;

	@JsonIgnore
	@ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
	@JoinColumn(name = "tf_moduleId", nullable = false, updatable = false)
	@FieldInfo(title = "所属模块", number = 20)
	private _Module tf_Module;

	@FieldInfo(title = "顺序号", number = 30)
	@Column(nullable = false)
	private Integer tf_order;

	@FieldInfo(title = "审批部门名称", number = 40, uniqueField = true)
	@Column(nullable = false, length = 50)
	private String tf_departmentName;

	@FieldInfo(title = "审批级次", number = 50, remark = "审批级次相同的可以多级同时审批。")
	@Column(nullable = false)
	private Integer tf_level;

	@FieldInfo(title = "可以终止审批", number = 60, remark = "可以审批的同时终止审批流程，即最终决定通过或不通过审批。")
	private Boolean tf_allowFinished;

	public _ModuleApprove() {

	}

	public Integer getTf_approveId() {
		return tf_approveId;
	}

	public void setTf_approveId(Integer tf_approveId) {
		this.tf_approveId = tf_approveId;
	}

	public _Module getTf_Module() {
		return tf_Module;
	}

	public void setTf_Module(_Module tf_Module) {
		this.tf_Module = tf_Module;
	}

	public Integer getTf_order() {
		return tf_order;
	}

	public void setTf_order(Integer tf_order) {
		this.tf_order = tf_order;
	}

	public String getTf_departmentName() {
		return tf_departmentName;
	}

	public void setTf_departmentName(String tf_departmentName) {
		this.tf_departmentName = tf_departmentName;
	}



	public Integer getTf_level() {
		return tf_level;
	}

	public void setTf_level(Integer tf_level) {
		this.tf_level = tf_level;
	}

	public Boolean getTf_allowFinished() {
		return tf_allowFinished == null ? false : tf_allowFinished;
	}

	public void setTf_allowFinished(Boolean tf_allowFinished) {
		this.tf_allowFinished = tf_allowFinished;
	}

}
