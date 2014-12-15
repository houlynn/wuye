package com.ufo.framework.system.ebo;


import org.springframework.stereotype.Service;

import com.model.hibernate.system.shared.DictionaryItem;
import com.ufo.framework.system.ebi.DDeItemEbi;

@Service
public class DDeItemEbo extends SimpleEbo<DictionaryItem> implements DDeItemEbi {

	protected DDeItemEbo() {
		super(DictionaryItem.class);
		// TODO Auto-generated constructor stub
	}


}
