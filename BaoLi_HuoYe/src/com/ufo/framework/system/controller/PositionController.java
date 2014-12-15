package com.ufo.framework.system.controller;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.model.hibernate.system.shared.Position;
@RequestMapping("/rabac/pos")
@Controller
public class PositionController extends SimpleBaseController<Position> {

	protected PositionController() {
		super(Position.class);
	}

	@Override
	public Position getModel(HttpServletRequest request, Position model) {
		return model;
	}

}
