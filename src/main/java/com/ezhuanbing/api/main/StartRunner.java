package com.ezhuanbing.api.main;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class StartRunner implements CommandLineRunner{
  
  @SuppressWarnings("unused")
  private static final Logger log = LoggerFactory.getLogger(StartRunner.class);
  
  @Override
  public void run(String... args) throws Exception {
  }
 
}
