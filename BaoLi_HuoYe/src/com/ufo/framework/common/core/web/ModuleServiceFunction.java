package com.ufo.framework.common.core.web;

import java.io.File;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import net.sf.json.JSONArray;
import net.sf.json.JSONSerializer;
import net.sf.json.JsonConfig;

import org.springframework.dao.DataAccessException;

import com.aspect.ModuleAspect;
import com.model.hibernate.system._Module;
import com.ufo.framework.common.core.utils.ClassUtil;
import com.ufo.framework.common.core.utils.StringUtil;
import com.ufo.framework.system.ebo.ApplicationService;
import com.ufo.framework.system.repertory.SqlModuleFilter;

import ognl.Ognl;
import ognl.OgnlException;

public class ModuleServiceFunction {

	private static final String HIBERNATEPACKAGEPATH_ROOT = "com.model.hibernate";
	
	private static final String  ASPECT_PK="com.aspect";

	private static List<String> beanDirs = null;

	public static List<String> getBeanDirs() {
		if (beanDirs == null) {
			beanDirs = new ArrayList<String>();
			beanDirs.add(HIBERNATEPACKAGEPATH_ROOT);
			List<String> subPackages = getPackageName(HIBERNATEPACKAGEPATH_ROOT);
			for (String s : subPackages)
				beanDirs.add(HIBERNATEPACKAGEPATH_ROOT + "." + s);
		}
		return beanDirs;
	}

	public static void main(String[] args) {
		getModuleBeanClass(null);
	}
	
	public static Class<?> getModuleBeanClass(String moduleName) {
		Class<?> moduleClass = null;
		try {
			List<String> clazzs=ClassUtil.getClassName("com.model.hibernate", true).parallelStream()
					.filter(item->item.substring(item.lastIndexOf(".")+1).equals(moduleName)).collect(Collectors.toList());
			if(clazzs!=null&&clazzs.size()>0){
				moduleClass=Class.forName(clazzs.get(0));
			}
			
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		if (moduleClass == null)
			System.out.println("未找到：" + moduleName + "的定义文件");
		return moduleClass;
	}

	
	public static Class<ModuleAspect> getModuleAspectClass(String moduleName) {
		Class< ModuleAspect> moduleClass = null;
		try {
			List<String> clazzs=ClassUtil.getClassName(ASPECT_PK, true).parallelStream()
					.filter(item->item.substring(item.lastIndexOf(".")+1).equals(moduleName+"Aspect")).collect(Collectors.toList());
			if(clazzs!=null&&clazzs.size()>0){
				moduleClass=(Class< ModuleAspect>) Class.forName(clazzs.get(0));
			}
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		if (moduleClass == null)
			System.out.println("未找到：" + moduleName + "的定义文件");
		return moduleClass;
	}

	
	/**
	 * 根据包名，取得该包下的下一级目录的名字，没有考虑递归
	 * 
	 * @param packageName
	 * @return
	 */
	private static List<String> getPackageName(String packageName) {
		List<String> packages = new ArrayList<String>();
		ClassLoader loader = Thread.currentThread().getContextClassLoader();
		String packagePath = packageName.replace(".", File.separator); // "/"

		URL url = loader.getResource(packagePath);
		if (url != null) {
			String type = url.getProtocol();
			if (type.equals("file")) {
				File file = new File(url.getPath().replace("%20", " ")); // 如果是window系统，空格用%20来表示的
				File[] childFiles = file.listFiles();
				for (File childFile : childFiles) {
					if (childFile.isDirectory()) {
						int c = childFile.getPath().lastIndexOf(File.separator); // mac 系统
						// if (c == -1)
						// c = childFile.getPath().lastIndexOf("\\") ; //windows 系统
						packages.add(childFile.getPath().substring(c + 1));
					}
				}
			}
		}
		return packages;
	}

	// ognl 转换成Date 有问题，暂时用这个解决
	public static void setValueToRecord(String key, Object record, Object object)
			throws OgnlException {
		try {
			// System.out.println("改之前：" + record);
			Ognl.setValue(key, record, ModuleServiceFunction.isNull(object));
			// System.out.println("改之后：" + record);

		} catch (OgnlException e) {
			// e.getReason().getMessage()
			// Unable to convert type java.lang.String of 2012-12-12 to type of
			// java.util.Date
			// e.printStackTrace();
			if (e.getReason() != null && e.getReason().getMessage() != null
					&& e.getReason().getMessage().endsWith("Date"))
				Ognl.setValue(key, record, TypeChange.StringToDate(object));
			else {
				e.printStackTrace();
				// throw e;
			}
		}
	}

	// 删除记录时，判断是不是被外键约束阻止了
	public static String addPK_ConstraintMessage(DataAccessException e, String moduleName) {
		Pattern pattern = Pattern.compile("FK_" + "[A-z|_|0-9]*_" + moduleName);
		Matcher matcher = pattern.matcher(e.getRootCause().getMessage());
		String finder = null;
		while (matcher.find()) {
			finder = e.getRootCause().getMessage()
					.substring(matcher.start() + 3, matcher.end() - moduleName.length() - 1);
			break;
		}
		// DELETE 语句与 REFERENCE
		// 约束"FK_Project_Global"冲突。该冲突发生于数据库"pm"，表"dbo.Project", column
		// 'tf_globalId'。
		if (finder != null) {
			_Module module = ApplicationService.getModuleWithName(finder);
			if (module != null)
				return "与本记录相关联的『" + module.getTf_title() + "』数据没有全部清空";
		}
		return null;
	}

	// 根据出错信息，将主键重复，或者 值为空的 错误提示加到 map中
	public static void addExceptionCauseToErrorMessage(DataAccessException e,
			Map<String, String> errorMessage, String idFieldName) {
		// 错误信息1:Column 'tf_int' cannot be null
		// 错误信息2:Duplicate entry '80' for key 'PRIMARY'
		if (e.getRootCause().getMessage().toLowerCase().indexOf("primary") != -1)
			errorMessage.put(idFieldName, "插入记录的主键值与数据库中原有的值重复!");
		else
			errorMessage.put("error", e.getRootCause().getMessage());
	}
	

	public static Object isNull(Object object) {
		if (object == null || object.toString().toLowerCase().equals("null"))
			return null;
		else if (object.toString().toLowerCase().equals("false"))
			return false;
		else
			return object;
	}
	
	public static List<SqlModuleFilter> changeToNavigateFilters(String str) {
		List<SqlModuleFilter> result = new ArrayList<SqlModuleFilter>();
		if (str != null && str.length() > 5) {
			JsonConfig config = new JsonConfig();
			config.setArrayMode(JsonConfig.MODE_OBJECT_ARRAY);
			config.setRootClass(SqlModuleFilter.class);
			SqlModuleFilter[] navigateFilters = (SqlModuleFilter[]) JSONSerializer.toJava(
					JSONArray.fromObject(str), config);
			// System.out.println(navigateFilters[0]);
			for (SqlModuleFilter f : navigateFilters)
				result.add(f);
		}
		result.parallelStream().forEach(item->System.out.println(item.getFilterSql()));
		return result;
	}
	
	public static  String getSortParam(String sortStr){
		 SortParameter sorts[] = SortParameter.changeToSortParameters(sortStr);
		 String result="";
		for (SortParameter sort : sorts) {
			result = result + sort.getProperty() + " "
					+ sort.getDirection() + " , ";
		}
		if(StringUtil.isNotEmpty(result)){
		result = result.substring(0, result.length() - 3);
		}
		return result;
	}
	
	
	
}
