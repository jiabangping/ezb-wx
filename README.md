"# ezb-wx" 
采用spring-boot快速开发，支持jsp

如果不需要配置数据源 
则去掉pom.xml中的

<dependency>
  <groupId>org.mybatis.spring.boot</groupId>
  <artifactId>mybatis-spring-boot-starter</artifactId>
  <version>1.1.1</version>
</dependency>

否则需要
application.xml中配置
spring.datasource.url=
spring.datasource.username=
spring.datasource.password=
spring.datasource.driver-class-name=com.mysql.jdbc.Driver=
