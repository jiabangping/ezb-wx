package com.ezhuanbing.api.conf;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Component
@Data
@AllArgsConstructor
@NoArgsConstructor
@ConfigurationProperties(prefix="xinge")
public class PushConfig {
  private long androidAccessId;
  private String androidSecretKey;
  private long iosAccessId;
  private String iosSecretKey;
  private int pushType;
}