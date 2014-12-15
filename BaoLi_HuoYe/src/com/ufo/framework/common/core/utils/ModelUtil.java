package com.ufo.framework.common.core.utils;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ufo.framework.annotation.FieldInfo;
import com.ufo.framework.annotation.NodeType;
import com.ufo.framework.common.core.ext.TreeNodeType;
import com.ufo.framework.common.core.ext.model.JSONTreeNode;

/**
 *  实体的工具类
* @author 作者 yingqu: 
* @version 创建时间：2014年6月7日 下午9:30:08 
* version 1.0
 */
public class ModelUtil {
	public static Map<String,Field[]> modelFields=new HashMap<String,Field[]>();
	public static Map<String,String> modelJson=new HashMap<String,String>();
	/**
	 * 判断实体不为空
	 * @param obj
	 * @return
	 */
	public static Boolean isNotNull(Object obj){
		if(obj!=null){
			return true;
		}else{
			return false;
		}
	}
	/**
	 * 得到类的属性集合
	 * @param c
	 * @param itself  是否是自身的字段
	 * @return
	 */
	public static Field[] getClassFields(Class<?> c, boolean itself){
		if(itself){
			if(modelFields.get(c.getName())!=null){
				return modelFields.get(c.getName());
			}else{
				Field[] fields=c.getDeclaredFields();
				modelFields.put(c.getName(), fields);
				return fields;
			}
		}else{
			if(modelFields.get(c.getName())!=null){
				return modelFields.get(c.getName());
			}else{
				List<Field> fields=new ArrayList<Field>();
				getAllDeclaredFields(c, fields);
				Field[] fies=new Field[fields.size()];
				fields.toArray(fies);
				modelFields.put(c.getName(), fies);
				return fies;
			}
		}
	}
	/**
	 * 从c类中取得全部字段,包括父类
	 * @param c
	 * @param fields
	 */
	public static void getAllDeclaredFields(Class<?> c, List<Field> fields){
		Field[] fies=c.getDeclaredFields();
		Collections.addAll(fields, fies);
		Class<?> parent=c.getSuperclass();
		if(parent!=Object.class){
			getAllDeclaredFields(parent, fields);
		}else{
			return;
		}
	}
	public static String getClassPkName(Class<?> clazz){
		Field[] fields=getClassFields(clazz,false);
		String pkName="";
		for(Field f:fields){
			FieldInfo fieldInfo=f.getAnnotation(FieldInfo.class);
			if(fieldInfo!=null){
				if(fieldInfo.type().getName().equals("ID")){
					pkName=f.getName();
					break;
				}
			}
		
		}
		return pkName;
	}
	/**
	 * 得到树形字段的模版类
	 * @param c
	 * @return
	 */
	public static JSONTreeNode getJSONTreeNodeTemplate(Class<?> c){
		Field[] fields=getClassFields(c, false);
		JSONTreeNode template=new JSONTreeNode();
		for(Field f:fields){
			NodeType nodeType=f.getAnnotation(NodeType.class);
			if(nodeType==null){
				continue;
			}
			if(TreeNodeType.ID.equalsType(nodeType.type())){
				template.setId(f.getName());
			}
			if(TreeNodeType.TEXT.equalsType(nodeType.type())){
				template.setText(f.getName());
			}
			if(TreeNodeType.CODE.equalsType(nodeType.type())){
				template.setCode(f.getName());
			}
			if(TreeNodeType.ICON.equals(nodeType.type())) {
				template.setIcon(f.getName());
			}
			if(TreeNodeType.NODEINFO.equals(nodeType.type())) {
				template.setNodeInfo(f.getName());
			}
			if(TreeNodeType.NODEINFOTYPE.equals(nodeType.type())) {
				template.setNodeInfoType(f.getName());
			}
			if(TreeNodeType.CLS.equals(nodeType.type())) {
				template.setCls(f.getName());
			}
			if(TreeNodeType.LEAF.equals(nodeType.type())) {
				// 根据NODETYPE
				template.setNodeType(f.getName());
			}
			if(TreeNodeType.PARENT.equals(nodeType.type())) {
				template.setParent(f.getName());
			}
			if(TreeNodeType.DISABLED.equals(nodeType.type())) {
				template.setHref(f.getName());
			}
			if(TreeNodeType.BIGICON.equals(nodeType.type())) {
				template.setBigIcon(f.getName());
			}
		}
		return template;
	}
}
