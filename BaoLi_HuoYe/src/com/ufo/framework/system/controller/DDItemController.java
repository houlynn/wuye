package com.ufo.framework.system.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.model.hibernate.system.shared.Dictionary;
import com.model.hibernate.system.shared.DictionaryItem;
import com.ufo.framework.common.constant.StringVeriable;
import com.ufo.framework.common.core.utils.ModelUtil;
import com.ufo.framework.common.core.utils.StringUtil;


@Controller("ddItemAction")
@Scope("prototype")
@RequestMapping("/coreDDeItem")
public class DDItemController  extends SimpleBaseController<DictionaryItem> {

	protected DDItemController() {
		super(DictionaryItem.class);
	}

	/**
	 * 
	 */
	@Override
	public DictionaryItem getModel(HttpServletRequest request,
			DictionaryItem model) {
		String foreignKey=request.getParameter("foreignKey");
		foreignKey=foreignKey==null?"":foreignKey;
		if(StringUtil.isNotEmpty(foreignKey)){
			Dictionary dictionary=new Dictionary();
			dictionary.setDdId(foreignKey);
			model.setDictionary(dictionary);
		}
		return model;
	}

	@Override
	public void doRemove(DictionaryItem model, HttpServletRequest request,
			HttpServletResponse response) {
		// TODO Auto-generated method stub
		String ids = request.getParameter("ids");
		this.getModel(request, model);
		try {
			if (StringUtil.isNotEmpty(ids)) {
				String[] idArray = ids.split(StringVeriable.STR_SPLIT);
				List<String> idsList=new ArrayList<>();
				for(String itemId : idArray){
					DictionaryItem dirItem= (DictionaryItem) ebi.findById(DictionaryItem.class, itemId);
					
					if(dirItem.getDictionary()!=null&& "1".equals( dirItem.getDictionary().getReadOnly()))
					{
						continue;
					}
					idsList.add(itemId);
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
						jsonBuilder.returnSuccessJson("'" + idsStrArray.length
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

	public void doUpdateList(
			@RequestParam(value="strData",required=false,defaultValue="") String strData,
			@RequestParam(value="ids",required=false) String[] ids,
			HttpServletRequest request,
			HttpServletResponse response) {
		// TODO Auto-generated method stub
		try {
			String[] updateSqls = jsonBuilder.jsonSqlToString(strData);
			List<String> updates=new ArrayList<>();
			for(String up:updateSqls)
			{
				String itemId= up.substring(up.lastIndexOf("itemId"), up.length());
				itemId=itemId.replace("itemId='", "").replace("'", "");
				DictionaryItem dirItem= (DictionaryItem) ebi.findById(DictionaryItem.class, itemId);
		
				if(dirItem.getDictionary()!=null&& "1".equals( dirItem.getDictionary().getReadOnly()))
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

}
