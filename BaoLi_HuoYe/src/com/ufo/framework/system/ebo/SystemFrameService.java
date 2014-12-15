package com.ufo.framework.system.ebo;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import net.sf.json.JSONArray;
import net.sf.json.JSONSerializer;
import net.sf.json.JsonConfig;

import org.hibernate.annotations.Formula;
import org.springframework.stereotype.Service;

import com.model.hibernate.superclass._ApproveAbstract;
import com.model.hibernate.superclass._AuditingAbstract;
import com.model.hibernate.superclass._InputInfoAbstract;
import com.model.hibernate.system._Module;
import com.model.hibernate.system._ModuleField;
import com.model.hibernate.system._ModuleFormScheme;
import com.model.hibernate.system._ModuleFormSchemeGroup;
import com.model.hibernate.system._ModuleFormSchemeGroupField;
import com.model.hibernate.system._ModuleGridScheme;
import com.model.hibernate.system._ModuleGridSchemeGroup;
import com.model.hibernate.system._ModuleGridSchemeGroupField;
import com.model.hibernate.system._ModuleGroup;
import com.ufo.framework.annotation.FieldInfo;
import com.ufo.framework.annotation.TableInfo;
import com.ufo.framework.common.core.web.ModuleServiceFunction;
import com.ufo.framework.system.ebi.SystemFrameEbi;
import com.ufo.framework.system.irepertory.IModelRepertory;
import com.ufo.framework.system.irepertory.ISystemFrameRepertory;
import com.ufo.framework.system.shared.TreeNodeRecordChecked;


@Service
public class SystemFrameService extends Ebo implements SystemFrameEbi   {



	@Resource
	private ISystemFrameRepertory systemFrameDAO;
	@Resource
	private IModelRepertory moduleDAO;
	
	/* (non-Javadoc)
	 * @see com.ufo.framework.system.ebo.SystemFrameEbi#getModuleDAO()
	 */
	public IModelRepertory getModuleDAO() {
		return moduleDAO;
	}

	/* (non-Javadoc)
	 * @see com.ufo.framework.system.ebo.SystemFrameEbi#setModuleDAO(com.ufo.framework.system.irepertory.IModelRepertory)
	 */
	public void setModuleDAO(IModelRepertory moduleDAO) {
		this.moduleDAO = moduleDAO;
	}

	
	/* (non-Javadoc)
	 * @see com.ufo.framework.system.ebo.SystemFrameEbi#refreshModuleField(java.lang.String)
	 */
	@Override
	public Integer refreshModuleField(String moduleId) throws  Exception {
	 _Module module =(_Module) findByPropertyFirst(_Module.class, _Module.MODULEID,
				moduleId);
		String moduleName = module.getTf_moduleName();
		Class<?> beanClass = ModuleServiceFunction.getModuleBeanClass(moduleName);
		if (beanClass == null)
			return -1;
		TableInfo tableDefine = (TableInfo) beanClass.getAnnotation(TableInfo.class);
		if (tableDefine == null)
			return -1;
		// 取得本模块的字段的最大ＩＤ号
		Integer maxId = systemFrameDAO.getMaxModuleFieldId(module.getTf_moduleId());
		int result = refreshModuleField(beanClass, module, maxId);
		return result;
	}

