package com.ufo.framework.system.web.invoker.exception;

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

import org.springframework.remoting.RemoteConnectFailureException;

/**
 *连接远程服务异常
 * @author gengzi
 */
public class RemoteConnectFailureExceptionExt extends Exception{

    public RemoteConnectFailureExceptionExt(String message,RemoteConnectFailureException cause) {
        super(message, cause);
    }
    
}
