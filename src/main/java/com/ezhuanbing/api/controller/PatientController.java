package com.ezhuanbing.api.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.ModelAndView;

import com.ezhuanbing.api.vo.Patient;
import com.ezhuanbing.api.wechat.config.ServerConfigConst;
import com.ezhuanbing.api.wechat.config.WeixinBasicKit;

@Controller
@RequestMapping("/patient/")
public class PatientController {

  private Logger log = LoggerFactory.getLogger(getClass());


  /** 注册页面 */
  @RequestMapping(value = "/signUpPage", method = RequestMethod.GET)
  public ModelAndView getPatientFollowUpPlans(
      @RequestParam(value = "doctorid", required = false) Integer doctorid, @RequestParam(
          value = "pageIndex", required = false, defaultValue = "1") Integer pageIndex,
      @RequestParam(value = "pageSize", required = false) Integer pageSize,
      HttpServletRequest request, HttpSession session) throws Exception {
    try {
      Object oid = session.getAttribute(ServerConfigConst.wxOpenIdSessionAttr);
      System.out.println(oid);
      ModelAndView model = new ModelAndView("patient/signUp");
      // model.addObject("randomNum", 111);
      return model;
    } catch (Exception e) {
      log.error(e.getMessage(), e);
      throw e;
    }
  }


  /** 绑定页面 */
  @RequestMapping(value = "/wxBindPage", method = RequestMethod.GET)
  public ModelAndView wxBindPage(
      @RequestParam(value = "doctorid", required = false) Integer doctorid, @RequestParam(
          value = "pageIndex", required = false, defaultValue = "1") Integer pageIndex,
      @RequestParam(value = "pageSize", required = false) Integer pageSize,
      HttpServletRequest request, HttpSession session) throws Exception {
    try {
      Object oid = session.getAttribute(ServerConfigConst.wxOpenIdSessionAttr);
      if(oid == null) oid = "";
      
      ModelAndView model = new ModelAndView("patient/wxBind");
      return model;
    } catch (Exception e) {
      log.error(e.getMessage(), e);
      throw e;
    }
  }
  
  /** 获取注册验证码 */
  @RequestMapping(value = "/getVerifyCode/{phoneNum}", method = RequestMethod.GET)
  @ResponseStatus(value=HttpStatus.OK)
  public @ResponseBody JSONObject getVerifyCode(@PathVariable("phoneNum") String phoneNum,
      HttpServletRequest request, HttpSession session) {
    try {
      String getVerifyCodeUrl = ServerConfigConst.baseZyssoApiUrl + ServerConfigConst.ssoPatientRegisteVerifyCodeUrl;
      getVerifyCodeUrl = getVerifyCodeUrl.replace("PHONENUM", phoneNum);
      String status = WeixinBasicKit.sendGetStatus(getVerifyCodeUrl);
      if("200".equals(status)) {
        JSONObject json = new JSONObject();
        json.put("result", "success");
        return json;
      }else if("409".equals(status)) {
        JSONObject json = new JSONObject();
        json.put("result", "accountExist");
        return json;
      }
      JSONObject json = new JSONObject();
      json.put("result", "fail");
      return json;

    } catch (Exception e) {
      JSONObject json = new JSONObject();
      json.put("result", "fail");
      return json;
    }
  }
  
  
  /**注册提交数据接口*/
  @RequestMapping(value = "/signUp", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
  @ResponseStatus(value=HttpStatus.OK)
  public @ResponseBody JSONObject signUp(@RequestBody Patient p,
      HttpServletRequest request, HttpSession session) {
    try {
      
      String ssoPatientRegisteUrl = ServerConfigConst.baseZyssoApiUrl + ServerConfigConst.ssoPatientRegisteUrl;
      p.setLoginname(p.getPhonenum());
      String status = WeixinBasicKit.sendJsonPost(ssoPatientRegisteUrl, JSONObject.fromObject(p).toString());
      
      if("200".equals(status)) {
        Object oid = session.getAttribute(ServerConfigConst.wxOpenIdSessionAttr);
        if(oid == null) oid = "test";
        
        String wxAccountBindUrl = ServerConfigConst.baseZhuanBingApiUrl + ServerConfigConst.wxAccountBindUrl;
        wxAccountBindUrl = wxAccountBindUrl+"?wxOpenId="+(String)oid+"&loginName="+p.getLoginname();
        String r2 = WeixinBasicKit.sendGetStatus(wxAccountBindUrl);
        if("200".equals(r2)) {
          JSONObject json = new JSONObject();
          json.put("result", "success");
          return json;  
        }
      }
      JSONObject json = new JSONObject();
      json.put("result", "fail");
      return json;

    } catch (Exception e) {
      JSONObject json = new JSONObject();
      json.put("result", "fail");
      return json;
    }
  }
 
  
  /**注册提交数据接口*/
  @RequestMapping(value = "/wxBind", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
  @ResponseStatus(value=HttpStatus.OK)
  public @ResponseBody JSONObject wxBind(@RequestBody Patient p,
      HttpServletRequest request, HttpSession session) {
    try {
      
      String ssoPatientRegisteUrl = ServerConfigConst.baseZyssoApiUrl + ServerConfigConst.ssoPatientLoginUrl;
     // p.setLoginname(p.getPhonenum());
      String status = WeixinBasicKit.sendJsonPost(ssoPatientRegisteUrl, JSONObject.fromObject(p).toString());
      
      if("200".equals(status)) {
        Object oid = session.getAttribute(ServerConfigConst.wxOpenIdSessionAttr);
        if(oid == null) oid = "test";
        
        String wxAccountBindUrl = ServerConfigConst.baseZhuanBingApiUrl + ServerConfigConst.wxAccountBindUrl;
        wxAccountBindUrl = wxAccountBindUrl+"?wxOpenId="+(String)oid+"&loginName="+p.getLoginname();
        String r2 = WeixinBasicKit.sendGetStatus(wxAccountBindUrl);
        if("200".equals(r2)) {
          JSONObject json = new JSONObject();
          json.put("result", "success");
          return json;  
        }
      }else if("404".equals(status)) {
        JSONObject json = new JSONObject();
        json.put("result", "accountPasswdError");
        return json;  
      }
      JSONObject json = new JSONObject();
      json.put("result", "fail");
      return json;

    } catch (Exception e) {
      JSONObject json = new JSONObject();
      json.put("result", "fail");
      return json;
    }
  }
  

}
