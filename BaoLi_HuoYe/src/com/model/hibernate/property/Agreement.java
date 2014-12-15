package com.model.hibernate.property;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.GenericGenerator;

import com.ufo.framework.annotation.FieldInfo;
import com.ufo.framework.annotation.TableInfo;
import com.ufo.framework.common.model.Model;

/**
 * 一个用于演示单个模块所有自定义属性的类
 * 
 * @author jfok
 * 
 *         2014.10.16
 * 
 */

@SuppressWarnings("serial")
@Entity
@DynamicUpdate(true)
@TableInfo(group = "合同管理", id = 2010, title = "销售合同")
public class Agreement implements Model {
	@Id
	@GeneratedValue(generator = "increment")
	@GenericGenerator(name = "increment", strategy = "increment")
	@FieldInfo(title = "ID号", number = 10, hidden = true)
	private Integer tf_agreementId;

	@FieldInfo(title = "合同编码", number = 20)
	@Column(nullable = false, length = 20)
	private String tf_code;

	// 这个字段是这个模块的namefields字段，在删除等操作时会提示显示这个字段的信息
	@FieldInfo(title = "合同名称", uniqueField = true, number = 30)
	@Column(length = 50, nullable = false)
	private String tf_name;

	// 因为是一个独白模块，没有做相应的客户单位，产品名称的表来关联
	@FieldInfo(title = "客户单位名称", number = 40)
	@Column(length = 50, nullable = false)
	private String tf_customerNme;

	@FieldInfo(title = "顺序号", number = 50)
	private Integer tf_orderId;

	@FieldInfo(title = "签订日期", number = 60)
	@Column(nullable = false)
	private Date tf_signDate;

	@FieldInfo(title = "产品名称", number = 70)
	@Column(length = 50, nullable = false)
	private String tf_productName;

	@FieldInfo(title = "销售员", number = 80)
	@Column(length = 10, nullable = false)
	private String tf_salesman;

	@FieldInfo(title = "数量", number = 90)
	@Column(nullable = false)
	private Integer tf_number;

	@FieldInfo(title = "总长度", number = 100)
	private Double tf_allLength;

	@FieldInfo(title = "单价", number = 110, money = true)
	private Double tf_unitPrice;

	@FieldInfo(title = "计量单位", number = 120)
	@Column(length = 10)
	private String tf_unitText;

	// 默认折扣是 1.00,即不打折
	@FieldInfo(title = "折扣", number = 130, percent = true)
	private Double tf_discount = 1.0;

	@FieldInfo(title = "总金额", number = 140, money = true, remark = "总金额=数量*单价*折扣")
	@Column(updatable = false, insertable = false)
	private Double tf_amount;

	@FieldInfo(title = "已收金额", number = 150, money = true)
	private Double tf_receivedPrice;

	@FieldInfo(title = "已收比例", number = 160, percent = true, remark = "已收比例=已收金额/总金额")
	@Column(updatable = false, insertable = false)
	private Double tf_receivedPercent;

	@FieldInfo(title = "是否完成", number = 170)
	private Boolean tf_finished;

	@FieldInfo(title = "是否重要", number = 180)
	private Boolean tf_isImportant;

	@FieldInfo(title = "开始时间", number = 190)
	private Date tf_beginDate;

	@FieldInfo(title = "结束时间", number = 200)
	private Date tf_endDate;

	@FieldInfo(title = "备注", number = 290)
	private String tf_remark;

	public Agreement() {

	}

	public Integer getTf_agreementId() {
		return tf_agreementId;
	}

	public void setTf_agreementId(Integer tf_agreementId) {
		this.tf_agreementId = tf_agreementId;
	}

	public String getTf_code() {
		return tf_code;
	}

	public void setTf_code(String tf_code) {
		this.tf_code = tf_code;
	}

	public String getTf_name() {
		return tf_name;
	}

	public void setTf_name(String tf_name) {
		this.tf_name = tf_name;
	}

	public String getTf_customerNme() {
		return tf_customerNme;
	}

	public void setTf_customerNme(String tf_customerNme) {
		this.tf_customerNme = tf_customerNme;
	}

	public Integer getTf_orderId() {
		return tf_orderId;
	}

	public void setTf_orderId(Integer tf_orderId) {
		this.tf_orderId = tf_orderId;
	}

	public Date getTf_signDate() {
		return tf_signDate;
	}

	public void setTf_signDate(Date tf_signDate) {
		this.tf_signDate = tf_signDate;
	}

	public String getTf_productName() {
		return tf_productName;
	}

	public void setTf_productName(String tf_productName) {
		this.tf_productName = tf_productName;
	}

	public String getTf_salesman() {
		return tf_salesman;
	}

	public void setTf_salesman(String tf_salesman) {
		this.tf_salesman = tf_salesman;
	}

	public Integer getTf_number() {
		return tf_number;
	}

	public void setTf_number(Integer tf_number) {
		this.tf_number = tf_number;
	}

	public Double getTf_allLength() {
		return tf_allLength;
	}

	public void setTf_allLength(Double tf_allLength) {
		this.tf_allLength = tf_allLength;
	}

	public Double getTf_unitPrice() {
		return tf_unitPrice;
	}

	public void setTf_unitPrice(Double tf_unitPrice) {
		this.tf_unitPrice = tf_unitPrice;
	}

	public String getTf_unitText() {
		return tf_unitText;
	}

	public void setTf_unitText(String tf_unitText) {
		this.tf_unitText = tf_unitText;
	}

	public Double getTf_discount() {
		return tf_discount;
	}

	public void setTf_discount(Double tf_discount) {
		this.tf_discount = tf_discount;
	}

	public Double getTf_amount() {
		return tf_amount;
	}

	public void setTf_amount(Double tf_amount) {
		this.tf_amount = tf_amount;
	}

	public Double getTf_receivedPrice() {
		return tf_receivedPrice;
	}

	public void setTf_receivedPrice(Double tf_receivedPrice) {
		this.tf_receivedPrice = tf_receivedPrice;
	}

	public Double getTf_receivedPercent() {
		return tf_receivedPercent;
	}

	public void setTf_receivedPercent(Double tf_receivedPercent) {
		this.tf_receivedPercent = tf_receivedPercent;
	}

	public Boolean getTf_finished() {
		return tf_finished;
	}

	public void setTf_finished(Boolean tf_finished) {
		this.tf_finished = tf_finished;
	}

	public Boolean getTf_isImportant() {
		return tf_isImportant;
	}

	public void setTf_isImportant(Boolean tf_isImportant) {
		this.tf_isImportant = tf_isImportant;
	}

	public Date getTf_beginDate() {
		return tf_beginDate;
	}

	public void setTf_beginDate(Date tf_beginDate) {
		this.tf_beginDate = tf_beginDate;
	}

	public Date getTf_endDate() {
		return tf_endDate;
	}

	public void setTf_endDate(Date tf_endDate) {
		this.tf_endDate = tf_endDate;
	}

	public String getTf_remark() {
		return tf_remark;
	}

	public void setTf_remark(String tf_remark) {
		this.tf_remark = tf_remark;
	}

//getter and setter

}