	//
	private Integer refreshModuleField(Class<?> beanClass, _Module module, Integer maxId) throws Exception {

		// 每一个数据库里没有的字段写入数据库
		int i = 0;
		Field[] fs = beanClass.getDeclaredFields();
		for (Field f : fs) {
			if (!f.getName().startsWith("tf_"))
				continue;
			if (f.getAnnotation(Transient.class) != null)
				continue;
			if (f.getAnnotation(FieldInfo.class) == null)
				continue;

			// module的idkeyfield
			Id id = f.getAnnotation(Id.class);
			if (id != null && !f.getName().equals(module.getTf_primaryKey())) {
				module.setTf_primaryKey(f.getName());
				saveOrUpdate(module, null);
			}
			// module的namefield
			FieldInfo FieldInfo = f.getAnnotation(FieldInfo.class);
			if (FieldInfo != null && FieldInfo.uniqueField()
					&& !f.getName().equals(module.getTf_nameFields())) {
				module.setTf_nameFields(f.getName());
				saveOrUpdate(module, null);
			}

		_ModuleField moduleField = (_ModuleField) findByPropertyFirstWithOtherCondition(_ModuleField.class, _ModuleField.FIELDNAME,
							f.getName(), " tf_moduleId = '" + module.getTf_moduleId() + "'");
			boolean isnew = false;
			// 如果不是新加的字段，那么就不修改东西，如果要修改，自己去界面中修改
			if (moduleField == null) {
				isnew = true;
				moduleField = new _ModuleField();
				moduleField.setTf_Module(module);
				moduleField.setTf_fieldId(maxId);
				maxId += 10;
				moduleField.setTf_fieldName(f.getName());
				moduleField.setTf_allowNew(true);
				moduleField.setTf_allowEdit(true);
				i++;

				if (FieldInfo != null) {
					moduleField.setTf_title(FieldInfo.title());
					moduleField.setTf_fieldGroup(FieldInfo.fieldGroup());
					moduleField.setTf_isHidden(FieldInfo.hidden());
					moduleField
							.setTf_remark(FieldInfo.remark().length() == 0 ? null : FieldInfo.remark());
					moduleField.setTf_fieldOrder(FieldInfo.number());
				} else
					moduleField.setTf_title(f.getName());

				Column column = f.getAnnotation(Column.class);
				if (column != null) {
					moduleField.setTf_isRequired(!column.nullable());
					moduleField.setTf_fieldLen(column.length() == 255 ? null : column.length());
					moduleField.setTf_DBfieldName(column.name());
					moduleField.setTf_allowNew(column.insertable());
					moduleField.setTf_allowEdit(column.updatable());
				}

				Formula formula = f.getAnnotation(Formula.class);
				if (formula != null) {
					moduleField.setTf_DBformula(formula.value());
					moduleField.setTf_allowNew(false);
					moduleField.setTf_allowEdit(false);
				}

				moduleField.setTf_fieldType(f.getType().getSimpleName());

				if (f.getAnnotation(ManyToOne.class) != null) {
					moduleField.setTf_fieldRelation("ManyToOne");
					JoinColumn joinColumn = f.getAnnotation(JoinColumn.class);
					if (joinColumn != null) {
						moduleField.setTf_allowNew(joinColumn.insertable());
						moduleField.setTf_allowEdit(joinColumn.updatable());
						moduleField.setTf_isRequired(!joinColumn.nullable());
						moduleField.setTf_showNavigatorTree(true);
					}
				}

				if (moduleField.getTf_fieldName().equals(_InputInfoAbstract.INPUTMEN)
						|| moduleField.getTf_fieldName().equals(_InputInfoAbstract.INPUTDATE)) {
					moduleField.setTf_allowNew(false);
					moduleField.setTf_allowEdit(false);
					moduleField.setTf_isRequired(false);
				}

				if (f.getAnnotation(OneToOne.class) != null)
					moduleField.setTf_fieldRelation("OneToOne");
				if (f.getAnnotation(OneToMany.class) != null)
					moduleField.setTf_fieldRelation("OneToMany");
				
				
		if (FieldInfo.money())
					moduleField.setTf_fieldType("Money");
				if (FieldInfo.percent())
					moduleField.setTf_fieldType("Percent");
				
			}
			if (isnew)
				save(moduleField);
			else
				saveOrUpdate(moduleField, null);
		}
		if (beanClass.getSuperclass() != null)
			return i + refreshModuleField(beanClass.getSuperclass(), module, maxId);
		else
			return i;
	}

	/* (non-Javadoc)
	 * @see com.ufo.framework.system.ebo.SystemFrameEbi#addModuleWithName(java.lang.String, java.lang.Class, com.ufo.framework.annotation.TableInfo)
	 */

	@Override
	public String addModuleWithName(String moduleName, Class<?> moduleClass, TableInfo tableDefine) throws Exception {

     // 生成 模块文件
		_Module module = (_Module) findByPropertyFirst(_Module.class, _Module.MODULENAME,
				moduleName);
		if (module == null) {
			module = new _Module();
			module.setTf_ModuleGroup(get_ModuleGroupWithTitle(tableDefine.group()));
			module.setTf_moduleId(String.valueOf(tableDefine.id()));
			module.setTf_moduleName(moduleName);
			module.setTf_shortname(tableDefine.shortname().length() > 1 ? tableDefine.shortname() : null);
			module.setTf_hasAddition(tableDefine.attachment());
			module.setTf_title(tableDefine.title());
			if (tableDefine.codeLevel().length() > 0)
				module.setTf_codeLevel(tableDefine.codeLevel());
			if(moduleClass.isAnnotationPresent(Table.class)){
				Table table=moduleClass.getAnnotation(Table.class);
				module.setTf_tableName(table.name());
			}else{
				module.setTf_tableName(moduleClass.getSimpleName());
			}
			module.setTf_isEnable(true);
			module.setTf_hasBrowse(true);
			module.setTf_hasInsert(true);
			module.setTf_hasEdit(true);
			module.setTf_hasDelete(true);
			module.setTf_hasAuditing(false);
			module.setTf_hasApprove(false);
			module.setTf_isInlineOper(false);
			module.setTf_nameFields("undefined");
			module.setTf_primaryKey("undefined");
			module.setTf_requestMapping("undefined");
			save(module);
		}
		return null;
	}

