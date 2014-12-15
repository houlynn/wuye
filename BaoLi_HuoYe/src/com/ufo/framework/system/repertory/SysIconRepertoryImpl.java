package com.ufo.framework.system.repertory;

import org.springframework.stereotype.Repository;

import com.model.hibernate.system.shared.SysIcon;
import com.ufo.framework.system.irepertory.SysIconRepertory;

@Repository
public class SysIconRepertoryImpl extends SimpleRepertoryHibernateImpl<SysIcon>  implements SysIconRepertory{

	protected SysIconRepertoryImpl() {
		super( SysIcon.class);
	}

}
