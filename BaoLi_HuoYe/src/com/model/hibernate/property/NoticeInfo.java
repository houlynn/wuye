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
import com.ufo.framework.common.model.BaseEntity;
@DynamicInsert(true)
@DynamicUpdate(true)
@Entity
public class NoticeInfo extends BaseEntity {

	
	@Id
	@GeneratedValue(generator = "increment")
	@GenericGenerator(name = "increment", strategy = "increment")
	@FieldInfo(title = "ID号", number = 10, hidden = true)
	private int tf_noticeId;
	@FieldInfo(title = "发布单位", number =50)
	private String tf_souce;
	@Column(length=25,nullable=false)
	@FieldInfo(title = "发布时间", number =50)
	private String tf_time;
	@Column(length=25,nullable=false)
	@FieldInfo(title = "级别", number =50)
	private String tf_levf;
	@Column(length=300,nullable=false)
	@FieldInfo(title = "标题", number =50)
	private String tf_title;
	@Type(type="text")  
	@Column(length=50,nullable=false)
	@FieldInfo(title = "内容那", number =50)
	private String tf_content;
	
	
    @JsonIgnore
	@ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
	@JoinColumn(name = "tf_viid",nullable=false)
	@FieldInfo(title = "所属小区", number =50)
	private Village tf_Village;





	public int getTf_noticeId() {
		return tf_noticeId;
	}


	public void setTf_noticeId(int tf_noticeId) {
		this.tf_noticeId = tf_noticeId;
	}


	public String getTf_souce() {
		return tf_souce;
	}


	public void setTf_souce(String tf_souce) {
		this.tf_souce = tf_souce;
	}


	public String getTf_time() {
		return tf_time;
	}


	public void setTf_time(String tf_time) {
		this.tf_time = tf_time;
	}


	public String getTf_levf() {
		return tf_levf;
	}


	public void setTf_levf(String tf_levf) {
		this.tf_levf = tf_levf;
	}


	public String getTf_title() {
		return tf_title;
	}


	public void setTf_title(String tf_title) {
		this.tf_title = tf_title;
	}


	public String getTf_content() {
		return tf_content;
	}


	public void setTf_content(String tf_content) {
		this.tf_content = tf_content;
	}


	public Village getTf_Village() {
		return tf_Village;
	}


	public void setTf_Village(Village tf_Village) {
		this.tf_Village = tf_Village;
	}
	
}
