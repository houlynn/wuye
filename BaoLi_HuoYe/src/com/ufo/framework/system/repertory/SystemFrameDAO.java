package com.ufo.framework.system.repertory;

import java.util.List;

import javax.annotation.Resource;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.model.hibernate.system._ModuleField;
import com.model.hibernate.system._ModuleFormScheme;
import com.model.hibernate.system._ModuleFormSchemeGroup;
import com.model.hibernate.system._ModuleFormSchemeGroupField;
import com.model.hibernate.system._ModuleGridScheme;
import com.model.hibernate.system._ModuleGridSchemeGroup;
import com.model.hibernate.system._ModuleGridSchemeGroupField;
import com.ufo.framework.system.irepertory.ISystemFrameRepertory;

@Repository
public class SystemFrameDAO extends HibernateRepertory implements ISystemFrameRepertory {



	/* (non-Javadoc)
	 * @see com.ufo.framework.system.repertory.SystemFrameRepertory#isGridGroupHasField(java.lang.Integer, java.lang.Integer)
	 */
	@Override
	@SuppressWarnings("unchecked")
	public Boolean isGridGroupHasField(Integer gridGroupId, Integer fieldId) {
		List<_ModuleGridSchemeGroupField> fields = (List<_ModuleGridSchemeGroupField>)
				findByPropertyWithOtherCondition(_ModuleGridSchemeGroupField.class,
						"tf_ModuleGridSchemeGroup.tf_gridGroupId", gridGroupId, " tf_ModuleField.tf_fieldId = "
								+ fieldId);
		return fields.size() > 0;
	}


	/* (non-Javadoc)
	 * @see com.ufo.framework.system.repertory.SystemFrameRepertory#isFormGroupHasField(java.lang.Integer, java.lang.Integer)
	 */
	@Override
	@SuppressWarnings("unchecked")
	public Boolean isFormGroupHasField(Integer formGroupId, Integer fieldId) {
		List<_ModuleFormSchemeGroupField> fields = (List<_ModuleFormSchemeGroupField>)
				findByPropertyWithOtherCondition(_ModuleFormSchemeGroupField.class,
						"tf_ModuleFormSchemeGroup.tf_formGroupId", formGroupId, " tf_ModuleField.tf_fieldId = "
								+ fieldId);
		return fields.size() > 0;
	}



	/* (non-Javadoc)
	 * @see com.ufo.framework.system.repertory.SystemFrameRepertory#get_ModuleFields(java.lang.String)
	 */
	@Override
	@SuppressWarnings("unchecked")
	public List<_ModuleField> get_ModuleFields(String moduleId) {
		Session session = getSf().getCurrentSession();
		Criteria criteria = session.createCriteria(_ModuleField.class);
		Criteria moduleCriteria = criteria.createCriteria("tf_Module");
		moduleCriteria.add(Restrictions.eq("tf_moduleId", moduleId));
		return (List<_ModuleField>) criteria.list();

	}

	/* (non-Javadoc)
	 * @see com.ufo.framework.system.repertory.SystemFrameRepertory#getNextGridSchemeOrder(java.lang.String)
	 */
	@Override
	public Integer getNextGridSchemeOrder(String moduleId) {
		Session session = getSf().getCurrentSession();
		Criteria criteria = session.createCriteria(_ModuleGridScheme.class);
		Criteria moduleCriteria = criteria.createCriteria("tf_Module");
		moduleCriteria.add(Restrictions.eq("tf_moduleId", moduleId));
		criteria.setProjection(Projections.max("tf_schemeOrder"));
		List<?> results = criteria.list();
		if (results.get(0) == null)
			return 1;
		else
			return (Integer) results.get(0) + 1;
	}

	/* (non-Javadoc)
	 * @see com.ufo.framework.system.repertory.SystemFrameRepertory#getMaxModuleFieldId(java.lang.String)
	 */
	@Override
	public Integer getMaxModuleFieldId(String moduleId) {
		Session session = getSf().getCurrentSession();
			Criteria criteria = session.createCriteria(_ModuleField.class);
			Criteria moduleCriteria = criteria.createCriteria("tf_Module");
			moduleCriteria.add(Restrictions.eq("tf_moduleId", moduleId));
			criteria.setProjection(Projections.max("tf_fieldId"));
			List<?> results = criteria.list();
			if (results.get(0) == null)
				return Integer.parseInt(moduleId) * 10000 + 10;
			else
				return (Integer) results.get(0) + 10;
	}

