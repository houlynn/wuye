package com.ufo.framework.system.controller;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Date;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.context.annotation.Scope;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.model.hibernate.system.shared.SysIcon;
import com.ufo.framework.common.core.properties.PropUtil;
import com.ufo.framework.common.core.utils.DateUtil;
import com.ufo.framework.common.core.utils.StringUtil;
import com.ufo.framework.system.ebi.SysIconEbi;

/**
 *
* @author 作者 yingqu: 
* @version 创建时间：2014年6月24日 下午4:12:38 
* version 1.0
 */
@Controller("SysIconAction")
@Scope("prototype")
@RequestMapping("/coreIcon")
public class SysIconController extends SimpleBaseController<SysIcon> {
	private static final Integer BUFFER_SIZE=16*1024;
	protected SysIconController() {
		super(SysIcon.class);
		// TODO Auto-generated constructor stub
	}
	public SysIconEbi getIconEbi() {
		return (SysIconEbi)ebi;
	}

	@RequestMapping("/doRemove")
	public void  doRemove(SysIcon model,HttpServletRequest request, HttpServletResponse response){
		super.doRemove(model, request, response);
		try
		{
			getIconEbi().syncIconCss();
		}catch(Exception e)
		{
			System.out.println(e.getStackTrace());
			error("删除失败，失败信息:"+e.getMessage());
			toWrite(response,jsonBuilder.returnFailureJson("'同步图标失败！:"+e.getMessage()+"'"));
			
		}
		
	}
	@RequestMapping(value="/doSave",method=RequestMethod.POST)
	public void doSave(@Validated SysIcon model,BindingResult br,@RequestParam("icon") MultipartFile icon,  HttpServletRequest request,
			HttpServletResponse response) {
		this.processFieldsUpload(request, model, icon);
		super.doSave(model, request, response);
		try
		{
		getIconEbi().syncIconCss();
		}catch(Exception e)
		{
			System.out.println(e.getStackTrace());
			error("删除失败，失败信息:"+e.getMessage());
			toWrite(response,jsonBuilder.returnFailureJson("'同步图标失败！:"+e.getMessage()+"'"));
		}
		
	}
	
	@RequestMapping(value="/doUpdate",method=RequestMethod.POST)
	public void doUpdates(@Validated SysIcon model,BindingResult br,@RequestParam("icon") MultipartFile icon,  HttpServletRequest request,
			HttpServletResponse response) {
		this.processFieldsUpload(request, model, icon);
		super.doUpdate(model, request, response);
		try
		{
		getIconEbi().syncIconCss();
		}catch(Exception e)
		{
			System.out.println(e.getStackTrace());
			error("删除失败，失败信息:"+e.getMessage());
			toWrite(response,jsonBuilder.returnFailureJson("'同步图标失败！:"+e.getMessage()+"'"));
		}
		
	}
	
	@Override
	public SysIcon getModel(HttpServletRequest request, SysIcon model) {
		// TODO Auto-generated method stub
		return model;
	}
	//上传文件处理
	public void processFieldsUpload(HttpServletRequest request,SysIcon model, MultipartFile icon){
		upload(model, icon);
	}
	private void upload(SysIcon model, MultipartFile icon) {
		//前台会穿三个参数
		/**
		 * 1.字段名：得到文件流对象
		 * 2.字段名FileName  文件名称
		 * 3.字段名ContextType 文件类型
		 */
		String fileName=icon.getName();
		InputStream ins=null;;
		try {
			ins = icon.getInputStream();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if(StringUtil.isNotEmpty(fileName)&&ins!=null&&StringUtil.isNotEmpty(icon.getOriginalFilename()))
		{
		String toUploadDir=PropUtil.get("struts.upload.path")+"/"+DateUtil.formatDate(new Date());
		File dir=new File(SimpleBaseController.webrootAbsPath+toUploadDir);
		if(!dir.exists()){
			info("创建文件目录"+toUploadDir);
			dir.mkdirs();
		}		
		fileName=UUID.randomUUID()+"."+icon.getOriginalFilename();
		String rootPath=toUploadDir+"/"+fileName;
		File dst=new File(SimpleBaseController.webrootAbsPath+rootPath);
		copy(ins, dst, false);
		model.setIcon(rootPath);
		}
	}
	/**
	 * 写出文件的方法
	 * @param src 前台传的file对象
	 * @param dst 目标的文件对象
	 * @param overwrite 是否覆盖
	 */
	private void copy(InputStream in, File dst, boolean overwrite)  {
		 try  {
	            if(dst.exists() && overwrite) {
	                dst.delete();
	            }
	           OutputStream out = null ;
	            try  {                
	               out = new BufferedOutputStream(new FileOutputStream(dst),BUFFER_SIZE);
	                byte [] buffer = new byte [BUFFER_SIZE];
	                while (in.read(buffer) > 0 )  {
	                   out.write(buffer);
	               } 
	            } finally  {
	                if ( null != in)  {
	                   in.close();
	               } 
	                if ( null != out)  {
	                   out.close();
	               } 
	            } 
	         } catch (Exception e)  {
	            e.printStackTrace();
	        } 
	}

}
