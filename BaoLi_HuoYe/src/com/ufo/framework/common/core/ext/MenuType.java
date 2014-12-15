package com.ufo.framework.common.core.ext;

/**
 * 菜单类型
* @author 作者 yingqu: 
* @version 创建时间：2014年6月7日 下午9:57:02 
* version 1.0
 */
public enum MenuType {

	TYPEMENU("MENU"),TYPEFUNC("FUNC"),TYPEIFRAME("IFRAME");
	private String type;
	private MenuType(String type )
	{
		this.type=type;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	
}
