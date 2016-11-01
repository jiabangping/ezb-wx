package com.ezhuanbing.api.wechat.init;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.ezhuanbing.api.wechat.config.ServerConfigConst;
import com.ezhuanbing.api.wechat.config.WeixinContext;

@Component
public class InitParamConfigBean implements InitializingBean {

  @Value("${baseApiUrl}")
  String baseApiUrl;

  @Value("${queryByRegionIDAndDepartmentIdUrl}")
  String queryByRegionIDAndDepartmentIdUrl;

  @Value("${queryByHospitalIdAndDepartmentIdUrl}")
  String queryByHospitalIdAndDepartmentIdUrl;

  @Value("${doctorInitDataUrl}")
  String doctorInitDataUrl;


  @Value("${getHospitalsByCityUrl}")
  String getHospitalsByCityUrl;

  @Value("${defaultCasehistorylistURL}")
  String defaultCasehistorylistURL;

  @Value("${getDoctorDetailByIdUrl}")
  String getDoctorDetailByIdUrl;

  @Value("${patientConsultationUrl}")
  String patientConsultationUrl;

  @Value("${doctorPasswdModifyByEmailLinkValidPeriod}")
  int doctorPasswdModifyByEmailLinkValidPeriod;

  @Value("${payApiUrl}")
  String payApiUrl;

  @Value("${authUrls}")
  String authUrls;

  @Value("${wxAppId}")
  String wxAppId;

  @Value("${wxAppSecurt}")
  String wxAppSecurt;

  @Value("${wxDeployBaseUrl}")
  String wxDeployBaseUrl;

  @Value("${wxDoctorsPage}")
  String wxDoctorsPage;

  @Value("${wxCasehistoryPage}")
  String wxCasehistoryPage;

  @Value("${doctorWxBindUrl}")
  String doctorWxBindUrl;

  @Value("${patientWxBindUrl}")
  String patientWxBindUrl;


  @Value("${staticRsVersion}")
  String staticRsVersion;

  //转诊base api url
  @Value("${baseZhuanBingApiUrl}")
  String baseZhuanBingApiUrl;
  
  @Value("${checkWxBindUrl}")
  String checkWxBindUrl;

  @Value("${wxAccountBindUrl}")
  String wxAccountBindUrl;
      
  
  //zysso base api url
  @Value("${baseZyssoApiUrl}")
  String baseZyssoApiUrl;
  
  @Value("${ssoPatientRegisteUrl}")
  String ssoPatientRegisteUrl;
  
  @Value("${ssoPatientRegisteVerifyCodeUrl}")
  String ssoPatientRegisteVerifyCodeUrl;
  
  @Value("${ssoPatientLoginUrl}")
  String ssoPatientLoginUrl;
  
  @Value("${subscribeDoctorUrl}")
  String subscribeDoctorUrl;
  
  @Value("${checkPatientDoctorBindUrl}")
  String checkPatientDoctorBindUrl;

  @Override
  public void afterPropertiesSet() throws Exception {
    ServerConfigConst.staticRsVersion = this.staticRsVersion;

    ServerConfigConst.baseApiUrl = this.baseApiUrl;
    ServerConfigConst.queryByRegionIDAndDepartmentIdUrl = this.queryByRegionIDAndDepartmentIdUrl;
    ServerConfigConst.queryByHospitalIdAndDepartmentIdUrl =
        this.queryByHospitalIdAndDepartmentIdUrl;
    ServerConfigConst.doctorInitDataUrl = this.doctorInitDataUrl;
    ServerConfigConst.getHospitalsByCityUrl = this.getHospitalsByCityUrl;
    ServerConfigConst.getDoctorDetailByIdUrl = this.getDoctorDetailByIdUrl;

    ServerConfigConst.defaultCasehistorylistURL = this.defaultCasehistorylistURL;
    ServerConfigConst.patientConsultationUrl = this.patientConsultationUrl;
    ServerConfigConst.doctorPasswdModifyByEmailLinkValidPeriod =
        this.doctorPasswdModifyByEmailLinkValidPeriod;
    ServerConfigConst.payApiUrl = this.payApiUrl;
    ServerConfigConst.authUrls = this.authUrls.split(",");
    
    //专病 - zysso api begin--------------------------
    //转诊base api url
    ServerConfigConst.baseZhuanBingApiUrl = this.baseZhuanBingApiUrl;
    
    ServerConfigConst.checkWxBindUrl = this.checkWxBindUrl;

    ServerConfigConst.wxAccountBindUrl = this.wxAccountBindUrl;
        
    //zysso base api url
    ServerConfigConst.baseZyssoApiUrl = this.baseZyssoApiUrl ;
    
    ServerConfigConst.ssoPatientRegisteUrl = this.ssoPatientRegisteUrl;
 
    ServerConfigConst.ssoPatientRegisteVerifyCodeUrl = this.ssoPatientRegisteVerifyCodeUrl;
    ServerConfigConst.ssoPatientLoginUrl = this.ssoPatientLoginUrl;
    ServerConfigConst.subscribeDoctorUrl = this.subscribeDoctorUrl;
    ServerConfigConst.checkPatientDoctorBindUrl = this.checkPatientDoctorBindUrl;
    //专病 - zysso api end-----------------------
    
    WeixinContext.appId = this.wxAppId;
    WeixinContext.appSecurt = this.wxAppSecurt;
    WeixinContext.wxDeployBaseUrl = this.wxDeployBaseUrl;
    WeixinContext.wxDoctorsPage = this.wxDoctorsPage;
    WeixinContext.wxCasehistoryPage = this.wxCasehistoryPage;
    WeixinContext.doctorWxBindUrl = this.doctorWxBindUrl;
    WeixinContext.patientWxBindUrl = this.patientWxBindUrl;
    
  }

  
}
