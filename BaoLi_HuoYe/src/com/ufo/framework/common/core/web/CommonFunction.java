package com.ufo.framework.common.core.web;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.OutputStream;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.security.MessageDigest;
import java.sql.Blob;
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.zip.CRC32;
import java.util.zip.CheckedOutputStream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.hibernate.Hibernate;

import com.artofsolving.jodconverter.DefaultDocumentFormatRegistry;
import com.artofsolving.jodconverter.DocumentConverter;
import com.artofsolving.jodconverter.DocumentFormat;
import com.artofsolving.jodconverter.openoffice.connection.OpenOfficeConnection;
import com.artofsolving.jodconverter.openoffice.connection.SocketOpenOfficeConnection;
import com.artofsolving.jodconverter.openoffice.converter.OpenOfficeDocumentConverter;
import com.ufo.framework.system.shared.FileTypeVSMimeType;

import net.sf.json.JSONObject;

public class CommonFunction {
	@SuppressWarnings("unchecked")
	public static String fu_jsonToString(Object value) {
		String r = "";
		if (value instanceof JSONObject) {

			DecimalFormat a = new DecimalFormat("0.00");

			Iterator<String> k = ((JSONObject) value).keys();
			while (k.hasNext()) {
				String lfd = (String) k.next();
				try {
					Object o = ((JSONObject) value).get(lfd);
					if (o instanceof Double)
						r = r + a.format((Double) o) + ", ";
					else
						r = r + o.toString() + ", ";
				} catch (Exception e) {
					// e.printStackTrace();
				}
			}
			// System.out.println(r);
			return r;
		} else
			return value.toString();
	}

	/**
	 * 对object 进行筛选，几个条件如果是 并列的，用空格分开，条件是或者，用逗号分开
	 * 
	 * @param filter
	 *          逗号分开，表示条件是或者
	 * @param source
	 * @return
	 */

	public static Boolean fu_hasIncludeFilter__OR(String filter[], Object source) {
		String s = fu_jsonToString(source);
		for (String f : filter) {
			if (s.indexOf(f) != -1)
				return true;
		}
		return false;
	}

	/**
	 * 对object 进行筛选，几个条件如果是 并列的，用空格分开，条件是或者，用逗号分开
	 * 
	 * @param filter
	 *          空格分开，表示条件是并且
	 * @param source
	 * @return
	 */

	public static Boolean fu_hasIncludeFilter__AND(String filter[], Object source) {
		String s = fu_jsonToString(source);
		for (String f : filter) {
			if (s.indexOf(f) == -1)
				return false;
		}
		return true;
	}

	public static Boolean fu_hasIncludeFilter(String filter, Object source) {
		if (fu_jsonToString(source).indexOf(filter) == -1)
			return false;
		else {
			// System.out.println(source.toString());
			return true;
		}
	}

	public static HttpServletResponse downloadExceptionString(HttpServletResponse response,
			String fn, String msg) throws IOException {

		byte[] buffer = msg.getBytes();
		long l = buffer.length;
		response.reset();
		response.addHeader("Content-Disposition",
				"attachment;filename=" + new String(fn.getBytes("gb2312"), "iso8859-1"));
		response.addHeader("Content-Length", "" + l);
		OutputStream toClient = new BufferedOutputStream(response.getOutputStream());
		response.setContentType("application/octet-stream");
		toClient.write(buffer);
		toClient.flush();
		toClient.close();
		return response;
	}

	public static HttpServletResponse downloadfilenotfound(HttpServletResponse response)
			throws IOException {

		byte[] buffer = "下载文件失败:没有找到要下载的文件!".getBytes();
		long l = buffer.length;
		String fn = "下载的文件未找到.txt";
		response.reset();
		response.addHeader("Content-Disposition",
				"attachment;filename=" + new String(fn.getBytes("gb2312"), "iso8859-1"));
		response.addHeader("Content-Length", "" + l);
		OutputStream toClient = new BufferedOutputStream(response.getOutputStream());
		response.setContentType("application/octet-stream");
		toClient.write(buffer);
		toClient.flush();
		toClient.close();
		return response;
	}

