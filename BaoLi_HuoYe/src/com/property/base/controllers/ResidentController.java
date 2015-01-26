package com.property.base.controllers;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.Writer;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Transient;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.model.hibernate.property.FeesTypeItem;
import com.model.hibernate.property.LevelInfo;
import com.model.hibernate.property.ResidentInfo;
import com.model.hibernate.property.Village;
import com.property.base.ebi.ResidentEbi;
import com.ufo.framework.annotation.FieldInfo;
import com.ufo.framework.common.constant.RequestPathConstants;
import com.ufo.framework.common.core.exception.DeleteException;
import com.ufo.framework.common.core.exception.InsertException;
import com.ufo.framework.common.core.exception.ResponseErrorInfo;
import com.ufo.framework.common.core.ext.model.JSONTreeNode;
import com.ufo.framework.common.core.properties.PropUtil;
import com.ufo.framework.common.core.utils.AppUtils;
import com.ufo.framework.common.core.utils.JsonBuilder;
import com.ufo.framework.common.core.utils.ModelUtil;
import com.ufo.framework.common.core.utils.StringUtil;
import com.ufo.framework.common.core.web.ModuleServiceFunction;
import com.ufo.framework.common.log.LogerManager;
import com.ufo.framework.system.ebi.CommonException;
import com.ufo.framework.system.ebi.Ebi;
import com.ufo.framework.system.ebi.ModelEbi;
import com.ufo.framework.system.irepertory.IModelRepertory;
import com.ufo.framework.system.shared.module.DataDeleteResponseInfo;
import com.ufo.framework.system.shared.module.DataInsertResponseInfo;
@Controller
@RequestMapping("/102")
public class ResidentController    implements LogerManager,CommonException {
	
	protected static JsonBuilder jsonBuilder;
	@Resource(name="ebo")
	private Ebi ebi;

	public Ebi getEbi() {
		return ebi;
	}

	public void setEbi(Ebi ebi) {
		this.ebi = ebi;
	}
	@Autowired
	private ResidentEbi  rebi;
	public ResidentEbi getRebi() {
		return rebi;
	}

	public void setRebi(ResidentEbi rebi) {
		this.rebi = rebi;
	}
	@Resource
	private IModelRepertory moduleDAO;
	@Resource
	private ModelEbi moduleService;
	
	
	public ModelEbi getModuleService() {
		return moduleService;
	}

	public void setModuleService(ModelEbi moduleService) {
		this.moduleService = moduleService;
	}

	static {
		jsonBuilder = JsonBuilder.getInstance();
	}
	@RequestMapping(RequestPathConstants.REQUEST_LOADPATH)
	public @ResponseBody List<JSONTreeNode>  getTree(HttpServletRequest request,HttpServletResponse response,
			@RequestParam(value="vid",required=true) int vid,
			@RequestParam(value="orderSql",required=false,defaultValue=" order by tf_leveId DESC") String orderSql
			){
		List<JSONTreeNode> lists=new ArrayList<JSONTreeNode>();
		try
		{
		List<LevelInfo> leves=(List<LevelInfo>) ebi.queryByHql(" from LevelInfo where 1=1   and  tf_parent=null  and tf_village="+vid+ orderSql);
		for(LevelInfo l:leves){
			JSONTreeNode node=new JSONTreeNode();
			node.setId(l.getTf_leveId()+"");
			node.setText(l.getTf_leveName());
			node.setCode(l.getTf_leveId()+"");
			node.setNodeInfo("LevelInfo");
			node.setCls("tree_set_perm");
			node.setIcon(l.getIcon());
			node.setDescription("tf_leveName");
			node.setExpanded(true);
			node.setLeaf(false);
			node.setNodeInfoType("0");
			if(l.getTf_childs()!=null&&l.getTf_childs().size()>0){
				List<JSONTreeNode> childrens=new ArrayList<>();
				for(LevelInfo childleve :l.getTf_childs() ){
					JSONTreeNode childNode=new JSONTreeNode();
					childNode.setId(childleve.getTf_leveId()+"");
					childNode.setText(childleve.getTf_leveName());
					childNode.setCode(childleve.getTf_leveId()+"");
					childNode.setNodeInfo("LevelInfo");
					childNode.setLeaf(true);
					childNode.setIcon(PropUtil.get("sys.leve.LevelInfoChild"));
					childNode.setDescription("tf_leveName");
					childNode.setNodeInfoType("1");
					childrens.add(childNode);
					childNode=null;
				}
				node.setChildren(childrens);
			}
			lists.add(node);
		}
		}catch(Exception e){
			e.printStackTrace();
		}
		return lists;
	}
	
