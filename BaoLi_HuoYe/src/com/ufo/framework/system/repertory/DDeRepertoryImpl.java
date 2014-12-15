package com.ufo.framework.system.repertory;

import org.springframework.stereotype.Repository;

import com.model.hibernate.system.shared.Dictionary;
import com.ufo.framework.system.irepertory.DDeRepertory;

@Repository
public class DDeRepertoryImpl extends SimpleRepertoryHibernateImpl<Dictionary>  implements DDeRepertory{

	protected DDeRepertoryImpl() {
		super(Dictionary.class);
	}

}