	public static HttpServletResponse download(OutputStream os, String downloadfilename,
			HttpServletResponse response) throws IOException {

		InputStream br = new ByteArrayInputStream(((ByteArrayOutputStream) os).toByteArray());
		return download(br, downloadfilename, "attachment", response);
	}

	public static HttpServletResponse downloadAndOpen(OutputStream os, String downloadfilename,
			HttpServletResponse response) throws IOException {

		InputStream br = new ByteArrayInputStream(((ByteArrayOutputStream) os).toByteArray());
		return download(br, downloadfilename, "inline", response);
	}

	public static void downloadAndOpenPDF(OutputStream br, String fn, HttpServletResponse response)
			throws IOException {

		// pdf 打开在网页里 预览
		response.reset();
		response.addHeader("Content-Disposition", "inline;filename="
				+ new String(fn.getBytes("gb2312"), "iso8859-1"));

		response.addHeader("Content-Length", "" + ((ByteArrayOutputStream) br).size());

		String mimetype = FileTypeVSMimeType.getMimeType(".pdf");
		response.setContentType(mimetype + ";charset=gb2312");

		response.setBufferSize(5 * 1024 * 1024);

		OutputStream out = response.getOutputStream();
		InputStream is = new ByteArrayInputStream(((ByteArrayOutputStream) br).toByteArray());
		byte[] buffer = new byte[1024 * 10];
		int len = 0;
		try {
			while ((len = is.read(buffer)) > 0) {
				out.write(buffer, 0, len);
				out.flush();
			}
		} catch (Exception e) {
		} finally {
			is.close();
			out.close();
		}

	}

	public static HttpServletResponse download(InputStream br, String downloadfilename,
			String attachmentORinline, HttpServletResponse response) throws IOException {

		response.reset();
		response.setBufferSize(5 * 1024 * 1024);

		// inline 支持在线打开，attachment 下载

		response.addHeader("Content-Disposition", attachmentORinline + ";filename="
				+ new String(downloadfilename.getBytes("gb2312"), "iso8859-1"));
		// response.addHeader("Content-Length", "" + os...length());
		response.setContentType("application/octet-stream");
		OutputStream out = response.getOutputStream();
		byte[] buffer = new byte[1024 * 10];
		int len = 0;
		try {
			while ((len = br.read(buffer)) > 0) {
				out.write(buffer, 0, len);
				out.flush();
			}
		} catch (Exception e) {
		} finally {
			br.close();
			out.close();
		}
		return response;
	}

	public static HttpServletResponse download(String path, String downloadfilename,
			HttpServletResponse response, Boolean deleted) throws IOException {
		// path是指欲下载的文件的路径。
		File file = new File(path);
		if (!file.exists())
			return downloadfilenotfound(response);
		InputStream br = new BufferedInputStream(new FileInputStream(path));
		response.reset();
		response.setBufferSize(5 * 1024 * 1024);

		// inline 支持在线打开，attachment 下载

		response.addHeader("Content-Disposition",
				"attachment;filename=" + new String(downloadfilename.getBytes("gb2312"), "iso8859-1"));
		response.addHeader("Content-Length", "" + file.length());
		response.setContentType("application/octet-stream");
		OutputStream out = response.getOutputStream();
		byte[] buffer = new byte[1024 * 10];
		int len = 0;
		// int count = 0;
		try {
			while ((len = br.read(buffer)) > 0) {
				out.write(buffer, 0, len);
				out.flush();
				// System.out.println("download : " + ++count*10 + "k");
			}
		} catch (Exception e) {
			// System.out.println("用户取消了下载");
		} finally {
			// System.out.println("closefile");
			br.close();
			out.close();
		}
		if (deleted)
			file.delete();
		return response;
	}

