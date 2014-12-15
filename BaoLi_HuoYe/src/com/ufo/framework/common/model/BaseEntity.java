package com.ufo.framework.common.model;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;


@SuppressWarnings("serial")
@MappedSuperclass
public class BaseEntity implements Model {
	@Column(length = 50,nullable=true)
	private String xcode;
	
	private int orderIndex;

	public String getXcode() {
		return xcode;
	}

	public void setXcode(String xcode) {
		this.xcode = xcode;
	}

	public int getOrderIndex() {
		return orderIndex;
	}

	public void setOrderIndex(int orderIndex) {
		this.orderIndex = orderIndex;
	}

	
}
