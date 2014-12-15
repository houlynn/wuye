package com.ufo.framework.system.modelHandler;

import org.hibernate.event.spi.PostDeleteEvent;
import org.hibernate.event.spi.PostDeleteEventListener;
import org.hibernate.event.spi.PostInsertEvent;
import org.hibernate.event.spi.PostInsertEventListener;
import org.hibernate.event.spi.PostUpdateEvent;
import org.hibernate.event.spi.PostUpdateEventListener;
import org.hibernate.event.spi.PreDeleteEvent;
import org.hibernate.event.spi.PreDeleteEventListener;
import org.hibernate.event.spi.PreInsertEvent;
import org.hibernate.event.spi.PreInsertEventListener;
import org.hibernate.event.spi.PreUpdateEvent;
import org.hibernate.event.spi.PreUpdateEventListener;
import org.hibernate.persister.entity.EntityPersister;

import com.ufo.framework.common.model.Model;

/**
 * 模型事件处理接口
 * 
 * @author 作者 yingqu:
 * @version 创建时间：2014年7月4日 下午5:29:54 version 1.0
 */
public abstract class ModelHandler implements PostInsertEventListener,
		PreInsertEventListener, PostUpdateEventListener,
		PreUpdateEventListener, PostDeleteEventListener, PreDeleteEventListener {

	public void prePersist(Model model) {
	}

	public void postPersist(Model model) {
	}

	public void postSave(Model model) {
	}

	public void preSave(Model model) {
	}

	public void preRemove(Model model) {
	}

	public void postRemove(Model model) {
	}

	public void preUpdate(Model model) {
	}

	public void postUpdate(Model model) {
	}

	public void postLoad(Model model) {
	}

	@Override
	public boolean onPreDelete(PreDeleteEvent arg0) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void onPostDelete(PostDeleteEvent arg0) {
		// TODO Auto-generated method stub

	}

	@Override
	public boolean onPreUpdate(PreUpdateEvent arg0) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void onPostUpdate(PostUpdateEvent arg0) {
		// TODO Auto-generated method stub

	}

	@Override
	public boolean onPreInsert(PreInsertEvent arg0) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void onPostInsert(PostInsertEvent arg0) {
		// TODO Auto-generated method stub

	}

	@Override
	public boolean requiresPostCommitHanding(EntityPersister arg0) {
		// TODO Auto-generated method stub
		return false;
	}

}
