package com.ufo.framework.system.repertory;

import org.springframework.stereotype.Repository;

import com.model.hibernate.system.shared.OperateLog;
import com.ufo.framework.system.irepertory.OperateLogRepertory;

@Repository
public class OperateLogRepertoryImpl extends SimpleRepertoryHibernateImpl<OperateLog>  implements OperateLogRepertory{

	protected OperateLogRepertoryImpl() {
		super( OperateLog.class);
	}

}
