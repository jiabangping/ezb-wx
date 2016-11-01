package com.ezhuanbing.api.wechat.config;

import com.ezhuanbing.api.wechat.pojo.Token;

public class WeixinContext {
  public static String appId = "wx50755e9abe9fff28";
  public static String appSecurt = "126bc11043f0d717c950b569babff065";
  public static String wxDeployBaseUrl = "http://q95265.xicp.net/ehuizhen_weixin/";
  public static String wxDoctorsPage = "/doctor/doctorsPage";
  public static String wxCasehistoryPage = "/doctor/casehistoryPage";
  public static String doctorWxBindUrl = "/doctor/signInPage";
  public static String patientWxBindUrl = "/patient/wxBindPage";

  public static String baseUrl = "";
  public static String token = "";

  public static Token accessToken;

}
