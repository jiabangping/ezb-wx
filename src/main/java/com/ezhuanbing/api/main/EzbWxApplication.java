package com.ezhuanbing.api.main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;

//@SpringBootApplication
//@EnableScheduling
@SpringBootApplication
@ComponentScan(basePackages = "com.ezhuanbing.api")
//@MapperScan("com.ezhuanbing.api.dao.mybatis.mapper")
public class EzbWxApplication extends SpringBootServletInitializer {

  @Override
  protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
    return application.sources(EzbWxApplication.class);
  }

  public static void main(String[] args) {
    SpringApplication.run(EzbWxApplication.class, args);
  }
}