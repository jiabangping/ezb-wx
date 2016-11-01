package com.ezhuanbing.api.conf;

public class EnumClass {

  /**
   * 
   * @ClassName: PushMessageType
   * @Description: 推送消息类型定义
   * @author 王凯
   * @date 2016年9月20日 下午4:59:19
   *
   */
  public class PushMessageType {
    // 首次随访
    public static final String SF_FIRST_FOLLOWUP = "1001";
    // 首次随访提醒（医生发送信息）
    public static final String SF_FIRST_FOLLOWUP_REMIND = "1002";
    // 发送随访表(自动任务发送、付费提醒)
    public static final String SF_FOLLOWUP_FEE = "1003";
    // 发送随访表(发送随访表提醒)
    public static final String SF_FOLLOWUP_REMIND = "1004";
    // 付费成功提醒
    public static final String SF_FOLLOWUP_FEE_SUCCESS = "1005";
    // 发送附加随访表
    public static final String SF_FOLLOWUP_ACCESSORY = "1006";
    // 随访结束提醒
    public static final String SF_FOLLOWUP_FINISH = "1007";
    // 宣教资料发送提醒
    public static final String SF_EDUCATION_FILE_REMIND = "2001";
    // IM信息
    public static final String SF_IM_INFO = "3001";
  }

  /**
   * 支付方式
   * 
   * @author Hexy
   *
   */
  public enum PayTypeEnum {

    /**
     * 支付宝支付
     */
    ALIPAY('1', "支付宝支付"),

    /**
     * 银联支付
     */
    UNIONPAY('2', "银联支付"),

    /**
     * 微信支付
     */
    WXPAY('3', "微信支付"),

    /**
     * 医生确认支付
     */
    DOCTOR_CONFIRM('4', "医生确认支付"),

    /**
     * 
     * 汇款
     */
    REMITTANCE('5', "汇款");

    private char code;
    private String description;

    public char getCode() {
      return this.code;
    }

    @Override
    public String toString() {
      return this.description;
    }

    private PayTypeEnum(char code, String description) {
      this.code = code;
      this.description = description;
    }
  }

  public class NeteaseImMessageType {

    public static final String TEXT = "0";
    public static final String PICTURE = "1";
    public static final String STR_TEXT = "TEXT";
    public static final String STR_PICTURE = "PICTURE";
  }
}
