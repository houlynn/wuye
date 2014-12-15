package com.model.hibernate.property;
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
import javax.persistence.OrderBy;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import com.model.hibernate.system._ModuleGridScheme;
import com.ufo.framework.annotation.FieldInfo;
import com.ufo.framework.annotation.TableInfo;
import com.ufo.framework.common.model.BaseEntity;

@DynamicInsert(true)
@DynamicUpdate(true)
@TableInfo(group="基础信息",id=104,title="业主信息")
@Entity
public class ResidentInfo  extends BaseEntity{

	@Id
	@GeneratedValue(generator = "increment")
	@GenericGenerator(name = "increment", strategy = "increment")
	@FieldInfo(title = "ID号", number = 10, hidden = false)
	private int tf_residentId;
	  ///////////////业主信息///////////////////////////////
	 @FieldInfo(title = "业主名称", number = 20)
	 @Column(length=25)
	  private String tf_residentName;
	  @FieldInfo(title = "业主编号", number = 30)
	  @Column(length=25)
	  private String tf_residentCode;
	  @FieldInfo(title = "业主类型", number = 40)
	  @Column(length=25)
	  private String tf_residentType;
	  @Column(length=500)
	  @FieldInfo(title = "联系地址", number = 50)
	  private String tf_residentAddress;
	  @Column(length=50)
	  @FieldInfo(title = "联系电话", number = 60)
	  private String tf_residentPhone;
	  @Column(length=50)
	  @FieldInfo(title = "Email", number = 70)
	  private String tf_residentEmail;
	  @Column(length=10)
	  @FieldInfo(title = "性别", number = 80)
	  private String tf_residentSex;
	  @Column(length=20)
	  @FieldInfo(title = "生日", number = 90)
	  private String tf_residentBirthDate;
	  @Column(length=50)
	  @FieldInfo(title = "身份证号码", number = 100)
	  private String tf_residentCard;
	  @Column(length=20)
	  @FieldInfo(title = "户口所在地", number = 110)
	  private String tf_residentPlace;
	  @Column(length=500)
	  @FieldInfo(title = "附加说明", number = 120)
	  private String tf_remarks;
	  
	  ///////////////  紧急联系人资料：//////////////////////////
	  @FieldInfo(title = "姓名", number = 130)
	  @Column(length=25)
	  private String tf_tf_residentAsName;
	  @Column(length=500)
	  @FieldInfo(title = "联系地址", number = 140)
	  private String tf_residentAsAddress;
	  @Column(length=50)
	  @FieldInfo(title = "联系电话", number = 150)
	  private String tf_residentAsPhone;
	
	  ////////////////////房屋信息/////////////////////////////
	@FieldInfo(title = "房号", uniqueField = true, number = 160)
	@Column(length = 50, nullable = false)
	private String tf_number;
	@FieldInfo(title = "房屋状态", number = 170)
	@Column(length = 25)
    private String tf_state;
	@FieldInfo(title = "房屋编码", number = 180)
	@Column(length = 50)
    private String tf_code;
	@FieldInfo(title = "使用面积", number = 190)
    private double tf_userArea;
	@FieldInfo(title = "建筑面积", number = 200)
    private double tf_builArea;
	@FieldInfo(title = "产权面积", number = 210)
	private double tf_rightArea;
	@FieldInfo(title = "分摊面积", number = 220)
	private double tf_shareArea;
	@FieldInfo(title = "装修标准", number = 230)
	@Column(length = 50)
	private String   tf_decovolume;
	@FieldInfo(title = "收费日期", number = 240)
	@Column(length = 50)
    private String  tf_chargingDate;
	@FieldInfo(title = "认购日期", number = 250)
	@Column(length = 50)
    private String tf_subsDate;
	
	@JsonIgnore
	@ManyToOne(optional=true,fetch=FetchType.LAZY)
	@JoinColumn(name="tf_leveId")
	@FieldInfo(title = "楼宇", number = 0)
	private LevelInfo tf_levelInfo;
	
	
	@JsonIgnore
	@OneToMany(mappedBy="tf_ResidentInfo",cascade={CascadeType.REMOVE},fetch=FetchType.LAZY)
    @LazyCollection(LazyCollectionOption.TRUE)
	private Set<FeesTypeItem> tf_FeesTypeItems=new HashSet<>();

	public int getTf_residentId() {
		return tf_residentId;
	}

	public void setTf_residentId(int tf_residentId) {
		this.tf_residentId = tf_residentId;
	}

	public String getTf_residentName() {
		return tf_residentName;
	}

	public void setTf_residentName(String tf_residentName) {
		this.tf_residentName = tf_residentName;
	}

	public String getTf_residentCode() {
		return tf_residentCode;
	}

