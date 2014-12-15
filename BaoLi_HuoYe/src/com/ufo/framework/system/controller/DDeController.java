package com.ufo.framework.system.controller;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.model.hibernate.system.shared.DDCache;
import com.model.hibernate.system.shared.Dictionary;
import com.model.hibernate.system.shared.DictionaryItem;
import com.ufo.framework.annotation.DDItemCode;
import com.ufo.framework.annotation.DDItemName;
import com.ufo.framework.common.constant.StringVeriable;
import com.ufo.framework.common.core.utils.EntityUtil;
import com.ufo.framework.common.core.utils.ModelUtil;
import com.ufo.framework.common.core.utils.StringUtil;
import com.ufo.framework.common.core.web.ModuleServiceFunction;
import com.ufo.framework.common.model.Model;
import com.ufo.framework.system.web.SecurityUserHolder;
/**
* version 2.0
* @author HouLynn
* @date 2014年12月4日
 */
@Controller("ddAction")
@RequestMapping("/coreDDe")
@Scope("prototype")
public class DDeController extends SimpleBaseController<Dictionary> {
	protected DDeController() {
		super(Dictionary.class);
	}

	@SuppressWarnings("unchecked")
	@RequestMapping("/getDDItemByDDCode")
	public void getDDItemByDDCode(Dictionary model, HttpServletResponse response,
			@RequestParam(value="modeuName",required=false,defaultValue="") String modeuName,
			@RequestParam(value="whereSql",required=false,defaultValue="") String whereSql,
			@RequestParam(value="marking",required=false,defaultValue="") String marking,
			@RequestParam(value="identification",required=false,defaultValue="") String identification
			
			) {
		String strData = "[]";
		try {
			
			if (StringUtil.isNotEmpty(model.getDdCode())) {
				if (DDCache.get(model.getDdCode()) != null) {
					toWrite(response, DDCache.get(model.getDdCode()));
				} else {
					// 查询数据字典项
					Dictionary dict = (Dictionary) ebi
							.getEntityByHql(" from Dictionary where ddCode='"
									+ model.getDdCode() + "' and enabled='1' ");
					if (dict != null) {
						List<DictionaryItem> items=new ArrayList<>();
						if(StringUtil.isNotEmpty(dict.getModelName())&&"OTHER".equals(dict.getDdType())){
							items=getItemByModelName(dict.getModelName(),whereSql);
						}else{
							items = (List<DictionaryItem>) ebi
								.queryByHql(" from DictionaryItem where dictionary='"
										+ dict.getDdId()
										+ "' order by orderIndex");
						}
						strData = jsonBuilder.buildObjListToJson(
								new Long(items.size()), items, false);
					}

					DDCache.push(model.getDdCode(), strData);
					toWrite(response, strData);
				}
			} else {
				
				if("1".equals(marking)){
					String hql=" where 1=1  ";
					if("1".equals(identification)){
						hql+=" and xcode='"+ SecurityUserHolder.getIdentification()+"'";
					}
					hql+=whereSql;
					Class<?> moduleClass = ModuleServiceFunction.getModuleBeanClass(modeuName);
					List<DictionaryItem> items=new ArrayList<>();
					items=getItemByModelName(moduleClass.getName(),hql);
					strData = jsonBuilder.buildObjListToJson(
							new Long(items.size()), items, false);
					
				}
				toWrite(response, strData);
			}
			
			
			
		} catch (Exception e) {

			e.printStackTrace();
			toWrite(response,jsonBuilder.returnFailureJson("'保存方法出错，错误信息"+ e.getMessage() + "'"));
		}

	}
	@Override
	public void doUpdateList(
			@RequestParam(value="strData",required=false,defaultValue="") String strData,
			@RequestParam(value="ids",required=false) String[] ids,
			HttpServletRequest request,
			HttpServletResponse response) {
		// TODO Auto-generated method stub

		strData = strData == null ? "" : strData;
		try {
			String[] updateSqls = jsonBuilder.jsonSqlToString(strData);
			List<String> updates=new ArrayList<>();
			for(String up:updateSqls)
			{
				String ddId= up.substring(up.lastIndexOf("ddId"), up.length());
				ddId=ddId.replace("ddId='", "").replace("'", "");
				Dictionary dir= (Dictionary) ebi.findById(Dictionary.class, ddId);
				if("1".equals( dir.getReadOnly()))
				{
				  continue;
					
				}
				updates.add(up);
			}
			String[] updateArray=new String[updates.size()];
			for(int i=0;i<updates.size();i++)
			{
				updateArray[i]=updates.get(i);
			}
			ebi.executeBatchHql(updateArray);
			toWrite(response,
					jsonBuilder.returnSuccessJson("'" + updateArray.length
							+ "条记录被更新'"));
		} catch (Exception e) {
			e.printStackTrace();
			error("批量更新失败，错误信息:" + e.getMessage());
			toWrite(response,
					jsonBuilder.returnFailureJson("'批量更新失败，错误信息："
							+ e.getMessage() + "'"));
		}
	}

