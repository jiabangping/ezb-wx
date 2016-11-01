package com.ezhuanbing.api.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.ezhuanbing.api.wechat.MyWechat;

@Controller
@RequestMapping("/wechat")
public class WeiChatController {

	private Logger log = LoggerFactory.getLogger(getClass());
	
	@RequestMapping(value = "/sign", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public void doGet(
        HttpServletRequest request,HttpServletResponse response ) throws IOException {
	   
	  MyWechat myWechat = new MyWechat(request); 
      
      String result = myWechat.execute(); 
      response.getOutputStream().write(result.getBytes()); 
        
    }
	
	
	@RequestMapping(value = "/sign", method = RequestMethod.POST, produces = "application/xml;charset=UTF-8")
    public void doPost(HttpServletRequest request, HttpServletResponse response){
	  MyWechat myWechat = new MyWechat(request); 
      try {
          String result = myWechat.execute(); 
          response.getOutputStream().write(result.getBytes()); 
      } catch (Exception e) {
          e.printStackTrace();
      }
    }
 
}
