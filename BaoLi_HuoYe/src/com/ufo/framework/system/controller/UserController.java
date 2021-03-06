package com.ufo.framework.system.controller;

import java.awt.Color;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.annotation.Resource;
import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.builder.ReflectionToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.ExcessiveAttemptsException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.util.WebUtils;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.context.annotation.Scope;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

import com.model.hibernate.property.PropertyCompany;
import com.model.hibernate.system.shared.Department;
import com.model.hibernate.system.shared.EndUser;
import com.model.hibernate.system.shared.XCodeInfo;
import com.property.base.vo.ProUserInfo;
import com.ufo.framework.common.core.exception.InsertException;
import com.ufo.framework.common.core.exception.ResponseErrorInfo;
import com.ufo.framework.common.core.utils.AppUtils;
import com.ufo.framework.common.core.utils.MD5Util;
import com.ufo.framework.common.core.utils.StringUtil;
import com.ufo.framework.common.core.web.VerifyCodeUtil;
import com.ufo.framework.common.model.Model;
import com.ufo.framework.system.ebi.CommonException;
import com.ufo.framework.system.ebi.Ebi;
import com.ufo.framework.system.ebi.EndUserEbi;
import com.ufo.framework.system.repertory.SqlModuleFilter;
import com.ufo.framework.system.shared.module.DataDeleteResponseInfo;
import com.ufo.framework.system.shared.module.DataFetchResponseInfo;
import com.ufo.framework.system.shared.module.DataInsertResponseInfo;
import com.ufo.framework.system.shared.module.DataUpdateResponseInfo;
import com.ufo.framework.system.web.SecurityUserHolder;

/**
 * 
 * @author 作者 yingqu:
 * @version 创建时间：2014年6月24日 下午1:05:13 version 1.0
 */
@Controller("userAction")
@Scope("prototype")
@RequestMapping("/rbacUser")
public class UserController extends SimpleBaseController<EndUser> implements CommonException {
	
	@Resource(name="ebo")
	private Ebi ebo;
	
	protected UserController() {
		super(EndUser.class);
	}
	
	
	
	
	
	@Override
	public void doUpdateList(String strData, String[] ids,
			HttpServletRequest request, HttpServletResponse response) throws Exception {
		// TODO Auto-generated method stub
		try {
			String[] updateSqls = jsonBuilder.jsonSqlToString(strData);
			EndUserEbi uebi=(EndUserEbi)ebi;
			uebi.updateUser(updateSqls, ids);
			toWrite(response,
					jsonBuilder.returnSuccessJson("'" + updateSqls.length
							+ "条记录被更新'"));
		}catch (ConstraintViolationException e) {
		      error("DataAccessException异常", e);
		      toWrite(response,
						jsonBuilder.returnFailureJson("'更新失败  :插入记录的值重复!'"));
		} 
		catch (Exception e) {
			e.printStackTrace();
			error("批量更新失败，错误信息:" + e.getMessage());
			toWrite(response,
					jsonBuilder.returnFailureJson("'批量更新失败，错误信息："
							+ e.getMessage() + "'"));
		}
	}





	public void doSave(EndUser model, HttpServletRequest request,
			HttpServletResponse response) {
		model.setPassword(MD5Util.md5(model.getPassword()));
		model.setCreateTime(AppUtils.getCurrentTime());
		String hql=" select max(u.orderIndex) from EndUser u ";
		try {
			
			this.getModel(request, model);
			int max= ebi.getCount(hql);
			model.setOrderIndex(max);
			model.setSex("1");
			model.setEnabled("1");
			model.setXcode(SecurityUserHolder.getIdentification());
			if(EndUser.MARKING_XCODE.equals(SecurityUserHolder.getIdentification())){
				model.setCodeId(EndUser.MARKING_XCODE);
			}else{
				model.setCodeId(SecurityUserHolder.getCurrentUser().getXcodeInfo().getTf_codeId());
			}
			ebi.save(model);
			toWrite(response,
					jsonBuilder.returnSuccessJson(jsonBuilder.toJson(model)));
			
		}catch (DataAccessException e) {
		      error("DataAccessException异常", e);
			if (e.getRootCause().getMessage().toLowerCase().indexOf("unique ke") != -1){
				toWrite(response,
						jsonBuilder.returnFailureJson("'插入记录的主键值与数据库中原有的值重复"
								+ e.getRootCause().getMessage().toLowerCase() + "'"));
			}
			
		}catch (Exception e) {
			e.printStackTrace();
			toWrite(response,
					jsonBuilder.returnFailureJson("'保存方法出错，错误信息"
							+ e.getMessage() + "'"));
		}
	
		
		
		
	
	}
	
	
	
