package com.ufo.framework.system.ebo;


import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Date;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.model.hibernate.system.shared.EndUser;
import com.model.hibernate.system.shared.OperateLog;
import com.ufo.framework.common.core.utils.DateUtil;
import com.ufo.framework.common.core.utils.EntityUtil;
import com.ufo.framework.common.core.utils.ModelUtil;
import com.ufo.framework.common.log.AppLoggerFactory;
import com.ufo.framework.common.model.Model;
import com.ufo.framework.system.controller.SimpleBaseController;
import com.ufo.framework.system.ebi.OperateLogEbi;
import com.ufo.framework.system.web.SecurityUserHolder;

@Service
public class OperateLogEbo extends SimpleEbo<OperateLog> implements OperateLogEbi {
	 private static final Logger LOG = AppLoggerFactory.getyingquLogger(OperateLogEbo.class);
	protected OperateLogEbo() {
		super(OperateLog.class);
		// TODO Auto-generated constructor stub
	}
	/**
     * 将日志加入BufferLogCollector定义的内存缓冲区
     * @param model
     * @param type 
     */
    public void saveLog(Model model, String type){
        //判断模型是否已经指定忽略记录增删改日志
   /*    if(!model.getClass().isAnnotationPresent(IgnoreBusinessLog.class)){
        	EndUser user=SecurityUserHolder.getCurrentUser();
            String ip=SecurityUserHolder.getCurrentUserLoginIp();
            OperateLog operateLog=new OperateLog();
            if(user != null){
                operateLog.setUsername(user.getUsername());
            }
            operateLog.setLoginIP(ip);
            try {
                operateLog.setServerIP(InetAddress.getLocalHost().getHostAddress());
            } catch (UnknownHostException ex) {
                LOG.error("无法获取服务器IP", ex);
            }
            operateLog.setAppName(SimpleBaseController.appName);
            operateLog.setOperatingTime(DateUtil.formatDateTime(new Date()));
           operateLog.setCreateTime(DateUtil.formatDateTime(new Date()));
            operateLog.setModifyTime(DateUtil.formatDateTime(new Date()));
            operateLog.setUpdateTime(DateUtil.formatDateTime(new Date()));
            operateLog.setModifyUser(SecurityUserHolder.getCurrentUser().getUserCode());
            operateLog.setCreateUser(SecurityUserHolder.getCurrentUser().getUserCode());
            operateLog.setCreateDept(SecurityUserHolder.getCurrentDept().getDeptCode());
            operateLog.setModifyDept(SecurityUserHolder.getCurrentDept().getDeptCode());
            operateLog.setOperatingModel(model.getClass().getName());
            operateLog.setOperatingType(type);
        	String pkName=ModelUtil.getClassPkName(model.getClass());
    		String pkValue=(String) EntityUtil.getPropertyValue(model, pkName); 	
    		//将日志持久化到数据库存中
            operateLog.setOperatingID(pkValue);
            try {
            	this.save(operateLog);
            	/// LOG.info("写入日志成功！ "+operateLog.getOperatingID()+"-"+ operateLog.getDescription());
			} catch (Exception e) {
				e.printStackTrace();
				 LOG.error("写入日志错误！", e);
			}
        }*/
    }
}
