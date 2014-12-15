package com.ufo.framework.system.model;
import com.model.hibernate.system.shared.Department;
import com.model.hibernate.system.shared.TreeBaseEntity;
import com.ufo.framework.annotation.NodeType;
import com.ufo.framework.common.core.ext.TreeNodeType;
/**
* @author 作者 yingqu: 
* @version 创建时间：2014年6月21日 下午10:42:58 
* version 1.0
 */

public class VDeptUser extends TreeBaseEntity {
	@NodeType(type=TreeNodeType.ID)
	private String id;
	@NodeType(type=TreeNodeType.TEXT)
	private String text;
	@NodeType(type=TreeNodeType.CODE)
	private String code;
	@NodeType(type=TreeNodeType.DISABLED)
	private String disabled;
	@NodeType(type=TreeNodeType.ICON)
	private String icon;
	@NodeType(type=TreeNodeType.PARENT)
	private Department parent;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getIcon() {
		return icon;
	}
	public void setIcon(String icon) {
		this.icon = icon;
	}
	
	public String getDisabled() {
		return disabled;
	}
	public void setDisabled(String disabled) {
		this.disabled = disabled;
	}
	public Department getParent() {
		return parent;
	}
	public void setParent(Department parent) {
		this.parent = parent;
	}
	
}
