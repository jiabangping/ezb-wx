package com.ezhuanbing.api.tools;

import java.text.SimpleDateFormat;
import java.util.Date;

public class DateFormat {
  
  public static String format(long date,String format){
    SimpleDateFormat formatType = new SimpleDateFormat(format);
    Date d = new Date(date);
    return formatType.format(d);
  }
}
