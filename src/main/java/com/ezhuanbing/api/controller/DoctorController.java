package com.ezhuanbing.api.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.ezhuanbing.api.service.DoctorService;
import com.ezhuanbing.api.wechat.config.ServerConfigConst;
import com.ezhuanbing.api.wechat.config.WeixinBasicKit;

@Controller
@RequestMapping("/doctor/")
public class DoctorController {

  private Logger log = LoggerFactory.getLogger(getClass());
  
  @Autowired
  private DoctorService doctorService;

  /**
   * 跳转到医生列表页面
   * 只显示西安市：610000    西京医院id:10  
   * @return
   */
  @RequestMapping(value = "/doctorsPage", method = RequestMethod.GET)
  public ModelAndView doctorPage(HttpServletRequest request, HttpServletResponse response,
      HttpSession session) {
    ModelAndView model = new ModelAndView("/doctor/doctorsPage");
    return model;
  }


  @RequestMapping(value = "/initData", method = RequestMethod.GET,
      produces = "application/json;charset=UTF-8")
  public @ResponseBody JSONObject initData(HttpServletRequest request, HttpServletResponse response)
      throws Exception {
    JSONObject result = doctorService.getInitData();
    return result;
  }

  @RequestMapping(value = "/getHospitalsByCity", method = RequestMethod.GET,
      produces = "application/json;charset=UTF-8")
  public @ResponseBody JSONObject getHospitalsByCity(HttpServletRequest request,
      HttpServletResponse response, @RequestParam(value = "cityId", required = true,
          defaultValue = "-1") int cityId) throws Exception {
    JSONObject result = doctorService.getHospitalsByCity(cityId);
    return result;
  }



  /**
   * @param regionId 区域Id
   * @param departmentId 科室Id
   * @param hospitalId 医院Id
   * @param currentPage 页码
   * @return
   */
  @RequestMapping(value = "/getDoctors/{regionId:\\d+}", method = RequestMethod.GET,
      produces = "application/json;charset=UTF-8")
  public @ResponseBody JSONObject getDoctors(@PathVariable("regionId") int regionId, @RequestParam(
      value = "departmentId", required = false, defaultValue = "-1") int departmentId,
      @RequestParam(value = "hospitalId", required = false, defaultValue = "-1") int hospitalId,
      @RequestParam(value = "currentPage", required = false, defaultValue = "1") int currentPage,
      HttpServletRequest request, HttpServletResponse response) {
    JSONObject result = doctorService.getDoctors(regionId, hospitalId, departmentId, currentPage);
    return result;
  }

  /**医生详情页面 */
  @RequestMapping(value = "/detail/{doctorId:\\d+}", method = RequestMethod.GET)
  public ModelAndView doctorDetailPage(@PathVariable("doctorId") int doctorId,HttpServletRequest request,HttpServletResponse response,HttpSession session
      ) throws Exception {
      
      ModelAndView model = new ModelAndView("/doctor/doctorDetail");
      try {
          net.sf.json.JSONObject json = doctorService.getDoctorDetail(doctorId);
          if(json != null) {
              model.addObject("doctorId",doctorId);
              model.addObject("photo",json.getString("photo"));
              model.addObject("doctorName",json.getString("doctorName"));
              model.addObject("departmentName",json.getString("departmentName"));
              model.addObject("positionName",json.getString("positionName"));//职称
              model.addObject("hospitalName",json.getString("hospitalName"));//所在医院
              model.addObject("orderCount",json.getString("orderCount"));//已会诊次数
              model.addObject("evaluateCount",json.getString("evaluateCount"));//评价次数
              model.addObject("description",json.getString("description"));//医生简介
              model.addObject("skilledField",json.getString("skilledField"));//擅长领域
              model.addObject("avgScore",Integer.parseInt(json.getString("avgScore").substring(0, json.getString("avgScore").indexOf("."))));//得分
          }   
          
          Object oid = session.getAttribute(ServerConfigConst.wxOpenIdSessionAttr);
          if(oid == null) oid = "test";
          String checkOpenIdUrl = ServerConfigConst.baseZhuanBingApiUrl+ServerConfigConst.checkWxBindUrl;
          
          checkOpenIdUrl = checkOpenIdUrl.replace("WXOPENID", (String)oid);
          String result = WeixinBasicKit.sendGet(checkOpenIdUrl);
          JSONObject r = JSONObject.fromObject(result);
          if("notBind".equals(r.getString("result"))) {
            ModelAndView wxBindModel = new ModelAndView("patient/wxBind");
            String redirectUrl = "/doctor/detail/"+doctorId;
            wxBindModel.addObject("redirectUrl",redirectUrl);
            return wxBindModel;
          }else if("alreadyBind".equals(r.getString("result"))) {
            String loginName = r.getString("loginName");
            //检查有没有绑定该医生
            
            String patientDoctorBindUrl = ServerConfigConst.baseZhuanBingApiUrl+ ServerConfigConst.checkPatientDoctorBindUrl;
            patientDoctorBindUrl = patientDoctorBindUrl.replace("LOGINNAME", loginName).replace("DOCTORID", String.valueOf(doctorId));
            JSONObject jsonResult = WeixinBasicKit.sendJsonPostWithStatus(patientDoctorBindUrl, "");
           
            if(jsonResult.getInt("status") == 200 && "alreadyBind".equals(jsonResult.getString("result"))) {
              ModelAndView alreadyBindView = new ModelAndView("/patient/subscribeSuccessPage");
              return alreadyBindView;
            }
            
            model.addObject("baseZhuanBingApiUrl",ServerConfigConst.baseZhuanBingApiUrl);//baseZhuanBingApiUrl/api/v1/patient/{LOGINNAME}/doctor/{DOCTORID}
            model.addObject("loginName",loginName);
            model.addObject("doctorId",doctorId);
            return model;
          }
          
      }catch(Exception e) {
          log.error(e.getMessage(),e);
      }
      return model;
  }
  
}
