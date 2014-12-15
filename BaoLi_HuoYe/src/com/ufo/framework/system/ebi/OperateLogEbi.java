package com.ufo.framework.system.ebi;

import com.model.hibernate.system.shared.OperateLog;
import com.ufo.framework.common.model.Model;


public interface OperateLogEbi extends SimpleEbi<OperateLog> {
    public void saveLog(Model model, String type);
}
