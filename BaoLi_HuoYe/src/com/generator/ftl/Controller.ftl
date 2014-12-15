package ${basePk};
import javax.servlet.http.HttpServletRequest;

import ${bk}.model.${className};
import org.yingqu.framework.controllers.SimpleBaseController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
@RequestMapping("/${moduble}/${requestPath}")
@Controller
public class ${className}Controller extends SimpleBaseController<${className}> {

	protected ${className}Controller() {
		super(${className}.class);
	}

	@Override
	public ${className} getModel(HttpServletRequest request, ${className} model) {
		return model;
	}

}
