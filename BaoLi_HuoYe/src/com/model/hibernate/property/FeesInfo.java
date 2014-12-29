package com.model.hibernate.property;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.GenericGenerator;

import com.ufo.framework.annotation.DDItemCode;
import com.ufo.framework.annotation.DDItemName;
import com.ufo.framework.annotation.FieldInfo;
import com.ufo.framework.annotation.TableInfo;
import com.ufo.framework.common.model.BaseEntity;

/**
* @author HouLynn
* @date 2014年12月20日
  @version 1.0
 */
@DynamicInsert(true)
@DynamicUpdate(true)
@TableInfo(group="基础信息",id=106,title="收费标准")
@Entity
public class FeesInfo extends BaseEntity {
	public static final String FB="001";//抄表类型
	public static final String FC="000";//单位*建筑面积 如物业费
	public static final String FM="002";//金额收取
	
	@DDItemCode
	@Id
	@GeneratedValue(generator = "increment")
	@GenericGenerator(name = "increment", strategy = "increment")
	@FieldInfo(title = "ID号", number = 10, hidden = false)
	private int tf_feesid;
	 @FieldInfo(title = "名称", number = 20,uniqueField=true)
	 @Column(length=120,nullable=false,unique=false)
	 @DDItemName
	private String tf_freesName;
	 @FieldInfo(title = "单价", number = 30)
	 @Column(nullable=false)
	 private  double tf_price;
	 @FieldInfo(title = "备注", number = 40)
	 @Column(length=900)
	 private String tf_remark;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
    @JoinColumn(name = "tf_viid",nullable=false)
    @FieldInfo(title = "所属小区", number = 120)
	private Village tf_Village;
	/**
	 * 收费项目计量方式 
	 * 抄表类型
	 * 单位*建筑面积
	 * 金额收取  
	 */
    @FieldInfo(title = "计量方式", number = 10,nullAble=false)
    private String tf_feesType;
	 public String getTf_remark() {
		return tf_remark;
	}

	public void setTf_remark(String tf_remark) {
		this.tf_remark = tf_remark;
	}

	public double getTf_price() {
		return tf_price;
	}

	public void setTf_price(double tf_price) {
		this.tf_price = tf_price;
	}
	public int getTf_feesid() {
		return tf_feesid;
	}

	public void setTf_feesid(int tf_feesid) {
		this.tf_feesid = tf_feesid;
	}

	public String getTf_freesName() {
		return tf_freesName;
	}

	public void setTf_freesName(String tf_freesName) {
		this.tf_freesName = tf_freesName;
	}


	public Village getTf_Village() {
		return tf_Village;
	}

	public void setTf_Village(Village tf_Village) {
		this.tf_Village = tf_Village;
	}

	public String getTf_feesType() {
		return tf_feesType;
	}

	public void setTf_feesType(String tf_feesType) {
		this.tf_feesType = tf_feesType;
	}
}
