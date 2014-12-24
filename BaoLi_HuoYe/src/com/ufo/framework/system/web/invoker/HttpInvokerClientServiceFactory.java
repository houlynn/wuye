package com.ufo.framework.system.web.invoker;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import org.apache.commons.lang.StringUtils;
import org.springframework.remoting.httpinvoker.HttpInvokerProxyFactoryBean;

/**
 * 描述：spring HttpInvoker服务管理工厂，提供远程服务描述、远程服务代理对象的创建使用<br>
 *
 * @author gengzi
 * @data 2012-6-20
 */
public class HttpInvokerClientServiceFactory {

/*    //同步
    *//**
     * [serviceUrl：远程服务代理对象,...]
     *//*
    private static ConcurrentMap<String, Object> servicePoxyMap;
    *//**
     * [serverUrl：HttpInvokerRemoteServiceDescContainer,...]
     *//*
    private static ConcurrentMap<String, HttpInvokerRemoteServiceDescContainer> containerList;

    //---->初始化方法s
    private static void initClear() {
        if (containerList != null) {
            containerList.clear();
        } else {
            containerList = new ConcurrentHashMap<String, HttpInvokerRemoteServiceDescContainer>();
        }
        if (servicePoxyMap != null) {
            servicePoxyMap.clear();
        } else {
            servicePoxyMap = new ConcurrentHashMap<String, Object>();
        }
    }

    public static void init() {
        initClear();
    }

    public static void init(List<String> serverURLList) {
        HttpInvokerClientServiceFactory.init();
        for (String serverURL : serverURLList) {
            HttpInvokerRemoteServiceDescContainer container = HttpInvokerRemoteServiceDescContainer.clientGet(serverURL);
            HttpInvokerClientServiceFactory.addContainer(container);
        }
    }

    public static void init(String serverURL) {
        HttpInvokerClientServiceFactory.init();
        HttpInvokerRemoteServiceDescContainer container = HttpInvokerRemoteServiceDescContainer.clientGet(serverURL);
        HttpInvokerClientServiceFactory.addContainer(container);
    }

    @Deprecated
     public  static void init(List<HttpInvokerRemoteServiceDescContainer> containers){
     initClear();
     if(CollectionUtils.isNotEmpty(containers)){
     for(HttpInvokerRemoteServiceDescContainer container : containers){
     if(StringUtils.isBlank(container.getServerUrl())){
     throw new RuntimeException("container的服务端地址为空！");
     }
     containerList.put(container.getServerUrl(), container);
     }
     }
     }
    //<----初始化方法s
    //--addContainer
    public static void addServer(List<String> serverURLList) throws RemoteConnectFailureExceptionExt {
        for (String serverURL : serverURLList) {
            HttpInvokerClientServiceFactory.addServer(serverURL);
        }
    }

    public static void addServer(String serverURL) throws RemoteConnectFailureExceptionExt {
        if (!containerList.containsKey(serverURL)) {
            HttpInvokerRemoteServiceDescContainer container = HttpInvokerRemoteServiceDescContainer.clientGet(serverURL);
            HttpInvokerClientServiceFactory.addContainer(container);
        }
    }

    private static void addContainer(HttpInvokerRemoteServiceDescContainer container) {
        if (StringUtils.isBlank(container.getServerUrl())) {
            throw new RuntimeException("container的服务端地址为空！");
        }
        containerList.put(container.getServerUrl(), container);
    }

    @Deprecated
     public  synchronized static void addContainer(List<HttpInvokerRemoteServiceDescContainer> containers){
     if(CollectionUtils.isNotEmpty(containers)){
     for(HttpInvokerRemoteServiceDescContainer container : containers){
     addContainer(container);
     }
     }
     }
    @SuppressWarnings("unchecked")
    private static <T> T createService(String serviceUrl, Class<T> clazz) {
        HttpInvokerProxyFactoryBean bean = new HttpInvokerProxyFactoryBean();
        bean.setServiceInterface(clazz);
        bean.setServiceUrl(serviceUrl);

        MultiThreadedHttpConnectionManager connectionManager = new MultiThreadedHttpConnectionManager();
        HttpConnectionManagerParams params = new HttpConnectionManagerParams();
        params.setMaxTotalConnections(30);
        params.setDefaultMaxConnectionsPerHost(20);
        params.setConnectionTimeout(10*1000);//连接超时时间：10秒
        params.setSoTimeout(5*60*1000);//读取数据的超时时间：五分钟
        connectionManager.setParams(params);
        HttpClient httpClient = new HttpClient(connectionManager);
        CommonsHttpInvokerRequestExecutor CommonsHttpInvokerRequestExecutor = new CommonsHttpInvokerRequestExecutor(httpClient);
//		CommonsHttpInvokerRequestExecutor CommonsHttpInvokerRequestExecutor = new CommonsHttpInvokerRequestExecutor();
        bean.setHttpInvokerRequestExecutor(CommonsHttpInvokerRequestExecutor);

        bean.afterPropertiesSet();
        return (T) bean.getObject();
    }

    public static <T> T getService(String serverUrl, Class<T> clazz) throws RemoteConnectFailureExceptionExt {
        HttpInvokerRemoteServiceDescContainer container = containerList.get(serverUrl);
        if (container == null) {
        	 addServer(serverUrl);
        	 container = containerList.get(serverUrl);
        }
        return getService(serverUrl, clazz, container);
    }

    @SuppressWarnings("unchecked")
    public static <T> T getService(String serverUrl, Class<T> clazz, HttpInvokerRemoteServiceDescContainer container) {
        String serviceUrl = container.getServiceUrl(clazz);
        Object o = null;
        o = servicePoxyMap.get(serviceUrl);
        if (o == null) {
            o = createService(serviceUrl, clazz);
            servicePoxyMap.put(serviceUrl, o);
        }
        return (T) o;
    }*/
}
