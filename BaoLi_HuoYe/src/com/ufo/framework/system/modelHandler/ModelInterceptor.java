package com.ufo.framework.system.modelHandler;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

import org.apache.log4j.Logger;
import org.hibernate.EmptyInterceptor;
import org.hibernate.Transaction;
import org.hibernate.type.Type;
import org.springframework.stereotype.Service;

import com.ufo.framework.common.log.AppLoggerFactory;
import com.ufo.framework.common.model.Model;

/*
 * 在时间发生之前或者之后进行检查拦截处理
 * Intergerceptor的对象有两种存放方式：
 * 1：SessionFactory.openSession(Interceptor)方式为每一个Session分配一个Intercept实例，这个实例存放在session的范围之内;
 * 2：org.hibernate.cfg.Configuration的实例调用setInterceptor(Interceptor)方法，为SessionFactory实例分配一个Interceptor实例，这个实例存放在
 * SessionFactory的范围之内被所有的session所共享
 * 实现它的一个常用的类是：EmptyInterceptor
 * 我们在用这个接口的时候通常只要覆写EmptyInterceptor类中发方法就行了
 *
 * @see SessionFactory#openSession(Interceptor)
 * @see org.hibernate.cfg.Configuration#setInterceptor(Interceptor)
 * @see EmptyInterceptor
 * 
 *
 /**
 在一个对象被初始化调用之前调用此方法。 当修改了持久对象的数据的时候，这个interceptor检测到这种变化. 既然当这个方法被调用，那个就会初始化这个 <tt>entity</tt> 	 *
 * @return <tt>true</tt> 如果状态<tt>state</tt> 改变的话就会返回true，否则返回false。
 */
//public boolean onLoad(Object entity, Serializable id, Object[] state, String[] propertyNames, Type[] types) throws CallbackException;
/**
 *当session的flush（）方法检查到脏数据的时候就会调用此方法.
 *
 * @return <tt>true/false</tt> 
 */
//public boolean onFlushDirty(Object entity, Serializable id, Object[] currentState, Object[] previousState, String[] propertyNames, Type[] types) throws CallbackException;
/**
 * 在一个session保存一个对象之前调用本方法，如果这个方法修改了数据，那么就返回true，否则返回false
 *
 */
//public boolean onSave(Object entity, Serializable id, Object[] state, String[] propertyNames, Type[] types) throws CallbackException;
/**
 * 在一个session删除一个对象之前调用本方法
 *
 */
//public void onDelete(Object entity, Serializable id, Object[] state, String[] propertyNames, Type[] types) throws CallbackException;
/**
 * 当一个集合被创建，或者被重建的时候调用此方法
 */
//public void onCollectionRecreate(Object collection, Serializable key) throws CallbackException;
/**
 * 当删除一个集合的时候调用此方法
 */
//public void onCollectionRemove(Object collection, Serializable key) throws CallbackException;
/**
 * 当一个集合被更新的时候调用
 */
//public void onCollectionUpdate(Object collection, Serializable key) throws CallbackException;
/**
 * 在flush调用之前调用
 */
//public void preFlush(Iterator entities) throws CallbackException;
/**
 * 当session的flush方法执行所有SQL语句后调用
 * in-memory state with the database.
 */
//public void postFlush(Iterator entities) throws CallbackException;
/**
 * 调用这个方法用来区分transient 或者detached 的实例.
 * 
 * @param entity 一个 transient 或者 detached 实例
 * @return Boolean or <tt>null</tt>
 */
//public Boolean isTransient(Object entity);
/**
 *决定session的缓存中哪些是脏对象，session的flush方法调用本方法，如果返回null，session就会按照默认的方式进行脏数据检查。	
 */
//public int[] findDirty(Object entity, Serializable id, Object[] currentState, Object[] previousState, String[] propertyNames, Type[] types);
/**

 *  实例化一个类，要求被实例话的类有一个默认的空的构造器。
 * @param entityName the name of the entity
 * @param entityMode The type of entity instance to be returned.
 * @param id the identifier of the new instance
 * @return an instance of the class, or <tt>null</tt> to choose default behaviour
 */
//public Object instantiate(String entityName, EntityMode entityMode, Serializable id) throws CallbackException;
/**
 * 得到一个persistent实例或者transient实例的entity name （实体名）
 * @param object an entity instance
 * @return the name of the entity
 */
//public String getEntityName(Object object) throws CallbackException;
/**
 * 得到实例对象
 * @param entityName the name of the entity
 * @param id the instance identifier
 * @return a fully initialized entity
 * @throws CallbackException
 */
