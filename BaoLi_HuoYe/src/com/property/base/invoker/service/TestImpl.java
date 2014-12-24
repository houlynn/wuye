package com.property.base.invoker.service;

import org.springframework.stereotype.Service;

import com.property.base.invoker.serviceinterface.Test;

@Service
public class TestImpl implements Test {

	 public TestImpl() {
		 System.out.println(" httpvoke !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
		
	}
	
	
	@Override
	public String sayHolle(){
		return "hello invoker";
	}
	

}
