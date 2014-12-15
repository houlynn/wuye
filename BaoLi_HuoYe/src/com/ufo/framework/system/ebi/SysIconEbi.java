package com.ufo.framework.system.ebi;

import com.model.hibernate.system.shared.SysIcon;


public interface SysIconEbi extends SimpleEbi<SysIcon> {
	/**
	 *  同步样式的文件信息
	 */
	public void syncIconCss() throws Exception;
}
