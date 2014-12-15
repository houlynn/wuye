package com.ufo.framework.common.core.ext.model;

import com.ufo.framework.common.model.BaseEntity;


/**
 * 系统组建描述
 *
* @author HouLynn
* @date 2014年8月26日
  @version 1.0
 */
public class SysComponent extends BaseEntity {
	
	private String id;
	private String name;
	private String alias ;
	private String funCode;
	private String action;
	private String whereSql;
	private String orderSql;
	private String pkName;
	private String uploadFields;
	private String isChildren;
	private String modelName;
	private String tableName;
	private String  folder;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAlias() {
		return alias;
	}
	public void setAlias(String alias) {
		this.alias = alias;
	}
	public String getFunCode() {
		return funCode;
	}
	public void setFunCode(String funCode) {
		this.funCode = funCode;
	}
	public String getAction() {
		return action;
	}
	public void setAction(String action) {
		this.action = action;
	}
	public String getWhereSql() {
		return whereSql;
	}
	public void setWhereSql(String whereSql) {
		this.whereSql = whereSql;
	}
	public String getOrderSql() {
		return orderSql;
	}
	public void setOrderSql(String orderSql) {
		this.orderSql = orderSql;
	}
	public String getPkName() {
		return pkName;
	}
	public void setPkName(String pkName) {
		this.pkName = pkName;
	}
	public String getUploadFields() {
		return uploadFields;
	}
	public void setUploadFields(String uploadFields) {
		this.uploadFields = uploadFields;
	}
	public String getIsChildren() {
		return isChildren;
	}
	public void setIsChildren(String isChildren) {
		this.isChildren = isChildren;
	}
	public String getModelName() {
		return modelName;
	}
	public void setModelName(String modelName) {
		this.modelName = modelName;
	}
	public String getTableName() {
		return tableName;
	}
	public void setTableName(String tableName) {
		this.tableName = tableName;
	}
	public String getFolder() {
		return folder;
	}
	public void setFolder(String folder) {
		this.folder = folder;
	}

}
