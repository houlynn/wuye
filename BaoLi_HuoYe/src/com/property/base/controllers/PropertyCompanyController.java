package com.property.base.controllers;
import javax.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.model.hibernate.property.PropertyCompany;
import com.ufo.framework.system.controller.SimpleBaseController;
@RequestMapping("/base/101")
@Controller
public class PropertyCompanyController extends SimpleBaseController<PropertyCompany> {

	protected PropertyCompanyController() {
		super(PropertyCompany.class);
		debug(this.clazz.getSimpleName()+"create");
	}

	@Override
	public PropertyCompany getModel(HttpServletRequest request, PropertyCompany model) {
		return model;
	}

}
