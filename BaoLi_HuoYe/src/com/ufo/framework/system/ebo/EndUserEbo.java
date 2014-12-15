package com.ufo.framework.system.ebo;


import org.springframework.stereotype.Service;

import com.model.hibernate.system.shared.EndUser;
import com.ufo.framework.system.ebi.EndUserEbi;

@Service
public class EndUserEbo extends SimpleEbo<EndUser> implements EndUserEbi {

	protected EndUserEbo() {
	
		super(EndUser.class);
		System.out.println("EndUserEbo ivokeing ");
	}


}
