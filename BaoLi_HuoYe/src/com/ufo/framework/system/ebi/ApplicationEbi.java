package com.ufo.framework.system.ebi;

import javax.servlet.http.HttpServletRequest;
import com.model.app.common.ApplicationInfo;

public interface ApplicationEbi  extends Ebi{

	public abstract ApplicationInfo getApplicationInfo(
			HttpServletRequest request) throws Exception ; 

}