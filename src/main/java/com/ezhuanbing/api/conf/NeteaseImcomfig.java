package com.ezhuanbing.api.conf;


//@Component  
//@ConfigurationProperties(prefix="im")
public class NeteaseImcomfig {
  
  private String virtualaccount;
  private String requesturl;
  private String appkey;
  private String appsecret;
  private String random;
  
  public String getVirtualaccount() {
    return virtualaccount;
  }
  public void setVirtualaccount(String virtualaccount) {
    this.virtualaccount = virtualaccount;
  }
  public String getRequesturl() {
    return requesturl;
  }
  public void setRequesturl(String requesturl) {
    this.requesturl = requesturl;
  }
  public String getAppkey() {
    return appkey;
  }
  public void setAppkey(String appkey) {
    this.appkey = appkey;
  }
  public String getAppsecret() {
    return appsecret;
  }
  public void setAppsecret(String appsecret) {
    this.appsecret = appsecret;
  }
  public String getRandom() {
    return random;
  }
  public void setRandom(String random) {
    this.random = random;
  }
}
