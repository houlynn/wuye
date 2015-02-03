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
import com.ufo.framework.common.core.ext.ExtFieldType;
import com.ufo.framework.common.model.BaseEntity;
/**
* @author HouLynn
* @date 2014年12月21日
  @version 1.0
 */
@Entity
@DynamicUpdate(true)
@DynamicInsert(true)
@TableInfo(group = "小区管理", id = 302, title = "报修单")
public class RepairInfo extends BaseEntity {
	
	
	@Id
	@GeneratedValue(generator = "increment")
	@GenericGenerator(name = "increment", strategy = "increment")
	@FieldInfo(title = "ID号", number = 10, hidden = true,type=ExtFieldType.ID)
	private int tf_repairId;
	@JsonIgnore
	@ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
	@JoinColumn(name = "tf_residentId",nullable=false)
	@FieldInfo(title = "业主", number =20)
	private ResidentInfo tf_ResidentInfo;
	@Column(length=50,nullable=false)
	@FieldInfo(title = "报修项目", number =30,uniqueField=true)
	private String tf_repairItem;
	@Column(length=25,nullable=false)
	@FieldInfo(title = "报修时间", number =40)
	private String tf_repairTime;
	@Column(length=10)
	@FieldInfo(title = "处理状态", number =50)
	private String tf_state;
	@FieldInfo(title = "处理日期", number =60)
	private String tf_dowithDate;
	@FieldInfo(title = "处理人员", number =70)
	private String tf_repairMan;
	@FieldInfo(title = "处理等级", number =80)
	private int tf_levf;
	@FieldInfo(title = "附加说明", number =90)
	private String tf_remark;
	
	@FieldInfo(title = "保修账号", number =100)
	private String tf_appPhone;
	@FieldInfo(title = "是否App提交", number =110)
	private boolean tf_isPhonePost;
	@FieldInfo(title = "房号", number =120)
	private String  tf_roomNub;
	
	
	private boolean tf_submit;
	
	
	
	
	public int getTf_repairId() {
		return tf_repairId;
	}
	public void setTf_repairId(int tf_repairId) {
		this.tf_repairId = tf_repairId;
	}
	public ResidentInfo getTf_ResidentInfo() {
		return tf_ResidentInfo;
	}
	public void setTf_ResidentInfo(ResidentInfo tf_ResidentInfo) {
		this.tf_ResidentInfo = tf_ResidentInfo;
	}
	public String getTf_repairItem() {
		return tf_repairItem;
	}
	public void setTf_repairItem(String tf_repairItem) {
		this.tf_repairItem = tf_repairItem;
	}
	public String getTf_repairTime() {
		return tf_repairTime;
	}
	public void setTf_repairTime(String tf_repairTime) {
		this.tf_repairTime = tf_repairTime;
	}
	public String getTf_state() {
		return tf_state;
	}
	public void setTf_state(String tf_state) {
		this.tf_state = tf_state;
	}
	public String getTf_dowithDate() {
		return tf_dowithDate;
	}
	public void setTf_dowithDate(String tf_dowithDate) {
		this.tf_dowithDate = tf_dowithDate;
	}
	public String getTf_repairMan() {
		return tf_repairMan;
	}
	public void setTf_repairMan(String tf_repairMan) {
		this.tf_repairMan = tf_repairMan;
	}
	public String getTf_remark() {
		return tf_remark;
	}
	public void setTf_remark(String tf_remark) {
		this.tf_remark = tf_remark;
	}
	public String getTf_appPhone() {
		return tf_appPhone;
	}
	public void setTf_appPhone(String tf_appPhone) {
		this.tf_appPhone = tf_appPhone;
	}
	public boolean isTf_isPhonePost() {
		return tf_isPhonePost;
	}
	public void setTf_isPhonePost(boolean tf_isPhonePost) {
		this.tf_isPhonePost = tf_isPhonePost;
	}
	public int getTf_levf() {
		return tf_levf;
	}
	public void setTf_levf(int tf_levf) {
		this.tf_levf = tf_levf;
	}
	public String getTf_roomNub() {
		return tf_roomNub;
	}
	public void setTf_roomNub(String tf_roomNub) {
		this.tf_roomNub = tf_roomNub;
	}
	public boolean isTf_submit() {
		return tf_submit;
	}
	public void setTf_submit(boolean tf_submit) {
		this.tf_submit = tf_submit;
	}

}