	/**
	 * 根据后缀名生成图片的文件把流放到response中去
	 * 
	 * @param path
	 * @param filename
	 * @param response
	 * @return
	 * @throws IOException
	 */
	public static HttpServletResponse downloadFilePreviewIcon(String path, String filename,
			HttpServletResponse response) throws IOException {
		String ext = FileOperate.getFileExtName(filename);
		String extIconFileName = "no.png";
		if (ext.length() > 0)
			extIconFileName = ext + ".png";
		// path是指欲下载的文件的路径。
		File file = new File(path + extIconFileName);
		if (!file.exists())
			extIconFileName = "otherfile.png";

		// System.out.println(path + extIconFileName);

		InputStream br = new BufferedInputStream(new FileInputStream(path + extIconFileName));
		response.reset();
		response.setBufferSize(5 * 1024);
		response.setContentType("image/png");
		response.setHeader("Cache-Control", "max-age=" + 60);
		OutputStream out = response.getOutputStream();
		byte[] buffer = new byte[1024 * 10];
		int len = 0;
		// int count = 0;
		try {
			while ((len = br.read(buffer)) > 0) {
				out.write(buffer, 0, len);
				out.flush();
			}
		} catch (Exception e) {
		} finally {
			br.close();
			out.close();
		}
		return response;
	}

