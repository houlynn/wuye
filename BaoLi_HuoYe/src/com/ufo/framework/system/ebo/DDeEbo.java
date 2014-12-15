package com.ufo.framework.system.ebo;
import org.springframework.stereotype.Service;

import com.model.hibernate.system.shared.Dictionary;
import com.ufo.framework.system.ebi.DDeEbi;

@Service
public class DDeEbo extends SimpleEbo<Dictionary> implements DDeEbi {

	protected DDeEbo() {
		super(Dictionary.class);
		// TODO Auto-generated constructor stub
	}


}
