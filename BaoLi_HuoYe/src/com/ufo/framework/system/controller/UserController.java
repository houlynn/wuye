package com.ufo.framework.system.controller;

import java.awt.Color;
import java.awt.image.BufferedImage;
import java.io.IOException;

import javax.imageio.ImageIO;
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
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

import com.model.hibernate.system.shared.Department;
import com.model.hibernate.system.shared.EndUser;
import com.ufo.framework.common.core.utils.MD5Util;
import com.ufo.framework.common.core.utils.StringUtil;
import com.ufo.framework.common.core.web.VerifyCodeUtil;
import com.ufo.framework.system.web.SecurityUserHolder;

/**
 * 
 * @author 作者 yingqu:
 * @version 创建时间：2014年6月24日 下午1:05:13 version 1.0
 */
@Controller("userAction")
@Scope("prototype")
@RequestMapping("/rbacUser")
public class UserController extends SimpleBaseController<EndUser> {
	protected UserController() {
		super(EndUser.class);
	}
	public void doSave(EndUser model, HttpServletRequest request,
			HttpServletResponse response) {
		model.setPassword(MD5Util.md5(model.getPassword()));
	//	model.setEnabled("1");
		super.doSave(model, request, response);
	}
	@RequestMapping("/getCurrentUser")
	public void getCurrentUser(HttpServletRequest request,
			HttpServletResponse response) {
		EndUser user = SecurityUserHolder.getCurrentUser();
		if (user != null) {
			toWrite(response,
					jsonBuilder.returnSuccessJson(jsonBuilder.toJson(user)));
		} else {
			toWrite(response, jsonBuilder.returnFailureJson("'没有得到登录用户'"));
		}
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
	 */
	@RequestMapping("/logout")
	public String logout(HttpServletRequest request) {
		SecurityUtils.getSubject().logout();
		return InternalResourceViewResolver.REDIRECT_URL_PREFIX + "/";
	}

}
