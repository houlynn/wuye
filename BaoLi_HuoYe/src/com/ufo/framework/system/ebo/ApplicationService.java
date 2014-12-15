package com.ufo.framework.system.ebo;
 
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;
import com.model.app.common.ApplicationInfo;
import com.model.app.common.UserInfo;
import com.model.hibernate.system._MenuGroup;
import com.model.hibernate.system._Module;
import com.model.hibernate.system._ModuleFormScheme;
import com.model.hibernate.system._ModuleFormSchemeGroup;
import com.model.hibernate.system._ModuleGridScheme;
import com.model.hibernate.system._ModuleGridSchemeGroup;
import com.model.hibernate.system.ServiceInfo;
import com.model.hibernate.system.SystemInfo;
import com.ufo.framework.common.core.utils.AppUtils;
import com.ufo.framework.system.ebi.ApplicationEbi;
@Service
public class ApplicationService extends Ebo  implements  ApplicationEbi {


	private static List<_Module> modules = null;

	// 事务注释
	/* (non-Javadoc)
	 * @see com.ufo.framework.system.ebo.ApplicationEabi#getApplicationInfo(javax.servlet.http.HttpServletRequest)
	 */
	@Override
	public ApplicationInfo getApplicationInfo(HttpServletRequest request) throws Exception {

		ApplicationInfo result = new ApplicationInfo();

		// 以上内容暂时为自定义的，以后会改为从数据库和登录信息中读取。
		SystemInfo systemInfo = new SystemInfo();
		systemInfo.setTf_systemName("保利物业管理系统");
		systemInfo.setTf_systemVersion(AppUtils.getCurDate());
		result.setSystemInfo(systemInfo);

		UserInfo userInfo = new UserInfo();
		userInfo.setTf_userdwmc("红花会总坛");
		userInfo.setTf_userStartdate(new Date());
		userInfo.setTf_userName("管理员");
		userInfo.setTf_loginName("admin");
		userInfo.setTf_userId(0);
		userInfo.setTf_departmentId("00");
		userInfo.setTf_departmentName("工程部");
		result.setUserInfo(userInfo);

		ServiceInfo serviceInfo = new ServiceInfo();
		serviceInfo.setTf_serviceDepartment("广州英趣科技有限公司");
		serviceInfo.setTf_serviceMen("吃饭否");
		serviceInfo.setTf_serviceTelnumber("1320528xxxx");
		serviceInfo.setTf_serviceFaxnumber("0510-88888888");
		serviceInfo.setTf_serviceQQ("7858xxxx");
		serviceInfo.setTf_serviceEmail("houlynn@gzinterest.com");
		serviceInfo.setTf_serviceHomepage("www.www.net");
		serviceInfo.setTf_copyrightInfo("广州英趣信息科技有限公司");
		serviceInfo.setTf_copyrightOwner("精英软件");

		result.setServiceInfo(serviceInfo);

		// 把所有的模块定义信息加进去
		result
				.setTf_Modules(new HashSet<_Module>((List<_Module>) findAll(_Module.class)));

		// 加入这一条是为了让菜单组下面的菜单也执行sql 语句加进来，不然的话，返回以后mvc要加入菜单，
		// 就会在执行sql的时候因为session已经关闭而报错
		for (_Module module : result.getTf_Modules()) {
			module.getTf_fields().size();
			for (_ModuleGridScheme scheme : module.getTf_gridSchemes()) {
				for (_ModuleGridSchemeGroup group : scheme.getTf_schemeGroups()) {
					group.getTf_groupFields().size();
				}
			}
			for (_ModuleFormScheme scheme : module.getTf_formSchemes()) {
				for (_ModuleFormSchemeGroup group : scheme.getTf_schemeGroups()) {
					group.getTf_groupFields().size();
				}
			}

		}

		// 加入菜单分组
		result.setTf_MenuGroups((List<_MenuGroup>) findAll(_MenuGroup.class));

		for (_MenuGroup mg : result.getTf_MenuGroups()) {
			// 加入这一条是为了让菜单组下面的菜单也执行sql 语句加进来，不然的话，返回以后mvc要加入菜单，
			// 就会在执行sql的时候因为session已经关闭而报错
			mg.getTf_menuModules().size();
		}

		modules = new ArrayList<_Module>(result.getTf_Modules());
          
		return result;
	}

	// 根据模块 name 号取得模块定义
	public static _Module getModuleWithName(String name) {
		for (_Module module : getModules())
			if (module.getTf_moduleName().equals(name))
				return module;
		return null;
	}

	public static List<_Module> getModules() {
		return modules;
	}

	public static void setModules(List<_Module> modules) {
		ApplicationService.modules = modules;
	}

}
