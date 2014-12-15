package com.ufo.framework.system.ebo;

import java.io.Serializable;
import java.util.List;

import javax.annotation.Resource;

import org.hibernate.jdbc.Work;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ufo.framework.common.core.utils.StringUtil;
import com.ufo.framework.common.model.Model;
import com.ufo.framework.system.ebi.Ebi;
import com.ufo.framework.system.irepertory.ICommonRepertory;

@Service
public class Ebo implements Ebi {
	@Resource(name="hibernateRepertory")
	private ICommonRepertory repertory;
	public Ebo() {
		debug(this.getClass().getName());
	}
    public ICommonRepertory getRepertory() {
		return repertory;
	}
	public void setRepertory(ICommonRepertory repertory) {
		this.repertory = repertory;
	}
	@Override
	public <T extends Model> T findById(Class<T> clazz, Serializable id)
			throws Exception {
		// TODO Auto-generated method stub
		return repertory.findById(clazz, id);
	}
	@Override
	public <T extends Model> List<T> findAll(Class<T> clazz) throws Exception {
		// TODO Auto-generated method stub
		return repertory.findAll(clazz);
	}
	@Override
	public <T extends Model> T getEntityByHql(Class<T> clazz, String hql)
			throws Exception {
		// TODO Auto-generated method stub
		return repertory.getEntityByHql(clazz, hql);
	}
	@Override
	public <T extends Model> T update(T entity) throws Exception {
		// TODO Auto-generated method stub
		return repertory.update(entity);
	}
	@Override
	public List<?> queryByHql(String hql, Integer start, Integer limit)
			throws Exception {
		// TODO Auto-generated method stub
		return repertory.queryByHql(hql, start, limit);
	}
	@Override
	public <T extends Model> void removeById(Serializable id, Class<T> clazz)
			throws Exception {
		// TODO Auto-generated method stub
		repertory.removeById(id, clazz);

	}
	@Override
	public List<?> queryByHql(String hql) throws Exception {
		// TODO Auto-generated method stub
		System.out.println("select:"+hql);
		return repertory.queryByHql(hql);
	}
	@Override
	public <T extends Model> T save(T entity) throws Exception {
		// TODO Auto-generated method stub
		return repertory.save(entity);
	}
	@Override
	public Integer getCount(String hql) throws Exception {
		// TODO Auto-generated method stub
		return repertory.getCount(hql);
	}
	@Override
	public <T> List<T> doWork(String sql, Work work, List<T> list)
			throws Exception {
		// TODO Auto-generated method stub
		return repertory.doWork(sql, work, list);
	}
	@Override
	public <T extends Model> List<T> findByPropert(String beanClassName,
			String propertyName, Object value, String CondString)
			throws Exception {
		// TODO Auto-generated method stub
		return repertory.findByPropert(beanClassName, propertyName, value, CondString);
	}
	@Override
	public <T extends Model> T findByPropertFirst(String beanClassName,
			String propertyName, Object value, String CondString)
			throws Exception {
		// TODO Auto-generated method stub
		List<T> list=repertory.findByPropert(beanClassName, propertyName, value, CondString);
		T mode=null;
		if(list!=null&&list.size()>0){
			mode=list.get(0);
		}
		return mode;
	}
	@Override
	public boolean checkUnique(String beanClassName, String propertyName,
			Object value, String CondString) {
		// TODO Auto-generated method stub
		boolean flag=false;
		String hsql="select count(*) from "+beanClassName+"  where "+beanClassName+"='"+value+"' ";
		if(StringUtil.isNotEmpty(CondString)){
			hsql+=CondString;
		}
		try {
			Integer count= repertory.getCount(hsql);
			if(count==0){
				flag=true;	
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return false;
	}
    @Transactional(readOnly=true)  
	@Override
	public <T extends Model> List<T> findByPropert(String beanClassName,
			String propertyName, Object value) throws Exception {
		// TODO Auto-generated method stub
		return repertory.findByPropert(beanClassName, propertyName, value);
	}
	@Override
	public void save(Object record) {
		// TODO Auto-generated method stub
		repertory.save(record);
		
	}
	@Override
	public void saveOrUpdate(Object record, Object old) {
		// TODO Auto-generated method stub
		repertory.saveOrUpdate(record, old);
		
	}
	@Override
	public void delete(Object record) {
		// TODO Auto-generated method stub
		repertory.delete(record);
		
	}
	@Override
	public Object findById(Class<?> className, Object id) {
		// TODO Auto-generated method stub
		return repertory.findById(className, id);
	}
	@Override
	public Object findById(String beanClassName, Object id) {
		// TODO Auto-generated method stub
		return repertory.findById(beanClassName, id);
	}
	@Override
	public List findByProperty(Class<?> className, String propertyName,
			Object value) {
		// TODO Auto-generated method stub
		return repertory.findByProperty(className, propertyName, value);
	}
	@Override
	public Object findByPropertyFirst(Class<?> className, String propertyName,
			Object value) {
		// TODO Auto-generated method stub
		return repertory.findByPropertyFirst(className, propertyName, value);
	}
	@Override
	public List findByString(Class<?> className, String value) {
		// TODO Auto-generated method stub
		return repertory.findByString(className, value);
	}
	@Override
	public List findByProperty(String beanClassName, String propertyName,
			Object value) {
		// TODO Auto-generated method stub
		return repertory.findByProperty(beanClassName, propertyName, value);
	}
	@Override
	public List findByPropertyWithOtherCondition(Class<?> className,
			String propertyName, Object value, String otherCondString) {
		// TODO Auto-generated method stub
		return repertory.findByPropertyWithOtherCondition(className, propertyName, value, otherCondString);
	}
	@Override
	public List findByLikeProperty(String beanClassName, String propertyName,
			Object value) {
		// TODO Auto-generated method stub
		return repertory.findByLikeProperty(beanClassName, propertyName, value);
	}
	@Override
	public List findByLikePropertyWithOtherCondition(String beanClassName,
			String propertyName, Object value, String otherCondString) {
		// TODO Auto-generated method stub
		return repertory.findByLikePropertyWithOtherCondition(beanClassName, propertyName, value, otherCondString);
	}
	@Override
	public List findByPropertyWithOtherCondition(String beanClassName,
			String propertyName, Object value, String otherCondString) {
		// TODO Auto-generated method stub
		return repertory.findByPropertyWithOtherCondition(beanClassName, propertyName, value, otherCondString);
	}
	@Override
	public List findByPropertyAllSort(String beanClassName, String sort,
			String dir, String propertyName, Object value, String defaultSort,
			String defaultDir) {
		// TODO Auto-generated method stub
		return repertory.findByPropertyAllSort(beanClassName, sort, dir, propertyName, value, defaultSort, defaultDir);
	}
	@Override
	public List findAll(String className) {
		// TODO Auto-generated method stub
		return repertory.findAll(className);
	}
	@Override
	public List findAllSort(String beanClassName, String sort, String dir) {
		// TODO Auto-generated method stub
		return repertory.findAllSort(beanClassName, sort, dir);
	}
	@Override
	public List findByPropertyAllSort(Class<?> className, String sort,
			String dir, String propertyName, Object value, String defaultSort,
			String defaultDir) {
		// TODO Auto-generated method stub
		return repertory.findByPropertyAllSort(className, sort, dir,propertyName,value,defaultSort,defaultDir);
	}
	@Override
	public Object findByPropertyFirstWithOtherCondition(Class<?> className,
			String propertyName, Object value, String otherCondString) {
		// TODO Auto-generated method stub
		return repertory.findByPropertyFirstWithOtherCondition(className, propertyName, value, otherCondString);
	}
	@Override
	public List<?> findListIn(String modueName, String pk, List<Object> alist) {
		// TODO Auto-generated method stub
		return repertory.findListIn(modueName, pk, alist);
	}
	@Override
	public <T extends Model> T update(Class<T> clazz, Serializable pk,
			String updateStr) throws Exception {
		// TODO Auto-generated method stub
		return repertory.update(clazz, pk, updateStr);
	}

}
