package com.ufo.framework.system.repertory;

import com.model.hibernate.addition._Addition;
import com.model.hibernate.system._Module;
import com.ufo.framework.system.shared.module.FieldAggregationType;

public class SqlField_AdditionCount extends SqlField {

	public SqlField_AdditionCount(_Module module) {
		this.aggregationType = FieldAggregationType.ADDITIONCOUNT;
		this.moduleName = module.getTf_moduleName();
		this.fieldAsName = _Addition.ADDITIONCOUNT;
		this.fieldName = "( select count(*) from _Addition where tf_moduleId = '"
				+ module.getTf_moduleId() + "' and tf_moduleIdValue = " + module.getTableAsName()
				+ "." + module.getTf_primaryKey() + " )";
		this.fieldFullName = this.fieldName;
		setFieldScalar(this.fieldAsName);
	}
}
