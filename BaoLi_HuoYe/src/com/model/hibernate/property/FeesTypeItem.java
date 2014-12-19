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
import com.ufo.framework.common.core.ext.ExtFieldType;
import com.ufo.framework.common.model.BaseEntity;

/**
 * 业主-收费项目
 *
* @author HouLynn
* @date 2014年12月19日
  @version 1.0
 */
@Entity
@DynamicInsert(true)
@DynamicUpdate(true)
public class FeesTypeItem extends BaseEntity {
	@Id
	@GeneratedValue(generator = "increment")
	@GenericGenerator(name = "increment", strategy = "increment")
	@FieldInfo(title = "ID号", number = 10, hidden = true,type=ExtFieldType.ID)
	private int tf_feesTypeItemid;
	
	@JsonIgnore
    @ManyToOne(optional=false)
    @JoinColumn(name="tf_residentId")
   @FieldInfo(title = "业主", number = 20)
	private ResidentInfo tf_ResidentInfo;
	@ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
    @JoinColumn(name = "tf_feesid",nullable=false)
   @FieldInfo(title = "收费标准", number = 20)
	private FeesInfo tf_FeesInfo;
	
	@Column(nullable=false)
	@FieldInfo(title = "开始时间", number = 30)
	private String tf_beginDate;
	
	@FieldInfo(title = "结束时间", number = 40)
	private String tf_endDate;
	
	@FieldInfo(title = "是否有结束时间", number = 50)
	private String  tf_hasEnd;

	public int getTf_feesTypeItemid() {
		return tf_feesTypeItemid;
	}

	public void setTf_feesTypeItemid(int tf_feesTypeItemid) {
		this.tf_feesTypeItemid = tf_feesTypeItemid;
	}

	public ResidentInfo getTf_ResidentInfo() {
		return tf_ResidentInfo;
	}

	public void setTf_ResidentInfo(ResidentInfo tf_ResidentInfo) {
		this.tf_ResidentInfo = tf_ResidentInfo;
	}

	public String getTf_beginDate() {
		return tf_beginDate;
	}

	public void setTf_beginDate(String tf_beginDate) {
		this.tf_beginDate = tf_beginDate;
	}

	public String getTf_endDate() {
		return tf_endDate;
	}

	public void setTf_endDate(String tf_endDate) {
		this.tf_endDate = tf_endDate;
	}

	public FeesInfo getTf_FeesInfo() {
		return tf_FeesInfo;
	}

	public void setTf_FeesInfo(FeesInfo tf_FeesInfo) {
		this.tf_FeesInfo = tf_FeesInfo;
	}

	public String getTf_hasEnd() {
		return tf_hasEnd;
	}

	public void setTf_hasEnd(String tf_hasEnd) {
		this.tf_hasEnd = tf_hasEnd;
	}
	
}