	/**
	 * 将一个 Excel 流 转换成 PDF 流
	 * 
	 * @param inputStream
	 * @return
	 */
	public static OutputStream excelStreamToPDFStream(InputStream inputStream) {
		String fileext = "xls";
		ByteArrayOutputStream pdfos = new ByteArrayOutputStream();
		try {
			OpenOfficeConnection connection = new SocketOpenOfficeConnection("127.0.0.1", 8100);
			connection.connect();
			DefaultDocumentFormatRegistry formatReg = new DefaultDocumentFormatRegistry();
			DocumentFormat pdfFormat = formatReg.getFormatByFileExtension("pdf");
			DocumentFormat docFormat = formatReg.getFormatByFileExtension(fileext);
			DocumentConverter converter = new OpenOfficeDocumentConverter(connection);
			converter.convert(inputStream, docFormat, pdfos, pdfFormat);
			connection.disconnect();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return pdfos;
	}

	public static Object getProperty(Object des, String proName) throws NoSuchFieldException,
			IllegalAccessException {

		Class<?> classType = des.getClass();
		// Field field = des.getClass().getDeclaredField(proName);
		// String fieldName = field.getName();

		String fieldName = proName;

		// System.out.println("----" + fieldName);
		String stringLetter = fieldName.substring(0, 1).toUpperCase();
		// 获得相应属性的getXXX和setXXX方法名称
		String getName = "get" + stringLetter + fieldName.substring(1);
		// 获取相应的方法
		Method getMethod = null;
		try {
			getMethod = classType.getMethod(getName, new Class[] {});
		} catch (Exception e) {

			if (classType.getGenericSuperclass() != null)
				try {
					classType = classType.getSuperclass();
					getMethod = classType.getMethod(getName, new Class[] {});
				} catch (Exception e1) {
					if (classType.getGenericSuperclass() != null)
						classType = classType.getSuperclass();
					try {
						getMethod = classType.getSuperclass().getMethod(getName, new Class[] {});
					} catch (Exception e2) {
						return ("**" + des.getClass().getSimpleName() + "的值" + proName);
					}
				}

			// e.printStackTrace();
		}
		// 调用源对象的getXXX（）方法
		Object value = null;
		try {
			value = getMethod.invoke(des, new Object[] {});
		} catch (Exception e) {
			// e.printStackTrace();
		}
		return value;

	}

	public static void setProperty(Object des, String proName, Object value)
			throws NoSuchFieldException, IllegalAccessException {
		Class<? extends Object> classType = des.getClass();
		Field field = des.getClass().getDeclaredField(proName);
		String fieldName = field.getName();
		String stringLetter = fieldName.substring(0, 1).toUpperCase();
		// 获得相应属性的getXXX和setXXX方法名称
		String setName = "set" + stringLetter + fieldName.substring(1);
		// 获取相应的方法
		Method setMethod = null;
		try {
			setMethod = classType.getMethod(setName, new Class[] { field.getType() });
		} catch (Exception e) {
			e.printStackTrace();
		}
		// 调用源对象的getXXX（）方法
		try {
			setMethod.invoke(des, new Object[] { value });
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static void setPropertyToSuperClass(Object des, String proName, Object value)
			throws NoSuchFieldException, IllegalAccessException {
		Class<? extends Object> classType = des.getClass();
		Field field = null;

		try {
			field = des.getClass().getDeclaredField(proName);
		} catch (Exception e) {
			try {
				field = des.getClass().getSuperclass().getDeclaredField(proName);
			} catch (Exception e1) {
				field = des.getClass().getSuperclass().getSuperclass().getDeclaredField(proName);

			}
		}

		String fieldName = field.getName();
		String stringLetter = fieldName.substring(0, 1).toUpperCase();
		// 获得相应属性的getXXX和setXXX方法名称
		String setName = "set" + stringLetter + fieldName.substring(1);
		// 获取相应的方法
		Method setMethod = null;
		try {
			setMethod = classType.getMethod(setName, new Class[] { field.getType() });
		} catch (Exception e) {
			e.printStackTrace();
		}
		// 调用源对象的getXXX（）方法
		try {
			setMethod.invoke(des, new Object[] { value });
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	// BMP、DIB、EMF、GIF、ICB、ICO、JPG、JPEG、PBM、PCD、PCX、PGM、PNG、PPM、PSD、PSP、RLE、SGI、TGA、TIF
	public static Boolean fu_isImgFile(String fext) {
		if (fext == null)
			return false;
		return fext.equals(".jpg") || fext.equals(".jpeg") || fext.equals(".gif")
				|| fext.equals(".png") || fext.equals(".bmp") || fext.equals(".ico") || fext.equals(".tif");
	}

	public static final Map<String, String> fileext_type = getfileext_type();

	private static HashMap<String, String> getfileext_type() {
		HashMap<String, String> result = new HashMap<String, String>();
		result.put(".txt", "文本文件");
		result.put(".doc", "Word文档");
		result.put(".docx", "Word文档");

		result.put(".xls", "Excel文档");
		result.put(".xlsx", "Excel文档");

		result.put(".ppt", "PowerPoint文档");
		result.put(".dat", "数据文档");
		result.put(".pdf", "PDF文档");
		result.put(".rar", "压缩文档");
		result.put(".zip", "压缩文档");
		result.put(".rtf", "写字板文档");
		result.put(".htm", "网页文档");
		result.put(".html", "网页文档");
		result.put(".mp3", "音频文档");
		result.put(".mp4", "mp4文档");
		result.put(".avi", "视频文档");
		result.put(".rmvb", "视频文档");
		result.put(".psd", "photoshop文档");

		return result;

	}

	private static Integer count = 0;
	private static String lastDate = null;
	//取得序号，每一分钟从头开始计数
	public static synchronized String fu_GenXH() {
		SimpleDateFormat sdf = new SimpleDateFormat("yy-MM-dd-HHmm");
		String dataString = sdf.format(new Date());
		if (dataString.equals(lastDate)) {
			count++;
		} else {
			lastDate = dataString;
			count = 1;
		}
		return dataString + count;
	}	
	
	public static synchronized String fu_GenDownLoadXH() {
		String tf_result = "";
		SimpleDateFormat sdf = new SimpleDateFormat("yy-MM-dd-HHmm");
		tf_result = sdf.format(new Date());
		return tf_result;
	}

	public static String fu_getFiletype(String fext) {
		if (fu_isImgFile(fext))
			return "图像文件";
		String result = fileext_type.get(fext);
		if (result != null)
			return result;
		else
			return "其他文档";

	}

	public static String fu_GenDivCase(String fz, String fm) {
		String tf_result = "CASE when " + fm + "=0 then null else " + fz + "/" + fm + " end";
		return tf_result;
	}

	public static String fu_getCaptionandIcon(String value) {
		if (value == null)
			return "";
		if (value.equals("承建单位"))
			return "<span class=\"columnHeadericon\"><img src=\"imagestton/developer.png\"  /></span> "
					+ value;
		if (value.equals("合同名称"))
			return "<span class=\"columnHeadericon\"><img src=\"imagestton/agreement.png\"  /></span> "
					+ value;

		return value;

	}

	/**
	 * 对于一个字符串，将字符22互换，如 123456 返回 214365
	 * 
	 * @return
	 */
	public static String fu_TwoTwoChange(String sour) {
		byte[] b = sour.getBytes();
		int len = b.length;
		for (int i = 0; i < (len) / 2; i++) {
			byte tmp = b[i * 2];
			b[i * 2] = b[i * 2 + 1];
			b[i * 2 + 1] = tmp;
		}
		return new String(b);
	}

	// 深度拷贝
	public static Object depthClone(Object srcObj) {
		Object cloneObj = null;
		try {
			ByteArrayOutputStream out = new ByteArrayOutputStream();
			ObjectOutputStream oo = new ObjectOutputStream(out);
			oo.writeObject(srcObj);
			ByteArrayInputStream in = new ByteArrayInputStream(out.toByteArray());
			ObjectInputStream oi = new ObjectInputStream(in);
			cloneObj = oi.readObject();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		return cloneObj;
	}

	// 读取加密狗，生成注册码
	public static String fu_getSerialNum() {
		return null;
	}

	public static String getIpAddr(HttpServletRequest request) {
		String ip = request.getHeader("x-forwarded-for");
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip))
			ip = request.getHeader("Proxy-Client-IP");
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip))
			ip = request.getHeader("WL-Proxy-Client-IP");
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip))
			ip = request.getRemoteAddr();
		return ip;
	}

