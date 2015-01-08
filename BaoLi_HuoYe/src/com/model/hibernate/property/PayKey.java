package com.model.hibernate.property;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import org.hibernate.annotations.GenericGenerator;
import com.ufo.framework.annotation.FieldInfo;
import com.ufo.framework.common.model.BaseEntity;

/**
 * 支付密钥
 *
* @author HouLynn
* @date 2015年1月7日
  @version 1.0
 */
@Entity
@GenericGenerator(name="systemUUID",strategy="uuid")
public class PayKey extends BaseEntity {
	private String pid;
	private String realname;
	private String payCode;
	private String keyword;
	@Column(nullable=false)
	private int proid;
	@Column(nullable=false)
	private String payType;
	
	@Id
	@GeneratedValue(generator="systemUUID")
	@Column(length=50)
	public String getPid() {
		return pid;
	}

 
	
	public void setPid(String pid) {
		this.pid = pid;
	}

	public String getRealname() {
		return realname;
	}

	public void setRealname(String realname) {
		this.realname = realname;
	}

	public String getPayCode() {
		return payCode;
	}

	public void setPayCode(String payCode) {
		this.payCode = payCode;
	}

	public String getKeyword() {
		return keyword;
	}

	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}



	public int getProid() {
		return proid;
	}



	public void setProid(int proid) {
		this.proid = proid;
	}



	public String getPayType() {
		return payType;
	}



	public void setPayType(String payType) {
		this.payType = payType;
	}

	
}


