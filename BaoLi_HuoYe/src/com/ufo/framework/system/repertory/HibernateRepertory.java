package com.ufo.framework.system.repertory;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import net.sf.ezmorph.object.DateMorpher;
import net.sf.json.JSONObject;
import net.sf.json.util.JSONUtils;

import org.apache.commons.beanutils.BeanUtils;
import org.hibernate.Criteria;
import org.hibernate.NonUniqueResultException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.hibernate.jdbc.Work;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ufo.framework.common.core.utils.EntityUtil;
import com.ufo.framework.common.core.utils.ModelUtil;
import com.ufo.framework.common.core.utils.StringUtil;
import com.ufo.framework.common.core.web.ModuleServiceFunction;
import com.ufo.framework.common.log.AppLoggerFactory;
import com.ufo.framework.common.model.Model;
import com.ufo.framework.system.irepertory.ICommonRepertory;
@SuppressWarnings("unchecked")
@Repository
public class HibernateRepertory implements ICommonRepertory {

	public HibernateRepertory() {
		//System.out.println("system base dao impl created");
		String[] dateFormats = new String[] { "yyyy-MM-dd" };
		JSONUtils.getMorpherRegistry().registerMorpher(new DateMorpher(dateFormats));
		//System.out.println("json tobean dataformats created");
		debug(this.getClass().getName());
	}
	@Autowired
	private SessionFactory sf;
	
	public SessionFactory getSf() {
		return sf;
	}
	public void setSf(SessionFactory sf) {
		this.sf = sf;
	}

	@Override
	public <T extends Model> T findById(Class<T> clazz, Serializable id)
			throws Exception {
		return  (T) sf.getCurrentSession().get(clazz.getName(), id);
	}
	@Override
	public <T extends Model> List<T> findAll(Class<T> clazz) throws Exception {
		List<T> list=null;
		list=sf.getCurrentSession().createQuery("from "+clazz.getName()).list();
		list=list==null?new ArrayList<>():list;
		return list;
	}
	@Override
	public <T extends Model> T getEntityByHql(Class<T> clazz, String hql)
			throws NonUniqueResultException {
		T datas=null;
		try
		{
			datas=(T) sf.getCurrentSession().createQuery(hql).uniqueResult();
		}catch(NonUniqueResultException e)
		{
			AppLoggerFactory.getyingquLogger(clazz).error("获取数据大于一条！");
			AppLoggerFactory.getyingquLogger(clazz).error(e);
			throw e ;
		}
		return datas;
	}
	@Override
	public <T extends Model> T update(T entity) throws Exception {
		// TODO Auto-generated method stub
		String pkName=ModelUtil.getClassPkName(entity.getClass());
		
		Object pkValueObject= EntityUtil.getPropertyValue(entity,pkName);
		 T model;
		if(pkValueObject instanceof Integer ){
			Integer id=Integer.parseInt(pkValueObject.toString());
			//查询当前更新的实体
			model=(T) sf.getCurrentSession().get(entity.getClass(), id);
		}else{
			String pkValue=(String) EntityUtil.getPropertyValue(entity,pkName);
			model=(T) sf.getCurrentSession().get(entity.getClass(), pkValue);
		}
		// EntityUtil.copyNewField(model, entity);
		 BeanUtils.copyProperties(model,entity );
		sf.getCurrentSession().update(model);
		return model;
	}
	
