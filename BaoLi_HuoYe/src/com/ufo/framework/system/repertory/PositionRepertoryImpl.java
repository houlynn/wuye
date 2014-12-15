package com.ufo.framework.system.repertory;
import org.springframework.stereotype.Repository;

import com.model.hibernate.system.shared.Position;
import com.ufo.framework.system.irepertory.PositionRepertory;

@Repository
public class PositionRepertoryImpl extends SimpleRepertoryHibernateImpl<Position> implements PositionRepertory {

	protected PositionRepertoryImpl() {
		super(Position.class);
	}

}
