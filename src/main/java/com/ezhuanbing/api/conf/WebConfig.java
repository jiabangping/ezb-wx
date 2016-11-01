package com.ezhuanbing.api.conf;

import java.io.IOException;
import java.util.List;

import javax.servlet.Filter;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.filter.CharacterEncodingFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

import com.ezhuanbing.api.conf.json.DefaultBeanSerializerModifier;
/*import com.ezhuanbing.api.authorize.UserRoleInterceptor;*/
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializerProvider;

@Configuration
@EnableWebMvc
public class WebConfig extends WebMvcConfigurerAdapter {

  @Value("${devMode:false}")
  private String devMode;

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**")
      .allowedMethods("GET", "POST", "PATCH", "DELETE");
  }

  @Override
  public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {

    MappingJackson2HttpMessageConverter jsonConverter = new MappingJackson2HttpMessageConverter();

    ObjectMapper objectMapper = new ObjectMapper();

    objectMapper.getSerializerProvider().setNullValueSerializer(new JsonSerializer<Object>() {
      @Override
      public void serialize(Object value, JsonGenerator gen, SerializerProvider serializers)
              throws IOException, JsonProcessingException {
        
        gen.writeString("");
      }
    });

   objectMapper.setSerializerFactory(objectMapper.getSerializerFactory()
            .withSerializerModifier(new DefaultBeanSerializerModifier()));

    jsonConverter.setObjectMapper(objectMapper);
    converters.add(jsonConverter);
  }

  @Bean
  public Filter characterEncodingFilter() {
    CharacterEncodingFilter characterEncodingFilter = new CharacterEncodingFilter();
    characterEncodingFilter.setEncoding("UTF-8");
    characterEncodingFilter.setForceEncoding(true);
    return characterEncodingFilter;
  }

 @Override
  public void addInterceptors(InterceptorRegistry registry) {
    //if ("true".equals(devMode)) return;

  /*  registry.addInterceptor(new AuthorityInterceptor());
    super.addInterceptors(registry);*/
  }
 
   @Override
  public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
    // TODO Auto-generated method stub
    //super.configureDefaultServletHandling(configurer);
     configurer.enable();
  }
   
  @Bean 
  public InternalResourceViewResolver viewResolver() {
    InternalResourceViewResolver resolver = new InternalResourceViewResolver();
   /* resolver.setPrefix("/WEB-INF/jsp/");*/
    resolver.setPrefix("/jsp/");
    resolver.setSuffix(".jsp");
    return resolver;
  }
  
}