	/* (non-Javadoc)
	 * @see com.ufo.framework.system.ebo.SystemFrameEbi#createNewGridScheme(java.lang.String, java.lang.Class)
	 */
	@Override
	//@Transactional(propagation = Propagation.REQUIRED)
	public Boolean createNewGridScheme(String moduleId, Class<?> moduleClass) throws Exception {
		_Module module = (_Module) findById(_Module.class, moduleId);
		if (module == null)
			return false;
		_ModuleGridScheme scheme = new _ModuleGridScheme();
		scheme.setTf_schemeName(module.getTf_title() + "列表");
		scheme.setTf_Module(module);
		scheme.setTf_schemeOrder(systemFrameDAO.getNextGridSchemeOrder(moduleId));
		save(scheme);

		_ModuleGridSchemeGroup schemeGroup = new _ModuleGridSchemeGroup();
		schemeGroup.setTf_gridGroupOrder(1);
		schemeGroup.setTf_ModuleGridScheme(scheme);
		schemeGroup.setTf_gridGroupName(module.getTf_title());
		save(schemeGroup);

		List<_ModuleField> fields = systemFrameDAO.get_ModuleFields(moduleId);

		int order = 10;
		for (_ModuleField field : fields) {
			if (field.getTf_isHidden())
				continue;
			// 审批的不加入，加入另外的组
			if (!(field.getTf_fieldOrder() >= 1000 && (field.getTf_fieldName().startsWith("tf_sh") || field
					.getTf_fieldName().startsWith("tf_auditing")))) {
				_ModuleGridSchemeGroupField groupField = new _ModuleGridSchemeGroupField();
				groupField.setTf_ModuleField(field);
				if (field.getTf_fieldOrder() != null && field.getTf_fieldOrder() > 0)
					groupField.setTf_gridFieldOrder(field.getTf_fieldOrder());
				else {
					groupField.setTf_gridFieldOrder(order);
					order += 10;
				}
				groupField.setTf_ModuleGridSchemeGroup(schemeGroup);
				save(groupField);
			}
		}

		if (_AuditingAbstract.class.isAssignableFrom(moduleClass)) {
			// 审核组
			schemeGroup = new _ModuleGridSchemeGroup();
			schemeGroup.setTf_gridGroupOrder(8);
			schemeGroup.setTf_ModuleGridScheme(scheme);
			schemeGroup.setTf_isShowHeaderSpans(true);
			schemeGroup.setTf_gridGroupName("审核情况");
			save(schemeGroup);
			order = 10;
			for (_ModuleField field : fields) {
				if ((field.getTf_fieldOrder() >= 2010 && field.getTf_fieldOrder() <= 2040)) {
					_ModuleGridSchemeGroupField groupField = new _ModuleGridSchemeGroupField();
					groupField.setTf_ModuleField(field);
					groupField.setTf_ModuleGridSchemeGroup(schemeGroup);
					if (field.getTf_fieldOrder() != null && field.getTf_fieldOrder() > 0)
						groupField.setTf_gridFieldOrder(field.getTf_fieldOrder());
					else {
						groupField.setTf_gridFieldOrder(order);
						order += 10;
					}
					save(groupField);
				}
			}
		}

		if (_ApproveAbstract.class.isAssignableFrom(moduleClass))

			// 审批组
			for (int i = 1; i <= 6; i++) {
				schemeGroup = new _ModuleGridSchemeGroup();
				schemeGroup.setTf_gridGroupOrder(10 + i);
				schemeGroup.setTf_ModuleGridScheme(scheme);
				schemeGroup.setTf_isShowHeaderSpans(true);
				schemeGroup.setTf_gridGroupName("第" + i + "级审批");
				save(schemeGroup);
				order = 10;
				for (_ModuleField field : fields) {
					if ((field.getTf_fieldOrder() >= 1000 + i * 100 && field.getTf_fieldOrder() < 1100 + i * 100)) {
						_ModuleGridSchemeGroupField groupField = new _ModuleGridSchemeGroupField();
						groupField.setTf_ModuleField(field);
						groupField.setTf_ModuleGridSchemeGroup(schemeGroup);
						if (field.getTf_fieldOrder() != null && field.getTf_fieldOrder() > 0)
							groupField.setTf_gridFieldOrder(field.getTf_fieldOrder());
						else {
							groupField.setTf_gridFieldOrder(order);
							order += 10;
						}
						save(groupField);
					}
				}
			}
		return true;
	}

