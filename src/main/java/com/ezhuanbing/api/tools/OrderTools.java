package com.ezhuanbing.api.tools;

import java.util.UUID;

public class OrderTools {
  /**
   * 根据当前系统时间加随机序列来生成订单号
   *
   * @return 订单号
   */
  public static String GenerateOutTradeNo(String... prefix) {
    int hashcode = UUID.randomUUID().toString().hashCode();
    if (hashcode < 0) {
      hashcode = -hashcode;
    }
    if (prefix.length == 0) {
      return "E" + String.format("%011d", hashcode);
    } else {
      return prefix[0] + String.format("%011d", hashcode);
    }
  }
}
