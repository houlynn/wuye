package com.generator.main;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.lang.reflect.Field;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import net.sf.ehcache.util.PropertyUtil;

import org.apache.commons.beanutils.PropertyUtils;
import org.springframework.web.bind.annotation.RequestMapping;

import com.lowagie.text.pdf.AcroFields.Item;
import com.model.hibernate.property.PropertyCompany;
import com.model.hibernate.system.shared.Position;
import com.sun.xml.internal.stream.Entity;
import com.ufo.framework.annotation.Dictionary;
import com.ufo.framework.annotation.FieldInfo;
import com.ufo.framework.annotation.SearchProperty;
import com.ufo.framework.common.core.ext.ExtFieldType;
import com.ufo.framework.common.core.ext.model.FormField;
import com.ufo.framework.common.core.ext.model.GridFieldModel;
import com.ufo.framework.common.core.ext.model.PhoneField;
import com.ufo.framework.common.core.ext.model.QueryFieldMdoel;
import com.ufo.framework.common.core.properties.PropUtil;
import com.ufo.framework.common.core.utils.AppUtils;
import com.ufo.framework.common.core.utils.ModelUtil;
import com.ufo.framework.common.core.utils.StringUtil;
import com.ufo.framework.common.log.LogerManager;
import com.ufo.framework.common.model.BaseEntity;
import com.ufo.framework.common.model.Model;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;

public class ViewModelGenerator implements LogerManager {

	private static final String CONN;
	private  static final String USER;
	private static final String PWD; 
	private static final String DRIVER; 
	private static final String BASEPK;
	static{
		USER=PropUtil.get("jdbc", "jdbc.username");
		PWD=PropUtil.get("jdbc", "jdbc.password");
		CONN=PropUtil.get("jdbc", "jdbc.url");
		DRIVER=PropUtil.get("jdbc", "jdbc.driverClassName");
		BASEPK="org.yingqu.sale";
	}
	
	private static Connection getConnection() throws Exception
	{
		 Class.forName(DRIVER);
		 return DriverManager.getConnection(CONN,USER,PWD);
	}
	
	private static String PATH = AppUtils.getPathFromClass(
			ViewModelGenerator.class).replace("ViewModelGenerator.class",
			"code");

	private static final String MODUBLE="sale";
	
	public static void createPOJO(Class<? extends Model> clazz,String moduble, String requestPath,String basePk) throws Exception {
		
		
		//////////////////////////create VO////////////////////
		List<GridFieldModel> list = getGridColunm(clazz);
		File fm=new File( PATH + "\\model\\");
		if (!fm.exists()) {
			fm.mkdirs();
		}
/*		FileWriter fos = new FileWriter(fm+"\\"
				+ clazz.getSimpleName() + "VO.java");*/
		Map<String, Object> data = new HashMap<>();
		data.put("bk", basePk);
		data.put("className", clazz.getSimpleName());
		data.put("pros", list);
		data.put("pkName", ModelUtil.getClassPkName(clazz));
		data.put("basePk", basePk+".model");
	/*	getTemplate("VO.ftl").process(data, fos);
		fos.close();*/
/*		Connection conn=getConnection();
		StringBuffer bufer=new StringBuffer();
		bufer.append("CREATE OR REPLACE VIEW "+clazz.getSimpleName()+"VO AS SELECT ");
		list.forEach(item->{
			bufer.append(item.getDataIndex()+" ,");
		});
		bufer.append( ModelUtil.getClassPkName(clazz)+",rownum as ID  FROM "+clazz.getSimpleName());
		System.out.println("SQL: "+ bufer.toString());
		PreparedStatement ps=conn.prepareStatement(bufer.toString());
		boolean reslut= ps.execute();
		if(reslut==true)
		{
			System.out.println(" 创建视图："+clazz.getSimpleName()+"VO success!");
		}
		conn.commit();*/
		////////////////////////create Controller////////////////////
		File fc=new File( PATH + "\\cl\\");
		if (!fc.exists()) {
			fc.mkdirs();
		}
		FileWriter foc = new FileWriter(fc+"\\"
				+ clazz.getSimpleName() + "Controller.java");
		data.remove("basePk");
		data.put("basePk",basePk+".controllers");
		data.put("className", clazz.getSimpleName());
		data.put("moduble", moduble);
		data.put("requestPath", requestPath);
		getTemplate("Controller.ftl").process(data, foc);
		foc.close();
		
		////////////////////////create Ebi////////////////////
		File febi=new File( PATH + "\\ebi\\");
		if (!febi.exists()) {
			febi.mkdirs();
		}
		FileWriter foebi = new FileWriter(febi+"\\"
				+ clazz.getSimpleName() + "Ebi.java");
		data.remove("basePk");
		data.put("basePk",basePk+".ebi");
		getTemplate("Ebi.ftl").process(data, foebi);
		foebi.close();
		
		////////////////////////create Ebo////////////////////
		File febo=new File( PATH + "\\ebo\\");
		if (!febo.exists()) {
			febo.mkdirs();
		}
		FileWriter foebo = new FileWriter(febo+"\\"
				+ clazz.getSimpleName() + "Ebo.java");
		data.remove("basePk");
		data.put("basePk",basePk+".ebo");
		getTemplate("Ebo.ftl").process(data, foebo);
		foebo.close();
		
		////////////////////////create IRepertory////////////////////
		File fdao=new File( PATH + "\\dao\\");
		if (!fdao.exists()) {
			fdao.mkdirs();
		}
		FileWriter foRepertory = new FileWriter(fdao+"\\"
				+ clazz.getSimpleName() + "Repertory.java");
		data.remove("basePk");
		data.put("basePk",basePk+".irepertory");
		getTemplate("IRepertory.ftl").process(data, foRepertory);
		foRepertory.close();
		
		////////////////////////create IRepertoryImpl////////////////////
		File fimpl=new File( PATH + "\\imp\\");
		if (!fimpl.exists()) {
			fimpl.mkdirs();
		}
		FileWriter foIRepertoryImpl = new FileWriter(fimpl+"\\"
				+ clazz.getSimpleName() + "RepertoryImpl.java");
		data.remove("basePk");
		data.put("basePk",basePk+".repertory");
		getTemplate("IRepertoryImpl.ftl").process(data, foIRepertoryImpl);
		foIRepertoryImpl.close();
		
	}