	/* (non-Javadoc)
	 * @see com.ufo.framework.system.ebo.SystemFrameEbi#createNewFormScheme(java.lang.String, java.lang.Class)
	 */
	@Override
	///@Transactional(propagation = Propagation.REQUIRED)
	public Boolean createNewFormScheme(String moduleId, Class<?> moduleClass) throws Exception {
		_Module module = (_Module) findById(_Module.class, moduleId);
		if (module == null)
			return false;
		_ModuleFormScheme scheme = new _ModuleFormScheme();
		scheme.setTf_schemeName(module.getTf_title() + "Form");
		scheme.setTf_Module(module);
		scheme.setTf_windowHeight(-1);
		scheme.setTf_windowWidth(600);
		scheme.setTf_numCols(2);
		scheme.setTf_schemeOrder(systemFrameDAO.getNextFormSchemeOrder(moduleId));
		save(scheme);

		_ModuleFormSchemeGroup schemeGroup = new _ModuleFormSchemeGroup();
		schemeGroup.setTf_formGroupOrder(1);
		schemeGroup.setTf_ModuleFormScheme(scheme);
		schemeGroup.setTf_formGroupName(module.getTf_title());
		save(schemeGroup);

		List<_ModuleField> fields = systemFrameDAO.get_ModuleFields(moduleId);

		int order = 10;
		for (_ModuleField field : fields) {
			if (!(field.getTf_fieldOrder() >= 1000 && (field.getTf_fieldName().startsWith("tf_sh") || field
					.getTf_fieldName().startsWith("tf_auditing")))) {
				_ModuleFormSchemeGroupField groupField = new _ModuleFormSchemeGroupField();
				groupField.setTf_ModuleField(field);
				groupField.setTf_ModuleFormSchemeGroup(schemeGroup);
				if (field.getTf_fieldOrder() != null && field.getTf_fieldOrder() > 0)
					groupField.setTf_formFieldOrder(field.getTf_fieldOrder());
				else {
					groupField.setTf_formFieldOrder(order);
					order += 10;
				}
				save(groupField);
			}
		}

		// 审核组
		if (_AuditingAbstract.class.isAssignableFrom(moduleClass)) {
			schemeGroup = new _ModuleFormSchemeGroup();
			schemeGroup.setTf_formGroupOrder(8);
			schemeGroup.setTf_ModuleFormScheme(scheme);
			schemeGroup.setTf_auditingGroup(true);
			schemeGroup.setTf_numCols(2);
			schemeGroup.setTf_collapsible(true);
			schemeGroup.setTf_formGroupName("审核情况");
			save(schemeGroup);
			order = 10;
			for (_ModuleField field : fields) {
				if ((field.getTf_fieldOrder() >= 2010 && field.getTf_fieldOrder() <= 2040)) {
					_ModuleFormSchemeGroupField groupField = new _ModuleFormSchemeGroupField();
					groupField.setTf_ModuleField(field);
					groupField.setTf_ModuleFormSchemeGroup(schemeGroup);
					if (field.getTf_fieldOrder() != null && field.getTf_fieldOrder() > 0)
						groupField.setTf_formFieldOrder(field.getTf_fieldOrder());
					else {
						groupField.setTf_formFieldOrder(order);
						order += 10;
					}
					save(groupField);
				}
			}
		}

		// 审批组
		if (_ApproveAbstract.class.isAssignableFrom(moduleClass))
			for (int i = 1; i <= 6; i++) {
				schemeGroup = new _ModuleFormSchemeGroup();
				schemeGroup.setTf_formGroupOrder(10 + i);
				schemeGroup.setTf_ModuleFormScheme(scheme);
				schemeGroup.setTf_approveGroup(true);
				schemeGroup.setTf_numCols(3);
				schemeGroup.setTf_collapsible(true);
				schemeGroup.setTf_formGroupName("第" + i + "级审批");
				save(schemeGroup);
				order = 10;
				for (_ModuleField field : fields) {
					if ((field.getTf_fieldOrder() >= 1000 + i * 100 && field.getTf_fieldOrder() < 1100 + i * 100)) {
						_ModuleFormSchemeGroupField groupField = new _ModuleFormSchemeGroupField();
						groupField.setTf_ModuleField(field);
						groupField.setTf_ModuleFormSchemeGroup(schemeGroup);
						if (field.getTf_fieldOrder() != null && field.getTf_fieldOrder() > 0)
							groupField.setTf_formFieldOrder(field.getTf_fieldOrder());
						else {
							groupField.setTf_formFieldOrder(order);
							order += 10;
						}
						save(groupField);
					}
				}
			}
		return true;
	}

