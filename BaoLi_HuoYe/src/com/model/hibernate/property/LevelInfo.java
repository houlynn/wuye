package com.model.hibernate.property;
import java.util.ArrayList;
import java.util.List;
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
import javax.persistence.Transient;
import org.codehaus.jackson.annotate.JsonIgnore;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.GenericGenerator;
import com.ufo.framework.annotation.FieldInfo;
import com.ufo.framework.annotation.NodeType;
import com.ufo.framework.annotation.TableInfo;
import com.ufo.framework.common.core.ext.TreeNodeType;
import com.ufo.framework.common.core.properties.PropUtil;
import com.ufo.framework.common.model.BaseEntity;

/**
 * 楼宇层次
* @author 作者 HouLynn: 
* @version 创建时间：2014年11月23日 上午10:05:43 
* version 1.0
 */
@DynamicUpdate(true)
@DynamicInsert(true)
@Entity
@TableInfo(group = "基础信息", id = 103, title = "楼宇信息")
public class LevelInfo extends BaseEntity {
	@Id
	@GeneratedValue(generator = "increment")
	@GenericGenerator(name = "increment", strategy = "increment")
	@FieldInfo(title = "ID号", number = 10, hidden = true)
	private int tf_leveId;
	
	@FieldInfo(title = "楼宇名称", uniqueField = true, number = 20)
	@Column(length = 50, nullable = false)
	@NodeType(type=TreeNodeType.TEXT)
	private String tf_leveName;
	
	@JsonIgnore
	@ManyToOne(optional=true,fetch=FetchType.LAZY)
	@JoinColumn(name="tf_viid")
	@FieldInfo(title = "楼宇名称", number = 30)
	private Village tf_village;
	
	
	@JsonIgnore
	@ManyToOne(optional=true,fetch=FetchType.LAZY)
	@JoinColumn(name="tf_pid")
	@FieldInfo(title = "楼宇", number = 30)
	private LevelInfo tf_parent;
	
	@Column(nullable=false,length=10)
	@FieldInfo(title = "节点类型", number = 40)
	private String tf_level;
	
	@JsonIgnore
	@OneToMany(targetEntity = LevelInfo.class, fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "tf_pid")
	@OrderBy("tf_leveId")
	private List<LevelInfo> tf_childs=new ArrayList<>();
	
	@JsonIgnore
	@Transient
	private String icon=PropUtil.get("sys.leve.LevelInfo");
	
	@JsonIgnore
	@ManyToOne(optional=true,fetch=FetchType.LAZY)
	@JoinColumn(name="tf_insid")
	@FieldInfo(title = "公表", number = 30)
	private InnstallBill tf_InnstallBill;

	public int getTf_leveId() {
		return tf_leveId;
	}

	public void setTf_leveId(int tf_leveId) {
		this.tf_leveId = tf_leveId;
	}

	public String getTf_leveName() {
		return tf_leveName;
	}

	public void setTf_leveName(String tf_leveName) {
		this.tf_leveName = tf_leveName;
	}

	public Village getTf_village() {
		return tf_village;
	}

	public void setTf_village(Village tf_village) {
		this.tf_village = tf_village;
	}

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

	public LevelInfo getTf_parent() {
		return tf_parent;
	}

	public void setTf_parent(LevelInfo tf_parent) {
		this.tf_parent = tf_parent;
	}

	public List<LevelInfo> getTf_childs() {
		return tf_childs;
	}

	public void setTf_childs(List<LevelInfo> tf_childs) {
		this.tf_childs = tf_childs;
	}

	public String getTf_level() {
		return tf_level;
	}

	public void setTf_level(String tf_level) {
		this.tf_level = tf_level;
	}

	public InnstallBill getTf_InnstallBill() {
		return tf_InnstallBill;
	}

	public void setTf_InnstallBill(InnstallBill tf_InnstallBill) {
		this.tf_InnstallBill = tf_InnstallBill;
	}
	
	
}
