package com.model.hibernate.system.shared;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.hibernate.annotations.GenericGenerator;

@Entity
@GenericGenerator(name="systemUUID",strategy="uuid")
public class SystemXcode {
	
	private String codeId;
	private String xcode;
	@Id
	@GeneratedValue(generator="systemUUID")
	@Column(length=50,updatable=false)
	public String getCodeId() {
		return codeId;
	}
	public void setCodeId(String codeId) {
		this.codeId = codeId;
	}
	@Column(length=50,updatable=false)
	public String getXcode() {
		return xcode;
	}
	public void setXcode(String xcode) {
		this.xcode = xcode;
	}

}
