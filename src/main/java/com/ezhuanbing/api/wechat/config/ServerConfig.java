package com.ezhuanbing.api.wechat.config;

import com.ezhuanbing.api.tools.VerifyCodeUtils;

public class ServerConfig {

  public static String staticRsVersion = "1.0";
  public static String getVersion() {
      return VerifyCodeUtils.generateVerifyCode(6,"0123456789");
  }
}
