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
import org.hibernate.annotations.Type;

import com.ufo.framework.annotation.FieldInfo;
import com.ufo.framework.annotation.TableInfo;
import com.ufo.framework.common.model.BaseEntity;
/**
 * 小区公告
 *
* @author HouLynn
* @date 2014年12月31日
  @version 1.0
 */
@DynamicInsert(true)
@DynamicUpdate(true)
@TableInfo(group="基础信息",id=303,title="小区公告")
@Entity
public class NoticeMessge extends BaseEntity {
	@Id
	@GeneratedValue(generator = "increment")
	@GenericGenerator(name = "increment", strategy = "increment")
	@FieldInfo(title = "ID号", number = 10, hidden = false)
	private int tf_noticeId;
	@Column(length=10)
    private String tf_type;
	@Type(type="text") 
	@Column(nullable=true)
    private String  tf_content;
	@Column(length=200,nullable=false)
    private String tf_title;
	@JsonIgnore
	@ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
	@JoinColumn(name = "tf_viid",nullable=false)
	@FieldInfo(title = "小区", number =20)
    private  Village tf_Village;
	@Column(length=25,nullable=false)
    private String tf_postTime;
	@Column(length=10,nullable=false)
	private String tf_state;

	
	public int getTf_noticeId() {
		return tf_noticeId;
	}
	public void setTf_noticeId(int tf_noticeId) {
		this.tf_noticeId = tf_noticeId;
	}
	public String getTf_type() {
		return tf_type;
	}
	public void setTf_type(String tf_type) {
		this.tf_type = tf_type;
	}
	public String getTf_content() {
		return tf_content;
	}
	public void setTf_content(String tf_content) {
		this.tf_content = tf_content;
	}
	public String getTf_title() {
		return tf_title;
	}
	public void setTf_title(String tf_title) {
		this.tf_title = tf_title;
	}
	public Village getTf_Village() {
		return tf_Village;
	}
	public void setTf_Village(Village tf_Village) {
		this.tf_Village = tf_Village;
	}
	public String getTf_postTime() {
		return tf_postTime;
	}
	public void setTf_postTime(String tf_postTime) {
		this.tf_postTime = tf_postTime;
	}
	public String getTf_state() {
		return tf_state;
	}
	public void setTf_state(String tf_state) {
		this.tf_state = tf_state;
	}
	
	
}
