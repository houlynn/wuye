package com.ufo.framework.system.shared;

import java.io.Serializable;

/**
 * 一个模块的附加操作，的权限设置的情况
 * 
 * @author jiangfeng
 * 
 */

public class RoleAdditionFunction implements Serializable{

	private static final long serialVersionUID = 1L;
	private Integer id; // 附加操作的id
	private String title; // 附加操作的title
	private Boolean checked; // 是否被选中

	public RoleAdditionFunction() {

	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Boolean getChecked() {
		return checked;
	}

	public void setChecked(Boolean checked) {
		this.checked = checked;
	}

}