	/**
	 * 取得一个模块分组，如果没有，则创建一个分组
	 * 
	 * @param groupTitle
	 * @return
	 */
	private _ModuleGroup get_ModuleGroupWithTitle(String groupTitle) throws Exception {
		_ModuleGroup moduleGroup = (_ModuleGroup) findByPropertyFirst(_ModuleGroup.class,
				_ModuleGroup.TITLE, groupTitle);
		if (moduleGroup == null) {
			moduleGroup = new _ModuleGroup();
			moduleGroup.setTf_moduleGroupId(groupTitle);
			moduleGroup.setTf_title(groupTitle);
			save(moduleGroup);
		}
		return moduleGroup;
	}

	/* (non-Javadoc)
	 * @see com.ufo.framework.system.ebo.SystemFrameEbi#saveGridGroupFields(java.lang.String, java.lang.String)
	 */
	@Override
	public Boolean saveGridGroupFields(String gridGroupId, String noderecords) {
		if (noderecords != null && noderecords.length() > 10) {
			JsonConfig config = new JsonConfig();
			config.setArrayMode(JsonConfig.MODE_OBJECT_ARRAY);
			config.setRootClass(TreeNodeRecordChecked.class);
			TreeNodeRecordChecked[] records = (TreeNodeRecordChecked[]) JSONSerializer.toJava(
					JSONArray.fromObject(noderecords), config);

			for (TreeNodeRecordChecked record : records) {
				if (record.getFieldvalue() != null)
					systemFrameDAO.addorDeleteGridGroupFields(Integer.parseInt(gridGroupId),
							Integer.parseInt(record.getFieldvalue()), record.getChecked());
			}
		}
		return true;
	}

	/* (non-Javadoc)
	 * @see com.ufo.framework.system.ebo.SystemFrameEbi#saveFormGroupFields(java.lang.String, java.lang.String)
	 */
	@Override
	public Boolean saveFormGroupFields(String formGroupId, String noderecords) {
		if (noderecords != null && noderecords.length() > 10) {
			JsonConfig config = new JsonConfig();
			config.setArrayMode(JsonConfig.MODE_OBJECT_ARRAY);
			config.setRootClass(TreeNodeRecordChecked.class);
			TreeNodeRecordChecked[] records = (TreeNodeRecordChecked[]) JSONSerializer.toJava(
					JSONArray.fromObject(noderecords), config);

			for (TreeNodeRecordChecked record : records) {
				if (record.getFieldvalue() != null)
					systemFrameDAO.addorDeleteFormGroupFields(Integer.parseInt(formGroupId),
							Integer.parseInt(record.getFieldvalue()), record.getChecked());
			}
		}
		return true;

	}
	@Override
	public String addModuleWithName(  String moduleName) throws Exception {
		Class<?> moduleClass = ModuleServiceFunction.getModuleBeanClass(moduleName);
		if (moduleClass == null)
			return "未在指定的包中找到类:" + moduleName + "!";
			TableInfo tableDefine = (TableInfo) moduleClass.getAnnotation(TableInfo.class);
		if (tableDefine == null)
			return "未在指定的类中找到tableDefine的标注定义";
		String result =this.addModuleWithName(moduleName, moduleClass, tableDefine);
		if(result==null){
		this.refreshModuleField(tableDefine.id()+"");
		// 创建新的列表数据
		this.createNewGridScheme(tableDefine.id()+"", moduleClass);
		// 创建新的表单数据
		this.createNewFormScheme(tableDefine.id()+"", moduleClass);
		}
		return null;
	}


}
