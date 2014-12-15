package com.ufo.framework.system.repertory;
import org.springframework.stereotype.Repository;

import com.model.hibernate.system.shared.Menu;
import com.ufo.framework.system.irepertory.MenuRepertory;

@Repository
public class MenuRepertoryImpl extends SimpleRepertoryHibernateImpl<Menu>  implements MenuRepertory{

	protected MenuRepertoryImpl() {
		super( Menu.class);
	}

}
