package com.ufo.framework.system.repertory;

import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.log4j.Logger;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.ufo.framework.common.core.utils.EntityUtil;
import com.ufo.framework.common.core.utils.ModelUtil;
import com.ufo.framework.common.core.utils.StringUtil;
import com.ufo.framework.common.log.AppLoggerFactory;
import com.ufo.framework.common.model.Model;
import com.ufo.framework.system.irepertory.ISimpleRepertory;
public abstract class SimpleRepertoryHibernateImpl<M extends Model> implements ISimpleRepertory<M> {
	protected final Class<? extends Model>  clazz;
	@Autowired
	private SessionFactory sf;
	public SessionFactory getSf() {
		return sf;
	}
	public void setSf(SessionFactory sf) {
		this.sf = sf;
	}
	private static Logger logger;

	protected SimpleRepertoryHibernateImpl(Class<? extends Model> clazz)
	{
		this.clazz=clazz;
		logger=AppLoggerFactory.getyingquLogger(clazz);
		logger.info(clazz.getSimpleName()+"Dao"+"create success");
	}

	public Object findById(Class<?> clazz,String id)  throws Exception {

		return (Object) sf.getCurrentSession().get(clazz.getName(), id);
	}
	public List<?> findAll(Class<?> clazz)  throws Exception{
		List<?> list=null;
				list=sf.getCurrentSession().createQuery("from "+clazz.getName()).list();
		return list;
	}
	//修改count
	public Integer getCount(String hql)  throws Exception {
		Integer c = 0;
		Query query = sf.getCurrentSession().createQuery(hql);
		Object count = query.uniqueResult();
		if(null != count && StringUtil.isInteger(count.toString())) {
			c = Integer.parseInt(count.toString());
		}else{
			c=0;
		}
		return c;
//		return sf.getCurrentSession().find("from " + clazz.getName() +" where 1=1 "+whereSql).size();
	}
	public List<?> findByPage(final Class<?> clazz,final String whereSql,final int from,final int size)  throws Exception {
		
		
	return	sf.getCurrentSession().createQuery("from " + clazz.getName()+" where 1=1 "+whereSql).setFirstResult(from).setMaxResults(size).list();
	}
	
	public void delete(Object Object)  throws Exception {
		String pkName=ModelUtil.getClassPkName(Object.getClass());
		String pkValue=(String) EntityUtil.getPropertyValue(Object,pkName);
		Object obj=sf.getCurrentSession().load(Object.getClass(), pkValue);
		sf.getCurrentSession().delete(obj);
		
	}
	@Override
	public Object getEntityByHql(String hql)  throws Exception{
		// TODO Auto-generated method stub
		List<?> datas=sf.getCurrentSession().createQuery(hql).list();
		if(datas!=null && datas.size()>0){
			if(datas.size()==1){
				return datas.get(0);
			}else{
				logger.error("获取数据大于一条");
				return null;
			}
		}else{
			return null;
		}
	}
	@Override
	public Long executeSql(String sql)  throws Exception {
		Long c = 0L;
		Query query = sf.getCurrentSession().createSQLQuery(sql);
		Object count = query.executeUpdate();
		if(null != count && StringUtil.isInteger(count.toString())) {
			c = Long.parseLong(count.toString());
		}
		return c;
	}

	@Override
	public Object save(Object entity)   throws Exception{
		// TODO Auto-generated method stub
		sf.getCurrentSession().save(entity);
		return entity;
	}
	@Override
	public Object update(Object entity)  throws Exception {
		// TODO Auto-generated method stub
		String pkName=ModelUtil.getClassPkName(entity.getClass());
		String pkValue=(String) EntityUtil.getPropertyValue(entity,pkName);
		//查询当前更新的实体
		 Object model=sf.getCurrentSession().get(entity.getClass(), pkValue);
		// EntityUtil.copyNewField(model, entity);
		 BeanUtils.copyProperties(model,entity );
		sf.getCurrentSession().update(model);
		return model;
	}
	
	
	@Override
	public List<?> queryByHql(String hql)  throws Exception{
		// TODO Auto-generated method stub
		return sf.getCurrentSession().createQuery(hql).list();
	}
	@Override
	public List<?> queryBySql(String sql)  throws Exception{
		// TODO Auto-generated method stub
		Query query = sf.getCurrentSession().createSQLQuery(sql);
		List<?> list = query.list();
		return list;
	}
	@Override
	public List<?> queryBySql(String sql, Class<?> c)  throws Exception{
		// TODO Auto-generated method stub
		SQLQuery query = sf.getCurrentSession().createSQLQuery(sql);
		query.addEntity(c);
		List<?> list = query.list();
		return list;
	}
	@Override
	public List<?> queryByHql(String hql, Integer start, Integer limit)  throws Exception{
		// TODO Auto-generated method stub
		Query query=sf.getCurrentSession().createQuery(hql);
		if(limit>0){
			query.setFirstResult(start);
			query.setMaxResults(limit);
		}
		return query.list();
	}
	@Override
	public Long executeHql(String hql)  throws Exception {
		// TODO Auto-generated method stub
	
	    int result=	sf.getCurrentSession().createSQLQuery(hql).executeUpdate();
		return  Long.parseLong(result+"");
	}
	@Override
	public Object formUpdate(Object obj)  throws Exception{
		String pkName=ModelUtil.getClassPkName(obj.getClass());
		String pkValue=(String) EntityUtil.getPropertyValue(obj, pkName);
		//查询当前更新的实体
		 Object entity=sf.getCurrentSession().get(obj.getClass(), pkValue);
		entity=EntityUtil.copyNewField(entity, obj);
		sf.getCurrentSession().update(entity);
		return entity;
	}

	public void flush()
	{
		sf.getCurrentSession().flush();
	}
	


}
