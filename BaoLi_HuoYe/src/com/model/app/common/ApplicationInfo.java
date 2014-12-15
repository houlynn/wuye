package com.model.app.common;

import java.io.Serializable;
import java.util.List;
import java.util.Set;

import org.codehaus.jackson.map.annotate.JsonSerialize;

import com.model.hibernate.system._MenuGroup;
import com.model.hibernate.system._Module;
import com.model.hibernate.system.ServiceInfo;
import com.model.hibernate.system.SystemInfo;
/**
 * 用于向客户端返回系统的模块信息和登录人员的信息的类
 *
* @author HouLynn
* @date 2014年10月20日
  @version 1.0
 */
@SuppressWarnings("serial")
@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)
public class ApplicationInfo implements Serializable {
	// 这是系统总体情况的设置，也是放在数据库里的，可以进行修改
		private SystemInfo systemInfo;

		// 这是用户单位和登录用户的信息
		private UserInfo userInfo;

		// 这是服务单位情况的设置，也是放在数据库里的，可以进行修改
		private ServiceInfo serviceInfo;

		// 系统中模块的字义和菜单的定义
		private Set<_Module> tf_Modules; // 系统模块定义信息

		private List<_MenuGroup> tf_MenuGroups; // 系统菜单

		// 系统中各种权限的定义

		// 其他一些附加信息需要传送到前台的
		private Integer tf_additionFileMaxMB; // 上传文件的最大大小
		private String tf_previewExts; // 可预览的文件的后缀名 ，用逗号分开

		public ApplicationInfo() {
		}

		public SystemInfo getSystemInfo() {
			return systemInfo;
		}

		public void setSystemInfo(SystemInfo systemInfo) {
			this.systemInfo = systemInfo;
		}

		public UserInfo getUserInfo() {
			return userInfo;
		}

		public void setUserInfo(UserInfo userInfo) {
			this.userInfo = userInfo;
		}

		public ServiceInfo getServiceInfo() {
			return serviceInfo;
		}

		public void setServiceInfo(ServiceInfo serviceInfo) {
			this.serviceInfo = serviceInfo;
		}

		public Set<_Module> getTf_Modules() {
			return tf_Modules;
		}

		public void setTf_Modules(Set<_Module> tf_Modules) {
			this.tf_Modules = tf_Modules;
		}

		public List<_MenuGroup> getTf_MenuGroups() {
			return tf_MenuGroups;
		}

		public void setTf_MenuGroups(List<_MenuGroup> tf_MenuGroups) {
			this.tf_MenuGroups = tf_MenuGroups;
		}

		public Integer getTf_additionFileMaxMB() {
			return tf_additionFileMaxMB;
		}

		public void setTf_additionFileMaxMB(Integer tf_additionFileMaxMB) {
			this.tf_additionFileMaxMB = tf_additionFileMaxMB;
		}

		public String getTf_previewExts() {
			return tf_previewExts;
		}

		public void setTf_previewExts(String tf_previewExts) {
			this.tf_previewExts = tf_previewExts;
		}
}
