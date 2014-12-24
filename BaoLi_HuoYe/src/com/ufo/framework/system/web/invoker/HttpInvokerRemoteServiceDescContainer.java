package com.ufo.framework.system.web.invoker;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;
import org.springframework.remoting.RemoteConnectFailureException;
import org.springframework.remoting.httpinvoker.HttpInvokerProxyFactoryBean;
import org.springframework.remoting.httpinvoker.HttpInvokerServiceExporter;
/**
 * 类方法包级共享，工作交给HttpInvokerClientServiceFactory来处理。<br>
 *描述：服务器spring容器暴漏的服务描述。描述服务地址与服务接口的对应关系。<br>
 *如：{"/remote/testService"："com.ksource.liangfa.ws.core.service.datacenter.TestService",..,..}<br>
 *   有点模仿wsdl的意味，但是服务描述只包含服务地址和服务对应的接口（这就要求服务端和客户端接口必须是一致的（通过liangfa-ws-core实现））<br>
 *用法：由暴漏服务的服务端，负责提供此类（通过HttpInvoker远程调用提供给客户端，或者其他方式）
 *@author gengzi
 *@data 2012-6-21
 */
public class HttpInvokerRemoteServiceDescContainer implements Serializable{

/*	private static final long serialVersionUID = -3490985299101766681L;
	*//**
	 * 服务的远程调用地址（描述远程服务的特殊服务，服务返回HttpInvokerRemoteServiceDescContainer）
	 *//*
	public static final String HttpInvokerRemoteServiceDesc_serviceURL="/remote/remoteServiceDesc";
	private static HttpInvokerRemoteServiceDescContainer container = new HttpInvokerRemoteServiceDescContainer();//单例（对于提供服务的服务端来说）
	
	private Map<String, String> serviceUrlMapping = null;
	private String serverUrl;
	
	*//**
	 * 服务端创建HttpInvokerRemoteServiceDescContainer，依赖SpringContext需要初始化
	 * @return
	 *//*
	static synchronized HttpInvokerRemoteServiceDescContainer serverCreat(){
		Map<String, HttpInvokerServiceExporter> servicesMap = SpringRemoteServiceContext.getServicesMap();
		container.serviceUrlMapping = new HashMap<String, String>(servicesMap.size());
		for(Map.Entry<String, HttpInvokerServiceExporter> m : servicesMap.entrySet()){
			container.serviceUrlMapping.put(m.getValue().getServiceInterface().getName(),m.getKey());
		}
		return container;
	}
	*//**
	 * 获取服务端的服务描述<br>
	 * 额外用处：可以用于测试对方服务是否畅通
	 *//*
	static HttpInvokerRemoteServiceDescContainer clientGet(String serverURL)throws RemoteConnectFailureExceptionExt{
            try {
                HttpInvokerProxyFactoryBean bean = new HttpInvokerProxyFactoryBean();
		bean.setServiceInterface(RemoteServiceDescService.class);
		bean.setServiceUrl(serverURL+HttpInvokerRemoteServiceDescContainer.HttpInvokerRemoteServiceDesc_serviceURL);
		bean.afterPropertiesSet();
		RemoteServiceDescService descService = (RemoteServiceDescService)bean.getObject();
		
		HttpInvokerRemoteServiceDescContainer serviceContainer=descService.getHttpInvokerRemoteServiceDescContainer();
		serviceContainer.setServerUrl(serverURL);
		return serviceContainer;
            } catch (RemoteConnectFailureException e) {
                throw new RemoteConnectFailureExceptionExt("获取"+serverURL+"服务描述异常", e);
            }
	}
	
	String getServerUrl() {
		return serverUrl;
	}

	*//**
	 * 从服务器端获取服务描述对象后，需要设置服务端地址
	 * @param serverUrl
	 *//*
	private void setServerUrl(String serverUrl) {
		this.serverUrl = serverUrl;
	}
	*//**
	 * 服务全路径（服务器地址+服务地址）
	 * @param clazz
	 * @return
	 *//*
	String getServiceUrl(Class<?> clazz){
		if(serviceUrlMapping!=null){
			return serverUrl+serviceUrlMapping.get(clazz.getName());
		}
		return "";
	}*/
}