	@RequestMapping(RequestPathConstants.REQUEST_INSERTPATH)
	public @ResponseBody DataInsertResponseInfo add(@RequestParam(value="vid",required=true) int vid,@RequestParam(value="leveName",required=true) String leveName ,
			@RequestParam(value="level",required=true) String level,
			@RequestParam(value="parent",required=false) String parent
			
			) throws Exception{
		DataInsertResponseInfo result =new DataInsertResponseInfo();
				 LevelInfo info=new LevelInfo();
				 Village village=new Village();
				 village.setTf_viid(vid);
				 info.setTf_village(village);
				 info.setTf_leveName(leveName);
				 info.setTf_level(level);
				 if("1".equals(level)){
					 LevelInfo levelInfo=new LevelInfo();
					 levelInfo.setTf_leveId(Integer.parseInt(parent));
					 info.setTf_parent(levelInfo);
				 }else{
					 info.setTf_parent(null);
				 }
				 try {
					ebi.save(info);
				} catch (Exception e) {
					error("添加异常", e);
					// TODO Auto-generated catch block
					getInsertException("LevelInfo","添加楼宇失败!",ResponseErrorInfo.STATUS_FAILURE);
				}
		return result;
	}
	@RequestMapping(RequestPathConstants.REQUEST_DELETEPATH)
  	public @ResponseBody  DataDeleteResponseInfo remove(
  			@RequestParam(value="tf_leveId",required=true) int tf_leveId
  			) throws Exception {
		     DataDeleteResponseInfo result=new DataDeleteResponseInfo();
					try {
						
						ebi.removeById(tf_leveId, LevelInfo.class);
					} 
					catch (DataIntegrityViolationException e) {
						getDeleteException("LevelInfo", "请检查与本记录相关联的其他数据是否全部清空！", ResponseErrorInfo.STATUS_FAILURE, e);
						error("删除异常", e);
					} 
					catch (DataAccessException e) {
						String errormessage = ModuleServiceFunction.addPK_ConstraintMessage(e, "LevelInfo");
						getDeleteException("LevelInfo",  errormessage != null ? errormessage
								: "请检查与本记录相关联的其他数据是否全部清空！<br/>", ResponseErrorInfo.STATUS_FAILURE, e);
					} catch (Exception e) {
						error("删除异常", e);
						// TODO Auto-generated catch block
						getDeleteException("LevelInfo", " 删除楼宇失败!", ResponseErrorInfo.STATUS_FAILURE, e);
					}
					return result;
			 }
	
	
	
	@RequestMapping(value = "/remove.do/{id}", method = RequestMethod.DELETE)
  	public @ResponseBody  DataDeleteResponseInfo remove(String moduleName, @PathVariable("id") String id,HttpServletRequest request) throws Exception {
		     DataDeleteResponseInfo result=new DataDeleteResponseInfo();
					try {
						
						ebi.removeById(Integer.valueOf(id), ResidentInfo.class);
					} 
					catch (DataIntegrityViolationException e) {
						getDeleteException("LevelInfo", "请检查与本记录相关联的其他数据是否全部清空！", ResponseErrorInfo.STATUS_FAILURE, e);
						error("删除异常", e);
					} 
					catch (DataAccessException e) {
						String errormessage = ModuleServiceFunction.addPK_ConstraintMessage(e, "LevelInfo");
						getDeleteException("LevelInfo",  errormessage != null ? errormessage
								: "请检查与本记录相关联的其他数据是否全部清空！<br/>", ResponseErrorInfo.STATUS_FAILURE, e);
					} catch (Exception e) {
						error("删除异常", e);
						// TODO Auto-generated catch block
						getDeleteException("LevelInfo", " 删除业主失败!", ResponseErrorInfo.STATUS_FAILURE, e);
					}
					return result;
			 }
	
	
	
	
	
