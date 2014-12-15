package com.ufo.framework.system.irepertory;

import java.util.List;

import org.hibernate.SessionFactory;

import com.ufo.framework.common.model.Model;


/**
 * 访问数据库接口
* @author 作者 yingqu: 
* @version 创建时间：2014年6月20日 下午10:08:00 
* version 1.0
 */
public interface ISimpleRepertory<M extends Model> {

	/**
	 * 根据id查询当前实体
	 * @param id
	 * @return
	 * Class clazz;
	 */
	public Object findById(Class<?> clazz,String id) throws Exception ;
	/**
	 * 查询所有实体集合
	 * @return
	 */
	public List<?> findAll(Class<?> clazz)  throws Exception;
	/**
	 * 根据HQL查询条件查询总记录
	 * @param whereSql
	 * @return
	 */
	public Integer getCount(String hql) throws Exception;
	/**
	 * 查询当前页信息
	 * @param whereSql
	 * @param from
	 * @param size
	 * @return
	 */
	public List<?> findByPage(final Class<?> clazz,final String whereSql,
			final int from, final int size)  throws Exception;
	/**
	 * 添加实体
	 * @param entity
	 */
	public Object save(Object entity)  throws Exception;
	/**
	 * 更新实体
	 * @param entity
	 */
	public Object update(Object entity)  throws Exception;
	/**
	 * 删除一个实体
	 * @param entity
	 */
	public void delete(Object entity)  throws Exception;
	/**
	 * 使用hql查询获取一条记录
	 * @param hql
	 * @return
	 */
	public Object getEntityByHql(String hql)  throws Exception;
	/**
	 * 执行一条sql语句
	 * @param sql
	 * @return
	 */
	public Long executeSql(String sql)  throws Exception;
	/**
	 * 执行hql语句
	 * @param hql
	 * @return
	 */
	public Long executeHql(String hql)  throws Exception;
	/**
	 * 根据HQL查询实体列表
	 * @param hql
	 * @return
	 */
	public List<?> queryByHql(String hql)  throws Exception;
	/**
	 * 根据HQL分页查询
	 * @param hql
	 * @param start
	 * @param limit
	 * @return
	 */
	public List<?> queryByHql(String hql,Integer start,Integer limit)  throws Exception;
	/**
	 * 根据SQL查询实体列表
	 * @param sql
	 * @return
	 */
	public List<?> queryBySql(String sql)  throws Exception;
	/**
	 * 根据SQL查询实体列表
	 * @param sql
	 * @return
	 */
	public List<?> queryBySql(String sql,Class<?> c) throws Exception;
	/**
	 * 获取sessionfactory工厂类
	 * @return
	 */
	public SessionFactory getSf();
	
	
	public Object formUpdate(Object entity) throws Exception;
	
	public void flush();
}
