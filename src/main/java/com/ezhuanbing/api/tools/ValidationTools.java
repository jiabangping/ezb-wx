package com.ezhuanbing.api.tools;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ValidationTools {

  /**
   * 手机号验证
   * 
   * @param str
   * @return 验证通过返回true
   */
  public static boolean isMobile(String str) {
    Pattern p = null;
    Matcher m = null;
    boolean b = false;
    p = Pattern.compile("^[1][3,4,5,7,8][0-9]{9}$"); // 验证手机号
    m = p.matcher(str);
    b = m.matches();
    return b;
  }


  public static boolean isEmail(String src) {
    String check =
        "^([a-z0-9A-Z]+[-|\\.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-zA-Z]{2,}$";
    Pattern regex = Pattern.compile(check);
    Matcher matcher = regex.matcher(src);
    return matcher.matches();
  }

  public static boolean idCard(String idNum) {
    Pattern idNumPattern = Pattern.compile("(\\d{14}[0-9a-zA-Z])|(\\d{17}[0-9a-zA-Z])");
    Matcher idNumMatcher = idNumPattern.matcher(idNum);
    if (idNumMatcher.matches())
      return true;
    return false;
  }


  /**
   * @param idNum
   * @return String[]{year,month,date}
   */
  public static String[] parseIdCard(String idNum) {
    Pattern idNumPattern = Pattern.compile("(\\d{14}[0-9a-zA-Z])|(\\d{17}[0-9a-zA-Z])");
    Matcher idNumMatcher = idNumPattern.matcher(idNum);
    if (idNumMatcher.matches()) {
      Pattern birthDatePattern = Pattern.compile("\\d{6}(\\d{4})(\\d{2})(\\d{2}).*");//
      Matcher birthDateMather = birthDatePattern.matcher(idNum);
      if (birthDateMather.find()) {
        String year = birthDateMather.group(1);
        String month = birthDateMather.group(2);
        String date = birthDateMather.group(3);
        return new String[] {year, month, date};
      }
    }
    return null;
  }
  
  /**
   * 判断是否是整型
   * @param value
   * @return
   */
	public static boolean isInt(String value) {
		try {
			Integer.parseInt(value);
			return true;
		} catch (NumberFormatException e) {
			return false;
		}
	}
}
