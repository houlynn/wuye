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

import com.ufo.framework.annotation.DDItemCode;
import com.ufo.framework.annotation.DDItemName;
import com.ufo.framework.annotation.FieldInfo;
import com.ufo.framework.annotation.TableInfo;
import com.ufo.framework.common.model.BaseEntity;
@DynamicInsert(true)
@DynamicUpdate(true)
@TableInfo(group="公摊信息",id=320,title="公摊表")
@Entity
public class InnstallBill extends BaseEntity {
	
  public final static String BILL_PWER="000";
  public final static String BILL_WARER="001";
	@DDItemCode
	@Id
	@GeneratedValue(generator = "increment")
	@GenericGenerator(name = "increment", strategy = "increment")
	@FieldInfo(title = "ID号", number = 10, hidden = false)
	private int tf_insid;
	 @FieldInfo(title = "名称", number = 20,uniqueField=true)
	 @Column(length=120)
	 @DDItemName
	private String tf_name;
    @Column(length=500)
    @FieldInfo(title = "备注", number = 30)
	private String tf_remark;
	 @Column(length=120,nullable=false,unique=false)
	 @FieldInfo(title = "类型", number = 30)
    private String tf_billType;	
    @Column(length=25)
    @FieldInfo(title = "创建时间", number = 40)
    private String tf_crateTime;
    private boolean tf_enabled;
    @JsonIgnore
	@ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
	@JoinColumn(name = "tf_feesid",nullable=false)
	@FieldInfo(title = "管理收费标准", number =50)
    private FeesInfo tf_FeesInfo;
    @JsonIgnore
	@ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
	@JoinColumn(name = "tf_viid",nullable=false)
	@FieldInfo(title = "所属小区", number =50)
	private Village tf_Village;
	public int getTf_insid() {
		return tf_insid;
	}
	public void setTf_insid(int tf_insid) {
		this.tf_insid = tf_insid;
	}
	public String getTf_name() {
		return tf_name;
	}
	public void setTf_name(String tf_name) {
		this.tf_name = tf_name;
	}
	public String getTf_remark() {
		return tf_remark;
	}
	public void setTf_remark(String tf_remark) {
		this.tf_remark = tf_remark;
	}
	public String getTf_billType() {
		return tf_billType;
	}
	public void setTf_billType(String tf_billType) {
		this.tf_billType = tf_billType;
	}
	public String getTf_crateTime() {
		return tf_crateTime;
	}
	public void setTf_crateTime(String tf_crateTime) {
		this.tf_crateTime = tf_crateTime;
	}
	public boolean getTf_enabled() {
		return tf_enabled;
	}
	public void setTf_enabled(boolean tf_enabled) {
		this.tf_enabled = tf_enabled;
	}
	public FeesInfo getTf_FeesInfo() {
		return tf_FeesInfo;
	}
	public void setTf_FeesInfo(FeesInfo tf_FeesInfo) {
		this.tf_FeesInfo = tf_FeesInfo;
	}
	public Village getTf_Village() {
		return tf_Village;
	}
	public void setTf_Village(Village tf_Village) {
		this.tf_Village = tf_Village;
	}
	
}
