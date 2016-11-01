package com.ezhuanbing.api.conf;


//@Configuration
//@AutoConfigureAfter(MyBatisConfig.class)
public class MyBatisMapperScannerConfig {

   /* @Bean
    public MapperScannerConfigurer mapperScannerConfigurer() {
        MapperScannerConfigurer mapperScannerConfigurer = new MapperScannerConfigurer();
        mapperScannerConfigurer.setSqlSessionFactoryBeanName("sqlSessionFactory");
        mapperScannerConfigurer.setBasePackage("com.ezhuanbing.api.dao.mybatis.mapper");
        Properties properties = new Properties();
        properties.setProperty("mappers", "com.ezhuanbing.noscan.BaseMapper");
        properties.setProperty("notEmpty", "false");
        properties.setProperty("style", "normal");
        properties.setProperty("IDENTITY", "MYSQL");
        mapperScannerConfigurer.setProperties(properties);
        return mapperScannerConfigurer;
    }*/

}