	public static void createExjrequestPathvc(String moduble, String requestPath,
			Class<? extends Model> clazz,boolean query)
			throws Exception {
		// /////////////////////////store////////////////////////////////////
		String dist = moduble + "." + requestPath;
		String fileName = PATH;
		System.out.println(fileName);
		fileName = PATH + "\\" + moduble + "\\" + requestPath + "\\" + "store\\";
		File sf = new File(fileName);
		if (!sf.exists()) {
			sf.mkdirs();
		}
		Map<String, Object> data = new HashMap<>();
		data.put("dist", dist);
		data.put("bm", moduble);
		data.put("className", clazz.getSimpleName());
			data.put("namespace","/"+moduble+"/"+requestPath);
		data.put("classFullName", clazz.getName());
		FileWriter fosStore = new FileWriter(sf + "\\" + clazz.getSimpleName()
				+ "Store.js");
		getTemplate("Store.ftl").process(data, fosStore);
		fosStore.close();

		// ////////////////////////////panel//////////////////////////////////////////////
		fileName = PATH + "\\" + moduble + "\\" + requestPath + "\\" + "view\\";
		File pf = new File(fileName);
		if (!pf.exists()) {
			pf.mkdirs();
		}
		data.put("pkName", ModelUtil.getClassPkName(clazz));
		if(query)
		{
		data.put("queryFields", getQueryField(clazz));
		}
		FileWriter fosPanle = new FileWriter(pf + "\\" + clazz.getSimpleName()
				+ "Panel.js");
		getTemplate("Panel.ftl").process(data, fosPanle);
		fosPanle.close();
		// ////////////////////////////controller//////////////////////////////////////////////
		fileName = PATH + "\\" + moduble + "\\" + requestPath + "\\" + "controller\\";
		File cf = new File(fileName);
		if (!cf.exists()) {
			cf.mkdirs();
		}
		FileWriter foscontrol = new FileWriter(new File(cf + "\\"
				+ clazz.getSimpleName() + "Controller.js"));
		getTemplate("Controllers.ftl").process(data, foscontrol);
		foscontrol.close();

		// //////////////////////////////////grid/////////////////////////////////////////////////
		fileName = PATH + "\\" + moduble + "\\" + requestPath + "\\" + "view\\";
		File gf = new File(fileName);
		if (!gf.exists()) {
			gf.mkdirs();
		}
		FileWriter fosgrid = new FileWriter(new File(gf + "\\"
				+ clazz.getSimpleName() + "Grid.js"));
		data.put("gridfields", getGridColunm(clazz));
		getTemplate("Grid.ftl").process(data, fosgrid);
		fosgrid.close();

		// //////////////////////////////////from/////////////////////////////////////////////////
		fileName = PATH + "\\" + moduble + "\\" + requestPath + "\\" + "view\\";
		File ff = new File(fileName);
		if (!ff.exists()) {
			ff.mkdirs();
		}
		FileWriter fosfrom = new FileWriter(new File(ff + "\\"
				+ clazz.getSimpleName() + "Form.js"));
		data.put("formFields", getFormField(clazz));
		getTemplate("Form.ftl").process(data, fosfrom);
		fosfrom.close();

	}

