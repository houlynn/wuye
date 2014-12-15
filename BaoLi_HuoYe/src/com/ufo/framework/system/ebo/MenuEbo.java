package com.ufo.framework.system.ebo;


import org.springframework.stereotype.Service;

import com.model.hibernate.system.shared.Menu;
import com.ufo.framework.system.ebi.MenuEbi;

@Service
public class MenuEbo extends SimpleEbo<Menu> implements MenuEbi {

	protected MenuEbo() {
		super(Menu.class);
		// TODO Auto-generated constructor stub
	}


}