	@Override
	public void doRemove(Dictionary model, HttpServletRequest request,
			HttpServletResponse response) {
		// TODO Auto-generated method stub
		String ids = request.getParameter("ids");
		this.getModel(request, model);
		try {
			if (StringUtil.isNotEmpty(ids)) {
				String[] idArray = ids.split(StringVeriable.STR_SPLIT);
				List<String> idsList=new ArrayList<>();
				for(String ddid : idArray){
					Dictionary dd= (Dictionary) ebi.findById(Dictionary.class, ddid);
					
					if(dd!=null&& "1".equals( dd.getReadOnly()))
					{
						continue;
					}
					idsList.add(ddid);
				}
				String[] idsStrArray=new String[idsList.size()];
				for(int i=0;i<idsList.size();i++)
				{
					idsStrArray[i]=idsList.get(i);
				}
				String idsStr = StringUtil.fromArrayToStr(idsStrArray);
				if(StringUtil.isEmpty(idsStr)){
					toWrite(response,
							jsonBuilder.returnSuccessJson("'0" + "条记录被删除'"));
					return;
				}
				String pkName = request.getParameter("pkName");
				pkName = pkName == null ? "" : pkName;
				if (StringUtil.isEmpty(pkName)) {
					pkName = ModelUtil.getClassPkName(model.getClass());
				}
				if (StringUtil.isEmpty(pkName)) {
					toWrite(response,
							jsonBuilder.returnFailureJson("'得到类主键名失败'"));
					return;
				}
				
				ebi.deleteBatchById(model.getClass(), pkName, idsStr);
				toWrite(response,
						jsonBuilder.returnSuccessJson("'" + idArray.length
								+ "条记录被删除'"));
			} else {
				toWrite(response, jsonBuilder.returnFailureJson("'传入ids为空'"));
			}
		} catch (Exception e) {
			e.printStackTrace();

			Arrays.asList(e.getStackTrace()).forEach(
					item -> System.out.println(item));
			error("删除失败，失败信息:" + e.getMessage());
			toWrite(response,
					jsonBuilder.returnFailureJson("'删除失败，失败信息:"
							+ e.getMessage() + "'"));
		}
		
	}

	@Override
	public void doUpdate(Dictionary model, HttpServletRequest request,
			HttpServletResponse response) {
		// TODO Auto-generated method stub
		if(StringUtil.isNotEmpty(model.getDdId())){
			if("1".equals(model.getReadOnly()))
			{
				toWrite(response, jsonBuilder.returnFailureJson("'该字典设定为只读无法进行更新操作！'"));
				return;
			}
			
		}
		super.doUpdate(model, request, response);
	}

	@RequestMapping("/clearAll")
	public void clearAll(HttpServletResponse response) {
		DDCache.clearAll();
		toWrite(response, jsonBuilder.returnSuccessJson("'缓存已清理'"));
	}

	 @SuppressWarnings({ "unchecked"})
	private List<DictionaryItem> getItemByModelName(String modelName,String wherSql) throws Exception
	{
		List<DictionaryItem> items=new ArrayList<>();
		Class<? extends Model> clazz= (Class<? extends Model>) Class.forName(modelName);
		 List<Field> listFields=clazz.newInstance().fielsColection(new ArrayList<Field>());
		 DictionaryItem item=null;
		 
		 List<?> list=ebi.queryByHql(" from "+clazz.getSimpleName()+" "+wherSql);
		 System.out.println("获取到：："+modelName+list.size());
		 Field codeField =listFields.parallelStream().filter(o->o.isAnnotationPresent(DDItemCode.class)).collect(Collectors.toList()).get(0);
		 listFields.remove(codeField);
		 listFields=listFields.parallelStream().filter(o->o.isAnnotationPresent(DDItemName.class)).collect(Collectors.toList());
		 for(Object o : list)
		 {
			item=new DictionaryItem();
			String fieldName=codeField.getName();
			String itemCode=EntityUtil.getPropertyValue(o,fieldName)+"";
			item.setItemCode(itemCode);
			String itemName="";
			for(Field f : listFields){
				if(listFields.size()==1){
					itemName=(String) EntityUtil.getPropertyValue(o,f.getName());
				}else{
				 itemName+=(String) EntityUtil.getPropertyValue(o,f.getName())+"  ";
				}
			}
			item.setItemName(itemName);
			items.add(item);
			item=null;
		 }
		 return items;
		 
	}
	
	
	@Override
	public Dictionary getModel(HttpServletRequest request, Dictionary model) {
		
		// TODO Auto-generated method stub
		return model;
	}

}
