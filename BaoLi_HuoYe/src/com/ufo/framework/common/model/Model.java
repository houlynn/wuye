package com.ufo.framework.common.model;

import java.io.Serializable;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

import com.ufo.framework.annotation.FieldInfo;
import com.ufo.framework.system.web.SecurityUserHolder;


public interface Model  extends Serializable{
	default  void  addXcode() throws Exception{
		      BaseEntity baseEntity=(BaseEntity)this;
		      baseEntity.setXcode(SecurityUserHolder.getIdentification());
	}
	
	default List<Field> fielsColection(final Class<?> clazz,  final List<Field> list) {
		for (Field field : clazz.getDeclaredFields()) {
			list.add(field);
		}
		if (clazz.getSuperclass() != Object.class) {
			this.fielsColection(clazz.getSuperclass(), list);
		}
		return list;
	}
	default List<Field> fielsColection(final List<Field> list) {
		for (Field field : this.getClass().getDeclaredFields()) {
			list.add(field);
		}
		return list;
	}
	default String SelfreflectionAll()
	{
		StringBuffer buf = new StringBuffer();
		buf.append(this.getClass().getSimpleName() + " : ");
		String str = "";
		str += this.getClass() + " : ";
		buf.append(str);
		List<Field> list = new ArrayList<Field>();
		this.fielsColection(this.getClass(), list);
		for(Field field : list)
		{
			field.setAccessible(true);
			Object value=null;
			String fieldInfoDesc=null;
			buf.append("FieldType:("+field.getType().getSimpleName()+") ");
			if(field.getType()==this.getClass())
			{
				buf.append("  value=continue");
				continue;
			}
			if(field.isAnnotationPresent(FieldInfo.class))
			{
				FieldInfo fieldInfo=field.getAnnotation(FieldInfo.class);
				fieldInfoDesc= fieldInfo.remark();
			}
			try {
				value=field.get(this);
			} catch (IllegalArgumentException e) {
				e.printStackTrace();
			} catch (IllegalAccessException e) {
				e.printStackTrace();
			}
			buf.append(field.getName()+"[ "+fieldInfoDesc+"]" + "=" + value+" " );
		}
		return buf.toString();
	}
	default String Selfreflection()
	{
		StringBuffer buf = new StringBuffer();
		buf.append(this.getClass().getSimpleName() + " : ");
		String str = "";
		str += this.getClass() + " : ";
		buf.append(str);
		List<Field> list = new ArrayList<Field>();
		this.fielsColection( list);
		for(Field field : list)
		{
			field.setAccessible(true);
			Object value=null;
			String fieldInfoDesc=null;
			buf.append("FieldType:("+field.getType().getSimpleName()+") ");
			if(field.getType()==this.getClass())
			{
				buf.append("  value=continue");
				continue;
			}
			if(field.isAnnotationPresent(FieldInfo.class))
			{
				FieldInfo fieldInfo=field.getAnnotation(FieldInfo.class);
				fieldInfoDesc= fieldInfo.remark();
			}
			try {
				value=field.get(this);
			} catch (IllegalArgumentException e) {
				e.printStackTrace();
			} catch (IllegalAccessException e) {
				e.printStackTrace();
			}
			buf.append(field.getName()+"[ "+fieldInfoDesc+"]" + "=" + value+" " );
		}
		return buf.toString();
	}
	
	

}
