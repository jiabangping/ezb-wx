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
@ConfigurationProperties(prefix="ftp")
public class FtpServerConfig {
  private String ip;
  private String user;
  private String pass;
  private int port;
  private String path;
}