//public Object getEntity(String entityName, Serializable id) throws CallbackException;

/**
 * 当一个事务开启之后调用
 */
//public void afterTransactionBegin(Transaction tx);
/**
 * 当一个事务被 committed  (不包含rollback的时候).
 */
//public void beforeTransactionCompletion(Transaction tx);
/**
 * 当一个事务被 committed 或者被rolled back的时候调用此方法。
 */
//public void afterTransactionCompletion(Transaction tx);
/**
 * 当sql被prepared的时候调用
 * @param sql sql to be prepared
 * @return original or modified sql
 */
//public String onPrepareStatement(String sql);
/**
 * 
 * @author 作者 yingqu:
 * @version 创建时间：2014年7月5日 上午10:12:50 version 1.0
 */
@Service
public class ModelInterceptor extends EmptyInterceptor {

	private static final Logger LOG = AppLoggerFactory
			.getyingquLogger(ModelInterceptor.class);
	private static final List<ModelHandler> modelHandlers = new LinkedList<>();

	public static void addModelHandler(ModelHandler modelHandler) {
		LOG.info("注册模型事件处理器：" + modelHandler.getClass().getName());
		modelHandlers.add(modelHandler);
	}

	public static void removeModelHandler(ModelHandler modelHandler) {
		LOG.info("移除模型事件处理器：" + modelHandler.getClass().getName());
		modelHandlers.remove(modelHandler);

	}
	private Set<Model> updates = new HashSet<>();
	private Set<Model> deletes = new HashSet<>();
	private Set<Model> creates = new HashSet<>();
	@Override
	public void onDelete(Object entity, Serializable id, Object[] state,
			String[] propertyNames, Type[] types) {
		Model model=(Model)entity;
		LOG.info("onPreDelete： "+model.getClass().getSimpleName() );
		for (ModelHandler modelHandler : modelHandlers) {
			modelHandler.preRemove(model);
			deletes.add(model);
		}
		super.onDelete(entity, id, state, propertyNames, types);
	}

	@Override
	public boolean onFlushDirty(Object entity, Serializable id,
			Object[] currentState, Object[] previousState,
			String[] propertyNames, Type[] types) {
		Model model=(Model)entity;
		LOG.info("preUpdate " + model.getClass().getSimpleName() );
		for (ModelHandler modelHandler : modelHandlers) {
			modelHandler.preUpdate(model);
			updates.add(model);
			
		}
		return true;
	}

	@Override
	public boolean onSave(Object entity, Serializable id, Object[] state,
			String[] propertyNames, Type[] types) {
		Model model=(Model)entity;
		LOG.info("preSave " + model.getClass().getSimpleName() );
		for (ModelHandler modelHandler : modelHandlers) {
			modelHandler.preSave(model);
			creates.add(model);
		}
		return super.onSave(entity, id, state, propertyNames, types);
	}

	@Override
	public void postFlush(Iterator entities) {
		LOG.info("================================postFlush==================================");
		super.postFlush(entities);
	}

	/*
	 * *必须在同步数据库存前进行日志记录，在postFlush无法执行进行日志插入，不受事务的管理
	 * 
	 * @param entities
	 */
	@Override
	public void preFlush(Iterator entities) {
		LOG.info("================================preFlush==================================");
		LOG.info("postFlush " +"添加：" +creates.size()+"条记录");
		LOG.info("postFlush " +"删除：" +deletes.size()+"条记录");
		LOG.info("postFlush " +"更新：" +updates.size()+"条记录");
		creates.forEach(model->{modelHandlers.forEach(modelHandler->modelHandler.postSave(model));});
		deletes.forEach(model->{modelHandlers.forEach(modelHandler->modelHandler.postRemove(model));});
		updates.forEach(model->{modelHandlers.forEach(modelHandler->modelHandler.postUpdate(model));});
		creates.clear();
		deletes.clear();
		updates.clear();
		LOG.info("===================================preFlush===============================");
		super.preFlush(entities);
	}

	@Override
	public String onPrepareStatement(String sql) {
		LOG.info("PrepareSql:"+sql);
		return super.onPrepareStatement(sql);
	}

	@Override
	public void afterTransactionBegin(Transaction tx) {
		// TODO Auto-generated method stub
		LOG.info("=======================================TransactionBegin===========================");
		super.afterTransactionBegin(tx);
	}

	@Override
	public void afterTransactionCompletion(Transaction tx) {
		// TODO Auto-generated method stub
		LOG.info("=======================================TransactionCompletion===========================");
		super.afterTransactionCompletion(tx);
	}


}
