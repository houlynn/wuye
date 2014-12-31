package com.model.hibernate.property;

import javax.persistence.CascadeType;
import javax.persistence.Column;
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
import com.ufo.framework.annotation.TableInfo;
import com.ufo.framework.common.model.BaseEntity;
@Entity
@DynamicUpdate(true)
@DynamicInsert(true)
@TableInfo(group = "预约信息", id = 30, title = "终点工")
public class BespeakInfo  extends BaseEntity{
	@Id
	@GeneratedValue(generator = "increment")
	@GenericGenerator(name = "increment", strategy = "increment")
	@FieldInfo(title = "ID号", number = 10, hidden = false)
	private int tf_bespeakId;
	@Column(length=25,nullable=false)
	private String tf_repeakTime;
	@Column(length=20,nullable=false)
	private String tf_type;
	@Column(length=25,nullable=false)
    private String tf_name;
	@Column(length=25,nullable=false)
    private String tf_phone;
	@Column(length=500)
    private String tf_remark;
	@JsonIgnore
	@ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
	@JoinColumn(name = "tf_residentId",nullable=false)
	@FieldInfo(title = "业主", number =20)
    private  Village tf_Village;

}
