package com.ufo.framework.system.shared.module;

import java.io.Serializable;
import java.util.List;

public class DataFetchResponseInfo implements Serializable {

	private static final long serialVersionUID = 1L;
	private Integer startRow;
	private Integer endRow;
	private int totalRows;
	private List<?> matchingObjects;				//如果是导出，则放在这个里面
	private String tag;

	@Override
	public String toString() {

		String result = "FetchResponseInfo [startRow=" + startRow + ", endRow="
				+ endRow + ", totalRows=" + totalRows  + "]\n";

		return result;
	}

	public Integer getStartRow() {
		return startRow;
	}

	public void setStartRow(Integer startRow) {
		this.startRow = startRow;
	}

	public Integer getEndRow() {
		return endRow;
	}

	public void setEndRow(Integer endRow) {
		this.endRow = endRow;
	}

	public int getTotalRows() {
		return totalRows;
	}

	public void setTotalRows(int totalRows) {
		this.totalRows = totalRows;
	}


	public List<?> getMatchingObjects() {
		return matchingObjects;
	}

	public void setMatchingObjects(List<?> matchingObjects) {
		this.matchingObjects = matchingObjects;
	}

	public String getTag() {
		return tag;
	}

	public void setTag(String tag) {
		this.tag = tag;
	}

}
