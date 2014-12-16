package com.model.hibernate.property;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.GenericGenerator;

import com.ufo.framework.annotation.FieldInfo;
import com.ufo.framework.common.model.BaseEntity;

@DynamicInsert(value=true)
@DynamicUpdate(value=true)
@Entity
public class BillContext extends BaseEntity {
	@Id
	@GeneratedValue(generator = "increment")
	@GenericGenerator(name = "increment", strategy = "increment")
	@FieldInfo(title = "ID号", number = 10, hidden = true)
	private int tf_billid;
	@JsonIgnore
	@ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
	@JoinColumn(name = "tf_residentId",nullable=false)
	@FieldInfo(title = "业主", number =20)
	private ResidentInfo tf_ResidentInfo;
	@FieldInfo(title = "收费日期", number =30)
	private String tf_month;
	@FieldInfo(title = "实收金额", number =40)
	private double tf_realACount;
	@FieldInfo(title = "应收金额", number =50)
	private double tf_shouldCount;
	
	@FieldInfo(title = "备注", number =60)
	private String tf_remark;
	
	

}
