package com.model.hibernate.property;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.GenericGenerator;

import com.ufo.framework.annotation.FieldInfo;
import com.ufo.framework.annotation.TableInfo;
import com.ufo.framework.common.core.ext.ExtFieldType;
import com.ufo.framework.common.model.BaseEntity;
/**
* @author HouLynn
* @date 2014年12月29日
  @version 1.0
 */
@Entity
@DynamicUpdate(true)
@DynamicInsert(true)
@TableInfo(group = "终点工", id = 303, title = "终点工")
public class PointFrientInfo extends BaseEntity {
	
	public static final String POIN_FRIENT="001";
	public static final String HOME_MAKING ="002";
	public static final String SITER_MONTH="003";
	
	@Id
	@GeneratedValue(generator = "increment")
	@GenericGenerator(name = "increment", strategy = "increment")
	@FieldInfo(title = "ID号", number = 10, hidden = true,type=ExtFieldType.ID)
	private int tf_pointId;
	@FieldInfo(title = "类型", number =20)
	@Column(length=10,nullable=false)
	private String tf_type;
	@FieldInfo(title = "姓名", number =30,uniqueField=true)
	@Column(length=25,nullable=false)
	private String tf_name;
	@FieldInfo(title = "性别", number =40)
	@Column(length=5)
	private String  tf_sex;
	@FieldInfo(title = "年龄", number =50)
	private int tf_age;
	@FieldInfo(title = "薪资", number =60)
	@Column(length=25)
	private String tf_price;
	@FieldInfo(title = "工作年限", number =70)
	@Column(length=25)
	private String tf_taex;
	@FieldInfo(title = "简历", number =80)
	@Column(length=500)
	private String tf_rmark;
	private String tf_state;
	@JsonIgnore
	@ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
	@JoinColumn(name = "tf_viid",nullable=false)
	@FieldInfo(title = "小区", number =20)
    private  Village tf_Village;
	@Transient
	private String tf_vname;
	@Column(length=10)
	private String tf_ctype;
	
	private String tf_topUrl;
	
	
	public String getTf_topUrl() {
		return tf_topUrl;
	}
	public void setTf_topUrl(String tf_topUrl) {
		this.tf_topUrl = tf_topUrl;
	}
	private String tf_posttime;
	public int getTf_pointId() {
		return tf_pointId;
	}
	public void setTf_pointId(int tf_pointId) {
		this.tf_pointId = tf_pointId;
	}
	public String getTf_type() {
		return tf_type;
	}
	public void setTf_type(String tf_type) {
		this.tf_type = tf_type;
	}
	public String getTf_name() {
		return tf_name;
	}
	public void setTf_name(String tf_name) {
		this.tf_name = tf_name;
	}
	public String getTf_sex() {
		return tf_sex;
	}
	public void setTf_sex(String tf_sex) {
		this.tf_sex = tf_sex;
	}
	public int getTf_age() {
		return tf_age;
	}
	public void setTf_age(int tf_age) {
		this.tf_age = tf_age;
	}
	public String getTf_price() {
		return tf_price;
	}
	public void setTf_price(String tf_price) {
		this.tf_price = tf_price;
	}
	public String getTf_taex() {
		return tf_taex;
	}
	public void setTf_taex(String tf_taex) {
		this.tf_taex = tf_taex;
	}
	public String getTf_rmark() {
		return tf_rmark;
	}
	public void setTf_rmark(String tf_rmark) {
		this.tf_rmark = tf_rmark;
	}
	public Village getTf_Village() {
		return tf_Village;
	}
	public void setTf_Village(Village tf_Village) {
		this.tf_Village = tf_Village;
	}
	@Transient
	public String getTf_vname() {
		return tf_vname;
	}
	public void setTf_vname(String tf_vname) {
		this.tf_vname = tf_vname;
	}
	public String getTf_ctype() {
		return tf_ctype;
	}
	public void setTf_ctype(String tf_ctype) {
		this.tf_ctype = tf_ctype;
	}
	public String getTf_posttime() {
		return tf_posttime;
	}
	public void setTf_posttime(String tf_posttime) {
		this.tf_posttime = tf_posttime;
	}
	public String getTf_state() {
		return tf_state;
	}
	public void setTf_state(String tf_state) {
		this.tf_state = tf_state;
	}

}
