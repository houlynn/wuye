package com.ufo.framework.system.controller;

import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.ServletRequestBindingException;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.portlet.ModelAndView;

import com.model.app.common.UserInfo;

@Controller
public class JsonController {
    @RequestMapping(value = "/annotationParam")  
    public ModelAndView annotationParam(@RequestBody Map user){  
        ModelAndView mav = new ModelAndView();  
        mav.setViewName("welcome");  
        return mav;  
    }  
    
    
    @RequestMapping(value = "/commonReturnType" , method = RequestMethod.GET)  
    @ResponseBody   
    public ModelAndView commonReturnType(HttpSession session) throws ServletRequestBindingException{  
        ModelAndView mav = new ModelAndView();  
        session.setAttribute("userName", "使用ResponseBody输出！");  
        ModelMap modelMap = new ModelMap();  
        modelMap.put("mapKey", "mapValue");  
        modelMap.addAttribute("attributeKey", "attributeValue");  
          
        mav.addObject("model", modelMap);  
        mav.addObject("modelMap", modelMap);  
        mav.setViewName("welcome");  
        return mav;  
    }  
    
    
    /** 
     * 输出为JSON格式的数据的方式 
     * 2、ResponseEntity<?> 
     * @return 
     */  
    @RequestMapping(value = "/annotationReturnType" , method = RequestMethod.GET)  
    public ResponseEntity<String> annotationReturnType(){  
        HttpHeaders httpHeaders = new HttpHeaders();  
        ResponseEntity<String> responseEntity = new ResponseEntity<String>("Hello WY!", httpHeaders, HttpStatus.CREATED);  
        return responseEntity;  
    }  
    
    
    @RequestMapping(value = "/annotationParamsReturn", method = RequestMethod.GET)   
    @ResponseBody   
    public ResponseEntity<String> annotationParamsReturn(HttpEntity<UserInfo> user){  
        String temp = user.getBody().getTf_userName();
        ResponseEntity<String> responseResult = new ResponseEntity<String>(temp, HttpStatus.OK);     
        return responseResult;     
    }    
      

}
