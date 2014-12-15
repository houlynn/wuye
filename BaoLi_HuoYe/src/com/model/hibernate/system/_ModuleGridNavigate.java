package com.model.hibernate.system;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.GenericGenerator;
import com.ufo.framework.annotation.FieldInfo;
import com.ufo.framework.annotation.TableInfo;
import com.ufo.framework.common.model.Model;
@Entity
@Table(name="_ModuleGridNavigate")
@JsonSerialize(include = JsonSerialize.Inclusion.NON_EMPTY)
@DynamicInsert(true)
@DynamicUpdate(true)
@TableInfo(group = "系统模块", id = 9911, title = "导航设置")
public class _ModuleGridNavigate implements Model {
	
	@Id
	@GeneratedValue(generator = "increment")
	@GenericGenerator(name = "increment", strategy = "increment")
	@FieldInfo(title = "ID号", number = 10)
	private int tf_navigatesetId;

	@JsonIgnore
	@ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
	@JoinColumn(name = "tf_moduleId", nullable = false)
	@FieldInfo(title = "所属模块", number = 20)
	private _Module tf_Module;
	@FieldInfo(title = "序号", number = 60)
	private int tf_order;
	@FieldInfo(title = "导航属性", number = 60)
	@Column(length = 250, nullable = false)
	private String tf_fields;
	@FieldInfo(title = "显示标题", number = 60)
	@Column(length = 250, nullable = false)
	private String tf_text;
	@FieldInfo(title = "模式", number = 70)
	private int tf_numberGroupId;
	@FieldInfo(title = "类型", number = 60)
	@Column(length = 250, nullable = false)
	private String tf_type;
	@FieldInfo(title = "是否折叠", number = 160)
	private boolean tf_cascading;
	@FieldInfo(title = "是否启用", number = 160)
	private boolean  tf_enabled;
	@FieldInfo(title = "倒序", number = 160)
	private boolean tf_reverseOrder;
	public int getTf_navigatesetId() {
		return tf_navigatesetId;
	}
	public void setTf_navigatesetId(int tf_navigatesetId) {
		this.tf_navigatesetId = tf_navigatesetId;
	}
	public int getTf_order() {
		return tf_order;
	}
	public void setTf_order(int tf_order) {
		this.tf_order = tf_order;
	}
	public String getTf_fields() {
		return tf_fields;
	}
	public void setTf_fields(String tf_fields) {
		this.tf_fields = tf_fields;
	}
	public String getTf_text() {
		return tf_text;
	}
	public void setTf_text(String tf_text) {
		this.tf_text = tf_text;
	}
	public int getTf_numberGroupId() {
		return tf_numberGroupId;
	}
	public void setTf_numberGroupId(int tf_numberGroupId) {
		this.tf_numberGroupId = tf_numberGroupId;
	}
	public String getTf_type() {
		return tf_type;
	}
	public void setTf_type(String tf_type) {
		this.tf_type = tf_type;
	}
	public boolean isTf_cascading() {
		return tf_cascading;
	}
	public void setTf_cascading(boolean tf_cascading) {
		this.tf_cascading = tf_cascading;
	}
	public boolean isTf_enabled() {
		return tf_enabled;
	}
	public void setTf_enabled(boolean tf_enabled) {
		this.tf_enabled = tf_enabled;
	}
	public boolean isTf_reverseOrder() {
		return tf_reverseOrder;
	}
	public void setTf_reverseOrder(boolean tf_reverseOrder) {
		this.tf_reverseOrder = tf_reverseOrder;
	}
	public _Module getTf_Module() {
		return tf_Module;
	}
	public void setTf_Module(_Module tf_Module) {
		this.tf_Module = tf_Module;
	}

}