	public void doUpdate(EndUser model, HttpServletRequest request,
			HttpServletResponse response) {
		this.getModel(request, model);
		try {
			if (model instanceof Model) {
				//buildModelModifyInfo(request, response, (BaseEntity) model);
			} else {
				error("实体信息获取错误");
				toWrite(response, jsonBuilder.returnFailureJson("'传入的实体信息错误'"));
				return;
			}
			EndUser endUser=(EndUser) ebi.findById(EndUser.class, model.getUserId());
			
			Map<String,Object> values=new HashMap<>();
			values.put("userCode", model.getUserCode());
			values.put("username", model.getUsername());
			values.put("sex", model.getSex());
			if(!endUser.getPassword().equals(model.getPassword())){
			values.put("password", MD5Util.md5(model.getPassword()));
			}
			ebo.update(values, EndUser.class, model.getUserId());
			toWrite(response,
					jsonBuilder.returnSuccessJson(jsonBuilder.toJson(model)));
		} catch (Exception e) {
			e.printStackTrace();
			error("更新方法出错，错误信息" + e.getMessage());
			toWrite(response,
					jsonBuilder.returnFailureJson("'更新方法出错，错误信息"
							+ e.getMessage() + "'"));

		}
	}
	
	
	@RequestMapping("/getCurrentUser")
	public void getCurrentUser(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		EndUser user = SecurityUserHolder.getCurrentUser();
		if (user != null) {
			String str=jsonBuilder.toJson(user);
			toWrite(response,
					jsonBuilder.returnSuccessJson(str));
		} else {
			toWrite(response, jsonBuilder.returnFailureJson("'没有得到登录用户'"));
		}
	}
	
	
	
	@RequestMapping("/pro")
	private  @ResponseBody Map<String,String> loadPro() throws Exception{
		EndUser user = SecurityUserHolder.getCurrentUser();
		Map<String,String> result=new HashMap<>();
		XCodeInfo codeInfo=user.getXcodeInfo();
		boolean flag=true;
		if(codeInfo==null){
			flag=false;
		}
		if(flag){
			PropertyCompany company=codeInfo.getTf_propertyCompany();
			if(company!=null){
				result.put("name", company.getTf_name());
				result.put("phone", company.getTf_phone());
				result.put("contact", company.getTf_contact());
			}
		}
		return result;
		
	}
	
	
	@Override
	public EndUser getModel(HttpServletRequest request, EndUser model) {
		String deptId = request.getParameter("foreignKey");
		if(StringUtils.isNotEmpty(deptId)){
		Department dept = new Department();
		dept.setDeptId(deptId);
		model.setDepartment(dept);
		}
		return model;
	}