	/* (non-Javadoc)
	 * @see com.ufo.framework.system.repertory.SystemFrameRepertory#getNextFormSchemeOrder(java.lang.String)
	 */
	@Override
	public Integer getNextFormSchemeOrder(String moduleId) {
		Session session = getSf().getCurrentSession();
		Criteria criteria = session.createCriteria(_ModuleFormScheme.class);
		Criteria moduleCriteria = criteria.createCriteria("tf_Module");
		moduleCriteria.add(Restrictions.eq("tf_moduleId", moduleId));
		criteria.setProjection(Projections.max("tf_schemeOrder"));
		List<?> results = criteria.list();
		if (results.get(0) == null)
			return 1;
		else
			return (Integer) results.get(0) + 1;
	}

	/* (non-Javadoc)
	 * @see com.ufo.framework.system.repertory.SystemFrameRepertory#addorDeleteGridGroupFields(int, int, java.lang.Boolean)
	 */
	@Override
	public void addorDeleteGridGroupFields(int gridGroupId, int fieldId, Boolean isSelected) {
		Session session = getSf().getCurrentSession();
		session.beginTransaction();
		try {
			Query query = session
					.createQuery(" select max(tf_gridFieldOrder) from _ModuleGridSchemeGroupField "
							+ "where tf_gridGroupId = ? ");
			query.setParameter(0, gridGroupId);
			Integer maxOrder = (Integer) query.uniqueResult();
			if (maxOrder == null)
				maxOrder = 10;
			else
				maxOrder += 10;

			query = session.createQuery(" select tf_gridFieldId from _ModuleGridSchemeGroupField "
					+ "where tf_gridGroupId = ? and tf_fieldId = ?");
			query.setParameter(0, gridGroupId);
			query.setParameter(1, fieldId);
			Integer gridFieldId = (Integer) query.uniqueResult();

			if (isSelected) {
				if (gridFieldId == null) {
					_ModuleGridSchemeGroupField field = new _ModuleGridSchemeGroupField();
					field.setTf_ModuleField(new _ModuleField(fieldId));
					field.setTf_ModuleGridSchemeGroup(new _ModuleGridSchemeGroup(gridGroupId));
					field.setTf_gridFieldOrder(maxOrder);
					session.save(field);
				}
			} else {
				if (gridFieldId != null) {
					query = session.createQuery(" delete _ModuleGridSchemeGroupField "
							+ "where tf_gridFieldId = ? ");
					query.setParameter(0, gridFieldId);
					query.executeUpdate();
				}
			}
		} finally {
			session.getTransaction().commit();
			session.close();
		}

	}

	/* (non-Javadoc)
	 * @see com.ufo.framework.system.repertory.SystemFrameRepertory#addorDeleteFormGroupFields(int, int, java.lang.Boolean)
	 */
	@Override
	public void addorDeleteFormGroupFields(int formGroupId, int fieldId, Boolean isSelected) {
		Session session = getSf().getCurrentSession();
		session.beginTransaction();
		try {
			Query query = session
					.createQuery(" select max(tf_formFieldOrder) from _ModuleFormSchemeGroupField "
							+ "where tf_formGroupId = ? ");
			query.setParameter(0, formGroupId);
			Integer maxOrder = (Integer) query.uniqueResult();
			if (maxOrder == null)
				maxOrder = 10;
			else
				maxOrder += 10;

			query = session.createQuery(" select tf_formFieldId from _ModuleFormSchemeGroupField "
					+ "where tf_formGroupId = ? and tf_fieldId = ?");
			query.setParameter(0, formGroupId);
			query.setParameter(1, fieldId);
			Integer gridFieldId = (Integer) query.uniqueResult();

			if (isSelected) {
				if (gridFieldId == null) {
					_ModuleFormSchemeGroupField field = new _ModuleFormSchemeGroupField();
					field.setTf_ModuleField(new _ModuleField(fieldId));
					field.setTf_ModuleFormSchemeGroup(new _ModuleFormSchemeGroup(formGroupId));
					field.setTf_formFieldOrder(maxOrder);
					session.save(field);
				}
			} else {
				if (gridFieldId != null) {
					query = session.createQuery(" delete _ModuleFormSchemeGroupField "
							+ "where tf_formFieldId = ? ");
					query.setParameter(0, gridFieldId);
					query.executeUpdate();
					// session.delete(new _ModuleFormSchemeGroupField(gridFieldId));
				}
			}
		} finally {
			session.getTransaction().commit();
			session.close();
		}

	}

}
