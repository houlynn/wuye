package com.model.hibernate.addition;

import java.sql.Blob;
import java.util.Date;

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
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.GenericGenerator;

import com.ufo.framework.annotation.FieldInfo;
import com.ufo.framework.annotation.TableInfo;
import com.ufo.framework.common.model.BaseEntity;
import com.ufo.framework.common.model.Model;

@SuppressWarnings("serial")
@Entity
@DynamicUpdate(true)
@TableInfo(group = "附件管理", id = 9505, title = "附件")
public class _Addition extends BaseEntity {

	public static final String ADDITIONCOUNT = "tf_additionCount";
	public static final String _ADDITION = "_Addition";
	public static final String MODULEID = "tf_moduleId";
	public static final String MODULEKEYID = "tf_moduleIdvalue";
	public static final String ADDITIONFILENAME = "tf_filename";
	public static final String ADDITIONID = "tf_additionId";
	public static final String ADDITIONORDER = "tf_order";
	public static final String ADDITIONNAME = "tf_name";
	public static final String ADDITIONREMARK = "tf_remark";
	public static final String WIDTH = "tf_imgwidth";
	public static final String HEIGHT = "tf_imgheight";

	@Id
	@GeneratedValue(generator = "increment")
	@GenericGenerator(name = "increment", strategy = "increment")
	@FieldInfo(title = "ID号", hidden = true, number = 10)
	private Integer tf_additionId; // 附件序号

	@Column(nullable = false, updatable = false)
	@FieldInfo(title = "模块Id", number = 20)
	private String tf_moduleId;// 模块ＩＤ

	@Column(nullable = false, updatable = false)
	@FieldInfo(title = "记录主键值", number = 30)
	private Integer tf_moduleIdvalue;// 模块Idkey
	
	@FieldInfo(title = "序号" , number = 40)
	private Integer tf_order;// 显示顺序号

	@ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
	@JoinColumn(name = "tf_additionTypeId", nullable = false)
	@FieldInfo(title = "附件类型" , number = 50)
	private _AdditionType tf_AdditionType;

	@ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
	@JoinColumn(name = "tf_fieldId")
	@FieldInfo(title = "附件对应字段", number = 55)
	private _AdditionOnField tf_AdditionOnField;
	
	@FieldInfo(title = "附件名称", uniqueField = true , number = 60)
	@Column(nullable = false, length = 100)
	private String tf_name;// 名称

	@FieldInfo(title = "保管人", number = 70)
	@Column(length = 50)
	private String tf_keeper;// 保管人

	@FieldInfo(title = "档案号" , number = 80)
	@Column(length = 50)
	private String tf_archiveNumber;// 档案号

	@FieldInfo(title = "备注" , number = 90)
	private String tf_remark;// 描述

	@Column(length = 250)
	@FieldInfo(title = "文件名" , number = 100)
	private String tf_filename;// 文件名

	@ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
	@JoinColumn(name = "tf_additionFileTypeId")
	@FieldInfo(title = "附件文件类型" , number = 110)
	private _AdditionFileType tf_AdditionFileType;// 附件文件类型

	@FieldInfo(title = "附件文件大小" , number = 120)
	private Integer tf_filesize;// 文件大小

	@FieldInfo(title = "附件上传日期" , number = 130)
	private Date tf_filelastupdate;// 最后上传日期

	@FieldInfo(title = "文件压缩保存" , number = 140)
	private Boolean tf_fileCompressed;

	@FieldInfo(title = "图像压缩模式" , number = 150)
	@ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
	@JoinColumn(name = "tf_reduceModeId")
	private _AdditionReduceMode tf_AdditionReduceMode;

	@FieldInfo(title = "图像宽度" , number = 160)
	private Integer tf_imgwidth;// 图像宽

	@FieldInfo(title = "图像高度" , number = 170)
	private Integer tf_imgheight;// 图像高