	/**
	 * 获取验证码图片和文本(验证码文本会保存在HttpSession中)
	 */
	@RequestMapping("/LoginVerifyCodeImage")
	public void getVerifyCodeImage(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		// 设置页面不缓存
		response.setHeader("Pragma", "no-cache");
		response.setHeader("Cache-Control", "no-cache");
		response.setDateHeader("Expires", 0);
		String verifyCode = VerifyCodeUtil.generateTextCode(
				VerifyCodeUtil.TYPE_NUM_ONLY, 4, null);
		// 将验证码放到HttpSession里面
		request.getSession().setAttribute("verifyCode", verifyCode);
		System.out.println("本次生成的验证码为[" + verifyCode + "],已存放到HttpSession中");
		// 设置输出的内容的类型为JPEG图像
		response.setContentType("image/jpeg");
		BufferedImage bufferedImage = VerifyCodeUtil.generateImageCode(
				verifyCode, 90, 30, 3, true, Color.WHITE, Color.BLACK, null);
		// 写给浏览器
		ImageIO.write(bufferedImage, "JPEG", response.getOutputStream());
	}
	@RequestMapping(value = "/Login", method = RequestMethod.POST)
	private void loginAction(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
	//	SecurityUtils.getSubject().logout();
		String resultPageURL = InternalResourceViewResolver.FORWARD_URL_PREFIX
				+ "/";
		String username = request.getParameter("userCode");
		String password = request.getParameter("password");
		// 获取HttpSession中的验证码
		String verifyCode = (String) request.getSession().getAttribute(
				"verifyCode");
		// 获取用户请求表单中输入的验证码
		String submitCode = WebUtils.getCleanParam(request, "verifyCode");
		System.out.println("用户[" + username + "]登录时输入的验证码为[" + submitCode
				+ "],HttpSession中的验证码为[" + verifyCode + "]");
		if (StringUtil.isEmpty(submitCode)
				|| !StringUtils.equals(verifyCode, submitCode.toLowerCase())) {
			toWrite(response, jsonBuilder.returnFailureJson("'验证码不正确!'"));
		}else{
	UsernamePasswordToken token = new UsernamePasswordToken(username,
				MD5Util.md5(password));
		token.setRememberMe(true);
		System.out.println("为了验证登录用户而封装的token为"
				+ ReflectionToStringBuilder.toString(token,
						ToStringStyle.MULTI_LINE_STYLE));
		// 获取当前的Subject
		Subject currentUser = SecurityUtils.getSubject();
		String mesg="";
		try {
			// 在调用了login方法后,SecurityManager会收到AuthenticationToken,并将其发送给已配置的Realm执行必须的认证检查
			// 每个Realm都能在必要时对提交的AuthenticationTokens作出反应
			// 所以这一步在调用login(token)方法时,它会走到MyRealm.doGetAuthenticationInfo()方法中,具体验证方式详见此方法
			System.out.println("对用户[" + username + "]进行登录验证..验证开始");
			currentUser.login(token);
			System.out.println("对用户[" + username + "]进行登录验证..验证通过");
			resultPageURL = "main";
		} catch (UnknownAccountException uae) {
			token.clear();
			SecurityUtils.getSubject().logout();
			System.out.println("对用户[" + username + "]进行登录验证..验证未通过,未知账户");
			mesg="用户名或密码不正确!";
		} catch (IncorrectCredentialsException ice) {
			System.out.println("对用户[" + username + "]进行登录验证..验证未通过,错误的凭证");
			mesg="用户名或密码不正确!";
		} catch (LockedAccountException lae) {
			System.out.println("对用户[" + username + "]进行登录验证..验证未通过,账户已锁定");
			mesg="账户已锁定!";
		} catch (ExcessiveAttemptsException eae) {
			System.out.println("对用户[" + username + "]进行登录验证..验证未通过,错误次数过多");
			mesg="由于用户名或密码错误次数过多,账户已锁定!";
		} catch (AuthenticationException ae) {
			// 通过处理Shiro的运行时AuthenticationException就可以控制用户登录失败或密码错误时的情景
			System.out.println("对用户[" + username + "]进行登录验证..验证未通过,堆栈轨迹如下");
			ae.printStackTrace();
			mesg="用户名或密码不正确!";
		}
		// 验证是否登录成功
		if (currentUser.isAuthenticated()) {
			System.out.println("用户[" + username
					+ "]登录认证通过(这里可以进行一些认证通过后的一些系统参数初始化操作)");
			toWrite(response, jsonBuilder.returnSuccessJson("'/app/index.action'"));
		} else {
			token.clear();
			toWrite(response, jsonBuilder.returnFailureJson("'"+mesg+"'"));
		}
		}
	}

