package com.ufo.framework.system.repertory;

import org.springframework.stereotype.Repository;

import com.model.hibernate.system.shared.DictionaryItem;
import com.ufo.framework.system.irepertory.DDeItemRepertory;

@Repository
public class DDeItemRepertoryImpl extends SimpleRepertoryHibernateImpl<DictionaryItem>  implements DDeItemRepertory{

	protected DDeItemRepertoryImpl() {
		super(DictionaryItem.class);
	}

}