	public static List<GridFieldModel> getGridColunm(
			Class<? extends Model> calzz) throws InstantiationException,
			IllegalAccessException {
		List<Field> listfield = calzz.newInstance().fielsColection(
				new ArrayList<Field>());
		List<GridFieldModel> list = new ArrayList<>();
		for (Field f : listfield) {
			String fieldType = "string";
			String type = f.getType().toString()
					.substring(f.getType().toString().lastIndexOf(".") + 1);
			String columnType = "";
			String dbCod = "";
			boolean isDD = false;
			if (f.isAnnotationPresent(FieldInfo.class)) {
				FieldInfo fieldInfo = f.getAnnotation(FieldInfo.class);
				boolean nullable=fieldInfo.nullAble();
				if (fieldInfo.visible()) {
					GridFieldModel gm = new GridFieldModel();
					gm.setAllowBlank(nullable);
					fieldType = fieldInfo.type().getName();
					if (fieldType.equals("double")) {
						fieldType = ExtFieldType.FLOAT.getName();
						columnType = "numberfield";
					} else if (fieldType.equals("long")) {
						fieldType = ExtFieldType.INTEGER.getName();
						columnType = "numberfield";
					} else if (fieldType.equals("bigdecimal")) {
						fieldType = ExtFieldType.INTEGER.getName();
						columnType = "numberfield";
					} else if (fieldType.equals("timestamp")) {
						fieldType = ExtFieldType.STRING.getName();
						columnType = "textfield";
					} else if (fieldType.equals("date")) {
						fieldType = ExtFieldType.STRING.getName();
						columnType = "datetimefield";
					} else if (fieldType.equals("int")) {
						fieldType = ExtFieldType.INTEGER.getName();
						columnType = "numberfield";
					} else if (fieldType.equals("string")) {
						fieldType = ExtFieldType.STRING.getName();
						columnType = "textfield";
					} else if (fieldType.equals("float")) {
						fieldType = ExtFieldType.FLOAT.getName();
						columnType = "numberfield";
					}

					if (f.isAnnotationPresent(Dictionary.class)) {
						isDD = true;
						columnType = "basecombobox";
						dbCod = f.getAnnotation(Dictionary.class).value();
					}
					
					gm.setIndex(fieldInfo.index());
					gm.setColumnType(columnType);
					gm.setType(type);
					gm.setDataIndex(f.getName());
					gm.setText(fieldInfo.name());
					gm.setDD(isDD);
					gm.setDbCode(dbCod);
					gm.setWidth(fieldInfo.width());
					list.add(gm);
				}
			}
		}
		return list;
	}

