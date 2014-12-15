package com.model.hibernate.property;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.GenericGenerator;
import com.ufo.framework.annotation.FieldInfo;
import com.ufo.framework.annotation.TableInfo;
import com.ufo.framework.common.model.BaseEntity;
@DynamicInsert(true)
@DynamicUpdate(true)
@TableInfo(group="基础信息",id=105,title="收费类型")
@Entity
public class FeesType extends BaseEntity {

	private final static String  FEESS_P="0";
	private final static String FEES_C="1";
	
	@Id
	@GeneratedValue(generator = "increment")
	@GenericGenerator(name = "increment", strategy = "increment")
	@FieldInfo(title = "ID号", number = 10, hidden = false)
	private int tf_feestypeid;
	
	 @FieldInfo(title = "类型", number = 20)
	 @Column(length=50,nullable=false)
	private String  tf_name;
	
	 @FieldInfo(title = "节点类型", number = 20)
	 @Column(length=50,nullable=false)
	 
	private String tf_levftype;
	public int getTf_feestypeid() {
		return tf_feestypeid;
	}
	public void setTf_feestypeid(int tf_feestypeid) {
		this.tf_feestypeid = tf_feestypeid;
	}
	public String getTf_name() {
		return tf_name;
	}
	public void setTf_name(String tf_name) {
		this.tf_name = tf_name;
	}
	public String getTf_levftype() {
		return tf_levftype;
	}
	public void setTf_levftype(String tf_levftype) {
		this.tf_levftype = tf_levftype;
	}



}
