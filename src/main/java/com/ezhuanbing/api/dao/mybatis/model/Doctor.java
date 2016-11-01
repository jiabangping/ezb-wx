package com.ezhuanbing.api.dao.mybatis.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Doctor {
  private Integer doctorId;
  private String doctorQrCodePicUrl;
}
