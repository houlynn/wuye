package com.ufo.framework.common.core.ext.model;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.ufo.framework.common.model.Model;
/**
 * 视图结果集视图
* @author 作者 yingqu: 
* @version 创建时间：2014年7月8日 下午8:36:08 
* version 1.0
 */
public class ExecuteResult implements Serializable {

	private static final long serialVersionUID = 1L;
	private boolean success;
	private String obj;
	private int totalCount;
	private List<? extends Model> rows=new ArrayList<Model>();
	public boolean isSuccess() {
		return success;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}
	public String getObj() {
		return obj;
	}
	public void setObj(String obj) {
		this.obj = obj;
	}
	public int getTotalCount() {
		return totalCount;
	}
	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}
	public List<? extends Model> getRows() {
		return rows;
	}
	public void setRows(List<? extends Model> rows) {
		this.rows = rows;
	}
	
	
}