	@RequestMapping("/setting")
	public @ResponseBody DataInsertResponseInfo setting(
			@RequestParam(value="dataStr",required=true) String dataStr,
			@RequestParam(value="ids",required=true) int[] ids
			) throws Exception{
		DataInsertResponseInfo result=new DataInsertResponseInfo();
			 try {
				 rebi.updateSettingFeesItem(dataStr, ids);
				} catch (Exception e) {
					error("添加异常", e);
					// TODO Auto-generated catch block
					getInsertException("LevelInfo","设置收费项目失败!",ResponseErrorInfo.STATUS_FAILURE);
				}
		return result;
		
	}
	
	
	
	@RequestMapping(value="/import",method=RequestMethod.POST)
	public void doSave( HttpServletRequest request,
			HttpServletResponse response,
			  @RequestParam("file")  MultipartFile file,
			  @RequestParam("vid") int vid
			) throws Exception {
	         String fileName = file.getOriginalFilename();  
	        try {  
	            String tomcatPath = request.getServletContext().getRealPath("/excel/"); //得到保存的路径  
	            FileCopyUtils.copy(file.getBytes(), new File(tomcatPath +"/" +  fileName));//FileCopyUtils来自org.springframework.util.FileCopyUtils  
	            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");  
	            List<List<Object>> list=AppUtils.readExcel(new File(tomcatPath +"/" +  fileName));
	            int count =0;
	            for(Object row :list){
	            	List<Object> rowData=(List<Object>)row;
	            	System.out.println("列数： "+rowData.size());
	            	if(rowData.size()<20){
	            		continue;
	            	}
	            	String index=String.valueOf(rowData.get(0));//序号
	            	System.out.println("序号:"+index);
	            	String lev0=String.valueOf(rowData.get(1));//栋
	            	System.out.println("栋: "+lev0);
	            	String lev1=String.valueOf(rowData.get(2));//楼层
	            	System.out.println("楼层："+lev1);
	            	String reNuber=String.valueOf(rowData.get(3));//房号
	            	System.out.println("新单员:"+reNuber);
	            	if(StringUtil.isEmpty(lev0)||StringUtil.isEmpty(lev1)){
	            		continue;
	            	}
	            	  if(reNuber.contains(".")){
	            		  reNuber=reNuber.substring(0,reNuber.lastIndexOf("."));
	          	    }
	            	ResidentInfo info=this.getByResident(vid, lev0, lev1, reNuber);
	            	boolean  add=false;
	            	if(info==null){
	            		info=new ResidentInfo();
	            		add=true;
	            	}else{
	            		continue;
	            	}
	            	info.setTf_number(reNuber);
	            	
	            	info.setTf_stateOccupancy("true");
	            	
	            	/**
	            	 * 欠费状态
	            	 */
	            	info.setTf_stateFees("false");
	            	
	            	
	            	/**
	            	 * 报修状态
	            	 */
	            	info.setTf_stateRepair("false");
	            	

	            	info.setTf_rental("false");
	            	
	            	
	            	info.setTf_sell("false");
	            	
	            	LevelInfo levelInfo=getByLevf(vid, lev0,lev1);
	            	if(levelInfo==null){
	            		continue;
	            	}
	            	debug(levelInfo.getTf_parent().getTf_leveName()+"-----"+levelInfo.getTf_leveName());
	            	info.setTf_levelInfo(levelInfo);
	            	String ranme=String.valueOf(rowData.get(4));//业主姓名
	             	System.out.println("业主姓名:"+ranme);
	            	info.setTf_residentName(ranme);
	            	
	            	String appPhone=String.valueOf(rowData.get(5));//APP
	            	  if(appPhone.contains(".")){
	            		  appPhone=appPhone.substring(0,appPhone.lastIndexOf("."));
	          	    }
	            	  info.setTf_appPhone(appPhone);
	            	  System.out.println("电话1:"+ranme);
	            	  
	            	  String tf_appPhone1=String.valueOf(rowData.get(6));//APP
	            	  System.out.println("电话2:"+tf_appPhone1);
	            	  info.setTf_appPhone1(tf_appPhone1);
	            	  
	            	  String tf_appPhone2=String.valueOf(rowData.get(7));//APP
	            	  System.out.println("电话3:"+tf_appPhone2);
	            	 info.setTf_appPhone2(tf_appPhone2);
	            	  
	            	 
	            	 	String souQcare=String.valueOf(rowData.get(8));//收楼情况
		            	info.setTf_sffloorType(souQcare);
		            	if(StringUtil.isEmpty(souQcare)){
		            		info.setTf_repossession(false);
		            	}else{
		            		info.setTf_repossession(true);
		            	}
		            	  System.out.println("收楼情况:"+souQcare);
	            	
		            	String shouDate=String.valueOf(rowData.get(9));//收楼日期
			            if(StringUtil.isEmpty(shouDate)){
			            		shouDate=format.format(shouDate);
			            	}
			        	info.setTf_sdate(shouDate);
			        	  System.out.println("收楼日期:"+shouDate);
			        	String souAdvDate=String.valueOf(rowData.get(10));//收楼通知书日期
		            	if(StringUtil.isEmpty(shouDate)){
		            		shouDate=format.format(shouDate);
		            	}
		                 info.setTf_adate(souAdvDate);
		                 System.out.println("收楼通知书日期:"+souAdvDate);
		                 
		                 
		                 
		              	float arear=Float.valueOf(rowData.get(11)+"");//建筑面积
		            	   info.setTf_builArea(arear);
		            	   System.out.println("建筑面积:"+arear);
		             	float resarea=Float.valueOf(rowData.get(12)+"");//实测面积
		            	info.setTf_userArea(resarea);
		            	 System.out.println("实测面积:"+resarea);
		            	 
		            		String doWithMane=String.valueOf(rowData.get(13));//经办人
			            	info.setTf_doman(doWithMane);
			            	 System.out.println("经办人:"+doWithMane);
			            	
			            	 
			              String	 loutype=String.valueOf(rowData.get(14));//交楼类型
			              info.setTf_jfloorType(loutype);
			              System.out.println("交楼类型:"+loutype);
	            	String tf_nature=String.valueOf(rowData.get(15));//性质
	            	info.setTf_nature(tf_nature);
	            	  System.out.println("性质:"+tf_nature);
	            	  
	            	   	
		            	String soutFuce=String.valueOf(rowData.get(16));//是否已经收房产信息通知书
		            	if(StringUtil.isNotEmpty(soutFuce)){
		            		info.setTf_isposttip(true);
		            	}
		            	 System.out.println("已经收房产信息通知书:"+soutFuce);
		            	 
		            	  	String careNub=String.valueOf(rowData.get(17));//车牌号
			            	info.setTf_license(careNub);
			            	 System.out.println("车牌号:"+careNub.replace(" ", ""));
		            	
			            		String fddoc=String.valueOf(rowData.get(18));//是否装了防盗门
				            	if(StringUtil.isEmpty(fddoc)){
				            		info.setTf_isburglar(false);
				            	}else{
				            		info.setTf_isburglar(true);
				            	}
				            	    System.out.println("是否装了防盗门:"+fddoc);
					            	String remrak1=String.valueOf(rowData.get(19));//备注1家庭成员名单
					            	info.setTf_remark1(remrak1.replace(" ", ""));
					            	System.out.println("备注1家庭成员名单:"+remrak1);
					            	String remark2=String.valueOf(rowData.get(20));//备注2业主、住户联系电话
					            	info.setTf_remark2(remark2.replace(" ", ""));
					            	System.out.println("备注2业主、住户联系电话:"+remark2);
					            	String remark3=String.valueOf(rowData.get(21));//备注3业主身份证号码
					            	System.out.println("备注3业主身份证号码:"+remark3);
					            	info.setTf_remark3(remark3.replace(" ", ""));
					            	String remark4=String.valueOf(rowData.get(22));
					            	info.setTf_remark4(remark4.replace(" ", ""));
					            	String remark5=String.valueOf(rowData.get(23));
					            	info.setTf_remark5(remark5.replace(" ", ""));
	            
	             if(add){
	            	 ebi.save(info);
	            	 
	             }else{
	            	 ebi.update(info);
	             }
	             count++;
	            }
	            toWrite(response, jsonBuilder.returnSuccessJson("'成功导入"+count+"记录'"));
	            
	        } catch (IOException e) {  
	            // TODO Auto-generated catch block  
	            e.printStackTrace();  
	        }  
		
		
		
	}
	
	
	public ResidentInfo getByResident(int vid, String levf,String levf1,String reNuber) throws Exception{
		String hql=" from ResidentInfo where 1=1 and tf_levelInfo.tf_leveName='"+levf1+"' and  tf_levelInfo.tf_parent.tf_village="+vid+"  and tf_levelInfo.tf_parent.tf_leveName='"+levf+"' and tf_number='"+reNuber+"'";
		List<ResidentInfo> row= (List<ResidentInfo>) ebi.queryByHql(hql);
		if(row!=null&&row.size()>0){
			return row.get(0);
		}
		return null;
	}
	
