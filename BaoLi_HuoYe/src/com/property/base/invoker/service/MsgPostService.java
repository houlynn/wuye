package com.property.base.invoker.service;
import java.rmi.RemoteException;
import java.util.Date;
import java.util.UUID;
import org.apache.axis2.AxisFault;
import net._139130.www.WebServiceStub;
import net._139130.www.WebServiceStub.ArrayOfMessageData;
import net._139130.www.WebServiceStub.Guid;
import net._139130.www.WebServiceStub.MTPacks;
import net._139130.www.WebServiceStub.MessageData;
import net._139130.www.WebServiceStub.Post;
import net._139130.www.WebServiceStub.PostResponse;

public class MsgPostService {
	private static WebServiceStub serviceStub;
	static {
		try {
			serviceStub = new WebServiceStub();
		} catch (AxisFault e) {
			e.printStackTrace();
		}
	}
	public synchronized static PostResponse postSms(String content, String nub, String account,
			String pwd) throws RemoteException {
		MessageData[] messagedatas = new MessageData[1]; // 号码数量
		MessageData data = new MessageData();
		data.setContent(content);
		data.setPhone(nub);
		data.setVipFlag(true);
		data.setCustomMsgID("00008223312");
		messagedatas[0] = data;
		MTPacks mtpack = new MTPacks();
		Guid guid = new Guid();
		guid.setGuid(UUID.randomUUID().toString());
		mtpack.setUuid(guid);
		Guid guid1 = new Guid();
		guid1.setGuid(UUID.randomUUID().toString());
		mtpack.setBatchID(guid1);
		mtpack.setBatchName(new Date().getTime() + "");
		mtpack.setMsgType(1);
		mtpack.setCustomNum("1300");
		mtpack.setDistinctFlag(true);
		mtpack.setRemark("");
		ArrayOfMessageData param = new ArrayOfMessageData();
		param.setMessageData(messagedatas);
		mtpack.setMsgs(param);
		Post post6 = new Post();
		post6.setMtpack(mtpack);
		post6.setAccount(account);
		post6.setPassword(pwd);
		PostResponse gr = serviceStub.post(post6);
		return gr;
	}

}