	@JsonIgnore
	@Transient
	private Blob tf_imagePreview;// image 的缩略图

	@JsonIgnore
	@Transient
	private Blob tf_filedata;// 文件数据，这里的没有用，放在另外一个类中

	public _Addition() {

	}

	public Integer getTf_additionId() {
		return tf_additionId;
	}

	public void setTf_additionId(Integer tf_additionId) {
		this.tf_additionId = tf_additionId;
	}

	public _AdditionType getTf_AdditionType() {
		return tf_AdditionType;
	}

	public void setTf_AdditionType(_AdditionType tf_AdditionType) {
		this.tf_AdditionType = tf_AdditionType;
	}

	public String getTf_moduleId() {
		return tf_moduleId;
	}

	public void setTf_moduleId(String tf_moduleId) {
		this.tf_moduleId = tf_moduleId;
	}

	public Integer getTf_moduleIdvalue() {
		return tf_moduleIdvalue;
	}

	public void setTf_moduleIdvalue(Integer tf_moduleIdvalue) {
		this.tf_moduleIdvalue = tf_moduleIdvalue;
	}

	public Integer getTf_order() {
		return tf_order;
	}

	public void setTf_order(Integer tf_order) {
		this.tf_order = tf_order;
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

	public String getTf_filename() {
		return tf_filename;
	}

	public void setTf_filename(String tf_filename) {
		this.tf_filename = tf_filename;
	}

	public _AdditionFileType getTf_AdditionFileType() {
		return tf_AdditionFileType;
	}

	public void setTf_AdditionFileType(_AdditionFileType tf_AdditionFileType) {
		this.tf_AdditionFileType = tf_AdditionFileType;
	}

	public Integer getTf_filesize() {
		return tf_filesize;
	}

	public void setTf_filesize(Integer tf_filesize) {
		this.tf_filesize = tf_filesize;
	}

	public Date getTf_filelastupdate() {
		return tf_filelastupdate;
	}

	public void setTf_filelastupdate(Date tf_filelastupdate) {
		this.tf_filelastupdate = tf_filelastupdate;
	}

	public Integer getTf_imgwidth() {
		return tf_imgwidth;
	}

	public void setTf_imgwidth(Integer tf_imgwidth) {
		this.tf_imgwidth = tf_imgwidth;
	}

	public Integer getTf_imgheight() {
		return tf_imgheight;
	}

	public void setTf_imgheight(Integer tf_imgheight) {
		this.tf_imgheight = tf_imgheight;
	}

	public Blob getTf_imagePreview() {
		return tf_imagePreview;
	}

	public String getTf_keeper() {
		return tf_keeper;
	}

	public void setTf_keeper(String tf_keeper) {
		this.tf_keeper = tf_keeper;
	}

	public String getTf_archiveNumber() {
		return tf_archiveNumber;
	}

	public void setTf_archiveNumber(String tf_archiveNumber) {
		this.tf_archiveNumber = tf_archiveNumber;
	}

	public Blob getTf_filedata() {
		return tf_filedata;
	}

	public Boolean getTf_fileCompressed() {
		return tf_fileCompressed == null ? false : tf_fileCompressed;
	}

	public void setTf_fileCompressed(Boolean tf_fileCompressed) {
		this.tf_fileCompressed = tf_fileCompressed;
	}

	public _AdditionReduceMode getTf_AdditionReduceMode() {
		return tf_AdditionReduceMode;
	}

	public void setTf_AdditionReduceMode(_AdditionReduceMode tf_AdditionReduceMode) {
		this.tf_AdditionReduceMode = tf_AdditionReduceMode;
	}

	public _AdditionOnField getTf_AdditionOnField() {
		return tf_AdditionOnField;
	}

	public void setTf_AdditionOnField(_AdditionOnField tf_AdditionOnField) {
		this.tf_AdditionOnField = tf_AdditionOnField;
	}

}