	public static List <FormField> getFormField(
			Class<? extends Model> clazz) throws Exception {
		List< FormField> listFileld = new ArrayList<>();
		List<Field> list = clazz.newInstance().fielsColection(
				new ArrayList<Field>());
		for (Field f : list) {
			String fieldType = "string";
			String type = f.getType().toString()
					.substring(f.getType().toString().lastIndexOf(".") + 1);
			String xtype = "textfield";
			String dbCod = "";
			boolean isDD = false;
			if (f.isAnnotationPresent(FieldInfo.class)) {
				FieldInfo fieldInfo = f.getAnnotation(FieldInfo.class);
				FormField ff = new FormField();
				fieldType = fieldInfo.type().getName();
				if (fieldType.equals("ID")) {
					continue;
				} else if (fieldType.equals("double")) {
					fieldType = ExtFieldType.FLOAT.getName();
					xtype = "numberfield";
				} else if (fieldType.equals("long")) {
					fieldType = ExtFieldType.INTEGER.getName();
					xtype = "numberfield";
				} else if (fieldType.equals("bigdecimal")) {
					fieldType = ExtFieldType.INTEGER.getName();
					xtype = "numberfield";
				} else if (fieldType.equals("timestamp")) {
					fieldType = ExtFieldType.STRING.getName();
					xtype = "textfield";
				} else if (fieldType.equals("date")) {
					fieldType = ExtFieldType.STRING.getName();
					xtype = "datetimefield";
				} else if (fieldType.equals("int")) {
					fieldType = ExtFieldType.INTEGER.getName();
					xtype = "numberfield";
				} else if (fieldType.equals("string")) {
					fieldType = ExtFieldType.STRING.getName();
					xtype = "textfield";
				} else if (fieldType.equals("float")) {
					fieldType = ExtFieldType.FLOAT.getName();
					xtype = "numberfield";
				}

				if (f.isAnnotationPresent(Dictionary.class)) {
					isDD = true;
					xtype = "basecombobox";
					dbCod = f.getAnnotation(Dictionary.class).value();
					ff.setDd(isDD);
					ff.setDbCode(dbCod);
				}
				ff.setFieldLabel(fieldInfo.name());
				ff.setAllowBlank(fieldInfo.nullAble());
				ff.setBeforeLabelTextTpl(fieldInfo.regexType());
				ff.setAllowBlank(fieldInfo.nullAble());
				ff.setName(f.getName());
				ff.setXtype(xtype);
				ff.setType(type);
				ff.setIndex(fieldInfo.index());
				listFileld.add(ff);
			}
		}
		return listFileld;
	}

	public static List<QueryFieldMdoel> getQueryField(
			Class<? extends Model> clazz) throws Exception {
		List<QueryFieldMdoel> list = new ArrayList<>();
		List<Field> fields = clazz.newInstance().fielsColection(
				new ArrayList<Field>());
		for (Field f : fields) {
			if (f.isAnnotationPresent(SearchProperty.class)
					&& f.isAnnotationPresent(FieldInfo.class)) {
				QueryFieldMdoel qf = new QueryFieldMdoel();
				SearchProperty sp = f.getAnnotation(SearchProperty.class);
				FieldInfo fieldInfo = f.getAnnotation(FieldInfo.class);
				String dbCode = sp.value();
				int index = sp.index();
				String fieldType = fieldInfo.type().getName();
				String queryType = null;
				boolean isDate = false;
				boolean isDb = false;
				if (fieldType.equals("ID")) {
					continue;
				} else if (fieldType.equals("double")) {
					fieldType = ExtFieldType.FLOAT.getName();
					queryType = "numberfield";
				} else if (fieldType.equals("long")) {
					fieldType = ExtFieldType.INTEGER.getName();
					queryType = "numberfield";
				} else if (fieldType.equals("bigdecimal")) {
					fieldType = ExtFieldType.INTEGER.getName();
					queryType = "numberfield";
				} else if (fieldType.equals("timestamp")) {
					fieldType = ExtFieldType.STRING.getName();
					queryType = "textfield";
				} else if (fieldType.equals("date")) {
					fieldType = ExtFieldType.STRING.getName();
					queryType = "datetimefield";
					isDate = true;
				} else if (fieldType.equals("int")) {
					fieldType = ExtFieldType.INTEGER.getName();
					queryType = "numberfield";
				} else if (fieldType.equals("string")) {
					fieldType = ExtFieldType.STRING.getName();
					queryType = "textfield";
				} else if (fieldType.equals("float")) {
					fieldType = ExtFieldType.FLOAT.getName();
					queryType = "numberfield";
				}
				if (StringUtil.isNotEmpty(dbCode)) {
					isDb = true;
					queryType = "basecombobox";
				}
				qf.setDate(isDate);
				qf.setDd(isDb);
				qf.setDdCode(dbCode);
				qf.setFieldLabel(fieldInfo.name());
				qf.setIndex(index);
				qf.setName(f.getName());
				qf.setQueryType(queryType);
				list.add(qf);
			}
		}
		return list;

	}

