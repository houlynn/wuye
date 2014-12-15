package com.model.hibernate.system.shared;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Transient;

import org.hibernate.annotations.GenericGenerator;

import com.ufo.framework.annotation.FieldInfo;
import com.ufo.framework.common.core.ext.ExtFieldType;
import com.ufo.framework.common.model.BaseEntity;
import com.ufo.framework.common.model.Model;
@Entity
@GenericGenerator(name="systemUUID",strategy="uuid")
public class SysIcon  extends BaseEntity {
	@FieldInfo(name="主键",type=ExtFieldType.ID)
	private String id;
	@FieldInfo(name="图标类名")
	private String iconCls;
	@FieldInfo(name="图标名称")
	private String iconName;
	@FieldInfo(name="像素")
	private String pixel;
	@FieldInfo(name="图标")
	private String icon;
	@FieldInfo(name="描述")
	private String remark;
	@Id
	@GeneratedValue(generator="systemUUID")
	@Column(length=50)
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getIconCls() {
		return iconCls;
	}
	public void setIconCls(String iconCls) {
		this.iconCls = iconCls;
	}
	public String getIconName() {
		return iconName;
	}
	public void setIconName(String iconName) {
		this.iconName = iconName;
	}
	public String getPixel() {
		return pixel;
	}
	public void setPixel(String pixel) {
		this.pixel = pixel;
	}
	public String getIcon() {
		return icon;
	}
	public void setIcon(String icon) {
		this.icon = icon;
	}
	public String getRemark() {
		return remark;
	}
	@Column(length=1000)
	public void setRemark(String remark) {
		this.remark = remark;
	}
	
}
