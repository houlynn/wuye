package com.model.hibernate.addition;

import java.sql.Blob;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicUpdate;

import com.ufo.framework.annotation.FieldInfo;
import com.ufo.framework.common.model.BaseEntity;
import com.ufo.framework.common.model.Model;


/**
 * 
* @author HouLynn
* @date 2014年10月21日
  @version 1.0
 */
@SuppressWarnings("serial")
@Entity
@DynamicUpdate(true)
@Table(name = "addit_Addition")
public class _Addition_ImagePreview extends BaseEntity {

	@Id
	@Column(updatable = false)
	private Integer tf_additionId; // 附件序号

	@Column(updatable = false)
	private String tf_filename;// 文件名
	
	private Blob tf_imagePreview;// image 的缩略图

	@FieldInfo(title = "图像宽度")
	@Column(updatable = false)
	private Integer tf_imgwidth;// 图像宽

	@FieldInfo(title = "图像高度")
	@Column(updatable = false)
	private Integer tf_imgheight;// 图像高
	
	public _Addition_ImagePreview() {

	}

	public Integer getTf_additionId() {
		return tf_additionId;
	}

	public void setTf_additionId(Integer tf_additionId) {
		this.tf_additionId = tf_additionId;
	}

	public Blob getTf_imagePreview() {
		return tf_imagePreview;
	}

	public void setTf_imagePreview(Blob tf_imagePreview) {
		this.tf_imagePreview = tf_imagePreview;
	}

	public String getTf_filename() {
		return tf_filename;
	}

	public void setTf_filename(String tf_filename) {
		this.tf_filename = tf_filename;
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

}