	public <T extends Model> T update(Class<T> clazz,Serializable pk,String updateStr) throws Exception {
		JSONObject updateJsonObject = JSONObject.fromObject(updateStr);
		 T record= (T) sf.getCurrentSession().load(clazz, pk);
		 Iterator<String> keyIterator = updateJsonObject.keys();
			while (keyIterator.hasNext()) {
				String key = keyIterator.next();
				Object value = updateJsonObject.get(key);
				debug("更新字段:" + key + ",value:" + value);
				ModuleServiceFunction.setValueToRecord(key, record, value);
			}
		return record;
	}
	
	
	@Override
	public List<?> queryByHql(String hql, Integer start, Integer limit)
			throws Exception {
		// TODO Auto-generated method stub
		Query query=sf.getCurrentSession().createQuery(hql);
		if(limit>0){
			query.setFirstResult(start);
			query.setMaxResults(limit);
		}
		return query.list();
	}
	@Override
	public <T extends Model> void removeById(Serializable id, Class<T> clazz)
			throws Exception {
		Object obj=sf.getCurrentSession().load(clazz, id);
		sf.getCurrentSession().delete(obj);
		
	}
	@Override
	public List<?> queryByHql(String hql) throws Exception {
		 return sf.getCurrentSession().createQuery(hql).list();
	}
	@Override
	public <T extends Model> T save(T entity) throws Exception {
		sf.getCurrentSession().save(entity);
		return entity;
	}
	@Override
	public Integer getCount(String hql) throws Exception {
		Integer c = 0;
		Query query = sf.getCurrentSession().createQuery(hql);
		Object count = query.uniqueResult();
		if(null != count && StringUtil.isInteger(count.toString())) {
			c = Integer.parseInt(count.toString());
		}else{
			c=0;
		}
		return c;
	}
	@Override
	public <T> List<T> doWork(String sql, Work work, List<T> list)
			throws Exception {
		sf.getCurrentSession().doWork(work);
		return list;
	}
	@Override
	public <T extends Model> List<T> findByPropert(String beanClassName, String propertyName,
			Object value, String CondString) throws Exception {
		// TODO Auto-generated method stub
		String hsql=" from "+beanClassName+" where  "+propertyName+"='"+value+"'";
		if(StringUtil.isNotEmpty(CondString)){
			hsql+=" and "+CondString;
		}
		List<T> list=sf.getCurrentSession().createQuery(hsql).list();
		return list;
	}
	@Override
	public <T extends Model> List<T> findByPropert(String beanClassName,
			String propertyName, Object value) throws Exception {
		// TODO Auto-generated method stub
		String hsql=" from "+beanClassName+" where  "+propertyName+"='"+value+"'";
		List<T> list=sf.getCurrentSession().createQuery(hsql).list();
		return list;
	}
	@Override
	public void save(Object record) {
		sf.getCurrentSession().save(record);
		debug("new record saved:" + record.getClass().getSimpleName() + ":"
				+ record.toString());
	}

	@Override
	public void saveOrUpdate(Object record, Object old) {
		sf.getCurrentSession().saveOrUpdate(record);
		debug("save record:" + record.getClass().getSimpleName() + ":"
				+ record.toString());
	}

	@Override
	public void delete(Object record) {
		sf.getCurrentSession().delete(record);
		debug("delete record:" + record.getClass().getSimpleName() + ":"
				+ record.toString());
	}

	@Override
	public Object findById(Class<?> className, Object id) {
		return findById(className.getName(), id);
	}

	@Override
	public Object findById(String beanClassName, Object id) {
		Object record;
		try {
			record = sf.getCurrentSession().get(beanClassName, Integer.parseInt(id.toString()));
		} catch (Exception e) {
			record =sf.getCurrentSession().get(beanClassName, (Serializable) id);
		}
		// log.debug("get record " + beanClassName + " key:" + id + ":" + record);
		return record;
	}


	@Override
	public List<?> findAllSort(String beanClassName, String sort, String dir) {
		debug("find all:" + beanClassName + "---sort:" + sort + "--" + dir);
		String queryString;
		if (sort == null || sort.length() == 0)
			queryString = "from " + beanClassName + " as model ";
		else
			queryString = "from " + beanClassName + " as model " + " order by " + sort + " "
					+ dir;
		List<?> list=sf.getCurrentSession().createQuery(queryString).list();
		if(list==null){
			list=new ArrayList<>();
		}
		
		return list;
	}

	@Override
	public List<?> findByPropertyAllSort(Class<?> className, String sort, String dir,
			String propertyName, Object value, String defaultSort, String defaultDir) {
		return findByPropertyAllSort(className.getName(), sort, dir, propertyName, value,
				defaultSort, defaultDir);
	}

	@Override
	public List<?> findByPropertyAllSort(String beanClassName, String sort, String dir,
			String propertyName, Object value, String defaultSort, String defaultDir) {

		debug("find all:" + beanClassName + "---sort:" + sort + "--" + dir);

		if (propertyName.indexOf(".") > 0)
			return findByPropertyCriteria(beanClassName, sort, dir, propertyName, value,
					defaultSort, defaultDir);

		String queryString;
		String otherFilter = "";
		if (sort == null || sort.length() == 0) {
			if (defaultSort != null) {
				sort = defaultSort;
				dir = defaultDir;
			}
		}
		if (sort == null || sort.length() == 0)
			queryString = "from " + beanClassName + " as model where model." + propertyName
					+ "= ? " + otherFilter;
		else
			queryString = "from " + beanClassName + " as model where model." + propertyName
					+ "= ? " + otherFilter + " order by " + sort + " " + dir;
	
		//System.out.println(queryString);
		List<?> list=sf.getCurrentSession().createQuery(queryString).setParameter(0, value).list();
		if(list==null){
			list=new ArrayList<>();
		}
		
		return list;
	}