	/**
	 * 用户登出
	 * @throws IOException 
	 * @throws ServletException 
	 */
	@RequestMapping("/logout")
	public void logout(HttpServletRequest request,HttpServletResponse response) throws ServletException, IOException {
		SecurityUtils.getSubject().logout();
		request.getRequestDispatcher("/login.jsp").forward(request, response);
		//return  "login.jsp";//InternalResourceViewResolver.REDIRECT_URL_PREFIX + "/";
	}
	@RequestMapping(value = "/fetchdata", method = RequestMethod.GET)
	public @ResponseBody
	Map<String, Object> fetchData(Integer start, Integer limit,
			@RequestParam(value="whereSql",required=false,defaultValue="") String whereSql,
	    	@RequestParam(value="parentSql",required=false,defaultValue="") String parentSql,
	    	@RequestParam(value="querySql",required=false,defaultValue="") String querySql,
	    	@RequestParam(value="orderSql",required=false,defaultValue="order by createTime") String orderSql,
			HttpServletRequest request) throws Exception {
		StringBuffer hql = new StringBuffer("from EndUser where 1=1  ");
		StringBuffer countHql = new StringBuffer("select count(*) from EndUser  where 1=1 ");
		whereSql = whereSql == null ? "" : whereSql;
		whereSql+="  and codeId !='"+EndUser.MARKING_XCODE+"' and admins='1'";
		hql.append(whereSql);
		parentSql = parentSql == null ? "" : parentSql;
		hql.append(parentSql);
		querySql = querySql == null ? "" : querySql;
		hql.append(querySql);
		orderSql = orderSql == null ? "" : orderSql;
		countHql.append(whereSql);
		countHql.append(querySql);
		countHql.append(parentSql);
		Integer count = ebi.getCount(countHql.toString());
		hql.append(orderSql);
		List<EndUser> list= (List<EndUser>) this.ebi.queryByHql(hql.toString(), start, limit);
		
		 List<ProUserInfo> viewitems= list.stream().map(item->{
			ProUserInfo pru=new ProUserInfo();
			pru.setCreateTime(item.getCreateTime());
			pru.setId(item.getUserId());
			pru.setLoginCode(item.getUserCode());
			pru.setSex(item.getSex());
			XCodeInfo xcode=new XCodeInfo();
			try {
				xcode = (XCodeInfo) ebi.findById(XCodeInfo.class, item.getCodeId());
			} catch (Exception e) {
				e.printStackTrace();
			}
			
			pru.setProid(xcode.getTf_propertyCompany().getTf_proid()+"");
			pru.setProname(xcode.getTf_propertyCompany().getTf_name());
			pru.setPwd(item.getPassword());
			pru.setUserName(item.getUsername());
			return pru;
			
		}).collect(Collectors.toList());
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("records", viewitems);
		result.put("totalCount",count );
		return result;
	}
	
	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public void addWithNoPrimaryKey(
			@RequestParam(value="loginCode",required=true) String loginCode,
			@RequestParam(value="userName",required=true) String userName,
			@RequestParam(value="proid",required=true) String proId,
			@RequestParam(value="pwd",required=true) String pwd,
			@RequestParam(value="sex",required=true) String sex,
			HttpServletResponse response,
			HttpServletRequest request)  {
	        EndUserEbi uebi=(EndUserEbi)ebi;
            try {
				uebi.addUser(loginCode, userName, proId, pwd, sex);
				toWrite(response,
						jsonBuilder.returnSuccessJson("'添加成功!'"));
			} catch (InsertException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				toWrite(response,
						jsonBuilder.returnFailureJson("'添加失败! "+e.getErrorInfo().getErrorMessage()+"'"));
			}catch (Exception e) {
				// TODO: handle exception
				e.printStackTrace();
				
			}
	
	}
	@RequestMapping(value = "/updateuser", method = RequestMethod.POST)
	public void updateuser( ProUserInfo prouser,
			@RequestParam(value="id",required=true) String id,
			@RequestParam(value="sex",required=true) String sex,
			@RequestParam(value="userName",required=true) String username,
			@RequestParam(value="loginCode",required=true) String userCode,
			@RequestParam(value="pwd",required=true) String password,
			HttpServletRequest request,
			HttpServletResponse response
			
			) throws Exception {
		String msg="";
		try{
		    EndUser endUser=(EndUser) ebi.findById(EndUser.class, id);
		    Map<String,Object> values=new HashMap<String, Object>();
	         if(!password.equals(endUser.getPassword())){
	        	 values.put("password", MD5Util.md5(password));
	         }
	         values.put("username", username);   
	     	String hql="select count(*) from  EndUser where userCode='"+userCode.trim()+"'";
		    int count= ebo.getCount(hql);
		    if(count==0){
		        values.put("userCode", userCode.trim());   
		    }else{
		    	if(!userCode.equals(endUser.getUserCode())){
		    	msg="账号已存在";
		    	getUpdateException("", "账号已存在", ResponseErrorInfo.STATUS_FAILURE);
		    	}
		    }
	         values.put("sex", sex);   
	        ebo.update(values, EndUser.class, id);
	     	toWrite(response,
					jsonBuilder.returnSuccessJson("'更新成功!'"));
	         
		}catch(Exception e){
			toWrite(response,
					jsonBuilder.returnFailureJson("'更新失败! "+msg+"'"));
		}
	         
	
	}

	
	@RequestMapping(value = "/removerecords.do")
	public @ResponseBody
	DataDeleteResponseInfo removeRecords(String moduleName, String[] titles,
			@RequestParam(value="ids",required=false) int[] ids,
			HttpServletRequest request) {
		DataDeleteResponseInfo 	result = new DataDeleteResponseInfo();
		return result;
	}
	
	
	
	
	
	
	

}