	public void setTf_residentCode(String tf_residentCode) {
		this.tf_residentCode = tf_residentCode;
	}

	public String getTf_residentType() {
		return tf_residentType;
	}

	public void setTf_residentType(String tf_residentType) {
		this.tf_residentType = tf_residentType;
	}

	public String getTf_residentAddress() {
		return tf_residentAddress;
	}

	public void setTf_residentAddress(String tf_residentAddress) {
		this.tf_residentAddress = tf_residentAddress;
	}

	public String getTf_residentPhone() {
		return tf_residentPhone;
	}

	public void setTf_residentPhone(String tf_residentPhone) {
		this.tf_residentPhone = tf_residentPhone;
	}

	public String getTf_residentEmail() {
		return tf_residentEmail;
	}

	public void setTf_residentEmail(String tf_residentEmail) {
		this.tf_residentEmail = tf_residentEmail;
	}

	public String getTf_residentSex() {
		return tf_residentSex;
	}

	public void setTf_residentSex(String tf_residentSex) {
		this.tf_residentSex = tf_residentSex;
	}

	public String getTf_residentBirthDate() {
		return tf_residentBirthDate;
	}

	public void setTf_residentBirthDate(String tf_residentBirthDate) {
		this.tf_residentBirthDate = tf_residentBirthDate;
	}

	public String getTf_residentCard() {
		return tf_residentCard;
	}

	public void setTf_residentCard(String tf_residentCard) {
		this.tf_residentCard = tf_residentCard;
	}

	public String getTf_residentPlace() {
		return tf_residentPlace;
	}

	public void setTf_residentPlace(String tf_residentPlace) {
		this.tf_residentPlace = tf_residentPlace;
	}

	public String getTf_remarks() {
		return tf_remarks;
	}

	public void setTf_remarks(String tf_remarks) {
		this.tf_remarks = tf_remarks;
	}

	public String getTf_tf_residentAsName() {
		return tf_tf_residentAsName;
	}

	public void setTf_tf_residentAsName(String tf_tf_residentAsName) {
		this.tf_tf_residentAsName = tf_tf_residentAsName;
	}

	public String getTf_residentAsAddress() {
		return tf_residentAsAddress;
	}

	public void setTf_residentAsAddress(String tf_residentAsAddress) {
		this.tf_residentAsAddress = tf_residentAsAddress;
	}

	public String getTf_residentAsPhone() {
		return tf_residentAsPhone;
	}

	public void setTf_residentAsPhone(String tf_residentAsPhone) {
		this.tf_residentAsPhone = tf_residentAsPhone;
	}

	public String getTf_number() {
		return tf_number;
	}

	public void setTf_number(String tf_number) {
		this.tf_number = tf_number;
	}

	public String getTf_state() {
		return tf_state;
	}

	public void setTf_state(String tf_state) {
		this.tf_state = tf_state;
	}

	public String getTf_code() {
		return tf_code;
	}

	public void setTf_code(String tf_code) {
		this.tf_code = tf_code;
	}

	public double getTf_userArea() {
		return tf_userArea;
	}

	public void setTf_userArea(double tf_userArea) {
		this.tf_userArea = tf_userArea;
	}

	public double getTf_builArea() {
		return tf_builArea;
	}

	public void setTf_builArea(double tf_builArea) {
		this.tf_builArea = tf_builArea;
	}

	public double getTf_rightArea() {
		return tf_rightArea;
	}

	public void setTf_rightArea(double tf_rightArea) {
		this.tf_rightArea = tf_rightArea;
	}

	public double getTf_shareArea() {
		return tf_shareArea;
	}

	public void setTf_shareArea(double tf_shareArea) {
		this.tf_shareArea = tf_shareArea;
	}

	public String getTf_decovolume() {
		return tf_decovolume;
	}

	public void setTf_decovolume(String tf_decovolume) {
		this.tf_decovolume = tf_decovolume;
	}

	public String getTf_chargingDate() {
		return tf_chargingDate;
	}

	public void setTf_chargingDate(String tf_chargingDate) {
		this.tf_chargingDate = tf_chargingDate;
	}

	public String getTf_subsDate() {
		return tf_subsDate;
	}

	public void setTf_subsDate(String tf_subsDate) {
		this.tf_subsDate = tf_subsDate;
	}

	public LevelInfo getTf_levelInfo() {
		return tf_levelInfo;
	}

	public void setTf_levelInfo(LevelInfo tf_levelInfo) {
		this.tf_levelInfo = tf_levelInfo;
	}

	public Set<FeesTypeItem> getTf_FeesTypeItems() {
		return tf_FeesTypeItems;
	}

	public void setTf_FeesTypeItems(Set<FeesTypeItem> tf_FeesTypeItems) {
		this.tf_FeesTypeItems = tf_FeesTypeItems;
	}
	
	
}