	public List<?> findByPropertyCriteria(String beanClassName, String sort, String dir,
			String propertyName, Object value, String defaultSort, String defaultDir) {
		Session session =sf.getCurrentSession();
		Criteria criteria = session.createCriteria(beanClassName);
		String[] props = propertyName.split("\\.");
		Criteria subCriteria = criteria.createCriteria(props[0]);
		subCriteria.add(Restrictions.eq(props[1], value));
		if (sort != null) {
			if (dir == null || !dir.toLowerCase().equals("desc"))
				criteria.addOrder(Order.asc(sort));
			else
				criteria.addOrder(Order.desc(sort));
		} else if (defaultSort != null) {
			if (defaultDir == null || !defaultDir.toLowerCase().equals("desc"))
				criteria.addOrder(Order.asc(defaultSort));
			else
				criteria.addOrder(Order.desc(defaultSort));
		}
		List<?> result = criteria.list();
		session.close();
		return result;
	}

	@Override
	public Object findByPropertyFirst(Class<?> className, String propertyName, Object value) {
		List<?> result = findByProperty(className, propertyName, value);
		if (result.size() == 0)
			return null;
		else
			return result.get(0);
	}

	 @Override
	public Object findByPropertyFirstWithOtherCondition(Class<?> className,
			String propertyName, Object value, String otherCondString) {
		List<?> result = findByPropertyWithOtherCondition(className, propertyName, value,
				otherCondString);
		if (result.size() == 0)
			return null;
		else
			return result.get(0);
	}

	@Override
	public List<?> findByProperty(Class<?> className, String propertyName, Object value) {
		return findByPropertyWithOtherCondition(className.getSimpleName(), propertyName,
				value, null);
	}

	@Override
	public List<?> findByProperty(String beanClassName, String propertyName, Object value) {
		return findByPropertyWithOtherCondition(beanClassName, propertyName, value, null);

	}

	@Override
	public List<?> findByPropertyWithOtherCondition(Class<?> className,
			String propertyName, Object value, String otherCondString) {
		return findByPropertyWithOtherCondition(className.getSimpleName(), propertyName,
				value, otherCondString);

	}

	@Override
	public List<?> findByPropertyWithOtherCondition(String beanClassName,
			String propertyName, Object value, String otherCondString) {
		String queryString = "from " + beanClassName + " as model where model."
				+ propertyName + "=?0";
		if (otherCondString != null && otherCondString.length() > 1) {
			queryString = queryString + " and (" + otherCondString + ")";
		}
		 List<?> result= sf.getCurrentSession().createQuery(queryString).setParameter("0", value).list();
		 if(result==null){
			 result=new ArrayList<>();
		 }
		debug(String.format("finding %s with property:%s value: %s : record number:%d",
				beanClassName, propertyName, value, result.size()));
		return result;
	}

	@Override
	public List<?> findByString(Class<?> className, String value) {
		String queryString = "from " + className.getSimpleName() + " as model where " + value;
		
		List<Object> result =sf.getCurrentSession().createQuery(queryString).list();
		if(result==null){
			result=new ArrayList<>();
		}
		debug(String.format("finding %s with string:%s : record number:%d",
				className.getSimpleName(), value, result.size()));
		return result;

	}

	@Override
	public List findByLikeProperty(String beanClassName, String propertyName, Object value) {

		return findByLikePropertyWithOtherCondition(beanClassName, propertyName, value, "");

	}

	@Override
	public List findByLikePropertyWithOtherCondition(String beanClassName,
			String propertyName, Object value, String otherCondString) {
		String queryString = "from " + beanClassName + " as model where model."
				+ propertyName + " like ? ";

		if (otherCondString != null && otherCondString.length() > 1) {
			queryString = queryString + " and (" + otherCondString + ")";
		}
       
		List<?> result = sf.getCurrentSession().createQuery(queryString).setParameter(0, value).list();
		if(result==null){
			result=new ArrayList<>();
		}

		debug(String.format(
				"finding %s with like property:%s value: %s : record number:%d", beanClassName,
				propertyName, value, result.size()));
		return result;
	}
	@Override
	public List findAll(String className) {
		String hql="from "+className;
	   List<?> list= sf.getCurrentSession().createQuery(hql).list();
	   list= list==null?new ArrayList<>():list;
	   return list;
	}

	
	public List<?> findListIn(String modueName, String pk, List<Object> alist){
		 List<?> list=new ArrayList<>();
		 String hql=" from "+modueName+" o where o." +pk+" in (:alist)";
	     Query query= sf.getCurrentSession().createQuery(hql);
		 List<?> reslut= query.setParameterList("alist", alist).list();
		 if(reslut==null){
			 reslut=list; 
		 }
		 return reslut;
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
}
