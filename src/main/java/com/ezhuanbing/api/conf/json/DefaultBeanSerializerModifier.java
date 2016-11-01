package com.ezhuanbing.api.conf.json;

import java.io.IOException;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.BeanDescription;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializationConfig;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.BeanPropertyWriter;
import com.fasterxml.jackson.databind.ser.BeanSerializerModifier;

public class DefaultBeanSerializerModifier extends BeanSerializerModifier {

  @Override
  public List<BeanPropertyWriter> changeProperties(SerializationConfig config,
      BeanDescription beanDesc, List<BeanPropertyWriter> beanProperties) {
    for (int i = 0; i < beanProperties.size(); i++) {
      BeanPropertyWriter writer = beanProperties.get(i);
      if (isArrayType(writer)) {
        writer.assignNullSerializer(new JsonSerializer<Object>() {

          @Override
          public void serialize(Object value, JsonGenerator gen, SerializerProvider serializers)
              throws IOException, JsonProcessingException {
            if (value == null) {
              gen.writeStartArray();
              gen.writeEndArray();
            } else {
              gen.writeObject(value);
            }
          }
        });
      } else if (isNumberWrapperType(writer)) {
        writer.assignNullSerializer(new JsonSerializer<Object>() {

          @Override
          public void serialize(Object value, JsonGenerator gen, SerializerProvider serializers)
              throws IOException, JsonProcessingException {
            if (value == null) {
              gen.writeObject(0);
            } else {
              gen.writeObject(value);
            }
          }
        });
      } else if (isBooleanType(writer)) {
        writer.assignNullSerializer(new JsonSerializer<Object>() {

          @Override
          public void serialize(Object value, JsonGenerator gen, SerializerProvider serializers)
              throws IOException, JsonProcessingException {
            if (value == null) {
              gen.writeObject(false);
            } else {
              gen.writeObject(value);
            }
          }
        });
      }
    }
    return beanProperties;
  }

  protected boolean isArrayType(BeanPropertyWriter writer) {
    Class<?> clazz = writer.getPropertyType();
    return clazz.isArray() || clazz.equals(List.class) || clazz.equals(Set.class);
  }

  protected boolean isNumberWrapperType(BeanPropertyWriter writer) {
    Class<?> clazz = writer.getPropertyType();
    return clazz.equals(Byte.class) || clazz.equals(Short.class) || clazz.equals(Character.class)
        || clazz.equals(Integer.class) || clazz.equals(Float.class) || clazz.equals(Long.class)
        || clazz.equals(Double.class);
  }

  protected boolean isBooleanType(BeanPropertyWriter writer) {
    Class<?> clazz = writer.getPropertyType();
    return clazz.equals(Boolean.class);
  }

}
