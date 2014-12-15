package com.model.hibernate.system.shared;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Transient;

import org.hibernate.annotations.GenericGenerator;

import com.ufo.framework.annotation.FieldInfo;
import com.ufo.framework.common.model.BaseEntity;
import com.ufo.framework.common.model.Model;

/**
 * 用户操作登录日志
* @author 作者 yingqu: 
* @version 创建时间：2014年7月4日 下午5:09:16 
* version 1.0
 */
@Entity
@GenericGenerator(name="systemUUID",strategy="uuid")
public class OperateLog extends BaseEntity  {
	
	private String logId;
	@FieldInfo(name="登录IP地址")
    protected String loginIP;
	@FieldInfo(name="服务器IP地址")
    protected String serverIP;
	@FieldInfo(name="应用系统名称")
    protected String appName;

	@FieldInfo(name="操作时间")
    protected String operatingTime;
	@FieldInfo(name="操作类型")
    protected String operatingType;    
	@FieldInfo(name="操作模型")
    protected String operatingModel;
	@FieldInfo(name="操作ID")
    protected String operatingID;
    //用户名不分词
	@FieldInfo(name="用户名")
    protected String username;    
	@Id
	@GeneratedValue(generator="systemUUID")
	@Column(length=50)
	public String getLogId() {
		return logId;
	}

	public void setLogId(String logId) {
		this.logId = logId;
	}

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getOperatingID() {
        return operatingID;
    }

    public void setOperatingID(String operatingID) {
        this.operatingID = operatingID;
    }

    public String getOperatingModel() {
        return operatingModel;
    }

    public void setOperatingModel(String operatingModel) {
        this.operatingModel = operatingModel;
    }
    public String getOperatingTime() {
        return operatingTime;
    }

    public void setOperatingTime(String operatingTime) {
        this.operatingTime = operatingTime;
    }

    public String getAppName() {
        return appName;
    }

    public void setAppName(String appName) {
        this.appName = appName;
    }

    public String getLoginIP() {
        return loginIP;
    }

    public void setLoginIP(String loginIP) {
        this.loginIP = loginIP;
    }

    public String getOperatingType() {
        return operatingType;
    }

    public void setOperatingType(String operatingType) {
        this.operatingType = operatingType;
    }

    public String getServerIP() {
        return serverIP;
    }

    public void setServerIP(String serverIP) {
        this.serverIP = serverIP;
    }


}