package com.ufo.framework.common.core.utils;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Date;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.multipart.MultipartFile;

import com.ufo.framework.common.core.properties.PropUtil;
import com.ufo.framework.common.model.Model;
import com.ufo.framework.system.controller.SimpleBaseController;
public class ProcessFieldsUploadUtil {
	private static final Integer BUFFER_SIZE=16*1024;
	
	//上传文件处理
	public static void processFieldsUpload(HttpServletRequest request,Model model, MultipartFile icon,String uploadField){
		upload(model, icon,uploadField);
	}
	
	public static String  processFieldsUpload(MultipartFile icon,String saveConfig){
		return  upload(icon,saveConfig);
	}
	
	private static void upload(Model model, MultipartFile icon,String uploadField) {
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
			e.printStackTrace();
		}
		if(StringUtil.isNotEmpty(fileName)&&ins!=null&&StringUtil.isNotEmpty(icon.getOriginalFilename()))
		{
		String toUploadDir=PropUtil.get("menu.upload.path")+"/"+DateUtil.formatDate(new Date());
		File dir=new File(SimpleBaseController.webrootAbsPath+toUploadDir);
		if(!dir.exists()){
			//logger.info("创建文件目录"+toUploadDir);
			dir.mkdirs();
		}		
		fileName=UUID.randomUUID()+"."+icon.getOriginalFilename();
		String rootPath=toUploadDir+"/"+fileName;
		File dst=new File(SimpleBaseController.webrootAbsPath+rootPath);
		copy(ins, dst, false);
		EntityUtil.invokeSetMethod(model, uploadField, new Object[]{rootPath});
		}
	}
	
	private static String upload( MultipartFile icon,String saveConfig) {
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
			e.printStackTrace();
		}
		if(StringUtil.isNotEmpty(fileName)&&ins!=null&&StringUtil.isNotEmpty(icon.getOriginalFilename()))
		{
		String toUploadDir=PropUtil.get(saveConfig)+"/"+DateUtil.formatDate(new Date());
		File dir=new File(SimpleBaseController.webrootAbsPath+toUploadDir);
		if(!dir.exists()){
			//logger.info("创建文件目录"+toUploadDir);
			dir.mkdirs();
		}		
		fileName=UUID.randomUUID()+"."+icon.getOriginalFilename();
		String rootPath=toUploadDir+"/"+fileName;
		File dst=new File(SimpleBaseController.webrootAbsPath+rootPath);
		copy(ins, dst, false);
		return rootPath;
		}
		return null;
	}
	
	/**
	 * 写出文件的方法
	 * @param src 前台传的file对象
	 * @param dst 目标的文件对象
	 * @param overwrite 是否覆盖
	 */
	private  static void copy(InputStream in, File dst, boolean overwrite)  {
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
	
	
	public static void upload(Model model, MultipartFile icon,String uploadField,String config) {
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
			e.printStackTrace();
		}
		if(StringUtil.isNotEmpty(fileName)&&ins!=null&&StringUtil.isNotEmpty(icon.getOriginalFilename()))
		{
		String toUploadDir=PropUtil.get(config)+"/"+DateUtil.formatDate(new Date());
		File dir=new File(SimpleBaseController.webrootAbsPath+toUploadDir);
		if(!dir.exists()){
			//logger.info("创建文件目录"+toUploadDir);
			dir.mkdirs();
		}	
		  String peifx =icon.getOriginalFilename().substring(icon.getOriginalFilename().lastIndexOf(".")+1,icon.getOriginalFilename().length());  
		  System.out.println(peifx);
	         //对扩展名进行小写转换  
		  peifx = peifx.toLowerCase();
		fileName=UUID.randomUUID()+"."+peifx;
		String rootPath=toUploadDir+"/"+fileName;
		File dst=new File(SimpleBaseController.webrootAbsPath+rootPath);
		copy(ins, dst, false);
		EntityUtil.invokeSetMethod(model, uploadField, new Object[]{rootPath});
		}
	} 
	
	public static boolean uploadByBase64(String config,StringBuffer bufferImage,String postfix,Object owner, String uploadField) throws Exception{
		String confiPath=PropUtil.get(config);
		if(StringUtil.isEmpty(confiPath)){
			throw new Exception("没有找到存方论坛图片的文件夹");
		}
		String dateForder= PropUtil.get(config)+"/"+DateUtil.formatDate(new Date());
		String basePath=SimpleBaseController.webrootAbsPath+dateForder;
		File dir=new File(basePath);
		if(!dir.exists()){
			dir.mkdirs();
			System.out.println("创建文件夹:"+dir);
		}
		String requstPath="/"+UUID.randomUUID()+"."+postfix;;
		String filePath=dir+requstPath;
		boolean flag= AppUtils.generateImage(bufferImage.toString(),filePath);
		if(flag){
			flag=false;
			requstPath=dateForder+requstPath;
			EntityUtil.invokeSetMethod(owner, uploadField, new Object[]{requstPath});
			System.out.println("成功上传文件:"+filePath);
			flag=true;
		}
		return flag;
	
	}
	
}

