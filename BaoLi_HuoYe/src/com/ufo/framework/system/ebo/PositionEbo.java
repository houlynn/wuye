package com.ufo.framework.system.ebo;
import org.springframework.stereotype.Service;

import com.model.hibernate.system.shared.Position;
import com.ufo.framework.system.ebi.PositionEbi;

@Service
public class PositionEbo extends SimpleEbo<Position> implements PositionEbi {

protected PositionEbo()  {
		super(Position.class);
	}
}
