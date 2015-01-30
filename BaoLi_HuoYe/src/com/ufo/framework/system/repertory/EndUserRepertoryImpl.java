package com.ufo.framework.system.repertory;

import org.apache.tomcat.util.buf.UDecoder;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.TransactionException;
import org.springframework.stereotype.Repository;

import com.model.hibernate.system.shared.EndUser;
import com.ufo.framework.common.core.exception.ResponseErrorInfo;
import com.ufo.framework.common.core.exception.UpdateException;
import com.ufo.framework.common.core.utils.StringUtil;
import com.ufo.framework.system.ebi.CommonException;
import com.ufo.framework.system.irepertory.EndUserRepertory;

@Repository
public class EndUserRepertoryImpl extends SimpleRepertoryHibernateImpl<EndUser>  implements EndUserRepertory,CommonException{

	protected EndUserRepertoryImpl() {
		super( EndUser.class);
	}

	@Override
	public void updateUser(String[] updateSqls, String[] ids) throws Exception {
		try{
		Session session=getSf().getCurrentSession();
		// TODO Auto-generated method stub
		for(String updateStr : updateSqls){
			session.createSQLQuery(updateStr).executeUpdate();
		}
		for(String id : ids){
			EndUser endUser=	(EndUser) session.load(EndUser.class, id);
			if(StringUtil.isEmpty(endUser.getUserCode())){
				getUpdateException("", "登陆账号不能为空,更新失败!", 1);
			}
		}
		}catch(TransactionException e){
		  // int code= e.getErrorInfo().getResultCode();
			e.printStackTrace();
		}
		
	}

}
