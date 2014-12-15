package com.ufo.framework.system.ebo;


import org.springframework.stereotype.Service;

import com.ufo.framework.system.ebi.VDeptUserEbi;
import com.ufo.framework.system.model.VDeptUser;

@Service
public class VDeptUserEbo extends SimpleEbo<VDeptUser> implements VDeptUserEbi {

	protected VDeptUserEbo() {
		super(VDeptUser.class);
	}


}
