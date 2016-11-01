package com.ezhuanbing.api.conf;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ConstantConfig {

  public static final long MILLISECOND = 1000l;// 毫秒
  public static final long SECOND = 1l * MILLISECOND;// 秒
  public static final long MINUTE = 60l * SECOND;// 分
  public static final long HOUR = 60l * MINUTE;// 小时
  public static final long DAY = 24l * HOUR;// 天

  public static long latestReplyDays = 3l;// 最晚回复时间3天
  /*
   * 
   * 0:关闭推送 1：开启推送
   */
  public static int pushSwitch = 1;

  /**
   * 0:关闭短信 1：开启短信
   */
  public static int pushSms = 1;

  /**
   * 0:关闭微信 1：开启微信
   */
  public static int pushWx = 1;


  /**
   * 短信发送开始时间(当天的某个小时)
   */
  public static int smsStartTime = 24;
  /**
   * 短信发送结束时间(当天的某个小时)
   */
  public static int smsEndTime = 24;
  /**
   * 推送发送开始时间
   */
  public static int pushStartTime = 24;
  /**
   * 推送发送结束时间
   */
  public static int pushEndTime = 24;

  /**
   * 短信发送重试次数
   */
  public static final int SMS_RETRY_COUNT = 5;

  public static long getLatestReplyDays() {
    return latestReplyDays;
  }

  // 分页每页数据条目
  public static final int PAGE_SIZE = 5;

  public static String ERROR_DOCUMENT = "";

  public static String getErrorDocument() {
    return ERROR_DOCUMENT;
  }
  
  //-----------------------------------------------------------
  /**
   * 服务器地址
   */
  public static String SERVER_URL;
  @Autowired
  public ConstantConfig(PaperConfig commonConfig){
    SERVER_URL = commonConfig.getServer();
  }
  
  public enum FtpPathConst {
	  DoctorQrCodePic
  }
}
