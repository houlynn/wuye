package com.model.hibernate.superclass;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import com.ufo.framework.annotation.FieldInfo;
//此标注语言表明这是一个非实体类，但是其属性都可以映射到子类中
@MappedSuperclass
// 具有审核权限的类继承此类
public class _AuditingAbstract extends _InputInfoAbstract {

	@FieldInfo(title = "审核人员" , number = 2010)
	@Column(length = 10)
	protected String tf_auditingName;// 审核人员

	@FieldInfo(title = "审核日期", number = 2020)
	protected Date tf_auditingDate;// 审核日期

	@FieldInfo(title = "审核备注", number = 2030)
	@Column(length = 100)
	protected String tf_auditingRemark;// 审核备注

	@FieldInfo(title = "审核", number = 2040)
	// 如果是mysql则要加此行
	// @Formula("case when   tf_auditingDate is null then 0 else 1 end")
	@Column(insertable = false, updatable = false)
	public Boolean tf_auditinged;

	public Boolean getTf_auditinged() { // 是否审核过了
		return tf_auditinged;
		// return tf_auditingDate != null;
	}

	public String getTf_auditingName() {
		return tf_auditingName;
	}

	public void setTf_auditingName(String tf_auditingName) {
		this.tf_auditingName = tf_auditingName;
	}

	public Date getTf_auditingDate() {
		return tf_auditingDate;
	}

	public void setTf_auditingDate(Date tf_auditingDate) {
		this.tf_auditingDate = tf_auditingDate;
	}

	public String getTf_auditingRemark() {
		return tf_auditingRemark;
	}

	public void setTf_auditingRemark(String tf_auditingRemark) {
		this.tf_auditingRemark = tf_auditingRemark;
	}

}
