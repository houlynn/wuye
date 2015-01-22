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
import javax.persistence.Transient;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

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
	@FieldInfo(title = "ID号", number = 00, hidden = false)
	private int tf_residentId;
	  ///////////////业主基本信息///////////////////////////////
	
	@JsonIgnore
	@ManyToOne(optional=true,fetch=FetchType.LAZY)
	@JoinColumn(name="tf_leveId")
	@FieldInfo(title = "楼宇", number = 10)
	private LevelInfo tf_levelInfo;
	@FieldInfo(title = "房号", uniqueField = true, number = 20)
	@Column(length = 50, nullable = false)
	private String tf_number;
	 @FieldInfo(title = "业主名称", number = 30)
	 @Column(length=25)
	private String tf_residentName;
		@FieldInfo(title = "业主电话（1)APP账户", number = 40)
		@Column(length = 25)
	private String tf_appPhone;
		@FieldInfo(title = "业主电话（2)", number = 50)
		@Column(length = 25)
   private String tf_appPhone1;
		@FieldInfo(title = "业主电话（3)", number = 60)
		@Column(length = 25)
   private String tf_appPhone2;
		
		///房产信息
		
		@FieldInfo(title = "是否已经收楼", number = 70)
		private boolean tf_repossession; 
		@FieldInfo(title = "收楼日期", number = 80)
		private String tf_sdate;
		@FieldInfo(title = "收楼通知书日期", number = 90)
		private String tf_adate;
		@FieldInfo(title = "建筑面积", number = 100)
	    private double tf_builArea;
		@FieldInfo(title = "实侧面积", number = 110)
	    private double tf_userArea;
		@FieldInfo(title = "经办人", number = 120)
		private String tf_doman;
		@FieldInfo(title = "交楼类型", number = 130)
		  private String tf_jfloorType;
		@FieldInfo(title = "性质", number = 140)
		private String tf_nature;
		@FieldInfo(title = "是否已经交房产复印件", number = 150)
		private boolean tf_isposttip;
		@FieldInfo(title = "车牌", number = 160)
		private String tf_license;
		@FieldInfo(title = "是否装防盗门", number = 170)
		private boolean tf_isburglar;
		//////////////////////////备注信息//////////////////////////////////////
		@FieldInfo(title = "备注1家庭成员名单", number = 180)
		private String tf_remark1;
		@FieldInfo(title = "备注2业主、住户联系电话", number = 190)
		private String tf_remark2;
		@FieldInfo(title = "备注3业主身份证号码", number = 200)
		private String tf_remark3;
		@FieldInfo(title = "备注4", number = 210)
		private String tf_remark4;
		@FieldInfo(title = "备注5", number = 220)
		private String tf_remark5;
		
		/////////////////房屋状态//////////////////////////////////
		@FieldInfo(title = "备用状态", number = 260)
		@Column(length = 25)
	    private String tf_state;
		
		
	    /**
	     * 入住状态
	     */
		@FieldInfo(title = "入住状态", number = 270)
		@Column(length = 25)
		private String tf_stateOccupancy;
		
		/**
		 * 欠费状态
		 */
		@FieldInfo(title = "欠费状态", number = 280)
		@Column(length = 25)
		private String tf_stateFees;
		
		
		/**
		 * 报修状态
		 */
		@FieldInfo(title = "报修状态", number = 290)
		@Column(length = 25)
		private String tf_stateRepair;
		

		@FieldInfo(title = "出租", number = 300)
		@Column(length = 25)
		private String tf_rental;
		
		@FieldInfo(title = "出售", number = 310)
		@Column(length = 25)
		private String tf_sell;
		
		
	 
	 
	  @FieldInfo(title = "业主编号", number = 320)
	  @Column(length=25)
	  private String tf_residentCode;
	  @FieldInfo(title = "业主类型", number = 330)
	  @Column(length=25)
	  private String tf_residentType;
	  @Column(length=500)
	  @FieldInfo(title = "联系地址", number = 340)
	  private String tf_residentAddress;
	  @Column(length=50)
	  @FieldInfo(title = "联系电话", number = 350)
	  private String tf_residentPhone;
	  @Column(length=50)
	  @FieldInfo(title = "Email", number = 360)
	  private String tf_residentEmail;
	  @Column(length=10)
	  @FieldInfo(title = "性别", number = 370)
	  private String tf_residentSex;
	  @Column(length=20)
	  @FieldInfo(title = "生日", number = 380)
	  private String tf_residentBirthDate;
	  @Column(length=50)
	  @FieldInfo(title = "身份证号码", number = 390)
	  private String tf_residentCard;
	  @Column(length=20)
	  @FieldInfo(title = "户口所在地", number = 400)
	  private String tf_residentPlace;
	  @Column(length=500)
	  @FieldInfo(title = "附加说明", number = 420)
	  private String tf_remarks;
	  
	  ///////////////  紧急联系人资料：//////////////////////////
	  @FieldInfo(title = "姓名", number = 430)
	  @Column(length=25)
	  private String tf_tf_residentAsName;
	  @Column(length=500)
	  @FieldInfo(title = "联系地址", number = 440)
	  private String tf_residentAsAddress;
	  @Column(length=50)
	  @FieldInfo(title = "联系电话", number = 450)
	  private String tf_residentAsPhone;
	
	  ////////////////////房屋信息/////////////////////////////

	@FieldInfo(title = "房屋编码", number = 460)
	@Column(length = 50)
    private String tf_code;

	@FieldInfo(title = "产权面积", number = 470)
	private double tf_rightArea;
	@FieldInfo(title = "分摊面积", number = 480)
	private double tf_shareArea;
	@FieldInfo(title = "装修标准", number = 490)
	@Column(length = 50)
	private String   tf_decovolume;
	@FieldInfo(title = "收费日期", number = 500)
	@Column(length = 50)
    private String  tf_chargingDate;
	@FieldInfo(title = "认购日期", number = 510)
	@Column(length = 50)
    private String tf_subsDate;
	

	
	
	@Transient
	private String tf_lefStr;
	

	
	
	
	@JsonIgnore
	@OneToMany(mappedBy="tf_ResidentInfo",cascade={CascadeType.REMOVE},fetch=FetchType.LAZY)
    @LazyCollection(LazyCollectionOption.TRUE)
	private Set<FeesTypeItem> tf_FeesTypeItems=new HashSet<>();
	
	//////////////////////////房产其他信息///////////////////////////////////////
	
	

	@FieldInfo(title = "收楼类型", number = 520)
	private String tf_sffloorType;

	@FieldInfo(title = "备注2", number = 530)
	private String tf_remark6;
	
	@FieldInfo(title = "备注3", number = 540)
	private String tf_remark7;
	
	@FieldInfo(title = "备注4", number = 550)
	private String tf_remark8;
	
	@FieldInfo(title = "备注5", number = 560)
	private String tf_remark9;
	
	@Transient
	private int tf_vid;
	
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

	public String getTf_stateOccupancy() {
		return tf_stateOccupancy;
	}

	public void setTf_stateOccupancy(String tf_stateOccupancy) {
		this.tf_stateOccupancy = tf_stateOccupancy;
	}

	public String getTf_stateFees() {
		return tf_stateFees;
	}

	public void setTf_stateFees(String tf_stateFees) {
		this.tf_stateFees = tf_stateFees;
	}

	public String getTf_stateRepair() {
		return tf_stateRepair;
	}

	public void setTf_stateRepair(String tf_stateRepair) {
		this.tf_stateRepair = tf_stateRepair;
	}
	@Transient
	public String getTf_lefStr() {
		return tf_lefStr;
	}

	public void setTf_lefStr(String tf_lefStr) {
		this.tf_lefStr = tf_lefStr;
	}

	public String getTf_rental() {
		return tf_rental;
	}

	public void setTf_rental(String tf_rental) {
		this.tf_rental = tf_rental;
	}

	public String getTf_sell() {
		return tf_sell;
	}

	public void setTf_sell(String tf_sell) {
		this.tf_sell = tf_sell;
	}

	public String getTf_appPhone() {
		return tf_appPhone;
	}

	public void setTf_appPhone(String tf_appPhone) {
		this.tf_appPhone = tf_appPhone;
	}

	public int getTf_vid() {
		return tf_vid;
	}

	public void setTf_vid(int tf_vid) {
		this.tf_vid = tf_vid;
	}


	public String getTf_jfloorType() {
		return tf_jfloorType;
	}

	public void setTf_jfloorType(String tf_jfloorType) {
		this.tf_jfloorType = tf_jfloorType;
	}

	public String getTf_sffloorType() {
		return tf_sffloorType;
	}

	public void setTf_sffloorType(String tf_sffloorType) {
		this.tf_sffloorType = tf_sffloorType;
	}

	public String getTf_sdate() {
		return tf_sdate;
	}

	public void setTf_sdate(String tf_sdate) {
		this.tf_sdate = tf_sdate;
	}

	public String getTf_adate() {
		return tf_adate;
	}

	public void setTf_adate(String tf_adate) {
		this.tf_adate = tf_adate;
	}


	public String getTf_doman() {
		return tf_doman;
	}

	public void setTf_doman(String tf_doman) {
		this.tf_doman = tf_doman;
	}

	public String getTf_license() {
		return tf_license;
	}

	public void setTf_license(String tf_license) {
		this.tf_license = tf_license;
	}


	public String getTf_remark1() {
		return tf_remark1;
	}

	public void setTf_remark1(String tf_remark1) {
		this.tf_remark1 = tf_remark1;
	}

	public String getTf_remark2() {
		return tf_remark2;
	}

	public void setTf_remark2(String tf_remark2) {
		this.tf_remark2 = tf_remark2;
	}

	public String getTf_remark3() {
		return tf_remark3;
	}

	public void setTf_remark3(String tf_remark3) {
		this.tf_remark3 = tf_remark3;
	}

	public String getTf_remark4() {
		return tf_remark4;
	}

	public void setTf_remark4(String tf_remark4) {
		this.tf_remark4 = tf_remark4;
	}

	public String getTf_remark5() {
		return tf_remark5;
	}

	public void setTf_remark5(String tf_remark5) {
		this.tf_remark5 = tf_remark5;
	}

	public String getTf_remark6() {
		return tf_remark6;
	}

	public void setTf_remark6(String tf_remark6) {
		this.tf_remark6 = tf_remark6;
	}

	public String getTf_remark7() {
		return tf_remark7;
	}

	public void setTf_remark7(String tf_remark7) {
		this.tf_remark7 = tf_remark7;
	}

	public String getTf_remark8() {
		return tf_remark8;
	}

	public void setTf_remark8(String tf_remark8) {
		this.tf_remark8 = tf_remark8;
	}

	public String getTf_remark9() {
		return tf_remark9;
	}

	public void setTf_remark9(String tf_remark9) {
		this.tf_remark9 = tf_remark9;
	}

	public String getTf_appPhone1() {
		return tf_appPhone1;
	}

	public void setTf_appPhone1(String tf_appPhone1) {
		this.tf_appPhone1 = tf_appPhone1;
	}

	public String getTf_appPhone2() {
		return tf_appPhone2;
	}

	public void setTf_appPhone2(String tf_appPhone2) {
		this.tf_appPhone2 = tf_appPhone2;
	}

	public boolean isTf_repossession() {
		return tf_repossession;
	}

	public void setTf_repossession(boolean tf_repossession) {
		this.tf_repossession = tf_repossession;
	}

	public String getTf_nature() {
		return tf_nature;
	}

	public void setTf_nature(String tf_nature) {
		this.tf_nature = tf_nature;
	}

	public boolean isTf_isposttip() {
		return tf_isposttip;
	}

	public void setTf_isposttip(boolean tf_isposttip) {
		this.tf_isposttip = tf_isposttip;
	}

	public boolean isTf_isburglar() {
		return tf_isburglar;
	}

	public void setTf_isburglar(boolean tf_isburglar) {
		this.tf_isburglar = tf_isburglar;
	}
	
	
	
}
