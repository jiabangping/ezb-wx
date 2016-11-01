package com.ezhuanbing.api.vo;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Patient {
  private String patientname;
  private String phonenum;
  private String loginname;
  private int sex;
  private int age;
  private String verifyCode;
  private String password;
  private int areaid;
  private String idcard;
  private Date birthday = new Date();

}