	public static Template getTemplate(String tplName) {
		Configuration cfg = new Configuration();
		cfg.setClassForTemplateLoading(ViewModelGenerator.class,
				"/com/generator/ftl");
		Template template = null;
		try {
			template = cfg.getTemplate(tplName);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return template;
	}

	public static void createCode(Class<? extends BaseEntity> clazz,String moduble,String requestPath,String basePK,boolean query) throws Exception
	{
		createPOJO(clazz,moduble,requestPath,basePK);
		createExjrequestPathvc(moduble, requestPath, clazz,query);
	}
	
	
	public static void createPO(Class<? extends Model> clazz) throws Exception{
		List< PhoneField> listFileld = new ArrayList<>();
		List<Field> list = clazz.newInstance().fielsColection(
				new ArrayList<Field>());
		  PhoneField phoneFields=null;
		for (Field f : list) {
			String type = f.getType().toString()
					.substring(f.getType().toString().lastIndexOf(".") + 1);
				if ( f.isAnnotationPresent(FieldInfo.class)) {
					FieldInfo fieldInfo = f.getAnnotation(FieldInfo.class);
					  boolean isPo=fieldInfo.mobileField();
					  if(isPo){
						   String name=f.getName();
						    String des=fieldInfo.name();
						    phoneFields=new PhoneField();
						    phoneFields.setType(type);
						    phoneFields.setName(name);
						    phoneFields.setRemark(des);
						    listFileld.add(phoneFields);
					  }
			}
		}
		String fileName = PATH + "\\" + "pro"  + "\\";
		File ff = new File(fileName);
		if (!ff.exists()) {
			ff.mkdirs();
		}
		FileWriter fosfrom = new FileWriter(new File(ff + "\\"
				+ clazz.getSimpleName() + "Po.java"));
		Map<String, Object> data = new HashMap<>();
		data.put("bk", "");
		data.put("className", clazz.getSimpleName());
		data.put("pros", listFileld);
		data.put("pkName", ModelUtil.getClassPkName(clazz));
		data.put("basePk", "org.yingqu.baoli.model.po");
		data.put("formFields", phoneFields);
		getTemplate("PO.ftl").process(data, fosfrom);
		fosfrom.close();
	}
	
	
	
	
	

	public static void main(String[] args) throws Exception,
			IllegalAccessException {
		//createCode(AreaInfo.class,MODUBLE,"area",BASEPK,true);
		//createCode(DriverInfo.class,MODUBLE,"driver",BASEPK,true);
	    //createCode(LineInfo.class,MODUBLE,"line",BASEPK,true);
	   // createCode(ProductInfo.class,MODUBLE,"product",BASEPK,true);
	    //createCode(SalesmanInfo.class,MODUBLE,"salesman",BASEPK,true);
	    //createCode(TerminalInfo.class,MODUBLE,"terminal",BASEPK,true);
	    //createCode(WareHouse.class,MODUBLE , "wareHouse",BASEPK,true);
	    
	    
	  //  createCode(ChannelActivity.class,MODUBLE,"channelActivity",BASEPK,false);
	    //createCode(ChannelActivityItem.class,MODUBLE,"channelActivityItem",BASEPK,false);
	   // createCode(CostAlcohol.class,MODUBLE ,m "costAlcohol",BASEPK,false);
	    //createCode(OherActivity.class,MODUBLE , "oherActivity",BASEPK,false);
		// createCode(Approval.class,MODUBLE , "approval",BASEPK,true);
	      //createCode(ApprovalItem.class,MODUBLE , "approvalItem",BASEPK,false);
/*		
		  createCode(PayContent.class,MODUBLE , "payContent",BASEPK,true);
	      createCode(PayItem.class,MODUBLE , "payItem",BASEPK,false);
	      
	      createCode(Income.class,MODUBLE , "income",BASEPK,true);
	      createCode(IncomeItem.class,MODUBLE , "incomeItem",BASEPK,false);*/
         //createCode(PayType.class,MODUBLE , "payIType",BASEPK,false);
	      //createCode(IncomeType.class,MODUBLE , "incomeType",BASEPK,true);
		
	/*	createCode(PurchaseContent.class,MODUBLE , "purchase",BASEPK,true);
		createCode(PurchaseItem.class,MODUBLE , "purchaseItem",BASEPK,false);
		createCode(StoreCheck.class,MODUBLE , "storeCheck",BASEPK,true);
		createCode(OhertStore.class,MODUBLE , "ohertStore",BASEPK,false);*/
		
	/*	createCode(Outbound.class,MODUBLE , "out",BASEPK,true);
		createCode(OutBoundItem.class,MODUBLE , "outitem",BASEPK,false);*/
		
		
	/*	createCode(BackReceipt.class,MODUBLE , "back",BASEPK,true);
		createCode(BackOWine.class,MODUBLE , "backow",BASEPK,false);
		createCode(BackCover.class,MODUBLE , "backcover",BASEPK,false);
		createCode(BackBobbx.class,MODUBLE , "backbbox",BASEPK,false);
		createCode(AverageWine.class,MODUBLE , "backw",BASEPK,false);*/
		
	/*	createCode(SaleContent.class,MODUBLE , "saled",BASEPK,true);
		createCode(SaleChnageOCover.class,MODUBLE , "saledcoc",BASEPK,false);
		createCode(SaleCoverOther.class,MODUBLE , "saledco",BASEPK,false);
		createCode(SaleCoverWine.class,MODUBLE , "saledcw",BASEPK,false);
		createCode(SaleGiftActibity.class,MODUBLE , "saledga",BASEPK,false);
		createCode(SaleOtherWine.class,MODUBLE , "saledow",BASEPK,false);
		createCode(AverageSale.class,MODUBLE , "saledsw",BASEPK,false);
		 createCode(CostAlcohol.class,"gift","costAlcohol","org.yingqu.gift",false);
		 createCode(CostAlcoholItem.class,"gift","cosAlcoholItem","org.yingqu.gift",false);
		*/
		// createCode(DebtInfo.class,"debt","debt","org.yingqu.debt",true);
		//createCode(AlsoParagraph.class,"debt","alpg","org.yingqu.debt",false);
		
		
		
		// createCode(Department.class,"bl","rbacDept","org.yingqu.desktop.model",true);
		 //createCode(DeptImageUrl.class,"bl","deptimg","org.yingqu.baoli",false);
		// createCode(Advertisement.class,"bl","adt","org.yingqu.baoli",true);
		 //createCode(AvvertiseImageUrl.class,"bl","adt","org.yingqu.baoli",true);
		
	/*	 createCode(Feedback.class,"bl","fbd","org.yingqu.baoli",true);*/
		// createCode(AppVersion.class,"bl","av","org.yingqu.baoli",true);
		//createPO(AppUser.class); 
		//createCode(AppClassify.class,"bl","ac","org.yingqu.baoli",true);
		//createCode(AppClassifyItem.class,"bl","ac","org.yingqu.baoli",true);
		//createCode(Merchant.class,"bl","mc","org.yingqu.baoli",true);
		//createCode(Merchant.class,"bl","mc","org.yingqu.baoli",true);
		//createPO(Merchant.class); 
		//createCode(Goods.class,"bl","gd","org.yingqu.baoli",true);
		//createCode(GoodImage.class,"bl","gd","org.yingqu.baoli",false);
		//createPO(UserAdress.class); 
		//createCode(OrderContent.class,"bl","order","org.yingqu.baoli",true);
		
		//createCode(OrderItem.class,"bl","order","org.yingqu.baoli",false);
		//createCode(VirtualIcon.class,"bl","vi","org.yingqu.baoli",false);
		//createCode(AppNews.class,"bl","news","org.yingqu.baoli",true);
		
		/*createCode(UserCollection.class,"bl","uc","org.yingqu.baoli",false);*/
		
		//createCode(Village.class,"bl","vil","org.yingqu.baoli",false);
		//createCode(Photograph.class,"bl","incimg","org.yingqu.baoli",false);
		//createCode(OfficialIteract.class,"bl","offinc","org.yingqu.baoli",true);
		//createCode(OfficialPhotograph.class,"bl","offincimg","org.yingqu.baoli",false);
		//createCode(Massage.class,"bl","mesg","org.yingqu.baoli",false);
	/*	createCode(Rental.class,"bl","ren","org.yingqu.baoli",true);
		createCode(RentalImg.class,"bl","renimg","org.yingqu.baoli",false);
		createCode(SellOfer.class,"bl","sell","org.yingqu.baoli",true);
		createCode(SellOferImg.class,"bl","sellimg","org.yingqu.baoli",false);*/
		//createCode(EndUser.class, "bl", "sysuser", "org.yingqu.baoli", false);
		//createCode(OrderView.class, "bl", "order", "org.yingqu.baoli", true);
		createCode(PropertyCompany.class, "base", "101", "com.property.base", true);
	}
	

}