	public static Boolean Zipfile(String filename, String zipfilename) {
		try {
			BufferedReader in = new BufferedReader(new InputStreamReader(new FileInputStream(filename),
					"ISO8859_1"));
			FileOutputStream f = new FileOutputStream(zipfilename);
			CheckedOutputStream ch = new CheckedOutputStream(f, new CRC32());
			ZipOutputStream out = new ZipOutputStream(new BufferedOutputStream(ch));
			int c;
			out.putNextEntry(new ZipEntry(filename));
			while ((c = in.read()) != -1)
				out.write(c);
			in.close();
			out.close();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	public static Date getNextDate(Date inputDate) {
		Calendar nextDate = Calendar.getInstance();
		nextDate.setTime(inputDate);
		nextDate.add(Calendar.DATE, 1);
		return nextDate.getTime();
	}

	public static String encodeByMD5(String str) {
		if (str == null) {
			return null;
		}
		try {
			MessageDigest messageDigest = MessageDigest.getInstance("MD5");
			messageDigest.update(str.getBytes());
			return getFormattedText(messageDigest.digest());
		} catch (Exception e) {
			throw new RuntimeException(e);
		}

	}

	private static String getFormattedText(byte[] bytes) {
		int len = bytes.length;
		StringBuilder buf = new StringBuilder(len * 2);
		for (int j = 0; j < len; j++) {
			buf.append(HEX_DIGITS[(bytes[j] >> 4) & 0x0f]);
			buf.append(HEX_DIGITS[bytes[j] & 0x0f]);
		}
		return buf.toString();
	}

	private static final char[] HEX_DIGITS = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a',
			'b', 'c', 'd', 'e', 'f' };
}