	public LevelInfo getByLevf(int vid,String levf0Name,String levf1Name) throws Exception{
		String hql=" from LevelInfo where 1=1 and tf_leveName='"+levf1Name+"' and tf_parent.tf_leveName='"+levf0Name+"'  and tf_parent.tf_village="+vid;
		List<LevelInfo> row= (List<LevelInfo>) ebi.queryByHql(hql);
		if(row!=null&&row.size()>0){
			return row.get(0);
		}
		return null;
		
		
		
	}
	
	
/*	

	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public @ResponseBody
	DataInsertResponseInfo add(String moduleName, @RequestBody String inserted,
			HttpServletRequest request) throws Exception {
		DataInsertResponseInfo result =new DataInsertResponseInfo();
		 String parentFilter=request.getParameter("parentFilter");
		 String navigates=request.getParameter("navigates");
		 _Module module=ApplicationService.getModuleWithName(moduleName);
		try {
			JSONObject updateJsonObject = JSONObject.fromObject(inserted);
			ResidentInfo record=new ResidentInfo();
			moduleDAO.updateValueToBean(moduleName, record, updateJsonObject);
			String hql="  "
			record.seTf_residentId(record.getTf_levelInfo().getTf_leveId())
			
		
			
			
			result = moduleService.add(moduleName, inserted, parentFilter,navigates, request);
			if (result.getKey() != null) // 如果是空的话，那么就没有保存，错误原因已经在errorMessage里了
				result.getRecords().add(
						moduleDAO.getModuleRecord(moduleName, result.getKey(), request).toString());
		
			
			
			
			
			
			
			
			
		} catch (DataAccessException e) {
		      error("DataAccessException异常", e);
			if (e.getRootCause().getMessage().toLowerCase().indexOf("primary") != -1){
				getInsertException(module.getTf_moduleName(),module.getTf_primaryKey() +"插入记录的主键值与数据库中原有的值重复!",ResponseErrorInfo.STATUS_VALIDATION_ERROR);
		}else{
			
			getInsertException(module.getTf_moduleName(),e.getMessage(),ResponseErrorInfo.STATUS_VALIDATION_ERROR);
		}
	}catch (Exception e) {
		error("添加异常", e);
		// TODO Auto-generated catch block
		getInsertException(moduleName,"添加业主信息失败!",ResponseErrorInfo.STATUS_FAILURE);
	}
		
		return result;
	}
	*/
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	protected void toWrite(HttpServletResponse response, String contents) {
		if (ModelUtil.isNotNull(response)) {
			response.setContentType("text/html;charset=UTF-8;");
			Writer writer = null;
			try {
				response.setCharacterEncoding("UTF-8");
				writer = response.getWriter();
				writer.write(contents);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} finally {
				try {
					writer.flush();
					writer.close();
					response.flushBuffer();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}
	
	
	

	
	
}
	
	

